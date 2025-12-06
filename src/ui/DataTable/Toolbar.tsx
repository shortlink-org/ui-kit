import { type Table as TanStackTable } from '@tanstack/react-table'
import {
  ArrowDownTrayIcon,
  PlusIcon,
  TrashIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { mkConfig, generateCsv, download } from 'export-to-csv'

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
})

export interface ToolbarProps<TData> {
  table: TanStackTable<TData>
  onCreate?: () => void
  onBulkDelete?: (rows: TData[]) => void
  onRefresh?: () => void
  enableExport?: boolean
  enableCreate?: boolean
  enableBulkDelete?: boolean
  enableRefresh?: boolean
}

export function Toolbar<TData extends Record<string, unknown>>({
  table,
  onCreate,
  onBulkDelete,
  onRefresh,
  enableExport = true,
  enableCreate = false,
  enableBulkDelete = false,
  enableRefresh = false,
}: ToolbarProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const pageSelectedRows = table
    .getRowModel()
    .rows.filter((row) => row.getIsSelected())
  const hasSelection = selectedRows.length > 0
  const hasPageSelection = pageSelectedRows.length > 0
  const allData = table.getCoreRowModel().rows.map((row) => row.original)
  const pageRows = table.getRowModel().rows.map((row) => row.original)

  const handleExportAll = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const csv = generateCsv(csvConfig)(allData as any)
    download(csvConfig)(csv)
  }

  const handleExportPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const csv = generateCsv(csvConfig)(pageRows as any)
    download(csvConfig)(csv)
  }

  const handleExportSelected = () => {
    const selectedData = selectedRows.map((row) => row.original)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const csv = generateCsv(csvConfig)(selectedData as any)
    download(csvConfig)(csv)
  }

  const handleBulkDelete = () => {
    if (!hasSelection) return
    const selectedData = selectedRows.map((row) => row.original)
    onBulkDelete?.(selectedData)
    // Clear selection after deletion
    table.resetRowSelection()
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {enableCreate && (
          <Button
            onClick={onCreate}
            className={clsx(
              'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium',
              'text-white bg-indigo-600 hover:bg-indigo-700',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              'transition-all duration-200 shadow-sm hover:shadow-md',
            )}
          >
            <PlusIcon className="size-4" />
            Create New Item
          </Button>
        )}
        {enableBulkDelete && (
          <>
            <Button
              onClick={handleBulkDelete}
              disabled={!hasSelection}
              className={clsx(
                'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium',
                'text-white bg-red-600 hover:bg-red-700',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-200 shadow-sm hover:shadow-md',
              )}
            >
              <TrashIcon className="size-4" />
              Delete Selected ({selectedRows.length})
            </Button>
            {hasPageSelection && (
              <Menu as="div" className="relative">
                <MenuButton
                  className={clsx(
                    'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
                    'text-gray-700 dark:text-gray-300',
                    'border border-gray-300 dark:border-gray-600',
                    'bg-white dark:bg-gray-800',
                    'hover:bg-gray-50 dark:hover:bg-gray-700',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                    'transition-all duration-200',
                  )}
                >
                  Selection Actions
                </MenuButton>
                <MenuItems
                  transition
                  className={clsx(
                    'absolute top-full left-0 mt-2 z-10 w-48 origin-top-left rounded-md',
                    'bg-white dark:bg-gray-800 shadow-lg',
                    'ring-1 ring-black/5 dark:ring-white/10',
                    'focus:outline-none',
                    'transition data-closed:scale-95 data-closed:transform data-closed:opacity-0',
                    'data-enter:duration-100 data-enter:ease-out',
                    'data-leave:duration-75 data-leave:ease-in',
                  )}
                >
                  <MenuItem>
                    <button
                      onClick={() => table.toggleAllPageRowsSelected(true)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 data-focus:bg-gray-100 dark:data-focus:bg-gray-700"
                    >
                      Select All on Page
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => {
                        pageRows.forEach((_, index) => {
                          const row = table.getRowModel().rows[index]
                          if (row) row.toggleSelected(!row.getIsSelected())
                        })
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 data-focus:bg-gray-100 dark:data-focus:bg-gray-700"
                    >
                      Invert Selection on Page
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => table.resetRowSelection()}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 data-focus:bg-gray-100 dark:data-focus:bg-gray-700"
                    >
                      Clear All Selection
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </>
        )}
        {enableRefresh && onRefresh && (
          <Button
            onClick={onRefresh}
            className={clsx(
              'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium',
              'text-gray-700 dark:text-gray-300',
              'border border-gray-300 dark:border-gray-600',
              'bg-white dark:bg-gray-800',
              'hover:bg-gray-50 dark:hover:bg-gray-700',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              'transition-all duration-200',
            )}
          >
            <ArrowPathIcon className="size-4" />
            Refresh
          </Button>
        )}
      </div>

      {enableExport && (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleExportAll}
            className={clsx(
              'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium',
              'text-gray-700 dark:text-gray-300',
              'border border-gray-300 dark:border-gray-600',
              'bg-white dark:bg-gray-800',
              'hover:bg-gray-50 dark:hover:bg-gray-700',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              'transition-all duration-200',
            )}
          >
            <ArrowDownTrayIcon className="size-4" />
            Export All
          </Button>
          <Button
            onClick={handleExportPage}
            disabled={pageRows.length === 0}
            className={clsx(
              'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium',
              'text-gray-700 dark:text-gray-300',
              'border border-gray-300 dark:border-gray-600',
              'bg-white dark:bg-gray-800',
              'hover:bg-gray-50 dark:hover:bg-gray-700',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-all duration-200',
            )}
          >
            <ArrowDownTrayIcon className="size-4" />
            Export Page
          </Button>
          {hasSelection && (
            <Button
              onClick={handleExportSelected}
              className={clsx(
                'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium',
                'text-gray-700 dark:text-gray-300',
                'border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-800',
                'hover:bg-gray-50 dark:hover:bg-gray-700',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                'transition-all duration-200',
              )}
            >
              <ArrowDownTrayIcon className="size-4" />
              Export Selected ({selectedRows.length})
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
