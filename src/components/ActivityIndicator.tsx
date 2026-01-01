import { cn } from '@/lib/utils'

interface ActivityIndicatorProps {
  activity: 'high' | 'medium' | 'low' | 'none'
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ActivityIndicator({ activity, label, size = 'md' }: ActivityIndicatorProps) {
  const sizeMap = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }
  
  const colorMap = {
    high: 'bg-accent',
    medium: 'bg-primary',
    low: 'bg-muted-foreground',
    none: 'bg-border'
  }
  
  const labelMap = {
    high: 'High Activity',
    medium: 'Medium Activity',
    low: 'Low Activity',
    none: 'No Activity'
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={cn(
          "rounded-full",
          sizeMap[size],
          colorMap[activity]
        )} />
        {activity !== 'none' && (
          <div className={cn(
            "absolute inset-0 rounded-full animate-ping",
            colorMap[activity],
            "opacity-50"
          )} />
        )}
      </div>
      <span className="text-sm text-muted-foreground">
        {label || labelMap[activity]}
      </span>
    </div>
  )
}
