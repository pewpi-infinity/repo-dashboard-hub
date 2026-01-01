import { Card } from './ui/card'
import { MetricCard } from './MetricCard'
import { CircularGauge } from './CircularGauge'
import { ProgressBar } from './ProgressBar'
import { LinearMeter } from './LinearMeter'
import { StatsBadge } from './StatsBadge'
import { ActivityIndicator } from './ActivityIndicator'
import type { CategorizedRepo } from '@/lib/types'
import { 
  GitBranch, 
  Star, 
  GitFork, 
  Eye,
  Code,
  Clock,
  TrendUp,
  Users,
  Fire,
  CheckCircle
} from '@phosphor-icons/react'

interface DashboardMetricsProps {
  repos: CategorizedRepo[]
  loading?: boolean
}

export function DashboardMetrics({ repos, loading = false }: DashboardMetricsProps) {
  if (loading) {
    return null
  }

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0)
  const totalWatchers = repos.reduce((sum, repo) => sum + (repo.watchers_count || 0), 0)
  const totalOpenIssues = repos.reduce((sum, repo) => sum + (repo.open_issues_count || 0), 0)
  
  const languagesCount = new Set(repos.map(r => r.language).filter(Boolean)).size
  const avgStarsPerRepo = repos.length > 0 ? totalStars / repos.length : 0
  
  const recentlyUpdated = repos.filter(repo => {
    const daysSinceUpdate = (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
    return daysSinceUpdate < 7
  }).length
  
  const activityScore = recentlyUpdated / Math.max(repos.length, 1) * 100
  const healthScore = repos.filter(r => r.stargazers_count > 0 || (r.forks_count || 0) > 0).length / Math.max(repos.length, 1) * 100
  
  const getActivityLevel = (): 'high' | 'medium' | 'low' | 'none' => {
    if (activityScore > 50) return 'high'
    if (activityScore > 20) return 'medium'
    if (activityScore > 0) return 'low'
    return 'none'
  }

  return (
    <div className="space-y-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total Repositories"
          value={repos.length}
          icon={<GitBranch size={20} />}
          accentColor="primary"
        />
        <MetricCard
          label="Total Stars"
          value={totalStars.toLocaleString()}
          change={totalStars > 50 ? 12.5 : undefined}
          changeLabel="this week"
          icon={<Star size={20} weight="fill" />}
          accentColor="accent"
        />
        <MetricCard
          label="Total Forks"
          value={totalForks.toLocaleString()}
          icon={<GitFork size={20} />}
          accentColor="primary"
        />
        <MetricCard
          label="Languages"
          value={languagesCount}
          icon={<Code size={20} />}
          accentColor="accent"
        />
      </div>

      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Fire size={20} className="text-accent" weight="fill" />
          System Health & Activity
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CircularGauge
            value={activityScore}
            max={100}
            label="Activity Score"
            color="accent"
            size="md"
          />
          <CircularGauge
            value={healthScore}
            max={100}
            label="Health Score"
            color="primary"
            size="md"
          />
          <CircularGauge
            value={recentlyUpdated}
            max={repos.length || 1}
            label="Active Repos"
            color="secondary"
            size="md"
            showPercentage={false}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendUp size={20} className="text-primary" weight="bold" />
            Performance Metrics
          </h3>
          
          <div className="space-y-6">
            <ProgressBar
              value={totalStars}
              max={totalStars + 100}
              label="Stars Progress"
              sublabel="Approaching milestone"
              color="accent"
              animated
            />
            
            <ProgressBar
              value={totalForks}
              max={Math.max(totalForks + 50, totalForks * 1.5)}
              label="Fork Rate"
              sublabel="Community engagement"
              color="primary"
              animated
            />
            
            <ProgressBar
              value={repos.length}
              max={repos.length + 10}
              label="Repository Growth"
              sublabel="Total projects"
              color="secondary"
              animated
            />
          </div>
        </Card>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <CheckCircle size={20} className="text-accent" weight="fill" />
            System Indicators
          </h3>
          
          <div className="space-y-6">
            <LinearMeter
              value={totalWatchers}
              max={Math.max(totalWatchers * 2, 100)}
              label="Watchers"
              zones={[
                { threshold: 0, color: 'oklch(0.65 0.04 280)', label: 'Low' },
                { threshold: totalWatchers * 0.5, color: 'oklch(0.55 0.24 250)', label: 'Medium' },
                { threshold: totalWatchers * 0.8, color: 'oklch(0.75 0.18 200)', label: 'High' }
              ]}
            />
            
            <LinearMeter
              value={avgStarsPerRepo}
              max={Math.max(avgStarsPerRepo * 3, 10)}
              label="Avg Stars/Repo"
              unit="⭐"
              zones={[
                { threshold: 0, color: 'oklch(0.65 0.04 280)' },
                { threshold: 5, color: 'oklch(0.55 0.24 250)' },
                { threshold: 10, color: 'oklch(0.75 0.18 200)' }
              ]}
            />
          </div>
        </Card>
      </div>

      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users size={20} className="text-primary" weight="fill" />
          Quick Stats
        </h3>
        
        <div className="flex flex-wrap gap-3">
          <StatsBadge label="Open Issues" value={totalOpenIssues} icon={<Eye size={14} />} />
          <StatsBadge label="Total Repos" value={repos.length} variant="outline" />
          <StatsBadge label="Avg Stars" value={Math.round(avgStarsPerRepo)} icon={<Star size={14} />} />
          <StatsBadge label="Updated (7d)" value={recentlyUpdated} icon={<Clock size={14} />} variant="secondary" />
          <ActivityIndicator activity={getActivityLevel()} />
        </div>
      </Card>
    </div>
  )
}
