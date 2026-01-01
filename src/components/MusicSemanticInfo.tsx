import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { MusicNotes, Sparkle, House, GridFour, Funnel } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { MusicTrack } from '@/lib/media-semantic'

interface MusicSemanticInfoProps {
  track: MusicTrack
  repoName?: string
}

export function MusicSemanticInfo({ track, repoName }: MusicSemanticInfoProps) {
  const getSemanticReason = (): { icon: React.ReactNode; label: string; description: string; color: string } => {
    const trackId = track.id
    
    if (trackId === 'eddie-money-take-me-home') {
      return {
        icon: <House size={20} weight="fill" />,
        label: '💲 Single Local Port',
        description: 'Taking this machine home for local development - one repo, personal use',
        color: 'text-green'
      }
    }
    
    if (trackId.includes('shine-on')) {
      return {
        icon: <Sparkle size={20} weight="fill" />,
        label: '⭐💎 Multistar Faceting',
        description: 'A star who facets other stars out of its own material - creates multiple components',
        color: 'text-purple'
      }
    }
    
    if (trackId === 'cheap-trick-one-i-want') {
      return {
        icon: <Funnel size={20} weight="fill" />,
        label: '🎛️ Problem Modulator',
        description: 'Filters the problem area and moves you to the proper machine',
        color: 'text-accent'
      }
    }
    
    if (trackId === 'pink-floyd-welcome-machine') {
      return {
        icon: <GridFour size={20} weight="fill" />,
        label: '🎛️ Welcome to System',
        description: 'Core system machine - the journey of entering and becoming part of the system',
        color: 'text-blue'
      }
    }
    
    if (trackId === 'pink-floyd-time') {
      return {
        icon: <MusicNotes size={20} weight="fill" />,
        label: '⭐ Runtime & Timing',
        description: 'Time-based operations, scheduling, and runtime coordination',
        color: 'text-yellow'
      }
    }
    
    if (trackId === 'pink-floyd-money') {
      return {
        icon: <MusicNotes size={20} weight="fill" />,
        label: '💰 Treasury & Value',
        description: 'Financial systems, tokens, value management',
        color: 'text-gold'
      }
    }
    
    if (trackId === 'pink-floyd-brain-damage') {
      return {
        icon: <MusicNotes size={20} weight="fill" />,
        label: '🧠 Neural Core',
        description: 'Brain systems, learning, cognition, and intelligence',
        color: 'text-purple'
      }
    }
    
    if (trackId === 'pink-floyd-breathe') {
      return {
        icon: <MusicNotes size={20} weight="fill" />,
        label: '💨 Life & Existence',
        description: 'Calm initialization, breathing life into the system',
        color: 'text-blue'
      }
    }
    
    return {
      icon: <MusicNotes size={20} weight="fill" />,
      label: '🎵 Semantic Match',
      description: 'AI-selected based on repo themes and mood',
      color: 'text-primary'
    }
  }

  const reason = getSemanticReason()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-3 bg-gradient-to-br from-purple/10 via-pink/5 to-gold/10 border-purple/20">
        <div className="flex items-start gap-3">
          <div className={`${reason.color} flex-shrink-0 mt-0.5`}>
            {reason.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={`text-xs ${reason.color} border-current/30 bg-current/10`}>
                🤖 AI Selected
              </Badge>
              <span className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {reason.label}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {reason.description}
            </p>
            {repoName && (
              <p className="text-xs text-muted-foreground/70 mt-1.5 font-mono">
                Matched to: {repoName}
              </p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
