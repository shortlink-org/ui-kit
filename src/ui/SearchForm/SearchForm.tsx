import React, { useCallback, useEffect, useId, useMemo, useRef } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

import { useControllableState } from '../../utils/useControllableState'

export type SearchFormSize = 'sm' | 'md'

export interface SearchFormProps {
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Called whenever the input value changes */
  onValueChange?: (value: string) => void
  /** Called when a search is triggered (submit or debounce) */
  onSearch?: (value: string) => void
  /** Visible placeholder text */
  placeholder?: string
  /** Accessible label (will be visually hidden) */
  label?: string
  /** Optional className for the root form */
  className?: string
  /** Disable the form */
  disabled?: boolean
  /** Autofocus the input */
  autoFocus?: boolean
  /** Optional debounce (ms). When provided, onSearch fires after inactivity */
  debounceMs?: number
  /** Controlled loading state for async searches */
  loading?: boolean
  /** Visual size */
  size?: SearchFormSize
  /** Whether the form should stretch to full width (default: false) */
  fullWidth?: boolean
}

const sizeTokens: Record<SearchFormSize, string> = {
  sm: 'text-sm py-2',
  md: 'text-base py-2.5',
}

const SearchForm: React.FC<SearchFormProps> = ({
  value: valueProp,
  defaultValue = '',
  onValueChange,
  onSearch,
  placeholder = 'Search…',
  label = 'Search',
  className,
  disabled = false,
  autoFocus = false,
  debounceMs,
  loading = false,
  size = 'md',
  fullWidth = false,
}) => {
  const [value, setValue] = useControllableState<string>({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const trimmedValue = useMemo(() => value?.trim() ?? '', [value])

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!onSearch || !trimmedValue) return
      onSearch(trimmedValue)
    },
    [onSearch, trimmedValue],
  )

  const handleClear = useCallback(() => {
    if (disabled) return
    setValue('')
    onSearch?.('')
    inputRef.current?.focus()
  }, [disabled, onSearch, setValue])

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    [setValue],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape' && value) {
        event.preventDefault()
        handleClear()
      }
    },
    [handleClear, value],
  )

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!onSearch || debounceMs == null) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      if (!trimmedValue) {
        return
      }
    }

    const timer = window.setTimeout(() => {
      onSearch(trimmedValue)
    }, debounceMs)

    return () => window.clearTimeout(timer)
  }, [debounceMs, onSearch, trimmedValue])

  return (
    <form
      role="search"
      aria-disabled={disabled}
      onSubmit={handleSubmit}
      className={clsx(
        'flex items-center gap-2 self-center rounded-2xl border border-gray-300 bg-white px-3 py-2 shadow-sm transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-900 dark:focus-within:border-indigo-400 dark:focus-within:ring-indigo-400/20',
        fullWidth ? 'w-full' : 'w-auto',
        disabled && 'opacity-60 contrast-75 pointer-events-none',
        className,
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        {label || placeholder}
      </label>
      <div className="flex flex-1 items-center gap-2">
        <MagnifyingGlassIcon
          className={clsx('h-5 w-5 text-gray-400 dark:text-gray-500', loading && 'animate-spin')}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete="off"
          className={clsx(
            'flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-50 dark:placeholder:text-gray-500',
            sizeTokens[size],
          )}
        />
        {!!value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 dark:focus-visible:ring-indigo-400"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchForm
