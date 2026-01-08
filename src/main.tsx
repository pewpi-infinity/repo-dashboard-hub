import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'
import { Toaster } from './components/ui/sonner.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

// Initialize pewpi-shared services (canonical implementation)
// Wrapped in try/catch to maintain backward compatibility
try {
  // Import pewpi-shared token-service for initialization
  import('./pewpi-shared/token-service.js').then(({ tokenService }) => {
    // Initialize auto-tracking for token events
    tokenService.initAutoTracking();
    console.log('[pewpi-shared] Token service initialized');
  }).catch((err) => {
    console.warn('[pewpi-shared] Token service initialization skipped:', err.message);
  });

  // Setup integration listeners for cross-repo events
  import('./pewpi-shared/integration-listener.js').then(({ setupIntegration }) => {
    setupIntegration({
      onTokenCreated: (token: any) => {
        console.log('[pewpi-shared] Token created:', token);
      },
      onTokensCleared: () => {
        console.log('[pewpi-shared] Tokens cleared');
      },
      onLoginChanged: (data: any) => {
        console.log('[pewpi-shared] Login changed:', data);
      },
      debug: false // Set to true for verbose logging
    });
    console.log('[pewpi-shared] Integration listener initialized');
  }).catch((err) => {
    console.warn('[pewpi-shared] Integration listener initialization skipped:', err.message);
  });

  // Note: Login component (auth) doesn't have a restoreSession method in the canonical JS version
  // Session is automatically restored from localStorage when LoginComponent is instantiated
} catch (error) {
  console.warn('[pewpi-shared] Initialization error (non-breaking):', error);
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
    <Toaster />
  </ErrorBoundary>
)
