import { clsx } from 'clsx'
import { SparklesIcon } from '@heroicons/react/24/outline'
import type { LeaderboardBadge } from './types'

const badgeToneClasses: Record<NonNullable<LeaderboardBadge['tone']>, string> = {
  neutral:
    'border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
  accent:
    'border-amber-200/80 bg-amber-400/15 text-amber-700 dark:border-amber-400/30 dark:text-amber-200',
  success:
    'border-emerald-200/80 bg-emerald-400/15 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-200',
  warning:
    'border-orange-200/80 bg-orange-400/15 text-orange-700 dark:border-orange-400/30 dark:text-orange-200',
  danger:
    'border-rose-200/80 bg-rose-400/15 text-rose-700 dark:border-rose-400/30 dark:text-rose-200',
}

interface LeaderboardBadgePillProps {
  badge: LeaderboardBadge
}

export function LeaderboardBadgePill({
  badge,
}: LeaderboardBadgePillProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]',
        badgeToneClasses[badge.tone ?? 'neutral'],
      )}
    >
      <SparklesIcon className="size-3" aria-hidden="true" />
      {badge.label}
    </span>
  )
}
