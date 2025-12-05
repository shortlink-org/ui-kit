import React, { useRef, useEffect } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { type Table as TanStackTable } from '@tanstack/react-table'
import { TableRow } from './TableRow'
import { EmptyState } from './EmptyState'
import { Loader } from './Loader'

export interface VirtualizedTableBodyProps<TData> {
  table: TanStackTable<TData>
  onRowClick?: (row: TData) => void
  enableRowSelection?: boolean
  enableExpanding?: boolean
  enableColumnResizing?: boolean
  density?: 'compact' | 'normal' | 'comfortable'
  loading?: boolean
  emptyMessage?: string
  columnCount: number
  estimateSize?: number
  scrollElementRef?: React.RefObject<HTMLElement>
  rowClassName?: string
}

export function VirtualizedTableBody<TData>({
  table,
  onRowClick,
  enableRowSelection = false,
  enableExpanding = false,
  enableColumnResizing = false,
  density = 'normal',
  loading = false,
  emptyMessage,
  columnCount,
  estimateSize = 50,
  scrollElementRef,
  rowClassName,
}: VirtualizedTableBodyProps<TData>) {
  const rows = table.getRowModel().rows

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollElementRef?.current || null,
    estimateSize: () => estimateSize,
    overscan: 10,
  })

  if (loading) {
    return (
      <tr>
        <td colSpan={columnCount} className="p-0">
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 border-t border-[var(--table-border)]">
            <Loader />
          </div>
        </td>
      </tr>
    )
  }

  if (rows.length === 0) {
    return (
      <tr>
        <td colSpan={columnCount} className="p-0">
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 border-t border-[var(--table-border)]">
            <EmptyState message={emptyMessage} />
          </div>
        </td>
      </tr>
    )
  }

  const virtualRows = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize()
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start ?? 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end ?? 0)
      : 0

  return (
    <>
      {paddingTop > 0 && (
        <tr>
          <td colSpan={columnCount} style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {virtualRows.map((virtualRow) => {
        const row = rows[virtualRow.index]
        return (
          <TableRow
            key={row.id}
            table={table}
            row={row}
            onRowClick={onRowClick}
            enableRowSelection={enableRowSelection}
            enableExpanding={enableExpanding}
            enableColumnResizing={enableColumnResizing}
            density={density}
            index={virtualRow.index}
            rowClassName={rowClassName}
          />
        )
      })}
      {paddingBottom > 0 && (
        <tr>
          <td colSpan={columnCount} style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </>
  )
}

