import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

interface StatsBadgeProps {
  label: string
  value: string | number
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  pulse?: boolean
  icon?: React.ReactNode
}

export function StatsBadge({ label, value, variant = 'secondary', pulse = false, icon }: StatsBadgeProps) {
  return (
    <Badge 
      variant={variant}
      className={cn(
        "px-3 py-1.5 text-xs font-semibold flex items-center gap-2 relative",
        pulse && "animate-pulse"
      )}
    >
      {icon && <span className="opacity-70">{icon}</span>}
      <span className="opacity-70">{label}:</span>
      <span className="font-mono">{value}</span>
    </Badge>
  )
}
