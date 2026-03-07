import { type ReactNode } from 'react'
import clsx from 'clsx'

export type FeedbackVariant = 'loading' | 'error' | 'empty'

export interface FeedbackPanelProps {
  /** Variant of feedback panel */
  variant: FeedbackVariant
  /** Optional title override */
  title?: string
  /** Optional eyebrow label */
  eyebrow?: string
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
    <div className="relative h-8 w-8">
      <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-sky-200/70 border-t-sky-500" />
      <div className="absolute inset-[7px] rounded-full bg-sky-500/15" />
    </div>
  ),
  error: (
    <svg
      className="h-6 w-6 text-rose-500"
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
      className="h-6 w-6 text-slate-500"
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

const variantStyles: Record<
  FeedbackVariant,
  {
    accent: string
    container: string
    eyebrow: string
    iconWrap: string
    title: string
    message: string
  }
> = {
  loading: {
    accent: 'from-sky-400/30 via-cyan-300/20 to-transparent',
    container:
      'border-sky-200/70 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.12),_transparent_55%),var(--color-surface)]',
    eyebrow: 'text-sky-700',
    iconWrap:
      'border-sky-200/70 bg-gradient-to-br from-sky-50 to-cyan-100 text-sky-600 shadow-[0_24px_70px_-40px_rgba(14,165,233,0.65)]',
    title: 'text-[var(--color-foreground)]',
    message: 'text-[var(--color-muted-foreground)]',
  },
  error: {
    accent: 'from-transparent via-transparent to-transparent',
    container:
      'border-rose-200/80 bg-[color-mix(in_srgb,var(--color-surface)_98%,white)]',
    eyebrow: 'text-slate-600',
    iconWrap:
      'border-rose-200/80 bg-rose-50 text-rose-600 shadow-none',
    title: 'text-[var(--color-foreground)]',
    message: 'text-[var(--color-muted-foreground)]',
  },
  empty: {
    accent: 'from-slate-400/20 via-indigo-300/15 to-transparent',
    container:
      'border-[var(--color-border)] bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.12),_transparent_55%),var(--color-surface)]',
    eyebrow: 'text-slate-600',
    iconWrap:
      'border-slate-200/80 bg-gradient-to-br from-white to-slate-100 text-slate-600 shadow-[0_24px_70px_-40px_rgba(71,85,105,0.45)]',
    title: 'text-[var(--color-foreground)]',
    message: 'text-[var(--color-muted-foreground)]',
  },
}

export function FeedbackPanel({
  variant,
  title,
  eyebrow,
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
    sm: 'min-h-[140px] rounded-2xl px-4 py-5',
    md: 'min-h-[220px] rounded-[28px] px-6 py-7 sm:px-8',
    lg: 'min-h-[320px] rounded-[32px] px-7 py-8 sm:px-10 sm:py-10',
  }

  const titleMap: Record<FeedbackVariant, string> = {
    loading: 'Loading...',
    error: 'Something went wrong',
    empty: 'No content',
  }

  const sizeContentClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-5',
  }

  return (
    <div
      className={clsx(
        'relative isolate overflow-hidden border shadow-[0_28px_80px_-48px_rgba(15,23,42,0.35)]',
        'ring-1 ring-black/5 backdrop-blur-xl',
        styles.container,
        sizeClasses[size],
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={clsx(
          'pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b opacity-90',
          styles.accent,
          variant === 'error' && 'hidden',
        )}
      />
      <div
        aria-hidden="true"
        className={clsx(
          'pointer-events-none absolute -right-10 bottom-0 h-28 w-28 rounded-full bg-white/40 blur-3xl',
          variant === 'error' && 'hidden',
        )}
      />

      <div
        className={clsx(
          'relative mx-auto flex max-w-xl flex-col items-center justify-center text-center',
          sizeContentClasses[size],
        )}
      >
        <div
          className={clsx(
            'inline-flex h-14 w-14 items-center justify-center rounded-2xl border',
            styles.iconWrap,
          )}
        >
          {displayIcon}
        </div>

        <div className="space-y-2">
          {eyebrow && (
            <p
              className={clsx(
                'text-[11px] font-semibold uppercase tracking-[0.28em]',
                styles.eyebrow,
              )}
            >
              {eyebrow}
            </p>
          )}

          <h3
            className={clsx(
              'text-balance text-lg font-semibold sm:text-xl',
              styles.title,
            )}
          >
            {title ?? titleMap[variant]}
          </h3>

          {message && (
            <p
              className={clsx(
                'mx-auto max-w-lg text-sm leading-6 sm:text-[15px]',
                styles.message,
              )}
            >
              {message}
            </p>
          )}
        </div>

        {children}

        {action && (
          <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbackPanel
