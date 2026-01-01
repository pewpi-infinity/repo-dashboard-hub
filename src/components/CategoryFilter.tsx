import { Button } from '@/components/ui/button'
import { Brain, Atom, Clock, Gear, Cube, SquaresFour } from '@phosphor-icons/react'
import type { ComponentCategory } from '@/lib/types'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  activeCategory: ComponentCategory | 'all'
  onCategoryChange: (category: ComponentCategory | 'all') => void
  counts: Record<ComponentCategory | 'all', number>
}

export function CategoryFilter({ activeCategory, onCategoryChange, counts }: CategoryFilterProps) {
  const categories = [
    { id: 'all' as const, label: 'All Systems', icon: SquaresFour, color: 'text-foreground' },
    { id: 'brain' as const, label: 'Neural Core', icon: Brain, color: 'text-gold' },
    { id: 'quantum' as const, label: 'Quantum', icon: Atom, color: 'text-purple' },
    { id: 'time' as const, label: 'Time Machine', icon: Clock, color: 'text-blue' },
    { id: 'os' as const, label: 'OS', icon: Gear, color: 'text-orange' },
    { id: 'other' as const, label: 'Other', icon: Cube, color: 'text-green' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ id, label, icon: Icon, color }) => {
        const count = counts[id] || 0
        const isActive = activeCategory === id
        
        return (
          <Button
            key={id}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(id)}
            className={cn(
              'gap-2 transition-all duration-200',
              isActive && 'glow-border bg-primary text-primary-foreground hover:bg-primary/90',
              !isActive && 'hover:border-accent hover:text-accent'
            )}
          >
            <Icon size={16} weight={isActive ? 'fill' : 'regular'} className={!isActive ? color : ''} />
            <span>{label}</span>
            <span className={cn(
              'px-1.5 py-0.5 rounded-full text-xs font-mono',
              isActive ? 'bg-primary-foreground/20' : 'bg-muted'
            )}>
              {count}
            </span>
          </Button>
        )
      })}
    </div>
  )
}
