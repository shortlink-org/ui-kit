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
        'flex items-center justify-center py-14 text-center',
        className,
      )}
    >
      <div className="max-w-sm">
        <div className="mx-auto flex size-12 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-muted-foreground)]">
          <span className="text-sm font-semibold">0</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-[var(--color-muted-foreground)]">
          {message}
        </p>
      </div>
    </div>
  )
}
