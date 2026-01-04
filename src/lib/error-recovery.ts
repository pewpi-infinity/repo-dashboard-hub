import { toast } from 'sonner'

export interface ErrorContext {
  operation: string
  resource?: string
  context?: string
}

export interface RecoveryAction {
  label: string
  onClick: () => void
}

export class RecoverableError extends Error {
  public readonly context: ErrorContext
  public readonly recoveryAction?: RecoveryAction
  public readonly canRetry: boolean

  constructor(
    message: string,
    context: ErrorContext,
    canRetry: boolean = false,
    recoveryAction?: RecoveryAction
  ) {
    super(message)
    this.name = 'RecoverableError'
    this.context = context
    this.canRetry = canRetry
    this.recoveryAction = recoveryAction
  }
}

export function showErrorToast(error: Error | RecoverableError, fallbackMessage?: string) {
  const isRecoverable = error instanceof RecoverableError
  
  const title = isRecoverable 
    ? `${error.context.operation} failed`
    : fallbackMessage || 'An error occurred'
  
  const description = error.message || 'An unexpected error occurred'
  
  const action = isRecoverable && error.recoveryAction
    ? error.recoveryAction
    : isRecoverable && error.canRetry
    ? {
        label: 'Retry',
        onClick: () => window.location.reload()
      }
    : undefined

  toast.error(title, {
    description,
    action,
    duration: 6000
  })
}

export function showSuccessToast(operation: string, details?: string) {
  toast.success(operation, {
    description: details,
    duration: 4000
  })
}

export function showWarningToast(warning: string, details?: string) {
  toast.warning(warning, {
    description: details,
    duration: 4000
  })
}

export function showInfoToast(info: string, details?: string) {
  toast.info(info, {
    description: details,
    duration: 3000
  })
}

export function handleApiError(
  error: any,
  operation: string,
  resource?: string
): RecoverableError {
  console.error(`${operation}${resource ? ` for ${resource}` : ''}:`, error)
  
  let errorMessage = 'An unexpected error occurred'
  let canRetry = false
  let recoveryAction: RecoveryAction | undefined
  
  if (error?.status === 401) {
    errorMessage = 'Authentication required or expired'
    recoveryAction = {
      label: 'Authenticate',
      onClick: () => {
        const authElement = document.querySelector('[data-github-auth]')
        authElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  } else if (error?.status === 403) {
    if (error?.response?.headers?.['x-ratelimit-remaining'] === '0') {
      const resetTime = error?.response?.headers?.['x-ratelimit-reset']
      const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null
      errorMessage = `Rate limit exceeded. Resets at ${resetDate?.toLocaleTimeString() || 'soon'}`
      canRetry = true
    } else {
      errorMessage = 'Access forbidden. Check your permissions.'
      recoveryAction = {
        label: 'Check Auth',
        onClick: () => {
          const authElement = document.querySelector('[data-github-auth]')
          authElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
  } else if (error?.status === 404) {
    errorMessage = resource 
      ? `${resource} not found or is private`
      : 'Resource not found'
  } else if (error?.status === 422) {
    errorMessage = 'Invalid request data'
  } else if (error?.status >= 500) {
    errorMessage = 'Server error. Please try again later.'
    canRetry = true
  } else if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
    errorMessage = 'Network error. Check your connection.'
    canRetry = true
  } else if (error?.message) {
    errorMessage = error.message
  }
  
  return new RecoverableError(
    errorMessage,
    { operation, resource },
    canRetry,
    recoveryAction
  )
}

export function showLoadingToast(operation: string, details?: string): string | number {
  return toast.loading(operation, {
    description: details
  })
}

export function dismissToast(toastId: string | number) {
  toast.dismiss(toastId)
}

export function updateToast(
  toastId: string | number,
  type: 'success' | 'error',
  message: string,
  details?: string
) {
  dismissToast(toastId)
  
  if (type === 'success') {
    showSuccessToast(message, details)
  } else {
    toast.error(message, {
      description: details,
      duration: 5000
    })
  }
}
