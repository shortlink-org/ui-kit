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
  columns: ColumnDef<TData, any>[]
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
      cell: ({ row }: { row: { original: TData } }) => renderRowActions(row.original),
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
  const columnCount = columnsWithActions.length + (enableRowSelection ? 1 : 0) + (enableExpanding ? 1 : 0)
  
  // Ref for virtualization scroll container
  const scrollElementRef = React.useRef<HTMLDivElement>(null)

  // Density classes - expanded to include text sizes, row heights, and checkbox sizes
  const densityClasses = {
    compact: {
      cell: 'px-2 py-1 text-xs',
      row: 'h-8',
      checkbox: 'h-3 w-3',
    },
    normal: {
      cell: 'px-4 py-2 text-sm',
      row: 'h-10',
      checkbox: 'h-4 w-4',
    },
    comfortable: {
      cell: 'px-6 py-3 text-base',
      row: 'h-12',
      checkbox: 'h-5 w-5',
    },
  }

  const content = (
    <>
      {/* Top Toolbar */}
      {(enableCreate || enableBulkDelete || enableRefresh || enableExport) && (
        <div className="mb-6">
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
        <div className="mb-4">
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
        <div className="flex items-center justify-end gap-2 mb-4">
          <ColumnVisibility table={table} />
        </div>
      )}

      {/* Table Container */}
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg bg-white dark:bg-gray-900">
              {enableVirtualization ? (
                <div ref={scrollElementRef} className="overflow-auto max-h-[600px]">
                  <table className={clsx(
                    'min-w-full divide-y',
                    'divide-gray-200 dark:divide-gray-700',
                    densityClasses[density].cell,
                    tableClassName
                  )}>
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
                    <tbody className={clsx(
                      'bg-white dark:bg-gray-900 divide-y',
                      'divide-gray-200 dark:divide-gray-700',
                      bodyClassName
                    )}>
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
                <table className={clsx(
                  'min-w-full divide-y',
                  'divide-gray-200 dark:divide-gray-700',
                  densityClasses[density].cell,
                  tableClassName
                )}>
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
                  <tbody className={clsx(
                    'bg-white dark:bg-gray-900 divide-y',
                    'divide-gray-200 dark:divide-gray-700',
                    bodyClassName
                  )}>
                    {loading ? (
                      <tr>
                        <td colSpan={columnCount} className="p-0">
                          <div className="p-8 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                            <Loader />
                          </div>
                        </td>
                      </tr>
                    ) : rows.length === 0 ? (
                      <tr>
                        <td colSpan={columnCount} className="p-0">
                          <div className="p-8 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
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
    </>
  )

  if (wrapperClassName !== undefined) {
    return (
      <div className={clsx(wrapperClassName, className)}>
        {content}
      </div>
    )
  }

  return <div className={className}>{content}</div>
}

