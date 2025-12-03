import React, { Component, type ReactNode } from 'react'
import { Box, Button, Typography } from '@mui/material'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            p: 3,
            gap: 2,
          }}
        >
          <Typography variant="h6" color="error">
            Something went wrong
          </Typography>
          {this.state.error && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {this.state.error.message}
            </Typography>
          )}
          <Button variant="contained" onClick={this.handleReset}>
            Try again
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

