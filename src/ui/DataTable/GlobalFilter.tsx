import React from 'react'
import { type Table as TanStackTable } from '@tanstack/react-table'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { useDebounce } from '../../utils/useDebounce'

export interface GlobalFilterProps<TData> {
  table: TanStackTable<TData>
  globalFilterValue: string
  setGlobalFilterValue: (value: string) => void
  placeholder?: string
  density?: 'compact' | 'normal' | 'comfortable'
}

export function GlobalFilter<TData>({
  table,
  globalFilterValue,
  setGlobalFilterValue,
  placeholder = 'Search all columns...',
  density = 'normal',
}: GlobalFilterProps<TData>) {
  const [value, setValue] = React.useState<string>(globalFilterValue)
  const debouncedValue = useDebounce(value, 300)

  // Sync with global filter value
  React.useEffect(() => {
    setGlobalFilterValue(debouncedValue)
  }, [debouncedValue, setGlobalFilterValue])

  React.useEffect(() => {
    setValue(globalFilterValue)
  }, [globalFilterValue])

  const handleClear = () => {
    setValue('')
    setGlobalFilterValue('')
  }

  const densityClasses = {
    compact: 'px-2 py-1 text-xs',
    normal: 'px-3 py-2 text-sm',
    comfortable: 'px-4 py-2 text-base',
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <MagnifyingGlassIcon className="size-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`${placeholder} (${table.getRowCount()} rows)`}
        className={clsx(
          'block w-full pl-10 pr-10',
          'border border-gray-300 dark:border-gray-600 rounded-lg',
          'bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-white',
          'placeholder-gray-400 dark:placeholder-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
          'transition-all duration-200',
          densityClasses[density],
        )}
      />
      {value && (
        <button
          onClick={handleClear}
          className={clsx(
            'absolute inset-y-0 right-0 flex items-center pr-3',
            'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
            'transition-colors',
          )}
        >
          <XMarkIcon className="size-4" />
        </button>
      )}
    </div>
  )
}
