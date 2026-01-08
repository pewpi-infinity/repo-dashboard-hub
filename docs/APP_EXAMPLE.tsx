/**
 * Example App.tsx Integration
 * Shows how to integrate pewpi-shared-token into a React app
 */

import { useEffect, useState } from 'react';
import { tokenService } from '@/lib/shared/token-service';
import { authService, User } from '@/lib/shared/auth-service';
import { integrationService } from '@/lib/shared/integration-listener';
import { Login } from '@/components/Login';
import { Wallet } from '@/components/Wallet';
import '@/lib/shared/theme.css';

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize the pewpi-shared-token system
    async function initialize() {
      try {
        // Enable auto-tracking for cross-tab/cross-repo sync
        tokenService.initAutoTracking();

        // Try to restore existing session
        const restored = await authService.restoreSession();
        if (restored) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }

        // Set up integration listeners
        const unregister = integrationService.register({
          onTokenCreated: (token) => {
            console.log('🎁 New token:', token);
            // Show notification, update UI, etc.
          },
          onLoginChanged: (newUser) => {
            setUser(newUser);
            if (newUser) {
              console.log('👤 User logged in:', newUser.email);
            } else {
              console.log('👋 User logged out');
            }
          }
        });

        setIsLoading(false);

        // Cleanup on unmount
        return () => {
          unregister();
        };
      } catch (error) {
        console.error('Failed to initialize:', error);
        setIsLoading(false);
      }
    }

    initialize();
  }, []);

  const handleLoginSuccess = async () => {
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
    
    // Award login bonus tokens
    await tokenService.createToken(
      'infinity_tokens',
      10,
      'repo-dashboard-hub',
      'Daily login bonus'
    );
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⚙️</div>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Login onSuccess={handleLoginSuccess} showGitHubOption={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">🎮 Pewpi Infinity</h1>
              <div className="text-sm text-muted-foreground">
                Welcome, {user.username || user.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Wallet Section */}
          <section>
            <Wallet />
          </section>

          {/* Demo Actions */}
          <section>
            <h2 className="text-xl font-bold mb-4">Demo Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => awardTokens('infinity', 10, 'Test action')}
                className="p-4 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg border border-purple-500/30"
              >
                💎 Earn Infinity Tokens
              </button>
              <button
                onClick={() => awardTokens('research', 5, 'Research activity')}
                className="p-4 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/30"
              >
                📚 Earn Research Tokens
              </button>
              <button
                onClick={() => awardTokens('art', 15, 'Created artwork')}
                className="p-4 bg-pink-500/10 hover:bg-pink-500/20 rounded-lg border border-pink-500/30"
              >
                🎨 Earn Art Tokens
              </button>
              <button
                onClick={() => awardTokens('music', 8, 'Listened to song')}
                className="p-4 bg-green-500/10 hover:bg-green-500/20 rounded-lg border border-green-500/30"
              >
                🎵 Earn Music Tokens
              </button>
            </div>
          </section>

          {/* Your Actual App Content Here */}
          <section>
            <h2 className="text-xl font-bold mb-4">Your Dashboard</h2>
            <div className="p-8 bg-card rounded-lg border text-center text-muted-foreground">
              Your app content goes here...
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Helper function to award tokens
async function awardTokens(type: string, amount: number, description: string) {
  try {
    await tokenService.createToken(
      `${type}_tokens`,
      amount,
      'repo-dashboard-hub',
      description
    );
    console.log(`✅ Awarded ${amount} ${type} tokens`);
  } catch (error) {
    console.error('Failed to award tokens:', error);
  }
}

export default App;
