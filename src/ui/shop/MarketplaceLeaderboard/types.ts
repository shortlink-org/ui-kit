import * as React from 'react'

export type LeaderboardFilterId = string

export interface LeaderboardBadge {
  label: string
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger'
}

export interface LeaderboardStat {
  id: string
  label: string
  value: string | number
  change?: string
  tone?: 'neutral' | 'accent' | 'success' | 'warning'
}

export interface LeaderboardFilter {
  id: LeaderboardFilterId
  label: string
  count?: number
}

export interface LeaderboardEntry {
  id: string | number
  rank: number
  name: string
  subtitle?: string
  avatarSrc?: string
  avatarAlt?: string
  href?: string
  score: number
  scoreDisplay?: string
  delta?: number
  metric?: string
  note?: string
  badge?: LeaderboardBadge
  isCurrentUser?: boolean
  verified?: boolean
  accentColor?: string
}

export interface MarketplaceLeaderboardProps {
  eyebrow?: string
  title: string
  description?: string
  scoreLabel?: string
  entries: LeaderboardEntry[]
  stats?: LeaderboardStat[]
  filters?: LeaderboardFilter[]
  selectedFilterId?: LeaderboardFilterId
  onFilterChange?: (filterId: LeaderboardFilterId) => void
  visibleRows?: number
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  showPodium?: boolean
  pinCurrentUser?: boolean
  mobileRankingLayout?: 'vertical' | 'horizontal'
  headerAction?: React.ReactNode
  className?: string
}

export interface LeaderboardFiltersProps {
  filters: LeaderboardFilter[]
  selectedFilterId?: LeaderboardFilterId
  onFilterChange?: (filterId: LeaderboardFilterId) => void
  className?: string
}

export interface LeaderboardPodiumProps {
  entries: LeaderboardEntry[]
  scoreLabel?: string
  formatScore?: (value: number) => string
  className?: string
}

export interface LeaderboardListProps {
  entries: LeaderboardEntry[]
  scoreLabel?: string
  formatScore?: (value: number) => string
  className?: string
  orientation?: 'vertical' | 'horizontal'
  currentUserId?: LeaderboardEntry['id']
  onEntryClick?: (entry: LeaderboardEntry) => void
}
