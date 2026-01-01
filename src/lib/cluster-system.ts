import { CategorizedRepo, ComponentCategory } from './types'

export interface Cluster {
  id: string
  name: string
  color: string
  emoji: string
  repos: CategorizedRepo[]
  position: { x: number; y: number }
  radius: number
  category?: ComponentCategory
  isActive: boolean
  connections: string[]
  strength: number
  formation: 'circle' | 'line' | 'grid' | 'spiral'
  rotationSpeed: number
}

export interface ClusterConnection {
  from: string
  to: string
  strength: number
  dataFlow: number
  pulseSpeed: number
  color: string
}

export type ClusterFormation = 'auto' | 'category' | 'language' | 'activity' | 'custom'

export function createClusters(
  repos: CategorizedRepo[],
  formation: ClusterFormation = 'category'
): Cluster[] {
  switch (formation) {
    case 'category':
      return createCategoryClusters(repos)
    case 'language':
      return createLanguageClusters(repos)
    case 'activity':
      return createActivityClusters(repos)
    case 'custom':
      return createCustomClusters(repos)
    case 'auto':
    default:
      return createAutoClusters(repos)
  }
}

function createCategoryClusters(repos: CategorizedRepo[]): Cluster[] {
  const categoryMap = new Map<ComponentCategory, CategorizedRepo[]>()
  
  repos.forEach(repo => {
    const existing = categoryMap.get(repo.category) || []
    categoryMap.set(repo.category, [...existing, repo])
  })

  const clusters: Cluster[] = []
  const categoryColors: Record<ComponentCategory, string> = {
    brain: 'gold',
    quantum: 'purple',
    time: 'blue',
    os: 'green',
    other: 'orange'
  }

  const categoryEmojis: Record<ComponentCategory, string> = {
    brain: '🧠',
    quantum: '⚛️',
    time: '⏰',
    os: '🖥️',
    other: '🔧'
  }

  const categoryNames: Record<ComponentCategory, string> = {
    brain: 'Neural Core',
    quantum: 'Quantum Systems',
    time: 'Time Machine',
    os: 'Operating Systems',
    other: 'Components'
  }

  let index = 0
  categoryMap.forEach((repoList, category) => {
    if (repoList.length === 0) return

    clusters.push({
      id: `cluster-${category}`,
      name: categoryNames[category],
      color: categoryColors[category],
      emoji: categoryEmojis[category],
      repos: repoList,
      position: { x: 0, y: 0 },
      radius: Math.max(80, Math.min(150, 60 + repoList.length * 10)),
      category,
      isActive: true,
      connections: [],
      strength: repoList.length / repos.length,
      formation: repoList.length <= 4 ? 'circle' : repoList.length <= 9 ? 'grid' : 'spiral',
      rotationSpeed: 1 + Math.random() * 0.5
    })
    index++
  })

  return clusters
}

function createLanguageClusters(repos: CategorizedRepo[]): Cluster[] {
  const languageMap = new Map<string, CategorizedRepo[]>()
  
  repos.forEach(repo => {
    const lang = repo.language || 'Unknown'
    const existing = languageMap.get(lang) || []
    languageMap.set(lang, [...existing, repo])
  })

  const clusters: Cluster[] = []
  const languageColors = ['blue', 'purple', 'green', 'orange', 'pink', 'yellow', 'red']
  const languageEmojis = ['💠', '🔮', '🌿', '🔥', '💎', '⭐', '💫']

  let index = 0
  languageMap.forEach((repoList, language) => {
    if (repoList.length === 0) return

    clusters.push({
      id: `cluster-lang-${language}`,
      name: language,
      color: languageColors[index % languageColors.length],
      emoji: languageEmojis[index % languageEmojis.length],
      repos: repoList,
      position: { x: 0, y: 0 },
      radius: Math.max(80, Math.min(150, 60 + repoList.length * 10)),
      isActive: true,
      connections: [],
      strength: repoList.length / repos.length,
      formation: repoList.length <= 4 ? 'circle' : repoList.length <= 9 ? 'grid' : 'spiral',
      rotationSpeed: 1 + Math.random() * 0.5
    })
    index++
  })

  return clusters
}

function createActivityClusters(repos: CategorizedRepo[]): Cluster[] {
  const now = Date.now()
  const sortedRepos = [...repos].sort((a, b) => 
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  )

  const clusters: Cluster[] = []
  const activityThresholds = [
    { name: 'Hot Projects', days: 7, emoji: '🔥', color: 'red' },
    { name: 'Active Projects', days: 30, emoji: '⚡', color: 'yellow' },
    { name: 'Stable Projects', days: 90, emoji: '🌟', color: 'blue' },
    { name: 'Archive Projects', days: Infinity, emoji: '📦', color: 'purple' }
  ]

  activityThresholds.forEach((threshold, index) => {
    const repoList = sortedRepos.filter(repo => {
      const daysSinceUpdate = (now - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
      const prevThreshold = index > 0 ? activityThresholds[index - 1].days : 0
      return daysSinceUpdate > prevThreshold && daysSinceUpdate <= threshold.days
    })

    if (repoList.length === 0) return

    clusters.push({
      id: `cluster-activity-${threshold.name}`,
      name: threshold.name,
      color: threshold.color,
      emoji: threshold.emoji,
      repos: repoList,
      position: { x: 0, y: 0 },
      radius: Math.max(80, Math.min(150, 60 + repoList.length * 10)),
      isActive: true,
      connections: [],
      strength: repoList.length / repos.length,
      formation: repoList.length <= 4 ? 'circle' : repoList.length <= 9 ? 'grid' : 'spiral',
      rotationSpeed: index === 0 ? 2 : 1.5 - (index * 0.3)
    })
  })

  return clusters
}

function createCustomClusters(repos: CategorizedRepo[]): Cluster[] {
  const hasLegendPrefix = repos.filter(r => r.name.toLowerCase().includes('legend'))
  const hasEmoji = repos.filter(r => /[\u{1F300}-\u{1F9FF}]/u.test(r.name))
  const highStars = repos.filter(r => r.stargazers_count > 5)
  const others = repos.filter(r => 
    !hasLegendPrefix.includes(r) && 
    !hasEmoji.includes(r) && 
    !highStars.includes(r)
  )

  const clusters: Cluster[] = []

  if (hasLegendPrefix.length > 0) {
    clusters.push({
      id: 'cluster-legend',
      name: 'Legend System',
      color: 'gold',
      emoji: '👑',
      repos: hasLegendPrefix,
      position: { x: 0, y: 0 },
      radius: Math.max(100, Math.min(180, 70 + hasLegendPrefix.length * 12)),
      isActive: true,
      connections: [],
      strength: hasLegendPrefix.length / repos.length,
      formation: 'spiral',
      rotationSpeed: 0.8
    })
  }

  if (hasEmoji.length > 0) {
    clusters.push({
      id: 'cluster-emoji',
      name: 'Emoji Systems',
      color: 'purple',
      emoji: '🎨',
      repos: hasEmoji,
      position: { x: 0, y: 0 },
      radius: Math.max(80, Math.min(150, 60 + hasEmoji.length * 10)),
      isActive: true,
      connections: [],
      strength: hasEmoji.length / repos.length,
      formation: 'circle',
      rotationSpeed: 1.2
    })
  }

  if (highStars.length > 0) {
    clusters.push({
      id: 'cluster-stars',
      name: 'Popular Projects',
      color: 'yellow',
      emoji: '⭐',
      repos: highStars,
      position: { x: 0, y: 0 },
      radius: Math.max(80, Math.min(150, 60 + highStars.length * 10)),
      isActive: true,
      connections: [],
      strength: highStars.length / repos.length,
      formation: 'grid',
      rotationSpeed: 1.5
    })
  }

  if (others.length > 0) {
    clusters.push({
      id: 'cluster-others',
      name: 'Other Systems',
      color: 'blue',
      emoji: '🔧',
      repos: others,
      position: { x: 0, y: 0 },
      radius: Math.max(80, Math.min(150, 60 + others.length * 10)),
      isActive: true,
      connections: [],
      strength: others.length / repos.length,
      formation: 'circle',
      rotationSpeed: 1.0
    })
  }

  return clusters
}

function createAutoClusters(repos: CategorizedRepo[]): Cluster[] {
  if (repos.length <= 10) {
    return [{
      id: 'cluster-all',
      name: 'All Systems',
      color: 'blue',
      emoji: '🌐',
      repos,
      position: { x: 0, y: 0 },
      radius: 120,
      isActive: true,
      connections: [],
      strength: 1,
      formation: 'circle',
      rotationSpeed: 1
    }]
  }

  return createCategoryClusters(repos)
}

export function calculateClusterPositions(
  clusters: Cluster[],
  width: number,
  height: number,
  centerX: number,
  centerY: number
): Cluster[] {
  if (clusters.length === 0) return []
  if (clusters.length === 1) {
    return [{
      ...clusters[0],
      position: { x: centerX, y: centerY }
    }]
  }

  const orbitalRadius = Math.min(width, height) * 0.28
  const angleStep = (Math.PI * 2) / clusters.length

  return clusters.map((cluster, index) => {
    const angle = index * angleStep - Math.PI / 2
    const x = centerX + Math.cos(angle) * orbitalRadius
    const y = centerY + Math.sin(angle) * orbitalRadius

    return {
      ...cluster,
      position: { x, y }
    }
  })
}

export function calculateRepoPositionsInCluster(
  cluster: Cluster,
  time: number = 0
): Array<{ id: string; x: number; y: number; angle: number }> {
  const positions: Array<{ id: string; x: number; y: number; angle: number }> = []
  const repoCount = cluster.repos.length

  switch (cluster.formation) {
    case 'circle':
      cluster.repos.forEach((repo, index) => {
        const angle = (index / repoCount) * Math.PI * 2 + time * cluster.rotationSpeed * 0.001
        const distance = cluster.radius * 0.7
        positions.push({
          id: repo.name,
          x: cluster.position.x + Math.cos(angle) * distance,
          y: cluster.position.y + Math.sin(angle) * distance,
          angle
        })
      })
      break

    case 'line':
      const lineLength = cluster.radius * 1.5
      const spacing = repoCount > 1 ? lineLength / (repoCount - 1) : 0
      cluster.repos.forEach((repo, index) => {
        const offset = (index - (repoCount - 1) / 2) * spacing
        positions.push({
          id: repo.name,
          x: cluster.position.x + offset,
          y: cluster.position.y,
          angle: 0
        })
      })
      break

    case 'grid':
      const cols = Math.ceil(Math.sqrt(repoCount))
      const rows = Math.ceil(repoCount / cols)
      const cellSize = (cluster.radius * 1.5) / Math.max(cols, rows)
      
      cluster.repos.forEach((repo, index) => {
        const col = index % cols
        const row = Math.floor(index / cols)
        const offsetX = (col - (cols - 1) / 2) * cellSize
        const offsetY = (row - (rows - 1) / 2) * cellSize
        
        positions.push({
          id: repo.name,
          x: cluster.position.x + offsetX,
          y: cluster.position.y + offsetY,
          angle: Math.atan2(offsetY, offsetX)
        })
      })
      break

    case 'spiral':
      const spiralTurns = Math.ceil(repoCount / 8)
      cluster.repos.forEach((repo, index) => {
        const progress = index / Math.max(1, repoCount - 1)
        const angle = progress * spiralTurns * Math.PI * 2 + time * cluster.rotationSpeed * 0.001
        const distance = cluster.radius * 0.3 + (cluster.radius * 0.5 * progress)
        
        positions.push({
          id: repo.name,
          x: cluster.position.x + Math.cos(angle) * distance,
          y: cluster.position.y + Math.sin(angle) * distance,
          angle
        })
      })
      break
  }

  return positions
}

export function findClusterConnections(clusters: Cluster[]): ClusterConnection[] {
  const connections: ClusterConnection[] = []

  clusters.forEach((cluster1, i) => {
    clusters.slice(i + 1).forEach(cluster2 => {
      const sharedTopics = cluster1.repos.some(r1 =>
        cluster2.repos.some(r2 =>
          r1.topics.some(t => r2.topics.includes(t))
        )
      )

      const sameLanguage = cluster1.repos.some(r1 =>
        cluster2.repos.some(r2 => r1.language === r2.language)
      )

      const relatedCategories = 
        (cluster1.category === 'brain' || cluster2.category === 'brain') ||
        (cluster1.category === cluster2.category)

      let strength = 0
      if (sharedTopics) strength += 0.4
      if (sameLanguage) strength += 0.3
      if (relatedCategories) strength += 0.3

      if (strength > 0) {
        const colorMix = blendColors(cluster1.color, cluster2.color)
        connections.push({
          from: cluster1.id,
          to: cluster2.id,
          strength,
          dataFlow: Math.random() * 0.5 + 0.5,
          pulseSpeed: 1 + Math.random(),
          color: colorMix
        })
      }
    })
  })

  return connections
}

function blendColors(color1: string, color2: string): string {
  const colorMap: Record<string, [number, number, number]> = {
    gold: [255, 215, 0],
    blue: [96, 119, 255],
    purple: [138, 43, 226],
    yellow: [255, 220, 100],
    red: [255, 80, 80],
    orange: [255, 150, 80],
    green: [100, 255, 150],
    pink: [255, 100, 220]
  }

  const c1 = colorMap[color1] || colorMap.blue
  const c2 = colorMap[color2] || colorMap.blue

  const mixed: [number, number, number] = [
    Math.floor((c1[0] + c2[0]) / 2),
    Math.floor((c1[1] + c2[1]) / 2),
    Math.floor((c1[2] + c2[2]) / 2)
  ]

  return `${mixed[0]}, ${mixed[1]}, ${mixed[2]}`
}

export function getClusterStats(cluster: Cluster) {
  const totalStars = cluster.repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const avgStars = cluster.repos.length > 0 ? totalStars / cluster.repos.length : 0
  
  const languages = new Set(cluster.repos.map(r => r.language).filter(Boolean))
  
  const lastUpdate = cluster.repos.reduce((latest, r) => {
    const updateTime = new Date(r.updated_at).getTime()
    return updateTime > latest ? updateTime : latest
  }, 0)

  const daysSinceUpdate = (Date.now() - lastUpdate) / (1000 * 60 * 60 * 24)

  return {
    repoCount: cluster.repos.length,
    totalStars,
    avgStars: Math.round(avgStars * 10) / 10,
    languages: Array.from(languages),
    lastUpdate: new Date(lastUpdate),
    daysSinceUpdate: Math.round(daysSinceUpdate),
    isActive: daysSinceUpdate < 30
  }
}
