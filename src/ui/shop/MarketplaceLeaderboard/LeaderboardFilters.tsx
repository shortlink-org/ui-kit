import { clsx } from 'clsx'
import { motion } from 'motion/react'
import type { LeaderboardFiltersProps } from './types'

export function LeaderboardFilters({
  filters,
  selectedFilterId,
  onFilterChange,
  className,
}: LeaderboardFiltersProps) {
  if (filters.length === 0) {
    return null
  }

  return (
    <div className={clsx('flex flex-wrap gap-2', className)}>
      {filters.map((filter) => {
        const selected = filter.id === selectedFilterId

        return (
          <motion.button
            key={filter.id}
            layout
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterChange?.(filter.id)}
            className={clsx(
              'focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium',
              selected
                ? 'border-sky-300/70 bg-sky-500/12 text-sky-700 shadow-[0_12px_30px_-20px_rgba(14,165,233,0.8)] dark:border-sky-400/30 dark:text-sky-200'
                : 'border-[var(--color-border)] bg-white/70 text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] dark:bg-white/5',
            )}
          >
            <span>{filter.label}</span>
            {filter.count !== undefined ? (
              <span
                className={clsx(
                  'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                  selected
                    ? 'bg-white/80 text-sky-700 dark:bg-white/10 dark:text-sky-100'
                    : 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
                )}
              >
                {filter.count}
              </span>
            ) : null}
          </motion.button>
        )
      })}
    </div>
  )
}
