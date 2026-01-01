# Planning Guide

A unified dashboard interface to visualize, navigate, and interact with the pewpi-infinity quantum computing and time machine system architecture, treating each repository as an interconnected component with mongoose.os serving as the neural core.

**Experience Qualities**: 
1. **Futuristic** - Interface should evoke advanced quantum computing and time-manipulation technology with dynamic visualizations
2. **Interconnected** - Clear visual representation of how components relate to each other in the quantum system
3. **Exploratory** - Easy navigation between repository components with contextual information about each system

**Complexity Level**: Light Application (multiple features with basic state)
  - This is a dashboard with repository navigation, filtering, and visualization features that require state management but doesn't involve heavy data processing

## Essential Features

### Repository Grid Display
- **Functionality**: Display all pewpi-infinity repositories as interactive cards with visual indicators
- **Purpose**: Provide an overview of the entire system architecture at a glance
- **Trigger**: Loads on application start
- **Progression**: App loads → Fetch repos from GitHub → Display as grid cards → User sees all components
- **Success criteria**: All repositories display with names, descriptions, and visual status indicators

### mongoose.os Brain Highlight
- **Functionality**: Special visual treatment for mongoose.os as the system's neural core
- **Purpose**: Emphasize the central role of mongoose.os in the architecture
- **Trigger**: Automatic on load
- **Progression**: System identifies mongoose.os repo → Applies distinct styling → User recognizes it as primary
- **Success criteria**: mongoose.os is visually distinguished from other components

### Repo Navigation
- **Functionality**: Click any repository card to open it in a new tab
- **Purpose**: Enable users to explore individual components
- **Trigger**: User clicks on repository card
- **Progression**: User selects repo → Click detected → Opens GitHub page in new tab → User explores
- **Success criteria**: Clicking any card successfully opens the corresponding GitHub repository

### Component Categorization
- **Functionality**: Group repositories by their quantum computer function (brain, quantum processing, time operations, OS)
- **Purpose**: Organize components by role in the system
- **Trigger**: Automatic filtering based on repository metadata
- **Progression**: App analyzes repos → Categorizes by function → Displays with category labels → User filters
- **Success criteria**: Repositories are logically grouped and users can filter by category

### System Status Overview
- **Functionality**: Display activity metrics for each repository
- **Purpose**: Show which components are actively maintained
- **Trigger**: Loads with repository data
- **Progression**: Fetch repo stats → Calculate activity → Display indicators → User sees health
- **Success criteria**: Each repository shows last update time and activity status

### Real-Time Repository Health Monitoring
- **Functionality**: Continuous monitoring of repository health with multi-dimensional metrics and real-time alerts
- **Purpose**: Proactively identify issues, track repository vitality, and maintain system-wide health awareness
- **Trigger**: Automatic on application load and refresh
- **Progression**: App loads → Fetch repos → Calculate health metrics (commit frequency, issue ratio, staleness, activity trends) → Generate alerts → Display health indicators → User monitors system
- **Success criteria**: Each repository displays health status with visual indicators, health score calculated from multiple metrics, critical alerts trigger toast notifications

### Health Alert System
- **Functionality**: Real-time alert generation based on health thresholds with severity levels (info, warning, critical)
- **Purpose**: Notify users of repositories requiring attention before problems escalate
- **Trigger**: Automatic during health monitoring, alerts shown in dedicated panel and inline on cards
- **Progression**: System analyzes metrics → Detects threshold violations → Generates categorized alerts → Displays in alert panel → User takes action
- **Success criteria**: Alerts properly categorized by severity, critical alerts appear as toast notifications, alert panel shows all active alerts grouped by repository

### Health Metrics Dashboard
- **Functionality**: Detailed health breakdown showing commit frequency, issue health, freshness, and activity trends
- **Purpose**: Provide deep visibility into repository health factors for informed decision-making
- **Trigger**: Displayed in repository statistics modal under "Health" tab
- **Progression**: User opens stats → Switches to Health tab → Views circular overall health gauge → Reviews individual metric bars → Understands health factors
- **Success criteria**: Health dashboard shows overall score with circular gauge, four key indicators with progress bars, color-coded status, metric descriptions

### System Health Overview
- **Functionality**: Aggregate health statistics across all repositories with distribution breakdown
- **Purpose**: Give users bird's-eye view of entire system health at a glance
- **Trigger**: Displays in sidebar when health monitoring is active
- **Progression**: Health data aggregated → Count repos by status → Calculate average score → Display in overview panel → User sees system-wide health
- **Success criteria**: Shows counts of healthy/warning/critical/inactive repos, average health score, system health percentage bar, total alerts count

### Quantum Cockpit Visualization  
- **Functionality**: Interactive 3D space-like visualization showing up to 4 intelligent quantum dots (repos) at a time with automatic rotation, locking, and physics-based interactions
- **Purpose**: Provide an engaging, performance-optimized view of repo coordination without overwhelming the system
- **Trigger**: User switches to Quantum Cockpit view via /K button
- **Progression**: User activates /K → System loads 4 repos into slots → Dots display with star fields and trails → Auto-rotation cycles through repos → User can lock specific slots → Dots interact with physics and connect to center machine
- **Success criteria**: Only 4 dots visible at once preventing crashes, smooth 60fps animation, auto-rotation working, slots lockable, star field effects visible, collision physics functional

### Quantum Slot Management
- **Functionality**: 4 fixed slots that can be individually locked to keep specific repos visible while others rotate
- **Purpose**: Allow users to monitor key repos while cycling through the full set
- **Trigger**: User clicks lock buttons or Shift+Click on dots
- **Progression**: User locks slot → That repo stays fixed → Other unlocked slots continue rotating → Scaffolding shows locked status
- **Success criteria**: Lock persists during rotation, locked dots have gold lock icon, locked slots shown in scaffolding, up to 4 slots can be locked simultaneously

### Cluster Grouping System
- **Functionality**: Intelligent clustering of repositories into coordinated groups based on category, language, activity, or custom rules with visual connections showing relationships
- **Purpose**: Organize repos into meaningful groups that can be viewed as coordinated units, revealing system architecture and relationships
- **Trigger**: User switches to Cluster View via Clusters button in header
- **Progression**: User activates Clusters → System analyzes repos → Creates cluster groups → Positions clusters in orbital pattern → Shows inter-cluster connections → User explores groups → Clicks clusters or individual repos for details
- **Success criteria**: Multiple clusters visible simultaneously, repos positioned within their cluster using formation patterns, cluster connections shown with animated data flow, smooth transitions between formations

### Cluster Formation Types
- **Functionality**: Multiple formation algorithms (Category, Language, Activity, Custom, Auto) that organize repos differently
- **Purpose**: Provide different perspectives on repo organization matching user mental models
- **Trigger**: User selects formation type from sidebar buttons
- **Progression**: User clicks formation button → System recalculates clusters → Repos reorganize → New connections computed → Display updates smoothly
- **Success criteria**: 5 formation types available (Category groups by brain/quantum/time/os, Language groups by programming language, Activity groups by update recency, Custom groups by legend/emoji/stars, Auto adapts to repo count), smooth transitions between formations

### Cluster Positioning & Layout
- **Functionality**: Clusters positioned in orbital pattern around screen center with repos arranged internally using circle/line/grid/spiral formations
- **Purpose**: Create clear visual hierarchy with clusters as primary units and repos as secondary elements
- **Trigger**: Automatic after cluster creation
- **Progression**: Calculate cluster positions → Distribute around center → For each cluster, arrange repos using formation → Apply rotation → Render with animations
- **Success criteria**: Clusters evenly distributed in circle pattern, repos positioned within cluster boundaries, formations adapt to repo count (≤4 circle, ≤9 grid, >9 spiral), smooth rotation animations

### Inter-Cluster Connections
- **Functionality**: Visual connections between related clusters with animated data flow pulses showing relationships
- **Purpose**: Show how clusters relate through shared topics, languages, or categories
- **Trigger**: Automatic connection discovery based on repo metadata
- **Progression**: System analyzes clusters → Finds shared properties → Calculates connection strength → Draws connections with blended colors → Animates data pulses
- **Success criteria**: Connections shown between related clusters, line opacity reflects connection strength, animated pulses flow between clusters, connection color blends both cluster colors

### Cluster Statistics
- **Functionality**: Detailed cluster statistics showing repo count, total stars, languages, last update, and activity status
- **Purpose**: Provide aggregate metrics for entire cluster groups
- **Trigger**: User clicks on cluster area (not individual repo)
- **Progression**: User selects cluster → Stats panel appears → Shows cluster name, emoji, repo count → Displays total/average stars → Lists languages → Shows activity status
- **Success criteria**: Stats panel shows on cluster selection, accurate aggregate calculations, active status based on 30-day threshold, language count displayed

### Cluster Visual Effects
- **Functionality**: Multi-layer glow effects, pulsing animations, rotating energy markers, and labeled overlays
- **Purpose**: Create rich visual representation distinguishing clusters from individual repos
- **Trigger**: Automatic during rendering
- **Progression**: Draw outer glow → Inner glow gradient → Cluster boundary → Rotating energy markers → Emoji center → Name label → Stats label
- **Success criteria**: Distinct glow for each cluster color, pulse animation synchronized, 6 rotating markers around boundary, cluster name and stats clearly readable, selected cluster highlighted

### Semantic Media Placement System
- **Functionality**: Intelligent content library matching media assets (images, videos, music) to repositories based on semantic analysis of keywords, themes, mood, and content
- **Purpose**: Automatically place thematically appropriate backgrounds, videos, and music in machine pages based on repo purpose and content
- **Trigger**: System analyzes repo name, description, and topics against media library metadata
- **Progression**: User views repo → System queries media library → Semantic matching scores content → Top matches displayed → User browses media/music tabs
- **Success criteria**: Media assets correctly matched to repos (Rush for music repos, Creepshow for Truvio Studios, Periodic Table for research/encoding repos), background images automatically selected, music tracks semantically grouped

### Jukebox Component
- **Functionality**: Full-featured music player with vinyl record animation, track queue, volume control, and semantic track matching per repository
- **Purpose**: Provide immersive audio experience with preloaded music appropriate for each machine (Rush 2112 album for music/sync repos)
- **Trigger**: Available in Music tab of repo stats dialog when repo has matched music tracks
- **Progression**: User opens music tab → Jukebox displays with matched tracks → Spinning vinyl animates when playing → User can play/pause/skip → Queue shows all tracks with themes → Track lyrics and metadata displayed
- **Success criteria**: Vinyl animation rotates smoothly when playing, all Rush 2112 tracks loaded with lyrics, track themes and moods displayed, autoplay option works, volume control functional, compact mode available

### Media Gallery Component  
- **Functionality**: Tabbed gallery displaying images, videos, and music with fullscreen preview, semantic tagging, and mood-based organization
- **Purpose**: Showcase repository-specific visual content like album art, movie scenes, diagrams, and video demos with rich metadata
- **Trigger**: Available in Media tab of repo stats dialog when repo has matched media assets
- **Progression**: User opens media tab → Gallery displays organized tabs → Click image/video for fullscreen → Hover shows metadata → Tags indicate mood and themes → Videos play on hover
- **Success criteria**: Creepshow scenes display for production repos, Rush 2112 artwork for music repos, Periodic Table for research repos, fullscreen mode works, video playback functional, semantic tags visible

### Interactive Background System
- **Functionality**: Dynamic background images selected per repository based on semantic content analysis
- **Purpose**: Create immersive, thematically consistent page backgrounds that reflect repo purpose (underwater Creepshow scenes warn of script issues, Rush cosmic imagery for runtime systems)
- **Trigger**: Automatic background selection when viewing individual machine pages
- **Progression**: System analyzes repo → Matches background from media library → Applies with appropriate opacity/blur → User sees themed environment
- **Success criteria**: Backgrounds don't obscure content, opacity/blur applied correctly, theme matches repo category, Creepshow for interactive/storytelling repos, Rush for progressive/quantum systems

### Semantic Content Search
- **Functionality**: Natural language search across media library using keywords, themes, moods, and descriptions with scoring algorithm
- **Purpose**: Allow users to find media by meaning rather than filename (search "rebellion" finds Rush 2112, "underwater horror" finds Creepshow scenes)
- **Trigger**: User enters search query in media browser
- **Progression**: User types query → System tokenizes words → Scores all media against query → Returns ranked results → User browses semantically matched content
- **Success criteria**: Thematic searches work (search "discovery" finds Rush tracks, "investigative" finds Periodic Table), scoring prioritizes exact matches, multi-word queries supported, search works across all metadata fields

### Creepshow Interactive Story
- **Functionality**: Branching narrative game where players read horror/sci-fi story scenes and correct broken code scripts to change story outcomes and prevent bad endings
- **Purpose**: Create engaging interactive storytelling experience combining Creepshow anthology style with code debugging gameplay, linking to Truvio Studios repo theme
- **Trigger**: User clicks "Story" button in header navigation to switch to Creepshow view
- **Progression**: User reads scene → Discovers broken script → Must correct code to unlock good path → Wrong corrections lead to drowning/bad endings → Correct fixes advance story → Multiple endings based on correction choices → Progress tracked and persisted
- **Success criteria**: Full branching story with 15+ nodes, underwater drowning sequences when scripts fail, script correction interface with textarea editor, show/hide correct answer hints, multiple endings (drowned, forgotten, grateful, perfect, heroic, transcendent), progress tracking (scenes visited, corrections made, failures, endings found), animations and visual effects for scene transitions, state persistence using useKV

### Script Correction Mechanics
- **Functionality**: Code editing interface where players must fix broken JavaScript/TypeScript snippets to advance story safely
- **Purpose**: Gamify debugging and code review skills while driving narrative outcomes - correct scripts save characters, wrong scripts cause catastrophic failures
- **Trigger**: Story node contains brokenScript property, textarea appears with pre-filled broken code
- **Progression**: Player sees broken script → Edits in textarea → Chooses "correct script" option → System validates against correctScript → Success unlocks safe path, failure increases failure count and may trigger underwater sequence
- **Success criteria**: Exact string matching for validation, syntax highlighting in monospace font, show/hide correct answer button, visual feedback on success (green toast) and failure (red toast), script corrections unlock alternate story paths

### Drowning Sequence System
- **Functionality**: Visual and narrative consequence when players fail script corrections - screen adds underwater blue filter, water-themed scene descriptions, character struggles in flooded environment
- **Purpose**: Create tension and stakes for script corrections, memorable consequence for mistakes that motivates replaying to achieve better outcome
- **Trigger**: Navigating to story node with outcome='bad' and id containing 'underwater'
- **Progression**: Player makes wrong choice → Node loads → Underwater filter applies → Blue gradient overlays screen → Drowning scene description displays → Player must attempt rescue correction or accept dark ending
- **Success criteria**: Blue gradient overlay with pulse animation, underwater CSS filter effects, emergency correction opportunities in drowning scenes, rescue possible through correct script rewrite, complete drowning ending if no rescue attempted

### Story Progress Tracking
- **Functionality**: Persistent tracking of player's journey through story including visited nodes, correction stats, and endings discovered
- **Purpose**: Encourage replayability by showing progress toward discovering all paths and endings
- **Trigger**: Automatic tracking throughout gameplay, displayed in stats cards at top of story view
- **Progression**: Player makes choice → Visit node → Stats update → useKV persists progress → Display refreshes → Player sees updated counts
- **Success criteria**: Tracks scenes visited count, successful corrections count, failures count, unique endings discovered, progress percentage bar, stats persist across sessions, restart button clears progress

### Story Branching System
- **Functionality**: Non-linear narrative with 15+ interconnected nodes offering 2-3 choices per scene leading to 6 different endings
- **Purpose**: Create replayable experience where player decisions and code corrections dramatically alter story outcome
- **Trigger**: Player selects choice button at bottom of each scene
- **Progression**: Read scene → Make choice → Next node loads with animation → New scene appears → Repeat until ending reached
- **Success criteria**: Minimum 6 distinct endings (drowned, forgotten, grateful, perfect, heroic, transcendent), multiple paths to reach each ending, safe vs dangerous routes based on corrections, meta-narrative elements (scientist breaks fourth wall), smooth scene transitions with framer-motion

### AI-Powered Music Matching System
- **Functionality**: Intelligent music curation system that automatically selects the perfect soundtrack for each machine/repository based on its journey, themes, and purpose using AI analysis
- **Purpose**: Create an immersive musical experience that deepens the emotional connection to each machine component and enhances the quantum system's narrative
- **Trigger**: User opens repository stats/details dialog with Music tab, or floating jukebox loads
- **Progression**: System analyzes repo name, description, emoji semantics → AI matches against available tracks considering themes, mood, lyrical content → Best track selected as starting song → Jukebox displays AI-matched track → User can play or browse full queue
- **Success criteria**: AI correctly identifies thematic connections (e.g., "Welcome to the Machine" for robot-core, "Shine On You Crazy Diamond" for star/multistar repos), shows "🤖 AI Match" badge on selected tracks, provides full jukebox queue of related songs, handles gracefully when no music links available yet

### Musical Journey Integration
- **Functionality**: Curated music library with tracks semantically mapped to machine types, with special mappings like "Shine On You Crazy Diamond" for shining star repos (✨⭐💫) and "Welcome to the Machine" for automation/system repos
- **Purpose**: Enrich the dashboard experience with thematic music that reflects each machine's purpose and the user's journey through the quantum system
- **Trigger**: Automatic on page load (floating jukebox) or when opening repository details
- **Progression**: User navigates system → Floating jukebox appears → Shows current machine's theme song → Can expand for full controls → Queue shows all related tracks → Can switch repos to hear different machine themes
- **Success criteria**: Pink Floyd and Rush catalogs integrated with thematic mappings, archive.org links for actual audio playback, floating jukebox with compact/expanded states, auto-play option per machine, visual audio controls with rotating disc animation, volume controls, next machine suggestion in queue

### Floating Jukebox Player
- **Functionality**: Persistent music player that floats at bottom-right of screen, showing current track for active machine with expand/collapse controls
- **Purpose**: Provide continuous musical accompaniment without disrupting workflow, allow quick access to music controls
- **Trigger**: Appears on page load, updates when switching between machines/views
- **Progression**: Jukebox loads → AI selects starting track for current machine → Shows compact view with track info → User can expand for full controls → Switch tracks or toggle play → Minimize or hide entirely
- **Success criteria**: Sticky positioning at bottom-right, compact mode shows just track name/artist/play button, expanded mode shows full controls with queue, smooth animations between states, can be dismissed and re-opened, persists view preference

### Music Library & Semantic Matching
- **Functionality**: Comprehensive music database with tracks tagged by themes, mood, and suggested repositories, plus semantic search function
- **Purpose**: Enable intelligent music discovery and automatic soundtrack generation for each machine
- **Trigger**: System loads music library on initialization, used by AI matcher
- **Progression**: Library defines tracks with metadata → Semantic matching scores tracks against repo attributes → AI refines selection → Best matches suggested → User experiences thematically perfect soundtrack
- **Success criteria**: Library includes Pink Floyd (Wish You Were Here, The Wall, Dark Side of the Moon, Meddle) and Rush (2112), each track tagged with themes/mood/repos, URL field for audio sources, semantic matcher returns relevant tracks, fallback gracefully when no matches

### Intelligent Rotation System
- **Functionality**: Automatic cycling through repos with adjustable speed, respecting locked slots
- **Purpose**: Show all repos over time without performance degradation
- **Trigger**: Automatic when more than 4 repos exist and not paused
- **Progression**: System identifies unlocked slots → Rotates repos through them → Speed adjustable 0.1x-3x → Pauses when all slots locked
- **Success criteria**: Smooth transitions between repos, speed control works, locked slots don't rotate, current index visible in UI

### Quantum Scaffolding
- **Functionality**: Visual guide showing 4 slot positions with connection lines to center machine
- **Purpose**: Help users understand slot layout and repo positioning
- **Trigger**: Toggle via Scaffolding button
- **Progression**: User enables scaffolding → Slot circles appear → Connection lines to center visible → Slot numbers labeled → Lock status shown
- **Success criteria**: Scaffolding toggleable, slots clearly marked, locked slots shown in gold, unlocked in blue

### Space-like Particle Effects
- **Functionality**: Each quantum dot has surrounding star field (30 stars) with twinkling and trail effects
- **Purpose**: Create immersive space environment and visual richness
- **Trigger**: Automatic with particle rendering
- **Progression**: Stars positioned around dot → Brightness pulsates → Movement creates trails → Trails fade over time
- **Success criteria**: Stars twinkle realistically, trails follow movement, no performance impact, outer glow extends beyond emoji

### Real-Time Repository Statistics
- **Functionality**: Interactive statistics modal showing detailed repository metrics with health tabs
- **Purpose**: Provide deep insights into repository health, activity, and contributor engagement
- **Trigger**: User clicks "Stats" button on any repository card
- **Progression**: User clicks Stats → Modal opens with tabs (Overview, Health, Alerts) → Fetch detailed stats from GitHub API → Display visualizations → User explores metrics
- **Success criteria**: Modal displays commit activity chart, top contributors, language breakdown, key statistics, health monitoring dashboard, and active alerts

### Commit Activity Visualization
- **Functionality**: Interactive area chart showing 12-week commit history
- **Purpose**: Visualize repository activity trends over time
- **Trigger**: Displayed in statistics modal
- **Progression**: Fetch commit data → Process weekly totals → Render area chart → User sees trends
- **Success criteria**: Chart displays accurate weekly commit counts with smooth animations and interactive tooltips

### Contributors Display
- **Functionality**: Ranked list of top contributors with avatars and commit counts
- **Purpose**: Highlight team members driving repository development
- **Trigger**: Displayed in statistics modal
- **Progression**: Fetch contributors → Sort by contributions → Display with avatars → User can click to view profiles
- **Success criteria**: Shows top contributors with clickable GitHub profile links

### Language Statistics
- **Functionality**: Visual breakdown of programming languages used in repository
- **Purpose**: Show technical composition of each component
- **Trigger**: Displayed in statistics modal
- **Progression**: Fetch language data → Calculate percentages → Display with progress bars → User understands codebase
- **Success criteria**: Displays language distribution with color-coded bars and accurate percentages

### Search and Filter Repositories
- **Functionality**: Real-time text search across repository names, descriptions, and topics with instant results
- **Purpose**: Help users quickly locate specific components in the quantum system
- **Trigger**: User types in search input field
- **Progression**: User enters text → Filter repositories in real-time → Display matching results → Show result count
- **Success criteria**: Search filters across name, description, and topics fields with accurate result count display

### Sort Repositories
- **Functionality**: Sort repositories by name, last updated date, star count, or programming language
- **Purpose**: Allow users to organize components by different criteria for better discovery
- **Trigger**: User selects sort option from dropdown or toggles sort direction
- **Progression**: User selects sort criteria → Choose ascending/descending → Repositories reorder → User sees sorted list
- **Success criteria**: Repositories sort correctly by selected field with visual indication of sort direction (arrow icon)

### View Mode Toggle
- **Functionality**: Switch between grid view (cards) and compact list view for repository display
- **Purpose**: Allow users to choose their preferred viewing density - spacious grid for visual browsing or compact list for scanning many items
- **Trigger**: User clicks grid or list icon button in view toggle control
- **Progression**: User selects view mode → Layout switches instantly → Preference persists across sessions → User sees repositories in chosen format
- **Success criteria**: Both grid and list views display all repository information appropriately, view preference persists using useKV storage

### Emoji-Based Filtering
- **Functionality**: Interactive emoji filter allowing users to select legend icons to narrow repository display
- **Purpose**: Enable quick visual filtering based on the emoji legend system
- **Trigger**: User clicks emoji badges in the emoji filter panel
- **Progression**: User selects emojis → Repositories filter to show only matching ones → Result count updates → User sees filtered set
- **Success criteria**: Filtering works across all repo emoji mappings, multiple emojis can be selected, clear filter button resets selection

### Terminal Chat Interface
- **Functionality**: Interactive AI-powered terminal for chatting with the system and executing commands
- **Purpose**: Provide a command-line style interface for system interaction, repo creation, and AI assistance
- **Trigger**: User clicks "Terminal" button in header to show/hide terminal panel
- **Progression**: User opens terminal → Types commands or messages → System processes input → AI or command handler responds → User sees results in chat history
- **Success criteria**: Terminal supports slash commands (/help, /create, /status, /repos, /sync), integrates with Spark LLM API for natural language queries, maintains conversation history, shows typing indicators

### Add New Repository
- **Functionality**: Dialog interface for creating new repositories with metadata and legend integration, backed by GitHub API authentication
- **Purpose**: Enable users to add new machine components to the quantum system architecture directly from the dashboard
- **Trigger**: User clicks "Add Machine" button in header or uses terminal `/create` command
- **Progression**: User authenticates with GitHub → Opens dialog/terminal → Enters name, description, category, emoji → Submit → GitHub API creates repository → Success notification → Repo list refreshes → New component appears
- **Success criteria**: Form validates required fields, supports all component categories, emoji picker with legend options, GitHub authentication required before creation, actual repository created on GitHub with proper topics/metadata

### GitHub Authentication
- **Functionality**: Secure authentication with GitHub using personal access token for repository creation
- **Purpose**: Enable users to create real repositories on GitHub directly from the dashboard
- **Trigger**: User clicks "Authenticate with GitHub" button in sidebar
- **Progression**: User opens auth panel → Clicks authenticate → Enters GitHub personal access token → Token stored securely → System verifies token → Shows connected status with username → User can now create repos
- **Success criteria**: Token stored in KV storage with encryption, authentication status persists across sessions, shows connected username, allows disconnection, validates token on entry, requires 'repo' scope permissions

### Terminal Repository Creation
- **Functionality**: Create repositories through terminal commands with natural language or slash commands
- **Purpose**: Provide command-line style interface for power users to quickly spin up new components
- **Trigger**: User types `/create <name>` or natural language like "create legend-🎵-sync quantum processor"
- **Progression**: User types command → Terminal parses name and metadata → Checks authentication status → Calls GitHub API → Repository created → Terminal shows success with link → Repo list auto-refreshes
- **Success criteria**: Supports `/create <name>` command format, extracts category/emoji from context, requires GitHub authentication, shows clear error if not authenticated, provides repo URL after creation, handles errors gracefully

## Edge Case Handling
- **Creepshow Story State Loss**: If KV storage fails, default to start node with fresh progress rather than breaking
- **Invalid Script Input**: Handle scripts with extra whitespace or formatting differences gracefully in validation
- **Rapid Choice Clicking**: Debounce choice buttons to prevent double-navigation through story nodes
- **Story Node Not Found**: Fallback to start node if corrupted currentNodeId in saved progress
- **Empty Script Textarea**: Allow proceeding without correction on non-required paths, only enforce on requiresCorrection choices
- **Browser Back Button**: Story progress managed by state, back button doesn't break navigation
- **Long Story Sessions**: Auto-save progress frequently to prevent data loss on crashes
- **API Rate Limiting**: Display cached data with a refresh timestamp when GitHub API limits are hit
- **Authentication Required**: Show clear messaging when repo creation attempted without GitHub authentication, guide users to authenticate
- **Invalid Repository Names**: Validate repository names before submission (alphanumeric, hyphens, no spaces), show helpful error messages
- **Duplicate Repository Names**: Handle 422 error from GitHub API, inform user that name already exists
- **Token Expiration**: Detect 401 errors, prompt user to re-authenticate with fresh token
- **Missing Repositories**: Show placeholder cards with "Repository private or unavailable" message
- **Network Failure**: Display graceful offline message with last cached data if available
- **Empty Organization**: Show onboarding message if no repositories are found
- **Long Repository Names**: Truncate with ellipsis and show full name in tooltip
- **Stats Loading Delay**: GitHub stats API returns 202 status while computing - show loading skeleton until ready
- **No Commit Activity**: Display friendly message when repository has no commit history
- **Private Contributors**: Handle cases where contributor data is restricted
- **No Search Results**: Display friendly message when search query returns no matching repositories
- **Sort with Empty Fields**: Handle repositories with missing data (null language, no stars) by placing them at the end of sorted lists
- **Health Metrics Failure**: Gracefully handle when individual repo health metrics fail to load, continue monitoring others
- **No Alerts State**: Show encouraging "all systems healthy" message when no alerts are present
- **Stale Health Data**: Health metrics refresh on page reload, indicate monitoring is real-time on page load
- **Terminal Empty Input**: Disable send button when input is empty or only whitespace
- **Terminal LLM Failure**: Fall back to showing available commands when AI is unavailable
- **Terminal Command Parsing**: Handle typos in commands gracefully with suggestions
- **Add Repo Form Validation**: Validate repository name format (kebab-case recommended), prevent duplicate names
- **Add Repo Without GitHub Auth**: Display informative message that actual GitHub creation requires authentication
- **Repository Name Conflicts**: Check for existing repository names before allowing creation
- **AI Music Matching Failure**: Fall back to first available track for repo when AI service unavailable
- **No Music URL Available**: Show "Link Pending" badge and disable play button until audio source added
- **Audio Playback Errors**: Handle CORS issues, network failures, and unsupported formats gracefully with error messages
- **Jukebox Without Repo Context**: Show general music library when no specific machine selected
- **Empty Music Library**: Gracefully handle case where no tracks are available with friendly message
- **Floating Jukebox Persistence**: Remember user's show/hide and expand/collapse preferences across sessions

## Design Direction
The design should evoke a vibrant retro gaming aesthetic with Nintendo-inspired colors, playful emoji system integration, and high-contrast elements against dark backgrounds. The interface should feel like an engaging, colorful command center with personality - combining technical precision with visual delight through bold color choices and emoji-based visual language.

## Color Selection
A vibrant, multi-color scheme inspired by retro gaming and modern tech interfaces, with high-contrast colors against dark backgrounds for maximum engagement and readability.

- **Primary Color**: Electric Blue (oklch(0.60 0.25 250)) - Represents core computing and primary actions
- **Accent Color**: Bright Cyan (oklch(0.80 0.20 200)) - For highlighting active states and important elements
- **Secondary Colors**: Deep Purple/Indigo backgrounds (oklch(0.30 0.15 280)) for depth and visual interest
- **Emoji Color System**:
  - 🟧 Orange (oklch(0.70 0.18 50)): CEO decisions/important choices
  - 🟦 Blue (oklch(0.60 0.25 250)): Input needed
  - 🟥 Red (oklch(0.60 0.24 25)): Routes/paths available
  - 🟪 Purple (oklch(0.55 0.22 290)): Assimilation/integration
  - 🟨 Yellow (oklch(0.85 0.15 90)): Data extraction
  - 🟩 Green (oklch(0.65 0.20 145)): Engineering/tools
  - 🌸 Pink (oklch(0.70 0.20 350)): Investigative
  - 💎 Gold (oklch(0.75 0.15 80)): Value/authority elements
- **Foreground/Background Pairings**: 
  - Primary (Electric Blue oklch(0.60 0.25 250)): White text (oklch(0.98 0 0)) - Ratio 8.2:1 ✓
  - Accent (Bright Cyan oklch(0.80 0.20 200)): Dark text (oklch(0.15 0 0)) - Ratio 12.1:1 ✓
  - Background (Deep Purple oklch(0.30 0.15 280)): Light text (oklch(0.95 0.01 280)) - Ratio 12.5:1 ✓
  - Orange (oklch(0.70 0.18 50)): White text (oklch(0.98 0 0)) - Ratio 7.8:1 ✓
  - Yellow (oklch(0.85 0.15 90)): Dark text (oklch(0.15 0 0)) - Ratio 14.2:1 ✓

## Font Selection
Typefaces should convey precision, technology, and futurism - monospace for technical accuracy with a modern sans-serif for readability.

- **Typographic Hierarchy**: 
  - H1 (Dashboard Title): Orbitron Bold/36px/tight letter-spacing (0.02em)
  - H2 (Section Headers): Space Grotesk SemiBold/24px/normal letter-spacing
  - H3 (Card Titles): JetBrains Mono Bold/18px/wide letter-spacing (0.05em)
  - Body (Descriptions): Inter Regular/14px/relaxed line-height (1.6)
  - Labels (Metadata): JetBrains Mono Medium/12px/normal letter-spacing

## Animations
Animations should be playful yet purposeful, drawing inspiration from retro gaming - bouncing elements, pulsing glows, gentle floating effects, and smooth color transitions. The emoji elements should have subtle glow effects. Cards should scale up slightly on hover for tactile feedback. All animations should feel responsive and delightful without being distracting, maintaining Nintendo-era charm with modern smoothness.

## Component Selection
- **Components**: 
  - Card component for repository display with custom hover effects and emoji integration
  - Card component for story scene display with gradient backgrounds and outcome-based borders
  - Badge component for status indicators and categories with vibrant colors
  - Badge component for story scene labels with accent color
  - Button component for stats triggers and navigation with hover glow effects
  - Button component for story choices with gradient backgrounds (green for correction paths, primary for regular)
  - Dialog component for detailed repository statistics modal with tabs
  - Tabs component for organizing stats, health, and alerts views
  - Tooltip component for displaying full repository information
  - Skeleton component for loading states
  - Avatar component for contributor profiles
  - Progress component for health metric visualization
  - Progress component for story progress percentage bar
  - Recharts AreaChart for commit activity trends
  - Alert component for health alerts, error states, and story outcome notifications
  - Textarea component for script correction code editing with monospace font
  - Input component for search functionality with icon prefix
  - Select component for sort options dropdown
  - ScrollArea component for alert panel scrolling
  - Custom ViewToggle component with grid/list mode buttons
  - Custom HealthIndicator component with animated status icons
  - Custom CircularGauge for overall health scores
  - Custom HealthOverview for aggregate system health
  - Custom AlertPanel for health alert management
  - Custom LegendPanel for emoji color code display
  - Custom TerminalChat component for AI-powered command interface
  - Custom AddRepoDialog for repository creation workflow
  - Custom CreepshowStory component for interactive branching narrative with script correction gameplay
  - Custom Jukebox component for music playback with queue, volume controls, and AI-matched tracks
  - Custom FloatingJukebox component for persistent music player with expand/collapse states
  - Textarea component for multi-line descriptions
  - AnimatePresence from framer-motion for scene transitions
- **Customizations**: 
  - Custom grid layout with CSS Grid for responsive repository cards
  - Custom list layout with compact horizontal repository items
  - Animated background with SVG patterns simulating circuit boards and colorful gradient orbs
  - Custom repository card with glowing border effects, emoji integration, and hover scale animations
  - Custom repository list item with horizontal layout optimized for scanning and emoji display
  - mongoose.os special card with pulsing animation and distinctive styling with bouncing emoji
  - Full-screen statistics modal with glassmorphic backdrop and tabbed navigation
  - Interactive area chart with custom color gradients matching theme
  - Contributor cards with hover effects and click-to-profile functionality
  - View toggle button group with active state highlighting
  - Health indicator with animated heart icons (healthy/warning/critical/inactive states)
  - Circular gauge with animated fill and glow effects for health scores
  - Health overview panel with status counts and aggregate metrics
  - Alert panel with severity-based color coding and grouping by repository
  - Toast notifications for critical health alerts
  - Emoji legend panel displaying color code system with vibrant styling
  - Repository cards with emoji-based visual identification using custom glow effects
  - Terminal chat with message bubbles, role-based colors, and scrollable history
  - Add repo dialog with real-time preview and emoji grid selector
  - Command suggestions and help text in terminal footer
  - Gradient buttons for primary actions (Add Machine, Send message)
  - Creepshow story full-page layout with film grain pattern backgrounds
  - Story cards with outcome-based border colors (red for bad, green for good, purple for neutral)
  - Underwater drowning effect with blue gradient overlay and pulse animation
  - Script correction interface with syntax-highlighted textarea (monospace JetBrains Mono font)
  - Show/hide correct answer button with animated reveal
  - Story stats grid showing visited scenes, corrections, failures, endings discovered
  - Story choice buttons with distinct styling for correction paths vs regular choices
  - Scene transition animations with slide effect using framer-motion
  - Progress bar showing story completion percentage
  - Large emoji display for story scene icons with glow effect
  - Jukebox with rotating disc animation synchronized to playback
  - Jukebox compact mode with minimal track display and single play button
  - Jukebox expanded mode with full queue, volume slider, skip controls
  - AI Match badge showing intelligently selected tracks
  - Link Pending badge for tracks without audio URLs yet
  - Floating jukebox with sticky bottom-right positioning and minimize/expand animations
- **States**: 
  - Cards: default (subtle glow), hover (bright glow + lift), active (pressed state)
  - Story cards: outcome-based borders (bad=red glow, good=green glow, neutral=purple), underwater effect on drowning scenes
  - Stats button: outline style with hover glow effect
  - Badges: multiple color variants for different repository categories
  - Modal: open/closed with smooth fade and scale transition
  - Charts: animated entry with smooth curve transitions
  - Loading: skeleton screens for async data fetching
  - Terminal: open/closed toggle, processing state with pulsing robot icon
  - Terminal input: enabled/disabled based on processing state
  - Add repo form: pristine/dirty/validating/submitting states
  - Terminal button: highlighted when terminal is open
  - Story view: active when "Story" button selected in header
  - Script textarea: editable/read-only, shows broken code initially
  - Correct answer: hidden/shown toggle state
  - Story progress: persistent across sessions via useKV
  - Choice buttons: enabled/disabled, hover with gradient intensification
  - Scene transitions: enter/exit animations with motion.div
  - Jukebox: compact/expanded, playing/paused, loading AI match
  - Audio playback: playing/paused/buffering/error states
  - Floating jukebox: visible/hidden, minimized/expanded, persists preferences
  - Music tracks: available (has URL)/pending (no URL yet)
- **Icon Selection**: 
  - Brain icon (phosphor) for mongoose.os
  - Atom icon for quantum components
  - Clock/Timer for time machine elements
  - Gear for operating system
  - ArrowSquareOut for external links
  - GitBranch for repository indicators
  - GitCommit for commit activity
  - ChartLine for statistics trigger and health monitoring
  - Users for contributors
  - Code for programming languages
  - Star for stargazers
  - Eye for watchers
  - Warning for issues and warning alerts
  - FileCode for repository size
  - MagnifyingGlass for search input
  - ArrowUp/ArrowDown for sort direction toggle
  - SquaresFour for grid view mode
  - List for list view mode
  - Bell for alerts and notifications
  - Heart (filled) for healthy status
  - HeartBreak for critical status
  - CircleDashed for inactive status
  - Lightning for commit frequency metric
  - TrendUp for activity trends
  - Info for informational alerts
  - XCircle for critical alerts and script errors
  - CheckCircle for successful corrections and good outcomes
  - Terminal for terminal chat interface
  - Plus for adding new repositories
  - PaperPlaneRight for sending terminal messages
  - Robot for AI assistant messages
  - User for user messages in chat
  - Sparkle for preview indicators
  - FilmStrip for Creepshow story mode and scene indicators
  - Skull for bad/death endings
  - ArrowRight for story choice navigation
  - ArrowCounterClockwise for restart story button
  - MusicNotes for music/jukebox features
  - Play for audio playback start
  - Pause for audio playback pause
  - SkipForward/SkipBack for track navigation
  - SpeakerHigh/SpeakerSlash for volume controls
  - Queue for jukebox queue display
  - Circle for spinning disc in jukebox
  - CaretUp/CaretDown for floating jukebox expand/collapse
- **Spacing**: 
  - Card grid: gap-6 for desktop, gap-4 for mobile
  - Card padding: p-6 for consistent internal spacing
  - Section margins: mb-8 between major sections
  - Modal content: space-y-6 for vertical rhythm
  - Stats grid: gap-4 for metric cards
  - Container padding: px-4 sm:px-6 lg:px-8 for responsive edge spacing
  - Terminal message spacing: space-y-4 for conversation flow
  - Terminal padding: p-4 for comfortable chat interface
  - Add repo form spacing: space-y-6 for clear section separation
- **Mobile**: 
  - Single column card layout on mobile (<768px)
  - Two columns on tablet (768-1024px)
  - Three to four columns on desktop (>1024px)
  - List view always single column on all screen sizes for optimal readability
  - Full-width modal on mobile with scrollable content
  - Stats grid adapts to 2 columns on mobile, 5 on desktop
  - Collapsible filter tabs on mobile with hamburger-style menu
  - Touch-optimized card sizes with minimum 44px touch targets
  - Responsive chart sizing with proper aspect ratios
  - View toggle visible on all screen sizes with responsive label visibility
  - Terminal chat full-width on mobile with fixed height and scrolling
  - Add repo dialog adapts to full-screen on mobile devices
  - Terminal and Add Machine buttons stack on very small screens
  - Message bubbles max-width adjusted for mobile readability
  - Creepshow story full-width on mobile with single column layout
  - Story stats grid stacks to 2x2 on mobile instead of 4 columns
  - Script textarea full-width with comfortable height on mobile
  - Story choice buttons full-width on mobile with clear touch targets
  - Header view toggle buttons wrap on very small screens with Story button prioritized
