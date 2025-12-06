import { clsx } from 'clsx'

export interface EmptyStateProps {
  message?: string
  className?: string
}

export function EmptyState({
  message = 'No data available',
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center py-12 text-center',
        className,
      )}
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  )
}
