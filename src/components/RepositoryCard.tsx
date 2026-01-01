import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowSquareOut, GitBranch, Star } from '@phosphor-icons/react'
import type { CategorizedRepo } from '@/lib/types'
import { getCategoryLabel, getCategoryColor, getRelativeTime } from '@/lib/repo-utils'
import { cn } from '@/lib/utils'
import * as Icons from '@phosphor-icons/react'

interface RepositoryCardProps {
  repo: CategorizedRepo
  isBrain?: boolean
}

export function RepositoryCard({ repo, isBrain = false }: RepositoryCardProps) {
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

  return (
    <Card
      onClick={handleClick}
      className={cn(
        'group relative overflow-hidden cursor-pointer transition-all duration-300',
        'hover:scale-105 hover:-translate-y-2',
        isBrain 
          ? 'glow-border-accent pulse-glow float-animation bg-gradient-to-br from-accent/10 to-card' 
          : 'glow-border hover:glow-border-accent bg-card/80 backdrop-blur-sm'
      )}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={cn(
              'flex-shrink-0 p-2 rounded-lg',
              isBrain ? 'bg-accent/20' : 'bg-primary/20'
            )}>
              <CategoryIcon 
                className={isBrain ? 'text-accent' : 'text-primary'} 
                size={24}
                weight="duotone"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate" style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
                {repo.name}
              </h3>
              {isBrain && (
                <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                  System Core
                </p>
              )}
            </div>
          </div>
          <ArrowSquareOut 
            className="flex-shrink-0 text-muted-foreground group-hover:text-accent transition-colors" 
            size={20}
          />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {repo.description || 'No description provided'}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={cn('text-xs', categoryColor)}>
            {categoryLabel}
          </Badge>
          {repo.language && (
            <Badge variant="outline" className="text-xs">
              {repo.language}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Star size={14} weight="fill" className="text-yellow-500" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitBranch size={14} />
            <span>{lastUpdate}</span>
          </div>
        </div>
      </div>

      {isBrain && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-primary/30" />
        </div>
      )}
    </Card>
  )
}
