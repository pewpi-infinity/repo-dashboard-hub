import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'
import { Toaster } from './components/ui/sonner.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

// Defensive initialization of pewpi-shared services
try {
  // Import and initialize token service with auto-tracking
  import('./pewpi-shared/token-service').then(({ tokenService }) => {
    try {
      tokenService.initAutoTracking();
      console.log('[pewpi-shared] Token service initialized');
    } catch (error) {
      console.warn('[pewpi-shared] Failed to initialize token service:', error);
    }
  }).catch(err => {
    console.warn('[pewpi-shared] Token service not available:', err);
  });

  // Import and restore auth session
  import('./pewpi-shared/auth-service').then(({ authService }) => {
    try {
      authService.restoreSession().then(restored => {
        if (restored) {
          console.log('[pewpi-shared] Auth session restored');
        }
      });
      authService.init();
      console.log('[pewpi-shared] Auth service initialized');
    } catch (error) {
      console.warn('[pewpi-shared] Failed to initialize auth service:', error);
    }
  }).catch(err => {
    console.warn('[pewpi-shared] Auth service not available:', err);
  });
} catch (error) {
  console.warn('[pewpi-shared] Initialization failed:', error);
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
    <Toaster />
  </ErrorBoundary>
)
