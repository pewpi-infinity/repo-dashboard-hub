import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { GithubLogo, CheckCircle, XCircle, Key, Info } from '@phosphor-icons/react'
import { setGitHubToken, clearGitHubToken, isAuthenticated, getAuthenticatedUser } from '@/lib/github-api'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface GitHubAuthProps {
  onAuthChange?: (authenticated: boolean) => void
}

export function GitHubAuth({ onAuthChange }: GitHubAuthProps) {
  const [token, setToken] = useState('')
  const [storedToken, setStoredToken] = useKV<string>('github-token', '')
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showTokenInput, setShowTokenInput] = useState(false)

  useEffect(() => {
    if (storedToken) {
      verifyToken(storedToken)
    }
  }, [storedToken])

  const verifyToken = async (tokenToVerify: string) => {
    setIsVerifying(true)
    try {
      setGitHubToken(tokenToVerify)
      const user = await getAuthenticatedUser()
      
      if (user) {
        setAuthenticated(true)
        setUsername(user.login)
        onAuthChange?.(true)
        toast.success(`🔑 Authenticated as ${user.login}`, {
          description: 'You can now create repositories',
          duration: 4000
        })
      } else {
        throw new Error('Invalid token')
      }
    } catch (error: any) {
      clearGitHubToken()
      setAuthenticated(false)
      setUsername(null)
      setStoredToken('')
      onAuthChange?.(false)
      
      let errorMessage = 'Authentication failed. Please check your token.'
      let description = 'Make sure your token has the required permissions.'
      
      if (error?.message?.includes('401')) {
        errorMessage = 'Invalid GitHub token'
        description = 'The token you provided is not valid. Please create a new one.'
      } else if (error?.message?.includes('403')) {
        errorMessage = 'Token permissions issue'
        description = 'Your token may not have the required "repo" scope.'
      } else if (error?.message?.includes('fetch')) {
        errorMessage = 'Network error'
        description = 'Unable to connect to GitHub. Please check your internet connection.'
      }
      
      toast.error(errorMessage, {
        description,
        duration: 6000
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleAuthenticate = async () => {
    if (!token.trim()) {
      toast.error('Please enter a GitHub token')
      return
    }

    setStoredToken(token)
    setToken('')
    setShowTokenInput(false)
  }

  const handleDisconnect = () => {
    clearGitHubToken()
    setStoredToken('')
    setAuthenticated(false)
    setUsername(null)
    onAuthChange?.(false)
    toast.success('Disconnected from GitHub')
  }

  if (!authenticated && !showTokenInput) {
    return (
      <Card className="p-4 bg-gradient-to-br from-card/90 to-card/70 border-primary/30" data-github-auth>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <GithubLogo size={24} className="text-primary" weight="fill" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">GitHub Authentication</h3>
            <p className="text-xs text-muted-foreground">Required to create repos</p>
          </div>
        </div>
        
        <Button 
          onClick={() => setShowTokenInput(true)}
          className="w-full gap-2 bg-gradient-to-r from-primary to-accent"
          size="sm"
        >
          <Key size={16} />
          Authenticate with GitHub
        </Button>
      </Card>
    )
  }

  if (!authenticated && showTokenInput) {
    return (
      <Card className="p-4 bg-gradient-to-br from-card/90 to-card/70 border-primary/30" data-github-auth>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <GithubLogo size={24} className="text-primary" weight="fill" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">GitHub Authentication</h3>
            <p className="text-xs text-muted-foreground">Enter your personal access token</p>
          </div>
        </div>

        <Alert className="mb-3 border-accent/30">
          <Info size={16} className="text-accent" />
          <AlertDescription className="text-xs ml-2">
            Create a token at <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="text-accent underline">github.com/settings/tokens</a> with <code className="bg-muted px-1 rounded">repo</code> scope
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="ghp_xxxxxxxxxxxx"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAuthenticate()}
            className="font-mono text-sm"
            disabled={isVerifying}
          />
          <div className="flex gap-2">
            <Button 
              onClick={handleAuthenticate}
              disabled={!token.trim() || isVerifying}
              className="flex-1 gap-2"
              size="sm"
            >
              <CheckCircle size={16} weight="fill" />
              {isVerifying ? 'Verifying...' : 'Connect'}
            </Button>
            <Button 
              onClick={() => {
                setShowTokenInput(false)
                setToken('')
              }}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4 bg-gradient-to-br from-card/90 to-card/70 border-green/50 glow-border-accent">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center">
          <CheckCircle size={24} className="text-green" weight="fill" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            Connected to GitHub
          </h3>
          <p className="text-xs text-muted-foreground font-mono">@{username}</p>
        </div>
        <Badge variant="secondary" className="bg-green/20 text-green border-green/30">
          Active
        </Badge>
      </div>

      <Button 
        onClick={handleDisconnect}
        variant="outline"
        className="w-full gap-2 border-destructive/30 hover:bg-destructive/10"
        size="sm"
      >
        <XCircle size={16} />
        Disconnect
      </Button>
    </Card>
  )
}
