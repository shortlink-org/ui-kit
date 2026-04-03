'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react'
import {
  ChevronDownIcon,
  CheckIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import ActiveLink from './ActiveLink'
import { clsx } from 'clsx'

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

type CollapsedSecondaryMenuItemLinkProps = {
  item: SecondaryMenuItem
  isActive: boolean
  activePath?: string
  activeClassName?: string
  inactiveClassName?: string
  LinkComponent?: React.ComponentType<{
    href: string
    children: React.ReactNode
    className?: string
    activeClassName?: string
    activePath?: string
    passHref?: boolean
  }>
  getItemMonogram: (label: string) => string
}

function CollapsedSecondaryMenuItemLink({
  item,
  isActive,
  activePath,
  activeClassName,
  inactiveClassName,
  LinkComponent,
  getItemMonogram,
}: CollapsedSecondaryMenuItemLinkProps) {
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const [tooltipOpen, setTooltipOpen] = React.useState(false)
  const [tooltipPos, setTooltipPos] = React.useState({ left: 0, top: 0 })

  const updateTooltipPosition = React.useCallback(() => {
    const el = anchorRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setTooltipPos({ left: r.right + 12, top: r.top + r.height / 2 })
  }, [])

  React.useLayoutEffect(() => {
    if (!tooltipOpen) return
    updateTooltipPosition()
    const el = anchorRef.current
    if (!el) return
    const ro = new ResizeObserver(updateTooltipPosition)
    ro.observe(el)
    const scrollParents = getScrollableAncestors(el)
    scrollParents.forEach((parent) =>
      parent.addEventListener('scroll', updateTooltipPosition, { passive: true }),
    )
    window.addEventListener('scroll', updateTooltipPosition, true)
    window.addEventListener('resize', updateTooltipPosition)
    return () => {
      ro.disconnect()
      scrollParents.forEach((parent) =>
        parent.removeEventListener('scroll', updateTooltipPosition),
      )
      window.removeEventListener('scroll', updateTooltipPosition, true)
      window.removeEventListener('resize', updateTooltipPosition)
    }
  }, [tooltipOpen, updateTooltipPosition])

  const linkProps = {
    href: item.url,
    passHref: true,
    activeClassName,
    activePath,
  }

  const row = (
    <div
      ref={anchorRef}
      className={clsx(
        'group relative flex min-h-11 items-center justify-center rounded-[1rem] border px-2 py-3 text-sm transition-all duration-200 focus-visible:outline-none',
        isActive
          ? 'border-sky-300/70 bg-sky-500/10 text-sky-700 shadow-[0_18px_40px_-30px_rgba(14,165,233,0.55)] dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300'
          : 'border-transparent bg-transparent text-[var(--color-muted-foreground)] hover:border-[var(--color-border)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]',
        !isActive && inactiveClassName,
        isActive && activeClassName,
      )}
      aria-label={item.name}
      onPointerEnter={() => {
        updateTooltipPosition()
        setTooltipOpen(true)
      }}
      onPointerLeave={() => setTooltipOpen(false)}
      onFocus={() => {
        requestAnimationFrame(() => {
          if (anchorRef.current?.matches(':focus-visible')) {
            updateTooltipPosition()
            setTooltipOpen(true)
          }
        })
      }}
      onBlur={() => setTooltipOpen(false)}
      {...(item.dataAttributes || {})}
    >
      {isActive ? (
        <span
          className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-sky-500"
          aria-hidden="true"
        />
      ) : null}

      {item.icon ? (
        <span
          className={clsx(
            'inline-flex size-8 shrink-0 items-center justify-center rounded-[0.85rem]',
            isActive
              ? 'bg-sky-500/10 text-current'
              : 'bg-[var(--color-background)] text-current',
          )}
          aria-hidden="true"
        >
          {item.icon}
        </span>
      ) : (
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
          {getItemMonogram(item.name)}
        </span>
      )}
    </div>
  )

  return (
    <>
      {LinkComponent ? (
        <LinkComponent {...linkProps}>{row}</LinkComponent>
      ) : (
        <ActiveLink {...linkProps}>{row}</ActiveLink>
      )}
      {tooltipOpen && typeof document !== 'undefined'
        ? createPortal(
            <div
              role="tooltip"
              className="pointer-events-none fixed z-[9999]"
              style={{
                left: tooltipPos.left,
                top: tooltipPos.top,
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
                {item.name}
              </span>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}

export interface SecondaryMenuItem {
  url: string
  name: string
  badge?: string | number
  icon?: React.ReactNode
  dataAttributes?: Record<string, string>
}

export interface SecondaryMenuSection {
  title?: string
  items: SecondaryMenuItem[]
}

export interface SecondaryMenuProps {
  title?: string
  items?: SecondaryMenuItem[]
  sections?: SecondaryMenuSection[]
  activePath?: string
  parentLabel?: string
  mode?: 'list' | 'dropdown'
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  className?: string
  sticky?: boolean
  stickyOffset?: string
  renderItem?: (props: {
    item: SecondaryMenuItem
    isActive: boolean
    defaultRender: () => React.ReactNode
  }) => React.ReactNode
  activeClassName?: string
  inactiveClassName?: string
  LinkComponent?: React.ComponentType<{
    href: string
    children: React.ReactNode
    className?: string
    activeClassName?: string
    activePath?: string
    passHref?: boolean
  }>
  /** When true, no outer shadow and no sky seam — use inside a shared rounded shell next to Sidebar. */
  embedded?: boolean
}

export function SecondaryMenu({
  title,
  items: legacyItems,
  sections,
  activePath,
  parentLabel,
  mode = 'list',
  collapsed,
  onCollapsedChange,
  className = '',
  sticky = false,
  stickyOffset = '0',
  renderItem,
  activeClassName,
  inactiveClassName,
  LinkComponent,
  embedded = false,
}: SecondaryMenuProps) {
  const isCollapsedControlled = collapsed !== undefined
  const [localCollapsed, setLocalCollapsed] = React.useState(false)
  const effectiveCollapsed = isCollapsedControlled ? collapsed : localCollapsed
  const containerStyles: React.CSSProperties = {
    ...(sticky && { top: stickyOffset }),
    ...(parentLabel && !embedded
      ? {
          boxShadow:
            '-14px 0 30px -26px rgba(15,23,42,0.14), 20px 0 42px -30px rgba(15,23,42,0.18)',
        }
      : null),
  }

  const normalizedSections: SecondaryMenuSection[] = React.useMemo(() => {
    if (sections) {
      return sections
    }

    if (legacyItems) {
      return title ? [{ title, items: legacyItems }] : [{ items: legacyItems }]
    }

    return []
  }, [sections, legacyItems, title])

  const allItems = React.useMemo(
    () => normalizedSections.flatMap((section) => section.items),
    [normalizedSections],
  )

  const activeItem = React.useMemo(() => {
    return allItems.find((item) => {
      if (!activePath) return false
      return activePath === item.url || activePath.startsWith(`${item.url}/`)
    })
  }, [activePath, allItems])

  const isItemActive = (itemUrl: string): boolean => {
    if (!activePath) return false
    return activePath === itemUrl || activePath.startsWith(`${itemUrl}/`)
  }

  const getItemMonogram = (label: string): string => {
    const words = label
      .trim()
      .split(/\s+/)
      .filter(Boolean)

    if (words.length === 0) return '?'
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase()

    return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase()
  }

  const handleCollapsedChange = () => {
    const nextCollapsed = !effectiveCollapsed

    if (!isCollapsedControlled) {
      setLocalCollapsed(nextCollapsed)
    }

    onCollapsedChange?.(nextCollapsed)
  }

  const renderMenuItem = (item: SecondaryMenuItem) => {
    const isActive = isItemActive(item.url)
    const defaultRender = () => {
      if (effectiveCollapsed) {
        return (
          <CollapsedSecondaryMenuItemLink
            item={item}
            isActive={isActive}
            activePath={activePath}
            activeClassName={activeClassName}
            inactiveClassName={inactiveClassName}
            LinkComponent={LinkComponent}
            getItemMonogram={getItemMonogram}
          />
        )
      }

      const content = (
        <div
          className={clsx(
            'group relative flex items-center gap-3 rounded-[1rem] border px-3 py-3 text-sm transition-all duration-200',
            'focus-visible:outline-none',
            isActive
              ? 'border-sky-300/70 bg-sky-500/10 text-[var(--color-foreground)] shadow-[0_18px_40px_-30px_rgba(14,165,233,0.55)] dark:border-sky-400/30 dark:bg-sky-400/10'
              : 'border-transparent bg-transparent text-[var(--color-muted-foreground)] hover:border-[var(--color-border)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]',
            !isActive && inactiveClassName,
            isActive && activeClassName,
          )}
          {...(item.dataAttributes || {})}
        >
          {isActive ? (
            <span
              className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-sky-500"
              aria-hidden="true"
            />
          ) : null}

          {item.icon ? (
            <span
              className={clsx(
                'inline-flex size-9 shrink-0 items-center justify-center rounded-[0.85rem] transition-colors duration-200',
                isActive
                  ? 'bg-sky-500/10 text-sky-700 dark:text-sky-300'
                  : 'bg-[var(--color-background)] text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]',
              )}
              aria-hidden="true"
            >
              {item.icon}
            </span>
          ) : null}

          <span className="min-w-0 flex-1 truncate font-medium">{item.name}</span>

          {item.badge !== undefined ? (
            <span
              className={clsx(
                'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]',
                isActive
                  ? 'bg-sky-500/12 text-sky-700 dark:text-sky-300'
                  : 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
              )}
            >
              {item.badge}
            </span>
          ) : null}
        </div>
      )

      const linkProps = {
        href: item.url,
        passHref: true,
        activeClassName,
        activePath,
      }

      if (LinkComponent) {
        return (
          <LinkComponent {...linkProps}>
            {content}
          </LinkComponent>
        )
      }

      return <ActiveLink {...linkProps}>{content}</ActiveLink>
    }

    if (renderItem) {
      return renderItem({ item, isActive, defaultRender })
    }

    return defaultRender()
  }

  if (mode === 'dropdown') {
    return (
      <div className={clsx('relative', className)}>
        <Listbox value={activeItem?.url} onChange={() => undefined}>
          <ListboxButton className="focus-ring relative w-full rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-left text-sm font-medium text-[var(--color-foreground)] shadow-[0_18px_48px_-34px_rgba(15,23,42,0.4)]">
            <span className="block truncate">
              {activeItem?.name ||
                normalizedSections[0]?.title ||
                parentLabel ||
                'Select section'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronDownIcon
                className="size-4 text-[var(--color-muted-foreground)]"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-3 max-h-72 w-full overflow-auto rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-2 text-sm shadow-[0_24px_60px_-38px_rgba(15,23,42,0.5)] ring-1 ring-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:ring-white/10"
          >
            {allItems.map((item) => {
              const isActive = isItemActive(item.url)
              return (
                <ListboxOption
                  key={item.url}
                  value={item.url}
                  className={clsx(
                    'relative cursor-pointer rounded-[1rem] px-3 py-3 select-none',
                    isActive
                      ? 'bg-sky-500/10 text-[var(--color-foreground)]'
                      : 'text-[var(--color-muted-foreground)] data-focus:bg-[var(--color-muted)] data-focus:text-[var(--color-foreground)]',
                  )}
                >
                  {({ selected }) => (
                    <>
                      <span className={clsx('block truncate', selected && 'font-semibold')}>
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-sky-600 dark:text-sky-300">
                          <CheckIcon className="size-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              )
            })}
          </ListboxOptions>
        </Listbox>
      </div>
    )
  }

  return (
    <aside
      className={clsx(
        'w-full h-full min-h-0',
        sticky && 'sticky self-start',
        className,
      )}
      style={containerStyles}
      aria-label={normalizedSections[0]?.title || 'Secondary menu'}
    >
      <div
        className={clsx(
          'relative flex h-full min-h-0 flex-col overflow-hidden backdrop-blur-xl',
          embedded
            ? 'rounded-none border-0 bg-transparent shadow-none'
            : 'rounded-[1.6rem] border bg-[color-mix(in_srgb,var(--color-surface)_95%,white)]',
          !embedded && effectiveCollapsed && 'rounded-[1.35rem]',
          !embedded &&
            (parentLabel
              ? 'rounded-l-none border-l-0 border-sky-200/80 dark:border-sky-400/15'
              : 'border-[var(--color-border)] shadow-[0_26px_70px_-48px_rgba(15,23,42,0.42)]'),
        )}
      >
        {parentLabel && !embedded ? (
          <div
            className="absolute bottom-0 left-0 top-0 w-px bg-[linear-gradient(180deg,rgba(14,165,233,0.14)_0%,rgba(14,165,233,0.65)_22%,rgba(56,189,248,0.16)_100%)]"
            aria-hidden="true"
          />
        ) : null}
        <div
          className={clsx(
            'pointer-events-none h-16',
            effectiveCollapsed && 'h-10',
            parentLabel
              ? 'bg-transparent'
              : 'bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_70%)]',
          )}
          aria-hidden="true"
        />

        <div
          className={clsx(
            'relative z-10 flex items-center border-b border-[var(--color-border)]/80 px-3 pb-3',
            effectiveCollapsed
              ? 'justify-center border-b-0 px-2 pb-2'
              : parentLabel
                ? '-mt-7 px-4 pb-4 pl-6'
                : '-mt-7 px-3 pb-3',
          )}
        >
          {!effectiveCollapsed ? (
            <div className="min-w-0 flex-1">
              {parentLabel ? (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                    Selected in sidebar
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground)]">
                    <span
                      className={clsx(
                        'inline-flex rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]',
                        embedded
                          ? 'border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-foreground)]'
                          : 'border-sky-200/80 bg-white/85 text-sky-700 shadow-[0_10px_28px_-20px_rgba(14,165,233,0.45)] dark:border-sky-400/20 dark:bg-slate-950/40 dark:text-sky-300',
                      )}
                    >
                      {parentLabel}
                    </span>
                    <ChevronRightIcon className="size-4 text-[var(--color-muted-foreground)]" />
                    <span className="truncate text-base">
                      {normalizedSections[0]?.title || 'Section navigation'}
                    </span>
                  </div>
                </>
              ) : title ? (
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                  {title}
                </h2>
              ) : null}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleCollapsedChange}
            aria-label={
              effectiveCollapsed
                ? 'Expand secondary menu'
                : 'Collapse secondary menu'
            }
            title={
              effectiveCollapsed
                ? 'Expand secondary menu'
                : 'Collapse secondary menu'
            }
            className={clsx(
              'focus-ring inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]',
              effectiveCollapsed && 'size-9 rounded-xl',
            )}
          >
            {effectiveCollapsed ? (
              <ChevronDoubleRightIcon className="size-4" />
            ) : (
              <ChevronDoubleLeftIcon className="size-4" />
            )}
          </button>
        </div>

        <nav
          className={clsx(
            'flex-grow overflow-y-auto',
            effectiveCollapsed ? 'px-2 pb-2' : 'px-3 pb-3',
            !effectiveCollapsed && parentLabel && 'px-4 pb-4 pl-6',
          )}
        >
          {normalizedSections.map((section, sectionIndex) => (
            <div
              key={`${section.title ?? 'section'}-${sectionIndex}`}
              className={clsx(
                'rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-background)]/72 p-2 backdrop-blur-sm',
                effectiveCollapsed && 'rounded-[1.1rem] p-1.5',
                parentLabel &&
                  sectionIndex === 0 &&
                  'border-transparent bg-transparent p-0 shadow-none',
                sectionIndex > 0 && 'mt-4',
              )}
            >
              {section.title && !effectiveCollapsed ? (
                <div className={clsx('px-3 pb-2 pt-1', parentLabel && sectionIndex === 0 && 'px-1 pb-3')}>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                    {section.title}
                  </h2>
                </div>
              ) : null}

              <ul
                className={clsx(
                  'space-y-2',
                  effectiveCollapsed && 'space-y-1.5',
                  parentLabel && sectionIndex === 0 && 'space-y-1',
                )}
              >
                {section.items.map((item) => (
                  <li key={item.url} className="w-full">
                    {renderMenuItem(item)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default SecondaryMenu
