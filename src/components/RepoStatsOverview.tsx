import { Card } from '@/components/ui/card'
import { Star, GitBranch, Eye, Warning, FileCode } from '@phosphor-icons/react'
import type { CategorizedRepo } from '@/lib/types'

interface RepoStatsOverviewProps {
  repo: CategorizedRepo
}

export function RepoStatsOverview({ repo }: RepoStatsOverviewProps) {
  const stats = [
    {
      label: 'Stars',
      value: repo.stargazers_count?.toLocaleString() || '0',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Forks',
      value: repo.forks_count?.toLocaleString() || '0',
      icon: GitBranch,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Watchers',
      value: repo.watchers_count?.toLocaleString() || '0',
      icon: Eye,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Open Issues',
      value: repo.open_issues_count?.toLocaleString() || '0',
      icon: Warning,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      label: 'Size',
      value: repo.size ? `${(repo.size / 1024).toFixed(1)} MB` : '0 MB',
      icon: FileCode,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card 
          key={stat.label}
          className="p-4 bg-card/80 backdrop-blur-sm glow-border hover:glow-border-accent transition-all duration-300 hover:scale-105"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={stat.color} size={24} weight="duotone" />
            </div>
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.label}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
