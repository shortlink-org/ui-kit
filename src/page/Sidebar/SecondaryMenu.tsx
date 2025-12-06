import * as React from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import ActiveLink from './ActiveLink'
import { clsx } from 'clsx'

export interface SecondaryMenuItem {
  /** URL for the menu item */
  url: string
  /** Display name of the menu item */
  name: string
  /** Optional badge or label to show next to the item */
  badge?: string | number
  /** Optional icon element */
  icon?: React.ReactNode
  /** Additional data attributes for styling */
  dataAttributes?: Record<string, string>
}

export interface SecondaryMenuSection {
  /** Section title */
  title?: string
  /** Items in this section */
  items: SecondaryMenuItem[]
}

export interface SecondaryMenuProps {
  /** Title/heading for the secondary menu (deprecated: use sections) */
  title?: string
  /** Array of menu items (deprecated: use sections) */
  items?: SecondaryMenuItem[]
  /** Array of sections (preferred over items) */
  sections?: SecondaryMenuSection[]
  /** Current active path (for use outside Next.js) */
  activePath?: string
  /** Display mode: 'list' for static list, 'dropdown' for dropdown menu */
  mode?: 'list' | 'dropdown'
  /** Optional className for the container */
  className?: string
  /** Whether the menu should be sticky when scrolling */
  sticky?: boolean
  /** Sticky offset from top (default: '0') */
  stickyOffset?: string
  /** Custom render function for menu items */
  renderItem?: (props: {
    item: SecondaryMenuItem
    isActive: boolean
    defaultRender: () => React.ReactNode
  }) => React.ReactNode
  /** Custom active class names */
  activeClassName?: string
  /** Custom inactive class names */
  inactiveClassName?: string
  /** Custom Link component (e.g., Next.js Link) */
  LinkComponent?: React.ComponentType<{
    href: string
    children: React.ReactNode
    className?: string
    activeClassName?: string
    activePath?: string
    passHref?: boolean
  }>
}

export function SecondaryMenu({
  title,
  items: legacyItems,
  sections,
  activePath,
  mode = 'list',
  className = '',
  sticky = false,
  stickyOffset = '0',
  renderItem,
  activeClassName = 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-2 border-blue-700 dark:border-blue-400',
  inactiveClassName = 'text-gray-700 dark:text-gray-300',
  LinkComponent,
}: SecondaryMenuProps) {
  const containerStyles: React.CSSProperties = {
    ...(sticky && { top: stickyOffset }),
  }

  // Normalize items/sections to sections array
  const normalizedSections: SecondaryMenuSection[] = React.useMemo(() => {
    if (sections) {
      return sections
    }
    if (legacyItems) {
      return title ? [{ title, items: legacyItems }] : [{ items: legacyItems }]
    }
    return []
  }, [sections, legacyItems, title])

  // Flatten all items for dropdown mode
  const allItems = React.useMemo(() => {
    return normalizedSections.flatMap((section) => section.items)
  }, [normalizedSections])

  // Find active item for dropdown
  const activeItem = React.useMemo(() => {
    return allItems.find((item) => {
      if (!activePath) return false
      return activePath === item.url || activePath.startsWith(item.url + '/')
    })
  }, [allItems, activePath])

  const isItemActive = (itemUrl: string): boolean => {
    if (!activePath) return false
    return activePath === itemUrl || activePath.startsWith(itemUrl + '/')
  }

  const renderMenuItem = (item: SecondaryMenuItem) => {
    const isActive = isItemActive(item.url)
    const defaultRender = () => {
      const itemClassName = clsx(
        'flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 group',
        isActive
          ? activeClassName
          : clsx(inactiveClassName, 'hover:bg-gray-100 dark:hover:bg-gray-800'),
      )

      const linkProps = {
        href: item.url,
        passHref: true,
        activeClassName,
        activePath,
      }

      const linkContent = (
        <div className={itemClassName} {...(item.dataAttributes || {})}>
          {item.icon && (
            <span className="mr-2 flex-shrink-0" aria-hidden="true">
              {item.icon}
            </span>
          )}
          <span className="flex-1">{item.name}</span>
          {item.badge !== undefined && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
              {item.badge}
            </span>
          )}
        </div>
      )

      if (LinkComponent) {
        return (
          <LinkComponent {...linkProps} className={itemClassName}>
            {linkContent}
          </LinkComponent>
        )
      }

      return <ActiveLink {...linkProps}>{linkContent}</ActiveLink>
    }

    if (renderItem) {
      return renderItem({ item, isActive, defaultRender })
    }

    return defaultRender()
  }

  // Dropdown mode
  if (mode === 'dropdown') {
    return (
      <div className={clsx('relative', className)}>
        <Listbox value={activeItem?.url} onChange={() => {}}>
          <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
            <span className="block truncate">
              {activeItem?.name || normalizedSections[0]?.title || 'Select...'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            {allItems.map((item) => {
              const isActive = isItemActive(item.url)
              return (
                <ListboxOption
                  key={item.url}
                  value={item.url}
                  className={clsx(
                    'relative cursor-pointer select-none py-2 pl-3 pr-9',
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100'
                      : 'text-gray-900 dark:text-gray-100 data-focus:bg-gray-100 dark:data-focus:bg-gray-700',
                  )}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          'block truncate',
                          selected ? 'font-medium' : 'font-normal',
                        )}
                      >
                        {item.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 dark:text-indigo-400">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
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

  // List mode (default)
  return (
    <aside
      className={clsx(
        'w-full max-w-full lg:max-w-xs h-full bg-white dark:bg-gray-900 flex flex-col min-h-0',
        sticky && 'sticky self-start',
        className,
      )}
      style={containerStyles}
      aria-label={normalizedSections[0]?.title || 'Secondary menu'}
    >
      <nav className="flex-grow overflow-y-auto">
        {normalizedSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h2>
              </div>
            )}
            <ul
              className={clsx(
                'px-2 py-4 space-y-1',
                sectionIndex > 0 && 'mt-2',
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
    </aside>
  )
}

export default SecondaryMenu
