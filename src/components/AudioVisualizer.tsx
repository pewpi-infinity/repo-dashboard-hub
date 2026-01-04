import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface AudioVisualizerProps {
  audioElement: HTMLAudioElement | null
  isPlaying: boolean
  variant?: 'bars' | 'wave' | 'circle' | 'pulse'
  barCount?: number
  color?: string
  height?: number
  className?: string
}

export function AudioVisualizer({ 
  audioElement, 
  isPlaying, 
  variant = 'bars',
  barCount = 32,
  color = 'oklch(0.60 0.25 250)',
  height = 80,
  className = ''
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animationRef = useRef<number | null>(null)
  const [frequencies, setFrequencies] = useState<number[]>(() => Array(barCount).fill(0))

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
          analyserRef.current.fftSize = 256
          
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
    if (!isPlaying || !analyserRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setFrequencies(Array(barCount).fill(0))
      return
    }

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    
    const updateFrequencies = () => {
      if (!analyserRef.current) return

      analyserRef.current.getByteFrequencyData(dataArray)
      
      const step = Math.floor(dataArray.length / barCount)
      const newFrequencies: number[] = []
      
      for (let i = 0; i < barCount; i++) {
        let sum = 0
        for (let j = 0; j < step; j++) {
          sum += dataArray[i * step + j]
        }
        newFrequencies.push(sum / step / 255)
      }
      
      setFrequencies(newFrequencies)
      animationRef.current = requestAnimationFrame(updateFrequencies)
    }

    updateFrequencies()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, barCount])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, rect.width, rect.height)

    if (variant === 'bars') {
      drawBars(ctx, rect.width, rect.height)
    } else if (variant === 'wave') {
      drawWave(ctx, rect.width, rect.height)
    } else if (variant === 'circle') {
      drawCircle(ctx, rect.width, rect.height)
    } else if (variant === 'pulse') {
      drawPulse(ctx, rect.width, rect.height)
    }
  }, [frequencies, variant, color])

  const drawBars = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const barWidth = width / barCount
    const gap = barWidth * 0.2

    frequencies.forEach((value, index) => {
      const barHeight = value * height * 0.8
      const x = index * barWidth + gap / 2
      const y = height - barHeight

      const gradient = ctx.createLinearGradient(0, height, 0, 0)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, color.replace(/\)$/, ' / 0.3)'))

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth - gap, barHeight)
    })
  }

  const drawWave = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.beginPath()
    ctx.moveTo(0, height / 2)

    const step = width / (barCount - 1)

    frequencies.forEach((value, index) => {
      const x = index * step
      const y = height / 2 - (value * height * 0.4)
      
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        const prevX = (index - 1) * step
        const prevY = height / 2 - (frequencies[index - 1] * height * 0.4)
        const cpX = (prevX + x) / 2
        ctx.quadraticCurveTo(prevX, prevY, cpX, (prevY + y) / 2)
      }
    })

    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, color.replace(/\)$/, ' / 0.8)'))
    gradient.addColorStop(1, color.replace(/\)$/, ' / 0.2)'))

    ctx.strokeStyle = gradient
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()

    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    
    const fillGradient = ctx.createLinearGradient(0, 0, 0, height)
    fillGradient.addColorStop(0, color.replace(/\)$/, ' / 0.3)'))
    fillGradient.addColorStop(1, color.replace(/\)$/, ' / 0.05)'))
    ctx.fillStyle = fillGradient
    ctx.fill()
  }

  const drawCircle = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2
    const centerY = height / 2
    const maxRadius = Math.min(width, height) * 0.4
    const minRadius = maxRadius * 0.3

    ctx.beginPath()

    frequencies.forEach((value, index) => {
      const angle = (index / barCount) * Math.PI * 2 - Math.PI / 2
      const radius = minRadius + value * (maxRadius - minRadius)
      
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.closePath()

    const gradient = ctx.createRadialGradient(centerX, centerY, minRadius, centerX, centerY, maxRadius)
    gradient.addColorStop(0, color.replace(/\)$/, ' / 0.8)'))
    gradient.addColorStop(1, color.replace(/\)$/, ' / 0.2)'))

    ctx.fillStyle = gradient
    ctx.fill()

    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const drawPulse = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2
    const centerY = height / 2
    const avgFrequency = frequencies.reduce((sum, val) => sum + val, 0) / frequencies.length
    const maxRadius = Math.min(width, height) * 0.45

    for (let i = 3; i >= 0; i--) {
      const scale = 1 - (i * 0.2)
      const radius = avgFrequency * maxRadius * scale
      const opacity = 0.3 * scale

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, color.replace(/\)$/, ` / ${opacity * 0.8})`))
      gradient.addColorStop(1, color.replace(/\)$/, ` / ${opacity * 0.1})`))

      ctx.fillStyle = gradient
      ctx.fill()

      ctx.strokeStyle = color.replace(/\)$/, ` / ${opacity})`)
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }

  return (
    <div className={`relative ${className}`} style={{ height: `${height}px` }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-xs text-muted-foreground font-mono">
            {variant === 'bars' && '▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▇ ▆ ▅ ▄ ▃ ▂ ▁'}
            {variant === 'wave' && '∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿'}
            {variant === 'circle' && '◯ ◉ ◯'}
            {variant === 'pulse' && '◉ ◉ ◉'}
          </div>
        </motion.div>
      )}
    </div>
  )
}
