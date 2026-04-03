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
  chevronIcon?: React.ComponentType<{
    className?: string
    'aria-hidden'?: boolean
  }>
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

  const renderLink = (
    href: string,
    children: React.ReactNode,
    className?: string,
  ) => {
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
      const itemBody = (
        <>
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600 ring-1 ring-slate-200 transition-colors duration-200 group-hover:bg-white group-hover:text-slate-900">
            <item.icon aria-hidden className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-slate-900">
              {item.name}
            </span>
            <span className="mt-1 block text-sm leading-6 text-slate-600">
              {item.description}
            </span>
          </span>
        </>
      )

      const itemClassName =
        'group relative flex w-full cursor-pointer items-start gap-4 rounded-2xl px-4 py-4 text-left transition-colors duration-200 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60'

      const itemContent = item.href
        ? renderLink(item.href, itemBody, itemClassName)
        : (
            <button onClick={handleClick} className={itemClassName}>
              {itemBody}
            </button>
          )

      if (renderItem) {
        return renderItem({ item, defaultRender: () => itemContent })
      }

      return itemContent
    }

    return <React.Fragment key={key}>{defaultRender()}</React.Fragment>
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
          <item.icon aria-hidden className="size-5 flex-none text-slate-400 transition-colors group-hover:text-slate-600" />
          <span className="font-medium text-slate-900">{item.name}</span>
        </>,
        'group flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-white',
      )
    }

    return (
      <button
        onClick={handleClick}
        className="group flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-white"
      >
        <item.icon aria-hidden className="size-5 flex-none text-slate-400 transition-colors group-hover:text-slate-600" />
        <span className="font-medium text-slate-900">{item.name}</span>
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
          'group inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60',
          buttonClassName,
        )}
      >
        <span>{label}</span>
        {showChevron && (
          <ChevronIcon
            aria-hidden
            className="size-5 text-[var(--color-muted-foreground)] transition-transform duration-200 group-data-open:rotate-180"
          />
        )}
      </PopoverButton>
      <PopoverPanel
        transition
        className={clsx(
          'absolute left-1/2 z-20 mt-5 flex w-screen max-w-max -translate-x-1/2 bg-transparent px-4 transition data-closed:translate-y-2 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in',
          panelClassName,
        )}
      >
        <div className="relative w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm shadow-lg ring-1 ring-slate-900/5 lg:max-w-2xl">
          <div className="p-4">

            {sections.map((section, sectionIndex) => (
              <section
                key={section.title || sectionIndex}
                className={clsx(sectionIndex > 0 && 'mt-2 border-t border-slate-200 pt-4')}
              >
                {section.title && (
                  <h3 className="mb-3 px-4 text-xs font-semibold text-slate-500">
                    {section.title}
                  </h3>
                )}
                <div className="grid gap-2 lg:grid-cols-2">
                  {section.items.map((item, itemIndex) =>
                    renderMenuItem(
                      item,
                      item.id || `${sectionIndex}-${itemIndex}`,
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
          {callsToAction.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50">
              <div className="grid gap-1 p-3 sm:grid-cols-2">
                {callsToAction.map((item, index) => (
                  <React.Fragment key={item.name || index}>
                    {renderCallToAction(item)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export default FlyoutMenu
