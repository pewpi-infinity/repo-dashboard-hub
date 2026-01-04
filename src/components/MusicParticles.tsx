import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface MusicParticlesProps {
  isPlaying: boolean
  intensity?: number
  color?: string
  particleCount?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  hue: number
}

export function MusicParticles({ 
  isPlaying, 
  intensity = 0.5,
  color = 'oklch(0.60 0.25 250)',
  particleCount = 30
}: MusicParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)

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

    const createParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 2 + 1
      const maxLife = Math.random() * 60 + 30
      
      return {
        x: rect.width / 2,
        y: rect.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        life: maxLife,
        maxLife,
        hue: Math.random() * 60 + 220
      }
    }

    if (isPlaying && particlesRef.current.length < particleCount * intensity) {
      particlesRef.current.push(createParticle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)

      if (isPlaying) {
        if (Math.random() < 0.3 * intensity && particlesRef.current.length < particleCount) {
          particlesRef.current.push(createParticle())
        }
      }

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--

        if (particle.life <= 0 || 
            particle.x < 0 || particle.x > rect.width ||
            particle.y < 0 || particle.y > rect.height) {
          return false
        }

        const opacity = particle.life / particle.maxLife
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        )
        gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, ${opacity * 0.8})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 60%, 0)`)
        
        ctx.fillStyle = gradient
        ctx.fill()

        return true
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, intensity, particleCount])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isPlaying ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
