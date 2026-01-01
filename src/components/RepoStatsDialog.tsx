import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CommitActivityChart } from './CommitActivityChart'
import { ContributorsList } from './ContributorsList'
import { LanguageStats } from './LanguageStats'
import { RepoStatsOverview } from './RepoStatsOverview'
import { fetchRepoStats } from '@/lib/github-api'
import type { CategorizedRepo, RepoStats } from '@/lib/types'
import { Warning } from '@phosphor-icons/react'

interface RepoStatsDialogProps {
  repo: CategorizedRepo | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RepoStatsDialog({ repo, open, onOpenChange }: RepoStatsDialogProps) {
  const [stats, setStats] = useState<RepoStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !repo) {
      setStats(null)
      setError(null)
      return
    }

    const loadStats = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const repoStats = await fetchRepoStats(repo.name)
        setStats(repoStats)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load statistics'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [repo, open])

  if (!repo) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-lg border-border/50">
        <DialogHeader>
          <DialogTitle 
            className="text-2xl bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {repo.name}
          </DialogTitle>
          <DialogDescription className="text-base">
            {repo.description || 'Repository statistics and analytics'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <RepoStatsOverview repo={repo} />

          {error && (
            <Alert variant="destructive">
              <Warning size={20} />
              <AlertDescription className="ml-2">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-64 rounded-xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-96 rounded-xl" />
                <Skeleton className="h-96 rounded-xl" />
              </div>
            </div>
          ) : stats ? (
            <>
              <CommitActivityChart 
                activity={stats.commitActivity} 
                repoName={repo.name} 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContributorsList 
                  contributors={stats.contributors} 
                  repoName={repo.name} 
                />
                <LanguageStats 
                  languages={stats.languages} 
                  repoName={repo.name} 
                />
              </div>
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
