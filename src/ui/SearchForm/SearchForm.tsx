import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material'
import clsx from 'clsx'

export interface SearchFormProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
  disabled?: boolean
  debounceDelay?: number
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

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (onSearch) onSearch(value.trim())
      }, debounceDelay),
    [debounce, debounceDelay, onSearch],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (onSearch) onSearch(query.trim())
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
    inputRef.current?.focus()
    if (onSearch) onSearch('')
  }, [onSearch])

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
      className={clsx(
        'relative flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-800 overflow-hidden',
        'focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500',
        className
      )}
    >
      <SearchIcon className="ml-3 text-gray-400 h-5 w-5" />

      <input
        id="search-input"
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className="flex-1 bg-transparent py-2 pl-2 pr-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
      />

      {query && !disabled && (
        <button
          type="button"
          onClick={clearQuery}
          aria-label="Clear search"
          className="mx-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}

      <button
        type="submit"
        disabled={disabled || !query.trim()}
        className={clsx(
          'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300',
          disabled || !query.trim()
            ? 'cursor-not-allowed bg-gray-200 text-gray-500'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        )}
      >
        <SearchIcon className="h-4 w-4" />
        Search
      </button>
    </form>
  )
}

export default SearchForm
