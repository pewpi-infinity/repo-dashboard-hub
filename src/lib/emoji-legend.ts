export interface EmojiLegend {
  emoji: string
  color: string
  meaning: string
  category?: string
}

export const repoEmojiMap: Record<string, EmojiLegend> = {
  'legend-core': { 
    emoji: '👑🧱🇯🇵', 
    color: 'gold',
    meaning: 'Read-only Authority Core',
    category: 'brain'
  },
  'legend-🦾-robot-core': { 
    emoji: '🦾', 
    color: 'blue',
    meaning: 'Robot Core System',
    category: 'quantum'
  },
  'legend-🪐-memory': { 
    emoji: '🪐', 
    color: 'purple',
    meaning: 'Memory System',
    category: 'quantum'
  },
  'legend-⭐-runtime': { 
    emoji: '⭐', 
    color: 'yellow',
    meaning: 'Runtime Engine',
    category: 'quantum'
  },
  'legend-🕹️-mario-exit': { 
    emoji: '🕹️', 
    color: 'red',
    meaning: 'Mario Exit Controller',
    category: 'os'
  },
  'legend-🧱-encode': { 
    emoji: '🧱', 
    color: 'orange',
    meaning: 'Encoder',
    category: 'other'
  },
  'legend-👁️-token-viewer': { 
    emoji: '👁️‍🗨️', 
    color: 'blue',
    meaning: 'Token Viewer',
    category: 'other'
  },
  'legend-🎵-sync': { 
    emoji: '🎵', 
    color: 'pink',
    meaning: 'Synchronization System',
    category: 'time'
  },
  'legend-🪡-assembler': { 
    emoji: '🪡', 
    color: 'green',
    meaning: 'Assembler',
    category: 'other'
  },
  'legend-🔀-flow': { 
    emoji: '🔀', 
    color: 'blue',
    meaning: 'Flow Controller',
    category: 'time'
  },
  'legend-🔗-semantic': { 
    emoji: '🔗', 
    color: 'purple',
    meaning: 'Semantic Processor',
    category: 'other'
  },
  'legend-🍄-auditor': { 
    emoji: '🍄', 
    color: 'red',
    meaning: 'Auditor',
    category: 'other'
  },
  'legend-🎛️-modulator': { 
    emoji: '🎛️', 
    color: 'orange',
    meaning: 'Modulator',
    category: 'quantum'
  },
  'legend-💫-star': { 
    emoji: '💫', 
    color: 'yellow',
    meaning: 'Star System',
    category: 'quantum'
  },
  'legend-✨-multistar': { 
    emoji: '✨', 
    color: 'gold',
    meaning: 'Multi-Star Array',
    category: 'quantum'
  },
  'legend-⛓️-chain': { 
    emoji: '⛓️', 
    color: 'blue',
    meaning: 'Chain System',
    category: 'other'
  },
  'legend-spine-index': { 
    emoji: '👑🔀🎛️', 
    color: 'gold',
    meaning: 'Spine Index Hub',
    category: 'brain'
  },
  'mongoose.os': { 
    emoji: '🧠', 
    color: 'purple',
    meaning: 'Neural Core Brain',
    category: 'brain'
  }
}

export const colorSchemeMap: Record<string, string> = {
  '🟧': 'orange',
  '🟦': 'blue', 
  '🟥': 'red',
  '🟪': 'purple',
  '🟨': 'yellow',
  '🟩': 'green',
  '🟫': 'orange',
  '⬜': 'muted',
  '⬛': 'foreground'
}

export const meaningMap: Record<string, string> = {
  '🟧': 'CEO / Decisions',
  '🟦': 'Input Needed',
  '🟥': 'Routes Available',
  '🟪': 'Assimilation',
  '🟨': 'Data to Extract',
  '🟩': 'Engineering / Tools',
  '🌸': 'Investigative',
  '💎': 'Value',
  '💰': 'Financial',
  '👑': 'Authority',
  '🧱': 'Building Block',
  '🎵': 'Synchronization',
  '🪡': 'Assembly',
  '🌐': 'Network',
  '✨': 'Enhancement',
  '🔱': 'Power',
  '🍄': 'Growth/Audit',
  '🪐': 'Memory Space',
  '⭐': 'Core Runtime',
  '🦾': 'Robotic Core',
  '💲': 'Transaction',
  '🎛️': 'Modulation'
}

export function getEmojiForRepo(repoName: string): EmojiLegend | null {
  const key = Object.keys(repoEmojiMap).find(k => 
    repoName.toLowerCase().includes(k.toLowerCase())
  )
  return key ? repoEmojiMap[key] : null
}

export function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    'gold': 'text-gold',
    'blue': 'text-blue',
    'purple': 'text-purple',
    'yellow': 'text-yellow',
    'red': 'text-red',
    'orange': 'text-orange',
    'green': 'text-green',
    'pink': 'text-pink'
  }
  return colorMap[color] || 'text-foreground'
}

export function getGlowClass(color: string): string {
  const glowMap: Record<string, string> = {
    'gold': 'drop-shadow-[0_0_8px_oklch(0.75_0.15_80)]',
    'blue': 'drop-shadow-[0_0_8px_oklch(0.60_0.25_250)]',
    'purple': 'drop-shadow-[0_0_8px_oklch(0.55_0.22_290)]',
    'yellow': 'drop-shadow-[0_0_8px_oklch(0.85_0.15_90)]',
    'red': 'drop-shadow-[0_0_8px_oklch(0.60_0.24_25)]',
    'orange': 'drop-shadow-[0_0_8px_oklch(0.70_0.18_50)]',
    'green': 'drop-shadow-[0_0_8px_oklch(0.65_0.20_145)]',
    'pink': 'drop-shadow-[0_0_8px_oklch(0.70_0.20_350)]'
  }
  return glowMap[color] || ''
}
