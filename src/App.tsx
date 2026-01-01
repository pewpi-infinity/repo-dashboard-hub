import { useEffect, useState, useMemo } from 'react'
import { RepositoryCard } from './components/RepositoryCard'
import { RepositoryListItem } from './components/RepositoryListItem'
import { CategoryFilter } from './components/CategoryFilter'
import { EmojiFilter } from './components/EmojiFilter'
import { RepoStatsDialog } from './components/RepoStatsDialog'
import { SearchSort } from './components/SearchSort'
import { ViewToggle, type ViewMode } from './components/ViewToggle'
import { DashboardMetrics } from './components/DashboardMetrics'
import { EmptyState } from './components/EmptyState'
import { SystemStatus } from './components/SystemStatus'
import { QuickLinks } from './components/QuickLinks'
import { RecentActivity } from './components/RecentActivity'
import { HealthOverview } from './components/HealthOverview'
import { AlertPanel } from './components/AlertPanel'
import { LegendPanel } from './components/LegendPanel'
import { TerminalChat } from './components/TerminalChat'
import { AddRepoDialog } from './components/AddRepoDialog'
import { GitHubAuth } from './components/GitHubAuth'
import { QuantumCockpit } from './components/QuantumCockpit'
import { ClusterView } from './components/ClusterView'
import { CreepshowStory } from './components/CreepshowStory'
import { FloatingJukebox } from './components/FloatingJukebox'
import { MusicLibraryView } from './components/MusicLibraryView'
import { Skeleton } from './components/ui/skeleton'
import { Alert, AlertDescription } from './components/ui/alert'
import { Button } from './components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { fetchOrgRepositories, fetchCommitActivity, isAuthenticated } from './lib/github-api'
import { addCategories } from './lib/repo-utils'
import { calculateHealthMetrics, type HealthMetrics, type HealthAlert } from './lib/health-monitor'
import { repoEmojiMap } from './lib/emoji-legend'
import type { CategorizedRepo, ComponentCategory } from './lib/types'
import { ArrowClockwise, Warning, ChartLine, Bell, Plus, Terminal, Atom, Graph, FilmStrip, MusicNotes } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'

export type SortOption = 'name' | 'updated' | 'stars' | 'language'
export type SortDirection = 'asc' | 'desc'

function App() {
  const [repos, setRepos] = useState<CategorizedRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<ComponentCategory | 'all'>('all')
  const [selectedRepo, setSelectedRepo] = useState<CategorizedRepo | null>(null)
  const [statsDialogOpen, setStatsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('updated')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [viewMode, setViewMode] = useKV<ViewMode>('view-mode', 'grid')
  const [healthMetrics, setHealthMetrics] = useState<Map<string, HealthMetrics>>(new Map())
  const [monitoringEnabled, setMonitoringEnabled] = useState(true)
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])
  const [addRepoDialogOpen, setAddRepoDialogOpen] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [githubAuthenticated, setGithubAuthenticated] = useState(false)
  const [currentView, setCurrentView] = useKV<'dashboard' | 'quantum' | 'clusters' | 'creepshow' | 'music'>('current-view', 'dashboard')
  const [jukeboxTrack, setJukeboxTrack] = useState<any>(null)

  const currentViewMode: ViewMode = viewMode || 'grid'

  useEffect(() => {
    setGithubAuthenticated(isAuthenticated())
  }, [])

  const loadRepositories = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const fetchedRepos = await fetchOrgRepositories()
      const categorizedRepos = addCategories(fetchedRepos)
      setRepos(categorizedRepos)
      toast.success(`Loaded ${categorizedRepos.length} repositories`)
      
      if (monitoringEnabled) {
        loadHealthMetrics(categorizedRepos)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load repositories'
      setError(message)
      toast.error('Failed to load repositories')
    } finally {
      setLoading(false)
    }
  }

  const loadHealthMetrics = async (reposToMonitor: CategorizedRepo[]) => {
    const metricsMap = new Map<string, HealthMetrics>()
    
    const promises = reposToMonitor.map(async (repo) => {
      try {
        const commitActivity = await fetchCommitActivity(repo.name)
        const metrics = calculateHealthMetrics(repo, commitActivity)
        metricsMap.set(repo.name, metrics)
        
        if (metrics.alerts.length > 0) {
          const criticalAlerts = metrics.alerts.filter(a => a.severity === 'critical')
          if (criticalAlerts.length > 0) {
            toast.error(`${repo.name}: ${criticalAlerts[0].message}`, {
              duration: 5000
            })
          }
        }
      } catch (err) {
        console.error(`Failed to load health metrics for ${repo.name}:`, err)
      }
    })
    
    await Promise.all(promises)
    setHealthMetrics(metricsMap)
  }

  const handleShowStats = (repo: CategorizedRepo) => {
    setSelectedRepo(repo)
    setStatsDialogOpen(true)
  }

  const handleEmojiToggle = (emoji: string) => {
    setSelectedEmojis(prev => 
      prev.includes(emoji) 
        ? prev.filter(e => e !== emoji)
        : [...prev, emoji]
    )
  }

  const handleClearEmojiFilter = () => {
    setSelectedEmojis([])
  }

  const handleAddRepo = async (repoData: {
    name: string
    description: string
    category: ComponentCategory
    emoji: string
    isPrivate: boolean
  }) => {
    if (!githubAuthenticated) {
      toast.error('GitHub authentication required', {
        description: 'Please authenticate with GitHub in the sidebar first.'
      })
      return
    }

    try {
      toast.info(`🧱 Creating repository: ${repoData.name}...`)
      
      const { createRepository } = await import('./lib/github-api')
      const newRepo = await createRepository({
        name: repoData.name,
        description: repoData.description,
        isPrivate: repoData.isPrivate,
        topics: ['legend-system', `category-${repoData.category}`],
        category: repoData.category,
        emoji: repoData.emoji
      })

      toast.success(`✅ Repository created successfully!`, {
        description: `${repoData.emoji} ${newRepo.name} is now part of the quantum system!`,
        duration: 5000
      })

      setAddRepoDialogOpen(false)
      await loadRepositories()
    } catch (error: any) {
      toast.error('Failed to create repository', {
        description: error.message || 'Unknown error occurred',
        duration: 5000
      })
    }
  }

  useEffect(() => {
    loadRepositories()
  }, [])

  const allAlerts = useMemo(() => {
    const alerts: HealthAlert[] = []
    healthMetrics.forEach((metrics) => {
      alerts.push(...metrics.alerts)
    })
    return alerts
  }, [healthMetrics])

  const criticalAlertsCount = useMemo(() => {
    return allAlerts.filter(a => a.severity === 'critical').length
  }, [allAlerts])

  const filteredAndSortedRepos = useMemo(() => {
    let filtered = activeCategory === 'all' 
      ? repos 
      : repos.filter(repo => repo.category === activeCategory)

    if (selectedEmojis.length > 0) {
      filtered = filtered.filter(repo => {
        const matchingKey = Object.keys(repoEmojiMap).find(k => 
          repo.name.toLowerCase().includes(k.toLowerCase())
        )
        return matchingKey && selectedEmojis.includes(matchingKey)
      })
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(repo => 
        repo.name.toLowerCase().includes(query) ||
        repo.description?.toLowerCase().includes(query) ||
        repo.topics.some(topic => topic.toLowerCase().includes(query))
      )
    }

    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'updated':
          comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
          break
        case 'stars':
          comparison = a.stargazers_count - b.stargazers_count
          break
        case 'language':
          const langA = a.language || ''
          const langB = b.language || ''
          comparison = langA.localeCompare(langB)
          break
      }
      
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [repos, activeCategory, searchQuery, sortBy, sortDirection, selectedEmojis])

  const brainRepo = repos.find(repo => repo.name.toLowerCase().includes('mongoose'))
  const otherRepos = filteredAndSortedRepos.filter(repo => repo.id !== brainRepo?.id)

  const categoryCounts = repos.reduce((acc, repo) => {
    acc[repo.category] = (acc[repo.category] || 0) + 1
    return acc
  }, { all: repos.length, brain: 0, quantum: 0, time: 0, os: 0, other: 0 } as Record<ComponentCategory | 'all', number>)

  return (
    <div className="min-h-screen bg-background text-foreground circuit-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-blue/5 to-accent/10 pointer-events-none" />
      <div className="absolute inset-0 opacity-30 pointer-events-none" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, oklch(0.60 0.25 250 / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, oklch(0.75 0.18 200 / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, oklch(0.55 0.22 290 / 0.15) 0%, transparent 50%)
          `
        }}
      />
      
      <div className="relative">
        <header className="border-b border-border/50 backdrop-blur-sm bg-gradient-to-r from-card/90 via-card/80 to-card/90 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h1 
                    className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-yellow via-accent to-pink bg-clip-text text-transparent truncate"
                    style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.02em' }}
                  >
                    {currentView === 'quantum' ? '🪐 /K QUANTUM COCKPIT' : 
                     currentView === 'clusters' ? '🎯 CLUSTER GROUPING' : 
                     currentView === 'creepshow' ? '🎬 CREEPSHOW STORY' :
                     currentView === 'music' ? '🎵 QUANTUM JUKEBOX' :
                     '🎮 AC DASHBOARD'}
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {currentView === 'quantum' ? (
                      <><span className="text-purple">🪐</span> Real-time System Coordination & Neural Learning Visualization</>
                    ) : currentView === 'clusters' ? (
                      <><span className="text-purple">🎯</span> Intelligent Cluster Formation & Group Coordination</>
                    ) : currentView === 'creepshow' ? (
                      <><span className="text-red">🎬</span> Interactive Branching Story - Correct Scripts to Change Fate</>
                    ) : currentView === 'music' ? (
                      <><span className="text-pink">🎵</span> Semantic Music Library - Songs Matched to Machine Journeys</>
                    ) : (
                      <><span className="text-gold">👑</span> Pewpi Infinity Quantum Computing & Time Machine System</>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant={currentView === 'dashboard' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('dashboard')}
                  className={`gap-1.5 transition-all text-xs ${
                    currentView === 'dashboard' 
                      ? 'bg-gradient-to-r from-gold to-yellow hover:from-gold/90 hover:to-yellow/90 shadow-lg shadow-gold/30' 
                      : 'hover:bg-gold/10 hover:border-gold hover:text-gold'
                  }`}
                >
                  <ChartLine size={14} weight="fill" />
                  <span className="font-mono font-bold hidden sm:inline">Dashboard</span>
                  <span className="font-mono font-bold sm:hidden">Dash</span>
                </Button>
                <Button
                  variant={currentView === 'quantum' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('quantum')}
                  className={`gap-1.5 transition-all text-xs ${
                    currentView === 'quantum' 
                      ? 'bg-gradient-to-r from-purple to-pink hover:from-purple/90 hover:to-pink/90 shadow-lg shadow-purple/30' 
                      : 'hover:bg-purple/10 hover:border-purple hover:text-purple'
                  }`}
                >
                  <Atom size={14} weight="fill" />
                  <span className="font-mono font-bold">/K</span>
                </Button>
                <Button
                  variant={currentView === 'clusters' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('clusters')}
                  className={`gap-1.5 transition-all text-xs ${
                    currentView === 'clusters' 
                      ? 'bg-gradient-to-r from-accent to-blue hover:from-accent/90 hover:to-blue/90 shadow-lg shadow-accent/30' 
                      : 'hover:bg-accent/10 hover:border-accent hover:text-accent'
                  }`}
                >
                  <Graph size={14} weight="fill" />
                  <span className="font-mono font-bold hidden sm:inline">Clusters</span>
                  <span className="font-mono font-bold sm:hidden">Clust</span>
                </Button>
                <Button
                  variant={currentView === 'creepshow' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('creepshow')}
                  className={`gap-1.5 transition-all text-xs ${
                    currentView === 'creepshow' 
                      ? 'bg-gradient-to-r from-red to-pink hover:from-red/90 hover:to-pink/90 shadow-lg shadow-red/30' 
                      : 'hover:bg-red/10 hover:border-red hover:text-red'
                  }`}
                >
                  <FilmStrip size={14} weight="fill" />
                  <span className="font-mono font-bold hidden sm:inline">Story</span>
                  <span className="font-mono font-bold sm:hidden">Story</span>
                </Button>
                <Button
                  variant={currentView === 'music' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('music')}
                  className={`gap-1.5 transition-all text-xs ${
                    currentView === 'music' 
                      ? 'bg-gradient-to-r from-pink to-purple hover:from-pink/90 hover:to-purple/90 shadow-lg shadow-pink/30' 
                      : 'hover:bg-pink/10 hover:border-pink hover:text-pink'
                  }`}
                >
                  <MusicNotes size={14} weight="fill" />
                  <span className="font-mono font-bold hidden sm:inline">Music</span>
                  <span className="font-mono font-bold sm:hidden">Music</span>
                </Button>
                <div className="h-4 w-px bg-border mx-1" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTerminal(!showTerminal)}
                  className="gap-1.5 hover:bg-primary/10 hover:border-primary hover:text-primary text-xs"
                >
                  <Terminal className={showTerminal ? 'text-accent' : ''} size={14} />
                  <span className="hidden sm:inline">Terminal</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setAddRepoDialogOpen(true)}
                  className="gap-1.5 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-xs"
                >
                  <Plus size={14} weight="bold" />
                  <span className="hidden sm:inline">Add Machine</span>
                  <span className="sm:hidden">Add</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadRepositories}
                  disabled={loading}
                  className="gap-1.5 hover:bg-accent/10 hover:border-accent hover:text-accent text-xs"
                >
                  <ArrowClockwise className={loading ? 'animate-spin' : ''} size={14} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <Warning size={20} />
              <AlertDescription className="ml-2">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {currentView === 'creepshow' ? (
            <CreepshowStory />
          ) : currentView === 'music' ? (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-64 flex-shrink-0 space-y-4">
                <GitHubAuth onAuthChange={setGithubAuthenticated} />
                <SystemStatus repoCount={repos.length} isLoading={loading} />
                <LegendPanel />
              </div>

              <div className="flex-1 min-w-0">
                <MusicLibraryView 
                  onSelectTrack={setJukeboxTrack}
                  currentTrackId={jukeboxTrack?.id}
                />
              </div>
            </div>
          ) : currentView === 'quantum' ? (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-64 flex-shrink-0 space-y-4">
                <GitHubAuth onAuthChange={setGithubAuthenticated} />
                <SystemStatus repoCount={repos.length} isLoading={loading} />
                {healthMetrics.size > 0 && (
                  <HealthOverview allMetrics={healthMetrics} />
                )}
                <LegendPanel />
              </div>

              <div className="flex-1 min-w-0">
                {loading ? (
                  <Skeleton className="h-[600px] rounded-xl" />
                ) : repos.length === 0 ? (
                  <EmptyState hasSearchQuery={false} />
                ) : (
                  <QuantumCockpit 
                    repos={repos} 
                    healthMetrics={healthMetrics}
                    onRepoClick={handleShowStats}
                  />
                )}
              </div>
            </div>
          ) : currentView === 'clusters' ? (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-64 flex-shrink-0 space-y-4">
                <GitHubAuth onAuthChange={setGithubAuthenticated} />
                <SystemStatus repoCount={repos.length} isLoading={loading} />
                {healthMetrics.size > 0 && (
                  <HealthOverview allMetrics={healthMetrics} />
                )}
                <LegendPanel />
              </div>

              <div className="flex-1 min-w-0">
                {loading ? (
                  <Skeleton className="h-[600px] rounded-xl" />
                ) : repos.length === 0 ? (
                  <EmptyState hasSearchQuery={false} />
                ) : (
                  <ClusterView 
                    repos={repos} 
                    healthMetrics={healthMetrics}
                    onRepoClick={handleShowStats}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 flex-shrink-0 space-y-4">
              <GitHubAuth onAuthChange={setGithubAuthenticated} />
              <SystemStatus repoCount={repos.length} isLoading={loading} />
              {healthMetrics.size > 0 && (
                <HealthOverview allMetrics={healthMetrics} />
              )}
              <LegendPanel />
              <QuickLinks />
              {repos.length > 0 && <RecentActivity repos={repos} />}
            </div>

            <div className="flex-1 min-w-0 space-y-6">
              {showTerminal && (
                <TerminalChat 
                  repos={repos} 
                  isAuthenticated={githubAuthenticated}
                  onCreateRepo={handleAddRepo}
                  onRepoCreated={loadRepositories}
                />
              )}
              
              <div>
              {loading ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-32 rounded-xl" />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(2)].map((_, i) => (
                      <Skeleton key={i} className="h-64 rounded-xl" />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-9 w-32" />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-64 rounded-xl" />
                    ))}
                  </div>
                </div>
              ) : repos.length === 0 ? (
                <EmptyState hasSearchQuery={false} />
              ) : (
                <>
                  <DashboardMetrics repos={repos} loading={loading} />
              
              <Tabs defaultValue="repositories" className="mb-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="repositories" className="gap-2">
                    <ChartLine size={16} />
                    Repositories
                  </TabsTrigger>
                  <TabsTrigger value="alerts" className="gap-2">
                    <Bell size={16} />
                    Health Alerts
                    {criticalAlertsCount > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-destructive text-destructive-foreground rounded-full">
                        {criticalAlertsCount}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="repositories" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <EmojiFilter
                      selectedEmojis={selectedEmojis}
                      onEmojiToggle={handleEmojiToggle}
                      onClear={handleClearEmojiFilter}
                      repos={repos}
                    />
                    
                    <CategoryFilter
                      activeCategory={activeCategory}
                      onCategoryChange={setActiveCategory}
                      counts={categoryCounts}
                    />
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                      <SearchSort
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        sortBy={sortBy}
                        onSortByChange={setSortBy}
                        sortDirection={sortDirection}
                        onSortDirectionChange={setSortDirection}
                        resultCount={filteredAndSortedRepos.length}
                        totalCount={repos.length}
                      />
                      
                      <ViewToggle
                        viewMode={currentViewMode}
                        onViewModeChange={setViewMode}
                      />
                    </div>
                  </div>

                  {brainRepo && (activeCategory === 'all' || activeCategory === 'brain') && !searchQuery && (
                    <section className="mb-12">
                      <h2 
                        className="text-2xl font-semibold mb-6 flex items-center gap-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        <span className="text-gold text-3xl">👑</span>
                        <span className="text-purple text-3xl">🧠</span>
                        Neural Core System
                      </h2>
                      <div className={currentViewMode === 'list' ? '' : 'max-w-2xl'}>
                        {currentViewMode === 'grid' ? (
                          <RepositoryCard 
                            repo={brainRepo} 
                            isBrain 
                            onShowStats={handleShowStats}
                            healthMetrics={healthMetrics.get(brainRepo.name)}
                          />
                        ) : (
                          <RepositoryListItem 
                            repo={brainRepo} 
                            isBrain 
                            onShowStats={handleShowStats}
                            healthMetrics={healthMetrics.get(brainRepo.name)}
                          />
                        )}
                      </div>
                    </section>
                  )}

                  {otherRepos.length > 0 ? (
                    <section>
                      <h2 
                        className="text-2xl font-semibold mb-6 flex items-center gap-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        <span className="text-blue text-3xl">🎛️</span>
                        {activeCategory === 'all' ? 'System Components' : `${categoryCounts[activeCategory]} Components`}
                      </h2>
                      {currentViewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {otherRepos.map(repo => (
                            <RepositoryCard 
                              key={repo.id} 
                              repo={repo} 
                              onShowStats={handleShowStats}
                              healthMetrics={healthMetrics.get(repo.name)}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {otherRepos.map(repo => (
                            <RepositoryListItem 
                              key={repo.id} 
                              repo={repo} 
                              onShowStats={handleShowStats}
                              healthMetrics={healthMetrics.get(repo.name)}
                            />
                          ))}
                        </div>
                      )}
                    </section>
                  ) : (
                    <EmptyState 
                      hasSearchQuery={!!searchQuery || selectedEmojis.length > 0}
                      searchQuery={searchQuery}
                      onReset={() => {
                        setSearchQuery('')
                        setActiveCategory('all')
                        setSelectedEmojis([])
                      }}
                    />
                  )}
                </TabsContent>

                <TabsContent value="alerts" className="mt-6">
                  <AlertPanel alerts={allAlerts} maxHeight={600} />
                </TabsContent>
              </Tabs>
            </>
          )}
              </div>
            </div>
            </div>
          )}
        </main>

        <footer className="border-t border-border/50 mt-16 py-6 backdrop-blur-sm bg-gradient-to-r from-card/90 via-card/80 to-card/90">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
            <p style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <span className="text-gold">👑</span> Quantum System Architecture 
              <span className="text-accent mx-2">•</span> 
              <span className="text-blue">🧱</span> pewpi-infinity 
              <span className="text-purple mx-2">•</span>
              <span className="text-yellow">✨</span> Built with Legend Code
            </p>
          </div>
        </footer>
      </div>

      <RepoStatsDialog
        repo={selectedRepo}
        open={statsDialogOpen}
        onOpenChange={setStatsDialogOpen}
      />

      <AddRepoDialog
        open={addRepoDialogOpen}
        onOpenChange={setAddRepoDialogOpen}
        onAdd={handleAddRepo}
      />

      <FloatingJukebox 
        repo={brainRepo} 
        repoName={brainRepo?.name}
        externalTrack={jukeboxTrack}
      />
    </div>
  )
}

export default App