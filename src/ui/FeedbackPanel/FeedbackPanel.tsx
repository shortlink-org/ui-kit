import React, { type ReactNode } from 'react'
import clsx from 'clsx'

export type FeedbackVariant = 'loading' | 'error' | 'empty'

export interface FeedbackPanelProps {
  /** Variant of feedback panel */
  variant: FeedbackVariant
  /** Message to display */
  message?: string
  /** Custom icon component */
  icon?: ReactNode
  /** Additional content */
  children?: ReactNode
  /** Custom className */
  className?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Action button (e.g., "Try again") */
  action?: ReactNode
}

const defaultIcons: Record<FeedbackVariant, ReactNode> = {
  loading: (
    <div className="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400 w-8 h-8" />
  ),
  error: (
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
  ),
  empty: (
    <svg
      className="w-6 h-6 text-gray-400 dark:text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  ),
}

const variantStyles: Record<FeedbackVariant, { container: string; title: string; message: string }> = {
  loading: {
    container: 'border-[var(--color-border)]',
    title: 'text-[var(--color-foreground)]',
    message: 'text-[var(--color-muted-foreground)]',
  },
  error: {
    container: 'border-red-200 dark:border-red-900/50',
    title: 'text-red-600 dark:text-red-400',
    message: 'text-[var(--color-muted-foreground)]',
  },
  empty: {
    container: 'border-[var(--color-border)]',
    title: 'text-[var(--color-foreground)]',
    message: 'text-[var(--color-muted-foreground)]',
  },
}

export function FeedbackPanel({
  variant,
  message,
  icon,
  children,
  className,
  size = 'md',
  action,
}: FeedbackPanelProps) {
  const styles = variantStyles[variant]
  const defaultIcon = defaultIcons[variant]
  const displayIcon = icon !== undefined ? icon : defaultIcon

  const sizeClasses = {
    sm: 'min-h-[100px] p-4 gap-2',
    md: 'min-h-[200px] p-6 gap-4',
    lg: 'min-h-[300px] p-8 gap-6',
  }

  const titleMap: Record<FeedbackVariant, string> = {
    loading: 'Loading...',
    error: 'Something went wrong',
    empty: 'No content',
  }

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center',
        'bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] shadow-sm',
        styles.container,
        sizeClasses[size],
        className
      )}
    >
      <div className="flex items-center gap-2">
        {displayIcon}
        <h3 className={clsx('text-lg font-semibold', styles.title)}>{titleMap[variant]}</h3>
      </div>
      {message && (
        <p className={clsx('text-sm text-center max-w-md', styles.message)}>{message}</p>
      )}
      {children}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export default FeedbackPanel

