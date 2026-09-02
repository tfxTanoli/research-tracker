import { useState } from 'react'
import { ArrowUpDown, Check, ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { Dropdown, DropdownItem, DropdownLabel } from '../ui/Dropdown'
import { ViewToggle } from './ViewToggle'
import { PRIORITIES, SORT_OPTIONS, STATUSES } from '../../utils/constants'
import { cn } from '../../utils/cn'
import { pluralize } from '../../utils/format'

const FILTER_LABELS = { statuses: 'Status', priorities: 'Priority', tags: 'Tag' }

function CheckOption({ label, checked, onToggle }) {
  return (
    <button
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      data-keep-open
      onClick={onToggle}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors',
        checked ? 'text-ink' : 'text-ink-soft',
        'hover:bg-surface-sunken hover:text-ink',
      )}
    >
      <span
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition-colors',
          checked ? 'border-brand bg-brand text-white' : 'border-line-strong bg-surface',
        )}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />}
      </span>
      <span className="flex-1 truncate">{label}</span>
    </button>
  )
}

function FilterMenu({ label, values, selected, onToggle }) {
  const count = selected.length

  return (
    <Dropdown
      align="left"
      label={`Filter by ${label}`}
      className="scrollbar-slim max-h-[320px] overflow-y-auto"
      trigger={({ open }) => (
        <Button
          variant="secondary"
          size="md"
          aria-expanded={open}
          aria-haspopup="menu"
          className={cn(count > 0 && 'border-brand-line bg-brand-soft text-brand-ink')}
        >
          {label}
          {count > 0 && (
            <span className="rounded bg-brand px-1.5 text-[11px] font-bold text-white tabular-nums">
              {count}
            </span>
          )}
          <ChevronDown
            className={cn('h-3.5 w-3.5 opacity-60 transition-transform', open && 'rotate-180')}
            aria-hidden="true"
          />
        </Button>
      )}
    >
      {values.length === 0 ? (
        <p className="px-2.5 py-2 text-[13px] text-ink-faint">Nothing to filter yet</p>
      ) : (
        values.map((value) => (
          <CheckOption
            key={value}
            label={value}
            checked={selected.includes(value)}
            onToggle={() => onToggle(value)}
          />
        ))
      )}
    </Dropdown>
  )
}

/** Inline version of a filter group, used inside the mobile filter panel. */
function MobileFilterGroup({ label, values, selected, onToggle }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold tracking-wider text-ink-faint uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {values.map((value) => {
          const isActive = selected.includes(value)
          return (
            <button
              key={value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onToggle(value)}
              className={cn(
                'rounded-lg border px-2.5 py-1.5 text-[12.5px] font-medium transition-colors',
                isActive
                  ? 'border-brand-line bg-brand-soft text-brand-ink'
                  : 'border-line bg-surface text-ink-soft',
              )}
            >
              {value}
            </button>
          )
        })}
        {values.length === 0 && (
          <p className="text-[12.5px] text-ink-faint">Nothing to filter yet</p>
        )}
      </div>
    </div>
  )
}

export function FilterBar({
  filters,
  onToggleFilter,
  onClearFilters,
  availableTags,
  sort,
  onSortChange,
  view,
  onViewChange,
  resultCount,
  totalCount,
}) {
  const [panelOpen, setPanelOpen] = useState(false)

  const activeFilters = Object.entries(filters).flatMap(([key, values]) =>
    values.map((value) => ({ key, value })),
  )
  const activeCount = activeFilters.length
  const sortLabel = SORT_OPTIONS.find((option) => option.value === sort)?.label ?? 'Sort'

  const groups = [
    { key: 'statuses', label: 'Status', values: STATUSES.map((item) => item.value) },
    { key: 'priorities', label: 'Priority', values: PRIORITIES.map((item) => item.value) },
    { key: 'tags', label: 'Tags', values: availableTags },
  ]

  return (
    <section aria-label="Filters and sorting" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="hidden items-center gap-2 sm:flex">
          {groups.map((group) => (
            <FilterMenu
              key={group.key}
              label={group.label}
              values={group.values}
              selected={filters[group.key]}
              onToggle={(value) => onToggleFilter(group.key, value)}
            />
          ))}
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={() => setPanelOpen((value) => !value)}
          aria-expanded={panelOpen}
          aria-controls="mobile-filter-panel"
          className={cn(
            'sm:hidden',
            activeCount > 0 && 'border-brand-line bg-brand-soft text-brand-ink',
          )}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
          {activeCount > 0 && (
            <span className="rounded bg-brand px-1.5 text-[11px] font-bold text-white tabular-nums">
              {activeCount}
            </span>
          )}
        </Button>

        <div className="ml-auto flex items-center gap-2">
          <Dropdown
            align="right"
            label="Sort research"
            trigger={({ open }) => (
              <Button variant="secondary" size="md" aria-expanded={open} aria-haspopup="menu">
                <ArrowUpDown className="h-4 w-4 opacity-70" aria-hidden="true" />
                <span className="hidden max-w-[150px] truncate md:inline">{sortLabel}</span>
                <span className="md:hidden">Sort</span>
              </Button>
            )}
          >
            <DropdownLabel>Sort by</DropdownLabel>
            {SORT_OPTIONS.map((option) => (
              <DropdownItem
                key={option.value}
                selected={sort === option.value}
                onClick={() => onSortChange(option.value)}
              >
                {option.label}
              </DropdownItem>
            ))}
          </Dropdown>

          <ViewToggle view={view} onChange={onViewChange} />
        </div>
      </div>

      {panelOpen && (
        <div
          id="mobile-filter-panel"
          className="animate-content-in flex flex-col gap-4 rounded-xl border border-line bg-surface p-3.5 shadow-card sm:hidden"
        >
          {groups.map((group) => (
            <MobileFilterGroup
              key={group.key}
              label={group.label}
              values={group.values}
              selected={filters[group.key]}
              onToggle={(value) => onToggleFilter(group.key, value)}
            />
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="text-[12.5px] text-ink-faint">
          Showing <span className="font-semibold text-ink-soft tabular-nums">{resultCount}</span> of{' '}
          <span className="tabular-nums">{totalCount}</span>{' '}
          {pluralize(totalCount, 'entry', 'entries')}
        </p>

        {activeCount > 0 && (
          <>
            <span className="hidden h-3.5 w-px bg-line sm:block" aria-hidden="true" />

            <ul className="flex flex-wrap items-center gap-1.5">
              {activeFilters.map(({ key, value }) => (
                <li key={`${key}-${value}`}>
                  <button
                    type="button"
                    onClick={() => onToggleFilter(key, value)}
                    aria-label={`Remove ${FILTER_LABELS[key]} filter: ${value}`}
                    className="group inline-flex items-center gap-1 rounded-md border border-line bg-surface py-[3px] pr-1.5 pl-2 text-[11.5px] font-medium text-ink-soft shadow-xs transition-colors hover:border-line-strong hover:bg-surface-muted"
                  >
                    <span className="text-ink-faint">{FILTER_LABELS[key]}:</span>
                    <span className="max-w-[140px] truncate">{value}</span>
                    <X
                      className="h-3 w-3 text-ink-faint transition-colors group-hover:text-ink"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={onClearFilters}
              className="rounded-md text-[12.5px] font-semibold text-brand-ink transition-colors hover:text-brand-ink-hover"
            >
              Clear filters
            </button>
          </>
        )}
      </div>
    </section>
  )
}
