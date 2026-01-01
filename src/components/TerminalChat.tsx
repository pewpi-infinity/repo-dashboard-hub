import { useState, useRef, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { Terminal, PaperPlaneRight, Robot, User, Lightning, CheckCircle, XCircle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { CategorizedRepo, ComponentCategory } from '@/lib/types'
import { createRepository, isAuthenticated } from '@/lib/github-api'
import { toast } from 'sonner'
import { systemNavigator, getRepoInfo } from '@/lib/system-navigator'
import { getAllExtendedRepoNames, getRepoDefinition } from '@/lib/extended-repo-registry'

declare const spark: {
  llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string
  llm: (prompt: string, model?: string) => Promise<string>
}

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  repoContext?: string
}

interface TerminalChatProps {
  repos: CategorizedRepo[]
  isAuthenticated: boolean
  onCreateRepo?: (repoData: {
    name: string
    description: string
    category: ComponentCategory
    emoji: string
    isPrivate: boolean
  }) => void
  onRepoCreated?: () => void
}

export function TerminalChat({ repos, isAuthenticated: authStatus, onCreateRepo, onRepoCreated }: TerminalChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: '👑 Legend Terminal Online. Quantum System Ready. Type commands or chat to build.',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const extractRepoDetails = (input: string) => {
    const lowerInput = input.toLowerCase()
    
    const categoryMap: Record<string, ComponentCategory> = {
      'brain': 'brain',
      'quantum': 'quantum',
      'time': 'time',
      'os': 'os',
      'operating': 'os'
    }
    
    let detectedCategory: ComponentCategory = 'other'
    for (const [key, value] of Object.entries(categoryMap)) {
      if (lowerInput.includes(key)) {
        detectedCategory = value
        break
      }
    }

    const emojiMatch = input.match(/([\u{1F300}-\u{1F9FF}])/u)
    const detectedEmoji = emojiMatch ? emojiMatch[1] : '🧱'

    return { category: detectedCategory, emoji: detectedEmoji }
  }

  const createRepoFromCommand = async (repoName: string, fullInput: string) => {
    if (!authStatus) {
      return {
        role: 'system' as const,
        content: '⚠️ GitHub authentication required to create repositories. Please authenticate in the sidebar first.',
        success: false
      }
    }

    try {
      const { category, emoji } = extractRepoDetails(fullInput)
      const description = `Legend ${category} component ${emoji}`

      toast.info(`🧱 Creating repository: ${repoName}...`)

      const newRepo = await createRepository({
        name: repoName,
        description,
        isPrivate: false,
        topics: ['legend-system', `category-${category}`],
        category,
        emoji
      })

      onRepoCreated?.()

      return {
        role: 'system' as const,
        content: `✅ Repository created successfully!\n\n🧱 ${newRepo.name}\n📝 ${newRepo.description}\n🔗 ${newRepo.html_url}\n\nThe new machine has been added to the quantum system! 👑`,
        success: true
      }
    } catch (error: any) {
      console.error('Failed to create repository:', error)
      return {
        role: 'system' as const,
        content: `❌ Failed to create repository: ${error.message || 'Unknown error'}`,
        success: false
      }
    }
  }

  const processCommand = async (command: string) => {
    const cmd = command.trim().toLowerCase()
    const args = command.trim().split(' ')
    
    if (cmd.startsWith('/create ')) {
      const repoName = cmd.replace('/create ', '').trim().split(' ')[0]
      if (!repoName) {
        return {
          role: 'system' as const,
          content: '⚠️ Please provide a repository name. Usage: /create <name>'
        }
      }
      
      return await createRepoFromCommand(repoName, command)
    }
    
    if (cmd === '/help') {
      return {
        role: 'system' as const,
        content: `╔═══════════════════════════════════════════════════════════════╗
║              LEGEND TERMINAL - COMMAND REFERENCE              ║
╚═══════════════════════════════════════════════════════════════╝

SYSTEM COMMANDS:
/status         - System status overview
/auth           - Check GitHub authentication
/sync           - Sync all components

REPO MANAGEMENT:
/create <name>  - Create new repo ${authStatus ? '✅' : '⚠️ (auth required)'}
/repos          - List all connected repos
/registry       - Show all repos in registry (${getAllExtendedRepoNames().length} total)

NAVIGATION:
/nav <repo>     - Navigate to repo and show details
/info <repo>    - Get detailed repo information
/map            - Show ASCII system map
/layers         - Show system layers
/layer <N>      - Show repos in layer N
/path <A> <B>   - Find path between two repos
/neighbors <R>  - Show neighboring repos
/deps <repo>    - Show dependencies
/tree <repo>    - Show full dependency tree
/stats          - Show system statistics

OTHER:
/help           - Show this help
/clear          - Clear terminal

Type anything else to chat with the Legend AI! 👑`
      }
    }

    if (cmd === '/clear') {
      setMessages([{
        id: Date.now().toString(),
        role: 'system',
        content: '👑 Terminal cleared. Legend System Ready.',
        timestamp: new Date()
      }])
      return null
    }

    if (cmd === '/registry') {
      const allRepos = getAllExtendedRepoNames()
      const repoList = allRepos.slice(0, 20).map(name => {
        const def = getRepoDefinition(name)
        return `${def?.emoji || '🧱'} ${name} [${def?.category || 'other'}]`
      }).join('\n')
      return {
        role: 'system' as const,
        content: `📚 Registry Contains ${allRepos.length} Repos (showing first 20):\n\n${repoList}\n\nUse /info <name> for details on any repo.`
      }
    }

    if (cmd === '/map') {
      const map = systemNavigator.generateASCIIMap()
      return {
        role: 'system' as const,
        content: map
      }
    }

    if (cmd === '/layers') {
      const layers = systemNavigator.getAllLayers()
      const layerInfo = layers.map(layer => {
        const repos = systemNavigator.getLayerInfo(layer)
        return `Layer ${layer}: ${repos.length} repos - ${repos.slice(0, 5).map(r => r.emoji).join(' ')}`
      }).join('\n')
      return {
        role: 'system' as const,
        content: `🏗️ System Layers:\n\n${layerInfo}\n\nUse /layer <N> to see details.`
      }
    }

    if (cmd.startsWith('/layer ')) {
      const layerNum = parseInt(args[1])
      if (isNaN(layerNum)) {
        return {
          role: 'system' as const,
          content: '⚠️ Usage: /layer <number>'
        }
      }
      const repos = systemNavigator.getLayerInfo(layerNum)
      if (repos.length === 0) {
        return {
          role: 'system' as const,
          content: `⚠️ No repos found in layer ${layerNum}`
        }
      }
      const repoList = repos.map(r => `${r.emoji} ${r.name} [${r.category}]`).join('\n')
      return {
        role: 'system' as const,
        content: `📍 Layer ${layerNum} (${repos.length} repos):\n\n${repoList}`
      }
    }

    if (cmd.startsWith('/nav ') || cmd.startsWith('/info ')) {
      const repoName = args.slice(1).join(' ').trim()
      if (!repoName) {
        return {
          role: 'system' as const,
          content: '⚠️ Usage: /nav <repo-name> or /info <repo-name>'
        }
      }
      const info = getRepoInfo(repoName)
      return {
        role: 'system' as const,
        content: info
      }
    }

    if (cmd.startsWith('/path ')) {
      if (args.length < 3) {
        return {
          role: 'system' as const,
          content: '⚠️ Usage: /path <from-repo> <to-repo>'
        }
      }
      const from = args[1]
      const to = args[2]
      const path = systemNavigator.findShortestPath(from, to)
      if (!path) {
        return {
          role: 'system' as const,
          content: `⚠️ No path found between ${from} and ${to}`
        }
      }
      return {
        role: 'system' as const,
        content: `🛤️ Path from ${from} to ${to}:\n\n${path.map((r, i) => `${i + 1}. ${r}`).join('\n → ')}`
      }
    }

    if (cmd.startsWith('/neighbors ')) {
      const repoName = args.slice(1).join(' ').trim()
      const neighbors = systemNavigator.getNeighbors(repoName)
      if (neighbors.length === 0) {
        return {
          role: 'system' as const,
          content: `⚠️ No neighbors found for ${repoName}`
        }
      }
      const neighborList = neighbors.map(n => `${n.emoji} ${n.name} (Layer ${n.layer})`).join('\n')
      return {
        role: 'system' as const,
        content: `🌐 Neighbors of ${repoName}:\n\n${neighborList}`
      }
    }

    if (cmd.startsWith('/deps ')) {
      const repoName = args.slice(1).join(' ').trim()
      const deps = systemNavigator.getDependencies(repoName)
      const dependents = systemNavigator.getDependents(repoName)
      return {
        role: 'system' as const,
        content: `🔗 Dependencies for ${repoName}:\n\nDepends on (${deps.length}):\n${deps.length > 0 ? deps.map(d => `├─ ${d}`).join('\n') : '└─ None'}\n\nDepended on by (${dependents.length}):\n${dependents.length > 0 ? dependents.map(d => `├─ ${d}`).join('\n') : '└─ None'}`
      }
    }

    if (cmd.startsWith('/tree ')) {
      const repoName = args.slice(1).join(' ').trim()
      const tree = systemNavigator.getFullDependencyTree(repoName)
      return {
        role: 'system' as const,
        content: `🌳 Full dependency tree for ${repoName}:\n\n${tree.length > 0 ? tree.map((d, i) => `${i + 1}. ${d}`).join('\n') : 'No dependencies'}`
      }
    }

    if (cmd === '/stats') {
      const stats = systemNavigator.getSystemStatistics()
      const categoryList = Array.from(stats.categories.entries())
        .map(([cat, count]) => `${cat}: ${count}`)
        .join('\n')
      return {
        role: 'system' as const,
        content: `📊 System Statistics:\n\n🎯 Total Repos: ${stats.totalRepos}\n🏗️ Layers: ${stats.layers}\n🔗 Most Connected: ${stats.mostConnected.repo} (${stats.mostConnected.connections} connections)\n\n📦 By Category:\n${categoryList}`
      }
    }

    if (cmd === '/auth') {
      return {
        role: 'system' as const,
        content: authStatus 
          ? '✅ GitHub authenticated. You can create repositories!' 
          : '⚠️ Not authenticated. Please authenticate in the sidebar to create repositories.'
      }
    }
    
    if (cmd === '/status') {
      const allRepos = getAllExtendedRepoNames()
      return {
        role: 'system' as const,
        content: `🎛️ System Status:
📦 ${repos.length} repos connected
📚 ${allRepos.length} repos in registry
${repos.filter(r => r.category === 'brain').length} brain components
${repos.filter(r => r.category === 'quantum').length} quantum processors
${repos.filter(r => r.category === 'time').length} time machines
GitHub: ${authStatus ? '✅ Authenticated' : '⚠️ Not authenticated'}
All systems operational 👑`
      }
    }
    
    if (cmd === '/repos') {
      const repoList = repos.slice(0, 10).map(r => `🧱 ${r.name}`).join('\n')
      return {
        role: 'system' as const,
        content: `Connected Repositories (showing 10/${repos.length}):\n${repoList}\n\nUse /create <name> to add more or /registry to see all available.`
      }
    }
    
    if (cmd === '/sync') {
      return {
        role: 'system' as const,
        content: '🪡 Syncing all components... Logic threads assembling... 🎵 Sync complete! All repos indexed.'
      }
    }

    if (cmd.startsWith('create ') && !cmd.startsWith('/')) {
      const repoName = cmd.replace('create ', '').trim().split(' ')[0]
      if (repoName) {
        return await createRepoFromCommand(repoName, command)
      }
    }

    const prompt = spark.llmPrompt`You are the Legend Terminal AI assistant for the pewpi-infinity quantum computing system. The user said: ${command}. 

Current system has ${repos.length} connected repositories and ${getAllExtendedRepoNames().length} repos in the registry. Authentication status: ${authStatus ? 'authenticated' : 'not authenticated'}. 

Respond helpfully and briefly in 1-2 sentences. If they're asking about creating repos and not authenticated, tell them to authenticate first. Use emojis from this set: 👑🧱🎵🪡🌐🟦🟡💵💰🔱✨🍄🪐⭐🦾💲🎛️`

    try {
      const response = await spark.llm(prompt, 'gpt-4o-mini')
      return {
        role: 'assistant' as const,
        content: response
      }
    } catch (error) {
      return {
        role: 'system' as const,
        content: '⚠️ Error connecting to Legend AI. Try a command like /help or /status'
      }
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsProcessing(true)

    const response = await processCommand(input)
    
    if (response) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: response.role,
        content: response.content,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    }
    
    setIsProcessing(false)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="flex flex-col h-[600px] bg-card/90 backdrop-blur-sm border-primary/30 glow-border">
      <div className="flex items-center gap-2 p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
        <Terminal className="text-accent" size={24} weight="duotone" />
        <h3 className="font-semibold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Legend Terminal
        </h3>
        <Badge variant="secondary" className="ml-auto">
          <Lightning size={14} className="mr-1" />
          Live
        </Badge>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3 items-start',
                message.role === 'user' && 'justify-end'
              )}
            >
              {message.role !== 'user' && (
                <div className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                  message.role === 'system' ? 'bg-accent/20' : 'bg-primary/20'
                )}>
                  {message.role === 'system' ? (
                    <Terminal size={16} className="text-accent" />
                  ) : (
                    <Robot size={16} className="text-primary" />
                  )}
                </div>
              )}
              
              <div
                className={cn(
                  'rounded-xl px-4 py-2 max-w-[80%]',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : message.role === 'system'
                    ? 'bg-muted text-muted-foreground border border-border/50'
                    : 'bg-accent/10 text-foreground border border-accent/30'
                )}
              >
                <p className="text-sm whitespace-pre-wrap break-words" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {message.content}
                </p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <User size={16} className="text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Robot size={16} className="text-primary animate-pulse" />
              </div>
              <div className="bg-accent/10 rounded-xl px-4 py-2 border border-accent/30">
                <p className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Processing...
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/50 bg-gradient-to-r from-card/50 to-card/30">
        {!authStatus && (
          <div className="mb-3 px-3 py-2 bg-yellow/10 border border-yellow/30 rounded-lg flex items-center gap-2 text-xs">
            <XCircle size={16} className="text-yellow" />
            <span className="text-yellow">Not authenticated - authenticate in sidebar to create repos</span>
          </div>
        )}
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a command or message... (try /help)"
            className="flex-1 bg-background/50 border-primary/30 focus:border-accent"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            disabled={isProcessing}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            <PaperPlaneRight size={16} weight="fill" />
            Send
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Commands: /help /create /status /repos /sync /auth
        </p>
      </div>
    </Card>
  )
}
