import React, { Component, type ReactNode } from 'react'
import clsx from 'clsx'
import { FeedbackPanel } from '../FeedbackPanel/FeedbackPanel'

export interface ErrorBoundaryProps {
  children: ReactNode
  /** Custom ReactNode to render when error occurs (deprecated: use fallbackRender instead) */
  fallback?: ReactNode
  /** Render function that receives error and resetErrorBoundary callback */
  fallbackRender?: (props: { error: Error; resetErrorBoundary: () => void }) => ReactNode
  /** Called when error is caught */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  /** Array of values that, when changed, will reset the error boundary */
  resetKeys?: Array<string | number>
  /** Called when resetKeys change */
  onResetKeysChange?: (prevResetKeys: Array<string | number> | undefined, resetKeys: Array<string | number> | undefined) => void
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
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
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
        <button
          onClick={this.handleReset}
          className={clsx(
            'px-4 py-2 text-sm font-medium rounded-md',
            'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
            'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
            'dark:focus:ring-offset-gray-900',
            'transition-colors duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          Try again
        </button>
      )

      return (
        <FeedbackPanel
          variant="error"
          message={this.state.error?.message}
          className={this.props.className}
          action={actionButton}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

