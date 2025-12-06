import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Button,
} from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { Button as UIButton } from '../Button/Button'

export interface ConfirmDeleteModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  count?: number
}

export function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirm deletion',
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  count,
}: ConfirmDeleteModalProps) {
  if (!open) {
    return null
  }

  const displayMessage =
    message ||
    (count !== undefined
      ? `Are you sure you want to delete ${count} item(s)? This action cannot be undone.`
      : 'Are you sure you want to delete this item? This action cannot be undone.')

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-300 ease-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-closed:opacity-0 data-closed:scale-95 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 sm:mx-0 sm:size-10">
                <ExclamationTriangleIcon
                  className="size-6 text-red-600 dark:text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                >
                  {title}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {displayMessage}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <UIButton
                variant="destructive"
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
                className="w-full sm:ml-3 sm:w-auto"
              >
                {confirmText}
              </UIButton>
              <Button
                type="button"
                onClick={onClose}
                className={clsx(
                  'mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-3 py-2',
                  'text-sm font-semibold text-gray-900 dark:text-white shadow-sm',
                  'ring-1 ring-inset ring-gray-300 dark:ring-gray-600',
                  'hover:bg-gray-50 dark:hover:bg-gray-700',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                  'sm:mt-0 sm:w-auto',
                )}
              >
                {cancelText}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ConfirmDeleteModal
