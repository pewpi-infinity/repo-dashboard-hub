import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CategorizedRepo } from '@/lib/types'
import { getEmojiForRepo, getColorClass, getGlowClass } from '@/lib/emoji-legend'
import { HealthMetrics } from '@/lib/health-monitor'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Play, Pause, Sparkle, Atom, Target } from '@phosphor-icons/react'

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

  const brainRepo = useMemo(() => repos.find(r => r.name.toLowerCase().includes('mongoose')), [repos])

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

    const newParticles: Particle[] = repos.map((repo, index) => {
      const emojiData = getEmojiForRepo(repo.name)
      const angle = (index / repos.length) * Math.PI * 2
      const distance = Math.min(dimensions.width, dimensions.height) * 0.35
      
      const startX = dimensions.width / 2 + Math.cos(angle) * distance
      const startY = dimensions.height / 2 + Math.sin(angle) * distance
      
      const isBrain = repo.name.toLowerCase().includes('mongoose')
      
      return {
        id: repo.name,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        emoji: emojiData?.emoji || '⚡',
        color: emojiData?.color || 'blue',
        size: isBrain ? 48 : 32,
        repo,
        isConnecting: false,
        opacity: 1,
        rotation: Math.random() * 360,
        pulse: Math.random() * Math.PI * 2
      }
    })

    setParticles(newParticles)
  }, [repos, dimensions])

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
      
      const updatedParticles = particles.map(particle => {
        let newX = particle.x
        let newY = particle.y
        let newVx = particle.vx
        let newVy = particle.vy
        let isConnecting = particle.isConnecting

        if (autoConnect && connectionMode === 'learning') {
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
        } else if (connectionMode === 'coordinating') {
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
        } else if (connectionMode === 'building') {
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
          pulse: particle.pulse + deltaTime * 2
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
      ctx.translate(particle.x, particle.y)

      const pulseScale = 1 + Math.sin(particle.pulse) * 0.1

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

      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * pulseScale)
      glowGradient.addColorStop(0, `rgba(${rgb}, 0.3)`)
      glowGradient.addColorStop(0.5, `rgba(${rgb}, 0.15)`)
      glowGradient.addColorStop(1, `rgba(${rgb}, 0)`)

      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(0, 0, particle.size * pulseScale, 0, Math.PI * 2)
      ctx.fill()

      ctx.font = `${particle.size}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(particle.emoji, 0, 0)

      if (particle.isConnecting) {
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
      setSelectedParticle(clickedParticle)
      onRepoClick?.(clickedParticle.repo)
    }
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

      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground font-mono bg-card/80 backdrop-blur-sm p-2 rounded border border-border/50">
        <div className="flex flex-col gap-1">
          <div><span className="text-accent">Learning:</span> Particles attracted to center</div>
          <div><span className="text-accent">Coordinating:</span> Particles connect with each other</div>
          <div><span className="text-accent">Building:</span> Particles orbit the center</div>
        </div>
      </div>
    </div>
  )
}
