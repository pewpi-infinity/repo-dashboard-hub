import { repoEmojiMap, getColorClass, getGlowClass, type EmojiLegend } from '@/lib/emoji-legend'
import { Button } from './ui/button'
import { X } from '@phosphor-icons/react'
import { useMemo } from 'react'

interface EmojiFilterProps {
  selectedEmojis: string[]
  onEmojiToggle: (emoji: string) => void
  onClear: () => void
  repos: Array<{ name: string }>
}

export function EmojiFilter({ selectedEmojis, onEmojiToggle, onClear, repos }: EmojiFilterProps) {
  const availableEmojis = useMemo(() => {
    const emojiSet = new Set<string>()
    const legendItems: Array<EmojiLegend & { key: string }> = []
    
    repos.forEach(repo => {
      const key = Object.keys(repoEmojiMap).find(k => 
        repo.name.toLowerCase().includes(k.toLowerCase())
      )
      if (key) {
        const legend = repoEmojiMap[key]
        const emojiKey = `${key}-${legend.emoji}`
        if (!emojiSet.has(emojiKey)) {
          emojiSet.add(emojiKey)
          legendItems.push({ ...legend, key })
        }
      }
    })
    
    return legendItems
  }, [repos])

  if (availableEmojis.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Filter by Legend Icon
        </h3>
        {selectedEmojis.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-7 gap-1 text-xs hover:text-destructive"
          >
            <X size={14} />
            Clear
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {availableEmojis.map((legend) => {
          const isSelected = selectedEmojis.includes(legend.key)
          
          return (
            <button
              key={legend.key}
              onClick={() => onEmojiToggle(legend.key)}
              className={`
                group relative px-3 py-2 rounded-lg border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-primary bg-primary/10 scale-105' 
                  : 'border-border/50 hover:border-primary/50 hover:bg-card/80'
                }
              `}
              title={`${legend.meaning} - ${legend.category}`}
            >
              <div className="flex items-center gap-2">
                <span 
                  className={`
                    text-2xl transition-all duration-200
                    ${getColorClass(legend.color)}
                    ${getGlowClass(legend.color)}
                    ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
                  `}
                >
                  {legend.emoji}
                </span>
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                )}
              </div>
              
              <div 
                className={`
                  absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                  bg-popover border border-border rounded-md text-xs text-popover-foreground 
                  whitespace-nowrap opacity-0 pointer-events-none 
                  group-hover:opacity-100 transition-opacity duration-200 z-50
                `}
              >
                <div className="font-medium">{legend.meaning}</div>
                <div className="text-muted-foreground text-[10px] capitalize">{legend.category}</div>
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-border"
                />
              </div>
            </button>
          )
        })}
      </div>
      
      {selectedEmojis.length > 0 && (
        <div className="text-xs text-muted-foreground">
          Filtering by {selectedEmojis.length} icon{selectedEmojis.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
