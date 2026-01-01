import type { ComponentCategory } from './types'

export interface RepoDefinition {
  name: string
  emoji: string
  category: ComponentCategory
  description: string
  purpose: string
  colorCode: string
  numberCode?: number
  semanticTags: string[]
  dependencies: string[]
  exports: string[]
  position: {
    layer: number
    order: number
  }
  musicTheme?: {
    primary: string
    journey: string
    archive?: string
  }
  pages: RepoPage[]
  functions: RepoFunction[]
}

export interface RepoPage {
  name: string
  path: string
  purpose: string
  components: string[]
}

export interface RepoFunction {
  name: string
  purpose: string
  inputs: string[]
  outputs: string[]
  semanticMeaning: string
}

export const REPO_REGISTRY: Record<string, RepoDefinition> = {
  'mongoose.os': {
    name: 'mongoose.os',
    emoji: '👑🧠',
    category: 'brain',
    description: 'Neural Core System - Central intelligence and coordination',
    purpose: 'Primary brain system for quantum computing coordination',
    colorCode: 'gold',
    numberCode: 16,
    semanticTags: ['brain', 'intelligence', 'god', 'unity', 'core'],
    dependencies: [],
    exports: ['intelligence', 'coordination', 'decision-making'],
    position: {
      layer: 0,
      order: 0
    },
    musicTheme: {
      primary: 'Shine On You Crazy Diamond',
      journey: 'Welcome to the Machine',
      archive: 'https://archive.org/details/DarkSideOfTheMoon_201608'
    },
    pages: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        purpose: 'Main control and coordination interface',
        components: ['SystemStatus', 'NeuralNetwork', 'CommandCenter']
      },
      {
        name: 'Learning',
        path: '/learning',
        purpose: 'AI training and pattern recognition',
        components: ['TrainingModule', 'PatternAnalyzer', 'KnowledgeBase']
      }
    ],
    functions: [
      {
        name: 'coordinate',
        purpose: 'Coordinate all system components',
        inputs: ['system-state', 'repo-data'],
        outputs: ['coordination-plan', 'action-commands'],
        semanticMeaning: 'Unity and orchestration of all machines'
      }
    ]
  },
  
  'legend-core': {
    name: 'legend-core',
    emoji: '👑🧱🇯🇵',
    category: 'brain',
    description: 'Read-only authority and foundation',
    purpose: 'Immutable core system definitions and authority',
    colorCode: 'gold',
    numberCode: 1,
    semanticTags: ['foundation', 'authority', 'immutable', 'core'],
    dependencies: [],
    exports: ['core-definitions', 'authority-system', 'legend-mapping'],
    position: {
      layer: 0,
      order: 1
    },
    pages: [
      {
        name: 'Legends',
        path: '/legends',
        purpose: 'Define and display all system legends',
        components: ['LegendPanel', 'EmojiMapping', 'ColorCodeSystem']
      }
    ],
    functions: [
      {
        name: 'defineLegend',
        purpose: 'Create immutable legend definitions',
        inputs: ['emoji', 'meaning', 'category'],
        outputs: ['legend-definition'],
        semanticMeaning: 'Foundation building blocks'
      }
    ]
  },

  'legend-🦾-robot-core': {
    name: 'legend-🦾-robot-core',
    emoji: '🦾',
    category: 'quantum',
    description: 'Robot and automation core system',
    purpose: 'Physical automation and robotic control',
    colorCode: 'blue',
    numberCode: 41,
    semanticTags: ['robot', 'automation', 'physical', 'marine', 'military'],
    dependencies: ['legend-core', 'mongoose.os'],
    exports: ['robot-control', 'automation', 'physical-interface'],
    position: {
      layer: 1,
      order: 0
    },
    pages: [
      {
        name: 'Robot Fleet',
        path: '/robots',
        purpose: 'Manage and control robot instances',
        components: ['RobotList', 'RobotController', 'StatusMonitor']
      }
    ],
    functions: [
      {
        name: 'spawn',
        purpose: 'Create new robot instances',
        inputs: ['bot-config', 'target-platform'],
        outputs: ['robot-instance'],
        semanticMeaning: 'Birth of mechanical servants'
      }
    ]
  },

  'legend-🪐-memory': {
    name: 'legend-🪐-memory',
    emoji: '🪐',
    category: 'quantum',
    description: 'Memory storage and retrieval system',
    purpose: 'Quantum memory storage and access',
    colorCode: 'purple',
    numberCode: 30,
    semanticTags: ['memory', 'storage', 'quantum', 'persistence'],
    dependencies: ['legend-core'],
    exports: ['memory-store', 'quantum-retrieval', 'time-travel'],
    position: {
      layer: 1,
      order: 1
    },
    pages: [
      {
        name: 'Memory Bank',
        path: '/memory',
        purpose: 'Access stored memories and states',
        components: ['MemoryBrowser', 'TimeTravel', 'StateSnapshot']
      }
    ],
    functions: [
      {
        name: 'store',
        purpose: 'Store quantum state to memory',
        inputs: ['state-data', 'timestamp'],
        outputs: ['memory-id'],
        semanticMeaning: 'Preserving moments in quantum time'
      }
    ]
  },

  'legend-⭐-runtime': {
    name: 'legend-⭐-runtime',
    emoji: '⭐',
    category: 'quantum',
    description: 'Runtime execution engine',
    purpose: 'Execute and run quantum programs',
    colorCode: 'yellow',
    numberCode: 23,
    semanticTags: ['runtime', 'execution', 'live', 'active'],
    dependencies: ['legend-core', 'mongoose.os'],
    exports: ['execution-engine', 'runtime-env', 'process-manager'],
    position: {
      layer: 1,
      order: 2
    },
    pages: [
      {
        name: 'Runtime Monitor',
        path: '/runtime',
        purpose: 'Monitor active processes and execution',
        components: ['ProcessList', 'ExecutionMonitor', 'PerformanceMetrics']
      }
    ],
    functions: [
      {
        name: 'execute',
        purpose: 'Run quantum program',
        inputs: ['program-code', 'parameters'],
        outputs: ['execution-result'],
        semanticMeaning: 'Bringing code to life'
      }
    ]
  },

  'legend-🧱-encode': {
    name: 'legend-🧱-encode',
    emoji: '🧱',
    category: 'quantum',
    description: 'Encoding and encryption system',
    purpose: 'Encode data and create secret ingredients',
    colorCode: 'orange',
    numberCode: 1,
    semanticTags: ['encode', 'encrypt', 'security', 'foundation'],
    dependencies: ['legend-core'],
    exports: ['encoder', 'encryptor', 'secret-generator'],
    position: {
      layer: 1,
      order: 3
    },
    pages: [
      {
        name: 'Encoder',
        path: '/encode',
        purpose: 'Encode and encrypt data',
        components: ['EncoderInterface', 'CipherSelector', 'KeyGenerator']
      }
    ],
    functions: [
      {
        name: 'encode',
        purpose: 'Encode data with secret ingredient',
        inputs: ['raw-data', 'key'],
        outputs: ['encoded-data'],
        semanticMeaning: 'Hiding truth in layers'
      }
    ]
  },

  'legend-🎵-sync': {
    name: 'legend-🎵-sync',
    emoji: '🎵',
    category: 'time',
    description: 'Synchronization and timing system',
    purpose: 'Keep all systems in harmonic sync',
    colorCode: 'pink',
    numberCode: 73,
    semanticTags: ['sync', 'harmony', 'timing', 'love', 'coordination'],
    dependencies: ['mongoose.os', 'legend-⭐-runtime'],
    exports: ['sync-engine', 'timer', 'harmony-checker'],
    position: {
      layer: 2,
      order: 0
    },
    musicTheme: {
      primary: "I'm the One Who Wants to Be with You",
      journey: 'Time (Dark Side of the Moon)',
    },
    pages: [
      {
        name: 'Sync Control',
        path: '/sync',
        purpose: 'Manage system synchronization',
        components: ['SyncMonitor', 'TimingControl', 'HarmonyView']
      }
    ],
    functions: [
      {
        name: 'synchronize',
        purpose: 'Sync multiple systems',
        inputs: ['systems', 'timing'],
        outputs: ['sync-state'],
        semanticMeaning: 'Creating harmony from chaos'
      }
    ]
  },

  'legend-🪡-assembler': {
    name: 'legend-🪡-assembler',
    emoji: '🪡',
    category: 'time',
    description: 'Code assembly and threading system',
    purpose: 'Thread components together into functional wholes',
    colorCode: 'blue',
    numberCode: 33,
    semanticTags: ['assembly', 'threading', 'building', 'assimilation'],
    dependencies: ['legend-core', 'legend-🧱-encode'],
    exports: ['assembler', 'threader', 'linker'],
    position: {
      layer: 2,
      order: 1
    },
    pages: [
      {
        name: 'Assembly Line',
        path: '/assemble',
        purpose: 'Assemble components into programs',
        components: ['AssemblyInterface', 'ThreadViewer', 'DependencyGraph']
      }
    ],
    functions: [
      {
        name: 'assemble',
        purpose: 'Assemble code modules',
        inputs: ['modules', 'config'],
        outputs: ['assembled-program'],
        semanticMeaning: 'Weaving threads into fabric'
      }
    ]
  },

  'legend-🔀-flow': {
    name: 'legend-🔀-flow',
    emoji: '🔀',
    category: 'time',
    description: 'Data flow and routing system',
    purpose: 'Control data flow between systems',
    colorCode: 'blue',
    numberCode: 20,
    semanticTags: ['flow', 'routing', 'streams', 'video', 'place'],
    dependencies: ['legend-core', 'mongoose.os'],
    exports: ['flow-controller', 'router', 'stream-manager'],
    position: {
      layer: 2,
      order: 2
    },
    pages: [
      {
        name: 'Flow Control',
        path: '/flow',
        purpose: 'Manage data flows and routes',
        components: ['FlowDiagram', 'RouteManager', 'StreamMonitor']
      }
    ],
    functions: [
      {
        name: 'route',
        purpose: 'Route data to destinations',
        inputs: ['data', 'destination'],
        outputs: ['routed-data'],
        semanticMeaning: 'Directing the river of information'
      }
    ]
  },

  'legend-🎛️-modulator': {
    name: 'legend-🎛️-modulator',
    emoji: '🎛️',
    category: 'os',
    description: 'Signal modulation and filtering',
    purpose: 'Modulate signals and filter problems',
    colorCode: 'green',
    numberCode: 107,
    semanticTags: ['modulator', 'filter', 'adjust', 'tune', 'break'],
    dependencies: ['legend-core', 'legend-🎵-sync'],
    exports: ['modulator', 'filter', 'tuner'],
    position: {
      layer: 3,
      order: 0
    },
    musicTheme: {
      primary: "I'm the One Who Wants to Be with You",
      journey: 'Us and Them',
    },
    pages: [
      {
        name: 'Modulation',
        path: '/modulate',
        purpose: 'Modulate and filter signals',
        components: ['ModulatorInterface', 'FilterBank', 'SpectrumAnalyzer']
      }
    ],
    functions: [
      {
        name: 'modulate',
        purpose: 'Modulate signal parameters',
        inputs: ['signal', 'modulation-params'],
        outputs: ['modulated-signal'],
        semanticMeaning: 'Shaping waves to carry truth'
      }
    ]
  },

  'legend-💫-star': {
    name: 'legend-💫-star',
    emoji: '💫',
    category: 'quantum',
    description: 'Single star deployment system',
    purpose: 'Deploy individual stellar instances',
    colorCode: 'yellow',
    numberCode: 23,
    semanticTags: ['star', 'deploy', 'single', 'shine', 'value-up'],
    dependencies: ['legend-⭐-runtime'],
    exports: ['star-deployer', 'instance-manager'],
    position: {
      layer: 2,
      order: 4
    },
    pages: [
      {
        name: 'Star Deployment',
        path: '/star',
        purpose: 'Deploy and manage single stars',
        components: ['DeploymentInterface', 'StarMonitor', 'InstanceList']
      }
    ],
    functions: [
      {
        name: 'deploy',
        purpose: 'Deploy a single star instance',
        inputs: ['config', 'location'],
        outputs: ['star-instance'],
        semanticMeaning: 'Lighting one candle in the darkness'
      }
    ]
  },

  'legend-✨-multistar': {
    name: 'legend-✨-multistar',
    emoji: '✨',
    category: 'quantum',
    description: 'Multi-star faceting system',
    purpose: 'Create many stars from one diamond',
    colorCode: 'gold',
    numberCode: 23,
    semanticTags: ['multistar', 'facet', 'multiply', 'shine', 'distribute'],
    dependencies: ['legend-💫-star', 'legend-⭐-runtime'],
    exports: ['multi-deployer', 'facet-engine'],
    position: {
      layer: 2,
      order: 5
    },
    musicTheme: {
      primary: 'Shine On You Crazy Diamond',
      journey: 'Shine On You Crazy Diamond',
    },
    pages: [
      {
        name: 'Multi-Star Control',
        path: '/multistar',
        purpose: 'Deploy and coordinate multiple stars',
        components: ['FacetInterface', 'StarGrid', 'CoordinationMap']
      }
    ],
    functions: [
      {
        name: 'facet',
        purpose: 'Create multiple stars from one source',
        inputs: ['source-star', 'facet-count'],
        outputs: ['star-array'],
        semanticMeaning: 'One diamond becomes many lights'
      }
    ]
  },

  'legend-🍄-auditor': {
    name: 'legend-🍄-auditor',
    emoji: '🍄',
    category: 'os',
    description: 'System audit and logging',
    purpose: 'Audit all system activities',
    colorCode: 'red',
    numberCode: 13,
    semanticTags: ['audit', 'log', 'verify', 'skill', 'mushroom'],
    dependencies: ['legend-core', 'legend-🪐-memory'],
    exports: ['auditor', 'logger', 'verifier'],
    position: {
      layer: 3,
      order: 1
    },
    pages: [
      {
        name: 'Audit Log',
        path: '/audit',
        purpose: 'View system audit trails',
        components: ['AuditLog', 'ActivityTimeline', 'VerificationStatus']
      }
    ],
    functions: [
      {
        name: 'audit',
        purpose: 'Audit system activity',
        inputs: ['activity-log', 'time-range'],
        outputs: ['audit-report'],
        semanticMeaning: 'Showing skills and proving truth'
      }
    ]
  },

  'legend-⛓️-chain': {
    name: 'legend-⛓️-chain',
    emoji: '⛓️',
    category: 'time',
    description: 'Blockchain and chain management',
    purpose: 'Create immutable chains of data',
    colorCode: 'blue',
    numberCode: 33,
    semanticTags: ['chain', 'blockchain', 'immutable', 'sequence'],
    dependencies: ['legend-core', 'legend-🧱-encode'],
    exports: ['blockchain', 'chain-manager', 'validator'],
    position: {
      layer: 2,
      order: 3
    },
    pages: [
      {
        name: 'Chain Explorer',
        path: '/chain',
        purpose: 'Explore blockchain data',
        components: ['ChainBrowser', 'BlockViewer', 'TransactionList']
      }
    ],
    functions: [
      {
        name: 'addBlock',
        purpose: 'Add block to chain',
        inputs: ['block-data', 'previous-hash'],
        outputs: ['new-block'],
        semanticMeaning: 'Forging unbreakable links'
      }
    ]
  },

  'legend-🔗-semantic': {
    name: 'legend-🔗-semantic',
    emoji: '🔗',
    category: 'time',
    description: 'Semantic linking and meaning',
    purpose: 'Create semantic connections between data',
    colorCode: 'accent',
    numberCode: 101,
    semanticTags: ['semantic', 'meaning', 'links', 'learning', 'understanding'],
    dependencies: ['mongoose.os', 'legend-core'],
    exports: ['semantic-engine', 'meaning-mapper', 'context-builder'],
    position: {
      layer: 2,
      order: 6
    },
    pages: [
      {
        name: 'Semantic Web',
        path: '/semantic',
        purpose: 'Visualize semantic connections',
        components: ['SemanticGraph', 'MeaningExplorer', 'ContextViewer']
      }
    ],
    functions: [
      {
        name: 'link',
        purpose: 'Create semantic link between concepts',
        inputs: ['concept-a', 'concept-b', 'relationship'],
        outputs: ['semantic-link'],
        semanticMeaning: 'Weaving the web of understanding'
      }
    ]
  },

  'truvio-studios': {
    name: 'truvio-studios',
    emoji: '🎬',
    category: 'other',
    description: 'Interactive storytelling and media production',
    purpose: 'Create interactive stories and media experiences',
    colorCode: 'pink',
    numberCode: 88,
    semanticTags: ['storytelling', 'media', 'production', 'interactive', 'cinema', 'creepshow'],
    dependencies: ['legend-core', 'legend-🎵-sync'],
    exports: ['story-engine', 'media-production', 'interactive-narratives'],
    position: {
      layer: 3,
      order: 8
    },
    musicTheme: {
      primary: 'Dear Mr. Fantasy',
      journey: 'The Logical Song',
      archive: 'https://archive.org/details/78_dear-mr-fantasy_traffic-steve-winwood-jim-capaldi-chris-wood_gbia0026721a'
    },
    pages: [
      {
        name: 'Story Builder',
        path: '/stories',
        purpose: 'Create and edit interactive stories',
        components: ['StoryEditor', 'SceneManager', 'BranchingPaths']
      },
      {
        name: 'Media Library',
        path: '/media',
        purpose: 'Manage media assets',
        components: ['MediaGallery', 'AssetUpload', 'TagManager']
      },
      {
        name: 'Production',
        path: '/production',
        purpose: 'Produce and publish stories',
        components: ['ProductionQueue', 'PreviewPlayer', 'PublishSettings']
      }
    ],
    functions: [
      {
        name: 'createStory',
        purpose: 'Create new interactive story',
        inputs: ['story-data', 'branches', 'media-assets'],
        outputs: ['story-id', 'interactive-experience'],
        semanticMeaning: 'Weaving tales that branch and evolve'
      },
      {
        name: 'correctScript',
        purpose: 'Correct story scripts to change outcomes',
        inputs: ['scene-id', 'corrections'],
        outputs: ['updated-story', 'new-fate'],
        semanticMeaning: 'Rewriting destiny through better choices'
      }
    ]
  }
}

export function getRepoDefinition(repoName: string): RepoDefinition | undefined {
  return REPO_REGISTRY[repoName] || 
    Object.values(REPO_REGISTRY).find(def => 
      def.name.toLowerCase().includes(repoName.toLowerCase())
    )
}

export function getReposByCategory(category: ComponentCategory): RepoDefinition[] {
  return Object.values(REPO_REGISTRY).filter(def => def.category === category)
}

export function getReposByLayer(layer: number): RepoDefinition[] {
  return Object.values(REPO_REGISTRY)
    .filter(def => def.position.layer === layer)
    .sort((a, b) => a.position.order - b.position.order)
}

export function getRepoDependencyTree(repoName: string): string[] {
  const repo = getRepoDefinition(repoName)
  if (!repo) return []
  
  const deps = [...repo.dependencies]
  repo.dependencies.forEach(depName => {
    deps.push(...getRepoDependencyTree(depName))
  })
  
  return Array.from(new Set(deps))
}

export function getReposBySemanticTag(tag: string): RepoDefinition[] {
  return Object.values(REPO_REGISTRY).filter(def =>
    def.semanticTags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  )
}

export function getAllRepoNames(): string[] {
  return Object.keys(REPO_REGISTRY)
}

export function getRepoColorCode(repoName: string): string {
  const repo = getRepoDefinition(repoName)
  return repo?.colorCode || 'blue'
}

export function getRepoNumberCode(repoName: string): number | undefined {
  const repo = getRepoDefinition(repoName)
  return repo?.numberCode
}

export function searchRepos(query: string): RepoDefinition[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(REPO_REGISTRY).filter(def =>
    def.name.toLowerCase().includes(lowerQuery) ||
    def.description.toLowerCase().includes(lowerQuery) ||
    def.purpose.toLowerCase().includes(lowerQuery) ||
    def.semanticTags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
