import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

interface CollapsibleMenuProps {
  mode: 'full' | 'mini'
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
  collapsed?: boolean
  onCollapseChange?: (collapsed: boolean) => void
}

const CollapsibleMenu = ({ mode, icon: Icon, title, children, collapsed, onCollapseChange }: CollapsibleMenuProps) => {
  const iconClassName =
    'text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'

  const baseButtonClassName =
    'flex items-center cursor-pointer w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800'

  const buttonClassName = clsx(
    baseButtonClassName,
    mode === 'mini' && 'justify-center'
  )

  const [isOpen, setIsOpen] = React.useState(collapsed === undefined ? true : !collapsed)

  // Sync disclosure state with internal state
  const prevOpenRef = React.useRef(isOpen)
  
  // Sync with collapsed prop when it changes externally
  React.useEffect(() => {
    if (collapsed !== undefined) {
      setIsOpen(!collapsed)
    }
  }, [collapsed])

  return (
    <li className="w-full">
      <Disclosure defaultOpen={isOpen}>
        {({ open }) => {
          // Update state when disclosure changes (only if different)
          if (open !== prevOpenRef.current) {
            prevOpenRef.current = open
            setIsOpen(open)
            if (onCollapseChange) {
              onCollapseChange(!open)
            }
          }
          
          return (
            <div>
              {mode === 'mini' ? (
                <DisclosureButton
                  className={buttonClassName}
                  aria-label={title}
                  title={title}
                >
                  <Icon className={iconClassName} />
                </DisclosureButton>
              ) : (
                <DisclosureButton className={buttonClassName}>
                  <Icon className={iconClassName} />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    {title}
                  </span>
                  {open ? (
                    <ChevronUpIcon className="size-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                  ) : (
                    <ChevronDownIcon className="size-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                  )}
                </DisclosureButton>
              )}

              <DisclosurePanel>
                <ul className="py-2 px-4 space-y-2" role="group">
                  {children}
                </ul>
              </DisclosurePanel>
            </div>
          )
        }}
      </Disclosure>
    </li>
  )
}

export default CollapsibleMenu
