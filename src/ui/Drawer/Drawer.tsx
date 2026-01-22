import * as React from 'react'
import { Drawer as VaulDrawer } from 'vaul'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

export type DrawerPosition = 'left' | 'right' | 'bottom'
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
  /** Position of the drawer (left, right, or bottom) */
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
  /** Whether the drawer content should scroll (default: true) */
  contentScrollable?: boolean
  /** Custom close button icon */
  closeIcon?: React.ComponentType<{
    className?: string
    'aria-hidden'?: boolean
  }>
}

const sideSizeClasses: Record<DrawerSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
}

const bottomSizeClasses: Record<DrawerSize, string> = {
  sm: 'h-[40vh] max-h-[40vh]',
  md: 'h-[60vh] max-h-[60vh]',
  lg: 'h-[75vh] max-h-[75vh]',
  xl: 'h-[85vh] max-h-[85vh]',
  full: 'h-screen max-h-screen',
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
  contentScrollable = true,
  closeIcon: CloseIcon = XMarkIcon,
}: DrawerProps) {
  const isRight = position === 'right'
  const isLeft = position === 'left'
  const isBottom = position === 'bottom'
  const isSide = isLeft || isRight

  // Don't render anything when closed to avoid focus traps and flickering
  if (!open) {
    return null
  }

  return (
    <VaulDrawer.Root
      open={open}
      onOpenChange={onClose}
      direction={isBottom ? 'bottom' : isLeft ? 'left' : 'right'}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay
          className={clsx(
            'fixed inset-0 z-40 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[state=closed]:opacity-0',
            backdropClassName,
          )}
        />
        <VaulDrawer.Content
          style={
            isSide
              ? ({ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties)
              : undefined
          }
          className={clsx(
            'fixed z-50 flex flex-col outline-none',
            isSide ? 'bg-transparent shadow-none' : 'bg-white shadow-xl dark:bg-gray-900',
            'transition-transform duration-500 ease-in-out',
            isRight &&
              'inset-y-2 right-2 w-[calc(100%-1rem)] data-[state=closed]:translate-x-full rounded-2xl',
            isLeft &&
              'inset-y-2 left-2 w-[calc(100%-1rem)] data-[state=closed]:-translate-x-full rounded-2xl',
            isBottom &&
              'inset-x-0 bottom-0 w-full rounded-t-2xl data-[state=closed]:translate-y-full',
            isBottom ? bottomSizeClasses[size] : sideSizeClasses[size],
            panelClassName,
          )}
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={() => onClose(false)}
              className="absolute top-4 right-4 z-10 rounded-md text-gray-400 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <span className="sr-only">Close panel</span>
              <CloseIcon aria-hidden className="size-6" />
            </button>
          )}

          <div
            className={clsx(
              'relative flex h-full min-h-0 flex-col overflow-hidden',
              isSide && 'rounded-2xl bg-white shadow-xl dark:bg-gray-900',
            )}
          >
            {isBottom ? (
              <div
                data-vaul-scroll={contentScrollable ? true : undefined}
                className={clsx(
                  'flex flex-1 min-h-0 flex-col px-4 pb-6 pt-4 sm:px-6',
                  contentScrollable ? 'overflow-y-auto' : 'overflow-hidden',
                  contentClassName,
                )}
              >
                <div className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300 cursor-grab active:cursor-grabbing dark:bg-gray-600" />
                {title && (
                  <VaulDrawer.Title
                    className={clsx(
                      'text-base font-semibold text-gray-900 dark:text-white',
                      titleClassName,
                    )}
                  >
                    {title}
                  </VaulDrawer.Title>
                )}
                <div
                  className={clsx(
                    title ? 'mt-4' : 'mt-2',
                    'flex-1 min-h-0',
                  )}
                >
                  {children}
                </div>
              </div>
            ) : (
              <div className="relative flex h-full min-h-0 flex-col py-4 sm:py-6">
                {title && (
                  <div className="px-4 sm:px-6">
                    <VaulDrawer.Title
                      className={clsx(
                        'text-base font-semibold text-gray-900 dark:text-white',
                        titleClassName,
                      )}
                    >
                      {title}
                    </VaulDrawer.Title>
                  </div>
                )}
                <div
                  data-vaul-scroll={contentScrollable ? true : undefined}
                  className={clsx(
                    title ? 'mt-6' : 'mt-2',
                    'relative flex-1 min-h-0 px-4 sm:px-6',
                    contentScrollable ? 'overflow-y-auto' : 'overflow-hidden',
                    contentClassName,
                  )}
                >
                  {children}
                </div>
              </div>
            )}
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  )
}

export default Drawer
