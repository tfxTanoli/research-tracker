import { Menu, Plus } from 'lucide-react'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { SearchBar } from '../research/SearchBar'

/**
 * Sticky page header. On phones the title row stays compact and search moves
 * to its own full-width row underneath.
 */
export function Header({
  title,
  subtitle,
  search,
  onSearchChange,
  onAddResearch,
  onOpenNavigation,
  showSearch = true,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas-veil backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center gap-3 py-3">
          <button
            type="button"
            onClick={onOpenNavigation}
            aria-label="Open navigation menu"
            className="-ml-1.5 shrink-0 rounded-lg p-3 text-ink-soft transition-colors hover:bg-surface hover:text-ink lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[17px] font-semibold tracking-tight text-ink sm:text-[19px]">
              {title}
            </h1>
            <p className="mt-0.5 hidden truncate text-[13px] text-ink-faint sm:block">{subtitle}</p>
          </div>

          {showSearch && (
            <SearchBar
              value={search}
              onChange={onSearchChange}
              className="hidden w-56 lg:block xl:w-72"
            />
          )}

          <ThemeToggle />

          <Button
            variant="primary"
            size="md"
            onClick={onAddResearch}
            className="shrink-0 max-sm:w-10 max-sm:justify-center max-sm:px-0"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Add Research</span>
            <span className="sr-only sm:hidden">Add Research</span>
          </Button>
        </div>

        {showSearch && (
          <div className="pb-3 lg:hidden">
            <SearchBar value={search} onChange={onSearchChange} id="research-search-mobile" />
          </div>
        )}
      </div>
    </header>
  )
}
