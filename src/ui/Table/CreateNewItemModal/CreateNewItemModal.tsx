import type { ColumnDef } from '@tanstack/react-table'
import { useState, useTransition } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Button } from '@headlessui/react'
import { clsx } from 'clsx'
import { Button as UIButton } from '../../Button/Button'

interface CreateModalProps<TData extends Record<string, unknown> = Record<string, unknown>> {
  columns: ColumnDef<TData, unknown>[]
  onClose: () => void
  onSubmit: (values: TData) => void
  open: boolean
}

// Helper function to safely get accessorKey from a column
function getAccessorKey<TData>(column: ColumnDef<TData, unknown>): string | undefined {
  if ('accessorKey' in column && typeof column.accessorKey === 'string') {
    return column.accessorKey
  }
  return undefined
}

export const CreateNewItemModal = <TData extends Record<string, unknown> = Record<string, unknown>>({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps<TData>) => {
  const [values, setValues] = useState<Partial<TData>>(() =>
    columns.reduce((acc, column) => {
      const key = getAccessorKey<TData>(column) as keyof TData | undefined
      if (key) {
        acc[key] = '' as TData[keyof TData]
      }
      return acc
    }, {} as Partial<TData>),
  )
  const [isPending, startTransition] = useTransition()

  // React 19 form action - automatically wrapped in transition
  async function submitAction(formData: FormData) {
    const formValues = {} as Partial<TData>
    columns.forEach((column) => {
      const key = getAccessorKey<TData>(column) as keyof TData | undefined
      if (key) {
        formValues[key] = (formData.get(key as string) || '') as TData[keyof TData]
      }
    })
    
    // put your validation logic here
    startTransition(async () => {
      await onSubmit(formValues as TData)
      onClose()
      // Reset form
      setValues(
        columns.reduce((acc, column) => {
          const key = getAccessorKey<TData>(column) as keyof TData | undefined
          if (key) {
            acc[key] = '' as TData[keyof TData]
          }
          return acc
        }, {} as Partial<TData>),
      )
    })
  }

  if (!open) {
    return null
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-300 ease-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all data-closed:opacity-0 data-closed:scale-95 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          >
            <DialogTitle as="h3" className="text-center text-lg font-medium leading-6 text-gray-900 dark:text-white mb-6">
              Create New Item
            </DialogTitle>

            <form action={submitAction}>
              <div className="space-y-4 mb-6">
                {columns.map((column) => {
                  const key = getAccessorKey<TData>(column) as keyof TData | undefined
                  const keyStr = key ? String(key) : ''
                  const label = (column.header as string) || keyStr
                  
                  // Skip columns without accessorKey
                  if (!key) {
                    return null
                  }

                  return (
                    <div key={keyStr}>
                      <label htmlFor={keyStr} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {label}
                      </label>
                      <input
                        id={keyStr}
                        name={keyStr}
                        type="text"
                        value={(values[key] as string) || ''}
                        onChange={(e) =>
                          setValues({ ...values, [e.target.name]: e.target.value } as Partial<TData>)
                        }
                        required
                        disabled={isPending}
                        className={clsx(
                          'block w-full rounded-md border-gray-300 dark:border-gray-600',
                          'shadow-sm focus:border-indigo-500 focus:ring-indigo-500',
                          'dark:bg-gray-700 dark:text-white',
                          'px-3 py-2 text-sm',
                          'disabled:opacity-50 disabled:cursor-not-allowed'
                        )}
                      />
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={onClose}
                  disabled={isPending}
                  className={clsx(
                    'px-4 py-2 text-sm font-medium rounded-md',
                    'border border-gray-300 dark:border-gray-600',
                    'text-gray-700 dark:text-gray-300',
                    'hover:bg-gray-50 dark:hover:bg-gray-700',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  Cancel
                </Button>
                <UIButton
                  type="submit"
                  variant="secondary"
                  disabled={isPending}
                  loading={isPending}
                >
                  {isPending ? 'Creating...' : 'Create'}
                </UIButton>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default CreateNewItemModal
