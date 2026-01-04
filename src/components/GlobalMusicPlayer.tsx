import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Slider } from './ui/slider'
import { 
  Play, 
  Pause, 
  SpeakerHigh, 
  SpeakerLow, 
  SpeakerSlash,
  X,
  CaretDown,
  CaretUp,
  MusicNotes,
  Infinity
} from '@phosphor-icons/react'
import { AudioVisualizer } from './AudioVisualizer'
import { MusicParticles } from './MusicParticles'

interface MusicPlayerState {
  isPlaying: boolean
  volume: number
  currentTime: number
  isMinimized: boolean
  isVisible: boolean
}

const STORAGE_KEY = 'quantum-music-player-state'
// Note: In production, replace this with a local audio file or configurable URL
const DEFAULT_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

export function GlobalMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [state, setState] = useState<MusicPlayerState>({
    isPlaying: false,
    volume: 0.5,
    currentTime: 0,
    isMinimized: false,
    isVisible: true
  })
  const [duration, setDuration] = useState(0)
  const [audioReady, setAudioReady] = useState(false)

  // Load state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setState(prev => ({
          ...prev,
          volume: parsed.volume ?? 0.5,
          isMinimized: parsed.isMinimized ?? false,
          isVisible: parsed.isVisible ?? true
        }))
      }
    } catch (error) {
      console.error('Failed to load music player state:', error)
    }
  }, [])

  // Save state to localStorage with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          volume: state.volume,
          isMinimized: state.isMinimized,
          isVisible: state.isVisible
        }))
      } catch (error) {
        console.error('Failed to save music player state:', error)
      }
    }, 500) // Debounce by 500ms

    return () => clearTimeout(timeoutId)
  }, [state.volume, state.isMinimized, state.isVisible])

  // Update audio element volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume
    }
  }, [state.volume])

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setAudioReady(true)
    }

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }))
    }

    const handleEnded = () => {
      // Note: With loop attribute, this shouldn't fire, but keeping for fallback
      if (!audio.loop) {
        setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }))
      }
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (state.isPlaying) {
        audioRef.current.pause()
        setState(prev => ({ ...prev, isPlaying: false }))
      } else {
        await audioRef.current.play()
        setState(prev => ({ ...prev, isPlaying: true }))
      }
    } catch (error) {
      console.error('Failed to play audio:', error)
    }
  }

  const handleVolumeChange = (values: number[]) => {
    setState(prev => ({ ...prev, volume: values[0] }))
  }

  const handleSeek = (values: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = values[0]
      setState(prev => ({ ...prev, currentTime: values[0] }))
    }
  }

  const toggleMinimize = () => {
    setState(prev => ({ ...prev, isMinimized: !prev.isMinimized }))
  }

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setState(prev => ({ ...prev, isVisible: false, isPlaying: false }))
  }

  const handleShow = () => {
    setState(prev => ({ ...prev, isVisible: true }))
  }

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const VolumeIcon = state.volume === 0 ? SpeakerSlash : state.volume < 0.5 ? SpeakerLow : SpeakerHigh

  if (!state.isVisible) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 left-4 z-[60]"
      >
        <Button
          onClick={handleShow}
          size="lg"
          className="gap-2 bg-gradient-to-r from-purple via-pink to-gold hover:from-purple/90 hover:via-pink/90 hover:to-gold/90 shadow-2xl rounded-full h-14 w-14 p-0"
          aria-label="Show music player"
        >
          <MusicNotes size={24} weight="fill" className="animate-pulse" />
        </Button>
      </motion.div>
    )
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={DEFAULT_AUDIO_URL}
        preload="metadata"
        loop
      />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-4 z-[60] w-full max-w-sm"
        >
          <div className="bg-card/95 backdrop-blur-lg border-2 border-purple/30 rounded-xl shadow-2xl overflow-hidden relative">
            <MusicParticles isPlaying={state.isPlaying} intensity={0.4} particleCount={20} />
            
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-border/50 bg-gradient-to-r from-purple/10 via-pink/10 to-gold/10 relative z-10">
              <div className="flex items-center gap-2">
                <Infinity size={20} weight="fill" className="text-gold animate-spin" style={{ animationDuration: '8s' }} />
                <MusicNotes size={20} weight="fill" className="text-purple" />
                <span 
                  className="text-sm font-bold bg-gradient-to-r from-purple via-pink to-gold bg-clip-text text-transparent" 
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  QUANTUM PLAYER
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleMinimize}
                  className="h-8 w-8 p-0 hover:bg-purple/20"
                  aria-label={state.isMinimized ? "Expand player" : "Minimize player"}
                >
                  {state.isMinimized ? (
                    <CaretUp size={16} weight="bold" />
                  ) : (
                    <CaretDown size={16} weight="bold" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleClose}
                  className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                  aria-label="Close player"
                >
                  <X size={16} weight="bold" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <AnimatePresence>
              {!state.isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-4 relative z-10">
                    {/* Visualizer */}
                    <div className="mb-2">
                      <AudioVisualizer 
                        audioElement={audioRef.current}
                        isPlaying={state.isPlaying}
                        variant="circle"
                        barCount={32}
                        color="oklch(0.75 0.18 200)"
                        height={120}
                        className="rounded-lg overflow-hidden bg-gradient-to-br from-purple/10 via-pink/10 to-gold/10 border border-purple/20"
                      />
                    </div>

                    {/* Track Info */}
                    <div className="text-center space-y-1">
                      <p 
                        className="text-sm font-semibold text-foreground" 
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Quantum System Ambient
                      </p>
                      <p className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {audioReady ? 'Infinity Loop Active' : 'Loading...'}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <Slider
                        value={[state.currentTime]}
                        max={duration || 100}
                        step={1}
                        onValueChange={handleSeek}
                        disabled={!audioReady}
                        className="cursor-pointer"
                        aria-label="Seek audio"
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <span>{formatTime(state.currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        onClick={togglePlay}
                        size="lg"
                        disabled={!audioReady}
                        className="h-12 w-12 rounded-full bg-gradient-to-r from-purple to-pink hover:from-purple/90 hover:to-pink/90 shadow-lg shadow-purple/30"
                        aria-label={state.isPlaying ? "Pause" : "Play"}
                      >
                        {state.isPlaying ? (
                          <Pause size={24} weight="fill" />
                        ) : (
                          <Play size={24} weight="fill" />
                        )}
                      </Button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-3">
                      <VolumeIcon size={20} className="text-muted-foreground flex-shrink-0" />
                      <Slider
                        value={[state.volume]}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                        className="cursor-pointer flex-1"
                        aria-label="Volume"
                      />
                      <span className="text-xs text-muted-foreground w-10 text-right" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {Math.round(state.volume * 100)}%
                      </span>
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple/10 border border-purple/30">
                        <div className={`h-2 w-2 rounded-full ${state.isPlaying ? 'bg-green animate-pulse' : 'bg-muted-foreground'}`} />
                        <span className="text-xs font-mono text-muted-foreground">
                          {state.isPlaying ? 'PLAYING' : 'PAUSED'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Minimized View */}
            {state.isMinimized && (
              <div className="p-3 relative z-10">
                <div className="mb-2">
                  <AudioVisualizer 
                    audioElement={audioRef.current}
                    isPlaying={state.isPlaying}
                    variant="bars"
                    barCount={20}
                    color="oklch(0.75 0.18 200)"
                    height={30}
                    className="rounded overflow-hidden"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Button
                    onClick={togglePlay}
                    size="sm"
                    disabled={!audioReady}
                    className="h-9 w-9 rounded-full bg-gradient-to-r from-purple to-pink hover:from-purple/90 hover:to-pink/90 flex-shrink-0"
                    aria-label={state.isPlaying ? "Pause" : "Play"}
                  >
                    {state.isPlaying ? (
                      <Pause size={16} weight="fill" />
                    ) : (
                      <Play size={16} weight="fill" />
                    )}
                  </Button>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Quantum System Ambient
                    </p>
                    <div className="w-full bg-muted rounded-full h-1 mt-1">
                      <div 
                        className="bg-gradient-to-r from-purple to-pink h-1 rounded-full transition-all"
                        style={{ width: `${duration > 0 ? (state.currentTime / duration) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <VolumeIcon size={16} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground w-8 text-right" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {Math.round(state.volume * 100)}%
                  </span>
                </div>
              </div>
            </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
