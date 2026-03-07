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
import { FamilyDialog } from '../FamilyDialog/FamilyDialog'

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
    <div className="relative z-30 flex flex-col items-start justify-between gap-3 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_6px_18px_-14px_rgba(15,23,42,0.12)] sm:flex-row sm:items-center">
      <div className="flex flex-wrap items-center gap-2">
        {enableCreate && (
          <Button
            onClick={onCreate}
            className={clsx(
              'inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium',
              'bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
              'transition-colors duration-200 shadow-none',
            )}
          >
            <PlusIcon className="size-4" />
            Create New Item
          </Button>
        )}
        {enableBulkDelete && (
          <>
            {hasSelection ? (
              <FamilyDialog
                trigger={
                  <span className="inline-flex items-center gap-2">
                    <TrashIcon className="size-4" />
                    Delete Selected ({selectedRows.length})
                  </span>
                }
                eyebrow="Bulk operation"
                title={`Delete ${selectedRows.length} item(s)?`}
                description="This action cannot be undone. All selected items will be permanently removed."
                confirmText="Delete All"
                cancelText="Cancel"
                variant="danger"
                onConfirm={handleBulkDelete}
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.2rem] border border-rose-200/70 bg-white/80 p-4 text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-700">
                      Selected
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                      {selectedRows.length}
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] border border-slate-200/80 bg-white/80 p-4 text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Visible on page
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                      {pageRows.length}
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] border border-slate-200/80 bg-slate-950 p-4 text-left text-slate-50">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-200">
                      After action
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Row selection will be cleared after deletion.
                    </p>
                  </div>
                </div>
              </FamilyDialog>
            ) : (
              <Button
                disabled
                className={clsx(
                  'inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium',
                  'bg-red-600 text-white',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                )}
              >
                <TrashIcon className="size-4" />
                Delete Selected (0)
              </Button>
            )}
            {hasPageSelection && (
              <Menu as="div" className="relative z-30">
                <MenuButton
                  className={clsx(
                    'inline-flex cursor-pointer items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm font-medium',
                    'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
                    'transition-colors duration-200',
                  )}
                >
                  Selection Actions
                </MenuButton>
                <MenuItems
                  transition
                  className={clsx(
                    'absolute top-full left-0 z-50 mt-2 w-56 origin-top-left rounded-[0.9rem] border border-[var(--color-border)] p-1.5',
                    'bg-[var(--color-surface)] shadow-[0_10px_24px_-18px_rgba(15,23,42,0.16)]',
                    'focus:outline-none',
                    'transition data-closed:scale-95 data-closed:transform data-closed:opacity-0',
                    'data-enter:duration-100 data-enter:ease-out',
                    'data-leave:duration-75 data-leave:ease-in',
                  )}
                >
                  <MenuItem>
                    <button
                      onClick={() => table.toggleAllPageRowsSelected(true)}
                      className="w-full cursor-pointer rounded-[0.7rem] px-3 py-2 text-left text-sm text-[var(--color-foreground)] data-focus:bg-[var(--color-muted)]"
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
                      className="w-full cursor-pointer rounded-[0.7rem] px-3 py-2 text-left text-sm text-[var(--color-foreground)] data-focus:bg-[var(--color-muted)]"
                    >
                      Invert Selection on Page
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => table.resetRowSelection()}
                      className="w-full cursor-pointer rounded-[0.7rem] px-3 py-2 text-left text-sm text-[var(--color-foreground)] data-focus:bg-[var(--color-muted)]"
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
              'inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium',
              'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
              'transition-colors duration-200',
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
              'inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium',
              'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
              'transition-colors duration-200',
            )}
          >
            <ArrowDownTrayIcon className="size-4" />
            Export All
          </Button>
          <Button
            onClick={handleExportPage}
            disabled={pageRows.length === 0}
            className={clsx(
              'inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium',
              'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-colors duration-200',
            )}
          >
            <ArrowDownTrayIcon className="size-4" />
            Export Page
          </Button>
          {hasSelection && (
            <Button
              onClick={handleExportSelected}
              className={clsx(
                'inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium',
                'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
                'transition-colors duration-200',
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
