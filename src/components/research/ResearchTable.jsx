import { ExternalLink, MoreHorizontal, Pencil, Star, Trash2 } from 'lucide-react'
import { Dropdown, DropdownItem, DropdownSeparator } from '../ui/Dropdown'
import { StatusBadge } from '../ui/StatusBadge'
import { PriorityBadge } from '../ui/PriorityBadge'
import { TagBadge } from '../ui/TagBadge'
import { cn } from '../../utils/cn'
import { formatRelative } from '../../utils/format'

const HEAD_CELL = 'px-4 py-2.5 text-[11.5px] font-medium text-ink-faint'

/**
 * Dense list view. Secondary columns drop away as the viewport narrows and the
 * table scrolls horizontally inside its own container rather than the page.
 * Each row is a title, where it stands, and how to act on it — the description
 * and source columns were duplicating what the card and the row menu already
 * carry.
 */
export function ResearchTable({ entries, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="scrollbar-slim overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <caption className="sr-only">Saved research entries</caption>

          <thead className="border-b border-line">
            <tr>
              <th scope="col" className={cn(HEAD_CELL, 'w-[46%]')}>
                Topic
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
              <th scope="col" className={cn(HEAD_CELL, 'hidden md:table-cell')}>
                Updated
              </th>
              <th scope="col" className={cn(HEAD_CELL, 'text-right')}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {entries.map((entry) => (
              <tr key={entry.id} className="group transition-colors hover:bg-surface-muted">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    {entry.favorite && (
                      <span className="shrink-0 text-star">
                        <Star className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
                        <span className="sr-only">Favorite</span>
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onEdit(entry)}
                      className="block max-w-full truncate text-left text-[13.5px] text-ink"
                    >
                      {entry.title}
                    </button>
                  </div>
                </td>

                <td className="px-4 py-2.5">
                  <StatusBadge status={entry.status} />
                </td>

                <td className="hidden px-4 py-2.5 sm:table-cell">
                  <PriorityBadge priority={entry.priority} />
                </td>

                <td className="hidden px-4 py-2.5 xl:table-cell">
                  <div className="flex max-w-[200px] flex-wrap items-center gap-1">
                    {entry.tags.slice(0, 2).map((tag) => (
                      <TagBadge key={tag} tag={tag} size="sm" />
                    ))}
                    {entry.tags.length > 2 && (
                      <span className="text-[11px] text-ink-faint">+{entry.tags.length - 2}</span>
                    )}
                  </div>
                </td>

                <td className="hidden px-4 py-2.5 text-[12.5px] whitespace-nowrap text-ink-faint md:table-cell">
                  {formatRelative(entry.updatedAt)}
                </td>

                <td className="px-4 py-2.5">
                  <div className="flex items-center justify-end gap-0.5">
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(entry.id)}
                      aria-pressed={entry.favorite}
                      aria-label={entry.favorite ? 'Remove from favorites' : 'Add to favorites'}
                      className={cn(
                        'hidden rounded-md p-1.5 transition-colors duration-150 hover:text-ink sm:block',
                        entry.favorite
                          ? 'text-star'
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
                          className="rounded-md p-2 text-ink-faint transition-colors hover:text-ink sm:p-1.5"
                        >
                          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                        </button>
                      )}
                    >
                      <DropdownItem icon={Pencil} onClick={() => onEdit(entry)}>
                        Edit research
                      </DropdownItem>
                      <DropdownItem icon={Star} onClick={() => onToggleFavorite(entry.id)}>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
