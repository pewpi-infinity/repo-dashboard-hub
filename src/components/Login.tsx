/**
 * Production Login Component
 * Magic-link (passwordless) as default, GitHub OAuth as opt-in
 */

import { useState } from 'react';
import { authService } from '@/lib/shared/auth-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Github, Loader2 } from 'lucide-react';

interface LoginProps {
  onSuccess?: () => void;
  showGitHubOption?: boolean;
}

export function Login({ onSuccess, showGitHubOption = true }: LoginProps) {
  const [email, setEmail] = useState('');
  const [magicLinkToken, setMagicLinkToken] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [githubToken, setGithubToken] = useState('');

  const handleRequestMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.requestMagicLink(email);
      
      if (result.success && result.token) {
        setMagicLinkSent(true);
        // In dev mode, auto-fill the token for convenience
        setMagicLinkToken(result.token);
      } else {
        setError(result.error || 'Failed to send magic link');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.verifyMagicLink(email, magicLinkToken);
      
      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error || 'Failed to verify magic link');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.authenticateWithGitHub(githubToken);
      
      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error || 'Failed to authenticate with GitHub');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container flex items-center justify-center min-h-[600px] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Pewpi Infinity</CardTitle>
          <CardDescription>
            Sign in to access your wallet and tokens
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="magic-link" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="magic-link">
                <Mail className="w-4 h-4 mr-2" />
                Magic Link
              </TabsTrigger>
              {showGitHubOption && (
                <TabsTrigger value="github">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="magic-link" className="space-y-4 pt-4">
              {!magicLinkSent ? (
                <form onSubmit={handleRequestMagicLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll send you a magic link to sign in without a password
                    </p>
                  </div>

                  {error && (
                    <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Magic Link
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyMagicLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="token">Magic Link Token</Label>
                    <Input
                      id="token"
                      type="text"
                      placeholder="Enter your token"
                      value={magicLinkToken}
                      onChange={(e) => setMagicLinkToken(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Dev mode: Token is auto-filled. In production, check your email.
                    </p>
                  </div>

                  {error && (
                    <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setMagicLinkSent(false);
                        setMagicLinkToken('');
                        setError('');
                      }}
                      disabled={loading}
                    >
                      Use Different Email
                    </Button>
                  </div>
                </form>
              )}
            </TabsContent>

            {showGitHubOption && (
              <TabsContent value="github" className="space-y-4 pt-4">
                <form onSubmit={handleGitHubAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="github-token">GitHub Token (Optional)</Label>
                    <Input
                      id="github-token"
                      type="password"
                      placeholder="ghp_..."
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Opt-in: Use your GitHub personal access token
                    </p>
                  </div>

                  {error && (
                    <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Github className="w-4 h-4 mr-2" />
                        Sign in with GitHub
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <p className="text-xs text-center text-muted-foreground">
            By signing in, you agree to our terms and privacy policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
