import * as React from 'react'
import clsx from 'clsx'

export interface ProfileIdentityProps {
  avatarSrc?: string
  avatarAlt?: string
  name?: string
  email?: string
  label?: string
  size?: 'sm' | 'md'
  className?: string
  avatarClassName?: string
  detailsClassName?: string
  nameClassName?: string
  emailClassName?: string
  labelClassName?: string
  accessory?: React.ReactNode
  avatarOverlay?: React.ReactNode
  showDetails?: boolean
  avatarShape?: 'circle' | 'rounded'
}

const sizeClasses = {
  sm: {
    wrapper: 'gap-2.5',
    avatar: 'size-8',
    textGap: 'space-y-0.5',
    name: 'text-sm leading-5',
    email: 'text-xs leading-4',
    label: 'text-[11px] tracking-[0.22em]',
  },
  md: {
    wrapper: 'gap-3',
    avatar: 'size-10',
    textGap: 'space-y-0.5',
    name: 'text-sm leading-5',
    email: 'text-xs leading-4',
    label: 'text-[11px] tracking-[0.22em]',
  },
}

export function ProfileIdentity({
  avatarSrc,
  avatarAlt,
  name = 'User',
  email,
  label,
  size = 'md',
  className,
  avatarClassName,
  detailsClassName,
  nameClassName,
  emailClassName,
  labelClassName,
  accessory,
  avatarOverlay,
  showDetails = true,
  avatarShape = 'circle',
}: ProfileIdentityProps) {
  const sizeConfig = sizeClasses[size]
  const resolvedAvatarSrc =
    avatarSrc ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=random`

  return (
    <div
      className={clsx(
        'flex min-w-0 items-center',
        sizeConfig.wrapper,
        className,
      )}
    >
      <div className="relative shrink-0">
        <img
          src={resolvedAvatarSrc}
          alt={avatarAlt || name || 'User profile'}
          className={clsx(
            sizeConfig.avatar,
            avatarShape === 'circle' ? 'rounded-full' : 'rounded-2xl',
            'bg-[var(--color-muted)] object-cover',
            avatarClassName,
          )}
        />
        {avatarOverlay}
      </div>

      {showDetails ? (
        <div className={clsx('min-w-0 flex-1', sizeConfig.textGap, detailsClassName)}>
          {name ? (
            <p
              className={clsx(
                'truncate font-semibold text-[var(--color-foreground)]',
                sizeConfig.name,
                nameClassName,
              )}
            >
              {name}
            </p>
          ) : null}
          {email ? (
            <p
              className={clsx(
                'truncate text-[var(--color-muted-foreground)]',
                sizeConfig.email,
                emailClassName,
              )}
            >
              {email}
            </p>
          ) : null}
          {label ? (
            <p
              className={clsx(
                'font-semibold uppercase text-[var(--color-muted-foreground)]',
                sizeConfig.label,
                labelClassName,
              )}
            >
              {label}
            </p>
          ) : null}
        </div>
      ) : null}

      {accessory}
    </div>
  )
}

export default ProfileIdentity
