/**
 * Comprehensive Wallet UI Component
 * Shows balance, token list, token detail, and live feed
 */

import { useState, useEffect } from 'react';
import { tokenService, Token } from '@/lib/shared/token-service';
import { authService } from '@/lib/shared/auth-service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wallet as WalletIcon, TrendingUp, List, Activity, RefreshCw } from 'lucide-react';

const TOKEN_TYPES = {
  infinity: { emoji: '💎', name: 'Infinity', color: 'bg-purple-500' },
  research: { emoji: '📚', name: 'Research', color: 'bg-blue-500' },
  art: { emoji: '🎨', name: 'Art', color: 'bg-pink-500' },
  music: { emoji: '🎵', name: 'Music', color: 'bg-green-500' }
};

export function Wallet() {
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [liveFeed, setLiveFeed] = useState<Token[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load wallet data
  const loadWalletData = async () => {
    try {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const allBalances = await tokenService.getAllBalances();
        setBalances(allBalances);

        const allTokens = await tokenService.getAll();
        setTokens(allTokens.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.error('Failed to load wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWalletData();

    // Listen for token creation events
    const unsubscribe = tokenService.on('pewpi.token.created', (token: Token) => {
      console.log('New token created:', token);
      setLiveFeed(prev => [token, ...prev].slice(0, 20));
      loadWalletData();
    });

    // Listen for login changes
    const handleLoginChange = () => {
      loadWalletData();
    };
    window.addEventListener('pewpi.login.changed', handleLoginChange);

    // Initialize auto-tracking
    tokenService.initAutoTracking();

    return () => {
      unsubscribe();
      window.removeEventListener('pewpi.login.changed', handleLoginChange);
    };
  }, []);

  const getTotalBalance = () => {
    return Object.values(balances).reduce((sum, val) => sum + val, 0);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WalletIcon className="w-5 h-5" />
            Wallet
          </CardTitle>
          <CardDescription>
            Sign in to access your wallet
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            Loading Wallet...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="wallet-container space-y-4">
      {/* Balance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WalletIcon className="w-5 h-5" />
              Wallet Balance
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={loadWalletData}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </CardTitle>
          <CardDescription>
            Total tokens across all types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-4xl font-bold">
              {formatAmount(getTotalBalance())}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(TOKEN_TYPES).map(([type, config]) => (
                <div
                  key={type}
                  className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <div className="text-2xl mb-2">{config.emoji}</div>
                  <div className="text-sm font-medium">{config.name}</div>
                  <div className="text-2xl font-bold">
                    {formatAmount(balances[`${type}_tokens`] || 0)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Token Views */}
      <Card>
        <CardHeader>
          <CardTitle>Token Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list">
                <List className="w-4 h-4 mr-2" />
                List
              </TabsTrigger>
              <TabsTrigger value="detail">
                <TrendingUp className="w-4 h-4 mr-2" />
                Detail
              </TabsTrigger>
              <TabsTrigger value="feed">
                <Activity className="w-4 h-4 mr-2" />
                Live Feed
              </TabsTrigger>
            </TabsList>

            {/* Token List */}
            <TabsContent value="list" className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                {tokens.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No tokens yet
                  </div>
                ) : (
                  <div className="space-y-2">
                    {tokens.map((token) => (
                      <div
                        key={token.id}
                        className="p-4 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                        onClick={() => setSelectedToken(token)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">
                              {TOKEN_TYPES[token.type.replace('_tokens', '') as keyof typeof TOKEN_TYPES]?.emoji || '🪙'}
                            </div>
                            <div>
                              <div className="font-medium">{token.description}</div>
                              <div className="text-sm text-muted-foreground">
                                {token.source}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">+{token.amount}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(token.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            {/* Token Detail */}
            <TabsContent value="detail" className="mt-4">
              {selectedToken ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-3xl">
                          {TOKEN_TYPES[selectedToken.type.replace('_tokens', '') as keyof typeof TOKEN_TYPES]?.emoji || '🪙'}
                        </span>
                        Token Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Amount</div>
                        <div className="text-2xl font-bold">+{formatAmount(selectedToken.amount)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Type</div>
                        <Badge variant="secondary">
                          {TOKEN_TYPES[selectedToken.type.replace('_tokens', '') as keyof typeof TOKEN_TYPES]?.name || selectedToken.type}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Description</div>
                        <div>{selectedToken.description}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Source</div>
                        <div>{selectedToken.source}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Timestamp</div>
                        <div>{formatDate(selectedToken.timestamp)}</div>
                      </div>
                      {selectedToken.metadata && (
                        <div>
                          <div className="text-sm text-muted-foreground">Metadata</div>
                          <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                            {JSON.stringify(selectedToken.metadata, null, 2)}
                          </pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedToken(null)}
                  >
                    Back to List
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Select a token from the list to view details
                </div>
              )}
            </TabsContent>

            {/* Live Feed */}
            <TabsContent value="feed" className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                {liveFeed.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Live feed is empty. New tokens will appear here.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {liveFeed.map((token, index) => (
                      <div
                        key={`${token.id}-${index}`}
                        className="p-3 rounded-lg border bg-accent/50 animate-in slide-in-from-top"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-green-500" />
                            <span className="font-medium">New Token</span>
                          </div>
                          <Badge variant="outline">+{token.amount}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {token.description} • {formatDate(token.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default Wallet;
