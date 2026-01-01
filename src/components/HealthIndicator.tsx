import { type HealthStatus, getHealthColor, getHealthLabel } from '@/lib/health-monitor'
import { Heart, HeartBreak, Warning, CircleDashed } from '@phosphor-icons/react'

interface HealthIndicatorProps {
  status: HealthStatus
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  animated?: boolean
}

export function HealthIndicator({ 
  status, 
  score, 
  size = 'md', 
  showLabel = true,
  animated = true 
}: HealthIndicatorProps) {
  const color = getHealthColor(status)
  const label = getHealthLabel(status)
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  const Icon = status === 'healthy' ? Heart : 
               status === 'critical' ? HeartBreak :
               status === 'inactive' ? CircleDashed : Warning
  
  return (
    <div className="flex items-center gap-2">
      <div 
        className={`relative ${sizeClasses[size]} ${animated ? 'animate-pulse' : ''}`}
        style={{ color }}
      >
        <Icon weight="fill" className="w-full h-full" />
        {status === 'healthy' && animated && (
          <div 
            className="absolute inset-0 rounded-full blur-md opacity-50"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
      
      {showLabel && (
        <div className="flex flex-col">
          <span 
            className="text-sm font-medium"
            style={{ color }}
          >
            {label}
          </span>
          <span className="text-xs text-muted-foreground">
            Score: {score}/100
          </span>
        </div>
      )}
    </div>
  )
}
