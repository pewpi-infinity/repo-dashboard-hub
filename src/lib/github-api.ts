import { Octokit } from 'octokit'
import type { Repository, CommitActivity, Contributor, RepoStats, ComponentCategory } from './types'
import { toast } from 'sonner'

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

function handleApiError(error: any, context: string): never {
  console.error(`${context}:`, error)
  
  let errorMessage = 'An unexpected error occurred'
  let shouldRetry = false
  
  if (error?.status === 401) {
    errorMessage = 'Authentication failed. Please check your GitHub token.'
  } else if (error?.status === 403) {
    if (error?.response?.headers?.['x-ratelimit-remaining'] === '0') {
      const resetTime = error?.response?.headers?.['x-ratelimit-reset']
      const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null
      errorMessage = `GitHub API rate limit exceeded. Resets at ${resetDate?.toLocaleTimeString() || 'soon'}.`
      shouldRetry = true
    } else {
      errorMessage = 'Access forbidden. You may need authentication or permissions.'
    }
  } else if (error?.status === 404) {
    errorMessage = 'Resource not found. Repository may not exist or is private.'
  } else if (error?.status === 422) {
    errorMessage = 'Invalid request. Please check your input.'
  } else if (error?.status >= 500) {
    errorMessage = 'GitHub server error. Please try again later.'
    shouldRetry = true
  } else if (error?.message?.includes('fetch')) {
    errorMessage = 'Network error. Please check your connection.'
    shouldRetry = true
  } else if (error?.message) {
    errorMessage = error.message
  }
  
  toast.error(`${context}`, {
    description: errorMessage,
    action: shouldRetry ? {
      label: 'Retry',
      onClick: () => window.location.reload()
    } : undefined,
    duration: 6000
  })
  
  throw new Error(errorMessage)
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
    handleApiError(error, 'Failed to load repositories')
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
    handleApiError(error, `Failed to fetch repository: ${repoName}`)
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
  } catch (error: any) {
    console.error(`Failed to fetch commit activity for ${repoName}:`, error)
    if (error?.status !== 404) {
      toast.warning(`Unable to load commit activity for ${repoName}`, {
        description: 'Statistics may be temporarily unavailable',
        duration: 3000
      })
    }
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
  } catch (error: any) {
    console.error(`Failed to fetch contributors for ${repoName}:`, error)
    if (error?.status !== 404) {
      toast.warning(`Unable to load contributors for ${repoName}`, {
        description: 'Contributor data may be temporarily unavailable',
        duration: 3000
      })
    }
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
  } catch (error: any) {
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
    toast.error(`Failed to load complete stats for ${repoName}`, {
      description: 'Some repository statistics could not be retrieved',
      duration: 4000
    })
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
    const errorMsg = 'GitHub authentication required. Please authenticate first.'
    toast.error('Cannot create repository', {
      description: errorMsg,
      action: {
        label: 'Authenticate',
        onClick: () => {
          const authElement = document.querySelector('[data-github-auth]')
          authElement?.scrollIntoView({ behavior: 'smooth' })
        }
      },
      duration: 6000
    })
    throw new Error(errorMsg)
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
      try {
        await authenticatedOctokit.rest.repos.replaceAllTopics({
          owner: data.owner.login,
          repo: data.name,
          names: topics
        })
      } catch (topicError) {
        console.error('Failed to set topics:', topicError)
        toast.warning('Repository created but topics failed', {
          description: 'You can manually add topics to the repository later',
          duration: 4000
        })
      }
    }

    return data as Repository
  } catch (error: any) {
    let errorMessage = 'Failed to create repository'
    let description = 'An unexpected error occurred'
    
    if (error?.status === 422) {
      errorMessage = 'Repository creation failed'
      description = 'Repository name already exists or is invalid'
    } else if (error?.status === 401) {
      errorMessage = 'Authentication expired'
      description = 'Please re-authenticate with GitHub'
    } else if (error?.status === 403) {
      errorMessage = 'Permission denied'
      description = 'You may not have permission to create repositories'
    } else if (error?.message) {
      description = error.message
    }
    
    console.error('Failed to create repository:', error)
    toast.error(errorMessage, {
      description,
      duration: 6000
    })
    throw new Error(description)
  }
}

export async function getAuthenticatedUser() {
  if (!authenticatedOctokit) {
    return null
  }

  try {
    const { data } = await authenticatedOctokit.rest.users.getAuthenticated()
    return data
  } catch (error: any) {
    console.error('Failed to get authenticated user:', error)
    
    if (error?.status === 401) {
      toast.error('Authentication expired', {
        description: 'Please re-authenticate with GitHub',
        duration: 5000
      })
    }
    
    return null
  }
}
