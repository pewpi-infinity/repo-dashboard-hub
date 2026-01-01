import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import type { CategorizedRepo } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { GitCommit, Star, GitFork } from '@phosphor-icons/react'

interface RecentActivityProps {
  repos: CategorizedRepo[]
}

export function RecentActivity({ repos }: RecentActivityProps) {
  const recentRepos = [...repos]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5)

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      brain: 'bg-accent/20 text-accent border-accent/30',
      quantum: 'bg-primary/20 text-primary border-primary/30',
      time: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      os: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      other: 'bg-muted text-muted-foreground border-border'
    }
    return colors[category] || colors.other
  }

  return (
    <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
        <GitCommit size={18} className="text-muted-foreground" weight="bold" />
        Recent Activity
      </h3>
      
      <ScrollArea className="h-[280px] pr-3">
        <div className="space-y-3">
          {recentRepos.map((repo) => (
            <div 
              key={repo.id}
              className="p-3 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-medium truncate flex-1">{repo.name}</span>
                <Badge 
                  variant="outline" 
                  className={`text-xs px-2 ${getCategoryColor(repo.category)}`}
                >
                  {repo.category}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {repo.description || 'No description'}
              </p>
              
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star size={12} weight="fill" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} />
                  {repo.forks_count || 0}
                </span>
                <span className="ml-auto font-mono">
                  {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
