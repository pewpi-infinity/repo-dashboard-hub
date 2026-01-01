import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { Contributor } from '@/lib/types'
import { Users, GitCommit } from '@phosphor-icons/react'

interface ContributorsListProps {
  contributors: Contributor[]
  repoName: string
}

export function ContributorsList({ contributors, repoName }: ContributorsListProps) {
  if (contributors.length === 0) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur-sm glow-border">
        <div className="flex items-center gap-2 mb-4">
          <Users className="text-primary" size={20} weight="duotone" />
          <h3 className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Contributors
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          No contributor data available
        </p>
      </Card>
    )
  }

  const topContributor = contributors[0]
  const otherContributors = contributors.slice(1, 6)

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm glow-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="text-primary" size={20} weight="duotone" />
          <h3 className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Top Contributors
          </h3>
        </div>
        <Badge variant="outline" className="text-xs">
          {contributors.length} Total
        </Badge>
      </div>

      <div className="space-y-4">
        <div 
          onClick={() => window.open(topContributor.html_url, '_blank')}
          className="flex items-center gap-4 p-4 rounded-lg bg-accent/10 border border-accent/30 cursor-pointer hover:bg-accent/20 transition-colors glow-border-accent"
        >
          <Avatar className="h-12 w-12 ring-2 ring-accent">
            <AvatarImage src={topContributor.avatar_url} alt={topContributor.login} />
            <AvatarFallback>{topContributor.login.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold text-accent" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {topContributor.login}
            </div>
            <div className="text-xs text-muted-foreground">Top Contributor</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl text-accent" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {topContributor.contributions.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
              <GitCommit size={12} />
              commits
            </div>
          </div>
        </div>

        {otherContributors.length > 0 && (
          <div className="space-y-2">
            {otherContributors.map((contributor) => (
              <div
                key={contributor.login}
                onClick={() => window.open(contributor.html_url, '_blank')}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={contributor.avatar_url} alt={contributor.login} />
                  <AvatarFallback>{contributor.login.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {contributor.login}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {contributor.contributions.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
