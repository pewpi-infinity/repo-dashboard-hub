import type { Repository, ComponentCategory, CategorizedRepo } from './types'

export function categorizeRepository(repo: Repository): ComponentCategory {
  const name = repo.name.toLowerCase()
  const description = (repo.description || '').toLowerCase()
  const combined = `${name} ${description}`

  if (name.includes('mongoose') || combined.includes('brain') || combined.includes('neural')) {
    return 'brain'
  }
  
  if (combined.includes('quantum') || combined.includes('qubit') || combined.includes('superposition')) {
    return 'quantum'
  }
  
  if (combined.includes('time') || combined.includes('temporal') || combined.includes('chronos')) {
    return 'time'
  }
  
  if (combined.includes('os') || combined.includes('operating') || combined.includes('system') || combined.includes('kernel')) {
    return 'os'
  }
  
  return 'other'
}

export function getCategoryIcon(category: ComponentCategory): string {
  switch (category) {
    case 'brain':
      return 'Brain'
    case 'quantum':
      return 'Atom'
    case 'time':
      return 'Clock'
    case 'os':
      return 'Gear'
    default:
      return 'Cube'
  }
}

export function getCategoryLabel(category: ComponentCategory): string {
  switch (category) {
    case 'brain':
      return 'Neural Core'
    case 'quantum':
      return 'Quantum Processing'
    case 'time':
      return 'Time Machine'
    case 'os':
      return 'Operating System'
    default:
      return 'Component'
  }
}

export function getCategoryColor(category: ComponentCategory): string {
  switch (category) {
    case 'brain':
      return 'bg-accent text-accent-foreground'
    case 'quantum':
      return 'bg-primary text-primary-foreground'
    case 'time':
      return 'bg-purple-600 text-white'
    case 'os':
      return 'bg-blue-600 text-white'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export function addCategories(repos: Repository[]): CategorizedRepo[] {
  return repos.map(repo => ({
    ...repo,
    category: categorizeRepository(repo)
  }))
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}
