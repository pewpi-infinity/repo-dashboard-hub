import type { Repository, CommitActivity, Contributor, RepoStats } from './types'

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

export async function fetchCommitActivity(repoName: string): Promise<CommitActivity[]> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${ORG_NAME}/${repoName}/stats/commit_activity`)
    
    if (!response.ok) {
      if (response.status === 202) {
        return []
      }
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    const activity: CommitActivity[] = await response.json()
    return activity || []
  } catch (error) {
    console.error(`Failed to fetch commit activity for ${repoName}:`, error)
    return []
  }
}

export async function fetchContributors(repoName: string): Promise<Contributor[]> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${ORG_NAME}/${repoName}/contributors?per_page=10`)
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    const contributors: Contributor[] = await response.json()
    return contributors || []
  } catch (error) {
    console.error(`Failed to fetch contributors for ${repoName}:`, error)
    return []
  }
}

export async function fetchLanguages(repoName: string): Promise<Record<string, number>> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${ORG_NAME}/${repoName}/languages`)
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    const languages: Record<string, number> = await response.json()
    return languages || {}
  } catch (error) {
    console.error(`Failed to fetch languages for ${repoName}:`, error)
    return {}
  }
}

export async function fetchRepoStats(repoName: string): Promise<RepoStats> {
  try {
    const [commitActivity, contributors, languages] = await Promise.all([
      fetchCommitActivity(repoName),
      fetchContributors(repoName),
      fetchLanguages(repoName)
    ])
    
    return {
      commitActivity,
      contributors,
      languages
    }
  } catch (error) {
    console.error(`Failed to fetch stats for ${repoName}:`, error)
    throw error
  }
}
