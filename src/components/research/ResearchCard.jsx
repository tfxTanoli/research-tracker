import { ExternalLink, MoreHorizontal, Pencil, Star, Trash2 } from 'lucide-react'
import { Dropdown, DropdownItem, DropdownSeparator } from '../ui/Dropdown'
import { StatusBadge } from '../ui/StatusBadge'
import { PriorityBadge } from '../ui/PriorityBadge'
import { TagBadge } from '../ui/TagBadge'
import { cn } from '../../utils/cn'
import { formatRelative } from '../../utils/format'

const MAX_VISIBLE_TAGS = 2

export function ResearchCard({ entry, onEdit, onDelete, onToggleFavorite, onSelectTag }) {
  const visibleTags = entry.tags.slice(0, MAX_VISIBLE_TAGS)
  const hiddenCount = entry.tags.length - visibleTags.length

  return (
    <article className="group flex h-full flex-col rounded-lg border border-line bg-surface p-4 transition-colors duration-150 hover:border-line-strong">
      <div className="flex items-start justify-between gap-2">
        <StatusBadge status={entry.status} />

        <div className="-mt-1 -mr-1 flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => onToggleFavorite(entry.id)}
            aria-pressed={entry.favorite}
            aria-label={entry.favorite ? 'Remove from favorites' : 'Add to favorites'}
            className={cn(
              'rounded-md p-2 transition-colors duration-150 hover:text-ink sm:p-1.5',
              entry.favorite
                ? 'text-star'
                : 'text-ink-faint opacity-0 group-hover:opacity-100 focus-visible:opacity-100 max-sm:opacity-100',
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
                className={cn(
                  'rounded-md p-2 text-ink-faint transition-colors duration-150 hover:text-ink sm:p-1.5',
                  !open &&
                    'opacity-0 group-hover:opacity-100 focus-visible:opacity-100 max-sm:opacity-100',
                )}
              >
                <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          >
            <DropdownItem icon={Pencil} onClick={() => onEdit(entry)}>
              Edit research
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
      </div>

      <h3 className="mt-3">
        <button
          type="button"
          onClick={() => onEdit(entry)}
          className="line-clamp-2-safe text-left text-[14px] leading-snug font-medium tracking-tight text-ink"
        >
          {entry.title}
        </button>
      </h3>

      {entry.description && (
        <p className="line-clamp-2-safe mt-1.5 text-[13px] leading-relaxed text-ink-faint">
          {entry.description}
        </p>
      )}

      {entry.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap items-center gap-1.5">
          {visibleTags.map((tag) => (
            <li key={tag} className="min-w-0">
              <TagBadge
                tag={tag}
                size="sm"
                onClick={onSelectTag ? () => onSelectTag(tag) : undefined}
              />
            </li>
          ))}
          {hiddenCount > 0 && (
            <li className="text-[11px] text-ink-faint">+{hiddenCount}</li>
          )}
        </ul>
      )}

      {/* One quiet meta line. The source link lives in the row menu now — it was
          the third link on a card that already had two. */}
      <div className="mt-auto flex items-center gap-3 pt-3.5 text-[12px] text-ink-faint">
        <PriorityBadge priority={entry.priority} />
        <span className="ml-auto">{formatRelative(entry.updatedAt)}</span>
      </div>
    </article>
  )
}
