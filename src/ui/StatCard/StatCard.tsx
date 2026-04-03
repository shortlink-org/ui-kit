import type { ReactNode } from 'react'
import { clsx } from 'clsx'

export type StatCardTone =
  | 'neutral'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'

export interface StatCardProps {
  label: ReactNode
  value: ReactNode
  change?: ReactNode
  tone?: StatCardTone
  className?: string
  labelClassName?: string
  valueClassName?: string
  changeClassName?: string
}

const statCardToneClasses: Record<StatCardTone, string> = {
  neutral:
    'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)]',
  accent:
    'border-sky-200/80 bg-sky-50/70 text-[var(--color-foreground)] dark:border-sky-900/50 dark:bg-sky-950/20',
  success:
    'border-emerald-200/80 bg-emerald-50/70 text-[var(--color-foreground)] dark:border-emerald-900/50 dark:bg-emerald-950/20',
  warning:
    'border-amber-200/80 bg-amber-50/70 text-[var(--color-foreground)] dark:border-amber-900/50 dark:bg-amber-950/20',
  danger:
    'border-rose-200/80 bg-rose-50/70 text-[var(--color-foreground)] dark:border-rose-900/50 dark:bg-rose-950/20',
}

const statCardAccentClasses: Record<StatCardTone, string> = {
  neutral: 'bg-slate-300/70 dark:bg-slate-700/70',
  accent: 'bg-sky-500/70',
  success: 'bg-emerald-500/70',
  warning: 'bg-amber-500/70',
  danger: 'bg-rose-500/70',
}

const statCardChangeToneClasses: Record<StatCardTone, string> = {
  neutral:
    'border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-muted-foreground)]',
  accent:
    'border-sky-200/80 bg-sky-100/80 text-sky-800 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-200',
  success:
    'border-emerald-200/80 bg-emerald-100/80 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200',
  warning:
    'border-amber-200/80 bg-amber-100/80 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200',
  danger:
    'border-rose-200/80 bg-rose-100/80 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200',
}

export function StatCard({
  label,
  value,
  change,
  tone = 'neutral',
  className,
  labelClassName,
  valueClassName,
  changeClassName,
}: StatCardProps) {
  return (
    <div
      className={clsx(
        'relative flex h-full min-h-0 flex-col overflow-hidden rounded-[1rem] border p-0 shadow-[0_14px_32px_-26px_rgba(15,23,42,0.24)] transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.22)] sm:rounded-[1.2rem]',
        statCardToneClasses[tone],
        className,
      )}
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-0 h-0.5',
          statCardAccentClasses[tone],
        )}
        aria-hidden="true"
      />

      <div className="flex min-h-0 flex-1 flex-col gap-2 p-3 sm:gap-2.5 sm:p-4">
        <p
          className={clsx(
            'min-w-0 text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] text-[var(--color-muted-foreground)] sm:text-[11px]',
            labelClassName,
          )}
        >
          {label}
        </p>

        {change ? (
          <span
            className={clsx(
              'inline-flex max-w-full shrink-0 self-start rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] sm:py-1 sm:text-[10px] sm:tracking-[0.14em]',
              statCardChangeToneClasses[tone],
              changeClassName,
            )}
          >
            {change}
          </span>
        ) : null}

        <div
          className={clsx(
            'mt-auto text-xl font-semibold leading-[1.1] tracking-tight text-[var(--color-foreground)] sm:text-[1.85rem]',
            valueClassName,
          )}
        >
          {value}
        </div>
      </div>
    </div>
  )
}

export default StatCard
