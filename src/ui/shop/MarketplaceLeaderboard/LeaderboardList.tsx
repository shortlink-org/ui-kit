import * as React from 'react'
import { clsx } from 'clsx'
import { motion } from 'motion/react'
import {
  ArrowDownIcon,
  ArrowPathIcon,
  ArrowUpIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline'
import { LeaderboardAvatar } from './LeaderboardAvatar'
import { LeaderboardBadgePill } from './LeaderboardBadgePill'
import type { LeaderboardEntry, LeaderboardListProps } from './types'
import { defaultFormatScore, getDeltaTone, scoreLabelValue } from './utils'

function getDeltaIcon(delta?: number): React.ReactNode {
  if (delta === undefined || delta === 0) {
    return <ArrowPathIcon className="size-3.5" aria-hidden="true" />
  }

  if (delta > 0) {
    return <ArrowUpIcon className="size-3.5" aria-hidden="true" />
  }

  return <ArrowDownIcon className="size-3.5" aria-hidden="true" />
}

interface LeaderboardRowProps {
  entry: LeaderboardEntry
  scoreLabel?: string
  formatScore?: (value: number) => string
  orientation?: 'vertical' | 'horizontal'
  onEntryClick?: (entry: LeaderboardEntry) => void
}

function HorizontalLeaderboardCard({
  entry,
  scoreLabel,
  formatScore,
  onEntryClick,
}: LeaderboardRowProps) {
  const content = (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className={clsx(
        'group relative flex h-full w-[16rem] shrink-0 flex-col gap-4 overflow-hidden rounded-[1.35rem] border p-4',
        entry.isCurrentUser
          ? 'border-sky-300/70 bg-sky-500/10 shadow-[0_24px_60px_-40px_rgba(14,165,233,0.9)] dark:border-sky-400/20'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-slate-300/70 dark:hover:border-slate-600',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="grid place-items-center">
            <span className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
              {entry.rank}
            </span>
            <span
              className={clsx(
                'mt-1 inline-flex items-center gap-1 text-xs font-semibold',
                getDeltaTone(entry.delta),
              )}
            >
              {getDeltaIcon(entry.delta)}
              {entry.delta === undefined || entry.delta === 0
                ? 'steady'
                : Math.abs(entry.delta)}
            </span>
          </div>
          <LeaderboardAvatar entry={entry} size="sm" />
        </div>

        <div className="flex flex-col items-end gap-2">
          {entry.badge ? <LeaderboardBadgePill badge={entry.badge} /> : null}
          {entry.isCurrentUser ? (
            <span className="rounded-full bg-sky-500/12 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-200">
              You
            </span>
          ) : null}
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="line-clamp-2 text-lg font-semibold leading-6 text-[var(--color-foreground)]">
            {entry.name}
          </p>
          {entry.verified ? (
            <CheckBadgeIcon
              className="size-4 shrink-0 text-sky-500 dark:text-sky-300"
              aria-hidden="true"
            />
          ) : null}
        </div>
        {entry.subtitle ? (
          <p className="mt-1 line-clamp-1 text-sm text-[var(--color-muted-foreground)]">
            {entry.subtitle}
          </p>
        ) : null}
      </div>

      <div className="mt-auto space-y-3">
        {entry.metric ? (
          <div className="rounded-xl bg-[var(--color-muted)] px-3 py-2 text-sm text-[var(--color-muted-foreground)]">
            {entry.metric}
          </div>
        ) : null}

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-white dark:bg-white dark:text-slate-950">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60 dark:text-slate-500">
            {scoreLabel ?? 'Score'}
          </div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">
            {scoreLabelValue(entry, formatScore)}
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (entry.href) {
    return (
      <a
        href={entry.href}
        className="block rounded-[1.35rem] focus-ring"
        onClick={() => onEntryClick?.(entry)}
      >
        {content}
      </a>
    )
  }

  if (onEntryClick) {
    return (
      <button
        type="button"
        onClick={() => onEntryClick(entry)}
        className="block w-[16rem] shrink-0 rounded-[1.35rem] text-left focus-ring"
      >
        {content}
      </button>
    )
  }

  return content
}

function LeaderboardRow({
  entry,
  scoreLabel,
  formatScore,
  orientation = 'vertical',
  onEntryClick,
}: LeaderboardRowProps) {
  const isHorizontal = orientation === 'horizontal'

  if (isHorizontal) {
    return (
      <HorizontalLeaderboardCard
        entry={entry}
        scoreLabel={scoreLabel}
        formatScore={formatScore}
        orientation={orientation}
        onEntryClick={onEntryClick}
      />
    )
  }

  const content = (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className={clsx(
        'group relative overflow-hidden border',
        'rounded-[1.45rem] p-4 sm:p-5',
        entry.isCurrentUser
          ? 'border-sky-300/70 bg-sky-500/10 shadow-[0_24px_60px_-40px_rgba(14,165,233,0.9)] dark:border-sky-400/20'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-slate-300/70 dark:hover:border-slate-600',
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent opacity-70 dark:via-white/15"
        aria-hidden="true"
      />

      <div
        className={clsx(
          'flex gap-4',
          'flex-col sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="grid w-11 place-items-center">
              <span className="text-xl font-semibold tracking-tight text-[var(--color-foreground)]">
                {entry.rank}
              </span>
              <span
                className={clsx(
                  'mt-1 inline-flex items-center gap-1 text-xs font-semibold',
                  getDeltaTone(entry.delta),
                )}
              >
                {getDeltaIcon(entry.delta)}
                {entry.delta === undefined || entry.delta === 0
                  ? 'steady'
                  : Math.abs(entry.delta)}
              </span>
            </div>

            <LeaderboardAvatar entry={entry} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-base font-semibold text-[var(--color-foreground)]">
                {entry.name}
              </p>
              {entry.verified ? (
                <CheckBadgeIcon
                  className="size-4 shrink-0 text-sky-500 dark:text-sky-300"
                  aria-hidden="true"
                />
              ) : null}
              {entry.isCurrentUser ? (
                <span className="rounded-full bg-sky-500/12 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-200">
                  You
                </span>
              ) : null}
              {entry.badge ? <LeaderboardBadgePill badge={entry.badge} /> : null}
            </div>
            {entry.subtitle ? (
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                {entry.subtitle}
              </p>
            ) : null}
            {entry.note ? (
              <p className="mt-2 hidden text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted-foreground)] sm:block">
                {entry.note}
              </p>
            ) : null}
          </div>
        </div>

        <div
          className={clsx(
            'flex flex-wrap items-center gap-3 sm:justify-end',
          )}
        >
          {entry.metric ? (
            <div className="rounded-2xl bg-[var(--color-muted)] px-3 py-2 text-sm text-[var(--color-muted-foreground)]">
              {entry.metric}
            </div>
          ) : null}
          <div className="rounded-2xl bg-slate-950 px-3 py-2.5 text-left text-white shadow-[0_22px_50px_-30px_rgba(15,23,42,0.8)] sm:px-4 sm:py-3 sm:text-right dark:bg-white dark:text-slate-950">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60 dark:text-slate-500">
              {scoreLabel ?? 'Score'}
            </div>
            <div className="mt-1 text-base font-semibold tracking-tight sm:text-lg">
              {scoreLabelValue(entry, formatScore)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (entry.href) {
    return (
      <a
        href={entry.href}
        className="block rounded-[1.45rem] focus-ring"
        onClick={() => onEntryClick?.(entry)}
      >
        {content}
      </a>
    )
  }

  if (onEntryClick) {
    return (
      <button
        type="button"
        onClick={() => onEntryClick(entry)}
        className="block w-full rounded-[1.45rem] text-left focus-ring"
      >
        {content}
      </button>
    )
  }

  return content
}

export function LeaderboardList({
  entries,
  scoreLabel,
  formatScore = defaultFormatScore,
  className,
  orientation = 'vertical',
  onEntryClick,
}: LeaderboardListProps) {
  if (orientation === 'horizontal') {
    return (
      <div className={clsx('-mx-4 overflow-x-auto px-4 pb-2', className)}>
        <div className="flex min-w-max gap-3 pr-4">
          {entries.map((entry) => (
            <LeaderboardRow
              key={entry.id}
              entry={entry}
              scoreLabel={scoreLabel}
              formatScore={formatScore}
              orientation="horizontal"
              onEntryClick={onEntryClick}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={clsx('space-y-3', className)}>
      {entries.map((entry) => (
        <LeaderboardRow
          key={entry.id}
          entry={entry}
          scoreLabel={scoreLabel}
          formatScore={formatScore}
          orientation="vertical"
          onEntryClick={onEntryClick}
        />
      ))}
    </div>
  )
}
