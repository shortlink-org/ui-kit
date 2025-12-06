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
    <DisclosurePanel className="sm:hidden border-t border-white/10">
      <div className="space-y-1 px-2 pt-2 pb-3 bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-800 dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-900">
        {items.map((item) => {
          const isActive = isNavigationItemActive(item, currentPath)
          const linkClassName = classNames(
            isActive
              ? 'bg-white/10 text-white'
              : 'text-white/70 hover:bg-white/5 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          )
          return renderLink(
            item,
            item.name,
            linkClassName,
            isActive ? 'page' : undefined,
          )
        })}
      </div>
    </DisclosurePanel>
  )
}
