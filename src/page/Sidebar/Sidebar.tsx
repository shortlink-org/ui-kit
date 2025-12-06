import * as React from 'react'
import clsx from 'clsx'
import AddLinkIcon from '@mui/icons-material/AddLink'
import ListIcon from '@mui/icons-material/List'
import PersonIcon from '@mui/icons-material/Person'
import PeopleIcon from '@mui/icons-material/People'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
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
  footerSlot?: React.ReactNode
  variant?: 'sticky' | 'scrollable'
  ariaLabel?: string
  className?: string
  /** Custom render function for menu items */
  renderItem?: (props: {
    item: SidebarItem
    isActive: boolean
    mode: 'full' | 'mini'
    defaultRender: () => React.ReactNode
  }) => React.ReactNode
  /** Custom active class names */
  activeClassName?: string
  /** Custom inactive class names */
  inactiveClassName?: string
}

// Default sections for backward compatibility
const defaultSections: SidebarSection[] = [
  {
    type: 'simple',
    items: [
      {
        url: '/add-link',
        icon: <AddLinkIcon />,
        name: 'Add URL',
      },
      {
        url: '/links',
        icon: <ListIcon />,
        name: 'Links',
      },
      {
        url: '/profile',
        icon: <PersonIcon />,
        name: 'Profile',
      },
    ],
  },
  {
    type: 'collapsible',
    icon: AdminPanelSettingsIcon,
    title: 'Admin',
    items: [
      {
        url: '/admin/links',
        icon: <ListIcon />,
        name: 'Links',
      },
      {
        url: '/admin/users',
        icon: <GroupAddIcon />,
        name: 'Users',
      },
      {
        url: '/admin/groups',
        icon: <PeopleIcon />,
        name: 'Groups',
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
  footerSlot,
  variant = 'scrollable',
  ariaLabel = 'Sidebar',
  className,
  renderItem,
  activeClassName,
  inactiveClassName,
}: SidebarProps) {
  const [collapsedState, setCollapsedState] = React.useState<
    Record<string, boolean>
  >({})

  const effectiveMode = sidebarCollapsed ? 'mini' : mode
  const effectiveWidth =
    width !== undefined
      ? typeof width === 'number'
        ? `${width}px`
        : width
      : effectiveMode === 'mini'
        ? '3.5rem'
        : undefined

  const containerClassName = clsx(
    'w-full h-full bg-gray-50 dark:bg-gray-800 flex justify-between flex-col min-h-0',
    variant === 'sticky' && 'sticky top-0 self-start',
    variant === 'scrollable' && 'overflow-y-auto',
    effectiveWidth && !width && effectiveMode === 'mini' && 'max-w-[3.5rem]',
    !effectiveWidth && effectiveMode === 'full' && 'max-w-xs',
    className,
  )

  const navClassName = clsx(
    'space-y-2 font-medium flex-grow w-full px-2 py-4',
    variant === 'scrollable' && 'overflow-y-auto',
  )

  const handleCollapseChange = (sectionTitle: string, collapsed: boolean) => {
    setCollapsedState((prev) => ({ ...prev, [sectionTitle]: collapsed }))
  }

  const isItemActive = (itemUrl: string): boolean => {
    if (!activePath) return false
    return activePath === itemUrl || activePath.startsWith(itemUrl + '/')
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
      className={containerClassName}
      style={
        effectiveWidth
          ? { width: effectiveWidth, maxWidth: effectiveWidth }
          : undefined
      }
      aria-label={ariaLabel}
    >
      <nav aria-label={ariaLabel}>
        <ul className={navClassName}>
          {sections.map((section, sectionIndex) => {
            if (section.type === 'collapsible') {
              const isCollapsed =
                collapsedState[section.title] ??
                section.defaultCollapsed ??
                false

              return (
                <CollapsibleMenu
                  key={`collapsible-${sectionIndex}-${section.title}`}
                  icon={section.icon}
                  title={section.title}
                  mode={effectiveMode}
                  collapsed={isCollapsed}
                  onCollapseChange={(collapsed) =>
                    handleCollapseChange(section.title, collapsed)
                  }
                >
                  {section.items.map((item) => renderSidebarItem(item))}
                </CollapsibleMenu>
              )
            } else {
              return section.items.map((item) => (
                <React.Fragment key={`simple-${item.url}`}>
                  {renderSidebarItem(item)}
                </React.Fragment>
              ))
            }
          })}
        </ul>
      </nav>

      {footerSlot !== undefined ? footerSlot : <Footer mode={effectiveMode} />}
    </aside>
  )
}

export default Sidebar
