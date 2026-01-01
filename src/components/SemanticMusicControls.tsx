import { Button } from './ui/button'
import { Card } from './ui/card'
import { House, Sparkle, Funnel, GridFour } from '@phosphor-icons/react'
import { musicLibrary } from '@/lib/media-semantic'
import type { MusicTrack } from '@/lib/media-semantic'

interface SemanticMusicControlsProps {
  onSelectTrack: (track: MusicTrack) => void
  currentTrackId?: string
}

export function SemanticMusicControls({ onSelectTrack, currentTrackId }: SemanticMusicControlsProps) {
  const semanticModes = [
    {
      id: 'eddie-money-take-me-home',
      icon: <House size={20} weight="fill" />,
      label: 'Take Home',
      emoji: '💲',
      description: 'Single local port',
      color: 'from-green to-blue'
    },
    {
      id: 'pink-floyd-shine-on-part-1',
      icon: <Sparkle size={20} weight="fill" />,
      label: 'Multistar',
      emoji: '✨💎',
      description: 'Facet stars',
      color: 'from-purple to-pink'
    },
    {
      id: 'cheap-trick-one-i-want',
      icon: <Funnel size={20} weight="fill" />,
      label: 'Modulate',
      emoji: '🎛️',
      description: 'Filter & adjust',
      color: 'from-accent to-yellow'
    },
    {
      id: 'pink-floyd-welcome-machine',
      icon: <GridFour size={20} weight="fill" />,
      label: 'Welcome',
      emoji: '🎛️',
      description: 'System intro',
      color: 'from-blue to-purple'
    }
  ]

  const handleModeClick = (trackId: string) => {
    const track = musicLibrary.find(t => t.id === trackId)
    if (track) {
      onSelectTrack(track)
    }
  }

  return (
    <Card className="p-4 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm border-purple/20">
      <h4 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        🎵 Semantic Music Modes
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {semanticModes.map(mode => {
          const isActive = currentTrackId === mode.id
          return (
            <Button
              key={mode.id}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleModeClick(mode.id)}
              className={`flex flex-col items-start h-auto py-3 px-3 gap-1 ${
                isActive 
                  ? `bg-gradient-to-br ${mode.color} shadow-lg` 
                  : 'hover:bg-gradient-to-br hover:' + mode.color + ' hover:bg-opacity-10'
              }`}
            >
              <div className="flex items-center gap-2 w-full">
                {mode.icon}
                <span className="font-bold text-xs">{mode.emoji}</span>
              </div>
              <div className="text-left w-full">
                <div className="text-xs font-semibold">{mode.label}</div>
                <div className={`text-xs ${isActive ? 'opacity-90' : 'opacity-60'}`}>
                  {mode.description}
                </div>
              </div>
            </Button>
          )
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
        💡 Select a mode to manually override AI selection. The jukebox filters music aimed at supporting growth and happiness based on machine usage patterns.
      </p>
    </Card>
  )
}
