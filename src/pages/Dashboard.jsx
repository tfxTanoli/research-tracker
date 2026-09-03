import { Plus } from 'lucide-react'
import { StatsGrid } from '../components/research/StatsGrid'
import { Panel } from '../components/ui/Panel'
import { Button } from '../components/ui/Button'
import { StatusBadge } from '../components/ui/StatusBadge'
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
        className="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-surface-muted"
      >
        <p className="min-w-0 flex-1 truncate text-[13.5px] text-ink">{entry.title}</p>
        <span className="hidden shrink-0 text-[12px] text-ink-faint sm:block">
          {formatRelative(entry.updatedAt)}
        </span>
        <span className="shrink-0">
          <StatusBadge status={entry.status} />
        </span>
      </button>
    </li>
  )
}

function StatusBreakdown({ entries, onSelectStatus }) {
  return (
    <ul className="flex flex-col">
      {STATUSES.map((status) => {
        const count = entries.filter((entry) => entry.status === status.value).length

        return (
          <li key={status.value}>
            <button
              type="button"
              onClick={() => onSelectStatus(status.value)}
              className="group flex w-full items-center justify-between gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-surface-muted"
            >
              <span className="flex min-w-0 items-center gap-2 text-[13px] text-ink-soft transition-colors group-hover:text-ink">
                <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', status.dot)} aria-hidden="true" />
                <span className="truncate">{status.label}</span>
              </span>
              <span className="shrink-0 text-[12.5px] text-ink-faint tabular-nums">{count}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export function Dashboard({ entries, stats, tagUsage, onNavigate, onEdit, onAdd, onSelectTag, onSelectStatus }) {
  const recent = [...entries]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 6)

  if (!entries.length) {
    return (
      <EmptyState
        title="No research yet"
        description="Add the first topic you want to dig into."
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
    <div className="flex flex-col gap-5">
      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Recently updated"
          bodyClassName="p-2"
          action={
            <Button variant="ghost" size="sm" onClick={() => onNavigate('all')}>
              View all
            </Button>
          }
        >
          <ul className="flex flex-col">
            {recent.map((entry) => (
              <EntryRow key={entry.id} entry={entry} onEdit={onEdit} />
            ))}
          </ul>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel title="Status" bodyClassName="p-2">
            <StatusBreakdown entries={entries} onSelectStatus={onSelectStatus} />
          </Panel>

          <Panel
            title="Tags"
            action={
              <Button variant="ghost" size="sm" onClick={() => onNavigate('tags')}>
                All tags
              </Button>
            }
          >
            <ul className="flex flex-wrap gap-1.5">
              {tagUsage.slice(0, 8).map(({ tag }) => (
                <li key={tag} className="min-w-0">
                  <TagBadge tag={tag} onClick={() => onSelectTag(tag)} />
                </li>
              ))}
              {!tagUsage.length && <li className="text-[13px] text-ink-faint">No tags yet.</li>}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  )
}
