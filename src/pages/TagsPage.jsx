import { ArrowUpRight, Hash, TagsIcon } from 'lucide-react'
import { Panel } from '../components/ui/Panel'
import { EmptyState } from '../components/ui/EmptyState'
import { pluralize } from '../utils/format'

/** Browse the library by theme. Selecting a tag opens it in the research list. */
export function TagsPage({ tagUsage, entries, search, onSelectTag }) {
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
        description={`Nothing matches “${search.trim()}”. Try a different search.`}
      />
    )
  }

  const busiest = visible[0]?.count ?? 1

  return (
    <div className="flex flex-col gap-5">
      <Panel
        title="Tag overview"
        description={`${tagUsage.length} ${pluralize(tagUsage.length, 'tag')} across ${entries.length} ${pluralize(entries.length, 'entry', 'entries')}`}
        bodyClassName="p-3"
      >
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map(({ tag, count }) => {
            const share = Math.round((count / busiest) * 100)
            const examples = entries
              .filter((entry) => entry.tags.includes(tag))
              .slice(0, 2)
              .map((entry) => entry.title)

            return (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => onSelectTag(tag)}
                  className="group flex h-full w-full flex-col rounded-xl border border-line bg-surface p-3.5 text-left transition-all duration-200 hover:border-line-strong hover:shadow-raised"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                      <Hash className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13.5px] font-semibold text-ink transition-colors group-hover:text-brand">
                      {tag}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-3 text-[12px] text-ink-faint">
                    <span className="font-semibold text-ink-soft tabular-nums">{count}</span>{' '}
                    {pluralize(count, 'entry', 'entries')}
                  </p>

                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
                    <div
                      className="h-full rounded-full bg-brand/70 transition-all duration-500"
                      style={{ width: `${share}%` }}
                    />
                  </div>

                  {examples.length > 0 && (
                    <p className="mt-3 line-clamp-2-safe text-[12px] leading-relaxed text-ink-faint">
                      {examples.join(' · ')}
                    </p>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </Panel>
    </div>
  )
}
