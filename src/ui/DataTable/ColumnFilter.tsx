import { type Column } from '@tanstack/react-table'
import React, { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { useDebounce } from '../../utils/useDebounce'

export interface ColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  debounceMs?: number
  density?: 'compact' | 'normal' | 'comfortable'
}

export function ColumnFilter<TData, TValue>({
  column,
  debounceMs = 300,
  density = 'normal',
}: ColumnFilterProps<TData, TValue>) {
  // Track column ID to detect changes
  const columnIdRef = React.useRef(column.id)

  // Initialize state with current column value
  const [filterValue, setFilterValue] = useState<string>(() => {
    const initialValue = column.getFilterValue() as string | undefined
    return initialValue ?? ''
  })

  const debouncedValue = useDebounce(filterValue, debounceMs)

  // Sync with column filter value when column changes externally
  // Use queueMicrotask to avoid synchronous setState in effect
  React.useEffect(() => {
    if (column.id !== columnIdRef.current) {
      columnIdRef.current = column.id
      const newValue = column.getFilterValue() as string | undefined
      queueMicrotask(() => {
        setFilterValue(newValue ?? '')
      })
    }
  }, [column])

  // Apply debounced value to column filter
  useEffect(() => {
    column.setFilterValue(debouncedValue || undefined)
  }, [debouncedValue, column])

  const handleFilterChange = (value: string) => {
    setFilterValue(value)
  }

  const densityClasses = {
    compact: 'px-3 py-1.5 text-xs',
    normal: 'px-3 py-2 text-xs',
    comfortable: 'px-4 py-2.5 text-sm',
  }

  return (
    <input
      type="text"
      value={filterValue}
      onChange={(e) => handleFilterChange(e.target.value)}
      placeholder={`Filter ${typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}...`}
      className={clsx(
        'w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)]',
        'placeholder:text-[var(--color-muted-foreground)] shadow-none',
        'focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/14',
        'transition-all duration-200',
        densityClasses[density],
      )}
    />
  )
}
