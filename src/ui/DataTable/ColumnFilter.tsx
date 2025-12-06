import { type Column } from '@tanstack/react-table'
import React, { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { useDebounce } from '../../utils/useDebounce'

export interface ColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  debounceMs?: number
  density?: 'compact' | 'normal' | 'comfortable'
}

export function ColumnFilter<TData, TValue>({ column, debounceMs = 300, density = 'normal' }: ColumnFilterProps<TData, TValue>) {
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
    compact: 'px-2 py-1 text-xs',
    normal: 'px-2 py-1 text-xs',
    comfortable: 'px-3 py-1.5 text-sm',
  }

  return (
    <input
      type="text"
      value={filterValue}
      onChange={(e) => handleFilterChange(e.target.value)}
      placeholder={`Filter ${typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}...`}
      className={clsx(
        'w-full rounded-md border-gray-300 dark:border-gray-600',
        'shadow-sm focus:border-indigo-500 focus:ring-indigo-500',
        'dark:bg-gray-700 dark:text-white',
        'transition-all duration-200',
        'focus:ring-2 focus:ring-offset-1',
        densityClasses[density]
      )}
    />
  )
}

