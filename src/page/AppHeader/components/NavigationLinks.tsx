import { type ReactNode } from 'react'
import { AppHeaderNavigationItem, LinkComponent } from '../types'
import { classNames, isNavigationItemActive } from '../utils'

interface NavigationLinksProps {
  items: AppHeaderNavigationItem[]
  currentPath?: string
  LinkComponent?: LinkComponent
}

export function NavigationLinks({
  items,
  currentPath,
  LinkComponent,
}: NavigationLinksProps) {
  const renderLink = (
    href: string,
    children: ReactNode | string,
    linkClassName?: string,
    ariaCurrent?: 'page' | undefined,
  ) => {
    const linkProps: {
      href: string
      className?: string
      'aria-current'?: 'page'
    } = {
      href,
      className: linkClassName,
    }

    if (ariaCurrent) {
      linkProps['aria-current'] = ariaCurrent
    }

    if (LinkComponent) {
      return (
        <LinkComponent href={linkProps.href} className={linkProps.className}>
          {children}
        </LinkComponent>
      )
    }
    return (
      <a
        href={linkProps.href}
        className={linkProps.className}
        aria-current={linkProps['aria-current']}
      >
        {children}
      </a>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        {items.map((item) => {
          const isActive = isNavigationItemActive(item, currentPath)
          return renderLink(
            item.href,
            item.name,
            classNames(
              isActive
                ? 'bg-white/10 text-white'
                : 'text-white/70 hover:bg-white/5 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium',
            ),
            isActive ? 'page' : undefined,
          )
        })}
      </div>
    </div>
  )
}
