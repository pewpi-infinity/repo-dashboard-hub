import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { signIn, signOut, register, isAuthenticated, getCurrentUser } from '@/lib/auth-unified.js'
import { toast } from 'sonner'

export function AuthButton() {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Login form
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  // Register form
  const [regUsername, setRegUsername] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')

  const updateAuthState = () => {
    const isAuth = isAuthenticated()
    setAuthenticated(isAuth)
    if (isAuth) {
      setUser(getCurrentUser())
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    updateAuthState()
    
    // Listen for auth changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pewpi_unified_auth') {
        updateAuthState()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await signIn(loginUsername, loginPassword)
      
      if (result.success) {
        toast.success('🎉 Welcome back!', {
          description: `Logged in as ${result.user?.username}`,
          duration: 4000
        })
        updateAuthState()
        setDialogOpen(false)
        setLoginUsername('')
        setLoginPassword('')
      } else {
        toast.error('Login failed', {
          description: result.error || 'Please try again',
          duration: 4000
        })
      }
    } catch (error) {
      toast.error('Login failed', {
        description: 'An unexpected error occurred',
        duration: 4000
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await register(regUsername, regEmail, regPassword)
      
      if (result.success) {
        toast.success('🎉 Account created!', {
          description: `Welcome to Pewpi Infinity, ${result.user?.username}!`,
          duration: 4000
        })
        updateAuthState()
        setDialogOpen(false)
        setRegUsername('')
        setRegEmail('')
        setRegPassword('')
      } else {
        toast.error('Registration failed', {
          description: result.error || 'Please try again',
          duration: 4000
        })
      }
    } catch (error) {
      toast.error('Registration failed', {
        description: 'An unexpected error occurred',
        duration: 4000
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    signOut()
    updateAuthState()
    toast.success('Logged out successfully', {
      duration: 3000
    })
  }

  if (authenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-sm hidden sm:block">
          <div className="font-semibold text-foreground">{user.username}</div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleLogout}
          className="gap-2"
        >
          Logout
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button
        size="sm"
        onClick={() => setDialogOpen(true)}
        className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
      >
        🔐 Login
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>🧠 Pewpi Infinity</DialogTitle>
            <DialogDescription>
              Login or create an account to earn tokens across all repos
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Username</Label>
                  <Input
                    id="login-username"
                    type="text"
                    placeholder="Enter your username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-username">Username</Label>
                  <Input
                    id="reg-username"
                    type="text"
                    placeholder="Choose a username"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="Enter your email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="Choose a password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
