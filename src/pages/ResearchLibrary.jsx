import { FileSearch, Plus, SearchX } from 'lucide-react'
import { FilterBar } from '../components/research/FilterBar'
import { ResearchGrid } from '../components/research/ResearchGrid'
import { ResearchTable } from '../components/research/ResearchTable'
import { StatsGrid } from '../components/research/StatsGrid'
import { EmptyState } from '../components/ui/EmptyState'
import { Button } from '../components/ui/Button'

/**
 * The main workspace: statistics, filters, and the research collection in
 * whichever layout is active.
 */
export function ResearchLibrary({
  entries,
  scopedTotal,
  stats,
  showStats,
  search,
  filters,
  onToggleFilter,
  onClearFilters,
  onClearSearch,
  availableTags,
  sort,
  onSortChange,
  view,
  onViewChange,
  onAdd,
  onEdit,
  onDelete,
  onToggleFavorite,
  onSelectTag,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'Add your first entry and it will show up right here.',
}) {
  const hasEntries = entries.length > 0
  const isFiltered = search.trim() !== '' || Object.values(filters).some((list) => list.length > 0)

  return (
    <div className="flex flex-col gap-5">
      {showStats && <StatsGrid stats={stats} />}

      <FilterBar
        filters={filters}
        onToggleFilter={onToggleFilter}
        onClearFilters={onClearFilters}
        availableTags={availableTags}
        sort={sort}
        onSortChange={onSortChange}
        view={view}
        onViewChange={onViewChange}
        resultCount={entries.length}
        totalCount={scopedTotal}
      />

      {hasEntries ? (
        <div key={view} className="animate-content-in">
          {view === 'grid' ? (
            <ResearchGrid
              entries={entries}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
              onSelectTag={onSelectTag}
            />
          ) : (
            <ResearchTable
              entries={entries}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
            />
          )}
        </div>
      ) : isFiltered ? (
        <EmptyState
          icon={SearchX}
          title="No research found"
          description="Try a different search, or clear the filters."
          action={
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  onClearFilters()
                  onClearSearch()
                }}
              >
                Clear all
              </Button>
              <Button variant="primary" onClick={onAdd}>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add Research
              </Button>
            </>
          }
        />
      ) : (
        <EmptyState
          icon={FileSearch}
          title={emptyTitle}
          description={emptyDescription}
          action={
            <Button variant="primary" onClick={onAdd}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add Research
            </Button>
          }
        />
      )}
    </div>
  )
}
