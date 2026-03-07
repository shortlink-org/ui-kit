import React, { Component, type ReactNode } from 'react'
import clsx from 'clsx'
import { Button } from '../Button/Button'
import { FeedbackPanel } from '../FeedbackPanel/FeedbackPanel'

export interface ErrorBoundaryProps {
  children: ReactNode
  /** Custom ReactNode to render when error occurs (deprecated: use fallbackRender instead) */
  fallback?: ReactNode
  /** Render function that receives error and resetErrorBoundary callback */
  fallbackRender?: (props: {
    error: Error
    resetErrorBoundary: () => void
  }) => ReactNode
  /** Called when error is caught */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  /** Array of values that, when changed, will reset the error boundary */
  resetKeys?: Array<string | number>
  /** Called when resetKeys change */
  onResetKeysChange?: (
    prevResetKeys: Array<string | number> | undefined,
    resetKeys: Array<string | number> | undefined,
  ) => void
  /** Called when error boundary is reset */
  onReset?: () => void
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * ErrorBoundary component that catches errors in React components,
 * especially useful for errors thrown in transitions (React 19 Actions).
 *
 * Errors thrown inside transitions automatically bubble to error boundaries.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, onResetKeysChange } = this.props
    const { hasError } = this.state

    // Reset error boundary when resetKeys change
    if (hasError && prevProps.resetKeys !== resetKeys) {
      // Deep comparison of resetKeys arrays
      const resetKeysChanged =
        prevProps.resetKeys === undefined ||
        resetKeys === undefined ||
        prevProps.resetKeys.length !== resetKeys.length ||
        prevProps.resetKeys.some((key, index) => key !== resetKeys[index])

      if (resetKeysChanged) {
        if (onResetKeysChange) {
          onResetKeysChange(prevProps.resetKeys, resetKeys)
        }
        this.handleReset()
      }
    }
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
    })
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  handleReset = () => {
    this.resetErrorBoundary()
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Use fallbackRender if provided (preferred API)
      if (this.props.fallbackRender) {
        return this.props.fallbackRender({
          error: this.state.error,
          resetErrorBoundary: this.resetErrorBoundary,
        })
      }

      // Fallback to legacy fallback prop if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI - use FeedbackPanel for consistency
      const actionButton = (
        <Button onClick={this.handleReset} variant="destructive" size="md">
          Try again
        </Button>
      )

      return (
        <FeedbackPanel
          variant="error"
          eyebrow="Runtime boundary"
          title="Something went wrong"
          message={this.state.error?.message}
          className={this.props.className}
          action={actionButton}
        >
          <div
            className={clsx(
              'w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-left',
            )}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-600">
              Recovery
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
              This section stopped rendering. Retry the panel without leaving
              the page.
            </p>
          </div>
        </FeedbackPanel>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
