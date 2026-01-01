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

## Edge Case Handling
- **API Rate Limiting**: Display cached data with a refresh timestamp when GitHub API limits are hit
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

## Design Direction
The design should evoke a high-tech quantum computing interface with neural network aesthetics - think glowing connections, circuit board patterns, and time-space distortion effects. The interface should feel like controlling an advanced scientific instrument.

## Color Selection
A cybernetic color scheme with electric blues, deep purples, and neon accents representing quantum states and neural pathways.

- **Primary Color**: Deep Electric Blue (oklch(0.55 0.24 250)) - Represents quantum computing and data processing power
- **Secondary Colors**: Dark Purple (oklch(0.25 0.12 280)) for backgrounds, creating depth and mystery of quantum mechanics
- **Accent Color**: Neon Cyan (oklch(0.75 0.18 200)) - For highlighting active states and connections, representing energy flow
- **Foreground/Background Pairings**: 
  - Primary (Deep Electric Blue oklch(0.55 0.24 250)): White text (oklch(0.98 0 0)) - Ratio 8.2:1 ✓
  - Accent (Neon Cyan oklch(0.75 0.18 200)): Dark text (oklch(0.15 0 0)) - Ratio 12.1:1 ✓
  - Background (Dark Purple oklch(0.25 0.12 280)): Light text (oklch(0.92 0 0)) - Ratio 11.8:1 ✓

## Font Selection
Typefaces should convey precision, technology, and futurism - monospace for technical accuracy with a modern sans-serif for readability.

- **Typographic Hierarchy**: 
  - H1 (Dashboard Title): Orbitron Bold/36px/tight letter-spacing (0.02em)
  - H2 (Section Headers): Space Grotesk SemiBold/24px/normal letter-spacing
  - H3 (Card Titles): JetBrains Mono Bold/18px/wide letter-spacing (0.05em)
  - Body (Descriptions): Inter Regular/14px/relaxed line-height (1.6)
  - Labels (Metadata): JetBrains Mono Medium/12px/normal letter-spacing

## Animations
Animations should reinforce the quantum computing theme with subtle particle effects, glowing pulses on hover, and smooth morphing transitions between states. Cards should have a gentle floating effect. Connections between the mongoose.os brain and other components should pulse with energy. All animations should be performant and non-distracting.

## Component Selection
- **Components**: 
  - Card component for repository display with custom hover effects
  - Badge component for status indicators and categories
  - Button component for stats triggers and navigation
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
- **Customizations**: 
  - Custom grid layout with CSS Grid for responsive repository cards
  - Custom list layout with compact horizontal repository items
  - Animated background with SVG patterns simulating circuit boards and neural connections
  - Custom repository card with glowing border effects using box-shadow and health indicators
  - Custom repository list item with horizontal layout optimized for scanning
  - mongoose.os special card with pulsing animation and distinctive styling
  - Full-screen statistics modal with glassmorphic backdrop and tabbed navigation
  - Interactive area chart with custom color gradients matching theme
  - Contributor cards with hover effects and click-to-profile functionality
  - View toggle button group with active state highlighting
  - Health indicator with animated heart icons (healthy/warning/critical/inactive states)
  - Circular gauge with animated fill and glow effects for health scores
  - Health overview panel with status counts and aggregate metrics
  - Alert panel with severity-based color coding and grouping by repository
  - Toast notifications for critical health alerts
- **States**: 
  - Cards: default (subtle glow), hover (bright glow + lift), active (pressed state)
  - Stats button: outline style with hover glow effect
  - Badges: multiple color variants for different repository categories
  - Modal: open/closed with smooth fade and scale transition
  - Charts: animated entry with smooth curve transitions
  - Loading: skeleton screens for async data fetching
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
- **Spacing**: 
  - Card grid: gap-6 for desktop, gap-4 for mobile
  - Card padding: p-6 for consistent internal spacing
  - Section margins: mb-8 between major sections
  - Modal content: space-y-6 for vertical rhythm
  - Stats grid: gap-4 for metric cards
  - Container padding: px-4 sm:px-6 lg:px-8 for responsive edge spacing
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
