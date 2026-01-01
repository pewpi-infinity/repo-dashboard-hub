import { cn } from '@/lib/utils'

interface CircularGaugeProps {
  value: number
  max: number
  label: string
  color?: 'primary' | 'accent' | 'secondary' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  showPercentage?: boolean
}

export function CircularGauge({ 
  value, 
  max, 
  label, 
  color = 'primary',
  size = 'md',
  showPercentage = true
}: CircularGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  
  const sizeMap = {
    sm: { width: 80, height: 80, stroke: 6, fontSize: 'text-lg', labelSize: 'text-xs' },
    md: { width: 120, height: 120, stroke: 8, fontSize: 'text-2xl', labelSize: 'text-sm' },
    lg: { width: 160, height: 160, stroke: 10, fontSize: 'text-3xl', labelSize: 'text-base' }
  }
  
  const { width, height, stroke, fontSize, labelSize } = sizeMap[size]
  
  const colorMap = {
    primary: 'oklch(0.55 0.24 250)',
    accent: 'oklch(0.75 0.18 200)',
    secondary: 'oklch(0.25 0.12 280)',
    destructive: 'oklch(0.55 0.22 25)'
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width, height }}>
        <svg className="transform -rotate-90" width={width} height={height}>
          <circle
            cx={width / 2}
            cy={height / 2}
            r={45}
            stroke="oklch(0.28 0.08 275)"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={width / 2}
            cy={height / 2}
            r={45}
            stroke={colorMap[color]}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${colorMap[color]}40)`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", fontSize)}>
            {showPercentage ? `${Math.round(percentage)}%` : value}
          </span>
        </div>
      </div>
      <span className={cn("text-muted-foreground text-center font-medium", labelSize)}>
        {label}
      </span>
    </div>
  )
}
