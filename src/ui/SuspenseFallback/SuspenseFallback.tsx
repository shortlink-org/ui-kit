import React from 'react'
import { FeedbackPanel } from '../FeedbackPanel/FeedbackPanel'

export interface SuspenseFallbackProps {
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
  message = 'Loading...',
  className,
  size = 'md',
}) => {
  return (
    <FeedbackPanel
      variant="loading"
      message={message}
      className={className}
      size={size}
    />
  )
}

export default SuspenseFallback
