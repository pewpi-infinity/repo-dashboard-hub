import { Octokit } from 'octokit'
import type { Repository, CommitActivity, Contributor, RepoStats } from './types'

const USERNAME = 'pewpi-infinity'
const octokit = new Octokit()

export async function fetchOrgRepositories(): Promise<Repository[]> {
  try {
    const { data } = await octokit.rest.repos.listForUser({
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
    const { data } = await octokit.rest.repos.get({
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
    const { data } = await octokit.rest.repos.getCommitActivityStats({
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
    const { data } = await octokit.rest.repos.listContributors({
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
    const { data } = await octokit.rest.repos.listLanguages({
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
