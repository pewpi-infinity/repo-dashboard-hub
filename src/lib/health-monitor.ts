import type { CategorizedRepo, CommitActivity } from './types'

export type HealthStatus = 'healthy' | 'warning' | 'critical' | 'inactive'
export type AlertSeverity = 'info' | 'warning' | 'critical'

export interface HealthMetrics {
  status: HealthStatus
  score: number
  indicators: {
    commitFrequency: number
    issueRatio: number
    staleness: number
    activityTrend: number
  }
  alerts: HealthAlert[]
}

export interface HealthAlert {
  id: string
  severity: AlertSeverity
  title: string
  message: string
  timestamp: number
  repoName: string
  metric?: string
}

export function calculateHealthMetrics(repo: CategorizedRepo, commitActivity?: CommitActivity[]): HealthMetrics {
  const now = Date.now()
  const lastUpdate = new Date(repo.updated_at).getTime()
  const daysSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60 * 24)
  
  const indicators = {
    commitFrequency: calculateCommitFrequency(commitActivity),
    issueRatio: calculateIssueRatio(repo),
    staleness: calculateStaleness(daysSinceUpdate),
    activityTrend: calculateActivityTrend(commitActivity)
  }
  
  const score = calculateHealthScore(indicators)
  const status = determineHealthStatus(score, indicators)
  const alerts = generateAlerts(repo, indicators, daysSinceUpdate)
  
  return {
    status,
    score,
    indicators,
    alerts
  }
}

function calculateCommitFrequency(commitActivity?: CommitActivity[]): number {
  if (!commitActivity || commitActivity.length === 0) return 0
  
  const recentWeeks = commitActivity.slice(-4)
  const totalCommits = recentWeeks.reduce((sum, week) => sum + week.total, 0)
  const avgPerWeek = totalCommits / 4
  
  if (avgPerWeek >= 10) return 100
  if (avgPerWeek >= 5) return 80
  if (avgPerWeek >= 2) return 60
  if (avgPerWeek >= 1) return 40
  return 20
}

function calculateIssueRatio(repo: CategorizedRepo): number {
  const issues = repo.open_issues_count || 0
  const stars = repo.stargazers_count || 1
  const ratio = issues / stars
  
  if (ratio === 0) return 100
  if (ratio < 0.1) return 90
  if (ratio < 0.2) return 70
  if (ratio < 0.5) return 50
  return 30
}

function calculateStaleness(daysSinceUpdate: number): number {
  if (daysSinceUpdate < 7) return 100
  if (daysSinceUpdate < 14) return 90
  if (daysSinceUpdate < 30) return 70
  if (daysSinceUpdate < 60) return 50
  if (daysSinceUpdate < 90) return 30
  return 10
}

function calculateActivityTrend(commitActivity?: CommitActivity[]): number {
  if (!commitActivity || commitActivity.length < 8) return 50
  
  const recentHalf = commitActivity.slice(-4)
  const olderHalf = commitActivity.slice(-8, -4)
  
  const recentTotal = recentHalf.reduce((sum, week) => sum + week.total, 0)
  const olderTotal = olderHalf.reduce((sum, week) => sum + week.total, 0)
  
  if (olderTotal === 0 && recentTotal > 0) return 100
  if (olderTotal === 0) return 50
  
  const trend = (recentTotal / olderTotal) - 1
  
  if (trend >= 0.5) return 100
  if (trend >= 0.2) return 90
  if (trend >= 0) return 70
  if (trend >= -0.2) return 50
  if (trend >= -0.5) return 30
  return 20
}

function calculateHealthScore(indicators: HealthMetrics['indicators']): number {
  const weights = {
    commitFrequency: 0.35,
    issueRatio: 0.20,
    staleness: 0.30,
    activityTrend: 0.15
  }
  
  return Math.round(
    indicators.commitFrequency * weights.commitFrequency +
    indicators.issueRatio * weights.issueRatio +
    indicators.staleness * weights.staleness +
    indicators.activityTrend * weights.activityTrend
  )
}

function determineHealthStatus(score: number, indicators: HealthMetrics['indicators']): HealthStatus {
  if (indicators.staleness < 20) return 'inactive'
  if (score >= 80) return 'healthy'
  if (score >= 60) return 'warning'
  return 'critical'
}

function generateAlerts(
  repo: CategorizedRepo, 
  indicators: HealthMetrics['indicators'],
  daysSinceUpdate: number
): HealthAlert[] {
  const alerts: HealthAlert[] = []
  const now = Date.now()
  
  if (daysSinceUpdate > 90) {
    alerts.push({
      id: `${repo.id}-stale`,
      severity: 'critical',
      title: 'Repository Inactive',
      message: `No updates in ${Math.round(daysSinceUpdate)} days`,
      timestamp: now,
      repoName: repo.name,
      metric: 'staleness'
    })
  } else if (daysSinceUpdate > 30) {
    alerts.push({
      id: `${repo.id}-stale-warning`,
      severity: 'warning',
      title: 'Low Update Frequency',
      message: `Last updated ${Math.round(daysSinceUpdate)} days ago`,
      timestamp: now,
      repoName: repo.name,
      metric: 'staleness'
    })
  }
  
  const issueRatio = (repo.open_issues_count || 0) / (repo.stargazers_count || 1)
  if (issueRatio > 0.5 && repo.open_issues_count! > 5) {
    alerts.push({
      id: `${repo.id}-issues`,
      severity: 'warning',
      title: 'High Issue Count',
      message: `${repo.open_issues_count} open issues requiring attention`,
      timestamp: now,
      repoName: repo.name,
      metric: 'issueRatio'
    })
  }
  
  if (indicators.commitFrequency < 30 && daysSinceUpdate < 60) {
    alerts.push({
      id: `${repo.id}-commits`,
      severity: 'info',
      title: 'Low Commit Activity',
      message: 'Fewer than 1 commit per week on average',
      timestamp: now,
      repoName: repo.name,
      metric: 'commitFrequency'
    })
  }
  
  if (indicators.activityTrend < 40) {
    alerts.push({
      id: `${repo.id}-trend`,
      severity: 'warning',
      title: 'Declining Activity',
      message: 'Commit activity is decreasing compared to previous period',
      timestamp: now,
      repoName: repo.name,
      metric: 'activityTrend'
    })
  }
  
  return alerts
}

export function getHealthColor(status: HealthStatus): string {
  switch (status) {
    case 'healthy':
      return 'oklch(0.75 0.18 150)'
    case 'warning':
      return 'oklch(0.75 0.18 60)'
    case 'critical':
      return 'oklch(0.65 0.22 25)'
    case 'inactive':
      return 'oklch(0.45 0.04 280)'
  }
}

export function getHealthLabel(status: HealthStatus): string {
  switch (status) {
    case 'healthy':
      return 'Healthy'
    case 'warning':
      return 'Needs Attention'
    case 'critical':
      return 'Critical'
    case 'inactive':
      return 'Inactive'
  }
}

export function getSeverityColor(severity: AlertSeverity): string {
  switch (severity) {
    case 'info':
      return 'oklch(0.55 0.24 250)'
    case 'warning':
      return 'oklch(0.75 0.18 60)'
    case 'critical':
      return 'oklch(0.65 0.22 25)'
  }
}
