import React from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { AppHeaderMenuItem, LinkComponent } from '../types'

interface HeaderSecondMenuProps {
  items: AppHeaderMenuItem[]
  label: string
  LinkComponent?: LinkComponent
}

export function HeaderSecondMenu({
  items,
  label,
  LinkComponent,
}: HeaderSecondMenuProps) {
  const renderLink = (
    href: string,
    children: React.ReactNode,
    linkClassName?: string,
  ) => {
    if (LinkComponent) {
      return (
        <LinkComponent href={href} className={linkClassName}>
          {children}
        </LinkComponent>
      )
    }
    return (
      <a href={href} className={linkClassName}>
        {children}
      </a>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="mr-1 hidden shrink-0 sm:block">
      <Popover className="relative z-20">
        <PopoverButton
          className={clsx(
            'focus-ring inline-flex shrink-0 items-center gap-x-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]',
          )}
        >
          <span>{label}</span>
          <ChevronDownIcon aria-hidden="true" className="size-4" />
        </PopoverButton>
        <PopoverPanel
          transition
          className={clsx(
            'absolute left-1/2 z-50 mt-3 flex w-screen max-w-max -translate-x-1/2 bg-transparent px-4',
            'transition data-closed:translate-y-1 data-closed:opacity-0',
            'data-enter:duration-200 data-enter:ease-out',
            'data-leave:duration-150 data-leave:ease-in',
          )}
        >
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm/6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)]">
            <div className="p-4">
              {items.map((item) => {
                const IconComponent =
                  item.icon && typeof item.icon !== 'string' ? item.icon : null
                const itemKey = item.name

                return (
                  <div
                    key={itemKey}
                    className="group relative flex gap-x-4 rounded-[1rem] p-4 hover:bg-[var(--color-muted)]"
                  >
                    {IconComponent && (
                      <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-[0.9rem] bg-[var(--color-muted)]">
                        {typeof IconComponent === 'function' ? (
                          React.createElement(
                            IconComponent as unknown as React.ComponentType<{
                              className?: string
                              'aria-hidden'?: boolean
                            }>,
                            {
                              'aria-hidden': true,
                              className:
                                'size-6 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]',
                            },
                          )
                        ) : (
                          <span className="flex size-6 items-center justify-center text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]">
                            {IconComponent}
                          </span>
                        )}
                      </div>
                    )}
                    {!IconComponent && item.icon && (
                      <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-[0.9rem] bg-[var(--color-muted)]">
                        <span className="text-lg text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]">
                          {item.icon}
                        </span>
                      </div>
                    )}
                    <div>
                      {item.href ? (
                        renderLink(
                          item.href,
                          <>
                            <span className="font-semibold text-[var(--color-foreground)]">
                              {item.name}
                            </span>
                            <span className="absolute inset-0" />
                          </>,
                          'block',
                        )
                      ) : (
                        <span className="font-semibold text-[var(--color-foreground)]">
                          {item.name}
                        </span>
                      )}
                      {item.description && (
                        <p className="mt-1 text-[var(--color-muted-foreground)]">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  )
}
