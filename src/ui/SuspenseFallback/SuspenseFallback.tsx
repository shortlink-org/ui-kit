import React from 'react'
import clsx from 'clsx'

export interface SuspenseFallbackProps {
  message?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Default fallback component for Suspense boundaries.
 * Shows a loading spinner with optional message.
 */
export const SuspenseFallback: React.FC<SuspenseFallbackProps> = ({
  message = 'Loading...',
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const displayMessage = message || 'Loading...'

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center min-h-[200px] gap-3',
        className
      )}
    >
      <div
        className={clsx(
          'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
          'dark:border-gray-600 dark:border-t-blue-400',
          sizeClasses[size]
        )}
        role="status"
        aria-label={displayMessage}
      >
        <span className="sr-only">{displayMessage}</span>
      </div>
      {message && (
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}

export default SuspenseFallback

