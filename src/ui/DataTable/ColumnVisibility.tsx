import { type Table as TanStackTable } from '@tanstack/react-table'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EyeIcon, CheckIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

export interface ColumnVisibilityProps<TData> {
  table: TanStackTable<TData>
}

export function ColumnVisibility<TData>({
  table,
}: ColumnVisibilityProps<TData>) {
  const allColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide())

  if (allColumns.length === 0) {
    return null
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className={clsx(
          'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
          'text-gray-700 dark:text-gray-300',
          'border border-gray-300 dark:border-gray-600',
          'bg-white dark:bg-gray-800',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        )}
      >
        <EyeIcon className="size-4" />
        Columns
      </MenuButton>
      <MenuItems
        transition
        className={clsx(
          'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md',
          'bg-white dark:bg-gray-800 shadow-lg',
          'ring-1 ring-black/5 dark:ring-white/10',
          'focus:outline-none',
          'transition data-closed:scale-95 data-closed:transform data-closed:opacity-0',
          'data-enter:duration-100 data-enter:ease-out',
          'data-leave:duration-75 data-leave:ease-in',
        )}
      >
        {allColumns.map((column) => {
          const isVisible = column.getIsVisible()
          const header = column.columnDef.header

          return (
            <MenuItem key={column.id}>
              <button
                onClick={() => column.toggleVisibility(!isVisible)}
                className={clsx(
                  'group flex w-full items-center gap-2 px-4 py-2 text-sm',
                  'text-gray-700 dark:text-gray-300',
                  'data-focus:bg-gray-100 dark:data-focus:bg-gray-700',
                )}
              >
                <span
                  className={clsx(
                    'flex size-4 items-center justify-center rounded border',
                    isVisible
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300 dark:border-gray-600',
                  )}
                >
                  {isVisible && <CheckIcon className="size-3 text-white" />}
                </span>
                <span>{typeof header === 'string' ? header : column.id}</span>
              </button>
            </MenuItem>
          )
        })}
      </MenuItems>
    </Menu>
  )
}
