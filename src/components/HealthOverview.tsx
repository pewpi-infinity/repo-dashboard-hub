import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import type { HealthMetrics } from '@/lib/health-monitor'
import { getHealthColor } from '@/lib/health-monitor'
import { 
  Heart, 
  HeartBreak, 
  Warning,
  ChartLine,
  TrendUp
} from '@phosphor-icons/react'

interface HealthOverviewProps {
  allMetrics: Map<string, HealthMetrics>
}

export function HealthOverview({ allMetrics }: HealthOverviewProps) {
  const stats = useMemo(() => {
    const metrics = Array.from(allMetrics.values())
    const total = metrics.length
    
    if (total === 0) {
      return {
        total: 0,
        healthy: 0,
        warning: 0,
        critical: 0,
        inactive: 0,
        avgScore: 0,
        totalAlerts: 0
      }
    }
    
    const healthy = metrics.filter(m => m.status === 'healthy').length
    const warning = metrics.filter(m => m.status === 'warning').length
    const critical = metrics.filter(m => m.status === 'critical').length
    const inactive = metrics.filter(m => m.status === 'inactive').length
    const avgScore = Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / total)
    const totalAlerts = metrics.reduce((sum, m) => sum + m.alerts.length, 0)
    
    return {
      total,
      healthy,
      warning,
      critical,
      inactive,
      avgScore,
      totalAlerts
    }
  }, [allMetrics])

  const healthPercentage = stats.total > 0 
    ? Math.round((stats.healthy / stats.total) * 100) 
    : 0

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <ChartLine className="text-accent" size={20} />
          Health Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Heart 
                size={20} 
                weight="fill"
                style={{ color: getHealthColor('healthy') }}
              />
              <span className="text-sm text-muted-foreground">Healthy</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold" style={{ color: getHealthColor('healthy') }}>
                {stats.healthy}
              </span>
              <span className="text-sm text-muted-foreground">
                / {stats.total}
              </span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Warning 
                size={20} 
                weight="fill"
                style={{ color: getHealthColor('warning') }}
              />
              <span className="text-sm text-muted-foreground">Warning</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold" style={{ color: getHealthColor('warning') }}>
                {stats.warning}
              </span>
              <span className="text-sm text-muted-foreground">
                / {stats.total}
              </span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <HeartBreak 
                size={20} 
                weight="fill"
                style={{ color: getHealthColor('critical') }}
              />
              <span className="text-sm text-muted-foreground">Critical</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold" style={{ color: getHealthColor('critical') }}>
                {stats.critical}
              </span>
              <span className="text-sm text-muted-foreground">
                / {stats.total}
              </span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendUp 
                size={20}
                className="text-primary"
              />
              <span className="text-sm text-muted-foreground">Avg Score</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">
                {stats.avgScore}
              </span>
              <span className="text-sm text-muted-foreground">
                / 100
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">System Health</span>
            <Badge 
              variant={healthPercentage >= 70 ? 'default' : healthPercentage >= 40 ? 'secondary' : 'destructive'}
              className="text-xs"
            >
              {healthPercentage}% Healthy
            </Badge>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-700 ease-out"
              style={{ 
                width: `${healthPercentage}%`,
                background: `linear-gradient(to right, ${getHealthColor('healthy')}, ${getHealthColor('warning')})`,
                boxShadow: `0 0 8px ${getHealthColor('healthy')}60`
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>{stats.totalAlerts} active alerts</span>
            <span>{stats.inactive} inactive repos</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
