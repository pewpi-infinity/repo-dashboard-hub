import { WifiSlash, CloudArrowDown } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface OfflineIndicatorProps {
  compact?: boolean
}

export function OfflineIndicator({ compact = false }: OfflineIndicatorProps) {
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-orange/20 border border-orange/50 text-orange text-xs"
      >
        <WifiSlash size={14} weight="fill" className="animate-pulse" />
        <span className="font-mono font-bold">OFFLINE</span>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-orange/10 to-yellow/10 border border-orange/30"
    >
      <WifiSlash size={20} weight="fill" className="text-orange animate-pulse" />
      <div className="flex flex-col">
        <span className="text-xs font-mono font-bold text-orange">OFFLINE MODE</span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <CloudArrowDown size={12} weight="fill" />
          Using cached data
        </span>
      </div>
    </motion.div>
  )
}
