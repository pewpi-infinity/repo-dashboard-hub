import { useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { CommitActivity } from '@/lib/types'
import { GitCommit } from '@phosphor-icons/react'

interface CommitActivityChartProps {
  activity: CommitActivity[]
  repoName: string
}

export function CommitActivityChart({ activity, repoName }: CommitActivityChartProps) {
  const chartData = useMemo(() => {
    if (!activity || activity.length === 0) return []
    
    return activity.slice(-12).map((week, index) => {
      const date = new Date(week.week * 1000)
      return {
        week: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        commits: week.total,
        date: date.getTime()
      }
    })
  }, [activity])

  const totalCommits = useMemo(() => {
    return chartData.reduce((sum, week) => sum + week.commits, 0)
  }, [chartData])

  if (chartData.length === 0) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur-sm glow-border">
        <div className="flex items-center gap-2 mb-4">
          <GitCommit className="text-primary" size={20} weight="duotone" />
          <h3 className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Commit Activity
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          No commit activity data available
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm glow-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <GitCommit className="text-primary" size={20} weight="duotone" />
          <h3 className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Commit Activity (Last 12 Weeks)
          </h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-accent" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {totalCommits}
          </div>
          <div className="text-xs text-muted-foreground">Total Commits</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.55 0.24 250)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="oklch(0.55 0.24 250)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.08 275 / 0.3)" />
          <XAxis 
            dataKey="week" 
            stroke="oklch(0.65 0.04 280)"
            style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}
            tick={{ fill: 'oklch(0.65 0.04 280)' }}
          />
          <YAxis 
            stroke="oklch(0.65 0.04 280)"
            style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}
            tick={{ fill: 'oklch(0.65 0.04 280)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'oklch(0.16 0.05 278)',
              border: '1px solid oklch(0.28 0.08 275)',
              borderRadius: '8px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px'
            }}
            labelStyle={{ color: 'oklch(0.92 0.02 280)' }}
            itemStyle={{ color: 'oklch(0.55 0.24 250)' }}
          />
          <Area
            type="monotone"
            dataKey="commits"
            stroke="oklch(0.55 0.24 250)"
            strokeWidth={2}
            fill="url(#commitGradient)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
