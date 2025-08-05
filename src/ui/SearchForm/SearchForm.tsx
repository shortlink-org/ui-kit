import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material'
import clsx from 'clsx'

/**
 * Accessible, debounced search form.
 *
 * – **ARIA‑compliant**: labelled control, `role="search"` wrapper.
 * – **Debounce** via `debounceDelay` prop (default 300 ms) to avoid hammering APIs.
 * – **Clear button** & Escape key for quick reset.
 * – **Variants** & sizing via Tailwind-compatible class names.
 */
export interface SearchFormProps {
  /** Placeholder text shown inside the input. */
  placeholder?: string
  /** Callback fired *after debounce* when a non‑empty query is submitted or typed. */
  onSearch?: (query: string) => void
  /** Extra class names for the root element. */
  className?: string
  /** Disable the whole form. */
  disabled?: boolean
  /** Debounce wait in ms. */
  debounceDelay?: number
  /** Initial value (useful for controlled pages). */
  defaultQuery?: string
}

const SearchForm: React.FC<SearchFormProps> = ({
  placeholder = 'Search…',
  onSearch,
  className = '',
  disabled = false,
  debounceDelay = 300,
  defaultQuery = '',
}) => {
  const [query, setQuery] = useState(defaultQuery)
  const inputRef = useRef<HTMLInputElement>(null)

  // simple debounce util that ensures stable identity between renders
  const debounce = useMemo(
    () =>
      function <F extends (...args: any[]) => void>(fn: F, ms: number) {
        let t: NodeJS.Timeout
        return (...args: Parameters<F>) => {
          clearTimeout(t)
          t = setTimeout(() => fn(...args), ms)
        }
      },
    [],
  )

  // memoised debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (value.trim() && onSearch) onSearch(value.trim())
      }, debounceDelay),
    [debounce, debounceDelay, onSearch],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim() && onSearch) onSearch(query.trim())
    },
    [query, onSearch],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setQuery(val)
      debouncedSearch(val)
    },
    [debouncedSearch],
  )

  const clearQuery = useCallback(() => {
    setQuery('')
    if (inputRef.current) inputRef.current.focus()
    if (onSearch) onSearch('')
  }, [onSearch])

  // Allow the Escape key to clear
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && query && !disabled) clearQuery()
    }
    window.addEventListener('keyup', onKey)
    return () => window.removeEventListener('keyup', onKey)
  }, [query, disabled, clearQuery])

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={clsx('relative', className)}
    >
      {/* Visually hidden label for screen readers */}
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>

      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          id="search-input"
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        {/* Clear button */}
        {query && !disabled && (
          <button
            type="button"
            onClick={clearQuery}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={disabled || !query.trim()}
        className={clsx(
          'mt-2 w-full rounded-md py-2 px-4 transition-colors',
          disabled || !query.trim()
            ? 'cursor-not-allowed bg-gray-300 text-white'
            : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        )}
      >
        Search
      </button>
    </form>
  )
}

export default SearchForm
