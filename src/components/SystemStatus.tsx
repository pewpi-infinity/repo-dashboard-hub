import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  Lightning,
  Database,
  CloudArrowUp,
  Gauge
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface SystemStatusProps {
  repoCount: number
  isLoading: boolean
}

export function SystemStatus({ repoCount, isLoading }: SystemStatusProps) {
  const [uptime, setUptime] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`
    }
    return `${secs}s`
  }

  const systems = [
    { 
      name: 'API Gateway', 
      status: 'operational' as const, 
      icon: <CloudArrowUp size={16} weight="fill" />,
      latency: '24ms'
    },
    { 
      name: 'Data Pipeline', 
      status: repoCount > 0 ? 'operational' as const : 'degraded' as const,
      icon: <Database size={16} weight="fill" />,
      latency: '102ms'
    },
    { 
      name: 'Cache Layer', 
      status: 'operational' as const,
      icon: <Lightning size={16} weight="fill" />,
      latency: '5ms'
    },
    { 
      name: 'Quantum Core', 
      status: 'operational' as const,
      icon: <Gauge size={16} weight="fill" />,
      latency: '1ms'
    }
  ]

  const statusConfig = {
    operational: {
      color: 'text-accent',
      bg: 'bg-accent/20',
      label: 'Operational',
      indicator: 'bg-accent'
    },
    degraded: {
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/20',
      label: 'Degraded',
      indicator: 'bg-yellow-500'
    },
    down: {
      color: 'text-destructive',
      bg: 'bg-destructive/20',
      label: 'Down',
      indicator: 'bg-destructive'
    }
  }

  return (
    <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle size={20} className="text-accent" weight="fill" />
          <h3 className="font-semibold text-sm">System Status</h3>
        </div>
        <Badge variant="outline" className="text-xs">
          Uptime: {formatUptime(uptime)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {systems.map((system) => {
          const config = statusConfig[system.status]
          return (
            <div 
              key={system.name}
              className="flex items-start gap-2 p-2 rounded-lg bg-muted/20 border border-border/30"
            >
              <div className="relative mt-0.5">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  config.indicator
                )} />
                <div className={cn(
                  "absolute inset-0 w-2 h-2 rounded-full animate-ping",
                  config.indicator,
                  "opacity-50"
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">{system.icon}</span>
                  <span className="text-xs font-medium truncate">{system.name}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className={cn("text-xs font-semibold", config.color)}>
                    {config.label}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {system.latency}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
