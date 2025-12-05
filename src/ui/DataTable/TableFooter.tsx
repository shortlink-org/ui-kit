import React from 'react'
import { flexRender, type Table as TanStackTable } from '@tanstack/react-table'
import { clsx } from 'clsx'

export interface TableFooterProps<TData> {
  table: TanStackTable<TData>
  enableRowSelection?: boolean
  enableColumnResizing?: boolean
  density?: 'compact' | 'normal' | 'comfortable'
}

export function TableFooter<TData>({ 
  table, 
  enableRowSelection = false,
  enableColumnResizing = false,
  density = 'normal' 
}: TableFooterProps<TData>) {
  const densityClasses = {
    compact: { cell: 'px-2 py-1 text-xs' },
    normal: { cell: 'px-4 py-2 text-sm' },
    comfortable: { cell: 'px-6 py-3 text-base' },
  }

  const footerGroups = table.getFooterGroups()
  if (footerGroups.length === 0 || footerGroups[0].headers.every(h => !h.column.columnDef.footer)) {
    return null
  }

  return (
    <tfoot className="bg-gray-50 dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600">
      {footerGroups.map((footerGroup) => (
        <tr key={footerGroup.id}>
          {enableRowSelection && (
            <td className={clsx(densityClasses[density].cell, 'w-12')} />
          )}
          {footerGroup.headers.map((header) => {
            const meta = header.column.columnDef.meta
            const footerClassName = meta?.headerClassName || meta?.className
            const isPinned = enableColumnResizing && header.column.getIsPinned()

            return (
              <td
                key={header.id}
                className={clsx(
                  densityClasses[density].cell,
                  'font-semibold text-gray-700 dark:text-gray-300',
                  isPinned && 'sticky bg-gray-50 dark:bg-gray-800 z-20',
                  footerClassName
                )}
                style={{
                  width: enableColumnResizing ? header.getSize() : undefined,
                  left: isPinned === 'left' ? `${header.getStart('left')}px` : undefined,
                  right: isPinned === 'right' ? `${header.getStart('right')}px` : undefined,
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.footer, header.getContext())}
              </td>
            )
          })}
        </tr>
      ))}
    </tfoot>
  )
}

