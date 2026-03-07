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
    <div className="hidden overflow-hidden xl:flex xl:min-w-0 xl:items-center xl:justify-center xl:px-3 2xl:px-5">
      <div className="flex max-w-full min-w-0 items-center gap-2 overflow-x-auto rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.28)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = isNavigationItemActive(item, currentPath)
          return renderLink(
            item.href,
            <span className="inline-flex items-center gap-2">
              <span>{item.name}</span>
              {item.badge ? (
                <span
                  className={classNames(
                    'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]',
                    isActive
                      ? 'bg-white/80 text-slate-700'
                      : 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </span>,
            classNames(
              isActive
                ? 'bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950'
                : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]',
              'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
            ),
            isActive ? 'page' : undefined,
          )
        })}
      </div>
    </div>
  )
}
