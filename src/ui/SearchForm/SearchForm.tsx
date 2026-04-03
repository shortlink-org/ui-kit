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

/** Vertical rhythm lives on the input only — avoids double padding on the form shell */
const sizeTokens: Record<SearchFormSize, string> = {
  sm: 'min-h-10 py-2 text-sm leading-5',
  md: 'min-h-11 py-2.5 text-base leading-6',
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
        'flex items-center gap-2 self-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)] transition-[box-shadow,border-color] duration-200',
        'focus-within:border-[var(--color-primary-500)] focus-within:shadow-[0_8px_28px_-16px_rgba(15,23,42,0.14)] focus-within:ring-2 focus-within:ring-[color-mix(in_srgb,var(--color-primary-500)_22%,transparent)]',
        'dark:shadow-[0_8px_28px_-18px_rgba(0,0,0,0.45)]',
        fullWidth ? 'w-full' : 'w-auto',
        disabled && 'pointer-events-none opacity-60 contrast-75',
        className,
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        {label || placeholder}
      </label>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <MagnifyingGlassIcon
          className={clsx(
            'h-5 w-5 shrink-0 text-[var(--color-muted-foreground)]',
            loading && 'animate-spin',
          )}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          enterKeyHint="search"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete="off"
          className={clsx(
            'min-w-0 flex-1 bg-transparent text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none',
            '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none',
            sizeTokens[size],
          )}
        />
        {!!value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="cursor-pointer rounded-full p-1 text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchForm
