import SearchForm from '../../../ui/SearchForm/SearchForm'

interface HeaderSearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  defaultQuery?: string
}

export function HeaderSearch({
  placeholder,
  onSearch,
  defaultQuery,
}: HeaderSearchProps) {
  return (
    <div className="hidden md:block mr-1">
      <div className="w-72">
        <SearchForm
          placeholder={placeholder || 'Search or jump…'}
          onSearch={onSearch}
          defaultValue={defaultQuery}
          className="my-1 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] shadow-none [&_input]:text-[var(--color-foreground)] [&_input]:placeholder:text-[var(--color-muted-foreground)]"
          size="sm"
        />
      </div>
    </div>
  )
}
