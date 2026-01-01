import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max: number
  label?: string
  sublabel?: string
  color?: 'primary' | 'accent' | 'secondary' | 'destructive'
  showValues?: boolean
  animated?: boolean
}

export function ProgressBar({ 
  value, 
  max, 
  label,
  sublabel,
  color = 'primary',
  showValues = true,
  animated = true
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const colorClasses = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    secondary: 'bg-secondary',
    destructive: 'bg-destructive'
  }

  return (
    <div className="space-y-2">
      {(label || showValues) && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex flex-col gap-0.5">
            {label && <span className="font-medium">{label}</span>}
            {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
          </div>
          {showValues && (
            <span className="text-muted-foreground font-mono">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      
      <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden border border-border/30">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden",
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
    </div>
  )
}
