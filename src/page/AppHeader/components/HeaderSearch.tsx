import SearchForm from '../../../ui/SearchForm/SearchForm'

interface HeaderSearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  defaultQuery?: string
}

export function HeaderSearch({ placeholder, onSearch, defaultQuery }: HeaderSearchProps) {
  return (
    <div className="hidden md:block mr-2">
      <div className="w-64">
        <SearchForm
          placeholder={placeholder || 'Search…'}
          onSearch={onSearch}
          defaultValue={defaultQuery}
          className="my-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 [&_input]:text-white [&_input]:placeholder:text-white/70"
        />
      </div>
    </div>
  )
}
