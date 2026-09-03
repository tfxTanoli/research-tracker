import { TagsIcon } from 'lucide-react'
import { EmptyState } from '../components/ui/EmptyState'

/**
 * Browse the library by theme. Selecting a tag opens it in the research list.
 * A tag is a name and a count — the usage bar and the sample titles each card
 * used to carry were decoration on top of that.
 */
export function TagsPage({ tagUsage, search, onSelectTag }) {
  const needle = search.trim().toLowerCase()
  const visible = needle
    ? tagUsage.filter(({ tag }) => tag.toLowerCase().includes(needle))
    : tagUsage

  if (!tagUsage.length) {
    return (
      <EmptyState
        icon={TagsIcon}
        title="No tags yet"
        description="Tags appear here as soon as you add them to a research entry."
      />
    )
  }

  if (!visible.length) {
    return (
      <EmptyState
        icon={TagsIcon}
        title="No tags found"
        description={`Nothing matches “${search.trim()}”.`}
      />
    )
  }

  return (
    <ul className="grid grid-cols-1 overflow-hidden rounded-lg border-t border-l border-line sm:grid-cols-2 xl:grid-cols-3">
      {visible.map(({ tag, count }) => (
        <li key={tag} className="border-r border-b border-line">
          <button
            type="button"
            onClick={() => onSelectTag(tag)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-muted"
          >
            <span className="min-w-0 truncate text-[13.5px] text-ink">{tag}</span>
            <span className="shrink-0 text-[12.5px] text-ink-faint tabular-nums">{count}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
