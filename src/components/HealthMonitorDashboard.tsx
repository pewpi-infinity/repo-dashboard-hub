import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { CircularGauge } from './CircularGauge'
import { Progress } from './ui/progress'
import type { HealthMetrics } from '@/lib/health-monitor'
import { 
  Lightning, 
  TrendUp, 
  Warning as WarningIcon, 
  ChartLine
} from '@phosphor-icons/react'

interface HealthMonitorDashboardProps {
  metrics: HealthMetrics
  repoName: string
}

export function HealthMonitorDashboard({ metrics, repoName }: HealthMonitorDashboardProps) {
  const indicatorData = useMemo(() => [
    {
      label: 'Commit Frequency',
      value: metrics.indicators.commitFrequency,
      icon: Lightning,
      description: 'Recent commit activity level',
      color: 'oklch(0.55 0.24 250)'
    },
    {
      label: 'Issue Health',
      value: metrics.indicators.issueRatio,
      icon: WarningIcon,
      description: 'Issue-to-star ratio health',
      color: 'oklch(0.75 0.18 200)'
    },
    {
      label: 'Freshness',
      value: metrics.indicators.staleness,
      icon: ChartLine,
      description: 'Time since last update',
      color: 'oklch(0.75 0.18 150)'
    },
    {
      label: 'Activity Trend',
      value: metrics.indicators.activityTrend,
      icon: TrendUp,
      description: 'Growth vs previous period',
      color: 'oklch(0.75 0.18 300)'
    }
  ], [metrics])

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <ChartLine className="text-accent" size={20} />
          Health Monitoring - {repoName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <CircularGauge
            value={metrics.score}
            max={100}
            size="lg"
            label="Overall Health"
            color={metrics.status === 'healthy' ? 'primary' : metrics.status === 'warning' ? 'accent' : 'destructive'}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {indicatorData.map((indicator) => (
            <div key={indicator.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <indicator.icon 
                    size={16} 
                    style={{ color: indicator.color }}
                  />
                  <span className="text-sm font-medium">{indicator.label}</span>
                </div>
                <span 
                  className="text-sm font-bold"
                  style={{ color: indicator.color }}
                >
                  {Math.round(indicator.value)}%
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={indicator.value} 
                  className="h-2"
                />
                <div 
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{ 
                    background: `linear-gradient(to right, ${indicator.color} 0%, ${indicator.color} ${indicator.value}%, transparent ${indicator.value}%)`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
