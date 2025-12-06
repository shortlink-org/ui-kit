import React from 'react'
import { flexRender, type Table as TanStackTable } from '@tanstack/react-table'
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { ColumnFilter } from './ColumnFilter'

export interface TableHeaderProps<TData> {
  table: TanStackTable<TData>
  showFilters?: boolean
  enableRowSelection?: boolean
  enableColumnResizing?: boolean
  enableGrouping?: boolean
  enableExpanding?: boolean
  density?: 'compact' | 'normal' | 'comfortable'
  headerClassName?: string
}

export function TableHeader<TData>({
  table,
  showFilters = false,
  enableRowSelection = false,
  enableColumnResizing = false,
  enableGrouping = false,
  enableExpanding = false,
  density = 'normal',
  headerClassName,
}: TableHeaderProps<TData>) {
  const densityClasses = {
    compact: { cell: 'px-2 py-1', checkbox: 'h-3 w-3' },
    normal: { cell: 'px-4 py-2', checkbox: 'h-4 w-4' },
    comfortable: { cell: 'px-6 py-3', checkbox: 'h-5 w-5' },
  }

  return (
    <thead
      className={clsx(
        'sticky top-0 z-10',
        'bg-gray-50 dark:bg-gray-800',
        headerClassName,
      )}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <React.Fragment key={headerGroup.id}>
          <tr>
            {enableRowSelection && (
              <th className={clsx(densityClasses[density].cell, 'w-12')}>
                <input
                  type="checkbox"
                  checked={table.getIsAllRowsSelected()}
                  ref={(el) => {
                    if (el) {
                      el.indeterminate =
                        table.getIsSomeRowsSelected() &&
                        !table.getIsAllRowsSelected()
                    }
                  }}
                  onChange={(e) =>
                    table.toggleAllRowsSelected(e.target.checked)
                  }
                  className={clsx(
                    'rounded border-[var(--color-border)] text-[var(--color-primary-600)]',
                    'focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2',
                    'transition-all cursor-pointer',
                    densityClasses[density].checkbox,
                  )}
                />
              </th>
            )}
            {headerGroup.headers.map((header) => {
              const canSort = header.column.getCanSort()
              const sortDirection = header.column.getIsSorted()
              const isGrouped = enableGrouping && header.column.getIsGrouped()
              const canGroup = enableGrouping && header.column.getCanGroup()
              const meta = header.column.columnDef.meta
              const headerClassName = meta?.headerClassName || meta?.className
              const isPinned =
                enableColumnResizing && header.column.getIsPinned()

              return (
                <th
                  scope="col"
                  key={header.id}
                  className={clsx(
                    densityClasses[density].cell,
                    'text-sm font-normal text-left rtl:text-right',
                    'text-gray-500 dark:text-gray-400',
                    canSort && 'cursor-pointer select-none',
                    'transition-colors duration-150',
                    isPinned && 'sticky bg-gray-50 dark:bg-gray-800 z-20',
                    enableColumnResizing && 'relative',
                    headerClassName,
                  )}
                  style={{
                    width: enableColumnResizing
                      ? header.getSize()
                      : header.getSize() !== 150
                        ? header.getSize()
                        : undefined,
                    minWidth: enableColumnResizing
                      ? header.getSize()
                      : undefined,
                    maxWidth: enableColumnResizing
                      ? header.getSize()
                      : undefined,
                    left:
                      isPinned === 'left'
                        ? `${(header as { getStart: (side: 'left' | 'right') => number }).getStart('left')}px`
                        : undefined,
                    right:
                      isPinned === 'right'
                        ? `${(header as { getStart: (side: 'left' | 'right') => number }).getStart('right')}px`
                        : undefined,
                  }}
                  onClick={
                    canSort
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  <div className="flex items-center gap-2">
                    {enableExpanding && header.subHeaders.length > 0 && (
                      <button
                        onClick={() => header.column.toggleGrouping()}
                        className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <ChevronRightIcon
                          className={clsx(
                            'h-4 w-4 transition-transform',
                            header.column.getIsGrouped() && 'rotate-90',
                          )}
                        />
                      </button>
                    )}
                    {canGroup && (
                      <button
                        onClick={header.column.getToggleGroupingHandler()}
                        className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs"
                        title="Group by this column"
                      >
                        {isGrouped ? 'Ungroup' : 'Group'}
                      </button>
                    )}
                    {canSort ? (
                      <button className="flex items-center gap-x-3 focus:outline-none w-full text-left">
                        <span>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </span>
                        {sortDirection === 'asc' ? (
                          <ChevronUpIcon className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                        ) : sortDirection === 'desc' ? (
                          <ChevronDownIcon className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                        ) : (
                          <svg
                            className="h-3"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.1"
                            />
                            <path
                              d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.1"
                            />
                            <path
                              d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.3"
                            />
                          </svg>
                        )}
                      </button>
                    ) : (
                      <span>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </span>
                    )}
                  </div>
                  {enableColumnResizing && header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={clsx(
                        'absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none select-none',
                        'bg-gray-300 dark:bg-gray-600 hover:bg-indigo-500 dark:hover:bg-indigo-400',
                        'transition-colors',
                        header.column.getIsResizing() &&
                          'bg-indigo-500 dark:bg-indigo-400',
                      )}
                      style={{
                        transform: header.column.getIsResizing()
                          ? `translateX(${table.getState().columnSizingInfo.deltaOffset ?? 0}px)`
                          : undefined,
                      }}
                    />
                  )}
                </th>
              )
            })}
          </tr>
          {showFilters && (
            <tr className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              {enableRowSelection && (
                <th className={clsx(densityClasses[density].cell)} />
              )}
              {headerGroup.headers.map((header) => {
                const canFilter = header.column.getCanFilter()
                const meta = header.column.columnDef.meta
                const filterComponent = meta?.filterComponent

                return (
                  <th
                    key={`${header.id}-filter`}
                    className={clsx(densityClasses[density].cell)}
                  >
                    {canFilter && filterComponent ? (
                      filterComponent({ column: header.column, density })
                    ) : canFilter ? (
                      <ColumnFilter column={header.column} density={density} />
                    ) : null}
                  </th>
                )
              })}
            </tr>
          )}
        </React.Fragment>
      ))}
    </thead>
  )
}
