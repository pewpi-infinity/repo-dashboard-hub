import { Octokit } from 'octokit'
import crypto from 'crypto'
import Repository from './models/Repository'
import File from './models/File'
import Activity from './models/Activity'
import { connectToDatabase } from './mongodb'

export interface ScanResult {
  success: boolean
  repository?: any
  filesScanned: number
  filesChanged: number
  errors: string[]
}

export interface FileInfo {
  path: string
  filename: string
  content: string
  size: number
  sha: string
  language?: string
}

/**
 * Generate SHA256 hash of file content
 */
export function hashContent(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex')
}

/**
 * Detect language from file extension
 */
export function detectLanguage(filename: string): string | undefined {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  const languageMap: Record<string, string> = {
    'ts': 'TypeScript',
    'tsx': 'TypeScript',
    'js': 'JavaScript',
    'jsx': 'JavaScript',
    'py': 'Python',
    'java': 'Java',
    'cpp': 'C++',
    'c': 'C',
    'go': 'Go',
    'rs': 'Rust',
    'rb': 'Ruby',
    'php': 'PHP',
    'swift': 'Swift',
    'kt': 'Kotlin',
    'scala': 'Scala',
    'cs': 'C#',
    'html': 'HTML',
    'css': 'CSS',
    'scss': 'SCSS',
    'md': 'Markdown',
    'json': 'JSON',
    'yaml': 'YAML',
    'yml': 'YAML',
    'xml': 'XML',
    'sql': 'SQL',
  }
  
  return ext ? languageMap[ext] : undefined
}

/**
 * Scan all files in a repository
 */
export async function scanRepositoryFiles(
  octokit: Octokit,
  owner: string,
  repo: string,
  branch: string = 'main'
): Promise<FileInfo[]> {
  const files: FileInfo[] = []
  
  try {
    // Get the tree (all files) recursively
    const { data: refData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`,
    })
    
    const treeSha = refData.object.sha
    
    const { data: treeData } = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: treeSha,
      recursive: 'true',
    })
    
    // Filter to only files (not directories or submodules)
    const fileNodes = treeData.tree.filter(
      (node) => node.type === 'blob' && node.path
    )
    
    // Fetch content for each file (limited to first 100 to avoid rate limits)
    const filesToFetch = fileNodes.slice(0, 100)
    
    for (const node of filesToFetch) {
      try {
        const { data: fileData } = await octokit.rest.git.getBlob({
          owner,
          repo,
          file_sha: node.sha!,
        })
        
        // Decode base64 content
        const content = Buffer.from(fileData.content, 'base64').toString('utf-8')
        
        files.push({
          path: node.path!,
          filename: node.path!.split('/').pop()!,
          content,
          size: node.size || 0,
          sha: node.sha!,
          language: detectLanguage(node.path!),
        })
      } catch (error) {
        console.error(`Error fetching file ${node.path}:`, error)
      }
    }
  } catch (error) {
    console.error('Error scanning repository files:', error)
    throw error
  }
  
  return files
}

/**
 * Sync repository data to MongoDB
 */
export async function syncRepositoryToDatabase(
  octokit: Octokit,
  repoData: any
): Promise<ScanResult> {
  const result: ScanResult = {
    success: false,
    filesScanned: 0,
    filesChanged: 0,
    errors: [],
  }
  
  try {
    // Connect to database
    await connectToDatabase()
    
    // Find or create repository record
    let repoRecord = await Repository.findOne({ github_id: repoData.id })
    
    if (!repoRecord) {
      repoRecord = await Repository.create({
        github_id: repoData.id,
        name: repoData.name,
        owner: repoData.owner.login,
        full_name: repoData.full_name,
        description: repoData.description || '',
        url: repoData.html_url,
        language: repoData.language,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        last_sync: new Date(),
        health_score: 0,
        file_count: 0,
      })
      
      // Log activity
      await Activity.create({
        repo_id: repoRecord._id,
        event_type: 'sync',
        timestamp: new Date(),
        details: {
          action: 'repository_created',
          repository: repoData.full_name,
        },
      })
    } else {
      // Update repository data
      repoRecord.name = repoData.name
      repoRecord.description = repoData.description || ''
      repoRecord.language = repoData.language
      repoRecord.stars = repoData.stargazers_count
      repoRecord.forks = repoData.forks_count
      repoRecord.last_sync = new Date()
      await repoRecord.save()
    }
    
    // Scan repository files
    const files = await scanRepositoryFiles(
      octokit,
      repoData.owner.login,
      repoData.name,
      repoData.default_branch || 'main'
    )
    
    result.filesScanned = files.length
    
    // Update files in database
    for (const fileInfo of files) {
      const contentHash = hashContent(fileInfo.content)
      
      // Check if file exists and has changed
      const existingFile = await File.findOne({
        repo_id: repoRecord._id,
        path: fileInfo.path,
      })
      
      if (!existingFile) {
        // New file
        await File.create({
          repo_id: repoRecord._id,
          path: fileInfo.path,
          filename: fileInfo.filename,
          content_hash: contentHash,
          size: fileInfo.size,
          language: fileInfo.language,
          last_updated: new Date(),
          content_preview: fileInfo.content.substring(0, 500),
        })
        
        result.filesChanged++
        
        // Log activity
        await Activity.create({
          repo_id: repoRecord._id,
          event_type: 'file_change',
          timestamp: new Date(),
          details: {
            action: 'file_added',
            path: fileInfo.path,
            size: fileInfo.size,
          },
        })
      } else if (existingFile.content_hash !== contentHash) {
        // File changed
        existingFile.content_hash = contentHash
        existingFile.size = fileInfo.size
        existingFile.language = fileInfo.language
        existingFile.last_updated = new Date()
        existingFile.content_preview = fileInfo.content.substring(0, 500)
        await existingFile.save()
        
        result.filesChanged++
        
        // Log activity
        await Activity.create({
          repo_id: repoRecord._id,
          event_type: 'file_change',
          timestamp: new Date(),
          details: {
            action: 'file_modified',
            path: fileInfo.path,
            size: fileInfo.size,
            old_hash: existingFile.content_hash,
            new_hash: contentHash,
          },
        })
      }
    }
    
    // Update file count
    repoRecord.file_count = files.length
    await repoRecord.save()
    
    result.success = true
    result.repository = repoRecord
    
    console.log(
      `✅ Synced ${repoData.full_name}: ${result.filesScanned} files, ${result.filesChanged} changed`
    )
  } catch (error) {
    console.error('Error syncing repository:', error)
    result.errors.push(error instanceof Error ? error.message : 'Unknown error')
  }
  
  return result
}

/**
 * Scan all repositories for a user/organization
 */
export async function scanAllRepositories(
  octokit: Octokit,
  owner: string
): Promise<{ results: ScanResult[]; totalScanned: number; totalChanged: number }> {
  const results: ScanResult[] = []
  let totalScanned = 0
  let totalChanged = 0
  
  try {
    // Get all repositories
    const { data: repos } = await octokit.rest.repos.listForUser({
      username: owner,
      per_page: 100,
    })
    
    console.log(`📊 Found ${repos.length} repositories to scan`)
    
    // Sync each repository
    for (const repo of repos) {
      const result = await syncRepositoryToDatabase(octokit, repo)
      results.push(result)
      totalScanned += result.filesScanned
      totalChanged += result.filesChanged
    }
    
    console.log(
      `✅ Scan complete: ${totalScanned} files scanned, ${totalChanged} changed`
    )
  } catch (error) {
    console.error('Error scanning repositories:', error)
  }
  
  return { results, totalScanned, totalChanged }
}
