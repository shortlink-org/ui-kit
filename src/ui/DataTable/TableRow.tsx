import { flexRender, type Row, type Table as TanStackTable } from '@tanstack/react-table'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

export interface TableRowProps<TData> {
  table: TanStackTable<TData>
  row: Row<TData>
  onRowClick?: (row: TData) => void
  enableRowSelection?: boolean
  enableExpanding?: boolean
  enableColumnResizing?: boolean
  density?: 'compact' | 'normal' | 'comfortable'
  index?: number
  rowClassName?: string
}

export function TableRow<TData>({ 
  table, 
  row, 
  onRowClick, 
  enableRowSelection, 
  enableExpanding = false,
  enableColumnResizing = false,
  density = 'normal', 
  index = 0,
  rowClassName
}: TableRowProps<TData>) {
  const isSelected = row.getIsSelected()
  const isExpanded = row.getIsExpanded()
  const canExpand = enableExpanding && row.getCanExpand()
  const isGrouped = row.getIsGrouped()
  const isPinned = enableColumnResizing && row.getIsPinned()

  const densityClasses = {
    compact: { cell: 'px-2 py-1 text-xs', row: 'h-8', checkbox: 'h-3 w-3' },
    normal: { cell: 'px-4 py-2 text-sm', row: 'h-10', checkbox: 'h-4 w-4' },
    comfortable: { cell: 'px-6 py-3 text-base', row: 'h-12', checkbox: 'h-5 w-5' },
  }

  return (
    <tr
      className={clsx(
        'group transition-all duration-150',
        densityClasses[density].row,
        'bg-white dark:bg-gray-900',
        'hover:bg-gray-50 dark:hover:bg-gray-800/50',
        onRowClick && 'cursor-pointer',
        isSelected && 'bg-gray-100 dark:bg-gray-800 border-l-4 border-l-indigo-500',
        isGrouped && 'bg-gray-100 dark:bg-gray-800 font-semibold',
        isPinned && 'sticky bg-white dark:bg-gray-900 z-10',
        rowClassName
      )}
      onClick={() => onRowClick?.(row.original)}
      style={{
        left: isPinned === 'left' ? `${row.getLeft('left')}px` : undefined,
        right: isPinned === 'right' ? `${row.getRight('right')}px` : undefined,
      }}
    >
      {enableRowSelection && (
        <td className={clsx(densityClasses[density].cell, 'w-12')}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation()
              row.toggleSelected(e.target.checked)
            }}
            className={clsx(
              'rounded border-[var(--color-border)] text-[var(--color-primary-600)]',
              'focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2',
              'transition-all cursor-pointer',
              densityClasses[density].checkbox
            )}
          />
        </td>
      )}
      {canExpand && (
        <td className={clsx(densityClasses[density].cell, 'w-8')}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              row.toggleExpanded()
            }}
            className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <ChevronRightIcon 
              className={clsx(
                'h-4 w-4 transition-transform',
                isExpanded && 'rotate-90'
              )} 
            />
          </button>
        </td>
      )}
      {row.getVisibleCells().map((cell) => {
        const meta = cell.column.columnDef.meta
        const cellClassName = meta?.cellClassName || meta?.className
        const cellIsPinned = enableColumnResizing && cell.column.getIsPinned()
        
        return (
          <td
            key={cell.id}
            className={clsx(
              densityClasses[density].cell,
              'text-sm whitespace-nowrap',
              'transition-colors duration-150',
              cellIsPinned && 'sticky bg-white dark:bg-gray-900 z-10',
              cellClassName
            )}
            style={{
              width: enableColumnResizing ? cell.column.getSize() : undefined,
              left: cellIsPinned === 'left' ? `${cell.column.getStart('left')}px` : undefined,
              right: cellIsPinned === 'right' ? `${cell.column.getStart('right')}px` : undefined,
            }}
          >
            {isGrouped ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    row.toggleExpanded()
                  }}
                  className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <ChevronRightIcon 
                    className={clsx(
                      'h-4 w-4 transition-transform',
                      isExpanded && 'rotate-90'
                    )} 
                  />
                </button>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({row.subRows.length})
                </span>
              </div>
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </td>
        )
      })}
    </tr>
  )
}

