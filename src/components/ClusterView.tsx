import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CategorizedRepo } from '@/lib/types'
import { getEmojiForRepo } from '@/lib/emoji-legend'
import { HealthMetrics } from '@/lib/health-monitor'
import {
  createClusters,
  calculateClusterPositions,
  calculateRepoPositionsInCluster,
  findClusterConnections,
  getClusterStats,
  Cluster,
  ClusterFormation
} from '@/lib/cluster-system'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import {
  Atom,
  Circle,
  Graph,
  Lightning,
  GitBranch,
  Stack,
  Target,
  Sparkle
} from '@phosphor-icons/react'

interface ClusterViewProps {
  repos: CategorizedRepo[]
  healthMetrics: Map<string, HealthMetrics>
  onRepoClick?: (repo: CategorizedRepo) => void
}

export function ClusterView({ repos, healthMetrics, onRepoClick }: ClusterViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [clusters, setClusters] = useState<Cluster[]>([])
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null)
  const [selectedRepo, setSelectedRepo] = useState<CategorizedRepo | null>(null)
  const [clusterFormation, setClusterFormation] = useState<ClusterFormation>('category')
  const [isPaused, setIsPaused] = useState(false)
  const [showConnections, setShowConnections] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [animationTime, setAnimationTime] = useState(0)

  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || repos.length === 0) return

    const newClusters = createClusters(repos, clusterFormation)
    const positionedClusters = calculateClusterPositions(
      newClusters,
      dimensions.width,
      dimensions.height,
      centerX,
      centerY
    )
    setClusters(positionedClusters)
  }, [repos, dimensions, centerX, centerY, clusterFormation])

  const clusterConnections = useMemo(() => {
    return findClusterConnections(clusters)
  }, [clusters])

  useEffect(() => {
    if (isPaused || clusters.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const deltaTime = (now - lastTime) / 1000
      lastTime = now

      setAnimationTime(prev => prev + deltaTime * 1000)

      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      drawBackground(ctx)
      
      if (showConnections) {
        drawClusterConnections(ctx, now)
      }
      
      drawClusters(ctx, now)
      
      drawRepos(ctx, now)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [clusters, isPaused, dimensions, showConnections, showLabels])

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.save()
    
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, Math.max(dimensions.width, dimensions.height) / 2
    )
    gradient.addColorStop(0, 'rgba(96, 119, 255, 0.05)')
    gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.03)')
    gradient.addColorStop(1, 'rgba(255, 100, 220, 0.01)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, dimensions.width, dimensions.height)

    ctx.strokeStyle = 'rgba(96, 119, 255, 0.08)'
    ctx.lineWidth = 1
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, Math.min(dimensions.width, dimensions.height) * 0.15 * i, 0, Math.PI * 2)
      ctx.stroke()
    }

    ctx.restore()
  }

  const drawClusterConnections = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.save()

    clusterConnections.forEach(connection => {
      const fromCluster = clusters.find(c => c.id === connection.from)
      const toCluster = clusters.find(c => c.id === connection.to)
      
      if (!fromCluster || !toCluster) return

      const gradient = ctx.createLinearGradient(
        fromCluster.position.x,
        fromCluster.position.y,
        toCluster.position.x,
        toCluster.position.y
      )
      
      const opacity = connection.strength * 0.5
      gradient.addColorStop(0, `rgba(${connection.color}, ${opacity})`)
      gradient.addColorStop(0.5, `rgba(${connection.color}, ${opacity * 1.2})`)
      gradient.addColorStop(1, `rgba(${connection.color}, ${opacity})`)

      ctx.strokeStyle = gradient
      ctx.lineWidth = 2 + connection.strength * 3
      ctx.setLineDash([5, 5])
      ctx.lineDashOffset = -(time * connection.pulseSpeed * 0.05)
      
      ctx.beginPath()
      ctx.moveTo(fromCluster.position.x, fromCluster.position.y)
      ctx.lineTo(toCluster.position.x, toCluster.position.y)
      ctx.stroke()

      ctx.setLineDash([])

      const midX = (fromCluster.position.x + toCluster.position.x) / 2
      const midY = (fromCluster.position.y + toCluster.position.y) / 2
      const pulsePhase = (time * connection.dataFlow * 0.003) % 1
      const pulseX = fromCluster.position.x + (toCluster.position.x - fromCluster.position.x) * pulsePhase
      const pulseY = fromCluster.position.y + (toCluster.position.y - fromCluster.position.y) * pulsePhase

      ctx.fillStyle = `rgba(${connection.color}, ${connection.strength * 0.8})`
      ctx.beginPath()
      ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2)
      ctx.fill()

      const glowGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 12)
      glowGradient.addColorStop(0, `rgba(${connection.color}, ${connection.strength * 0.4})`)
      glowGradient.addColorStop(1, `rgba(${connection.color}, 0)`)
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(pulseX, pulseY, 12, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.restore()
  }

  const drawClusters = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.save()

    clusters.forEach(cluster => {
      const isSelected = selectedCluster?.id === cluster.id
      const stats = getClusterStats(cluster)
      
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
      
      const rgb = colorMap[cluster.color] || '96, 119, 255'

      const pulseScale = 1 + Math.sin(time * 0.002) * 0.05
      const radius = cluster.radius * pulseScale

      const outerGlow = ctx.createRadialGradient(
        cluster.position.x,
        cluster.position.y,
        0,
        cluster.position.x,
        cluster.position.y,
        radius * 1.8
      )
      outerGlow.addColorStop(0, `rgba(${rgb}, 0.1)`)
      outerGlow.addColorStop(0.5, `rgba(${rgb}, 0.05)`)
      outerGlow.addColorStop(1, `rgba(${rgb}, 0)`)
      
      ctx.fillStyle = outerGlow
      ctx.beginPath()
      ctx.arc(cluster.position.x, cluster.position.y, radius * 1.8, 0, Math.PI * 2)
      ctx.fill()

      const innerGlow = ctx.createRadialGradient(
        cluster.position.x,
        cluster.position.y,
        0,
        cluster.position.x,
        cluster.position.y,
        radius
      )
      innerGlow.addColorStop(0, `rgba(${rgb}, 0.15)`)
      innerGlow.addColorStop(0.7, `rgba(${rgb}, 0.08)`)
      innerGlow.addColorStop(1, `rgba(${rgb}, 0.02)`)
      
      ctx.fillStyle = innerGlow
      ctx.beginPath()
      ctx.arc(cluster.position.x, cluster.position.y, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = isSelected 
        ? `rgba(${rgb}, 0.8)` 
        : `rgba(${rgb}, 0.4)`
      ctx.lineWidth = isSelected ? 3 : 2
      ctx.setLineDash(isSelected ? [] : [5, 5])
      ctx.beginPath()
      ctx.arc(cluster.position.x, cluster.position.y, radius * 0.95, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + time * cluster.rotationSpeed * 0.0005
        const innerRadius = radius * 0.8
        const outerRadius = radius * 0.93
        const x1 = cluster.position.x + Math.cos(angle) * innerRadius
        const y1 = cluster.position.y + Math.sin(angle) * innerRadius
        const x2 = cluster.position.x + Math.cos(angle) * outerRadius
        const y2 = cluster.position.y + Math.sin(angle) * outerRadius

        ctx.strokeStyle = `rgba(${rgb}, 0.3)`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      ctx.font = `${cluster.radius * 0.4}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.fillText(cluster.emoji, cluster.position.x, cluster.position.y)

      if (showLabels) {
        ctx.font = 'bold 14px "Space Grotesk", sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
        ctx.fillText(
          cluster.name,
          cluster.position.x + 1,
          cluster.position.y + radius + 11
        )
        
        ctx.fillStyle = `rgba(${rgb}, 1)`
        ctx.fillText(
          cluster.name,
          cluster.position.x,
          cluster.position.y + radius + 10
        )

        ctx.font = '11px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.fillText(
          `${stats.repoCount} repos • ${stats.totalStars} ⭐`,
          cluster.position.x,
          cluster.position.y + radius + 28
        )
      }
    })

    ctx.restore()
  }

  const drawRepos = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.save()

    clusters.forEach(cluster => {
      const positions = calculateRepoPositionsInCluster(cluster, time)
      
      positions.forEach(pos => {
        const repo = cluster.repos.find(r => r.name === pos.id)
        if (!repo) return

        const emojiData = getEmojiForRepo(repo.name)
        const emoji = emojiData?.emoji || '⚡'
        const color = emojiData?.color || 'blue'
        
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
        
        const rgb = colorMap[color] || '96, 119, 255'

        const isSelected = selectedRepo?.id === repo.id
        const size = isSelected ? 32 : 24
        const pulseScale = 1 + Math.sin(time * 0.003 + pos.angle) * 0.1

        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size * 2)
        glow.addColorStop(0, `rgba(${rgb}, 0.3)`)
        glow.addColorStop(0.5, `rgba(${rgb}, 0.1)`)
        glow.addColorStop(1, `rgba(${rgb}, 0)`)
        
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, size * 2 * pulseScale, 0, Math.PI * 2)
        ctx.fill()

        ctx.save()
        ctx.translate(pos.x, pos.y)
        
        if (isSelected) {
          ctx.strokeStyle = `rgba(${rgb}, 0.8)`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2)
          ctx.stroke()
        }

        ctx.font = `${size}px Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(emoji, 0, 0)

        ctx.restore()
      })
    })

    ctx.restore()
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    let clickedSomething = false

    for (const cluster of clusters) {
      const positions = calculateRepoPositionsInCluster(cluster, animationTime)
      
      for (const pos of positions) {
        const repo = cluster.repos.find(r => r.name === pos.id)
        if (!repo) continue

        const dx = x - pos.x
        const dy = y - pos.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 24) {
          setSelectedRepo(repo)
          setSelectedCluster(cluster)
          onRepoClick?.(repo)
          clickedSomething = true
          return
        }
      }
    }

    for (const cluster of clusters) {
      const dx = x - cluster.position.x
      const dy = y - cluster.position.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < cluster.radius) {
        setSelectedCluster(cluster)
        setSelectedRepo(null)
        clickedSomething = true
        return
      }
    }

    if (!clickedSomething) {
      setSelectedCluster(null)
      setSelectedRepo(null)
    }
  }

  const formationOptions: Array<{ value: ClusterFormation; label: string; icon: any }> = [
    { value: 'category', label: 'Category', icon: Stack },
    { value: 'language', label: 'Language', icon: GitBranch },
    { value: 'activity', label: 'Activity', icon: Lightning },
    { value: 'custom', label: 'Custom', icon: Target },
    { value: 'auto', label: 'Auto', icon: Sparkle }
  ]

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600px] bg-gradient-to-br from-background via-card to-background rounded-xl overflow-hidden border border-purple/20 glow-border">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleCanvasClick}
        className="absolute inset-0 cursor-pointer"
      />

      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <Card className="p-3 bg-card/90 backdrop-blur-sm border-purple/30">
          <div className="text-sm font-mono text-muted-foreground mb-2">CLUSTER VIEW</div>
          <div className="text-2xl font-bold text-purple" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {clusters.length}
          </div>
          <div className="text-xs text-muted-foreground">Active Clusters</div>
        </Card>

        <Card className="p-3 bg-card/90 backdrop-blur-sm border-accent/30">
          <div className="text-xs font-mono text-muted-foreground mb-2">FORMATION</div>
          <div className="text-sm font-semibold text-accent">
            {formationOptions.find(f => f.value === clusterFormation)?.label}
          </div>
        </Card>

        {selectedCluster && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-3 bg-card/90 backdrop-blur-sm border-primary/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{selectedCluster.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{selectedCluster.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {selectedCluster.repos.length} repos
                  </div>
                </div>
              </div>
              {(() => {
                const stats = getClusterStats(selectedCluster)
                return (
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stars:</span>
                      <span className="text-yellow">{stats.totalStars} ⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Languages:</span>
                      <span className="text-accent">{stats.languages.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={stats.isActive ? 'default' : 'secondary'} className="h-4 text-xs">
                        {stats.isActive ? '🟢 Active' : '⚪ Stable'}
                      </Badge>
                    </div>
                  </div>
                )
              })()}
            </Card>
          </motion.div>
        )}
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="space-y-1">
          <div className="text-xs font-mono text-muted-foreground mb-1 px-1 text-right">FORMATION</div>
          {formationOptions.map(option => {
            const Icon = option.icon
            return (
              <Button
                key={option.value}
                size="sm"
                variant="outline"
                onClick={() => setClusterFormation(option.value)}
                className={`w-full gap-2 bg-card/90 backdrop-blur-sm ${
                  clusterFormation === option.value
                    ? 'border-purple/50 text-purple hover:bg-purple/10'
                    : 'border-muted/30 hover:bg-muted/10'
                }`}
              >
                <Icon size={14} weight={clusterFormation === option.value ? 'fill' : 'regular'} />
                {option.label}
              </Button>
            )
          })}
        </div>

        <div className="border-t border-border/50 my-1" />

        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowConnections(!showConnections)}
          className={`gap-2 bg-card/90 backdrop-blur-sm ${
            showConnections 
              ? 'border-accent/50 text-accent hover:bg-accent/10' 
              : 'border-muted/30 hover:bg-muted/10'
          }`}
        >
          <Graph size={14} weight={showConnections ? 'fill' : 'regular'} />
          Connections
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowLabels(!showLabels)}
          className={`gap-2 bg-card/90 backdrop-blur-sm ${
            showLabels 
              ? 'border-blue/50 text-blue hover:bg-blue/10' 
              : 'border-muted/30 hover:bg-muted/10'
          }`}
        >
          <Circle size={14} weight={showLabels ? 'fill' : 'regular'} />
          Labels
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsPaused(!isPaused)}
          className={`gap-2 bg-card/90 backdrop-blur-sm border-primary/30 hover:bg-primary/10`}
        >
          <Atom size={14} weight={isPaused ? 'regular' : 'fill'} />
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
      </div>

      {selectedRepo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-primary/30">
            <div className="flex items-start gap-3">
              <div className="text-4xl">{getEmojiForRepo(selectedRepo.name)?.emoji || '⚡'}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground truncate">{selectedRepo.name}</div>
                <div className="text-sm text-muted-foreground line-clamp-2">{selectedRepo.description}</div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {selectedCluster && (
                    <Badge variant="outline" className="gap-1">
                      {selectedCluster.emoji} {selectedCluster.name}
                    </Badge>
                  )}
                  {selectedRepo.language && (
                    <Badge variant="secondary">
                      {selectedRepo.language}
                    </Badge>
                  )}
                  {selectedRepo.stargazers_count > 0 && (
                    <Badge variant="outline" className="text-yellow border-yellow/30">
                      ⭐ {selectedRepo.stargazers_count}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground font-mono bg-card/80 backdrop-blur-sm p-2 rounded border border-border/50 max-w-xs">
        <div className="flex flex-col gap-1">
          <div className="text-purple font-bold mb-1">🎯 CLUSTER GROUPING</div>
          <div><span className="text-accent">⚡ Click Repos:</span> View details</div>
          <div><span className="text-gold">🎯 Click Clusters:</span> Select group</div>
          <div><span className="text-green">🔗 Connections:</span> Shared topics & languages</div>
        </div>
      </div>
    </div>
  )
}
