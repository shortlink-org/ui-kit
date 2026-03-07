import { clsx } from 'clsx'
import { motion } from 'motion/react'
import {
  CheckBadgeIcon,
  TrophyIcon as TrophySolidIcon,
} from '@heroicons/react/24/solid'
import { LeaderboardAvatar } from './LeaderboardAvatar'
import { LeaderboardBadgePill } from './LeaderboardBadgePill'
import type { LeaderboardEntry, LeaderboardPodiumProps } from './types'
import { defaultFormatScore, scoreLabelValue } from './utils'

const podiumHeights = ['lg:mt-12', 'lg:-mt-3', 'lg:mt-20']

interface PodiumCardProps {
  entry: LeaderboardEntry
  position: number
  scoreLabel?: string
  formatScore?: (value: number) => string
}

function PodiumCard({
  entry,
  position,
  scoreLabel,
  formatScore,
}: PodiumCardProps) {
  const accentColor = entry.accentColor ?? 'rgba(56, 189, 248, 0.22)'
  const isChampion = position === 0

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: position * 0.08 }}
      className={clsx(
        'relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-[var(--color-surface)] p-5 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.5)] dark:border-white/8',
        podiumHeights[position],
        isChampion && 'ring-1 ring-amber-300/50 dark:ring-amber-400/20',
      )}
      style={{
        backgroundImage: `radial-gradient(circle at top, ${accentColor}, transparent 55%)`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={clsx(
            'inline-flex size-10 items-center justify-center rounded-2xl text-sm font-semibold',
            isChampion
              ? 'bg-amber-400/20 text-amber-700 dark:text-amber-200'
              : 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
          )}
        >
          #{entry.rank}
        </span>
        {entry.badge ? <LeaderboardBadgePill badge={entry.badge} /> : null}
      </div>

      <div className="mt-8 flex flex-col items-center text-center">
        <div className="relative">
          <LeaderboardAvatar entry={entry} size="lg" />
          {isChampion ? (
            <span className="absolute -right-2 -top-2 rounded-full bg-amber-400 p-1.5 text-slate-950 shadow-lg">
              <TrophySolidIcon className="size-4" aria-hidden="true" />
            </span>
          ) : null}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
              {entry.name}
            </h3>
            {entry.verified ? (
              <CheckBadgeIcon
                className="size-5 text-sky-500 dark:text-sky-300"
                aria-hidden="true"
              />
            ) : null}
          </div>
          {entry.subtitle ? (
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              {entry.subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-5 rounded-2xl bg-white/75 px-4 py-3 shadow-sm dark:bg-white/6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
            {scoreLabel ?? 'Score'}
          </div>
          <div className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
            {scoreLabelValue(entry, formatScore)}
          </div>
        </div>

        {entry.metric ? (
          <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">
            {entry.metric}
          </p>
        ) : null}
      </div>
    </motion.article>
  )
}

function MobilePodiumList({
  entries,
  scoreLabel,
  formatScore,
}: {
  entries: LeaderboardEntry[]
  scoreLabel?: string
  formatScore?: (value: number) => string
}) {
  return (
    <div className="space-y-3 lg:hidden">
      {entries.map((entry, index) => {
        const isChampion = index === 0

        return (
          <motion.article
            key={entry.id}
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: index * 0.06 }}
            className={clsx(
              'flex items-center gap-3 rounded-[1.35rem] border bg-[var(--color-surface)] p-3.5 shadow-[0_18px_42px_-34px_rgba(15,23,42,0.55)]',
              isChampion
                ? 'border-amber-300/50 ring-1 ring-amber-300/40 dark:border-amber-400/20 dark:ring-amber-400/20'
                : 'border-[var(--color-border)]',
            )}
          >
            <div
              className={clsx(
                'inline-flex size-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold',
                isChampion
                  ? 'bg-amber-400/20 text-amber-700 dark:text-amber-200'
                  : 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
              )}
            >
              #{entry.rank}
            </div>

            <LeaderboardAvatar entry={entry} size="sm" />

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-[var(--color-foreground)]">
                  {entry.name}
                </p>
                {entry.verified ? (
                  <CheckBadgeIcon
                    className="size-4 shrink-0 text-sky-500 dark:text-sky-300"
                    aria-hidden="true"
                  />
                ) : null}
                {isChampion ? (
                  <TrophySolidIcon
                    className="size-4 shrink-0 text-amber-500 dark:text-amber-300"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              {entry.subtitle ? (
                <p className="mt-0.5 truncate text-xs text-[var(--color-muted-foreground)]">
                  {entry.subtitle}
                </p>
              ) : null}
            </div>

            <div className="text-right">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                {scoreLabel ?? 'Score'}
              </div>
              <div className="mt-1 text-sm font-semibold text-[var(--color-foreground)]">
                {scoreLabelValue(entry, formatScore)}
              </div>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}

export function LeaderboardPodium({
  entries,
  scoreLabel,
  formatScore = defaultFormatScore,
  className,
}: LeaderboardPodiumProps) {
  const podiumEntries = [...entries].sort((a, b) => a.rank - b.rank).slice(0, 3)

  if (podiumEntries.length === 0) {
    return null
  }

  const orderedEntries =
    podiumEntries.length === 3
      ? [podiumEntries[1], podiumEntries[0], podiumEntries[2]]
      : podiumEntries

  return (
    <div className={className}>
      <MobilePodiumList
        entries={podiumEntries}
        scoreLabel={scoreLabel}
        formatScore={formatScore}
      />

      <div className="hidden gap-4 lg:grid lg:grid-cols-3 lg:items-end">
        {orderedEntries.map((entry, index) => {
          const position = podiumEntries.findIndex(
            (podiumEntry) => podiumEntry.id === entry.id,
          )

          return (
            <PodiumCard
              key={entry.id}
              entry={entry}
              position={position === -1 ? index : position}
              scoreLabel={scoreLabel}
              formatScore={formatScore}
            />
          )
        })}
      </div>
    </div>
  )
}
