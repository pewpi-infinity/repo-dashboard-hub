import type { Repository } from './types'

const ORG_NAME = 'pewpi-infinity'
const GITHUB_API = 'https://api.github.com'

export async function fetchOrgRepositories(): Promise<Repository[]> {
  try {
    const response = await fetch(`${GITHUB_API}/orgs/${ORG_NAME}/repos?per_page=100&sort=updated`)
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    const repos: Repository[] = await response.json()
    return repos
  } catch (error) {
    console.error('Failed to fetch repositories:', error)
    throw error
  }
}

export async function fetchRepository(repoName: string): Promise<Repository> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${ORG_NAME}/${repoName}`)
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    const repo: Repository = await response.json()
    return repo
  } catch (error) {
    console.error(`Failed to fetch repository ${repoName}:`, error)
    throw error
  }
}
