import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface FrequencyBandsProps {
  audioElement: HTMLAudioElement | null
  isPlaying: boolean
  className?: string
}

interface FrequencyBand {
  name: string
  range: [number, number]
  color: string
}

const FREQUENCY_BANDS: FrequencyBand[] = [
  { name: 'SUB', range: [20, 60], color: 'oklch(0.55 0.22 290)' },
  { name: 'BASS', range: [60, 250], color: 'oklch(0.60 0.25 250)' },
  { name: 'LOW MID', range: [250, 500], color: 'oklch(0.60 0.24 220)' },
  { name: 'MID', range: [500, 2000], color: 'oklch(0.70 0.20 200)' },
  { name: 'HIGH MID', range: [2000, 4000], color: 'oklch(0.75 0.18 180)' },
  { name: 'HIGH', range: [4000, 8000], color: 'oklch(0.80 0.15 160)' },
  { name: 'PRESENCE', range: [8000, 16000], color: 'oklch(0.85 0.12 140)' },
]

export function FrequencyBands({ audioElement, isPlaying, className = '' }: FrequencyBandsProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animationRef = useRef<number | null>(null)
  const [bandLevels, setBandLevels] = useState<number[]>(new Array(FREQUENCY_BANDS.length).fill(0))

  useEffect(() => {
    if (!audioElement) return

    const initAudioContext = async () => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }

        if (!sourceRef.current && audioContextRef.current) {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement)
          analyserRef.current = audioContextRef.current.createAnalyser()
          analyserRef.current.fftSize = 2048
          analyserRef.current.smoothingTimeConstant = 0.8
          
          sourceRef.current.connect(analyserRef.current)
          analyserRef.current.connect(audioContextRef.current.destination)
        }

        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }
      } catch (error) {
        console.error('Failed to initialize audio context:', error)
      }
    }

    if (isPlaying) {
      initAudioContext()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioElement, isPlaying])

  useEffect(() => {
    if (!isPlaying || !analyserRef.current || !audioContextRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setBandLevels(new Array(FREQUENCY_BANDS.length).fill(0))
      return
    }

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    const sampleRate = audioContextRef.current.sampleRate
    
    const updateBands = () => {
      if (!analyserRef.current) return

      analyserRef.current.getByteFrequencyData(dataArray)
      
      const newBandLevels = FREQUENCY_BANDS.map(band => {
        const [lowFreq, highFreq] = band.range
        const lowIndex = Math.floor(lowFreq * analyserRef.current!.fftSize / sampleRate)
        const highIndex = Math.floor(highFreq * analyserRef.current!.fftSize / sampleRate)
        
        let sum = 0
        let count = 0
        for (let i = lowIndex; i <= highIndex && i < dataArray.length; i++) {
          sum += dataArray[i]
          count++
        }
        
        return count > 0 ? (sum / count / 255) : 0
      })
      
      setBandLevels(newBandLevels)
      animationRef.current = requestAnimationFrame(updateBands)
    }

    updateBands()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-7 gap-2">
        {FREQUENCY_BANDS.map((band, index) => {
          const level = bandLevels[index] || 0
          const height = Math.max(level * 100, 2)
          
          return (
            <div key={band.name} className="flex flex-col items-center gap-1">
              <div className="w-full h-24 bg-muted/20 rounded-lg overflow-hidden relative">
                <motion.div
                  className="absolute bottom-0 left-0 right-0 rounded-t-lg"
                  style={{
                    background: `linear-gradient(to top, ${band.color}, ${band.color.replace(/\)$/, ' / 0.3)')})`,
                  }}
                  initial={{ height: 0 }}
                  animate={{ 
                    height: `${height}%`,
                    boxShadow: isPlaying && level > 0.3 
                      ? `0 0 20px ${band.color.replace(/\)$/, ' / 0.6)')}` 
                      : 'none'
                  }}
                  transition={{ 
                    duration: 0.1,
                    ease: 'easeOut'
                  }}
                />
                
                {isPlaying && level > 0.5 && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${band.color.replace(/\)$/, ' / 0.4)')}, transparent 70%)`,
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                )}
              </div>
              
              <div className="text-center">
                <div className="text-xs font-mono font-bold text-foreground/80">
                  {band.name}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  {Math.round(level * 100)}%
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg"
        >
          <div className="text-center">
            <div className="text-sm text-muted-foreground font-mono mb-1">
              🎵 Frequency Spectrum
            </div>
            <div className="text-xs text-muted-foreground/60">
              Play music to see real-time analysis
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
