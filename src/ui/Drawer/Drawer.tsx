import * as React from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

export type DrawerPosition = 'left' | 'right'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean
  /** Callback when the drawer should close */
  onClose: (open: boolean) => void
  /** Drawer title */
  title?: React.ReactNode
  /** Drawer content */
  children?: React.ReactNode
  /** Position of the drawer (left or right) */
  position?: DrawerPosition
  /** Size of the drawer */
  size?: DrawerSize
  /** Whether to show the close button */
  showCloseButton?: boolean
  /** Custom className for the drawer panel */
  panelClassName?: string
  /** Custom className for the backdrop */
  backdropClassName?: string
  /** Custom className for the title */
  titleClassName?: string
  /** Custom className for the content area */
  contentClassName?: string
  /** Custom close button icon */
  closeIcon?: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
}

const sizeClasses: Record<DrawerSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  showCloseButton = true,
  panelClassName,
  backdropClassName,
  titleClassName,
  contentClassName,
  closeIcon: CloseIcon = XMarkIcon,
}: DrawerProps) {
  const isRight = position === 'right'
  const isLeft = position === 'left'

  // Don't render anything when closed to avoid focus traps and flickering
  if (!open) {
    return null
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className={clsx(
          'fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0',
          backdropClassName,
        )}
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={clsx(
              'pointer-events-none fixed inset-y-0 flex max-w-full',
              isRight && 'right-0',
              isLeft && 'left-0',
            )}
          >
            <DialogPanel
              transition
              className={clsx(
                'pointer-events-auto relative w-screen transform transition duration-500 ease-in-out sm:duration-700',
                isRight && 'data-closed:translate-x-full',
                isLeft && 'data-closed:-translate-x-full',
                sizeClasses[size],
                panelClassName,
              )}
            >
              {showCloseButton && (
                <TransitionChild>
                  <div
                    className={clsx(
                      'absolute top-0 flex pt-4 duration-500 ease-in-out data-closed:opacity-0',
                      isRight && 'left-0 -ml-8 pr-2 sm:-ml-10 sm:pr-4',
                      isLeft && 'right-0 -mr-8 pl-2 sm:-mr-10 sm:pl-4',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => onClose(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <CloseIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </TransitionChild>
              )}

              <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl dark:bg-gray-900">
                {title && (
                  <div className="px-4 sm:px-6">
                    <DialogTitle className={clsx('text-base font-semibold text-gray-900 dark:text-white', titleClassName)}>
                      {title}
                    </DialogTitle>
                  </div>
                )}
                <div className={clsx('relative mt-6 flex-1 px-4 sm:px-6', contentClassName)}>{children}</div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default Drawer

