import React from 'react'
import { FeedbackPanel } from '../FeedbackPanel/FeedbackPanel'

export interface SuspenseFallbackProps {
  title?: string
  eyebrow?: string
  message?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Default fallback component for Suspense boundaries.
 * Shows a loading spinner with optional message.
 * Uses FeedbackPanel for consistent styling with ErrorBoundary.
 */
export const SuspenseFallback: React.FC<SuspenseFallbackProps> = ({
  title = 'Streaming content',
  eyebrow = 'Suspense boundary',
  message = 'Loading...',
  className,
  size = 'md',
}) => {
  const spinnerSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const spinnerInsetClasses = {
    sm: 'inset-[4px]',
    md: 'inset-[7px]',
    lg: 'inset-[10px]',
  }

  const accessibleLabel = message || 'Loading...'

  return (
    <FeedbackPanel
      variant="loading"
      title={title}
      eyebrow={eyebrow}
      message={message || undefined}
      className={className}
      size={size}
      icon={
        <div
          role="status"
          aria-label={accessibleLabel}
          className={`relative ${spinnerSizeClasses[size]}`}
        >
          <div
            className={`absolute inset-0 animate-spin rounded-full border-[3px] border-sky-200/70 border-t-sky-500 ${spinnerSizeClasses[size]}`}
          />
          <div
            className={`absolute rounded-full bg-sky-500/15 ${spinnerInsetClasses[size]}`}
          />
        </div>
      }
    />
  )
}

export default SuspenseFallback
