import { Button } from '@/components/ui/button'
import { SquaresFour, List } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export type ViewMode = 'grid' | 'list'

interface ViewToggleProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-card/50 border border-border/50 rounded-lg">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onViewModeChange('grid')}
        className={cn(
          'h-7 px-3 gap-1.5',
          viewMode === 'grid' 
            ? 'bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary' 
            : 'hover:bg-muted/50'
        )}
      >
        <SquaresFour size={16} weight={viewMode === 'grid' ? 'fill' : 'regular'} />
        <span className="hidden sm:inline">Grid</span>
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onViewModeChange('list')}
        className={cn(
          'h-7 px-3 gap-1.5',
          viewMode === 'list' 
            ? 'bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary' 
            : 'hover:bg-muted/50'
        )}
      >
        <List size={16} weight={viewMode === 'list' ? 'fill' : 'regular'} />
        <span className="hidden sm:inline">List</span>
      </Button>
    </div>
  )
}
