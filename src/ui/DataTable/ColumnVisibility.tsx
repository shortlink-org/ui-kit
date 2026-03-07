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
    <Menu as="div" className="relative z-30 inline-block text-left">
      <MenuButton
        className={clsx(
          'inline-flex cursor-pointer items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm font-medium',
          'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
          'shadow-none',
        )}
      >
        <EyeIcon className="size-4" />
        Columns
      </MenuButton>
      <MenuItems
        transition
        className={clsx(
          'absolute right-0 z-50 mt-2 w-60 origin-top-right rounded-[0.9rem] border border-[var(--color-border)] p-1.5',
          'bg-[var(--color-surface)] shadow-[0_10px_24px_-18px_rgba(15,23,42,0.16)]',
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
                  'group flex w-full cursor-pointer items-center gap-3 rounded-[0.7rem] px-3 py-2.5 text-sm',
                  'text-[var(--color-foreground)]',
                  'data-focus:bg-[var(--color-muted)]',
                )}
              >
                <span
                  className={clsx(
                    'flex size-4 items-center justify-center rounded-sm border',
                    isVisible
                      ? 'border-slate-900 bg-slate-900 dark:border-white dark:bg-white'
                      : 'border-[var(--color-border)]',
                  )}
                >
                  {isVisible && (
                    <CheckIcon className="size-3 text-white dark:text-slate-950" />
                  )}
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
