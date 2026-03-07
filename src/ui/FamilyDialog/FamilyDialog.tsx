'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { clsx } from 'clsx'
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

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
  /** Optional small label above the title */
  eyebrow?: string
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
    button:
      'border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-slate-400 hover:bg-slate-50',
    confirm:
      'border border-slate-900 bg-slate-900 text-white hover:bg-slate-800',
    secondary:
      'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
    icon:
      'border-slate-200 bg-slate-50 text-slate-600 shadow-none',
    badge: 'text-slate-600',
    accent: 'from-transparent via-transparent to-transparent',
    panel:
      'border-slate-200 bg-white',
    iconNode: <InformationCircleIcon className="size-6" />,
  },
  danger: {
    button:
      'border border-rose-300 bg-white text-rose-700 shadow-sm hover:bg-rose-50',
    confirm:
      'border border-rose-600 bg-rose-600 text-white hover:bg-rose-700',
    secondary:
      'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
    icon:
      'border-rose-200 bg-rose-50 text-rose-600 shadow-none',
    badge: 'text-rose-700',
    accent: 'from-transparent via-transparent to-transparent',
    panel:
      'border-slate-200 bg-white',
    iconNode: <ExclamationTriangleIcon className="size-6" />,
  },
  success: {
    button:
      'border border-emerald-300 bg-white text-emerald-700 shadow-sm hover:bg-emerald-50',
    confirm:
      'border border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700',
    secondary:
      'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
    icon:
      'border-emerald-200 bg-emerald-50 text-emerald-600 shadow-none',
    badge: 'text-emerald-700',
    accent: 'from-transparent via-transparent to-transparent',
    panel:
      'border-slate-200 bg-white',
    iconNode: <CheckBadgeIcon className="size-6" />,
  },
}

export function FamilyDialog({
  trigger,
  eyebrow,
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

  const handleOpen = React.useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const handleClose = React.useCallback(() => {
    setOpen(false)
    onCancel?.()
  }, [onCancel, setOpen])

  const handleConfirm = React.useCallback(async () => {
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
  }, [onConfirm, setOpen])

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [handleClose, isOpen])

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
          'inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold',
          'transition-[background-color,color,border-color,box-shadow,transform] duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'focus-visible:ring-sky-500/60',
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
              className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-md"
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
                  'relative m-0 w-full max-w-lg overflow-hidden rounded-[2rem] border',
                  'shadow-[0_36px_120px_-48px_rgba(15,23,42,0.55)]',
                  'ring-1 ring-black/5 backdrop-blur-xl',
                  'p-0',
                  styles.panel,
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
                <div
                  aria-hidden="true"
                  className={clsx(
                    'pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b',
                    styles.accent,
                  )}
                />

                {/* Close button */}
                <motion.button
                  onClick={handleClose}
                className={clsx(
                    'absolute right-5 top-5 z-10 rounded-xl border border-slate-200 bg-white p-2 text-slate-500 shadow-sm',
                    'hover:bg-white hover:text-slate-700',
                    'transition-colors focus:outline-none focus-visible:ring-2',
                  )}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close dialog"
                >
                  <XMarkIcon className="w-5 h-5" />
                </motion.button>

                {/* Content */}
                <div className="relative p-6 sm:p-7">
                  <motion.div
                    className={clsx(
                      'inline-flex h-14 w-14 items-center justify-center rounded-2xl border',
                      styles.icon,
                    )}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {styles.iconNode}
                  </motion.div>

                  {(eyebrow || variant) && (
                    <motion.p
                      className={clsx(
                        'mt-5 text-[11px] font-semibold uppercase tracking-[0.3em]',
                        styles.badge,
                      )}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 }}
                    >
                      {eyebrow ||
                        (variant === 'danger'
                          ? 'Destructive action'
                          : variant === 'success'
                            ? 'Ready to continue'
                            : 'Confirm action')}
                    </motion.p>
                  )}

                  <motion.h2
                    className="pr-10 pt-3 text-2xl font-semibold tracking-tight text-slate-950"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14 }}
                  >
                    {title}
                  </motion.h2>

                  {description && (
                    <motion.p
                      className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {description}
                    </motion.p>
                  )}

                  {children && (
                    <motion.div
                      className="mt-5"
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
                  className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/60 p-5 sm:flex-row sm:justify-end"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={handleClose}
                    className={clsx(
                      'inline-flex min-h-11 flex-1 items-center justify-center rounded-xl px-5 text-sm font-semibold sm:flex-none',
                      styles.secondary,
                      'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60',
                    )}
                    whileTap={{ scale: 0.97 }}
                  >
                    {cancelText}
                  </motion.button>

                  <motion.button
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className={clsx(
                      'inline-flex min-h-11 flex-1 items-center justify-center rounded-xl px-5 text-sm font-semibold sm:flex-none',
                      styles.confirm,
                      'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60',
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
