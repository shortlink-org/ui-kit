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
    compact: { cell: 'px-3 py-2', checkbox: 'h-3 w-3' },
    normal: { cell: 'px-4 py-3', checkbox: 'h-4 w-4' },
    comfortable: { cell: 'px-6 py-4', checkbox: 'h-5 w-5' },
  }

  return (
    <thead
      className={clsx(
        'sticky top-0 z-10',
        'bg-[color-mix(in_srgb,var(--table-header-bg)_96%,white)]',
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
                    'text-left rtl:text-right align-middle',
                    'text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--table-header-text)]',
                    canSort && 'cursor-pointer select-none',
                    'border-b border-[var(--table-border)] transition-colors duration-150',
                    isPinned &&
                      'sticky z-20 bg-[color-mix(in_srgb,var(--table-header-bg)_98%,white)]',
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
                        className="rounded-md p-1 text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
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
                        className="rounded-md border border-[var(--color-border)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                        title="Group by this column"
                      >
                        {isGrouped ? 'Ungroup' : 'Group'}
                      </button>
                    )}
                    {canSort ? (
                      <button className="flex w-full items-center justify-between gap-x-3 rounded-md px-1 py-1 text-left transition-colors hover:bg-[var(--color-muted)]/60 focus:outline-none">
                        <span className="truncate">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </span>
                        <span className="inline-flex size-4 items-center justify-center text-[var(--color-muted-foreground)]">
                          {sortDirection === 'asc' ? (
                            <ChevronUpIcon className="h-3.5 w-3.5 text-[var(--color-foreground)]" />
                          ) : sortDirection === 'desc' ? (
                            <ChevronDownIcon className="h-3.5 w-3.5 text-[var(--color-foreground)]" />
                          ) : (
                            <ChevronDownIcon className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </span>
                      </button>
                    ) : (
                      <span className="px-2 py-1.5">
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
                        'bg-transparent hover:bg-[var(--color-border)]',
                        'transition-colors',
                        header.column.getIsResizing() && 'bg-slate-400/80',
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
            <tr className="border-t border-[var(--table-border)] bg-[color-mix(in_srgb,var(--table-header-bg)_99%,white)]">
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
