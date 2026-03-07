import React from 'react'
import { DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { AppHeaderNavigationItem, LinkComponent } from '../types'
import { classNames, isNavigationItemActive } from '../utils'

interface MobileMenuPanelProps {
  items: AppHeaderNavigationItem[]
  currentPath?: string
  LinkComponent?: LinkComponent
}

export function MobileMenuPanel({
  items,
  currentPath,
  LinkComponent,
}: MobileMenuPanelProps) {
  if (items.length === 0) {
    return null
  }

  const renderLink = (
    item: AppHeaderNavigationItem,
    children: React.ReactNode,
    linkClassName: string,
    ariaCurrent?: 'page',
  ) => {
    if (LinkComponent) {
      return (
        <DisclosureButton
          as={LinkComponent}
          key={item.name}
          href={item.href}
          className={linkClassName}
          aria-current={ariaCurrent}
        >
          {children}
        </DisclosureButton>
      )
    }

    return (
      <DisclosureButton
        as="a"
        key={item.name}
        href={item.href}
        aria-current={ariaCurrent}
        className={linkClassName}
      >
        {children}
      </DisclosureButton>
    )
  }

  return (
    <DisclosurePanel className="border-t border-[var(--color-border)] sm:hidden">
      <div className="space-y-1 bg-[var(--color-background)] px-3 pb-4 pt-3">
        {items.map((item) => {
          const isActive = isNavigationItemActive(item, currentPath)
          const linkClassName = classNames(
            isActive
              ? 'bg-[var(--color-surface)] text-[var(--color-foreground)] shadow-sm'
              : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)]',
            'block rounded-[1rem] px-3 py-3 text-base font-medium',
          )
          return renderLink(item, item.name, linkClassName, isActive ? 'page' : undefined)
        })}
      </div>
    </DisclosurePanel>
  )
}
