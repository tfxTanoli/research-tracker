import { Menu, Plus } from 'lucide-react'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { SearchBar } from '../research/SearchBar'

/**
 * Sticky page header. Title only — the descriptive line each destination used
 * to carry has gone, since the sidebar already says where you are. On phones
 * search moves to its own full-width row underneath.
 */
export function Header({
  title,
  search,
  onSearchChange,
  onAddResearch,
  onOpenNavigation,
  showSearch = true,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas-veil backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-14 items-center gap-3 py-2.5">
          <button
            type="button"
            onClick={onOpenNavigation}
            aria-label="Open navigation menu"
            className="-ml-1.5 shrink-0 rounded-lg p-3 text-ink-soft transition-colors hover:bg-surface-sunken hover:text-ink lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <h1 className="min-w-0 flex-1 truncate text-[15px] font-semibold tracking-tight text-ink sm:text-base">
            {title}
          </h1>

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
          <div className="pb-2.5 lg:hidden">
            <SearchBar value={search} onChange={onSearchChange} id="research-search-mobile" />
          </div>
        )}
      </div>
    </header>
  )
}
