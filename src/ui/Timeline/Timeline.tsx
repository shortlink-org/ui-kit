import type { FC, ReactNode } from 'react'
import clsx from 'clsx'

export type TimelineItem = {
  id?: string | number
  name: string
  date: string
  action: string
  content: string
  icon: ReactNode
  badge?: string
  meta?: string
  highlighted?: boolean
}

type TimelineEntryProps = {
  item: TimelineItem
  isLast: boolean
}

const TimelineEntry: FC<TimelineEntryProps> = ({ item, isLast }) => (
  <article className="group relative grid gap-4 md:grid-cols-[11rem_2.75rem_minmax(0,1fr)] md:gap-5">
    <div className="pl-14 transition-colors duration-200 md:pl-0 md:pt-1">
      <time className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700 transition-colors duration-200 group-hover:text-sky-800 dark:group-hover:text-sky-300">
        {item.date}
      </time>
      {item.meta ? (
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)] transition-colors duration-200 group-hover:text-[var(--color-foreground)]/80">
          {item.meta}
        </p>
      ) : null}
    </div>

    <div className="absolute left-0 top-0 flex w-10 flex-col items-center md:static md:w-auto">
      <div
        className={clsx(
          'relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl border text-[var(--color-foreground)]',
          'shadow-[0_16px_36px_-28px_rgba(15,23,42,0.28)] transition-[transform,background-color,border-color,color,box-shadow] duration-200 group-hover:scale-[1.03] group-hover:shadow-[0_20px_44px_-30px_rgba(15,23,42,0.24)]',
          item.highlighted
            ? 'border-sky-200/80 bg-sky-50 text-sky-700 group-hover:border-sky-300 group-hover:bg-sky-100 dark:bg-sky-950/20 dark:group-hover:bg-sky-950/30'
            : 'border-[var(--color-border)] bg-[var(--color-surface)] group-hover:border-slate-300 group-hover:bg-slate-50 dark:group-hover:border-slate-700 dark:group-hover:bg-slate-900',
        )}
      >
        <span className="relative z-10">{item.icon}</span>
      </div>

      {!isLast ? (
        <div
          aria-hidden="true"
          className="mt-3 h-[calc(100%+1rem)] w-px bg-slate-200 md:h-[calc(100%+1.5rem)] dark:bg-slate-800"
        />
      ) : null}
    </div>

    <div
      className={clsx(
        'ml-14 rounded-[1.25rem] border p-4 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.18)] transition-[transform,border-color,box-shadow,background-color] duration-200 group-hover:-translate-y-0.5 md:ml-0 md:p-5',
        item.highlighted
          ? 'border-sky-200/80 bg-sky-50/60 group-hover:border-sky-300/80 group-hover:bg-sky-50 group-hover:shadow-[0_22px_50px_-34px_rgba(14,165,233,0.18)] dark:bg-sky-950/10 dark:group-hover:bg-sky-950/20'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] group-hover:border-slate-300/80 group-hover:bg-[color-mix(in_srgb,var(--color-surface)_92%,white)] group-hover:shadow-[0_22px_50px_-36px_rgba(15,23,42,0.2)] dark:group-hover:border-slate-700 dark:group-hover:bg-slate-950',
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-lg font-semibold tracking-tight text-[var(--color-foreground)] md:text-[1.7rem]">
            <span>{item.name}</span>{' '}
            <span className="font-medium text-[var(--color-muted-foreground)]">
              {item.action}
            </span>
          </p>
        </div>
        {item.badge ? (
          <span
            className={clsx(
              'rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200',
              item.highlighted
                ? 'border-sky-200/80 bg-sky-100 text-sky-700 group-hover:border-sky-300 group-hover:bg-sky-200/70 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-200'
                : 'border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-muted-foreground)] group-hover:border-slate-300 group-hover:bg-slate-100 group-hover:text-[var(--color-foreground)] dark:group-hover:border-slate-700 dark:group-hover:bg-slate-800',
            )}
          >
            {item.badge}
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm leading-6 text-[var(--color-muted-foreground)] sm:text-[15px]">
        {item.content}
      </p>
    </div>
  </article>
)

export type TimelineProps = {
  items: TimelineItem[]
  className?: string
}

export const Timeline: FC<TimelineProps> = ({ items, className }) => {
  const getItemKey = (item: TimelineItem, index: number): string | number => {
    if (item.id !== undefined) {
      return item.id
    }

    return `${item.date}-${item.name}-${item.action}-${index}`
  }

  return (
    <div
      className={clsx(
        'rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_22px_60px_-46px_rgba(15,23,42,0.24)] sm:p-6',
        className,
      )}
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-border)] pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
            Activity stream
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
            Timeline
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[var(--color-muted-foreground)]">
          Follow key product, commerce and operations moments in one continuous
          narrative.
        </p>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <TimelineEntry
            key={getItemKey(item, index)}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

export default Timeline
