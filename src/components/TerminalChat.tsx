import { useState, useRef, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { Terminal, PaperPlaneRight, Robot, User, Lightning } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { CategorizedRepo, ComponentCategory } from '@/lib/types'

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
  onCreateRepo?: (repoData: {
    name: string
    description: string
    category: ComponentCategory
    emoji: string
    isPrivate: boolean
  }) => void
}

export function TerminalChat({ repos, onCreateRepo }: TerminalChatProps) {
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

  const processCommand = async (command: string) => {
    const cmd = command.trim().toLowerCase()
    
    if (cmd.startsWith('/create ')) {
      const repoName = cmd.replace('/create ', '').trim()
      return {
        role: 'system' as const,
        content: `🧱 Creating new repo: ${repoName}... This will be connected to the quantum system.`
      }
    }
    
    if (cmd === '/help') {
      return {
        role: 'system' as const,
        content: `Available commands:
/create <name> - Create new repo
/status - System status
/repos - List all repos
/sync - Sync all components
/help - Show this help`
      }
    }
    
    if (cmd === '/status') {
      return {
        role: 'system' as const,
        content: `🎛️ System Status:
${repos.length} repos connected
${repos.filter(r => r.category === 'brain').length} brain components
${repos.filter(r => r.category === 'quantum').length} quantum processors
${repos.filter(r => r.category === 'time').length} time machines
All systems operational 👑`
      }
    }
    
    if (cmd === '/repos') {
      const repoList = repos.slice(0, 10).map(r => `🧱 ${r.name}`).join('\n')
      return {
        role: 'system' as const,
        content: `Connected Repositories (showing 10/${repos.length}):\n${repoList}\n\nUse /create <name> to add more.`
      }
    }
    
    if (cmd === '/sync') {
      return {
        role: 'system' as const,
        content: '🪡 Syncing all components... Logic threads assembling... 🎵 Sync complete! All repos indexed.'
      }
    }

    const prompt = spark.llmPrompt`You are the Legend Terminal AI assistant for the pewpi-infinity quantum computing system. The user said: ${command}. 

Current system has ${repos.length} repositories. Respond helpfully and briefly in 1-2 sentences. Use emojis from this set: 👑🧱🎵🪡🌐🟦🟡💵💰🔱✨🍄🪐⭐🦾💲🎛️`

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
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: response.role,
      content: response.content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, assistantMessage])
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
          Commands: /help /create /status /repos /sync
        </p>
      </div>
    </Card>
  )
}
