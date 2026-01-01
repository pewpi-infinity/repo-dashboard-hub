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
}

export type ComponentCategory = 'brain' | 'quantum' | 'time' | 'os' | 'other'

export interface CategorizedRepo extends Repository {
  category: ComponentCategory
}
