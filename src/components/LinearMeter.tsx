import { cn } from '@/lib/utils'

interface LinearMeterProps {
  value: number
  min?: number
  max: number
  label: string
  unit?: string
  zones?: Array<{ threshold: number; color: string; label?: string }>
  showMarkers?: boolean
}

export function LinearMeter({ 
  value, 
  min = 0,
  max, 
  label,
  unit = '',
  zones = [],
  showMarkers = true
}: LinearMeterProps) {
  const percentage = ((value - min) / (max - min)) * 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage))
  
  const getCurrentZone = () => {
    for (let i = zones.length - 1; i >= 0; i--) {
      if (value >= zones[i].threshold) {
        return zones[i]
      }
    }
    return null
  }
  
  const currentZone = getCurrentZone()

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <div className="flex items-baseline gap-1">
          <span className={cn(
            "text-2xl font-bold font-mono",
            currentZone?.color || "text-foreground"
          )}>
            {value.toLocaleString()}
          </span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      </div>
      
      <div className="relative">
        <div className="h-4 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-full overflow-hidden border border-border/50 relative">
          {zones.length > 0 && (
            <div className="absolute inset-0 flex">
              {zones.map((zone, idx) => {
                const start = ((zone.threshold - min) / (max - min)) * 100
                const end = idx < zones.length - 1 
                  ? ((zones[idx + 1].threshold - min) / (max - min)) * 100 
                  : 100
                const width = end - start
                
                return (
                  <div
                    key={idx}
                    className="h-full"
                    style={{
                      width: `${width}%`,
                      marginLeft: idx === 0 ? `${start}%` : '0',
                      backgroundColor: zone.color + '40'
                    }}
                  />
                )
              })}
            </div>
          )}
          
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-700 ease-out"
            style={{ 
              width: `${clampedPercentage}%`,
              boxShadow: '0 0 10px oklch(0.55 0.24 250 / 0.5)'
            }}
          />
          
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-foreground rounded-full shadow-lg transition-all duration-700 ease-out"
            style={{ 
              left: `${clampedPercentage}%`,
              transform: `translateX(-50%) translateY(-50%)`,
              boxShadow: '0 0 8px rgba(0,0,0,0.5)'
            }}
          />
        </div>
        
        {showMarkers && (
          <div className="flex justify-between mt-1 text-xs text-muted-foreground font-mono">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        )}
      </div>
      
      {currentZone?.label && (
        <div className="text-xs text-center">
          <span className={cn("font-semibold", currentZone.color)}>
            {currentZone.label}
          </span>
        </div>
      )}
    </div>
  )
}
