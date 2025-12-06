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
    <div className="hidden sm:block mr-2">
      <Popover className="relative">
        <PopoverButton
          className={clsx(
            'inline-flex items-center gap-x-1 text-sm font-medium text-white/90 hover:text-white transition-colors',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50',
          )}
        >
          <span>{label}</span>
          <ChevronDownIcon aria-hidden="true" className="size-4" />
        </PopoverButton>
        <PopoverPanel
          transition
          className={clsx(
            'absolute left-1/2 z-10 mt-2 flex w-screen max-w-max -translate-x-1/2 bg-transparent px-4',
            'transition data-closed:translate-y-1 data-closed:opacity-0',
            'data-enter:duration-200 data-enter:ease-out',
            'data-leave:duration-150 data-leave:ease-in',
          )}
        >
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-gray-800 text-sm/6 outline-1 -outline-offset-1 outline-white/10">
            <div className="p-4">
              {items.map((item) => {
                const IconComponent =
                  item.icon && typeof item.icon !== 'string' ? item.icon : null
                const itemKey = item.name

                return (
                  <div
                    key={itemKey}
                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-white/5"
                  >
                    {IconComponent && (
                      <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
                        {typeof IconComponent === 'function' ? (
                          React.createElement(
                            IconComponent as unknown as React.ComponentType<{
                              className?: string
                              'aria-hidden'?: boolean
                            }>,
                            {
                              'aria-hidden': true,
                              className:
                                'size-6 text-gray-400 group-hover:text-white',
                            },
                          )
                        ) : (
                          <span className="size-6 text-gray-400 group-hover:text-white flex items-center justify-center">
                            {IconComponent}
                          </span>
                        )}
                      </div>
                    )}
                    {!IconComponent && item.icon && (
                      <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
                        <span className="text-lg text-gray-400 group-hover:text-white">
                          {item.icon}
                        </span>
                      </div>
                    )}
                    <div>
                      {item.href ? (
                        renderLink(
                          item.href,
                          <>
                            <span className="font-semibold text-white">
                              {item.name}
                            </span>
                            <span className="absolute inset-0" />
                          </>,
                          'block',
                        )
                      ) : (
                        <span className="font-semibold text-white">
                          {item.name}
                        </span>
                      )}
                      {item.description && (
                        <p className="mt-1 text-gray-400">{item.description}</p>
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
