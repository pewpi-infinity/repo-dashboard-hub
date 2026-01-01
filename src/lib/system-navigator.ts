import { EXTENDED_REPO_REGISTRY, getRepoDefinition, getReposByLayer, getRepoDependencyTree } from './extended-repo-registry'
import type { RepoDefinition } from './repo-registry'

export interface RepoPosition {
  name: string
  layer: number
  order: number
  x: number
  y: number
  z: number
  emoji: string
  category: string
  connections: string[]
}

export interface SystemMap {
  layers: Map<number, RepoPosition[]>
  connections: Map<string, string[]>
  totalRepos: number
}

export class RepoSystemNavigator {
  private systemMap: SystemMap
  private currentPosition: string | null = null

  constructor() {
    this.systemMap = this.buildSystemMap()
  }

  private buildSystemMap(): SystemMap {
    const layers = new Map<number, RepoPosition[]>()
    const connections = new Map<string, string[]>()
    let totalRepos = 0

    Object.values(EXTENDED_REPO_REGISTRY).forEach((repo) => {
      const position: RepoPosition = {
        name: repo.name,
        layer: repo.position.layer,
        order: repo.position.order,
        x: repo.position.order * 100,
        y: repo.position.layer * 100,
        z: 0,
        emoji: repo.emoji,
        category: repo.category,
        connections: repo.dependencies
      }

      if (!layers.has(repo.position.layer)) {
        layers.set(repo.position.layer, [])
      }
      layers.get(repo.position.layer)!.push(position)

      connections.set(repo.name, repo.dependencies)
      totalRepos++
    })

    layers.forEach((repoList) => {
      repoList.sort((a, b) => a.order - b.order)
    })

    return { layers, connections, totalRepos }
  }

  getSystemMap(): SystemMap {
    return this.systemMap
  }

  getCurrentPosition(): string | null {
    return this.currentPosition
  }

  navigateTo(repoName: string): RepoDefinition | null {
    const repo = getRepoDefinition(repoName)
    if (repo) {
      this.currentPosition = repoName
      return repo
    }
    return null
  }

  getPosition(repoName: string): RepoPosition | null {
    for (const [, positions] of this.systemMap.layers) {
      const pos = positions.find(p => p.name === repoName)
      if (pos) return pos
    }
    return null
  }

  getNeighbors(repoName: string): RepoPosition[] {
    const pos = this.getPosition(repoName)
    if (!pos) return []

    const layerPositions = this.systemMap.layers.get(pos.layer) || []
    const neighbors: RepoPosition[] = []

    layerPositions.forEach(p => {
      if (p.name !== repoName && Math.abs(p.order - pos.order) <= 1) {
        neighbors.push(p)
      }
    })

    const aboveLayer = this.systemMap.layers.get(pos.layer - 1) || []
    const belowLayer = this.systemMap.layers.get(pos.layer + 1) || []
    
    neighbors.push(...aboveLayer.filter(p => Math.abs(p.order - pos.order) <= 2))
    neighbors.push(...belowLayer.filter(p => Math.abs(p.order - pos.order) <= 2))

    return neighbors
  }

  getDependencies(repoName: string): string[] {
    return this.systemMap.connections.get(repoName) || []
  }

  getDependents(repoName: string): string[] {
    const dependents: string[] = []
    this.systemMap.connections.forEach((deps, name) => {
      if (deps.includes(repoName)) {
        dependents.push(name)
      }
    })
    return dependents
  }

  getFullDependencyTree(repoName: string): string[] {
    return getRepoDependencyTree(repoName)
  }

  getLayerInfo(layer: number): RepoPosition[] {
    return this.systemMap.layers.get(layer) || []
  }

  getAllLayers(): number[] {
    return Array.from(this.systemMap.layers.keys()).sort((a, b) => a - b)
  }

  findShortestPath(from: string, to: string): string[] | null {
    const queue: Array<{ repo: string; path: string[] }> = [{ repo: from, path: [from] }]
    const visited = new Set<string>()

    while (queue.length > 0) {
      const { repo, path } = queue.shift()!
      
      if (repo === to) {
        return path
      }

      if (visited.has(repo)) continue
      visited.add(repo)

      const deps = this.getDependencies(repo)
      const dependents = this.getDependents(repo)
      const neighbors = this.getNeighbors(repo).map(p => p.name)

      const connected = [...new Set([...deps, ...dependents, ...neighbors])]

      connected.forEach(next => {
        if (!visited.has(next)) {
          queue.push({ repo: next, path: [...path, next] })
        }
      })
    }

    return null
  }

  getReposByDistance(from: string, maxDistance: number = 2): Map<string, number> {
    const distances = new Map<string, number>()
    distances.set(from, 0)

    const queue: Array<{ repo: string; distance: number }> = [{ repo: from, distance: 0 }]
    const visited = new Set<string>()

    while (queue.length > 0) {
      const { repo, distance } = queue.shift()!
      
      if (distance >= maxDistance) continue
      if (visited.has(repo)) continue
      visited.add(repo)

      const deps = this.getDependencies(repo)
      const dependents = this.getDependents(repo)
      const neighbors = this.getNeighbors(repo).map(p => p.name)

      const connected = [...new Set([...deps, ...dependents, ...neighbors])]

      connected.forEach(next => {
        if (!distances.has(next) || distances.get(next)! > distance + 1) {
          distances.set(next, distance + 1)
          queue.push({ repo: next, distance: distance + 1 })
        }
      })
    }

    return distances
  }

  getSystemStatistics() {
    const stats = {
      totalRepos: this.systemMap.totalRepos,
      layers: this.getAllLayers().length,
      categories: new Map<string, number>(),
      mostConnected: { repo: '', connections: 0 },
      layerDistribution: new Map<number, number>()
    }

    Object.values(EXTENDED_REPO_REGISTRY).forEach(repo => {
      const category = repo.category
      stats.categories.set(category, (stats.categories.get(category) || 0) + 1)

      const layer = repo.position.layer
      stats.layerDistribution.set(layer, (stats.layerDistribution.get(layer) || 0) + 1)

      const connectionCount = repo.dependencies.length + this.getDependents(repo.name).length
      if (connectionCount > stats.mostConnected.connections) {
        stats.mostConnected = { repo: repo.name, connections: connectionCount }
      }
    })

    return stats
  }

  generateASCIIMap(): string {
    const lines: string[] = []
    lines.push('╔═══════════════════════════════════════════════════════════════╗')
    lines.push('║           PEWPI INFINITY QUANTUM SYSTEM MAP                   ║')
    lines.push('╚═══════════════════════════════════════════════════════════════╝')
    lines.push('')

    const layers = this.getAllLayers()
    
    layers.forEach(layerNum => {
      const repos = this.getLayerInfo(layerNum)
      lines.push(`┌─ LAYER ${layerNum} ${'─'.repeat(50)}`)
      
      repos.forEach((repo, idx) => {
        const prefix = idx === repos.length - 1 ? '└──' : '├──'
        const deps = this.getDependencies(repo.name)
        const depsCount = deps.length
        lines.push(`${prefix} ${repo.emoji} ${repo.name} [${repo.category}] {${depsCount} deps}`)
      })
      lines.push('')
    })

    const stats = this.getSystemStatistics()
    lines.push('╔═══════════════════════════════════════════════════════════════╗')
    lines.push(`║ Total Repos: ${stats.totalRepos.toString().padEnd(48)} ║`)
    lines.push(`║ Layers: ${stats.layers.toString().padEnd(53)} ║`)
    lines.push(`║ Most Connected: ${stats.mostConnected.repo.padEnd(43)} ║`)
    lines.push('╚═══════════════════════════════════════════════════════════════╝')

    return lines.join('\n')
  }

  exportAsJSON(): string {
    const exportData = {
      systemMap: {
        layers: Array.from(this.systemMap.layers.entries()).map(([layer, repos]) => ({
          layer,
          repos: repos.map(r => ({
            name: r.name,
            emoji: r.emoji,
            position: { x: r.x, y: r.y, z: r.z, order: r.order },
            category: r.category,
            connections: r.connections
          }))
        })),
        totalRepos: this.systemMap.totalRepos
      },
      statistics: this.getSystemStatistics()
    }

    return JSON.stringify(exportData, (key, value) => {
      if (value instanceof Map) {
        return Object.fromEntries(value)
      }
      return value
    }, 2)
  }
}

export const systemNavigator = new RepoSystemNavigator()

export function getRepoInfo(repoName: string): string {
  const repo = getRepoDefinition(repoName)
  if (!repo) return `Repository "${repoName}" not found`

  const position = systemNavigator.getPosition(repoName)
  const deps = systemNavigator.getDependencies(repoName)
  const dependents = systemNavigator.getDependents(repoName)
  const neighbors = systemNavigator.getNeighbors(repoName)

  let info = `
╔═══════════════════════════════════════════════════════════════╗
║ ${repo.emoji} ${repo.name.padEnd(58)} ║
╚═══════════════════════════════════════════════════════════════╝

📋 Description: ${repo.description}
🎯 Purpose: ${repo.purpose}
🎨 Color: ${repo.colorCode}
🔢 Number Code: ${repo.numberCode || 'N/A'}
📦 Category: ${repo.category}

📍 Position:
   Layer: ${position?.layer ?? 'Unknown'}
   Order: ${position?.order ?? 'Unknown'}
   Coords: (${position?.x ?? 0}, ${position?.y ?? 0}, ${position?.z ?? 0})

🔗 Dependencies (${deps.length}):
${deps.length > 0 ? deps.map(d => `   ├─ ${d}`).join('\n') : '   └─ None'}

⬆️  Dependents (${dependents.length}):
${dependents.length > 0 ? dependents.map(d => `   ├─ ${d}`).join('\n') : '   └─ None'}

🌐 Neighbors (${neighbors.length}):
${neighbors.length > 0 ? neighbors.map(n => `   ├─ ${n.emoji} ${n.name}`).join('\n') : '   └─ None'}

🏷️  Semantic Tags:
${repo.semanticTags.map(t => `   • ${t}`).join('\n')}

📄 Pages (${repo.pages.length}):
${repo.pages.map(p => `   ├─ ${p.path}: ${p.purpose}`).join('\n')}

⚙️  Functions (${repo.functions.length}):
${repo.functions.map(f => `   ├─ ${f.name}(): ${f.semanticMeaning}`).join('\n')}

📤 Exports:
${repo.exports.map(e => `   • ${e}`).join('\n')}
`

  if (repo.musicTheme) {
    info += `
🎵 Music Theme:
   Primary: ${repo.musicTheme.primary}
   Journey: ${repo.musicTheme.journey}
${repo.musicTheme.archive ? `   Archive: ${repo.musicTheme.archive}` : ''}
`
  }

  return info
}
