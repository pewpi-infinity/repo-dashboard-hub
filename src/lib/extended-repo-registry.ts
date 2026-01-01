import { REPO_REGISTRY, RepoDefinition } from './repo-registry'

export const EXTENDED_REPO_REGISTRY: Record<string, RepoDefinition> = {
  ...REPO_REGISTRY,

  'legend-🔌-socket': {
    name: 'legend-🔌-socket',
    emoji: '🔌',
    category: 'quantum',
    description: 'Socket and connection management',
    purpose: 'Real-time socket connections',
    colorCode: 'blue',
    numberCode: 90,
    semanticTags: ['socket', 'connection', 'real-time', 'communication', 'freedom'],
    dependencies: ['legend-core', 'legend-🔀-flow'],
    exports: ['socket-server', 'connection-manager', 'realtime-sync'],
    position: { layer: 3, order: 2 },
    pages: [
      { name: 'Socket Manager', path: '/socket', purpose: 'Manage real-time connections', components: ['SocketList', 'ConnectionMonitor'] }
    ],
    functions: [
      { name: 'connect', purpose: 'Establish socket connection', inputs: ['endpoint', 'config'], outputs: ['socket'], semanticMeaning: 'Opening channels of instant communication' }
    ]
  },

  'legend-⛓️‍💥-chain-breaker': {
    name: 'legend-⛓️‍💥-chain-breaker',
    emoji: '⛓️‍💥',
    category: 'os',
    description: 'Chain breaking and unlocking system',
    purpose: 'Break constraints and unlock potential',
    colorCode: 'orange',
    numberCode: 76,
    semanticTags: ['break', 'freedom', 'unlock', 'revolution'],
    dependencies: ['legend-⛓️-chain'],
    exports: ['breaker', 'unlocker', 'liberator'],
    position: { layer: 3, order: 3 },
    pages: [
      { name: 'Liberation', path: '/break', purpose: 'Break chains and constraints', components: ['ChainAnalyzer', 'BreakInterface'] }
    ],
    functions: [
      { name: 'break', purpose: 'Break chain constraints', inputs: ['chain', 'method'], outputs: ['freed-data'], semanticMeaning: 'Revolution and liberation' }
    ]
  },

  'legend-🖼️-frame': {
    name: 'legend-🖼️-frame',
    emoji: '🖼️',
    category: 'os',
    description: 'Frame and boundary system',
    purpose: 'Create frames and boundaries for content',
    colorCode: 'purple',
    numberCode: 36,
    semanticTags: ['frame', 'boundary', 'protect', 'structure'],
    dependencies: ['legend-core'],
    exports: ['frame-builder', 'boundary-manager'],
    position: { layer: 2, order: 7 },
    pages: [
      { name: 'Frame Builder', path: '/frame', purpose: 'Build content frames', components: ['FrameDesigner', 'BoundaryEditor'] }
    ],
    functions: [
      { name: 'frame', purpose: 'Create frame around content', inputs: ['content', 'style'], outputs: ['framed-content'], semanticMeaning: 'Protecting and presenting' }
    ]
  },

  'legend-🛞-tire': {
    name: 'legend-🛞-tire',
    emoji: '🛞',
    category: 'time',
    description: 'Rotation and cycle management',
    purpose: 'Manage cyclical processes and rotation',
    colorCode: 'orange',
    numberCode: 107,
    semanticTags: ['rotation', 'cycle', 'movement', 'wheel'],
    dependencies: ['legend-🎵-sync'],
    exports: ['rotator', 'cycle-manager'],
    position: { layer: 3, order: 4 },
    pages: [
      { name: 'Rotation Control', path: '/tire', purpose: 'Control rotation cycles', components: ['CycleMonitor', 'RotationControl'] }
    ],
    functions: [
      { name: 'rotate', purpose: 'Rotate through cycle', inputs: ['items', 'speed'], outputs: ['rotated-state'], semanticMeaning: 'The wheel of time turning' }
    ]
  },

  'legend-🎨-printer': {
    name: 'legend-🎨-printer',
    emoji: '🎨',
    category: 'os',
    description: 'Output and rendering system',
    purpose: 'Print and render output to various formats',
    colorCode: 'pink',
    numberCode: 13,
    semanticTags: ['print', 'render', 'output', 'display', 'skill'],
    dependencies: ['legend-core', 'legend-🖼️-frame'],
    exports: ['printer', 'renderer', 'formatter'],
    position: { layer: 3, order: 5 },
    pages: [
      { name: 'Print Queue', path: '/print', purpose: 'Manage print jobs', components: ['PrintQueue', 'RenderPreview'] }
    ],
    functions: [
      { name: 'print', purpose: 'Render to output', inputs: ['data', 'format'], outputs: ['rendered-output'], semanticMeaning: 'Making invisible visible' }
    ]
  },

  'legend-📖-reader': {
    name: 'legend-📖-reader',
    emoji: '📖',
    category: 'brain',
    description: 'Data reading and parsing system',
    purpose: 'Read and understand various data formats',
    colorCode: 'blue',
    numberCode: 101,
    semanticTags: ['read', 'parse', 'understand', 'learning'],
    dependencies: ['legend-core', 'mongoose.os'],
    exports: ['reader', 'parser', 'interpreter'],
    position: { layer: 2, order: 8 },
    pages: [
      { name: 'Reader Interface', path: '/read', purpose: 'Read and parse data', components: ['DataReader', 'FormatSelector'] }
    ],
    functions: [
      { name: 'read', purpose: 'Read and parse data', inputs: ['source', 'format'], outputs: ['parsed-data'], semanticMeaning: 'Consuming knowledge' }
    ]
  },

  'legend-💰-money': {
    name: 'legend-💰-money',
    emoji: '💰',
    category: 'other',
    description: 'Currency and financial system',
    purpose: 'Manage currency, payments, and value exchange',
    colorCode: 'gold',
    numberCode: 92,
    semanticTags: ['money', 'currency', 'value', 'tax', 'wealth'],
    dependencies: ['legend-core', 'legend-⛓️-chain'],
    exports: ['currency-manager', 'payment-processor', 'tax-calculator'],
    position: { layer: 4, order: 0 },
    pages: [
      { name: 'Treasury', path: '/money', purpose: 'Manage finances', components: ['Wallet', 'TransactionHistory', 'TaxSystem'] }
    ],
    functions: [
      { name: 'transfer', purpose: 'Transfer value', inputs: ['from', 'to', 'amount'], outputs: ['transaction'], semanticMeaning: 'Flow of prosperity' }
    ]
  },

  'legend-💵-currency': {
    name: 'legend-💵-currency',
    emoji: '💵',
    category: 'other',
    description: 'Token and currency creation',
    purpose: 'Create and manage custom currencies',
    colorCode: 'green',
    numberCode: 50,
    semanticTags: ['currency', 'token', 'creation', 'new-beginning'],
    dependencies: ['legend-💰-money', 'legend-⛓️-chain'],
    exports: ['currency-factory', 'token-manager'],
    position: { layer: 4, order: 1 },
    pages: [
      { name: 'Mint', path: '/currency', purpose: 'Create new currencies', components: ['CurrencyDesigner', 'TokenMinter'] }
    ],
    functions: [
      { name: 'mint', purpose: 'Create new currency', inputs: ['config', 'supply'], outputs: ['currency'], semanticMeaning: 'Birth of new value' }
    ]
  },

  'legend-🗣️-voice': {
    name: 'legend-🗣️-voice',
    emoji: '🗣️',
    category: 'brain',
    description: 'Voice and speech system',
    purpose: 'Text-to-speech and voice commands',
    colorCode: 'blue',
    numberCode: 90,
    semanticTags: ['voice', 'speech', 'audio', 'freedom', 'expression'],
    dependencies: ['legend-core', 'mongoose.os'],
    exports: ['tts-engine', 'voice-recognition', 'speech-processor'],
    position: { layer: 3, order: 6 },
    pages: [
      { name: 'Voice Control', path: '/voice', purpose: 'Voice interface', components: ['VoiceInput', 'SpeechOutput', 'CommandRecognizer'] }
    ],
    functions: [
      { name: 'speak', purpose: 'Convert text to speech', inputs: ['text', 'voice-config'], outputs: ['audio'], semanticMeaning: 'Giving voice to thought' }
    ]
  },

  'legend-👂-listener': {
    name: 'legend-👂-listener',
    emoji: '👂',
    category: 'brain',
    description: 'Audio listening and monitoring',
    purpose: 'Listen to audio inputs and events',
    colorCode: 'purple',
    numberCode: 105,
    semanticTags: ['listen', 'monitor', 'audio', 'attention'],
    dependencies: ['legend-🗣️-voice'],
    exports: ['audio-listener', 'event-monitor'],
    position: { layer: 3, order: 7 },
    pages: [
      { name: 'Listener', path: '/listen', purpose: 'Monitor audio and events', components: ['AudioMonitor', 'EventListener'] }
    ],
    functions: [
      { name: 'listen', purpose: 'Listen to audio', inputs: ['source', 'filter'], outputs: ['audio-data'], semanticMeaning: 'Receiving the message' }
    ]
  },

  'legend-👁️-viewer': {
    name: 'legend-👁️-viewer',
    emoji: '👁️',
    category: 'brain',
    description: 'Visual viewing and observation',
    purpose: 'View and observe visual data',
    colorCode: 'blue',
    numberCode: 84,
    semanticTags: ['view', 'observe', 'visual', 'reading-mind'],
    dependencies: ['legend-core'],
    exports: ['viewer', 'observer', 'visualizer'],
    position: { layer: 3, order: 8 },
    pages: [
      { name: 'Viewer', path: '/view', purpose: 'View visual data', components: ['ImageViewer', 'VideoPlayer', 'DataVisualizer'] }
    ],
    functions: [
      { name: 'view', purpose: 'Display visual data', inputs: ['data', 'format'], outputs: ['visual'], semanticMeaning: 'Seeing the unseen' }
    ]
  },

  'legend-👀-watcher': {
    name: 'legend-👀-watcher',
    emoji: '👀',
    category: 'os',
    description: 'File and system watching',
    purpose: 'Watch for changes and trigger actions',
    colorCode: 'yellow',
    numberCode: 66,
    semanticTags: ['watch', 'monitor', 'observe', 'record'],
    dependencies: ['legend-👁️-viewer', 'legend-🍄-auditor'],
    exports: ['watcher', 'change-detector', 'trigger-system'],
    position: { layer: 4, order: 2 },
    pages: [
      { name: 'Watcher Console', path: '/watch', purpose: 'Monitor system changes', components: ['WatchList', 'ChangeLog', 'TriggerConfig'] }
    ],
    functions: [
      { name: 'watch', purpose: 'Watch for changes', inputs: ['target', 'events'], outputs: ['change-stream'], semanticMeaning: 'Ever vigilant guardian' }
    ]
  },

  'legend-🗺️-maps': {
    name: 'legend-🗺️-maps',
    emoji: '🗺️',
    category: 'time',
    description: 'Navigation and mapping system',
    purpose: 'Create and navigate maps',
    colorCode: 'green',
    numberCode: 20,
    semanticTags: ['map', 'navigate', 'route', 'geography'],
    dependencies: ['legend-🔀-flow'],
    exports: ['map-engine', 'navigator', 'geocoder'],
    position: { layer: 4, order: 3 },
    pages: [
      { name: 'Map View', path: '/maps', purpose: 'Navigate maps', components: ['MapCanvas', 'RouteCalculator', 'LocationSearch'] }
    ],
    functions: [
      { name: 'navigate', purpose: 'Calculate route', inputs: ['start', 'end'], outputs: ['route'], semanticMeaning: 'Finding the path' }
    ]
  },

  'legend-📚-dictionary': {
    name: 'legend-📚-dictionary',
    emoji: '📚',
    category: 'brain',
    description: 'Dictionary and word definitions',
    purpose: 'Define and translate words',
    colorCode: 'purple',
    numberCode: 101,
    semanticTags: ['dictionary', 'words', 'definitions', 'learning'],
    dependencies: ['legend-core', 'legend-📖-reader'],
    exports: ['dictionary', 'translator', 'thesaurus'],
    position: { layer: 4, order: 4 },
    pages: [
      { name: 'Dictionary', path: '/dictionary', purpose: 'Look up words', components: ['WordSearch', 'DefinitionDisplay', 'TranslationTool'] }
    ],
    functions: [
      { name: 'define', purpose: 'Get word definition', inputs: ['word', 'language'], outputs: ['definition'], semanticMeaning: 'Unlocking meaning' }
    ]
  },

  'legend-🌐-language': {
    name: 'legend-🌐-language',
    emoji: '🌐',
    category: 'brain',
    description: 'Language interpretation and translation',
    purpose: 'Translate between languages',
    colorCode: 'blue',
    numberCode: 17,
    semanticTags: ['language', 'translation', 'international', 'unity'],
    dependencies: ['legend-📚-dictionary', 'mongoose.os'],
    exports: ['translator', 'language-detector', 'interpreter'],
    position: { layer: 4, order: 5 },
    pages: [
      { name: 'Translator', path: '/language', purpose: 'Translate languages', components: ['TranslationInterface', 'LanguageSelector'] }
    ],
    functions: [
      { name: 'translate', purpose: 'Translate text', inputs: ['text', 'from-lang', 'to-lang'], outputs: ['translated-text'], semanticMeaning: 'Bridging worlds' }
    ]
  },

  'legend-🧮-logic': {
    name: 'legend-🧮-logic',
    emoji: '🧮',
    category: 'brain',
    description: 'Logic and reasoning engine',
    purpose: 'Perform logical reasoning and inference',
    colorCode: 'blue',
    numberCode: 101,
    semanticTags: ['logic', 'reasoning', 'inference', 'learning'],
    dependencies: ['mongoose.os', 'legend-core'],
    exports: ['logic-engine', 'reasoner', 'inference-system'],
    position: { layer: 2, order: 9 },
    pages: [
      { name: 'Logic Lab', path: '/logic', purpose: 'Test logical reasoning', components: ['LogicBuilder', 'InferenceEngine', 'TruthTable'] }
    ],
    functions: [
      { name: 'infer', purpose: 'Perform logical inference', inputs: ['premises', 'rules'], outputs: ['conclusions'], semanticMeaning: 'Deriving truth' }
    ]
  },

  'legend-📊-commerce': {
    name: 'legend-📊-commerce',
    emoji: '📊',
    category: 'other',
    description: 'E-commerce and marketplace',
    purpose: 'Create marketplaces and handle commerce',
    colorCode: 'green',
    numberCode: 92,
    semanticTags: ['commerce', 'marketplace', 'trade', 'business'],
    dependencies: ['legend-💰-money', 'legend-💵-currency'],
    exports: ['marketplace', 'shopping-cart', 'checkout-system'],
    position: { layer: 5, order: 0 },
    pages: [
      { name: 'Marketplace', path: '/commerce', purpose: 'Buy and sell', components: ['ProductCatalog', 'ShoppingCart', 'CheckoutFlow'] }
    ],
    functions: [
      { name: 'purchase', purpose: 'Complete purchase', inputs: ['cart', 'payment'], outputs: ['order'], semanticMeaning: 'Exchange of value' }
    ]
  },

  'legend-🏛️-government': {
    name: 'legend-🏛️-government',
    emoji: '🏛️',
    category: 'other',
    description: 'Governance and regulation system',
    purpose: 'Control and regulate the system',
    colorCode: 'gold',
    numberCode: 61,
    semanticTags: ['government', 'regulation', 'control', 'president'],
    dependencies: ['legend-core', 'mongoose.os'],
    exports: ['governance', 'regulatory-system', 'policy-engine'],
    position: { layer: 1, order: 4 },
    pages: [
      { name: 'Government Console', path: '/government', purpose: 'System governance', components: ['PolicyManager', 'RegulationEditor', 'ComplianceMonitor'] }
    ],
    functions: [
      { name: 'regulate', purpose: 'Apply regulations', inputs: ['policy', 'scope'], outputs: ['enforcement'], semanticMeaning: 'Order from chaos' }
    ]
  },

  'legend-🏦-banking': {
    name: 'legend-🏦-banking',
    emoji: '🏦',
    category: 'other',
    description: 'Banking and financial services',
    purpose: 'Provide banking services',
    colorCode: 'gold',
    numberCode: 92,
    semanticTags: ['banking', 'finance', 'accounts', 'tax'],
    dependencies: ['legend-💰-money', 'legend-🏛️-government'],
    exports: ['bank-system', 'account-manager', 'loan-processor'],
    position: { layer: 5, order: 1 },
    pages: [
      { name: 'Bank', path: '/banking', purpose: 'Banking services', components: ['AccountDashboard', 'TransactionManager', 'LoanCalculator'] }
    ],
    functions: [
      { name: 'deposit', purpose: 'Deposit funds', inputs: ['account', 'amount'], outputs: ['balance'], semanticMeaning: 'Storing wealth' }
    ]
  },

  'legend-🎮-toys': {
    name: 'legend-🎮-toys',
    emoji: '🎮',
    category: 'other',
    description: 'Entertainment and games',
    purpose: 'Create games and entertainment',
    colorCode: 'pink',
    numberCode: 73,
    semanticTags: ['games', 'entertainment', 'fun', 'love'],
    dependencies: ['legend-core'],
    exports: ['game-engine', 'entertainment-system'],
    position: { layer: 5, order: 2 },
    pages: [
      { name: 'Game Hub', path: '/toys', purpose: 'Play games', components: ['GameList', 'GamePlayer', 'ScoreBoard'] }
    ],
    functions: [
      { name: 'play', purpose: 'Play game', inputs: ['game-id', 'config'], outputs: ['game-session'], semanticMeaning: 'Joy and creation' }
    ]
  },

  'legend-🏠-housing': {
    name: 'legend-🏠-housing',
    emoji: '🏠',
    category: 'other',
    description: 'Housing and real estate',
    purpose: 'Manage housing and properties',
    colorCode: 'orange',
    numberCode: 109,
    semanticTags: ['housing', 'home', 'property', 'new-home'],
    dependencies: ['legend-💰-money'],
    exports: ['property-manager', 'listing-system'],
    position: { layer: 5, order: 3 },
    pages: [
      { name: 'Real Estate', path: '/housing', purpose: 'Find housing', components: ['PropertyListings', 'HomeViewer', 'MortgageCalculator'] }
    ],
    functions: [
      { name: 'list', purpose: 'List property', inputs: ['property-data'], outputs: ['listing'], semanticMeaning: 'Creating shelter' }
    ]
  },

  'legend-🚗-transport': {
    name: 'legend-🚗-transport',
    emoji: '🚗',
    category: 'time',
    description: 'Transportation system',
    purpose: 'Manage transport and logistics',
    colorCode: 'blue',
    numberCode: 26,
    semanticTags: ['transport', 'logistics', 'speed', 'movement'],
    dependencies: ['legend-🗺️-maps'],
    exports: ['transport-manager', 'logistics-system'],
    position: { layer: 5, order: 4 },
    pages: [
      { name: 'Transport Hub', path: '/transport', purpose: 'Manage transport', components: ['VehicleTracker', 'RouteOptimizer', 'DeliveryScheduler'] }
    ],
    functions: [
      { name: 'route', purpose: 'Calculate transport route', inputs: ['origin', 'destination', 'method'], outputs: ['route'], semanticMeaning: 'Moving through space' }
    ]
  },

  'legend-🌐-networking': {
    name: 'legend-🌐-networking',
    emoji: '🌐',
    category: 'quantum',
    description: 'Network and connectivity',
    purpose: 'Manage network connections',
    colorCode: 'blue',
    numberCode: 17,
    semanticTags: ['network', 'connectivity', 'web', 'unity'],
    dependencies: ['legend-core', 'legend-🔌-socket'],
    exports: ['network-manager', 'protocol-handler'],
    position: { layer: 2, order: 10 },
    pages: [
      { name: 'Network Control', path: '/network', purpose: 'Manage networks', components: ['NetworkMap', 'ConnectionManager', 'ProtocolConfig'] }
    ],
    functions: [
      { name: 'connect', purpose: 'Connect to network', inputs: ['address', 'credentials'], outputs: ['connection'], semanticMeaning: 'Joining the web' }
    ]
  },

  'legend-🎬-video': {
    name: 'legend-🎬-video',
    emoji: '🎬',
    category: 'os',
    description: 'Video processing and playback',
    purpose: 'Handle video content',
    colorCode: 'red',
    numberCode: 20,
    semanticTags: ['video', 'media', 'visual', 'place'],
    dependencies: ['legend-👁️-viewer', 'legend-🎨-printer'],
    exports: ['video-player', 'video-encoder', 'streaming-engine'],
    position: { layer: 4, order: 6 },
    pages: [
      { name: 'Video Studio', path: '/video', purpose: 'Process video', components: ['VideoPlayer', 'VideoEditor', 'StreamManager'] }
    ],
    functions: [
      { name: 'encode', purpose: 'Encode video', inputs: ['source', 'format'], outputs: ['encoded-video'], semanticMeaning: 'Capturing motion' }
    ]
  },

  'legend-🎵-sound': {
    name: 'legend-🎵-sound',
    emoji: '🎵',
    category: 'time',
    description: 'Sound and audio processing',
    purpose: 'Process audio content',
    colorCode: 'pink',
    numberCode: 73,
    semanticTags: ['sound', 'audio', 'music', 'love', 'harmony'],
    dependencies: ['legend-👂-listener', 'legend-🗣️-voice'],
    exports: ['audio-processor', 'sound-engine', 'music-player'],
    position: { layer: 4, order: 7 },
    pages: [
      { name: 'Sound Studio', path: '/sound', purpose: 'Process audio', components: ['AudioEditor', 'SoundMixer', 'MusicPlayer'] }
    ],
    functions: [
      { name: 'process', purpose: 'Process audio', inputs: ['audio', 'effects'], outputs: ['processed-audio'], semanticMeaning: 'Shaping sound waves' }
    ]
  },

  'legend-💡-quantum-lighting': {
    name: 'legend-💡-quantum-lighting',
    emoji: '💡',
    category: 'quantum',
    description: 'Quantum lighting effects',
    purpose: 'Create quantum visual effects',
    colorCode: 'yellow',
    numberCode: 23,
    semanticTags: ['light', 'quantum', 'effects', 'visual'],
    dependencies: ['legend-core'],
    exports: ['lighting-engine', 'effect-generator'],
    position: { layer: 4, order: 8 },
    pages: [
      { name: 'Lighting Control', path: '/lighting', purpose: 'Control lighting', components: ['LightingPanel', 'EffectSelector', 'IntensityControl'] }
    ],
    functions: [
      { name: 'illuminate', purpose: 'Create lighting effect', inputs: ['target', 'effect-type'], outputs: ['lighting'], semanticMeaning: 'Let there be light' }
    ]
  },

  'legend-♻️-energy-cycle': {
    name: 'legend-♻️-energy-cycle',
    emoji: '♻️',
    category: 'quantum',
    description: 'Energy recycling and conservation',
    purpose: 'Recycle and conserve energy',
    colorCode: 'green',
    numberCode: 68,
    semanticTags: ['energy', 'recycle', 'conservation', 'sustainable'],
    dependencies: ['legend-core'],
    exports: ['energy-recycler', 'conservation-system'],
    position: { layer: 4, order: 9 },
    pages: [
      { name: 'Energy Management', path: '/energy', purpose: 'Manage energy', components: ['EnergyMonitor', 'RecycleController', 'ConservationMetrics'] }
    ],
    functions: [
      { name: 'recycle', purpose: 'Recycle energy', inputs: ['used-energy'], outputs: ['recycled-energy'], semanticMeaning: 'Nothing is wasted' }
    ]
  },

  'legend-🏷️-labeling': {
    name: 'legend-🏷️-labeling',
    emoji: '🏷️',
    category: 'os',
    description: 'Labeling and tagging system',
    purpose: 'Label and tag data',
    colorCode: 'blue',
    numberCode: 33,
    semanticTags: ['label', 'tag', 'organize', 'assimilation'],
    dependencies: ['legend-core'],
    exports: ['labeler', 'tagger', 'organizer'],
    position: { layer: 3, order: 9 },
    pages: [
      { name: 'Label Manager', path: '/labels', purpose: 'Manage labels', components: ['LabelEditor', 'TagCloud', 'CategoryManager'] }
    ],
    functions: [
      { name: 'label', purpose: 'Apply label', inputs: ['item', 'label'], outputs: ['labeled-item'], semanticMeaning: 'Naming things' }
    ]
  },

  'legend-🧹-sweeper': {
    name: 'legend-🧹-sweeper',
    emoji: '🧹',
    category: 'os',
    description: 'System cleanup and maintenance',
    purpose: 'Clean and maintain system',
    colorCode: 'purple',
    numberCode: 21,
    semanticTags: ['clean', 'sweep', 'maintain', 'no-torture'],
    dependencies: ['legend-🍄-auditor'],
    exports: ['cleaner', 'optimizer', 'maintainer'],
    position: { layer: 4, order: 10 },
    pages: [
      { name: 'Sweep Control', path: '/sweep', purpose: 'System cleanup', components: ['CleanupManager', 'OptimizationTools', 'MaintenanceScheduler'] }
    ],
    functions: [
      { name: 'sweep', purpose: 'Clean system', inputs: ['scope', 'rules'], outputs: ['cleanup-report'], semanticMeaning: 'Purification and renewal' }
    ]
  },

  'legend-🔒-protect': {
    name: 'legend-🔒-protect',
    emoji: '🔒',
    category: 'os',
    description: 'Security and protection system',
    purpose: 'Protect and secure data',
    colorCode: 'red',
    numberCode: 36,
    semanticTags: ['protect', 'security', 'lock', 'guard'],
    dependencies: ['legend-🧱-encode'],
    exports: ['protector', 'security-system', 'access-control'],
    position: { layer: 3, order: 10 },
    pages: [
      { name: 'Security Center', path: '/protect', purpose: 'Security management', components: ['SecurityDashboard', 'AccessControl', 'ThreatMonitor'] }
    ],
    functions: [
      { name: 'protect', purpose: 'Protect resource', inputs: ['resource', 'policy'], outputs: ['protected-resource'], semanticMeaning: 'Guardian shield' }
    ]
  },

  'legend-🔄-synch': {
    name: 'legend-🔄-synch', 
    emoji: '🔄',
    category: 'time',
    description: 'Universal synchronization',
    purpose: 'Synchronize all systems',
    colorCode: 'blue',
    numberCode: 33,
    semanticTags: ['sync', 'unify', 'harmonize', 'assimilation'],
    dependencies: ['legend-🎵-sync'],
    exports: ['universal-sync', 'harmonizer'],
    position: { layer: 2, order: 11 },
    pages: [
      { name: 'Sync Control', path: '/synch', purpose: 'Universal sync', components: ['SyncDashboard', 'HarmonyMonitor', 'UnificationControl'] }
    ],
    functions: [
      { name: 'unify', purpose: 'Unify systems', inputs: ['systems'], outputs: ['unified-state'], semanticMeaning: 'All become one' }
    ]
  },

  'legend-📥-import': {
    name: 'legend-📥-import',
    emoji: '📥',
    category: 'os',
    description: 'Data import system',
    purpose: 'Import data from external sources',
    colorCode: 'blue',
    numberCode: 102,
    semanticTags: ['import', 'input', 'receive', 'finger'],
    dependencies: ['legend-core', 'legend-📖-reader'],
    exports: ['importer', 'data-receiver'],
    position: { layer: 3, order: 11 },
    pages: [
      { name: 'Import Manager', path: '/import', purpose: 'Import data', components: ['ImportInterface', 'FormatConverter', 'DataValidator'] }
    ],
    functions: [
      { name: 'import', purpose: 'Import data', inputs: ['source', 'format'], outputs: ['imported-data'], semanticMeaning: 'Bringing in from outside' }
    ]
  },

  'legend-📤-export': {
    name: 'legend-📤-export',
    emoji: '📤',
    category: 'os',
    description: 'Data export system',
    purpose: 'Export data to external formats',
    colorCode: 'orange',
    numberCode: 108,
    semanticTags: ['export', 'output', 'send', 'service'],
    dependencies: ['legend-core', 'legend-🎨-printer'],
    exports: ['exporter', 'data-sender'],
    position: { layer: 3, order: 12 },
    pages: [
      { name: 'Export Manager', path: '/export', purpose: 'Export data', components: ['ExportInterface', 'FormatSelector', 'DeliveryConfig'] }
    ],
    functions: [
      { name: 'export', purpose: 'Export data', inputs: ['data', 'format'], outputs: ['exported-file'], semanticMeaning: 'Sending forth to the world' }
    ]
  },

  'legend-🔨-builders': {
    name: 'legend-🔨-builders',
    emoji: '🔨',
    category: 'other',
    description: 'Construction and building tools',
    purpose: 'Build and construct systems',
    colorCode: 'orange',
    numberCode: 13,
    semanticTags: ['build', 'construct', 'create', 'skill'],
    dependencies: ['legend-core', 'legend-🪡-assembler'],
    exports: ['builder', 'constructor', 'scaffolder'],
    position: { layer: 4, order: 11 },
    pages: [
      { name: 'Builder Tools', path: '/build', purpose: 'Build systems', components: ['BuilderInterface', 'ComponentLibrary', 'ScaffoldGenerator'] }
    ],
    functions: [
      { name: 'build', purpose: 'Build system', inputs: ['blueprint', 'resources'], outputs: ['built-system'], semanticMeaning: 'Creating from nothing' }
    ]
  },

  'legend-📐-architecture': {
    name: 'legend-📐-architecture',
    emoji: '📐',
    category: 'other',
    description: 'System architecture design',
    purpose: 'Design system architectures',
    colorCode: 'purple',
    numberCode: 36,
    semanticTags: ['architecture', 'design', 'structure', 'protection'],
    dependencies: ['legend-core', 'legend-🖼️-frame'],
    exports: ['architect', 'designer', 'planner'],
    position: { layer: 4, order: 12 },
    pages: [
      { name: 'Architecture Studio', path: '/architecture', purpose: 'Design architecture', components: ['ArchitectureCanvas', 'DesignPatterns', 'BlueprintEditor'] }
    ],
    functions: [
      { name: 'design', purpose: 'Design architecture', inputs: ['requirements', 'constraints'], outputs: ['architecture'], semanticMeaning: 'Planning the grand structure' }
    ]
  },

  'legend-🎨-web-design': {
    name: 'legend-🎨-web-design',
    emoji: '🎨',
    category: 'os',
    description: 'Web design system',
    purpose: 'Design web interfaces',
    colorCode: 'pink',
    numberCode: 13,
    semanticTags: ['design', 'web', 'ui', 'skill'],
    dependencies: ['legend-📐-architecture'],
    exports: ['web-designer', 'ui-builder'],
    position: { layer: 5, order: 5 },
    pages: [
      { name: 'Design Studio', path: '/design', purpose: 'Design interfaces', components: ['DesignCanvas', 'ComponentPalette', 'StyleEditor'] }
    ],
    functions: [
      { name: 'design', purpose: 'Design interface', inputs: ['requirements', 'brand'], outputs: ['design'], semanticMeaning: 'Painting with code' }
    ]
  },

  'legend-🔤-fonts': {
    name: 'legend-🔤-fonts',
    emoji: '🔤',
    category: 'os',
    description: 'Font and typography system',
    purpose: 'Manage fonts and typography',
    colorCode: 'blue',
    numberCode: 101,
    semanticTags: ['fonts', 'typography', 'text', 'learning'],
    dependencies: ['legend-core'],
    exports: ['font-manager', 'typography-system'],
    position: { layer: 5, order: 6 },
    pages: [
      { name: 'Font Library', path: '/fonts', purpose: 'Manage fonts', components: ['FontBrowser', 'TypographyPreview', 'FontUploader'] }
    ],
    functions: [
      { name: 'apply', purpose: 'Apply font', inputs: ['text', 'font'], outputs: ['styled-text'], semanticMeaning: 'Giving character to words' }
    ]
  },

  'legend-🧠-memory-modulators': {
    name: 'legend-🧠-memory-modulators',
    emoji: '🧠',
    category: 'brain',
    description: 'Memory modulation system',
    purpose: 'Modulate and adjust memories',
    colorCode: 'purple',
    numberCode: 107,
    semanticTags: ['memory', 'modulate', 'adjust', 'break'],
    dependencies: ['legend-🪐-memory', 'legend-🎛️-modulator'],
    exports: ['memory-modulator', 'memory-adjuster'],
    position: { layer: 3, order: 13 },
    pages: [
      { name: 'Memory Modulation', path: '/memory-mod', purpose: 'Modulate memories', components: ['MemoryModulator', 'AdjustmentControls', 'MemoryViewer'] }
    ],
    functions: [
      { name: 'modulate', purpose: 'Modulate memory', inputs: ['memory-id', 'adjustment'], outputs: ['modulated-memory'], semanticMeaning: 'Reshaping the past' }
    ]
  },

  'legend-📊-plateau-plus': {
    name: 'legend-📊-plateau-plus',
    emoji: '📊',
    category: 'other',
    description: 'Advanced analytics and scaling',
    purpose: 'Scale beyond limits',
    colorCode: 'green',
    numberCode: 23,
    semanticTags: ['plateau', 'scale', 'analytics', 'value-up'],
    dependencies: ['mongoose.os'],
    exports: ['scaler', 'analytics-engine', 'growth-system'],
    position: { layer: 5, order: 7 },
    pages: [
      { name: 'Analytics Dashboard', path: '/plateau', purpose: 'Advanced analytics', components: ['MetricsDashboard', 'GrowthChart', 'ScalingControls'] }
    ],
    functions: [
      { name: 'scale', purpose: 'Scale system', inputs: ['current-state', 'target'], outputs: ['scaled-state'], semanticMeaning: 'Breaking through limits' }
    ]
  },

  'legend-🔐-hash': {
    name: 'legend-🔐-hash',
    emoji: '🔐',
    category: 'os',
    description: 'Hash generation and verification',
    purpose: 'Generate and verify hashes',
    colorCode: 'purple',
    numberCode: 36,
    semanticTags: ['hash', 'crypto', 'verify', 'protect'],
    dependencies: ['legend-🧱-encode'],
    exports: ['hash-generator', 'hash-verifier'],
    position: { layer: 3, order: 14 },
    pages: [
      { name: 'Hash Generator', path: '/hash', purpose: 'Generate hashes', components: ['HashInterface', 'AlgorithmSelector', 'Verifier'] }
    ],
    functions: [
      { name: 'hash', purpose: 'Generate hash', inputs: ['data', 'algorithm'], outputs: ['hash'], semanticMeaning: 'Creating unique fingerprints' }
    ]
  },

  'legend-🖼️-img': {
    name: 'legend-🖼️-img',
    emoji: '🖼️',
    category: 'os',
    description: 'Image processing system',
    purpose: 'Process and manipulate images',
    colorCode: 'purple',
    numberCode: 36,
    semanticTags: ['image', 'visual', 'process', 'protect'],
    dependencies: ['legend-👁️-viewer'],
    exports: ['image-processor', 'image-transformer'],
    position: { layer: 4, order: 13 },
    pages: [
      { name: 'Image Studio', path: '/images', purpose: 'Process images', components: ['ImageEditor', 'FilterGallery', 'TransformControls'] }
    ],
    functions: [
      { name: 'process', purpose: 'Process image', inputs: ['image', 'operations'], outputs: ['processed-image'], semanticMeaning: 'Transforming visual reality' }
    ]
  },

  'legend-⚡-dynamics': {
    name: 'legend-⚡-dynamics',
    emoji: '⚡',
    category: 'quantum',
    description: 'Dynamic system behavior',
    purpose: 'Control system dynamics',
    colorCode: 'yellow',
    numberCode: 68,
    semanticTags: ['dynamics', 'behavior', 'energy', 'power'],
    dependencies: ['legend-core', 'mongoose.os'],
    exports: ['dynamics-engine', 'behavior-controller'],
    position: { layer: 2, order: 12 },
    pages: [
      { name: 'Dynamics Control', path: '/dynamics', purpose: 'Control dynamics', components: ['DynamicsPanel', 'BehaviorEditor', 'SimulationView'] }
    ],
    functions: [
      { name: 'simulate', purpose: 'Simulate dynamics', inputs: ['initial-state', 'rules'], outputs: ['simulation'], semanticMeaning: 'Life in motion' }
    ]
  },

  'legend-🎯-routes': {
    name: 'legend-🎯-routes',
    emoji: '🎯',
    category: 'time',
    description: 'Routing and path optimization',
    purpose: 'Optimize routes and paths',
    colorCode: 'red',
    numberCode: 19,
    semanticTags: ['routes', 'paths', 'optimize', 'fighting-corruption'],
    dependencies: ['legend-🔀-flow', 'legend-🗺️-maps'],
    exports: ['router', 'path-optimizer'],
    position: { layer: 4, order: 14 },
    pages: [
      { name: 'Route Optimizer', path: '/routes', purpose: 'Optimize routes', components: ['RouteCalculator', 'PathVisualizer', 'OptimizationConfig'] }
    ],
    functions: [
      { name: 'optimize', purpose: 'Optimize route', inputs: ['waypoints', 'constraints'], outputs: ['optimized-route'], semanticMeaning: 'Finding the best path' }
    ]
  },

  'legend-🔬-research': {
    name: 'legend-🔬-research',
    emoji: '🔬',
    category: 'brain',
    description: 'Research and investigation system',
    purpose: 'Conduct research and investigations',
    colorCode: 'pink',
    numberCode: 101,
    semanticTags: ['research', 'investigate', 'analyze', 'learning'],
    dependencies: ['mongoose.os', 'legend-📖-reader'],
    exports: ['researcher', 'analyzer', 'investigator'],
    position: { layer: 4, order: 15 },
    pages: [
      { name: 'Research Lab', path: '/research', purpose: 'Conduct research', components: ['ResearchInterface', 'DataAnalyzer', 'ReportGenerator'] }
    ],
    functions: [
      { name: 'investigate', purpose: 'Investigate topic', inputs: ['topic', 'sources'], outputs: ['findings'], semanticMeaning: 'Seeking hidden truth' }
    ]
  },

  'truvio-studios': {
    name: 'truvio-studios',
    emoji: '🎬💰',
    category: 'other',
    description: 'Media production and treasury management',
    purpose: 'Manage media production and track precious metal values',
    colorCode: 'gold',
    numberCode: 92,
    semanticTags: ['media', 'production', 'treasury', 'silver', 'gold', 'value', 'studio'],
    dependencies: ['legend-core', 'legend-💰-money', 'legend-🎬-production'],
    exports: ['media-producer', 'value-tracker', 'studio-manager'],
    musicTheme: {
      primary: 'Money',
      journey: 'Welcome to the Machine',
    },
    position: { layer: 5, order: 16 },
    pages: [
      { 
        name: 'Studio Dashboard', 
        path: '/studio', 
        purpose: 'Manage production and track values', 
        components: ['ProductionQueue', 'MediaLibrary', 'TreasuryTracker', 'SilverPriceDisplay'] 
      },
      {
        name: 'Price Management',
        path: '/prices',
        purpose: 'Track and manage precious metal prices',
        components: ['SilverPriceEditor', 'GoldPriceEditor', 'TreasuryDashboard']
      }
    ],
    functions: [
      { 
        name: 'trackSilverPrice', 
        purpose: 'Display and manage true silver price', 
        inputs: ['current-price', 'device-auth'], 
        outputs: ['displayed-price'], 
        semanticMeaning: 'Displaying true value - editable only by authorized device for presentation logic' 
      },
      {
        name: 'produceMedia',
        purpose: 'Produce and manage media content',
        inputs: ['media-spec', 'production-queue'],
        outputs: ['produced-media'],
        semanticMeaning: 'Creating visual stories and productions'
      }
    ]
  }
}

export { getRepoDefinition, getReposByCategory, getReposByLayer, getRepoDependencyTree, getReposBySemanticTag, getAllRepoNames, getRepoColorCode, getRepoNumberCode, searchRepos } from './repo-registry'

export function getAllExtendedRepoNames(): string[] {
  return Object.keys(EXTENDED_REPO_REGISTRY)
}
