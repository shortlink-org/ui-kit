import * as React from 'react'
import { clsx } from 'clsx'
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
} from 'motion/react'
import {
  ArrowTrendingUpIcon,
  BoltIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import { Skeleton } from '../../Skeleton/Skeleton'
import { LeaderboardFilters } from './LeaderboardFilters'
import { LeaderboardList } from './LeaderboardList'
import { LeaderboardPodium } from './LeaderboardPodium'
import { LeaderboardStatCard } from './LeaderboardStatCard'
import type { MarketplaceLeaderboardProps } from './types'
import { defaultFormatScore } from './utils'

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          >
            <Skeleton className="h-10 w-10 rounded-2xl" />
            <div className="mt-8 flex flex-col items-center">
              <Skeleton circular className="h-16 w-16" />
              <Skeleton className="mt-4 h-5 w-28" />
              <Skeleton className="mt-2 h-4 w-24" />
              <Skeleton className="mt-6 h-16 w-full rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[1.45rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-10 rounded-xl" />
              <Skeleton circular className="h-12 w-12" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-14 w-28 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyState({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="rounded-[1.8rem] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center">
      <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
        <TrophyIcon className="size-8" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-foreground)]">
        {title}
      </h3>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--color-muted-foreground)]">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export function MarketplaceLeaderboard({
  eyebrow = 'Marketplace leaderboard',
  title,
  description,
  scoreLabel = 'GMV',
  entries,
  stats = [],
  filters = [],
  selectedFilterId,
  onFilterChange,
  visibleRows = 8,
  loading = false,
  emptyTitle = 'No ranked entries yet',
  emptyDescription = 'Once your marketplace campaign starts receiving activity, rankings will show up here.',
  showPodium = true,
  pinCurrentUser = true,
  mobileRankingLayout = 'vertical',
  headerAction,
  className,
}: MarketplaceLeaderboardProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = React.useRef<HTMLElement | null>(null)
  const [isCompactLayout, setIsCompactLayout] = React.useState(true)

  React.useEffect(() => {
    const node = containerRef.current

    if (!node || typeof ResizeObserver === 'undefined') {
      return
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]

      if (!entry) {
        return
      }

      setIsCompactLayout(entry.contentRect.width < 1024)
    })

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const sortedEntries = [...entries].sort((a, b) => a.rank - b.rank)
  const visibleEntries = sortedEntries.slice(0, visibleRows)
  const mobileEntries =
    mobileRankingLayout === 'horizontal'
      ? visibleEntries
      : showPodium && sortedEntries.length >= 3
      ? visibleEntries.slice(3)
      : visibleEntries
  const pinnedCurrentUserEntry =
    pinCurrentUser && visibleEntries.some((entry) => entry.isCurrentUser)
      ? undefined
      : sortedEntries.find((entry) => entry.isCurrentUser)

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <section
          ref={containerRef}
          className={clsx(
            'relative overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-background)] p-4 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.75)] sm:rounded-[2rem] sm:p-8',
            className,
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            aria-hidden="true"
          >
            <div className="absolute left-[-12%] top-[-8%] h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="absolute right-[-8%] top-[10%] h-72 w-72 rounded-full bg-amber-300/18 blur-3xl" />
            <div className="absolute bottom-[-18%] left-[12%] h-72 w-72 rounded-full bg-emerald-300/14 blur-3xl" />
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)] shadow-sm sm:px-3 sm:text-[11px] sm:tracking-[0.18em] dark:border-white/10 dark:bg-white/6">
                  <BoltIcon className="size-3.5" aria-hidden="true" />
                  {eyebrow}
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-foreground)] sm:mt-4 sm:text-4xl">
                  {title}
                </h2>
                {description ? (
                  <p className="mt-2 max-w-2xl text-sm leading-5 text-[var(--color-muted-foreground)] sm:mt-3 sm:text-base sm:leading-6">
                    {description}
                  </p>
                ) : null}
              </div>

              {headerAction ? (
                <div className="shrink-0 max-sm:w-full">{headerAction}</div>
              ) : null}
            </div>

            {stats.length > 0 ? (
              <div className="mt-5 grid gap-2.5 sm:mt-6 sm:gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <LeaderboardStatCard
                    key={stat.id}
                    stat={stat}
                    formatScore={defaultFormatScore}
                  />
                ))}
              </div>
            ) : null}

            {filters.length > 0 ? (
              <LeaderboardFilters
                filters={filters}
                selectedFilterId={selectedFilterId}
                onFilterChange={onFilterChange}
                className="mt-5 sm:mt-6"
              />
            ) : null}

            <div className="mt-6 sm:mt-8">
              {loading ? (
                <LoadingState />
              ) : sortedEntries.length === 0 ? (
                <EmptyState title={emptyTitle} description={emptyDescription} />
              ) : (
                <div className="space-y-6">
                  {showPodium && sortedEntries.length >= 3 ? (
                    mobileRankingLayout === 'horizontal' ? (
                      !isCompactLayout ? (
                        <LeaderboardPodium
                          entries={sortedEntries}
                          scoreLabel={scoreLabel}
                        />
                      ) : null
                    ) : (
                      <LeaderboardPodium
                        entries={sortedEntries}
                        scoreLabel={scoreLabel}
                      />
                    )
                  ) : null}

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={selectedFilterId ?? 'default'}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="flex items-center justify-between gap-3 pb-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)] sm:text-sm">
                            Live ranking
                          </p>
                          <p className="mt-1 text-xs text-[var(--color-muted-foreground)] sm:text-sm">
                            Position, momentum and {scoreLabel.toLowerCase()} performance in one view.
                          </p>
                        </div>
                        <div className="hidden items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 px-3 py-2 text-sm text-[var(--color-muted-foreground)] shadow-sm dark:bg-white/5 sm:inline-flex">
                          <ArrowTrendingUpIcon className="size-4" aria-hidden="true" />
                          Updated just now
                        </div>
                      </div>

                      {isCompactLayout ? (
                        <LeaderboardList
                          entries={mobileEntries}
                          scoreLabel={scoreLabel}
                          orientation={mobileRankingLayout}
                        />
                      ) : (
                        <LeaderboardList
                          entries={visibleEntries}
                          scoreLabel={scoreLabel}
                        />
                      )}

                      {pinnedCurrentUserEntry ? (
                        <div className="mt-4">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                            Your placement
                          </p>
                          {mobileRankingLayout === 'horizontal' ? (
                            isCompactLayout ? (
                              <LeaderboardList
                                entries={[pinnedCurrentUserEntry]}
                                scoreLabel={scoreLabel}
                                orientation="horizontal"
                              />
                            ) : (
                              <LeaderboardList
                                entries={[pinnedCurrentUserEntry]}
                                scoreLabel={scoreLabel}
                              />
                            )
                          ) : (
                            <LeaderboardList
                              entries={[pinnedCurrentUserEntry]}
                              scoreLabel={scoreLabel}
                            />
                          )}
                        </div>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </section>
      </LayoutGroup>
    </MotionConfig>
  )
}

export default MarketplaceLeaderboard
