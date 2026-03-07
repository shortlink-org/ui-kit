import type { LeaderboardEntry } from './types'

export function defaultFormatScore(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`
  }

  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}K`
  }

  return new Intl.NumberFormat('en-US').format(value)
}

export function getDeltaTone(delta?: number): string {
  if (delta === undefined || delta === 0) {
    return 'text-[var(--color-muted-foreground)]'
  }

  if (delta > 0) {
    return 'text-emerald-600 dark:text-emerald-300'
  }

  return 'text-rose-600 dark:text-rose-300'
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function scoreLabelValue(
  entry: LeaderboardEntry,
  formatScore?: (value: number) => string,
): string {
  if (entry.scoreDisplay) {
    return entry.scoreDisplay
  }

  return (formatScore ?? defaultFormatScore)(entry.score)
}
