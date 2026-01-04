import { useState, useRef, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Slider } from './ui/slider'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  SpeakerHigh, 
  SpeakerSlash,
  Queue,
  MusicNotes,
  Circle
} from '@phosphor-icons/react'
import { musicLibrary, type MusicTrack, getMusicForRepo, aiMatchMusicToRepo } from '@/lib/media-semantic'
import { MusicSemanticInfo } from './MusicSemanticInfo'
import { SemanticMusicControls } from './SemanticMusicControls'
import { AudioVisualizer } from './AudioVisualizer'
import { MusicParticles } from './MusicParticles'
import { FrequencyBands } from './FrequencyBands'
import { motion, AnimatePresence } from 'framer-motion'
import type { CategorizedRepo } from '@/lib/types'

interface JukeboxProps {
  repoName?: string
  repo?: CategorizedRepo
  compact?: boolean
  autoPlay?: boolean
  externalTrack?: MusicTrack | null
}

export function Jukebox({ repoName, repo, compact = false, autoPlay = false, externalTrack }: JukeboxProps) {
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [showQueue, setShowQueue] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [loadingAiMatch, setLoadingAiMatch] = useState(false)
  const [visualizerMode, setVisualizerMode] = useState<'wave' | 'frequency'>('wave')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const rotationRef = useRef<number>(0)

  const availableTracks = repoName 
    ? getMusicForRepo(repoName)
    : musicLibrary

  useEffect(() => {
    if (externalTrack) {
      setCurrentTrack(externalTrack)
      setIsPlaying(true)
    }
  }, [externalTrack])

  useEffect(() => {
    const initializeMusic = async () => {
      if (availableTracks.length > 0 && !currentTrack) {
        if (repoName && repo) {
          setLoadingAiMatch(true)
          try {
            const aiMatch = await aiMatchMusicToRepo(repoName, repo.description || undefined)
            if (aiMatch) {
              setCurrentTrack(aiMatch)
            } else {
              setCurrentTrack(availableTracks[0])
            }
          } catch (error) {
            console.error('AI matching failed, using fallback:', error)
            setCurrentTrack(availableTracks[0])
          } finally {
            setLoadingAiMatch(false)
          }
        } else {
          setCurrentTrack(availableTracks[0])
        }
        
        if (autoPlay) {
          setIsPlaying(true)
        }
      }
    }
    
    initializeMusic()
  }, [availableTracks, currentTrack, autoPlay, repoName, repo])

  useEffect(() => {
    let animationFrame: number
    
    if (isPlaying) {
      const animate = () => {
        rotationRef.current = (rotationRef.current + 1) % 360
        setRotation(rotationRef.current)
        animationFrame = requestAnimationFrame(animate)
      }
      animationFrame = requestAnimationFrame(animate)
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (!currentTrack?.url) return

    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.url)
      audioRef.current.volume = isMuted ? 0 : volume
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime)
        }
      })
      
      audioRef.current.addEventListener('ended', () => {
        nextTrack()
      })
    } else if (audioRef.current.src !== currentTrack.url) {
      audioRef.current.pause()
      audioRef.current.src = currentTrack.url
      audioRef.current.volume = isMuted ? 0 : volume
      audioRef.current.load()
    }

    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('Audio play failed:', err)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [currentTrack, isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0])
    if (values[0] > 0) {
      setIsMuted(false)
    }
  }

  const playTrack = (track: MusicTrack) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    setCurrentTime(0)
  }

  const nextTrack = () => {
    const currentIndex = availableTracks.findIndex(t => t.id === currentTrack?.id)
    const nextIndex = (currentIndex + 1) % availableTracks.length
    playTrack(availableTracks[nextIndex])
  }

  const previousTrack = () => {
    const currentIndex = availableTracks.findIndex(t => t.id === currentTrack?.id)
    const previousIndex = currentIndex === 0 ? availableTracks.length - 1 : currentIndex - 1
    playTrack(availableTracks[previousIndex])
  }

  const parseDuration = (duration: string | undefined): number => {
    if (!duration) return 0
    const parts = duration.split(':').map(Number)
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1]
    }
    return 0
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (compact) {
    return (
      <Card className="p-3 bg-gradient-to-br from-purple/20 via-pink/10 to-gold/20 backdrop-blur-sm border-purple/30">
        <div className="mb-2">
          <AudioVisualizer 
            audioElement={audioRef.current}
            isPlaying={isPlaying}
            variant="bars"
            barCount={24}
            color="oklch(0.60 0.25 250)"
            height={40}
            className="rounded overflow-hidden"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isPlaying ? rotation : 0 }}
            className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple via-pink to-gold flex items-center justify-center flex-shrink-0"
          >
            <Circle size={32} weight="fill" className="text-foreground" />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            {loadingAiMatch ? (
              <>
                <div className="text-sm font-bold text-purple truncate animate-pulse">
                  🤖 AI Selecting Track...
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  Analyzing machine journey
                </div>
              </>
            ) : (
              <>
                <div className="text-sm font-bold text-foreground truncate">
                  {currentTrack?.title || 'No Track'}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {currentTrack?.artist || 'Select a track'}
                </div>
              </>
            )}
          </div>

          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={togglePlay}
              className="h-8 w-8 p-0"
              disabled={!currentTrack || loadingAiMatch}
            >
              {isPlaying ? (
                <Pause size={16} weight="fill" />
              ) : (
                <Play size={16} weight="fill" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-purple/20 via-pink/10 to-gold/20 backdrop-blur-sm border-purple/30 glow-border relative overflow-hidden">
      <MusicParticles isPlaying={isPlaying} intensity={0.6} />
      
      <div className="mb-4 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-foreground/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            🎛️ Audio Visualization
          </h3>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={visualizerMode === 'wave' ? 'default' : 'ghost'}
              onClick={() => setVisualizerMode('wave')}
              className="h-7 px-2 text-xs"
            >
              Wave
            </Button>
            <Button
              size="sm"
              variant={visualizerMode === 'frequency' ? 'default' : 'ghost'}
              onClick={() => setVisualizerMode('frequency')}
              className="h-7 px-2 text-xs"
            >
              Spectrum
            </Button>
          </div>
        </div>
        
        {visualizerMode === 'wave' ? (
          <AudioVisualizer 
            audioElement={audioRef.current}
            isPlaying={isPlaying}
            variant="wave"
            barCount={48}
            color="oklch(0.60 0.25 250)"
            height={100}
            className="rounded-lg overflow-hidden bg-gradient-to-br from-purple/10 to-pink/10 border border-purple/20"
          />
        ) : (
          <div className="relative">
            <FrequencyBands
              audioElement={audioRef.current}
              isPlaying={isPlaying}
              className="relative"
            />
          </div>
        )}
      </div>

      <div className="flex items-start gap-4 mb-4 relative z-10">
        <motion.div
          animate={{ rotate: isPlaying ? rotation : 0 }}
          className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple via-pink to-gold flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{
            boxShadow: isPlaying 
              ? '0 0 40px rgba(138, 43, 226, 0.6), 0 0 80px rgba(255, 100, 220, 0.3)' 
              : '0 0 20px rgba(138, 43, 226, 0.3)'
          }}
        >
          <Circle size={64} weight="fill" className="text-foreground" />
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border-4 border-gold/30 animate-ping" />
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              {loadingAiMatch ? (
                <>
                  <h3 className="text-lg font-bold text-purple animate-pulse" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    🤖 AI Selecting Perfect Track...
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Analyzing machine journey & musical themes
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-foreground truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {currentTrack?.title || 'No Track Selected'}
                    </h3>
                    {repoName && currentTrack && (
                      <Badge variant="outline" className="text-xs bg-purple/20 border-purple/30 flex items-center gap-1">
                        🤖 AI Match
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {currentTrack?.artist || 'Choose a track to play'}
                  </p>
                  {currentTrack?.album && (
                    <p className="text-xs text-muted-foreground/80 truncate">
                      {currentTrack.album}
                    </p>
                  )}
                </>
              )}
            </div>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowQueue(!showQueue)}
              className={`gap-2 ${showQueue ? 'bg-purple/20 border-purple' : ''}`}
            >
              <Queue size={16} />
              {showQueue ? 'Hide' : 'Queue'}
            </Button>
          </div>

          {currentTrack && (
            <>
              <div className="flex flex-wrap gap-1 mb-3">
                {currentTrack.mood.slice(0, 3).map(mood => (
                  <Badge key={mood} variant="outline" className="text-xs bg-purple/20 border-purple/30">
                    {mood}
                  </Badge>
                ))}
                {!currentTrack.url && (
                  <Badge variant="outline" className="text-xs bg-yellow/20 border-yellow/30 text-yellow">
                    🔗 Link pending
                  </Badge>
                )}
              </div>
              
              {repoName && !loadingAiMatch && (
                <div className="mb-3">
                  <MusicSemanticInfo track={currentTrack} repoName={repoName} />
                </div>
              )}
            </>
          )}

          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple via-pink to-gold"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: currentTrack 
                      ? `${(currentTime / parseDuration(currentTrack.duration)) * 100}%`
                      : '0%'
                  }}
                />
              </div>
              <span>{currentTrack?.duration || '0:00'}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={previousTrack}
                disabled={availableTracks.length === 0}
                className="gap-2"
              >
                <SkipBack size={16} weight="fill" />
              </Button>
              
              <Button
                size="sm"
                onClick={togglePlay}
                disabled={!currentTrack || !currentTrack.url}
                className="gap-2 bg-gradient-to-r from-purple to-pink hover:from-purple/90 hover:to-pink/90"
                title={!currentTrack?.url ? 'Music link not yet available' : undefined}
              >
                {isPlaying ? (
                  <>
                    <Pause size={20} weight="fill" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={20} weight="fill" />
                    {currentTrack?.url ? 'Play' : 'Link Pending'}
                  </>
                )}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={nextTrack}
                disabled={availableTracks.length === 0}
                className="gap-2"
              >
                <SkipForward size={16} weight="fill" />
              </Button>

              <div className="flex items-center gap-2 ml-auto">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleMute}
                  className="h-8 w-8 p-0"
                >
                  {isMuted || volume === 0 ? (
                    <SpeakerSlash size={16} />
                  ) : (
                    <SpeakerHigh size={16} />
                  )}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showQueue && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/50 pt-4 relative z-10"
          >
            <div className="flex items-center gap-2 mb-3">
              <MusicNotes size={16} className="text-purple" weight="fill" />
              <h4 className="text-sm font-semibold text-foreground">
                Track Queue ({availableTracks.length})
              </h4>
            </div>
            
            <div className="mb-4">
              <SemanticMusicControls 
                onSelectTrack={playTrack} 
                currentTrackId={currentTrack?.id}
              />
            </div>
            
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {availableTracks.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      currentTrack?.id === track.id
                        ? 'bg-purple/30 border border-purple/50'
                        : 'bg-card/50 hover:bg-card border border-transparent hover:border-purple/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-xs text-muted-foreground font-mono w-6 flex-shrink-0 pt-1">
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">
                          {track.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {track.artist} {track.album && `• ${track.album}`}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {track.themes.slice(0, 3).map(theme => (
                            <span 
                              key={theme} 
                              className="text-xs px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground"
                            >
                              {theme}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-mono flex-shrink-0">
                        {track.duration}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
