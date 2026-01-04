import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  Lightning,
  Database,
  CloudArrowUp,
  Gauge,
  WifiSlash,
  ArrowsClockwise
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useOnlineStatus } from '@/hooks/use-online-status'

interface SystemStatusProps {
  repoCount: number
  isLoading: boolean
  lastSyncTime?: number
}

export function SystemStatus({ repoCount, isLoading, lastSyncTime }: SystemStatusProps) {
  const [uptime, setUptime] = useState(0)
  const [timeSinceSync, setTimeSinceSync] = useState('')
  const { isOnline } = useOnlineStatus()
  
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1)
      
      if (lastSyncTime) {
        const seconds = Math.floor((Date.now() - lastSyncTime) / 1000)
        if (seconds < 60) {
          setTimeSinceSync(`${seconds}s ago`)
        } else if (seconds < 3600) {
          setTimeSinceSync(`${Math.floor(seconds / 60)}m ago`)
        } else {
          setTimeSinceSync(`${Math.floor(seconds / 3600)}h ago`)
        }
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [lastSyncTime])
  
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
      status: isOnline ? 'operational' as const : 'down' as const, 
      icon: isOnline ? <CloudArrowUp size={16} weight="fill" /> : <WifiSlash size={16} weight="fill" />,
      latency: isOnline ? '24ms' : 'N/A'
    },
    { 
      name: 'Data Pipeline', 
      status: !isOnline ? 'down' as const : repoCount > 0 ? 'operational' as const : 'degraded' as const,
      icon: <Database size={16} weight="fill" />,
      latency: isOnline ? '102ms' : 'N/A'
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
      label: 'Offline',
      indicator: 'bg-destructive'
    }
  }

  return (
    <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <CheckCircle size={20} className="text-accent" weight="fill" />
          ) : (
            <WifiSlash size={20} className="text-destructive" weight="fill" />
          )}
          <h3 className="font-semibold text-sm">System Status</h3>
        </div>
        <div className="flex items-center gap-2">
          {lastSyncTime && timeSinceSync && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs gap-1">
                    <ArrowsClockwise size={12} />
                    {timeSinceSync}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Last sync: {new Date(lastSyncTime).toLocaleTimeString()}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <Badge variant="outline" className="text-xs">
            {formatUptime(uptime)}
          </Badge>
        </div>
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
