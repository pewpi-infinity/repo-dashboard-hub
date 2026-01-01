import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { colorSchemeMap, meaningMap } from '../lib/emoji-legend'

export function LegendPanel() {
  return (
    <Card className="p-4 bg-card/60 backdrop-blur-sm border-border/50">
      <h3 
        className="text-sm font-bold mb-3 text-accent"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        🎮 Color Code Legend
      </h3>
      <div className="space-y-2 text-xs">
        {Object.entries(colorSchemeMap).slice(0, 6).map(([emoji, color]) => (
          <div key={emoji} className="flex items-center gap-2">
            <span className="text-lg emoji-glow">{emoji}</span>
            <span className="text-muted-foreground">{meaningMap[emoji]}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-border/50">
        <div className="text-xs text-muted-foreground space-y-1">
          <div>💎 Value Elements</div>
          <div>🧱 Building Blocks</div>
          <div>🎵 Sync Systems</div>
          <div>👑 Authority Core</div>
        </div>
      </div>
    </Card>
  )
}
