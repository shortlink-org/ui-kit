import { clsx } from 'clsx'
import type { LeaderboardEntry } from './types'
import { getInitials } from './utils'

interface LeaderboardAvatarProps {
  entry: LeaderboardEntry
  size?: 'sm' | 'md' | 'lg'
}

export function LeaderboardAvatar({
  entry,
  size = 'md',
}: LeaderboardAvatarProps) {
  const avatarSize =
    size === 'lg' ? 'size-16' : size === 'sm' ? 'size-10' : 'size-12'
  const textSize =
    size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-xs' : 'text-sm'

  if (entry.avatarSrc) {
    return (
      <img
        src={entry.avatarSrc}
        alt={entry.avatarAlt ?? entry.name}
        className={clsx(
          avatarSize,
          'rounded-2xl border border-white/70 object-cover shadow-sm dark:border-white/10',
        )}
      />
    )
  }

  return (
    <div
      className={clsx(
        avatarSize,
        textSize,
        'grid place-items-center rounded-2xl border border-white/70 font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:text-slate-100',
        'bg-linear-to-br from-slate-100 via-white to-slate-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900',
      )}
      aria-hidden="true"
    >
      {getInitials(entry.name)}
    </div>
  )
}
