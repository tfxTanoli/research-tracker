import { ExternalLink, MoreHorizontal, Pencil, Star, Trash2 } from 'lucide-react'
import { Dropdown, DropdownItem, DropdownSeparator } from '../ui/Dropdown'
import { StatusBadge } from '../ui/StatusBadge'
import { PriorityBadge } from '../ui/PriorityBadge'
import { TagBadge } from '../ui/TagBadge'
import { cn } from '../../utils/cn'
import { formatRelative, getDomain } from '../../utils/format'

const HEAD_CELL = 'px-4 py-2.5 text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint'

/**
 * Dense list view. Secondary columns drop away as the viewport narrows and the
 * table scrolls horizontally inside its own container rather than the page.
 */
export function ResearchTable({ entries, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
      <div className="scrollbar-slim overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <caption className="sr-only">Saved research entries</caption>

          <thead className="border-b border-line-soft bg-surface-muted">
            <tr>
              <th scope="col" className={cn(HEAD_CELL, 'w-[38%]')}>
                Research Topic
              </th>
              <th scope="col" className={HEAD_CELL}>
                Status
              </th>
              <th scope="col" className={cn(HEAD_CELL, 'hidden sm:table-cell')}>
                Priority
              </th>
              <th scope="col" className={cn(HEAD_CELL, 'hidden xl:table-cell')}>
                Tags
              </th>
              <th scope="col" className={cn(HEAD_CELL, 'hidden lg:table-cell')}>
                Source
              </th>
              <th scope="col" className={cn(HEAD_CELL, 'hidden md:table-cell')}>
                Updated
              </th>
              <th scope="col" className={cn(HEAD_CELL, 'text-right')}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line-soft">
            {entries.map((entry) => {
              const domain = getDomain(entry.url)

              return (
                <tr key={entry.id} className="group transition-colors hover:bg-surface-muted">
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      {entry.favorite && (
                        <span className="mt-[3px] shrink-0 text-[#e0a51e]">
                          <Star className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
                          <span className="sr-only">Favorite</span>
                        </span>
                      )}
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => onEdit(entry)}
                          className="block max-w-full truncate text-left text-[13.5px] font-semibold text-ink transition-colors hover:text-brand"
                        >
                          {entry.title}
                        </button>
                        {entry.description && (
                          <p className="mt-0.5 max-w-[420px] truncate text-[12.5px] text-ink-faint">
                            {entry.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={entry.status} />
                  </td>

                  <td className="hidden px-4 py-3 sm:table-cell">
                    <PriorityBadge priority={entry.priority} />
                  </td>

                  <td className="hidden px-4 py-3 xl:table-cell">
                    <div className="flex max-w-[220px] flex-wrap items-center gap-1">
                      {entry.tags.slice(0, 2).map((tag) => (
                        <TagBadge key={tag} tag={tag} size="sm" />
                      ))}
                      {entry.tags.length > 2 && (
                        <span className="text-[11px] font-medium text-ink-faint">
                          +{entry.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="hidden px-4 py-3 lg:table-cell">
                    {domain ? (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-[160px] items-center gap-1 rounded-md text-[12.5px] font-medium text-ink-soft transition-colors hover:text-brand"
                        title={entry.url}
                      >
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span className="truncate">{domain}</span>
                      </a>
                    ) : (
                      <span className="text-[12.5px] text-ink-faint">—</span>
                    )}
                  </td>

                  <td className="hidden px-4 py-3 text-[12.5px] whitespace-nowrap text-ink-faint md:table-cell">
                    {formatRelative(entry.updatedAt)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-0.5">
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(entry.id)}
                        aria-pressed={entry.favorite}
                        aria-label={
                          entry.favorite ? 'Remove from favorites' : 'Add to favorites'
                        }
                        className={cn(
                          'hidden rounded-lg p-1.5 transition-all duration-150 hover:bg-surface-sunken sm:block',
                          entry.favorite
                            ? 'text-[#e0a51e]'
                            : 'text-ink-faint opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
                        )}
                      >
                        <Star
                          className="h-4 w-4"
                          fill={entry.favorite ? 'currentColor' : 'none'}
                          aria-hidden="true"
                        />
                      </button>

                      <Dropdown
                        align="right"
                        label={`Actions for ${entry.title}`}
                        trigger={({ open }) => (
                          <button
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded={open}
                            aria-label="Research actions"
                            className="rounded-lg p-2 text-ink-faint transition-colors hover:bg-surface-sunken hover:text-ink sm:p-1.5"
                          >
                            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                          </button>
                        )}
                      >
                        <DropdownItem icon={Pencil} onClick={() => onEdit(entry)}>
                          Edit research
                        </DropdownItem>
                        <DropdownItem
                          icon={Star}
                          onClick={() => onToggleFavorite(entry.id)}
                        >
                          {entry.favorite ? 'Remove favorite' : 'Mark favorite'}
                        </DropdownItem>
                        {entry.url && (
                          <DropdownItem
                            icon={ExternalLink}
                            onClick={() => window.open(entry.url, '_blank', 'noopener,noreferrer')}
                          >
                            Open source
                          </DropdownItem>
                        )}
                        <DropdownSeparator />
                        <DropdownItem icon={Trash2} tone="danger" onClick={() => onDelete(entry)}>
                          Delete
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
