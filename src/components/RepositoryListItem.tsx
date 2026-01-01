import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowSquareOut, GitBranch, Star, ChartLine } from '@phosphor-icons/react'
import type { CategorizedRepo } from '@/lib/types'
import { getCategoryLabel, getCategoryColor, getRelativeTime } from '@/lib/repo-utils'
import { cn } from '@/lib/utils'
import * as Icons from '@phosphor-icons/react'

interface RepositoryListItemProps {
  repo: CategorizedRepo
  isBrain?: boolean
  onShowStats?: (repo: CategorizedRepo) => void
}

export function RepositoryListItem({ repo, isBrain = false, onShowStats }: RepositoryListItemProps) {
  const categoryLabel = getCategoryLabel(repo.category)
  const categoryColor = getCategoryColor(repo.category)
  const lastUpdate = getRelativeTime(repo.updated_at)
  
  const CategoryIcon = isBrain 
    ? Icons.Brain 
    : repo.category === 'quantum' 
      ? Icons.Atom 
      : repo.category === 'time'
        ? Icons.Clock
        : repo.category === 'os'
          ? Icons.Gear
          : Icons.Cube

  const handleClick = () => {
    window.open(repo.html_url, '_blank', 'noopener,noreferrer')
  }

  const handleStatsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onShowStats?.(repo)
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden transition-all duration-300 rounded-lg border',
        isBrain 
          ? 'glow-border-accent pulse-glow bg-gradient-to-r from-accent/10 to-card/80' 
          : 'glow-border hover:glow-border-accent bg-card/80 backdrop-blur-sm'
      )}
    >
      <div className="p-4 flex items-center gap-4">
        <div 
          onClick={handleClick}
          className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer"
        >
          <div className={cn(
            'flex-shrink-0 p-2 rounded-lg',
            isBrain ? 'bg-accent/20' : 'bg-primary/20'
          )}>
            <CategoryIcon 
              className={isBrain ? 'text-accent' : 'text-primary'} 
              size={20}
              weight="duotone"
            />
          </div>

          <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-[minmax(200px,1fr)_minmax(0,2fr)_auto] gap-x-6 gap-y-2">
            <div className="min-w-0">
              <h3 className="font-bold text-base truncate" style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
                {repo.name}
              </h3>
              {isBrain && (
                <p className="text-xs font-semibold text-accent uppercase tracking-wider mt-0.5">
                  System Core
                </p>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-1 sm:line-clamp-2">
              {repo.description || 'No description provided'}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <Star size={14} weight="fill" className="text-yellow-500" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GitBranch size={14} />
                <span className="hidden sm:inline">{lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <Badge className={cn('text-xs', categoryColor)}>
              {categoryLabel}
            </Badge>
            {repo.language && (
              <Badge variant="outline" className="text-xs">
                {repo.language}
              </Badge>
            )}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={handleStatsClick}
            className="gap-1.5 h-8 px-3 hover:bg-accent/10 hover:border-accent hover:text-accent"
          >
            <ChartLine size={16} weight="duotone" />
            <span className="hidden lg:inline">Stats</span>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleClick}
            className="h-8 w-8 hover:text-accent"
          >
            <ArrowSquareOut size={20} />
          </Button>
        </div>
      </div>

      {isBrain && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-transparent to-primary/30" />
        </div>
      )}
    </div>
  )
}
