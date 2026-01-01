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
      "relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:glow-border",
      size === 'sm' && "p-3",
      size === 'md' && "p-4",
      size === 'lg' && "p-6"
    )}>
      <div className={cn(
        "absolute inset-0 opacity-10",
        accentColor === 'primary' && "bg-gradient-to-br from-blue to-primary",
        accentColor === 'accent' && "bg-gradient-to-br from-accent to-yellow",
        accentColor === 'secondary' && "bg-gradient-to-br from-purple to-secondary"
      )} />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {label}
          </span>
          {icon && <div className={cn(
            "text-muted-foreground",
            accentColor === 'primary' && "text-blue",
            accentColor === 'accent' && "text-yellow",
            accentColor === 'secondary' && "text-purple"
          )}>{icon}</div>}
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
                <TrendUp size={14} className="text-green" weight="bold" />
                <span className="text-green font-semibold">+{change.toFixed(2)}%</span>
              </>
            )}
            {isNegative && (
              <>
                <TrendDown size={14} className="text-red" weight="bold" />
                <span className="text-red font-semibold">{change.toFixed(2)}%</span>
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
