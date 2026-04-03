import { clsx } from 'clsx'

export interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  return (
    <div className={clsx('flex items-center justify-center py-10', className)}>
      <div className="inline-flex items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2">
        <div className="flex space-x-1.5">
          <div className="size-2 animate-bounce rounded-full bg-[var(--color-muted-foreground)]/70 [animation-delay:-0.3s]" />
          <div className="size-2 animate-bounce rounded-full bg-[var(--color-muted-foreground)]/70 [animation-delay:-0.15s]" />
          <div className="size-2 animate-bounce rounded-full bg-[var(--color-muted-foreground)]/70" />
        </div>
        <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
          Loading data
        </span>
      </div>
    </div>
  )
}
