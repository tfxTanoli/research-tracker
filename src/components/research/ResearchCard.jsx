import { Clock, ExternalLink, MoreHorizontal, Pencil, Star, Trash2 } from 'lucide-react'
import { Dropdown, DropdownItem, DropdownSeparator } from '../ui/Dropdown'
import { StatusBadge } from '../ui/StatusBadge'
import { PriorityBadge } from '../ui/PriorityBadge'
import { TagBadge } from '../ui/TagBadge'
import { cn } from '../../utils/cn'
import { formatRelative, getDomain } from '../../utils/format'

const MAX_VISIBLE_TAGS = 3

export function ResearchCard({ entry, onEdit, onDelete, onToggleFavorite, onSelectTag }) {
  const visibleTags = entry.tags.slice(0, MAX_VISIBLE_TAGS)
  const hiddenCount = entry.tags.length - visibleTags.length
  const domain = getDomain(entry.url)

  return (
    <article className="group flex h-full flex-col rounded-xl border border-line bg-surface p-4 shadow-card transition-all duration-200 hover:border-line-strong hover:shadow-raised">
      <div className="flex items-start justify-between gap-2">
        <StatusBadge status={entry.status} />

        <div className="-mt-1 -mr-1 flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => onToggleFavorite(entry.id)}
            aria-pressed={entry.favorite}
            aria-label={entry.favorite ? 'Remove from favorites' : 'Add to favorites'}
            className={cn(
              'rounded-lg p-2 transition-all duration-150 hover:bg-surface-sunken sm:p-1.5',
              entry.favorite
                ? 'text-[#e0a51e]'
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
                  'rounded-lg p-2 text-ink-faint transition-all duration-150 hover:bg-surface-sunken hover:text-ink sm:p-1.5',
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
          className="line-clamp-2-safe text-left text-[14.5px] leading-snug font-semibold tracking-tight text-ink transition-colors hover:text-brand"
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
        <ul className="mt-3.5 flex flex-wrap items-center gap-1.5">
          {visibleTags.map((tag) => (
            <li key={tag} className="min-w-0">
              <TagBadge tag={tag} size="sm" onClick={onSelectTag ? () => onSelectTag(tag) : undefined} />
            </li>
          ))}
          {hiddenCount > 0 && (
            <li className="text-[11px] font-medium text-ink-faint">+{hiddenCount} more</li>
          )}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line-soft pt-3.5 text-[12px] text-ink-faint">
        <PriorityBadge priority={entry.priority} />

        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {formatRelative(entry.updatedAt)}
        </span>

        {domain && (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex max-w-[45%] items-center gap-1 truncate rounded-md font-medium text-ink-faint transition-colors hover:text-brand"
            title={entry.url}
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{domain}</span>
          </a>
        )}
      </div>
    </article>
  )
}
