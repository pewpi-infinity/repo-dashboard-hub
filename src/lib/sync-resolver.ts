import type { CategorizedRepo } from './types'
import { toast } from 'sonner'

export type SyncConflict = {
  repoName: string
  repoId: number
  conflictType: 'modified' | 'deleted' | 'added'
  cachedVersion: CategorizedRepo | null
  serverVersion: CategorizedRepo | null
  timestamp: number
}

export type ConflictResolution = 'server' | 'cache' | 'merge' | 'skip'

export type SyncResult = {
  resolved: CategorizedRepo[]
  conflicts: SyncConflict[]
  stats: {
    serverWins: number
    cacheWins: number
    merged: number
    added: number
    removed: number
  }
}

export function detectConflicts(
  cachedRepos: CategorizedRepo[],
  serverRepos: CategorizedRepo[]
): SyncConflict[] {
  const conflicts: SyncConflict[] = []
  const serverMap = new Map(serverRepos.map(r => [r.id, r]))
  const cachedMap = new Map(cachedRepos.map(r => [r.id, r]))

  cachedRepos.forEach(cachedRepo => {
    const serverRepo = serverMap.get(cachedRepo.id)
    
    if (!serverRepo) {
      conflicts.push({
        repoName: cachedRepo.name,
        repoId: cachedRepo.id,
        conflictType: 'deleted',
        cachedVersion: cachedRepo,
        serverVersion: null,
        timestamp: Date.now()
      })
    } else {
      const cachedDate = new Date(cachedRepo.updated_at).getTime()
      const serverDate = new Date(serverRepo.updated_at).getTime()
      
      if (Math.abs(serverDate - cachedDate) > 60000) {
        conflicts.push({
          repoName: cachedRepo.name,
          repoId: cachedRepo.id,
          conflictType: 'modified',
          cachedVersion: cachedRepo,
          serverVersion: serverRepo,
          timestamp: Date.now()
        })
      }
    }
  })

  serverRepos.forEach(serverRepo => {
    if (!cachedMap.has(serverRepo.id)) {
      conflicts.push({
        repoName: serverRepo.name,
        repoId: serverRepo.id,
        conflictType: 'added',
        cachedVersion: null,
        serverVersion: serverRepo,
        timestamp: Date.now()
      })
    }
  })

  return conflicts
}

export function resolveConflicts(
  conflicts: SyncConflict[],
  strategy: ConflictResolution = 'server'
): SyncResult {
  const resolved: CategorizedRepo[] = []
  const stats = {
    serverWins: 0,
    cacheWins: 0,
    merged: 0,
    added: 0,
    removed: 0
  }

  conflicts.forEach(conflict => {
    switch (conflict.conflictType) {
      case 'added':
        if (conflict.serverVersion) {
          resolved.push(conflict.serverVersion)
          stats.added++
        }
        break

      case 'deleted':
        stats.removed++
        break

      case 'modified':
        if (strategy === 'server' && conflict.serverVersion) {
          resolved.push(conflict.serverVersion)
          stats.serverWins++
        } else if (strategy === 'cache' && conflict.cachedVersion) {
          resolved.push(conflict.cachedVersion)
          stats.cacheWins++
        } else if (strategy === 'merge' && conflict.serverVersion && conflict.cachedVersion) {
          const merged = mergeRepoData(conflict.cachedVersion, conflict.serverVersion)
          resolved.push(merged)
          stats.merged++
        }
        break
    }
  })

  return { resolved, conflicts, stats }
}

function mergeRepoData(
  cached: CategorizedRepo,
  server: CategorizedRepo
): CategorizedRepo {
  const cachedDate = new Date(cached.updated_at).getTime()
  const serverDate = new Date(server.updated_at).getTime()
  
  const newerRepo = serverDate > cachedDate ? server : cached
  const olderRepo = serverDate > cachedDate ? cached : server
  
  return {
    ...newerRepo,
    stargazers_count: Math.max(cached.stargazers_count, server.stargazers_count),
    forks_count: Math.max(cached.forks_count || 0, server.forks_count || 0),
    watchers_count: Math.max(cached.watchers_count || 0, server.watchers_count || 0),
    description: newerRepo.description || olderRepo.description || null,
    topics: Array.from(new Set([...cached.topics, ...server.topics]))
  }
}

export async function performSync(
  cachedRepos: CategorizedRepo[],
  serverRepos: CategorizedRepo[],
  strategy: ConflictResolution = 'server'
): Promise<{ repos: CategorizedRepo[], result: SyncResult }> {
  const conflicts = detectConflicts(cachedRepos, serverRepos)
  
  if (conflicts.length === 0) {
    toast.success('✅ Sync Complete', {
      description: 'No conflicts detected - all data in sync',
      duration: 3000
    })
    return { repos: serverRepos, result: { resolved: [], conflicts: [], stats: { serverWins: 0, cacheWins: 0, merged: 0, added: 0, removed: 0 } } }
  }

  const result = resolveConflicts(conflicts, strategy)
  
  const serverMap = new Map(serverRepos.map(r => [r.id, r]))
  const resolvedMap = new Map(result.resolved.map(r => [r.id, r]))
  
  const finalRepos: CategorizedRepo[] = []
  
  serverRepos.forEach(repo => {
    if (resolvedMap.has(repo.id)) {
      finalRepos.push(resolvedMap.get(repo.id)!)
    } else {
      finalRepos.push(repo)
    }
  })
  
  result.resolved.forEach(repo => {
    if (!serverMap.has(repo.id)) {
      finalRepos.push(repo)
    }
  })

  const { added, removed, merged, serverWins } = result.stats
  const totalChanges = added + removed + merged + serverWins
  
  if (totalChanges > 0) {
    const messages: string[] = []
    if (added > 0) messages.push(`${added} added`)
    if (removed > 0) messages.push(`${removed} removed`)
    if (merged > 0) messages.push(`${merged} merged`)
    if (serverWins > 0) messages.push(`${serverWins} updated`)
    
    toast.success('🔄 Sync Resolved', {
      description: `${totalChanges} conflict${totalChanges !== 1 ? 's' : ''}: ${messages.join(', ')}`,
      duration: 5000
    })
  }

  return { repos: finalRepos, result }
}

export function createSyncStrategy(
  autoResolve: boolean = true,
  preferServer: boolean = true
): ConflictResolution {
  if (!autoResolve) return 'skip'
  return preferServer ? 'server' : 'merge'
}

export async function syncWithRetry(
  cachedRepos: CategorizedRepo[],
  fetchServerRepos: () => Promise<CategorizedRepo[]>,
  maxRetries: number = 3
): Promise<{ repos: CategorizedRepo[], result: SyncResult | null }> {
  let lastError: Error | null = null
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const serverRepos = await fetchServerRepos()
      const { repos, result } = await performSync(cachedRepos, serverRepos, 'server')
      return { repos, result }
    } catch (error) {
      lastError = error as Error
      
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
        toast.info(`🔄 Sync attempt ${attempt}/${maxRetries} failed`, {
          description: `Retrying in ${delay / 1000}s...`,
          duration: delay
        })
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  toast.error('❌ Sync Failed', {
    description: `Could not sync after ${maxRetries} attempts. Using cached data.`,
    duration: 5000
  })
  
  return { repos: cachedRepos, result: null }
}
