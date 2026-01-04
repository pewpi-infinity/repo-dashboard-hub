import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { ArrowsClockwise, Warning, CheckCircle, XCircle, GitMerge, CloudArrowDown } from '@phosphor-icons/react'
import type { SyncConflict } from '@/lib/sync-resolver'

interface SyncConflictDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  conflicts: SyncConflict[]
  onResolve: (strategy: 'server' | 'merge') => void
  isResolving?: boolean
}

export function SyncConflictDialog({
  open,
  onOpenChange,
  conflicts,
  onResolve,
  isResolving = false
}: SyncConflictDialogProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<'server' | 'merge'>('server')

  const conflictsByType = {
    added: conflicts.filter(c => c.conflictType === 'added'),
    deleted: conflicts.filter(c => c.conflictType === 'deleted'),
    modified: conflicts.filter(c => c.conflictType === 'modified')
  }

  const handleResolve = () => {
    onResolve(selectedStrategy)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ArrowsClockwise className="text-accent" size={24} weight="bold" />
            Sync Conflict Resolution
          </DialogTitle>
          <DialogDescription>
            {conflicts.length} conflict{conflicts.length !== 1 ? 's' : ''} detected between cached and server data
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <Alert className="border-accent/30 bg-accent/5">
              <Warning className="text-accent" size={20} />
              <AlertDescription className="ml-2">
                Your cached data differs from the server. Choose how to resolve these conflicts.
              </AlertDescription>
            </Alert>

            {conflictsByType.added.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2 text-green">
                  <CheckCircle size={18} weight="fill" />
                  New Machines ({conflictsByType.added.length})
                </h3>
                <div className="space-y-1 pl-6">
                  {conflictsByType.added.map(conflict => (
                    <div key={conflict.repoId} className="text-sm text-muted-foreground">
                      • {conflict.repoName}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {conflictsByType.deleted.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2 text-red">
                  <XCircle size={18} weight="fill" />
                  Removed Machines ({conflictsByType.deleted.length})
                </h3>
                <div className="space-y-1 pl-6">
                  {conflictsByType.deleted.map(conflict => (
                    <div key={conflict.repoId} className="text-sm text-muted-foreground">
                      • {conflict.repoName}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {conflictsByType.modified.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2 text-yellow">
                  <Warning size={18} weight="fill" />
                  Modified Machines ({conflictsByType.modified.length})
                </h3>
                <div className="space-y-2 pl-6">
                  {conflictsByType.modified.map(conflict => (
                    <div key={conflict.repoId} className="space-y-1">
                      <div className="text-sm font-medium">{conflict.repoName}</div>
                      <div className="flex gap-2 text-xs">
                        <Badge variant="outline" className="gap-1">
                          <span>Cached:</span>
                          <span className="text-muted-foreground">
                            {conflict.cachedVersion ? new Date(conflict.cachedVersion.updated_at).toLocaleDateString() : 'N/A'}
                          </span>
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <span>Server:</span>
                          <span className="text-muted-foreground">
                            {conflict.serverVersion ? new Date(conflict.serverVersion.updated_at).toLocaleDateString() : 'N/A'}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-semibold">Resolution Strategy</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedStrategy('server')}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedStrategy === 'server'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CloudArrowDown 
                      size={24} 
                      weight={selectedStrategy === 'server' ? 'fill' : 'regular'}
                      className={selectedStrategy === 'server' ? 'text-primary' : 'text-muted-foreground'}
                    />
                    <div className="flex-1">
                      <div className="font-medium mb-1">Use Server Data (Recommended)</div>
                      <div className="text-sm text-muted-foreground">
                        Accept all changes from the server. Your cached data will be updated to match.
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedStrategy('merge')}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedStrategy === 'merge'
                      ? 'border-accent bg-accent/10'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <GitMerge 
                      size={24} 
                      weight={selectedStrategy === 'merge' ? 'fill' : 'regular'}
                      className={selectedStrategy === 'merge' ? 'text-accent' : 'text-muted-foreground'}
                    />
                    <div className="flex-1">
                      <div className="font-medium mb-1">Smart Merge</div>
                      <div className="text-sm text-muted-foreground">
                        Intelligently combine cached and server data, keeping the most recent updates and highest stats.
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isResolving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleResolve}
            disabled={isResolving}
            className="gap-2"
          >
            {isResolving ? (
              <>
                <ArrowsClockwise className="animate-spin" size={16} />
                Resolving...
              </>
            ) : (
              <>
                <CheckCircle size={16} weight="fill" />
                Resolve Conflicts
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
