import clsx from 'clsx'
import SearchForm from '../../../ui/SearchForm/SearchForm'

interface HeaderSearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  defaultQuery?: string
  className?: string
  formClassName?: string
}

export function HeaderSearch({
  placeholder,
  onSearch,
  defaultQuery,
  className,
  formClassName,
}: HeaderSearchProps) {
  return (
    <div className={clsx('mr-1 hidden md:block', className)}>
      <div className="w-72">
        <SearchForm
          placeholder={placeholder || 'Search or jump…'}
          onSearch={onSearch}
          defaultValue={defaultQuery}
          className={clsx(
            'my-1 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] shadow-none [&_input]:text-[var(--color-foreground)] [&_input]:placeholder:text-[var(--color-muted-foreground)]',
            formClassName,
          )}
          size="sm"
        />
      </div>
    </div>
  )
}
