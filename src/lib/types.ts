export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  updated_at: string
  stargazers_count: number
  language: string | null
  topics: string[]
  open_issues_count?: number
  forks_count?: number
  watchers_count?: number
  size?: number
}

export type ComponentCategory = 'brain' | 'quantum' | 'time' | 'os' | 'other'

export interface CategorizedRepo extends Repository {
  category: ComponentCategory
}

export interface CommitActivity {
  days: number[]
  total: number
  week: number
}

export interface Contributor {
  login: string
  avatar_url: string
  contributions: number
  html_url: string
}

export interface RepoStats {
  commitActivity: CommitActivity[]
  contributors: Contributor[]
  languages: Record<string, number>
}
