'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { clsx } from 'clsx'
import { XMarkIcon } from '@heroicons/react/24/outline'

/**
 * Family-style Dialog component
 * 
 * A smooth, animated dialog using Motion for React.
 * The trigger button morphs into the dialog with view-transition-like effects.
 * 
 * @see https://motion.dev/tutorials/js-family-dialog
 */

export interface FamilyDialogProps {
  /** Dialog trigger button content */
  trigger: React.ReactNode
  /** Dialog title */
  title: string
  /** Dialog description */
  description?: string
  /** Dialog content */
  children?: React.ReactNode
  /** Primary action button text */
  confirmText?: string
  /** Cancel button text */
  cancelText?: string
  /** Callback when confirm is clicked */
  onConfirm?: () => void | Promise<void>
  /** Callback when cancel is clicked */
  onCancel?: () => void
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Trigger button className */
  triggerClassName?: string
  /** Dialog panel className */
  panelClassName?: string
  /** Variant style */
  variant?: 'default' | 'danger' | 'success'
}

const variantStyles = {
  default: {
    button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    confirm: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  },
  danger: {
    button: 'bg-red-600 hover:bg-red-700 text-white',
    confirm: 'bg-red-600 hover:bg-red-700 text-white',
  },
  success: {
    button: 'bg-green-600 hover:bg-green-700 text-white',
    confirm: 'bg-green-600 hover:bg-green-700 text-white',
  },
}

export function FamilyDialog({
  trigger,
  title,
  description,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  open: controlledOpen,
  onOpenChange,
  triggerClassName,
  panelClassName,
  variant = 'default',
}: FamilyDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  
  // Unique layoutId per instance to avoid conflicts
  const instanceId = React.useId()
  const buttonLayoutId = `family-dialog-button-${instanceId}`
  const panelLayoutId = `family-dialog-panel-${instanceId}`

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalOpen(value)
      }
      onOpenChange?.(value)
    },
    [isControlled, onOpenChange],
  )

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    onCancel?.()
  }

  const handleConfirm = async () => {
    if (onConfirm) {
      setIsLoading(true)
      try {
        await onConfirm()
        setOpen(false)
      } finally {
        setIsLoading(false)
      }
    } else {
      setOpen(false)
    }
  }

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const styles = variantStyles[variant]

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        ref={triggerRef}
        onClick={handleOpen}
        className={clsx(
          'inline-flex items-center justify-center px-4 py-2 rounded-xl font-medium',
          'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          styles.button,
          triggerClassName,
        )}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        layoutId={buttonLayoutId}
      >
        {trigger}
      </motion.button>

      {/* Dialog */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Dialog Panel */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.dialog
                ref={dialogRef}
                open
                className={clsx(
                  'relative w-full max-w-md overflow-hidden rounded-2xl',
                  'bg-white dark:bg-gray-800 shadow-2xl',
                  'p-0 m-0',
                  panelClassName,
                )}
                initial={{ 
                  opacity: 0, 
                  scale: 0.9,
                  y: 20,
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95,
                  y: 10,
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                layoutId={panelLayoutId}
              >
                {/* Close button */}
                <motion.button
                  onClick={handleClose}
                  className={clsx(
                    'absolute top-4 right-4 p-1.5 rounded-full',
                    'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    'transition-colors focus:outline-none focus-visible:ring-2',
                  )}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close dialog"
                >
                  <XMarkIcon className="w-5 h-5" />
                </motion.button>

                {/* Content */}
                <div className="p-6">
                  <motion.h2
                    className="text-xl font-semibold text-gray-900 dark:text-white pr-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {title}
                  </motion.h2>

                  {description && (
                    <motion.p
                      className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {description}
                    </motion.p>
                  )}

                  {children && (
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {children}
                    </motion.div>
                  )}
                </div>

                {/* Actions */}
                <motion.div
                  className="flex gap-3 p-4 pt-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={handleClose}
                    className={clsx(
                      'flex-1 px-4 py-2.5 rounded-xl font-medium',
                      'bg-gray-100 dark:bg-gray-700',
                      'text-gray-700 dark:text-gray-200',
                      'hover:bg-gray-200 dark:hover:bg-gray-600',
                      'transition-colors focus:outline-none focus-visible:ring-2',
                    )}
                    whileTap={{ scale: 0.97 }}
                  >
                    {cancelText}
                  </motion.button>

                  <motion.button
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className={clsx(
                      'flex-1 px-4 py-2.5 rounded-xl font-medium',
                      styles.confirm,
                      'transition-colors focus:outline-none focus-visible:ring-2',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                    )}
                    whileTap={{ scale: 0.97 }}
                    layoutId={buttonLayoutId}
                  >
                    {isLoading ? (
                      <motion.span
                        className="inline-flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Loading...
                      </motion.span>
                    ) : (
                      confirmText
                    )}
                  </motion.button>
                </motion.div>
              </motion.dialog>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default FamilyDialog
