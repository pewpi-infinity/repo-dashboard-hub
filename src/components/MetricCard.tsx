import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { TrendUp, TrendDown } from '@phosphor-icons/react'

interface MetricCardProps {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  accentColor?: string
  size?: 'sm' | 'md' | 'lg'
}

export function MetricCard({ 
  label, 
  value, 
  change, 
  changeLabel,
  icon,
  accentColor = 'primary',
  size = 'md'
}: MetricCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <Card className={cn(
      "relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm",
      size === 'sm' && "p-3",
      size === 'md' && "p-4",
      size === 'lg' && "p-6"
    )}>
      <div className={cn(
        "absolute inset-0 opacity-5",
        accentColor === 'primary' && "bg-primary",
        accentColor === 'accent' && "bg-accent",
        accentColor === 'secondary' && "bg-secondary"
      )} />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {label}
          </span>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        
        <div className={cn(
          "font-bold mb-1",
          size === 'sm' && "text-xl",
          size === 'md' && "text-2xl",
          size === 'lg' && "text-3xl"
        )}>
          {value}
        </div>
        
        {change !== undefined && (
          <div className="flex items-center gap-1.5 text-sm">
            {isPositive && (
              <>
                <TrendUp size={14} className="text-accent" weight="bold" />
                <span className="text-accent font-semibold">+{change.toFixed(2)}%</span>
              </>
            )}
            {isNegative && (
              <>
                <TrendDown size={14} className="text-destructive" weight="bold" />
                <span className="text-destructive font-semibold">{change.toFixed(2)}%</span>
              </>
            )}
            {changeLabel && (
              <span className="text-muted-foreground text-xs">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
