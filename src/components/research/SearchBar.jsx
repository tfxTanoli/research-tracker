import { Search, X } from 'lucide-react'
import { cn } from '../../utils/cn'

/** Instant search input with a clear affordance. */
export function SearchBar({ value, onChange, placeholder = 'Search research…', className, id = 'research-search' }) {
  return (
    <div className={cn('relative', className)} role="search">
      <Search
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint"
        aria-hidden="true"
      />

      <label htmlFor={id} className="sr-only">
        Search research
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          'h-9 w-full rounded-md border border-line bg-surface pr-9 pl-9 text-[13.5px] text-ink',
          'transition-colors duration-150 placeholder:text-ink-faint',
          'hover:border-line-strong focus:border-line-strong focus:ring-2 focus:ring-ring-brand focus:outline-none',
          '[&::-webkit-search-cancel-button]:appearance-none',
        )}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-ink-faint transition-colors hover:text-ink"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
