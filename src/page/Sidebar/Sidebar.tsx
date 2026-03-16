import * as React from 'react'
import clsx from 'clsx'
import {
  LinkIcon,
  QueueListIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import CollapsibleMenu from './CollapsibleMenu'
import Footer from './Footer'
import getItem from './Item'

export type SidebarItem = {
  url: string
  icon: React.JSX.Element
  name: string
}

export type SidebarCollapsibleSection = {
  type: 'collapsible'
  icon: React.ComponentType<{ className?: string }>
  title: string
  items: SidebarItem[]
  defaultCollapsed?: boolean
}

export type SidebarSimpleSection = {
  type: 'simple'
  items: SidebarItem[]
}

export type SidebarSection = SidebarCollapsibleSection | SidebarSimpleSection

export type SidebarProps = {
  mode?: 'full' | 'mini'
  sections?: SidebarSection[]
  activePath?: string
  collapsed?: boolean
  width?: string | number
  height?: string | number
  footerSlot?: React.ReactNode
  variant?: 'sticky' | 'scrollable'
  ariaLabel?: string
  className?: string
  onCollapsedChange?: (collapsed: boolean) => void
  renderItem?: (props: {
    item: SidebarItem
    isActive: boolean
    mode: 'full' | 'mini'
    defaultRender: () => React.ReactNode
  }) => React.ReactNode
  activeClassName?: string
  inactiveClassName?: string
  density?: 'default' | 'compact'
}

const defaultSections: SidebarSection[] = [
  {
    type: 'simple',
    items: [
      {
        url: '/add-link',
        icon: <LinkIcon />,
        name: 'Add URL',
      },
      {
        url: '/links',
        icon: <QueueListIcon />,
        name: 'Links',
      },
      {
        url: '/profile',
        icon: <UserCircleIcon />,
        name: 'Profile',
      },
    ],
  },
  {
    type: 'collapsible',
    icon: ShieldCheckIcon,
    title: 'Admin',
    items: [
      {
        url: '/admin/overview',
        icon: <Squares2X2Icon />,
        name: 'Overview',
      },
      {
        url: '/admin/links',
        icon: <QueueListIcon />,
        name: 'Links',
      },
      {
        url: '/admin/users',
        icon: <UsersIcon />,
        name: 'Users',
      },
    ],
  },
]

export function Sidebar({
  mode = 'full',
  sections = defaultSections,
  activePath,
  collapsed: sidebarCollapsed,
  width,
  height,
  footerSlot,
  variant = 'scrollable',
  ariaLabel = 'Sidebar',
  className,
  onCollapsedChange,
  renderItem,
  activeClassName,
  inactiveClassName,
  density = 'default',
}: SidebarProps) {
  const isCollapsedControlled = sidebarCollapsed !== undefined
  const [localMode, setLocalMode] = React.useState<'full' | 'mini'>(mode)
  const [collapsedState, setCollapsedState] = React.useState<
    Record<string, boolean>
  >({})

  React.useEffect(() => {
    if (!isCollapsedControlled) {
      setLocalMode(mode)
    }
  }, [isCollapsedControlled, mode])

  const effectiveMode = isCollapsedControlled
    ? sidebarCollapsed
      ? 'mini'
      : mode
    : localMode
  const effectiveWidth =
    width !== undefined
      ? typeof width === 'number'
        ? `${width}px`
        : width
      : effectiveMode === 'mini'
        ? '5.25rem'
        : undefined

  const effectiveHeight =
    height !== undefined
      ? typeof height === 'number'
        ? `${height}px`
        : height
      : undefined

  const handleCollapseChange = (sectionTitle: string, collapsed: boolean) => {
    setCollapsedState((previous) => ({ ...previous, [sectionTitle]: collapsed }))
  }

  const handleModeToggle = () => {
    const nextCollapsed = effectiveMode === 'full'

    if (isCollapsedControlled) {
      onCollapsedChange?.(nextCollapsed)
      return
    }

    setLocalMode((previous) => (previous === 'mini' ? 'full' : 'mini'))
    onCollapsedChange?.(nextCollapsed)
  }

  const isItemActive = (itemUrl: string): boolean => {
    if (!activePath) return false
    return activePath === itemUrl || activePath.startsWith(`${itemUrl}/`)
  }

  const renderSidebarItem = (item: SidebarItem) => {
    const isActive = isItemActive(item.url)
    const defaultRender = () =>
      getItem({
        mode: effectiveMode,
        url: item.url,
        icon: item.icon,
        name: item.name,
        activePath,
        activeClassName,
        inactiveClassName,
      })

    if (renderItem) {
      return renderItem({ item, isActive, mode: effectiveMode, defaultRender })
    }

    return defaultRender()
  }

  return (
    <aside
      className={clsx(
        'w-full',
        variant === 'sticky' && 'sticky top-0 self-start',
        className,
      )}
      style={{
        ...(effectiveWidth
          ? { width: effectiveWidth, maxWidth: effectiveWidth }
          : null),
        ...(effectiveHeight ? { height: effectiveHeight } : null),
      }}
      aria-label={ariaLabel}
    >
      <div
        className={clsx(
          'relative flex h-full min-h-0 flex-col rounded-[1.75rem] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_92%,white)] shadow-[0_30px_80px_-48px_rgba(15,23,42,0.55)] backdrop-blur-xl',
          effectiveMode === 'mini' ? 'overflow-hidden' : 'overflow-hidden',
        )}
      >
        <div
          className={clsx(
            'pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_70%)]',
            effectiveMode === 'mini' &&
              'inset-x-2 top-2 h-14 rounded-t-[1.2rem] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_72%)]',
          )}
          aria-hidden="true"
        />

        <div
          className={clsx(
            'relative flex min-h-0 flex-1 flex-col',
            'overflow-hidden',
          )}
        >
          <nav
            aria-label={ariaLabel}
            className={clsx(
              'relative min-h-0 flex-1',
              density === 'compact' ? 'px-2.5 py-2.5' : 'px-3 py-3',
              effectiveMode === 'mini' && 'overflow-visible px-2 py-2',
              'overflow-y-auto overscroll-contain pr-2',
            )}
          >
            <ul
              className={clsx(
                density === 'compact' ? 'space-y-2.5' : 'space-y-3',
                effectiveMode === 'mini' && 'space-y-2',
              )}
            >
              {sections.map((section, sectionIndex) => {
                if (section.type === 'collapsible') {
                  const isCollapsed =
                    effectiveMode === 'mini'
                      ? true
                      : collapsedState[section.title] ??
                        section.defaultCollapsed ??
                        false

                  return (
                    <CollapsibleMenu
                      key={`collapsible-${sectionIndex}-${section.title}`}
                      icon={section.icon}
                      title={section.title}
                      mode={effectiveMode}
                      density={density}
                      collapsed={isCollapsed}
                      onCollapseChange={(collapsed) =>
                        handleCollapseChange(section.title, collapsed)
                      }
                    >
                      {section.items.map((item) => renderSidebarItem(item))}
                    </CollapsibleMenu>
                  )
                }

                return (
                  <li
                    key={`simple-${sectionIndex}`}
                    className={clsx(
                      'list-none rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-background)]/70 backdrop-blur-sm',
                      density === 'compact' ? 'p-1.25' : 'p-1.5',
                      effectiveMode === 'mini' &&
                        'rounded-none border-transparent bg-transparent p-0 backdrop-blur-none',
                    )}
                  >
                    <ul
                      className={clsx(
                        density === 'compact' ? 'space-y-1.5' : 'space-y-2',
                        effectiveMode === 'mini' && 'space-y-1.5',
                      )}
                    >
                      {section.items.map(renderSidebarItem)}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="relative z-10 mt-auto sticky bottom-0">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-linear-to-t from-transparent to-[color-mix(in_srgb,var(--color-surface)_92%,white)]"
              aria-hidden="true"
            />
            <div className="relative bg-[color-mix(in_srgb,var(--color-surface)_92%,white)]/96 backdrop-blur-xl">
              {footerSlot !== undefined ? (
                footerSlot
              ) : (
                <Footer
                  mode={effectiveMode}
                  density={density}
                  onToggleMode={handleModeToggle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
