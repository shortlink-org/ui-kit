import React from 'react'
import { DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { AppHeaderNavigationItem } from '../types'
import { classNames, isNavigationItemActive } from '../utils'

interface MobileMenuPanelProps {
  items: AppHeaderNavigationItem[]
  currentPath?: string
}

export function MobileMenuPanel({ items, currentPath }: MobileMenuPanelProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <DisclosurePanel className="sm:hidden border-t border-white/10">
      <div className="space-y-1 px-2 pt-2 pb-3 bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-800 dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-900">
        {items.map((item) => {
          const isActive = isNavigationItemActive(item, currentPath)
          return (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={classNames(
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          )
        })}
      </div>
    </DisclosurePanel>
  )
}

