import { ArrowRight, Flame, Plus, Sparkles } from 'lucide-react'
import { StatsGrid } from '../components/research/StatsGrid'
import { Panel } from '../components/ui/Panel'
import { Button } from '../components/ui/Button'
import { StatusBadge } from '../components/ui/StatusBadge'
import { PriorityBadge } from '../components/ui/PriorityBadge'
import { TagBadge } from '../components/ui/TagBadge'
import { EmptyState } from '../components/ui/EmptyState'
import { STATUSES } from '../utils/constants'
import { formatRelative } from '../utils/format'
import { cn } from '../utils/cn'

function EntryRow({ entry, onEdit }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onEdit(entry)}
        className="group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-surface-muted"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13.5px] font-semibold text-ink transition-colors group-hover:text-brand">
            {entry.title}
          </p>
          <div className="mt-1 flex items-center gap-2.5">
            <PriorityBadge priority={entry.priority} />
            <span className="text-[12px] text-ink-faint">{formatRelative(entry.updatedAt)}</span>
          </div>
        </div>

        <div className="hidden shrink-0 sm:block">
          <StatusBadge status={entry.status} />
        </div>
      </button>
    </li>
  )
}

function StatusBreakdown({ entries, total, onSelectStatus }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {STATUSES.map((status) => {
        const count = entries.filter((entry) => entry.status === status.value).length
        const percent = total ? Math.round((count / total) * 100) : 0

        return (
          <li key={status.value}>
            <button
              type="button"
              onClick={() => onSelectStatus(status.value)}
              className="group w-full text-left"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="flex items-center gap-2 text-[12.5px] font-medium text-ink-soft transition-colors group-hover:text-ink">
                  <span className={cn('h-2 w-2 rounded-full', status.dot)} aria-hidden="true" />
                  {status.label}
                </span>
                <span className="text-[12px] text-ink-faint tabular-nums">
                  {count} · {percent}%
                </span>
              </div>

              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', status.dot)}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export function Dashboard({
  entries,
  stats,
  tagUsage,
  onNavigate,
  onEdit,
  onAdd,
  onSelectTag,
  onSelectStatus,
}) {
  const recent = [...entries]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)

  const focus = entries
    .filter(
      (entry) =>
        (entry.priority === 'Critical' || entry.priority === 'High') &&
        entry.status !== 'Completed' &&
        entry.status !== 'Archived',
    )
    .slice(0, 4)

  if (!entries.length) {
    return (
      <EmptyState
        icon={Sparkles}
        title="No research added yet"
        description="Start your library with the first topic you want to dig into — sources, notes and progress all live here."
        action={
          <Button variant="primary" onClick={onAdd}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add Research
          </Button>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Panel
            title="Recently updated"
            description="Where you left off"
            bodyClassName="p-2"
            action={
              <Button variant="ghost" size="sm" onClick={() => onNavigate('all')}>
                View all
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            }
          >
            <ul className="flex flex-col">
              {recent.map((entry) => (
                <EntryRow key={entry.id} entry={entry} onEdit={onEdit} />
              ))}
            </ul>
          </Panel>

          <Panel
            title="Needs attention"
            description="High and critical topics still open"
            bodyClassName="p-2"
            action={
              <Button variant="ghost" size="sm" onClick={() => onNavigate('high-priority')}>
                Open
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            }
          >
            {focus.length ? (
              <ul className="flex flex-col">
                {focus.map((entry) => (
                  <EntryRow key={entry.id} entry={entry} onEdit={onEdit} />
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-2.5 px-2 py-5 text-[13px] text-ink-faint">
                <Flame className="h-4 w-4" aria-hidden="true" />
                Nothing urgent is open — your high-priority queue is clear.
              </div>
            )}
          </Panel>
        </div>

        <div className="flex flex-col gap-4">
          <Panel title="By status" description={`${stats.total} entries in total`}>
            <StatusBreakdown
              entries={entries}
              total={stats.total}
              onSelectStatus={onSelectStatus}
            />
          </Panel>

          <Panel
            title="Top tags"
            description="Themes across your library"
            action={
              <Button variant="ghost" size="sm" onClick={() => onNavigate('tags')}>
                All tags
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            }
          >
            <ul className="flex flex-wrap gap-1.5">
              {tagUsage.slice(0, 10).map(({ tag, count }) => (
                <li key={tag} className="min-w-0">
                  <TagBadge tag={`${tag} · ${count}`} onClick={() => onSelectTag(tag)} />
                </li>
              ))}
              {!tagUsage.length && (
                <li className="text-[13px] text-ink-faint">No tags in use yet.</li>
              )}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  )
}
