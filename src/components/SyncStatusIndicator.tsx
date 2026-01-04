import { ArrowsClockwise, CheckCircle, Warning } from '@phosphor-icons/react'
import { Badge } from './ui/badge'

interface SyncStatusIndicatorProps {
  isSyncing?: boolean
  hasConflicts?: boolean
  conflictCount?: number
  compact?: boolean
}

export function SyncStatusIndicator({
  isSyncing = false,
  hasConflicts = false,
  conflictCount = 0,
  compact = false
}: SyncStatusIndicatorProps) {
  if (isSyncing) {
    return (
      <Badge variant="outline" className="gap-1.5 border-accent/50 bg-accent/10 text-accent animate-pulse">
        <ArrowsClockwise className="animate-spin" size={12} />
        {!compact && <span className="text-xs">Syncing...</span>}
      </Badge>
    )
  }

  if (hasConflicts && conflictCount > 0) {
    return (
      <Badge variant="outline" className="gap-1.5 border-yellow/50 bg-yellow/10 text-yellow">
        <Warning size={12} weight="fill" />
        {!compact && (
          <span className="text-xs">
            {conflictCount} conflict{conflictCount !== 1 ? 's' : ''}
          </span>
        )}
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="gap-1.5 border-green/50 bg-green/10 text-green">
      <CheckCircle size={12} weight="fill" />
      {!compact && <span className="text-xs">Synced</span>}
    </Badge>
  )
}
