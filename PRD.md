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
  - Badge component for status indicators and categories with vibrant colors
  - Button component for stats triggers and navigation with hover glow effects
  - Dialog component for detailed repository statistics modal with tabs
  - Tabs component for organizing stats, health, and alerts views
  - Tooltip component for displaying full repository information
  - Skeleton component for loading states
  - Avatar component for contributor profiles
  - Progress component for health metric visualization
  - Recharts AreaChart for commit activity trends
  - Alert component for health alerts and error states
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
  - Textarea component for multi-line descriptions
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
- **States**: 
  - Cards: default (subtle glow), hover (bright glow + lift), active (pressed state)
  - Stats button: outline style with hover glow effect
  - Badges: multiple color variants for different repository categories
  - Modal: open/closed with smooth fade and scale transition
  - Charts: animated entry with smooth curve transitions
  - Loading: skeleton screens for async data fetching
  - Terminal: open/closed toggle, processing state with pulsing robot icon
  - Terminal input: enabled/disabled based on processing state
  - Add repo form: pristine/dirty/validating/submitting states
  - Terminal button: highlighted when terminal is open
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
  - XCircle for critical alerts
  - Terminal for terminal chat interface
  - Plus for adding new repositories
  - PaperPlaneRight for sending terminal messages
  - Robot for AI assistant messages
  - User for user messages in chat
  - Sparkle for preview indicators
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
