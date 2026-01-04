import { Card, CardContent } from './ui/card'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'
import { WifiSlash, WifiHigh, ArrowClockwise, CloudArrowDown } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

interface OfflineBannerProps {
  isOnline: boolean
  wasOffline: boolean
  onRetry?: () => void
  cachedDataCount?: number
}

export function OfflineBanner({ isOnline, wasOffline, onRetry, cachedDataCount = 0 }: OfflineBannerProps) {
  if (isOnline && !wasOffline) return null

  return (
    <AnimatePresence>
      {!isOnline ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
          <Alert className="border-orange bg-gradient-to-r from-orange/10 to-yellow/10 glow-border">
            <div className="flex items-start gap-3">
              <WifiSlash size={24} className="text-orange mt-0.5 flex-shrink-0" weight="fill" />
              <div className="flex-1 min-w-0">
                <AlertTitle className="text-orange font-bold mb-2 flex items-center gap-2">
                  <span className="text-xl">⚠️</span>
                  Offline Mode Active
                </AlertTitle>
                <AlertDescription className="text-foreground/90 space-y-2">
                  <p className="text-sm">
                    You're currently offline. The quantum system is running in degraded mode with limited functionality.
                  </p>
                  {cachedDataCount > 0 && (
                    <p className="text-xs text-muted-foreground">
                      <CloudArrowDown size={14} className="inline mr-1" weight="fill" />
                      {cachedDataCount} machine{cachedDataCount !== 1 ? 's' : ''} cached locally
                    </p>
                  )}
                  {onRetry && (
                    <Button
                      onClick={onRetry}
                      size="sm"
                      variant="outline"
                      className="mt-2 gap-2 border-orange text-orange hover:bg-orange/10"
                    >
                      <ArrowClockwise size={16} />
                      Retry Connection
                    </Button>
                  )}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </motion.div>
      ) : wasOffline ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
          <Alert className="border-green bg-gradient-to-r from-green/10 to-accent/10 glow-border-accent">
            <div className="flex items-start gap-3">
              <WifiHigh size={24} className="text-green mt-0.5 flex-shrink-0" weight="fill" />
              <div className="flex-1 min-w-0">
                <AlertTitle className="text-green font-bold mb-1 flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  Back Online
                </AlertTitle>
                <AlertDescription className="text-foreground/90">
                  <p className="text-sm">
                    Connection restored. All quantum systems are operational.
                  </p>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
