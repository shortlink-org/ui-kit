import * as React from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'

export interface FlyoutMenuItem {
  /** Item unique identifier */
  id?: string
  name: string
  description: string
  /** Optional href - if provided, item will be rendered as a link */
  href?: string
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  /** Optional onClick handler - alternative to href */
  onClick?: () => void
}

export interface FlyoutMenuCallToAction {
  name: string
  /** Optional href - if provided, item will be rendered as a link */
  href?: string
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  /** Optional onClick handler - alternative to href */
  onClick?: () => void
}

export interface FlyoutMenuSection {
  /** Section title (optional) */
  title?: string
  /** Items in this section */
  items: FlyoutMenuItem[]
}

export type FlyoutMenuSections = FlyoutMenuSection[]

export interface FlyoutMenuProps {
  /** Button label text */
  label: string
  /** Array of menu items to display (deprecated: use sections instead for grouping) */
  items?: FlyoutMenuItem[]
  /** Array of sections for grouped menu items */
  sections?: FlyoutMenuSections
  /** Optional array of call-to-action items displayed at the bottom */
  callsToAction?: FlyoutMenuCallToAction[]
  /** Custom className for the popover button */
  buttonClassName?: string
  /** Custom className for the popover panel */
  panelClassName?: string
  /** Whether to show the chevron icon */
  showChevron?: boolean
  /** Custom chevron icon component */
  chevronIcon?: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  /** Custom Link component (e.g., Next.js Link) */
  LinkComponent?: React.ComponentType<{
    href: string
    children: React.ReactNode
    className?: string
  }>
  /** Callback when an item is selected (alternative to item.onClick) */
  onItemSelect?: (item: FlyoutMenuItem) => void
  /** Custom render function for menu items */
  renderItem?: (props: {
    item: FlyoutMenuItem
    defaultRender: () => React.ReactNode
  }) => React.ReactNode
}

export function FlyoutMenu({
  label,
  items: legacyItems,
  sections: sectionsProp,
  callsToAction = [],
  buttonClassName,
  panelClassName,
  showChevron = true,
  chevronIcon: ChevronIcon = ChevronDownIcon,
  LinkComponent,
  onItemSelect,
  renderItem,
}: FlyoutMenuProps) {
  // Normalize items/sections to sections array
  const sections: FlyoutMenuSections = React.useMemo(() => {
    if (sectionsProp) {
      return sectionsProp
    }
    if (legacyItems && legacyItems.length > 0) {
      return [{ items: legacyItems }]
    }
    return []
  }, [sectionsProp, legacyItems])

  const renderLink = (href: string, children: React.ReactNode, className?: string) => {
    if (LinkComponent) {
      return (
        <LinkComponent href={href} className={className}>
          {children}
        </LinkComponent>
      )
    }
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  const renderMenuItem = (item: FlyoutMenuItem, key: string | number) => {
    const handleClick = () => {
      if (item.onClick) {
        item.onClick()
      }
      if (onItemSelect) {
        onItemSelect(item)
      }
    }

    const defaultRender = () => {
      const itemContent = (
        <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-white/5">
          <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
            <item.icon aria-hidden="true" className="size-6 text-gray-400 group-hover:text-white" />
          </div>
          <div>
            {item.href ? (
              renderLink(
                item.href,
                <>
                  <span className="font-semibold text-white">{item.name}</span>
                  <span className="absolute inset-0" />
                </>,
                'block'
              )
            ) : (
              <button
                onClick={handleClick}
                className="font-semibold text-white text-left w-full"
              >
                {item.name}
              </button>
            )}
            <p className="mt-1 text-gray-400">{item.description}</p>
          </div>
        </div>
      )

      if (renderItem) {
        return renderItem({ item, defaultRender: () => itemContent })
      }

      return itemContent
    }

    return (
      <React.Fragment key={key}>
        {defaultRender()}
      </React.Fragment>
    )
  }

  const renderCallToAction = (item: FlyoutMenuCallToAction) => {
    const handleClick = () => {
      if (item.onClick) {
        item.onClick()
      }
    }

    if (item.href) {
      return renderLink(
        item.href,
        <>
          <item.icon aria-hidden="true" className="size-5 flex-none text-gray-500" />
          {item.name}
        </>,
        'flex items-center justify-center gap-x-2.5 p-3 font-semibold text-white hover:bg-gray-700/50'
      )
    }

    return (
      <button
        onClick={handleClick}
        className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-white hover:bg-gray-700/50"
      >
        <item.icon aria-hidden="true" className="size-5 flex-none text-gray-500" />
        {item.name}
      </button>
    )
  }

  if (sections.length === 0) {
    return null
  }

  return (
    <Popover className="relative">
      <PopoverButton
        className={clsx(
          'inline-flex items-center gap-x-1 text-sm/6 font-semibold text-white',
          buttonClassName,
        )}
      >
        <span>{label}</span>
        {showChevron && <ChevronIcon aria-hidden="true" className="size-5" />}
      </PopoverButton>
      <PopoverPanel
        transition
        className={clsx(
          'absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 bg-transparent px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in',
          panelClassName,
        )}
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-gray-800 text-sm/6 outline-1 -outline-offset-1 outline-white/10">
          <div className="p-4">
            {sections.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                {section.title && (
                  <h3 className="px-4 py-2 text-xs font-semibold uppercase text-gray-400">
                    {section.title}
                  </h3>
                )}
                {section.items.map((item, itemIndex) =>
                  renderMenuItem(item, item.id || `${sectionIndex}-${itemIndex}`)
                )}
              </React.Fragment>
            ))}
          </div>
          {callsToAction.length > 0 && (
            <div className="grid grid-cols-2 divide-x divide-white/10 bg-gray-700/50">
              {callsToAction.map((item, index) => (
                <React.Fragment key={item.name || index}>
                  {renderCallToAction(item)}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export default FlyoutMenu

