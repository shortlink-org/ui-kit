'use client'

import * as React from 'react'
import clsx from 'clsx'
import ActiveLink from './ActiveLink'

type AppProps = {
  mode: 'full' | 'mini'
  url: string
  icon: React.JSX.Element
  name: string
  activePath?: string
  activeClassName?: string
  inactiveClassName?: string
}

function getItem({
  mode,
  url,
  icon,
  name,
  activePath,
  activeClassName,
  inactiveClassName,
}: AppProps) {
  const isActive =
    activePath !== undefined &&
    (activePath === url || activePath.startsWith(`${url}/`))

  const activeStateClassName =
    mode === 'mini'
      ? 'border-sky-200/70 bg-white text-sky-700 shadow-[0_14px_30px_-24px_rgba(14,165,233,0.28)] ring-1 ring-sky-100/80 dark:border-sky-400/25 dark:bg-[color-mix(in_srgb,var(--color-surface)_96%,white)] dark:text-sky-300 dark:ring-sky-400/10'
      : 'border-sky-300/70 bg-sky-500/12 text-[var(--color-foreground)] shadow-[0_18px_40px_-28px_rgba(14,165,233,0.55)] dark:border-sky-400/30 dark:bg-sky-400/12'
  const inactiveStateClassName =
    mode === 'mini'
      ? 'border-transparent text-[var(--color-muted-foreground)] hover:border-[var(--color-border)]/80 hover:bg-white/80 hover:text-[var(--color-foreground)]'
      : 'border-transparent text-[var(--color-muted-foreground)] hover:border-[var(--color-border)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]'

  const linkClassName = clsx(
    'group relative flex w-full cursor-pointer items-center rounded-[1rem] border text-sm font-medium transition-all duration-200 focus-visible:outline-none',
    mode === 'mini'
      ? 'justify-center overflow-visible px-0 py-1.5'
      : 'gap-3 overflow-hidden px-3 py-3 text-left backdrop-blur-sm',
    inactiveStateClassName,
    inactiveClassName,
    isActive && activeStateClassName,
    isActive && activeClassName,
  )

  const iconClassName = clsx(
    'size-5 shrink-0 transition-colors duration-200',
    isActive
      ? 'text-sky-700 dark:text-sky-300'
      : 'text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]',
  )

  const iconElement = React.cloneElement(icon, {
    className: clsx(
      (icon.props as { className?: string } | undefined)?.className,
      iconClassName,
    ),
    'aria-hidden': true,
  })

  return (
    <li key={url} className="w-full">
      <ActiveLink
        href={url}
        passHref
        activeClassName={clsx(activeStateClassName, activeClassName)}
        activePath={activePath}
      >
        <div
          className={linkClassName}
          aria-label={mode === 'mini' ? name : undefined}
        >
          {isActive && mode === 'full' ? (
            <span
              className={clsx(
                'absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-sky-500 transition-opacity duration-200',
              )}
              aria-hidden="true"
            />
          ) : null}

          {isActive && mode === 'mini' ? (
            <span
              className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-sky-500"
              aria-hidden="true"
            />
          ) : null}

          <span
            className={clsx(
              'inline-flex items-center justify-center rounded-[0.9rem] transition-colors duration-200',
              mode === 'mini'
                ? 'size-10 bg-transparent'
                : 'size-10 bg-[var(--color-background)]/70 group-hover:bg-[var(--color-surface)]',
              isActive &&
                mode === 'full' &&
                'bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300',
            )}
          >
            {iconElement}
          </span>

          {mode === 'mini' ? (
            <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2">
              <span
                className={clsx(
                  'relative block whitespace-nowrap rounded-xl border border-slate-200/90 bg-white px-3 py-2 text-xs font-semibold tracking-[0.08em] text-slate-900 opacity-0 shadow-[0_16px_36px_-22px_rgba(15,23,42,0.28)] ring-1 ring-slate-950/5 transition-[opacity,transform] duration-100 ease-out dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:ring-white/10',
                  'translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100',
                )}
              >
                <span
                  className="absolute left-0 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-l border-slate-200/90 bg-white dark:border-slate-700 dark:bg-slate-900"
                  aria-hidden="true"
                />
                {name}
              </span>
            </span>
          ) : null}

          {mode === 'full' ? (
            <>
              <span className="min-w-0 flex-1 truncate">{name}</span>
              <span
                className={clsx(
                  'size-2 shrink-0 rounded-full transition-colors duration-200',
                  isActive
                    ? 'bg-sky-500'
                    : 'bg-[var(--color-border)] group-hover:bg-[var(--color-muted-foreground)]',
                )}
                aria-hidden="true"
              />
            </>
          ) : null}
        </div>
      </ActiveLink>
    </li>
  )
}

export default getItem
