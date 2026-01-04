# Error Recovery System Documentation

## Overview

The AC Dashboard includes comprehensive error recovery toast notifications across all API calls. When errors occur, users receive detailed feedback with actionable recovery options.

## Features

### 1. GitHub API Error Recovery
- **Authentication errors**: Direct users to authenticate with actionable button
- **Rate limit errors**: Show reset time and offer retry option
- **Permission errors**: Clear messaging about required permissions
- **Network errors**: Automatic retry suggestions
- **Resource not found**: Contextual error messages

### 2. Crypto API Error Recovery
- **Rate limiting**: Caching to reduce API calls and informative messages when limits hit
- **Network failures**: Graceful fallbacks with retry options
- **Search failures**: Non-blocking warnings that allow continued use
- **Portfolio errors**: Safe defaults with error notifications

### 3. Repository Operations
- **Load failures**: Detailed error messages with retry buttons
- **Health monitoring**: Warnings for failed metrics without blocking the UI
- **Create repository**: Clear error messages for common issues
- **Stats loading**: Graceful degradation with partial data display

## Error Toast Patterns

### Success Toasts
```typescript
toast.success(`✨ Loaded ${count} repositories`, {
  description: 'All quantum machines online',
  duration: 3000
})
```

### Error Toasts with Recovery
```typescript
toast.error('Failed to load repositories', {
  description: 'Network error. Please check your connection.',
  action: {
    label: 'Retry',
    onClick: () => window.location.reload()
  },
  duration: 6000
})
```

### Warning Toasts
```typescript
toast.warning('Health monitoring incomplete', {
  description: `Unable to load metrics for ${count} machines`,
  duration: 4000
})
```

### Info Toasts
```typescript
toast.info(`🧱 Creating repository: ${name}...`, {
  duration: 3000
})
```

## Implementation Details

### API Error Handling (github-api.ts)
- Centralized error handling function `handleApiError()`
- Automatically categorizes errors by status code
- Provides context-specific error messages
- Suggests recovery actions when possible

### Crypto API Caching
- 1-minute cache for all crypto API responses
- Automatic cache cleanup to prevent memory leaks
- Graceful fallback when API is unavailable

### Component-Level Recovery
- GitHub Auth: Token verification with detailed feedback
- App.tsx: Repository loading with comprehensive error handling
- TerminalChat: Command errors with helpful suggestions
- CryptoPriceTracker: Automatic refresh with error display

## User Experience Benefits

1. **Clear Communication**: Users always know what went wrong
2. **Actionable Feedback**: Recovery actions are one click away
3. **Non-Blocking**: Errors don't prevent using other features
4. **Context-Aware**: Messages reference the specific operation that failed
5. **Smart Retry**: Suggestions to retry only when it makes sense

## Error Recovery Utility

Located in `/src/lib/error-recovery.ts`, provides:
- `RecoverableError` class for structured error handling
- `showErrorToast()` for consistent error display
- `handleApiError()` for API error standardization
- Loading toast management with `showLoadingToast()` and `updateToast()`

## Future Enhancements

- Automatic retry with exponential backoff for network errors
- Error analytics to track common failure patterns
- Offline mode detection and handling
- Batch operation error handling with partial success reporting
