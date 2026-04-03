import React from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { clsx } from 'clsx'
import { useDataTable } from './useDataTable'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'
import { TableFooter } from './TableFooter'
import { VirtualizedTableBody } from './VirtualizedTableBody'
import { Pagination } from '../Pagination/Pagination'
import { ColumnVisibility } from './ColumnVisibility'
import { GlobalFilter } from './GlobalFilter'
import { Toolbar } from './Toolbar'
import { EmptyState } from './EmptyState'
import { Loader } from './Loader'
import { createDataTableColumnHelper } from './columnConverter'

export type TableDensity = 'compact' | 'normal' | 'comfortable'

export interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  sorting?: boolean
  pagination?: boolean
  filters?: boolean
  globalFilter?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  density?: TableDensity
  onRowClick?: (row: TData) => void
  loading?: boolean
  emptyMessage?: string
  enableColumnVisibility?: boolean
  enableRowSelection?: boolean
  enableExport?: boolean
  enableCreate?: boolean
  enableBulkDelete?: boolean
  enableRefresh?: boolean
  onCreate?: () => void
  onBulkDelete?: (rows: TData[]) => void
  onRefresh?: () => void
  className?: string
  renderRowActions?: (row: TData) => React.ReactNode
  actionsPosition?: 'start' | 'end'
  wrapperClassName?: string
  tableClassName?: string
  headerClassName?: string
  bodyClassName?: string
  rowClassName?: string
  mobilePageSizeControl?: boolean
  enableColumnResizing?: boolean
  enableColumnPinning?: boolean
  enableColumnOrdering?: boolean
  enableGrouping?: boolean
  enableExpanding?: boolean
  columnResizeMode?: 'onChange' | 'onEnd'
  enableVirtualization?: boolean
  virtualizationEstimateSize?: number
}

export function DataTable<TData extends Record<string, unknown>>({
  data,
  columns,
  sorting = true,
  pagination = true,
  filters = false,
  globalFilter = false,
  pageSize = 10,
  pageSizeOptions,
  density = 'normal',
  onRowClick,
  loading = false,
  emptyMessage,
  enableColumnVisibility = true,
  enableRowSelection = false,
  enableExport = false,
  enableCreate = false,
  enableBulkDelete = false,
  enableRefresh = false,
  onCreate,
  onBulkDelete,
  onRefresh,
  className,
  renderRowActions,
  actionsPosition = 'end',
  wrapperClassName,
  tableClassName,
  headerClassName,
  bodyClassName,
  rowClassName,
  mobilePageSizeControl = true,
  enableColumnResizing = false,
  enableColumnPinning = false,
  enableColumnOrdering = false,
  enableGrouping = false,
  enableExpanding = false,
  columnResizeMode = 'onChange',
  enableVirtualization = false,
  virtualizationEstimateSize = 50,
}: DataTableProps<TData>) {
  // Add actions column if renderRowActions is provided
  const columnsWithActions = React.useMemo(() => {
    if (!renderRowActions) return columns

    const columnHelper = createDataTableColumnHelper<TData>()
    const actionsColumn = columnHelper.display({
      id: '__actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }: { row: { original: TData } }) =>
        renderRowActions(row.original),
      enableSorting: false,
      enableHiding: false,
      size: 50,
      meta: {
        className: 'text-right',
      },
    })

    return actionsPosition === 'start'
      ? [actionsColumn, ...columns]
      : [...columns, actionsColumn]
  }, [columns, renderRowActions, actionsPosition])

  const { table, globalFilterState, setGlobalFilterState } = useDataTable({
    data,
    columns: columnsWithActions,
    sorting,
    pagination,
    filters,
    globalFilter,
    pageSize,
    enableColumnVisibility,
    enableRowSelection,
    enableColumnResizing,
    enableColumnPinning,
    enableColumnOrdering,
    enableGrouping,
    enableExpanding,
    columnResizeMode,
  })

  const rows = table.getRowModel().rows
  const columnCount =
    columnsWithActions.length +
    (enableRowSelection ? 1 : 0) +
    (enableExpanding ? 1 : 0)

  // Ref for virtualization scroll container
  const scrollElementRef = React.useRef<HTMLDivElement>(null)

  const content = (
    <div className="space-y-5 overflow-visible">
      {/* Top Toolbar */}
      {(enableCreate || enableBulkDelete || enableRefresh || enableExport) && (
        <div>
          <Toolbar
            table={table}
            onCreate={onCreate}
            onBulkDelete={onBulkDelete}
            onRefresh={onRefresh}
            enableExport={enableExport}
            enableCreate={enableCreate}
            enableBulkDelete={enableBulkDelete}
            enableRefresh={enableRefresh}
          />
        </div>
      )}

      {/* Global Filter */}
      {globalFilter && (
        <div>
          <GlobalFilter
            table={table}
            globalFilterValue={globalFilterState}
            setGlobalFilterValue={setGlobalFilterState}
            density={density}
          />
        </div>
      )}

      {/* Column Visibility Toolbar */}
      {enableColumnVisibility && (
        <div className="relative z-30 flex items-center justify-end gap-2">
          <ColumnVisibility table={table} />
        </div>
      )}

      {/* Table Container */}
      <div className="relative z-0">
        <div className="overflow-hidden rounded-[1.15rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_28px_-18px_rgba(0,0,0,0.45)]">
          <div className="border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_96%,var(--color-muted)_4%)] px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                  Data grid
                </p>
                <p className="mt-1 text-sm text-[var(--color-foreground)]">
                  {loading
                    ? 'Loading rows'
                    : rows.length === 0
                      ? 'No matching records'
                      : `${rows.length} visible rows`}
                </p>
              </div>
              <span className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted-foreground)]">
                {density}
              </span>
            </div>
          </div>
          <div className="overflow-x-auto bg-[var(--color-surface)]">
            <div className="min-w-full align-middle">
              {enableVirtualization ? (
                <div
                  ref={scrollElementRef}
                  className="max-h-[600px] overflow-auto"
                >
                  <table
                    className={clsx(
                      'min-w-full border-separate border-spacing-0',
                      tableClassName,
                    )}
                  >
                    <TableHeader
                      table={table}
                      showFilters={filters}
                      enableRowSelection={enableRowSelection}
                      enableColumnResizing={enableColumnResizing}
                      enableGrouping={enableGrouping}
                      enableExpanding={enableExpanding}
                      density={density}
                      headerClassName={headerClassName}
                    />
                    <tbody
                      className={clsx(
                        'bg-transparent',
                        bodyClassName,
                      )}
                    >
                      <VirtualizedTableBody
                        table={table}
                        onRowClick={onRowClick}
                        enableRowSelection={enableRowSelection}
                        enableExpanding={enableExpanding}
                        enableColumnResizing={enableColumnResizing}
                        density={density}
                        loading={loading}
                        emptyMessage={emptyMessage}
                        columnCount={columnCount}
                        estimateSize={virtualizationEstimateSize}
                        scrollElementRef={scrollElementRef}
                        rowClassName={rowClassName}
                      />
                    </tbody>
                    <TableFooter
                      table={table}
                      enableRowSelection={enableRowSelection}
                      enableColumnResizing={enableColumnResizing}
                      density={density}
                    />
                  </table>
                </div>
              ) : (
                <table
                  className={clsx(
                    'min-w-full border-separate border-spacing-0',
                    tableClassName,
                  )}
                >
                  <TableHeader
                    table={table}
                    showFilters={filters}
                    enableRowSelection={enableRowSelection}
                    enableColumnResizing={enableColumnResizing}
                    enableGrouping={enableGrouping}
                    enableExpanding={enableExpanding}
                    density={density}
                    headerClassName={headerClassName}
                  />
                  <tbody
                    className={clsx(
                      'bg-transparent',
                      bodyClassName,
                    )}
                  >
                    {loading ? (
                      <tr>
                        <td colSpan={columnCount} className="p-0">
                          <div className="border-t border-[var(--color-border)] p-8 text-center text-[var(--color-muted-foreground)]">
                            <Loader />
                          </div>
                        </td>
                      </tr>
                    ) : rows.length === 0 ? (
                      <tr>
                        <td colSpan={columnCount} className="p-0">
                          <div className="border-t border-[var(--color-border)] p-8 text-center text-[var(--color-muted-foreground)]">
                            <EmptyState message={emptyMessage} />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      rows.map((row, index) => (
                        <TableRow
                          key={row.id}
                          table={table}
                          row={row}
                          onRowClick={onRowClick}
                          enableRowSelection={enableRowSelection}
                          enableExpanding={enableExpanding}
                          enableColumnResizing={enableColumnResizing}
                          density={density}
                          index={index}
                          rowClassName={rowClassName}
                        />
                      ))
                    )}
                  </tbody>
                  <TableFooter
                    table={table}
                    enableRowSelection={enableRowSelection}
                    enableColumnResizing={enableColumnResizing}
                    density={density}
                  />
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <Pagination
          table={table}
          pageSizeOptions={pageSizeOptions}
          mobilePageSizeControl={mobilePageSizeControl}
        />
      )}
    </div>
  )

  if (wrapperClassName !== undefined) {
    return <div className={clsx(wrapperClassName, className)}>{content}</div>
  }

  return <div className={className}>{content}</div>
}
