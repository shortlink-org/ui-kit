import React, { Component, type ReactNode } from 'react'
import clsx from 'clsx'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
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

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          className={clsx(
            'flex flex-col items-center justify-center min-h-[200px] p-6 gap-4',
            'bg-white dark:bg-gray-900 rounded-lg border border-red-200 dark:border-red-900/50',
            'shadow-sm',
            this.props.className
          )}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-red-500 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Something went wrong
            </h3>
          </div>
          {this.state.error && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md">
              {this.state.error.message}
            </p>
          )}
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
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

