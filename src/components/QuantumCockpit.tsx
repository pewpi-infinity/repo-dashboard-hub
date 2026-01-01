import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CategorizedRepo } from '@/lib/types'
import { getEmojiForRepo, getColorClass, getGlowClass } from '@/lib/emoji-legend'
import { HealthMetrics } from '@/lib/health-monitor'
import { collisionSoundEngine } from '@/lib/collision-sound'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Slider } from './ui/slider'
import { Play, Pause, Sparkle, Atom, Target, SpeakerHigh, SpeakerSlash, ArrowsClockwise, Lock } from '@phosphor-icons/react'

interface Particle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  emoji: string
  color: string
  size: number
  repo: CategorizedRepo
  targetX?: number
  targetY?: number
  isConnecting: boolean
  opacity: number
  rotation: number
  pulse: number
  collisionFlash: number
  slot: number
  isLocked: boolean
  trail: Array<{ x: number; y: number; opacity: number }>
  starField: Array<{ x: number; y: number; size: number; brightness: number }>
}

interface Connection {
  from: string
  to: string
  progress: number
  strength: number
}

interface QuantumCockpitProps {
  repos: CategorizedRepo[]
  healthMetrics: Map<string, HealthMetrics>
  onRepoClick?: (repo: CategorizedRepo) => void
}

const MAX_VISIBLE_PARTICLES = 4

export function QuantumCockpit({ repos, healthMetrics, onRepoClick }: QuantumCockpitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const [particles, setParticles] = useState<Particle[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [selectedParticle, setSelectedParticle] = useState<Particle | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [centerMachine, setCenterMachine] = useState<{ x: number; y: number; radius: number }>({ x: 0, y: 0, radius: 80 })
  const [autoConnect, setAutoConnect] = useState(true)
  const [connectionMode, setConnectionMode] = useState<'learning' | 'coordinating' | 'building'>('learning')
  const [collisionCount, setCollisionCount] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [soundVolume, setSoundVolume] = useState(0.15)
  const [currentRepoIndex, setCurrentRepoIndex] = useState(0)
  const [lockedSlots, setLockedSlots] = useState<Set<number>>(new Set())
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [scaffoldingVisible, setScaffoldingVisible] = useState(true)

  const brainRepo = useMemo(() => repos.find(r => r.name.toLowerCase().includes('mongoose')), [repos])

  useEffect(() => {
    collisionSoundEngine.initialize()
    collisionSoundEngine.setEnabled(soundEnabled)
    collisionSoundEngine.setVolume(soundVolume)

    return () => {
      collisionSoundEngine.stop()
    }
  }, [])

  useEffect(() => {
    collisionSoundEngine.setEnabled(soundEnabled)
  }, [soundEnabled])

  useEffect(() => {
    collisionSoundEngine.setVolume(soundVolume)
  }, [soundVolume])

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
        setCenterMachine({ 
          x: rect.width / 2, 
          y: rect.height / 2, 
          radius: Math.min(rect.width, rect.height) * 0.08
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || repos.length === 0) return

    const visibleRepos = repos.slice(currentRepoIndex, currentRepoIndex + MAX_VISIBLE_PARTICLES)
    
    while (visibleRepos.length < MAX_VISIBLE_PARTICLES && repos.length >= MAX_VISIBLE_PARTICLES) {
      const remaining = MAX_VISIBLE_PARTICLES - visibleRepos.length
      visibleRepos.push(...repos.slice(0, remaining))
    }

    const slotPositions = [
      { x: 0.25, y: 0.3 },
      { x: 0.75, y: 0.3 },
      { x: 0.25, y: 0.7 },
      { x: 0.75, y: 0.7 }
    ]

    const newParticles: Particle[] = visibleRepos.map((repo, index) => {
      const emojiData = getEmojiForRepo(repo.name)
      const slot = slotPositions[index % MAX_VISIBLE_PARTICLES]
      
      const startX = dimensions.width * slot.x
      const startY = dimensions.height * slot.y
      
      const isBrain = repo.name.toLowerCase().includes('mongoose')
      const isLocked = lockedSlots.has(index)
      
      const starFieldCount = 30
      const starField = Array.from({ length: starFieldCount }, () => ({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random()
      }))
      
      return {
        id: repo.name,
        x: startX,
        y: startY,
        vx: isLocked ? 0 : (Math.random() - 0.5) * 1.5,
        vy: isLocked ? 0 : (Math.random() - 0.5) * 1.5,
        emoji: emojiData?.emoji || '⚡',
        color: emojiData?.color || 'blue',
        size: isBrain ? 56 : 44,
        repo,
        isConnecting: false,
        opacity: 1,
        rotation: Math.random() * 360,
        pulse: Math.random() * Math.PI * 2,
        collisionFlash: 0,
        slot: index,
        isLocked,
        trail: [],
        starField
      }
    })

    setParticles(newParticles)
  }, [repos, dimensions, currentRepoIndex, lockedSlots])

  useEffect(() => {
    if (isPaused || repos.length <= MAX_VISIBLE_PARTICLES) return

    const interval = 5000 / rotationSpeed
    
    rotationTimerRef.current = setInterval(() => {
      setCurrentRepoIndex(prev => {
        const unlockedSlots = Array.from({ length: MAX_VISIBLE_PARTICLES }, (_, i) => i)
          .filter(slot => !lockedSlots.has(slot))
        
        if (unlockedSlots.length === 0) return prev
        
        return (prev + 1) % repos.length
      })
    }, interval)

    return () => {
      if (rotationTimerRef.current) {
        clearInterval(rotationTimerRef.current)
      }
    }
  }, [repos.length, isPaused, lockedSlots, rotationSpeed])

  useEffect(() => {
    if (isPaused || particles.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const deltaTime = (now - lastTime) / 1000
      lastTime = now

      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      drawBackground(ctx)
      
      const updatedParticles = particles.map((particle, index) => {
        let newX = particle.x
        let newY = particle.y
        let newVx = particle.vx
        let newVy = particle.vy
        let isConnecting = particle.isConnecting
        let collisionFlash = Math.max(0, particle.collisionFlash - deltaTime * 3)

        const newTrail = [
          { x: particle.x, y: particle.y, opacity: 0.8 },
          ...particle.trail.map(t => ({ ...t, opacity: t.opacity * 0.95 }))
        ].slice(0, 15)

        if (particle.isLocked) {
          const slotPositions = [
            { x: 0.25, y: 0.3 },
            { x: 0.75, y: 0.3 },
            { x: 0.25, y: 0.7 },
            { x: 0.75, y: 0.7 }
          ]
          const targetSlot = slotPositions[particle.slot % MAX_VISIBLE_PARTICLES]
          const targetX = dimensions.width * targetSlot.x
          const targetY = dimensions.height * targetSlot.y
          
          const pullStrength = 0.15
          newVx += (targetX - particle.x) * pullStrength
          newVy += (targetY - particle.y) * pullStrength
          newVx *= 0.92
          newVy *= 0.92
        }

        if (autoConnect && connectionMode === 'learning' && !particle.isLocked) {
          const dx = centerMachine.x - particle.x
          const dy = centerMachine.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance > centerMachine.radius * 2) {
            const pullStrength = 0.3
            newVx += (dx / distance) * pullStrength
            newVy += (dy / distance) * pullStrength
          }

          if (distance < centerMachine.radius * 3) {
            isConnecting = true
            
            if (distance < centerMachine.radius * 1.5) {
              const angle = Math.atan2(dy, dx) + Math.PI
              newX = centerMachine.x + Math.cos(angle) * centerMachine.radius * 1.5
              newY = centerMachine.y + Math.sin(angle) * centerMachine.radius * 1.5
              newVx *= 0.95
              newVy *= 0.95
            }
          } else {
            isConnecting = false
          }
        } else if (connectionMode === 'coordinating' && !particle.isLocked) {
          particles.forEach(other => {
            if (other.id === particle.id) return
            const dx = other.x - particle.x
            const dy = other.y - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 150 && distance > 0) {
              const pullStrength = 0.1
              newVx += (dx / distance) * pullStrength
              newVy += (dy / distance) * pullStrength
            }
          })
        } else if (connectionMode === 'building' && !particle.isLocked) {
          const orbitRadius = centerMachine.radius * 2.5
          const angle = Math.atan2(particle.y - centerMachine.y, particle.x - centerMachine.x)
          const targetX = centerMachine.x + Math.cos(angle) * orbitRadius
          const targetY = centerMachine.y + Math.sin(angle) * orbitRadius
          
          newVx += (targetX - particle.x) * 0.02
          newVy += (targetY - particle.y) * 0.02
          
          const tangentVx = -Math.sin(angle) * 0.5
          const tangentVy = Math.cos(angle) * 0.5
          newVx += tangentVx
          newVy += tangentVy
          
          isConnecting = true
        }

        particles.forEach((other, otherIndex) => {
          if (otherIndex <= index) return
          
          const dx = other.x - particle.x
          const dy = other.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDistance = (particle.size + other.size) * 0.6
          
          if (distance < minDistance && distance > 0) {
            collisionFlash = 1
            other.collisionFlash = 1
            setCollisionCount(prev => prev + 1)

            const relativeVelocity = Math.sqrt(
              Math.pow(particle.vx - other.vx, 2) + 
              Math.pow(particle.vy - other.vy, 2)
            )
            const normalizedVelocity = Math.min(relativeVelocity / 8, 1)
            
            collisionSoundEngine.playCollisionSound(
              particle.emoji,
              other.emoji,
              normalizedVelocity
            )
            
            const angle = Math.atan2(dy, dx)
            const targetDistance = minDistance
            const force = (targetDistance - distance) * 0.5
            
            const forceX = Math.cos(angle) * force
            const forceY = Math.sin(angle) * force
            
            const totalMass = particle.size + other.size
            const particleMass = particle.size / totalMass
            const otherMass = other.size / totalMass
            
            newVx -= forceX * otherMass * 0.8
            newVy -= forceY * otherMass * 0.8
            
            other.vx += forceX * particleMass * 0.8
            other.vy += forceY * particleMass * 0.8
            
            const overlap = minDistance - distance
            const separationX = Math.cos(angle) * overlap * 0.5
            const separationY = Math.sin(angle) * overlap * 0.5
            
            newX -= separationX * otherMass
            newY -= separationY * otherMass
            other.x += separationX * particleMass
            other.y += separationY * particleMass
          }
        })

        newVx *= 0.98
        newVy *= 0.98

        const speed = Math.sqrt(newVx * newVx + newVy * newVy)
        const maxSpeed = 4
        if (speed > maxSpeed) {
          newVx = (newVx / speed) * maxSpeed
          newVy = (newVy / speed) * maxSpeed
        }

        newX += newVx
        newY += newVy

        const padding = 50
        if (newX < padding || newX > dimensions.width - padding) {
          newVx *= -0.8
          newX = Math.max(padding, Math.min(dimensions.width - padding, newX))
        }
        if (newY < padding || newY > dimensions.height - padding) {
          newVy *= -0.8
          newY = Math.max(padding, Math.min(dimensions.height - padding, newY))
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          isConnecting,
          rotation: particle.rotation + speed * 2,
          pulse: particle.pulse + deltaTime * 2,
          collisionFlash,
          trail: newTrail,
          starField: particle.starField.map(star => ({
            ...star,
            brightness: 0.3 + Math.sin(Date.now() / 1000 + star.x * 0.1) * 0.7
          }))
        }
      })

      drawConnections(ctx, updatedParticles)
      drawCenterMachine(ctx)
      drawParticles(ctx, updatedParticles)

      setParticles(updatedParticles)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [particles, isPaused, dimensions, centerMachine, autoConnect, connectionMode])

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.save()
    
    const gradient = ctx.createRadialGradient(
      centerMachine.x, centerMachine.y, 0,
      centerMachine.x, centerMachine.y, Math.max(dimensions.width, dimensions.height) / 2
    )
    gradient.addColorStop(0, 'rgba(96, 119, 255, 0.03)')
    gradient.addColorStop(0.5, 'rgba(180, 130, 255, 0.02)')
    gradient.addColorStop(1, 'rgba(255, 100, 220, 0.01)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, dimensions.width, dimensions.height)

    if (scaffoldingVisible) {
      const slotPositions = [
        { x: 0.25, y: 0.3 },
        { x: 0.75, y: 0.3 },
        { x: 0.25, y: 0.7 },
        { x: 0.75, y: 0.7 }
      ]

      slotPositions.forEach((slot, index) => {
        const x = dimensions.width * slot.x
        const y = dimensions.height * slot.y
        const isLocked = lockedSlots.has(index)

        ctx.strokeStyle = isLocked ? 'rgba(255, 215, 0, 0.3)' : 'rgba(96, 119, 255, 0.15)'
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.arc(x, y, 60, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])

        ctx.strokeStyle = isLocked ? 'rgba(255, 215, 0, 0.4)' : 'rgba(96, 119, 255, 0.2)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(centerMachine.x, centerMachine.y)
        ctx.lineTo(x, y)
        ctx.stroke()

        ctx.fillStyle = isLocked ? 'rgba(255, 215, 0, 0.5)' : 'rgba(96, 119, 255, 0.3)'
        ctx.font = '16px "JetBrains Mono", monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(`SLOT ${index + 1}`, x, y - 80)
      })
    }

    ctx.strokeStyle = 'rgba(96, 119, 255, 0.1)'
    ctx.lineWidth = 1
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath()
      ctx.arc(centerMachine.x, centerMachine.y, centerMachine.radius * i * 0.8, 0, Math.PI * 2)
      ctx.stroke()
    }

    ctx.restore()
  }

  const drawCenterMachine = (ctx: CanvasRenderingContext2D) => {
    ctx.save()

    const gradient = ctx.createRadialGradient(
      centerMachine.x, centerMachine.y, 0,
      centerMachine.x, centerMachine.y, centerMachine.radius
    )
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.4)')
    gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.3)')
    gradient.addColorStop(1, 'rgba(96, 119, 255, 0.1)')

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerMachine.x, centerMachine.y, centerMachine.radius, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(centerMachine.x, centerMachine.y, centerMachine.radius, 0, Math.PI * 2)
    ctx.stroke()

    const time = Date.now() / 1000
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + time
      const x1 = centerMachine.x + Math.cos(angle) * centerMachine.radius * 0.7
      const y1 = centerMachine.y + Math.sin(angle) * centerMachine.radius * 0.7
      const x2 = centerMachine.x + Math.cos(angle) * centerMachine.radius * 0.9
      const y2 = centerMachine.y + Math.sin(angle) * centerMachine.radius * 0.9

      ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    ctx.font = 'bold 36px "Orbitron", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.fillText(brainRepo ? '🧠' : '👑', centerMachine.x, centerMachine.y)

    ctx.restore()
  }

  const drawConnections = (ctx: CanvasRenderingContext2D, currentParticles: Particle[]) => {
    ctx.save()

    currentParticles.forEach(particle => {
      if (!particle.isConnecting) return

      const dx = centerMachine.x - particle.x
      const dy = centerMachine.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = centerMachine.radius * 3

      if (distance < maxDistance) {
        const strength = 1 - (distance / maxDistance)
        
        const gradient = ctx.createLinearGradient(
          particle.x, particle.y,
          centerMachine.x, centerMachine.y
        )
        
        const colorMap: Record<string, string> = {
          gold: '255, 215, 0',
          blue: '96, 119, 255',
          purple: '138, 43, 226',
          yellow: '255, 220, 100',
          red: '255, 80, 80',
          orange: '255, 150, 80',
          green: '100, 255, 150',
          pink: '255, 100, 220'
        }
        
        const rgb = colorMap[particle.color] || '96, 119, 255'
        
        gradient.addColorStop(0, `rgba(${rgb}, ${strength * 0.6})`)
        gradient.addColorStop(0.5, `rgba(${rgb}, ${strength * 0.4})`)
        gradient.addColorStop(1, `rgba(255, 215, 0, ${strength * 0.3})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = strength * 3
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(centerMachine.x, centerMachine.y)
        ctx.stroke()

        const time = Date.now() / 1000
        const pulseX = particle.x + (centerMachine.x - particle.x) * ((Math.sin(time * 3 + particle.pulse) + 1) / 2)
        const pulseY = particle.y + (centerMachine.y - particle.y) * ((Math.sin(time * 3 + particle.pulse) + 1) / 2)
        
        ctx.fillStyle = `rgba(${rgb}, ${strength * 0.8})`
        ctx.beginPath()
        ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    if (connectionMode === 'coordinating') {
      currentParticles.forEach((p1, i) => {
        currentParticles.slice(i + 1).forEach(p2 => {
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            const strength = 1 - (distance / 150)
            ctx.strokeStyle = `rgba(180, 130, 255, ${strength * 0.3})`
            ctx.lineWidth = strength * 2
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })
    }

    ctx.restore()
  }

  const drawParticles = (ctx: CanvasRenderingContext2D, currentParticles: Particle[]) => {
    ctx.save()

    currentParticles.forEach(particle => {
      ctx.save()

      particle.starField.forEach(star => {
        const starX = particle.x + star.x
        const starY = particle.y + star.y
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * 0.6})`
        ctx.beginPath()
        ctx.arc(starX, starY, star.size, 0, Math.PI * 2)
        ctx.fill()
        
        if (star.brightness > 0.7) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(star.brightness - 0.7) * 0.5})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(starX - star.size * 2, starY)
          ctx.lineTo(starX + star.size * 2, starY)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(starX, starY - star.size * 2)
          ctx.lineTo(starX, starY + star.size * 2)
          ctx.stroke()
        }
      })

      particle.trail.forEach((point, i) => {
        if (point.opacity < 0.1) return
        
        const colorMap: Record<string, string> = {
          gold: '255, 215, 0',
          blue: '96, 119, 255',
          purple: '138, 43, 226',
          yellow: '255, 220, 100',
          red: '255, 80, 80',
          orange: '255, 150, 80',
          green: '100, 255, 150',
          pink: '255, 100, 220'
        }
        
        const rgb = colorMap[particle.color] || '96, 119, 255'
        const size = (particle.size * 0.3) * (point.opacity / 0.8)
        
        ctx.fillStyle = `rgba(${rgb}, ${point.opacity * 0.4})`
        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.translate(particle.x, particle.y)

      const pulseScale = 1 + Math.sin(particle.pulse) * 0.15

      const colorMap: Record<string, string> = {
        gold: '255, 215, 0',
        blue: '96, 119, 255',
        purple: '138, 43, 226',
        yellow: '255, 220, 100',
        red: '255, 80, 80',
        orange: '255, 150, 80',
        green: '100, 255, 150',
        pink: '255, 100, 220'
      }
      
      const rgb = colorMap[particle.color] || '96, 119, 255'

      const outerGlowSize = particle.size * pulseScale * 2.5
      const outerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, outerGlowSize)
      outerGlow.addColorStop(0, `rgba(${rgb}, 0.15)`)
      outerGlow.addColorStop(0.5, `rgba(${rgb}, 0.08)`)
      outerGlow.addColorStop(1, `rgba(${rgb}, 0)`)
      ctx.fillStyle = outerGlow
      ctx.beginPath()
      ctx.arc(0, 0, outerGlowSize, 0, Math.PI * 2)
      ctx.fill()

      const glowSize = particle.collisionFlash > 0 ? particle.size * pulseScale * (1 + particle.collisionFlash * 0.5) : particle.size * pulseScale
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize)
      
      if (particle.collisionFlash > 0) {
        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${particle.collisionFlash * 0.6})`)
        glowGradient.addColorStop(0.3, `rgba(${rgb}, ${0.5 + particle.collisionFlash * 0.3})`)
        glowGradient.addColorStop(0.6, `rgba(${rgb}, 0.15)`)
        glowGradient.addColorStop(1, `rgba(${rgb}, 0)`)
      } else {
        glowGradient.addColorStop(0, `rgba(${rgb}, 0.4)`)
        glowGradient.addColorStop(0.5, `rgba(${rgb}, 0.2)`)
        glowGradient.addColorStop(1, `rgba(${rgb}, 0)`)
      }

      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(0, 0, glowSize, 0, Math.PI * 2)
      ctx.fill()

      if (particle.collisionFlash > 0) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${particle.collisionFlash * 0.8})`
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(0, 0, particle.size * 0.8, 0, Math.PI * 2)
        ctx.stroke()

        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 + particle.rotation * 0.01
          const length = particle.size * (0.5 + particle.collisionFlash * 0.5)
          const startX = Math.cos(angle) * particle.size * 0.8
          const startY = Math.sin(angle) * particle.size * 0.8
          const endX = Math.cos(angle) * length
          const endY = Math.sin(angle) * length
          
          ctx.strokeStyle = `rgba(${rgb}, ${particle.collisionFlash * 0.7})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          ctx.stroke()
        }
      }

      ctx.font = `${particle.size}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(particle.emoji, 0, 0)

      if (particle.isLocked) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.9)'
        ctx.font = `${particle.size * 0.3}px Arial`
        ctx.fillText('🔒', particle.size * 0.5, -particle.size * 0.5)
      }

      if (particle.isConnecting && particle.collisionFlash === 0) {
        ctx.strokeStyle = `rgba(${rgb}, 0.6)`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(0, 0, particle.size * 0.7, 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.restore()
    })

    ctx.restore()
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const clickedParticle = particles.find(p => {
      const dx = x - p.x
      const dy = y - p.y
      return Math.sqrt(dx * dx + dy * dy) < p.size
    })

    if (clickedParticle) {
      if (e.shiftKey) {
        setLockedSlots(prev => {
          const newSet = new Set(prev)
          if (newSet.has(clickedParticle.slot)) {
            newSet.delete(clickedParticle.slot)
          } else {
            newSet.add(clickedParticle.slot)
          }
          return newSet
        })
      } else {
        setSelectedParticle(clickedParticle)
        onRepoClick?.(clickedParticle.repo)
      }
    }
  }

  const toggleLockSlot = (slot: number) => {
    setLockedSlots(prev => {
      const newSet = new Set(prev)
      if (newSet.has(slot)) {
        newSet.delete(slot)
      } else {
        newSet.add(slot)
      }
      return newSet
    })
  }

  const cycleConnectionMode = () => {
    const modes: Array<'learning' | 'coordinating' | 'building'> = ['learning', 'coordinating', 'building']
    const currentIndex = modes.indexOf(connectionMode)
    const nextIndex = (currentIndex + 1) % modes.length
    setConnectionMode(modes[nextIndex])
  }

  const modeIcons = {
    learning: <Sparkle size={20} weight="fill" />,
    coordinating: <Atom size={20} weight="fill" />,
    building: <Target size={20} weight="fill" />
  }

  const modeLabels = {
    learning: 'Learning Mode',
    coordinating: 'Coordinating Mode', 
    building: 'Building Mode'
  }

  const connectionPercentage = particles.length > 0 
    ? Math.round((particles.filter(p => p.isConnecting).length / particles.length) * 100)
    : 0

  const systemHealth = useMemo(() => {
    if (healthMetrics.size === 0) return 100
    
    let totalScore = 0
    let count = 0
    
    healthMetrics.forEach((metrics) => {
      totalScore += metrics.score
      count++
    })
    
    return count > 0 ? Math.round(totalScore / count) : 100
  }, [healthMetrics])

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green'
    if (health >= 60) return 'text-yellow'
    if (health >= 40) return 'text-orange'
    return 'text-red'
  }

  const getHealthBgColor = (health: number) => {
    if (health >= 80) return 'from-green via-accent to-blue'
    if (health >= 60) return 'from-yellow via-orange to-accent'
    if (health >= 40) return 'from-orange via-red to-yellow'
    return 'from-red via-destructive to-orange'
  }

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600px] bg-gradient-to-br from-background via-card to-background rounded-xl overflow-hidden border border-primary/20 glow-border">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleCanvasClick}
        className="absolute inset-0 cursor-pointer"
      />

      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <Card className="p-3 bg-card/90 backdrop-blur-sm border-primary/30">
          <div className="text-sm font-mono text-muted-foreground mb-2">QUANTUM COCKPIT</div>
          <div className="text-2xl font-bold text-primary" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {particles.filter(p => p.isConnecting).length} / {particles.length}
          </div>
          <div className="text-xs text-muted-foreground mb-2">Systems Connected</div>
          
          <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent to-purple"
              initial={{ width: 0 }}
              animate={{ width: `${connectionPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-xs text-right text-primary mt-1 font-mono">{connectionPercentage}%</div>
          
          {repos.length > MAX_VISIBLE_PARTICLES && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="text-xs text-yellow font-mono">
                Viewing {MAX_VISIBLE_PARTICLES} of {repos.length} repos
              </div>
              <div className="text-xs text-muted-foreground font-mono mt-1">
                {lockedSlots.size > 0 ? `${lockedSlots.size} locked` : 'Auto-rotating'}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-3 bg-card/90 backdrop-blur-sm border-accent/30">
          <div className="text-xs font-mono text-muted-foreground mb-1">MODE</div>
          <div className="text-sm font-semibold text-accent flex items-center gap-2">
            {modeIcons[connectionMode]}
            {modeLabels[connectionMode]}
          </div>
        </Card>

        {healthMetrics.size > 0 && (
          <Card className="p-3 bg-card/90 backdrop-blur-sm border-green/30">
            <div className="text-xs font-mono text-muted-foreground mb-1">SYSTEM HEALTH</div>
            <div className={`text-2xl font-bold ${getHealthColor(systemHealth)}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {systemHealth}%
            </div>
            <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden mt-2">
              <motion.div
                className={`h-full bg-gradient-to-r ${getHealthBgColor(systemHealth)}`}
                initial={{ width: 0 }}
                animate={{ width: `${systemHealth}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </Card>
        )}

        <Card className="p-3 bg-card/90 backdrop-blur-sm border-orange/30">
          <div className="text-xs font-mono text-muted-foreground mb-1">COLLISIONS</div>
          <div className="text-2xl font-bold text-orange" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {collisionCount}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Physics Events</div>
        </Card>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsPaused(!isPaused)}
          className="gap-2 bg-card/90 backdrop-blur-sm border-primary/30 hover:bg-primary/10"
        >
          {isPaused ? <Play size={16} weight="fill" /> : <Pause size={16} weight="fill" />}
          {isPaused ? 'Resume' : 'Pause'}
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={cycleConnectionMode}
          className="gap-2 bg-card/90 backdrop-blur-sm border-accent/30 hover:bg-accent/10"
        >
          {modeIcons[connectionMode]}
          Cycle Mode
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setAutoConnect(!autoConnect)}
          className={`gap-2 bg-card/90 backdrop-blur-sm ${autoConnect ? 'border-green/50 text-green' : 'border-muted/30'}`}
        >
          <Atom size={16} weight={autoConnect ? 'fill' : 'regular'} />
          Auto Connect
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setScaffoldingVisible(!scaffoldingVisible)}
          className={`gap-2 bg-card/90 backdrop-blur-sm ${scaffoldingVisible ? 'border-blue/50 text-blue' : 'border-muted/30'}`}
        >
          <Target size={16} weight={scaffoldingVisible ? 'fill' : 'regular'} />
          Scaffolding
        </Button>

        <div className="border-t border-border/50 my-1" />

        {repos.length > MAX_VISIBLE_PARTICLES && (
          <>
            <Card className="p-3 bg-card/90 backdrop-blur-sm border-yellow/30">
              <div className="text-xs font-mono text-muted-foreground mb-2">ROTATION</div>
              <div className="flex items-center gap-2 mb-2">
                <ArrowsClockwise size={16} className="text-yellow" weight="bold" />
                <span className="text-sm font-semibold text-yellow">
                  {lockedSlots.size === MAX_VISIBLE_PARTICLES ? 'ALL LOCKED' : `${repos.length - MAX_VISIBLE_PARTICLES} QUEUED`}
                </span>
              </div>
              <Slider
                value={[rotationSpeed]}
                onValueChange={(values) => setRotationSpeed(values[0])}
                min={0.1}
                max={3}
                step={0.1}
                className="w-full"
                disabled={lockedSlots.size === MAX_VISIBLE_PARTICLES}
              />
              <div className="text-xs text-yellow mt-1 font-mono text-center">
                Speed: {rotationSpeed.toFixed(1)}x
              </div>
            </Card>

            <div className="border-t border-border/50 my-1" />
          </>
        )}

        <div className="space-y-1">
          <div className="text-xs font-mono text-muted-foreground mb-1 px-1">LOCK SLOTS</div>
          {[0, 1, 2, 3].map(slot => (
            <Button
              key={slot}
              size="sm"
              variant="outline"
              onClick={() => toggleLockSlot(slot)}
              className={`w-full gap-2 bg-card/90 backdrop-blur-sm ${
                lockedSlots.has(slot) 
                  ? 'border-gold/50 text-gold hover:bg-gold/10' 
                  : 'border-muted/30 hover:bg-muted/10'
              }`}
            >
              <Lock size={14} weight={lockedSlots.has(slot) ? 'fill' : 'regular'} />
              Slot {slot + 1}
              {particles[slot] && (
                <span className="ml-auto text-xs">{particles[slot].emoji}</span>
              )}
            </Button>
          ))}
        </div>

        <div className="border-t border-border/50 my-1" />

        <Button
          size="sm"
          variant="outline"
          onClick={() => setCollisionCount(0)}
          className="gap-2 bg-card/90 backdrop-blur-sm border-orange/30 hover:bg-orange/10 text-orange"
        >
          Reset Collisions
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`gap-2 bg-card/90 backdrop-blur-sm ${soundEnabled ? 'border-purple/50 text-purple' : 'border-muted/30'}`}
        >
          {soundEnabled ? <SpeakerHigh size={16} weight="fill" /> : <SpeakerSlash size={16} />}
          Sound
        </Button>

        {soundEnabled && (
          <Card className="p-3 bg-card/90 backdrop-blur-sm border-purple/30">
            <div className="text-xs font-mono text-muted-foreground mb-2">VOLUME</div>
            <Slider
              value={[soundVolume]}
              onValueChange={(values) => setSoundVolume(values[0])}
              min={0}
              max={0.5}
              step={0.01}
              className="w-full"
            />
            <div className="text-xs text-purple mt-1 font-mono text-center">
              {Math.round(soundVolume * 200)}%
            </div>
          </Card>
        )}
      </div>

      {selectedParticle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-primary/30">
            <div className="flex items-start gap-3">
              <div className="text-4xl">{selectedParticle.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground truncate">{selectedParticle.repo.name}</div>
                <div className="text-sm text-muted-foreground line-clamp-2">{selectedParticle.repo.description}</div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className={`text-xs px-2 py-1 rounded-full bg-${selectedParticle.color}/20 text-${selectedParticle.color}`}>
                    {selectedParticle.color}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted">
                    {selectedParticle.repo.category}
                  </span>
                  {selectedParticle.isConnecting && (
                    <span className="text-xs px-2 py-1 rounded-full bg-green/20 text-green">
                      ⚡ Connected
                    </span>
                  )}
                  {selectedParticle.repo.stargazers_count > 0 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow/20 text-yellow">
                      ⭐ {selectedParticle.repo.stargazers_count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground font-mono bg-card/80 backdrop-blur-sm p-2 rounded border border-border/50 max-w-xs">
        <div className="flex flex-col gap-1">
          <div className="text-yellow font-bold mb-1">🌌 QUANTUM SPACE VIEW</div>
          <div><span className="text-accent">⚡ Max 4 Dots:</span> Intelligent rotation prevents crashes</div>
          <div><span className="text-gold">🔒 Lock Slots:</span> Shift+Click or use sidebar to pin repos</div>
          <div><span className="text-blue">🎯 Scaffolding:</span> Shows slot positions & connections</div>
          <div className="border-t border-border/50 mt-1 pt-1">
            <span className="text-green">Click:</span> View repo details
          </div>
          <div>
            <span className="text-purple">🔊 Sound FX:</span> Unique sounds per emoji collision
          </div>
        </div>
      </div>
    </div>
  )
}
