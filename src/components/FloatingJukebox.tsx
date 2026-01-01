import { useState, useEffect } from 'react'
import { Jukebox } from './Jukebox'
import { Button } from './ui/button'
import { MusicNotes, X, CaretDown, CaretUp } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CategorizedRepo } from '@/lib/types'
import type { MusicTrack } from '@/lib/media-semantic'

interface FloatingJukeboxProps {
  repo?: CategorizedRepo
  repoName?: string
  externalTrack?: MusicTrack | null
}

export function FloatingJukebox({ repo, repoName, externalTrack }: FloatingJukeboxProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (externalTrack) {
      setIsVisible(true)
      setIsExpanded(true)
    }
  }, [externalTrack])

  if (!isVisible) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsVisible(true)}
          size="lg"
          className="gap-2 bg-gradient-to-r from-purple via-pink to-gold hover:from-purple/90 hover:via-pink/90 hover:to-gold/90 shadow-2xl"
        >
          <MusicNotes size={24} weight="fill" />
          Music
        </Button>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 z-50 max-w-md w-full"
      >
        <div className="bg-card/95 backdrop-blur-lg border-2 border-purple/30 rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-border/50 bg-gradient-to-r from-purple/10 via-pink/10 to-gold/10">
            <div className="flex items-center gap-2">
              <MusicNotes size={20} weight="fill" className="text-purple" />
              <span className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                🎵 Quantum Jukebox
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0"
              >
                {isExpanded ? (
                  <CaretDown size={16} weight="bold" />
                ) : (
                  <CaretUp size={16} weight="bold" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsVisible(false)}
                className="h-8 w-8 p-0"
              >
                <X size={16} weight="bold" />
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4">
                  <Jukebox 
                    repoName={repoName} 
                    repo={repo} 
                    autoPlay={false}
                    externalTrack={externalTrack}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <div className="p-3">
              <Jukebox 
                repoName={repoName} 
                repo={repo} 
                compact 
                autoPlay={false}
                externalTrack={externalTrack}
              />
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
