import {
  flexRender,
  type Row,
  type Table as TanStackTable,
} from '@tanstack/react-table'
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
  row,
  onRowClick,
  enableRowSelection,
  enableExpanding = false,
  enableColumnResizing = false,
  density = 'normal',
  index,
  rowClassName,
}: TableRowProps<TData>) {
  const isSelected = row.getIsSelected()
  const isExpanded = row.getIsExpanded()
  const canExpand = enableExpanding && row.getCanExpand()
  const isGrouped = row.getIsGrouped()
  const isPinned = enableColumnResizing ? row.getIsPinned() : false

  const densityClasses = {
    compact: { cell: 'px-3 py-2 text-xs', row: 'h-9', checkbox: 'h-3 w-3' },
    normal: { cell: 'px-4 py-3 text-sm', row: 'h-11', checkbox: 'h-4 w-4' },
    comfortable: {
      cell: 'px-6 py-4 text-base',
      row: 'h-14',
      checkbox: 'h-5 w-5',
    },
  }

  return (
    <tr
      className={clsx(
        'group transition-all duration-150',
        densityClasses[density].row,
        index !== undefined && index % 2 === 0
          ? 'bg-transparent'
          : 'bg-[color-mix(in_srgb,var(--color-surface)_98%,var(--color-muted)_2%)]',
        'hover:bg-[color-mix(in_srgb,var(--table-row-hover)_96%,var(--color-background))]',
        onRowClick && 'cursor-pointer',
        isSelected &&
          'bg-[color-mix(in_srgb,var(--table-row-selected)_92%,var(--color-background))] shadow-[inset_2px_0_0_var(--table-row-selected-border)]',
        isGrouped &&
          'bg-[color-mix(in_srgb,var(--color-muted)_94%,var(--color-background))] font-semibold',
        isPinned && 'sticky z-10 bg-[var(--color-surface)]',
        rowClassName,
      )}
      onClick={() => onRowClick?.(row.original)}
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
              densityClasses[density].checkbox,
            )}
          />
        </td>
      )}
      {canExpand && (
        <td className={clsx(densityClasses[density].cell, 'w-8')}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              row.toggleExpanded()
            }}
            className="cursor-pointer rounded-md p-1 text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
          >
            <ChevronRightIcon
              className={clsx(
                'h-4 w-4 transition-transform',
                isExpanded && 'rotate-90',
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
              'border-b border-[var(--table-border)] text-sm whitespace-nowrap align-middle text-[var(--color-foreground)]',
              'transition-colors duration-150',
              cellIsPinned && 'sticky z-10 bg-[var(--color-surface)]',
              cellClassName,
            )}
            style={{
              width: enableColumnResizing ? cell.column.getSize() : undefined,
              left:
                cellIsPinned === 'left'
                  ? `${(cell.column as { getStart: (side: 'left' | 'right') => number }).getStart('left')}px`
                  : undefined,
              right:
                cellIsPinned === 'right'
                  ? `${(cell.column as { getStart: (side: 'left' | 'right') => number }).getStart('right')}px`
                  : undefined,
            }}
          >
            {isGrouped ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    row.toggleExpanded()
                  }}
                  className="rounded-md p-1 text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                >
                  <ChevronRightIcon
                    className={clsx(
                      'h-4 w-4 transition-transform',
                      isExpanded && 'rotate-90',
                    )}
                  />
                </button>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                <span className="rounded-md bg-[var(--color-muted)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-muted-foreground)]">
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
