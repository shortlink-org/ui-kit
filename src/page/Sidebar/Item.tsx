'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import ActiveLink from './ActiveLink'
import { SidebarNavContext } from './SidebarNavContext'

type AppProps = {
  mode: 'full' | 'mini'
  url: string
  icon: React.JSX.Element
  name: string
  activePath?: string
  activeClassName?: string
  inactiveClassName?: string
}

function SidebarItem({
  mode,
  url,
  icon,
  name,
  activePath,
  activeClassName,
  inactiveClassName,
}: AppProps) {
  const { itemPresentation } = React.useContext(SidebarNavContext)
  const displayMode = itemPresentation === 'flyout' ? 'full' : mode

  const isActive =
    activePath !== undefined &&
    (activePath === url || activePath.startsWith(`${url}/`))

  const activeStateClassName =
    displayMode === 'mini'
      ? 'border-transparent bg-transparent text-sky-800 shadow-none ring-0 dark:text-sky-100'
      : 'border-sky-300/70 bg-sky-500/12 text-[var(--color-foreground)] shadow-[0_18px_40px_-28px_rgba(14,165,233,0.55)] dark:border-sky-400/30 dark:bg-sky-400/12'
  const inactiveStateClassName =
    displayMode === 'mini'
      ? 'border-transparent text-[var(--color-muted-foreground)] hover:bg-[color-mix(in_srgb,var(--color-muted)_38%,transparent)] hover:text-[var(--color-foreground)]'
      : 'border-transparent text-[var(--color-muted-foreground)] hover:border-[var(--color-border)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]'

  const linkClassName = clsx(
    'group relative flex w-full cursor-pointer items-center rounded-[1rem] border text-sm font-medium transition-all duration-200 focus-visible:outline-none',
    displayMode === 'mini'
      ? 'min-h-11 justify-center overflow-visible px-0 py-2'
      : 'gap-3 overflow-hidden px-3 py-3 text-left backdrop-blur-sm',
    inactiveStateClassName,
    inactiveClassName,
    isActive && activeStateClassName,
    isActive && activeClassName,
  )

  const iconClassName = clsx(
    'size-5 shrink-0 transition-colors duration-200',
    isActive
      ? displayMode === 'mini'
        ? 'text-sky-700 dark:text-sky-200'
        : 'text-sky-700 dark:text-sky-300'
      : 'text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]',
  )

  const iconElement = React.cloneElement(icon, {
    className: clsx(
      (icon.props as { className?: string } | undefined)?.className,
      iconClassName,
    ),
    'aria-hidden': true,
  })

  const anchorRef = React.useRef<HTMLDivElement>(null)
  const [miniTooltipOpen, setMiniTooltipOpen] = React.useState(false)
  const [miniTooltipPos, setMiniTooltipPos] = React.useState({
    left: 0,
    top: 0,
  })

  const updateMiniTooltipPosition = React.useCallback(() => {
    const el = anchorRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setMiniTooltipPos({ left: r.right + 12, top: r.top + r.height / 2 })
  }, [])

  React.useLayoutEffect(() => {
    if (!miniTooltipOpen || displayMode !== 'mini') return
    updateMiniTooltipPosition()
    const el = anchorRef.current
    if (!el) return
    const ro = new ResizeObserver(updateMiniTooltipPosition)
    ro.observe(el)
    window.addEventListener('scroll', updateMiniTooltipPosition, true)
    window.addEventListener('resize', updateMiniTooltipPosition)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', updateMiniTooltipPosition, true)
      window.removeEventListener('resize', updateMiniTooltipPosition)
    }
  }, [miniTooltipOpen, displayMode, updateMiniTooltipPosition])

  return (
    <li key={url} className="w-full">
      <ActiveLink
        href={url}
        passHref
        activeClassName={clsx(activeStateClassName, activeClassName)}
        activePath={activePath}
      >
        <div
          ref={anchorRef}
          className={linkClassName}
          aria-label={displayMode === 'mini' ? name : undefined}
          onPointerEnter={
            displayMode === 'mini'
              ? () => {
                  updateMiniTooltipPosition()
                  setMiniTooltipOpen(true)
                }
              : undefined
          }
          onPointerLeave={
            displayMode === 'mini' ? () => setMiniTooltipOpen(false) : undefined
          }
          onFocus={
            displayMode === 'mini'
              ? () => {
                  requestAnimationFrame(() => {
                    if (anchorRef.current?.matches(':focus-visible')) {
                      updateMiniTooltipPosition()
                      setMiniTooltipOpen(true)
                    }
                  })
                }
              : undefined
          }
          onBlur={
            displayMode === 'mini' ? () => setMiniTooltipOpen(false) : undefined
          }
        >
          {isActive && displayMode === 'full' ? (
            <span
              className={clsx(
                'absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-sky-500 transition-opacity duration-200',
              )}
              aria-hidden="true"
            />
          ) : null}

          {isActive && displayMode === 'mini' ? (
            <span
              className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-full bg-sky-500"
              aria-hidden="true"
            />
          ) : null}

          <span
            className={clsx(
              'inline-flex items-center justify-center transition-colors duration-200',
              displayMode === 'mini'
                ? 'size-11 rounded-xl bg-transparent'
                : 'size-10 rounded-[1rem] bg-[var(--color-background)]/70 group-hover:bg-[var(--color-surface)]',
              isActive &&
                displayMode === 'full' &&
                'bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300',
              isActive &&
                displayMode === 'mini' &&
                'bg-sky-500/[0.1] dark:bg-sky-400/[0.12]',
            )}
          >
            {iconElement}
          </span>

          {displayMode === 'full' ? (
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

      {displayMode === 'mini' &&
      miniTooltipOpen &&
      typeof document !== 'undefined'
        ? createPortal(
            <div
              role="tooltip"
              className="pointer-events-none fixed z-[9999]"
              style={{
                left: miniTooltipPos.left,
                top: miniTooltipPos.top,
                transform: 'translateY(-50%)',
              }}
            >
              <span
                className={clsx(
                  'relative block whitespace-nowrap rounded-xl border border-slate-200/90 bg-white px-3 py-2 text-xs font-semibold tracking-[0.08em] text-slate-900 shadow-[0_16px_36px_-22px_rgba(15,23,42,0.28)] ring-1 ring-slate-950/5 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:ring-white/10',
                )}
              >
                <span
                  className="absolute left-0 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-l border-slate-200/90 bg-white dark:border-slate-700 dark:bg-slate-900"
                  aria-hidden="true"
                />
                {name}
              </span>
            </div>,
            document.body,
          )
        : null}
    </li>
  )
}

function getItem(props: AppProps) {
  return <SidebarItem {...props} />
}

export default getItem
export { SidebarItem }
