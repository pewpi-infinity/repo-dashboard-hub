import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import type { HealthAlert, AlertSeverity } from '@/lib/health-monitor'
import { getSeverityColor } from '@/lib/health-monitor'
import { 
  Bell, 
  Warning, 
  Info, 
  XCircle 
} from '@phosphor-icons/react'
import { formatDistanceToNow } from 'date-fns'

interface AlertPanelProps {
  alerts: HealthAlert[]
  maxHeight?: number
  compact?: boolean
}

export function AlertPanel({ alerts, maxHeight = 400, compact = false }: AlertPanelProps) {
  const sortedAlerts = useMemo(() => {
    const severityOrder: Record<AlertSeverity, number> = {
      critical: 0,
      warning: 1,
      info: 2
    }
    
    return [...alerts].sort((a, b) => {
      const severityDiff = severityOrder[a.severity] - severityOrder[b.severity]
      if (severityDiff !== 0) return severityDiff
      return b.timestamp - a.timestamp
    })
  }, [alerts])

  const getIcon = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return XCircle
      case 'warning':
        return Warning
      case 'info':
        return Info
    }
  }

  const alertsByRepo = useMemo(() => {
    const grouped = new Map<string, HealthAlert[]>()
    sortedAlerts.forEach(alert => {
      const existing = grouped.get(alert.repoName) || []
      grouped.set(alert.repoName, [...existing, alert])
    })
    return grouped
  }, [sortedAlerts])

  if (alerts.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Bell className="text-accent" size={20} />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell size={48} className="text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">
              No active alerts - all systems healthy
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <div className="flex items-center gap-2">
            <Bell className="text-accent" size={20} />
            System Alerts
          </div>
          <Badge variant="secondary" className="text-xs">
            {alerts.length} active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea style={{ maxHeight: `${maxHeight}px` }}>
          <div className="space-y-3 pr-4">
            {compact ? (
              sortedAlerts.map((alert) => {
                const Icon = getIcon(alert.severity)
                const color = getSeverityColor(alert.severity)
                
                return (
                  <Alert 
                    key={alert.id}
                    className="border-l-4 py-3"
                    style={{ borderLeftColor: color }}
                  >
                    <div className="flex items-start gap-3">
                      <Icon 
                        size={20} 
                        style={{ color }}
                        className="mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold">{alert.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {alert.repoName}
                          </Badge>
                        </div>
                        <AlertDescription className="text-xs">
                          {alert.message}
                        </AlertDescription>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </Alert>
                )
              })
            ) : (
              Array.from(alertsByRepo.entries()).map(([repoName, repoAlerts]) => (
                <div key={repoName} className="space-y-2">
                  <h3 className="text-sm font-semibold text-accent flex items-center gap-2">
                    {repoName}
                    <Badge variant="secondary" className="text-xs">
                      {repoAlerts.length}
                    </Badge>
                  </h3>
                  <div className="space-y-2 pl-4 border-l-2 border-border/50">
                    {repoAlerts.map((alert) => {
                      const Icon = getIcon(alert.severity)
                      const color = getSeverityColor(alert.severity)
                      
                      return (
                        <Alert 
                          key={alert.id}
                          className="border-l-4 py-3"
                          style={{ borderLeftColor: color }}
                        >
                          <div className="flex items-start gap-3">
                            <Icon 
                              size={20} 
                              style={{ color }}
                              className="mt-0.5 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold block mb-1">
                                {alert.title}
                              </span>
                              <AlertDescription className="text-xs">
                                {alert.message}
                              </AlertDescription>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        </Alert>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
