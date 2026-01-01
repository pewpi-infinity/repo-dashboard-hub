import { Octokit } from 'octokit'
import type { Repository, CommitActivity, Contributor, RepoStats, ComponentCategory } from './types'

const USERNAME = 'pewpi-infinity'
let octokit = new Octokit()
let authenticatedOctokit: Octokit | null = null

export function setGitHubToken(token: string) {
  authenticatedOctokit = new Octokit({ auth: token })
}

export function clearGitHubToken() {
  authenticatedOctokit = null
}

export function isAuthenticated(): boolean {
  return authenticatedOctokit !== null
}

function getOctokit(): Octokit {
  return authenticatedOctokit || octokit
}

export async function fetchOrgRepositories(): Promise<Repository[]> {
  try {
    const client = getOctokit()
    const { data } = await client.rest.repos.listForUser({
      username: USERNAME,
      per_page: 100,
      sort: 'updated'
    })
    
    return data as Repository[]
  } catch (error) {
    console.error('Failed to fetch repositories:', error)
    throw error
  }
}

export async function fetchRepository(repoName: string): Promise<Repository> {
  try {
    const client = getOctokit()
    const { data } = await client.rest.repos.get({
      owner: USERNAME,
      repo: repoName
    })
    
    return data as Repository
  } catch (error) {
    console.error(`Failed to fetch repository ${repoName}:`, error)
    throw error
  }
}

export async function fetchCommitActivity(repoName: string): Promise<CommitActivity[]> {
  try {
    const client = getOctokit()
    const { data } = await client.rest.repos.getCommitActivityStats({
      owner: USERNAME,
      repo: repoName
    })
    
    return (data || []) as CommitActivity[]
  } catch (error) {
    console.error(`Failed to fetch commit activity for ${repoName}:`, error)
    return []
  }
}

export async function fetchContributors(repoName: string): Promise<Contributor[]> {
  try {
    const client = getOctokit()
    const { data } = await client.rest.repos.listContributors({
      owner: USERNAME,
      repo: repoName,
      per_page: 10
    })
    
    return (data || []) as Contributor[]
  } catch (error) {
    console.error(`Failed to fetch contributors for ${repoName}:`, error)
    return []
  }
}

export async function fetchLanguages(repoName: string): Promise<Record<string, number>> {
  try {
    const client = getOctokit()
    const { data } = await client.rest.repos.listLanguages({
      owner: USERNAME,
      repo: repoName
    })
    
    return data || {}
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

export interface CreateRepoParams {
  name: string
  description: string
  isPrivate: boolean
  topics?: string[]
  autoInit?: boolean
  category?: ComponentCategory
  emoji?: string
}

export async function createRepository(params: CreateRepoParams): Promise<Repository> {
  if (!authenticatedOctokit) {
    throw new Error('GitHub authentication required. Please authenticate first.')
  }

  try {
    const topics: string[] = params.topics || []
    
    if (params.category) {
      topics.push(`category-${params.category}`)
    }
    if (params.emoji) {
      topics.push('legend-system')
    }

    const { data } = await authenticatedOctokit.rest.repos.createForAuthenticatedUser({
      name: params.name,
      description: params.description,
      private: params.isPrivate,
      auto_init: params.autoInit !== false,
      has_issues: true,
      has_projects: true,
      has_wiki: false
    })

    if (topics.length > 0) {
      await authenticatedOctokit.rest.repos.replaceAllTopics({
        owner: data.owner.login,
        repo: data.name,
        names: topics
      })
    }

    return data as Repository
  } catch (error: any) {
    if (error?.status === 422) {
      throw new Error('Repository name already exists or is invalid')
    } else if (error?.status === 401) {
      throw new Error('Authentication failed. Please re-authenticate.')
    }
    console.error('Failed to create repository:', error)
    throw error
  }
}

export async function getAuthenticatedUser() {
  if (!authenticatedOctokit) {
    return null
  }

  try {
    const { data } = await authenticatedOctokit.rest.users.getAuthenticated()
    return data
  } catch (error) {
    console.error('Failed to get authenticated user:', error)
    return null
  }
}
