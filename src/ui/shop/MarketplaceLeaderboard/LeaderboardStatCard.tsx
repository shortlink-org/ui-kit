import { clsx } from 'clsx'
import { motion } from 'motion/react'
import type { LeaderboardStat } from './types'
import { AnimatedMetricValue } from './AnimatedMetricValue'

const statToneClasses: Record<NonNullable<LeaderboardStat['tone']>, string> = {
  neutral:
    'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)]',
  accent:
    'border-sky-200/80 bg-sky-50/70 text-[var(--color-foreground)] dark:border-sky-900/50 dark:bg-sky-950/20',
  success:
    'border-emerald-200/80 bg-emerald-50/70 text-[var(--color-foreground)] dark:border-emerald-900/50 dark:bg-emerald-950/20',
  warning:
    'border-amber-200/80 bg-amber-50/70 text-[var(--color-foreground)] dark:border-amber-900/50 dark:bg-amber-950/20',
}

const changeToneClasses: Record<NonNullable<LeaderboardStat['tone']>, string> = {
  neutral:
    'border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-muted-foreground)]',
  accent:
    'border-sky-200/80 bg-sky-100/80 text-sky-800 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-200',
  success:
    'border-emerald-200/80 bg-emerald-100/80 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200',
  warning:
    'border-amber-200/80 bg-amber-100/80 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200',
}

interface LeaderboardStatCardProps {
  stat: LeaderboardStat
  formatScore?: (value: number) => string
}

export function LeaderboardStatCard({
  stat,
  formatScore,
}: LeaderboardStatCardProps) {
  const tone = stat.tone ?? 'neutral'

  return (
    <motion.div
      layout
      className={clsx(
        'relative overflow-hidden rounded-[1rem] border p-3 shadow-[0_14px_32px_-26px_rgba(15,23,42,0.24)] sm:rounded-[1.2rem] sm:p-4',
        statToneClasses[tone],
      )}
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-0 h-0.5',
          tone === 'accent' && 'bg-sky-500/70',
          tone === 'success' && 'bg-emerald-500/70',
          tone === 'warning' && 'bg-amber-500/70',
          tone === 'neutral' && 'bg-slate-300/70 dark:bg-slate-700/70',
        )}
        aria-hidden="true"
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)] sm:text-[11px]">
          {stat.label}
        </p>
        {stat.change ? (
          <span
            className={clsx(
              'rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] sm:py-1 sm:text-[10px]',
              changeToneClasses[tone],
            )}
          >
            {stat.change}
          </span>
        ) : null}
      </div>
      <div className="mt-2 text-xl font-semibold tracking-tight text-[var(--color-foreground)] sm:mt-3 sm:text-[1.85rem]">
        {typeof stat.value === 'number' ? (
          <AnimatedMetricValue value={stat.value} formatter={formatScore} />
        ) : (
          stat.value
        )}
      </div>
    </motion.div>
  )
}
