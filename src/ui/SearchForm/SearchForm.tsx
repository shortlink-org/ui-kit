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
        'relative flex items-center rounded-lg border border-gray-300 dark:border-gray-600',
        'bg-white dark:bg-gray-800 overflow-hidden',
        'transition-all duration-200 ease-in-out',
        'focus-within:border-blue-500 dark:focus-within:border-blue-400',
        'focus-within:ring-2 focus-within:ring-blue-500/20 dark:focus-within:ring-blue-400/20',
        'focus-within:shadow-sm',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <SearchIcon
        className={clsx(
          'ml-3 h-5 w-5 text-gray-400 dark:text-gray-500',
          'transition-colors duration-200',
          'group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400'
        )}
      />

      <input
        id="search-input"
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className={clsx(
          'flex-1 bg-transparent py-2.5 pl-2 pr-2 text-sm',
          'text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-colors duration-200'
        )}
      />

      {query && !disabled && (
        <button
          type="button"
          onClick={clearQuery}
          aria-label="Clear search"
          className={clsx(
            'mx-2 p-1 rounded-md',
            'text-gray-400 dark:text-gray-500',
            'hover:text-gray-600 dark:hover:text-gray-300',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
            'dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-800',
            'transition-all duration-200 ease-in-out',
            'active:scale-95'
          )}
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}

      <button
        type="submit"
        disabled={disabled || !query.trim() || isPending}
        className={clsx(
          'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium',
          'border-l border-gray-300 dark:border-gray-600',
          'transition-all duration-200 ease-in-out',
          disabled || !query.trim() || isPending
            ? clsx(
                'cursor-not-allowed',
                'bg-gray-100 dark:bg-gray-700',
                'text-gray-400 dark:text-gray-500'
              )
            : clsx(
                'bg-blue-600 dark:bg-blue-500',
                'text-white',
                'hover:bg-blue-700 dark:hover:bg-blue-600',
                'active:bg-blue-800 dark:active:bg-blue-700',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                'dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-800',
                'active:scale-[0.98]'
              )
        )}
      >
        <SearchIcon
          className={clsx(
            'h-4 w-4 transition-transform duration-200',
            isPending && 'animate-spin'
          )}
        />
        <span className="transition-opacity duration-200">
          {isPending ? 'Searching...' : 'Search'}
        </span>
      </button>
    </form>
  )
}

export default SearchForm
