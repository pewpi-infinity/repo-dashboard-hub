import { useEffect, useState } from 'react'
import { RepositoryCard } from './components/RepositoryCard'
import { CategoryFilter } from './components/CategoryFilter'
import { Skeleton } from './components/ui/skeleton'
import { Alert, AlertDescription } from './components/ui/alert'
import { Button } from './components/ui/button'
import { fetchOrgRepositories } from './lib/github-api'
import { addCategories } from './lib/repo-utils'
import type { CategorizedRepo, ComponentCategory } from './lib/types'
import { ArrowClockwise, Warning } from '@phosphor-icons/react'
import { toast } from 'sonner'

function App() {
  const [repos, setRepos] = useState<CategorizedRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<ComponentCategory | 'all'>('all')

  const loadRepositories = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const fetchedRepos = await fetchOrgRepositories()
      const categorizedRepos = addCategories(fetchedRepos)
      setRepos(categorizedRepos)
      toast.success(`Loaded ${categorizedRepos.length} repositories`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load repositories'
      setError(message)
      toast.error('Failed to load repositories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRepositories()
  }, [])

  const filteredRepos = activeCategory === 'all' 
    ? repos 
    : repos.filter(repo => repo.category === activeCategory)

  const brainRepo = repos.find(repo => repo.name.toLowerCase().includes('mongoose'))
  const otherRepos = filteredRepos.filter(repo => repo.id !== brainRepo?.id)

  const categoryCounts = repos.reduce((acc, repo) => {
    acc[repo.category] = (acc[repo.category] || 0) + 1
    return acc
  }, { all: repos.length, brain: 0, quantum: 0, time: 0, os: 0, other: 0 } as Record<ComponentCategory | 'all', number>)

  return (
    <div className="min-h-screen bg-background text-foreground circuit-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="relative">
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 
                  className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent"
                  style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.02em' }}
                >
                  AC DASHBOARD
                </h1>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Pewpi Infinity Quantum Computing & Time Machine System
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={loadRepositories}
                disabled={loading}
                className="gap-2"
              >
                <ArrowClockwise className={loading ? 'animate-spin' : ''} size={16} />
                Refresh
              </Button>
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

          {loading ? (
            <div className="space-y-6">
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
          ) : (
            <>
              <div className="mb-8">
                <CategoryFilter
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  counts={categoryCounts}
                />
              </div>

              {brainRepo && (activeCategory === 'all' || activeCategory === 'brain') && (
                <section className="mb-12">
                  <h2 
                    className="text-2xl font-semibold mb-6 flex items-center gap-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span className="text-accent">⚡</span>
                    Neural Core System
                  </h2>
                  <div className="max-w-2xl">
                    <RepositoryCard repo={brainRepo} isBrain />
                  </div>
                </section>
              )}

              {otherRepos.length > 0 ? (
                <section>
                  <h2 
                    className="text-2xl font-semibold mb-6"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {activeCategory === 'all' ? 'System Components' : `${categoryCounts[activeCategory]} Components`}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {otherRepos.map(repo => (
                      <RepositoryCard key={repo.id} repo={repo} />
                    ))}
                  </div>
                </section>
              ) : (
                <Alert>
                  <AlertDescription>
                    No repositories found in this category.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </main>

        <footer className="border-t border-border/50 mt-16 py-6 backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
            <p style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Quantum System Architecture • pewpi-infinity
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App