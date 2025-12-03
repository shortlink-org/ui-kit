import React, { useState, useCallback, useRef, useEffect, useTransition, useDeferredValue } from 'react'
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material'
import clsx from 'clsx'

export interface SearchFormProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
  disabled?: boolean
  debounceDelay?: number // Deprecated: kept for backward compatibility, but useDeferredValue is used instead
  defaultQuery?: string
}

const SearchForm: React.FC<SearchFormProps> = ({
  placeholder = 'Search…',
  onSearch,
  className = '',
  disabled = false,
  debounceDelay: _debounceDelay = 300, // Not used anymore, kept for backward compatibility
  defaultQuery = '',
}) => {
  const [query, setQuery] = useState(defaultQuery)
  const [isPending, startTransition] = useTransition()
  const deferredQuery = useDeferredValue(query)
  const inputRef = useRef<HTMLInputElement>(null)

  // Trigger search when deferred query changes (React handles the coordination)
  useEffect(() => {
    if (onSearch) {
      onSearch(deferredQuery.trim())
    }
  }, [deferredQuery, onSearch])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (onSearch) {
        startTransition(() => {
          onSearch(query.trim())
        })
      }
    },
    [query, onSearch, startTransition],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setQuery(val)
      // React will automatically defer the search via useDeferredValue
    },
    [],
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
        disabled={disabled || !query.trim() || isPending}
        className={clsx(
          'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300',
          disabled || !query.trim() || isPending
            ? 'cursor-not-allowed bg-gray-200 text-gray-500'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        )}
      >
        <SearchIcon className={clsx('h-4 w-4', isPending && 'animate-spin')} />
        {isPending ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchForm
