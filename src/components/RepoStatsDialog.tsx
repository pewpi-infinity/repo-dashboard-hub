import { useState, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CommitActivityChart } from './CommitActivityChart'
import { ContributorsList } from './ContributorsList'
import { LanguageStats } from './LanguageStats'
import { RepoStatsOverview } from './RepoStatsOverview'
import { HealthMonitorDashboard } from './HealthMonitorDashboard'
import { AlertPanel } from './AlertPanel'
import { Jukebox } from './Jukebox'
import { MediaGallery } from './MediaGallery'
import { fetchRepoStats } from '@/lib/github-api'
import { calculateHealthMetrics } from '@/lib/health-monitor'
import { getMediaForRepo, getMusicForRepo } from '@/lib/media-semantic'
import type { CategorizedRepo, RepoStats } from '@/lib/types'
import { Warning, ChartLine, Bell, Image, MusicNotes } from '@phosphor-icons/react'

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

  const healthMetrics = useMemo(() => {
    if (!stats || !repo) return null
    return calculateHealthMetrics(repo, stats.commitActivity)
  }, [repo, stats])

  const hasMedia = useMemo(() => {
    if (!repo) return false
    return getMediaForRepo(repo.name).length > 0
  }, [repo])

  const hasMusic = useMemo(() => {
    if (!repo) return false
    return getMusicForRepo(repo.name).length > 0
  }, [repo])

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
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-64 rounded-xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-96 rounded-xl" />
                <Skeleton className="h-96 rounded-xl" />
              </div>
            </div>
          ) : error ? (
            <>
              <RepoStatsOverview repo={repo} />
              <Alert variant="destructive">
                <Warning size={20} />
                <AlertDescription className="ml-2">
                  {error}
                </AlertDescription>
              </Alert>
            </>
          ) : stats && healthMetrics ? (
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 lg:w-auto lg:inline-grid">
                <TabsTrigger value="overview" className="gap-2">
                  <ChartLine size={16} />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="health" className="gap-2">
                  <ChartLine size={16} />
                  <span className="hidden sm:inline">Health</span>
                </TabsTrigger>
                <TabsTrigger value="alerts" className="gap-2">
                  <Bell size={16} />
                  <span className="hidden sm:inline">Alerts</span>
                  {healthMetrics.alerts.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-destructive text-destructive-foreground rounded-full">
                      {healthMetrics.alerts.length}
                    </span>
                  )}
                </TabsTrigger>
                {hasMedia && (
                  <TabsTrigger value="media" className="gap-2">
                    <Image size={16} />
                    <span className="hidden sm:inline">Media</span>
                  </TabsTrigger>
                )}
                {hasMusic && (
                  <TabsTrigger value="music" className="gap-2">
                    <MusicNotes size={16} />
                    <span className="hidden sm:inline">Music</span>
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <RepoStatsOverview repo={repo} />
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
              </TabsContent>

              <TabsContent value="health" className="space-y-6">
                <HealthMonitorDashboard 
                  metrics={healthMetrics}
                  repoName={repo.name}
                />
                <CommitActivityChart 
                  activity={stats.commitActivity} 
                  repoName={repo.name} 
                />
              </TabsContent>

              <TabsContent value="alerts">
                <AlertPanel alerts={healthMetrics.alerts} compact />
              </TabsContent>

              {hasMedia && (
                <TabsContent value="media" className="space-y-6">
                  <MediaGallery repoName={repo.name} />
                </TabsContent>
              )}

              {hasMusic && (
                <TabsContent value="music" className="space-y-6">
                  <Jukebox repoName={repo.name} />
                </TabsContent>
              )}
            </Tabs>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
