import * as React from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { SidebarNavContext } from './SidebarNavContext'

function getScrollableAncestors(node: HTMLElement | null): HTMLElement[] {
  const acc: HTMLElement[] = []
  let el = node?.parentElement ?? null
  while (el && el !== document.documentElement) {
    const { overflowY, overflowX } = getComputedStyle(el)
    if (
      /(auto|scroll|overlay)/.test(overflowY) ||
      /(auto|scroll|overlay)/.test(overflowX)
    ) {
      acc.push(el)
    }
    el = el.parentElement
  }
  return acc
}

interface CollapsibleMenuProps {
  mode: 'full' | 'mini'
  density?: 'default' | 'compact'
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
  collapsed?: boolean
  onCollapseChange?: (collapsed: boolean) => void
}

const CollapsibleMenu = ({
  mode,
  density = 'default',
  icon: Icon,
  title,
  children,
  collapsed,
  onCollapseChange,
}: CollapsibleMenuProps) => {
  const isFull = mode === 'full'
  const [fullOpen, setFullOpen] = React.useState(() => {
    if (collapsed !== undefined) return !collapsed
    return mode !== 'mini'
  })
  const [flyoutOpen, setFlyoutOpen] = React.useState(false)
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const hoverZoneRef = React.useRef<HTMLDivElement>(null)
  const flyoutPanelRef = React.useRef<HTMLDivElement>(null)
  const [flyoutPos, setFlyoutPos] = React.useState({ left: 0, top: 0 })

  const updateFlyoutPosition = React.useCallback(() => {
    const el = hoverZoneRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setFlyoutPos({ left: r.right - 8, top: r.top })
  }, [])

  React.useEffect(() => {
    if (!isFull) return
    if (collapsed !== undefined) {
      setFullOpen(!collapsed)
    }
  }, [collapsed, isFull])

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const openFlyout = () => {
    if (isFull) return
    clearCloseTimer()
    updateFlyoutPosition()
    setFlyoutOpen(true)
  }

  const scheduleCloseFlyout = () => {
    if (isFull) return
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => setFlyoutOpen(false), 220)
  }

  const handleToggle = () => {
    if (isFull) {
      setFullOpen((previous) => {
        const nextOpen = !previous
        onCollapseChange?.(!nextOpen)
        return nextOpen
      })
    } else {
      setFlyoutOpen((o) => {
        const next = !o
        if (next) updateFlyoutPosition()
        return next
      })
    }
  }

  React.useEffect(() => {
    if (isFull || !flyoutOpen) return
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as Node
      if (
        hoverZoneRef.current?.contains(t) ||
        flyoutPanelRef.current?.contains(t)
      ) {
        return
      }
      setFlyoutOpen(false)
    }
    document.addEventListener('focusin', onFocusIn)
    return () => document.removeEventListener('focusin', onFocusIn)
  }, [flyoutOpen, isFull])

  React.useLayoutEffect(() => {
    if (isFull || !flyoutOpen) return
    updateFlyoutPosition()
    const anchor = hoverZoneRef.current
    if (!anchor) return
    const ro = new ResizeObserver(updateFlyoutPosition)
    ro.observe(anchor)
    const scrollParents = getScrollableAncestors(anchor)
    scrollParents.forEach((el) =>
      el.addEventListener('scroll', updateFlyoutPosition, { passive: true }),
    )
    window.addEventListener('scroll', updateFlyoutPosition, true)
    window.addEventListener('resize', updateFlyoutPosition)
    return () => {
      ro.disconnect()
      scrollParents.forEach((el) =>
        el.removeEventListener('scroll', updateFlyoutPosition),
      )
      window.removeEventListener('scroll', updateFlyoutPosition, true)
      window.removeEventListener('resize', updateFlyoutPosition)
    }
  }, [isFull, flyoutOpen, updateFlyoutPosition])

  React.useEffect(() => {
    if (isFull || !flyoutOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFlyoutOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [flyoutOpen, isFull])

  const itemCount = React.Children.toArray(children).length

  const expandedFull = fullOpen

  return (
    <li className="relative w-full list-none">
      <div
        ref={hoverZoneRef}
        className={clsx(!isFull && 'relative')}
        onMouseEnter={isFull ? undefined : openFlyout}
        onMouseLeave={isFull ? undefined : scheduleCloseFlyout}
      >
        <div
          className={clsx(
            'rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-background)]/75 p-1.5 backdrop-blur-sm transition-colors duration-200',
            density === 'compact' && 'p-1.25',
            isFull &&
              expandedFull &&
              'border-sky-200/70 bg-[color-mix(in_srgb,var(--color-surface)_90%,rgb(14_165_233)_10%)] dark:border-sky-400/20',
            !isFull &&
              clsx(
                'overflow-visible rounded-[1.35rem] border border-[var(--color-border)]/70 bg-[color-mix(in_srgb,var(--color-background)_88%,var(--color-muted)_12%)] p-1.5 backdrop-blur-sm',
                flyoutOpen && 'border-sky-200/45 dark:border-sky-400/20',
              ),
            isFull && 'overflow-hidden',
          )}
        >
          <button
            type="button"
            onClick={handleToggle}
            aria-expanded={isFull ? expandedFull : flyoutOpen}
            aria-haspopup={!isFull ? 'menu' : undefined}
            aria-label={mode === 'mini' ? title : undefined}
            className={clsx(
              'focus-ring group relative flex w-full cursor-pointer items-center rounded-[0.95rem] text-left transition-all duration-200',
              mode === 'mini'
                ? clsx(
                    'min-h-11 justify-center rounded-[1rem] border-transparent px-0 py-2',
                    flyoutOpen
                      ? 'text-sky-900 dark:text-sky-100'
                      : 'text-[var(--color-muted-foreground)] hover:bg-[color-mix(in_srgb,var(--color-muted)_40%,transparent)] hover:text-[var(--color-foreground)]',
                  )
                : clsx(
                    'gap-3 hover:bg-[var(--color-surface)]/80',
                    density === 'compact' ? 'px-2.5 py-2.5' : 'px-3 py-3',
                  ),
            )}
          >
            <span
              className={clsx(
                'inline-flex items-center justify-center transition-colors duration-200',
                mode === 'mini' ? 'size-11 rounded-xl' : 'size-10 rounded-[0.9rem]',
                mode === 'full' && 'bg-[var(--color-surface)] text-[var(--color-muted-foreground)]',
                expandedFull &&
                  mode === 'full' &&
                  'bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300',
                mode === 'mini' && !flyoutOpen && 'bg-transparent text-[var(--color-muted-foreground)]',
                mode === 'mini' &&
                  flyoutOpen &&
                  'bg-sky-500/[0.1] dark:bg-sky-400/[0.12]',
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>

            {mode === 'full' ? (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--color-foreground)]">
                    {title}
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                    {itemCount} items
                  </p>
                </div>

                <ChevronDownIcon
                  className={clsx(
                    density === 'compact'
                      ? 'size-4 shrink-0 text-[var(--color-muted-foreground)] transition-transform duration-200'
                      : 'size-4 shrink-0 text-[var(--color-muted-foreground)] transition-transform duration-200',
                    expandedFull && 'rotate-180 text-[var(--color-foreground)]',
                  )}
                  aria-hidden="true"
                />
              </>
            ) : null}
          </button>
        </div>

        {isFull ? (
          <div
            className="grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out"
            style={{
              gridTemplateRows: expandedFull ? '1fr' : '0fr',
              opacity: expandedFull ? 1 : 0.48,
              marginTop: expandedFull ? '0.4rem' : '0',
            }}
          >
            <div className="overflow-hidden">
              <ul
                className={clsx(
                  density === 'compact' ? 'space-y-1.5' : 'space-y-2',
                  'border-t border-[var(--color-border)]/80 px-1 pb-1',
                  density === 'compact' ? 'pt-2.5' : 'pt-3',
                )}
                role="group"
              >
                {children}
              </ul>
            </div>
          </div>
        ) : flyoutOpen && typeof document !== 'undefined' ? (
          createPortal(
            <div
              ref={flyoutPanelRef}
              style={{
                position: 'fixed',
                left: flyoutPos.left,
                top: flyoutPos.top,
                zIndex: 9999,
              }}
              className={clsx(
                'min-w-[12rem] max-w-[min(17rem,calc(100vw-5rem))] origin-left rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pl-2 shadow-[0_24px_64px_-40px_rgba(15,23,42,0.55)] ring-1 ring-black/5 transition-[opacity,transform] duration-200 ease-out dark:ring-white/10',
                'translate-x-0 scale-100 opacity-100',
              )}
              onMouseEnter={openFlyout}
              onMouseLeave={scheduleCloseFlyout}
            >
              <SidebarNavContext.Provider value={{ itemPresentation: 'flyout' }}>
                <p className="px-3 pb-2 pt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                  {title}
                </p>
                <ul className="max-h-[min(60vh,22rem)] space-y-0.5 overflow-y-auto overscroll-contain px-1.5 pb-1">
                  {children}
                </ul>
              </SidebarNavContext.Provider>
            </div>,
            document.body,
          )
        ) : null}
      </div>
    </li>
  )
}

export default CollapsibleMenu
