import { WORKSPACE_PROFILE } from '../../data/navigation'
import { cn } from '../../utils/cn'

/** Static profile block — this build has no authentication. */
export function WorkspaceProfile({ className }) {
  const { name, role, initials, workspace } = WORKSPACE_PROFILE

  return (
    <div
      className={cn(
        'flex items-center gap-2.5 rounded-xl border border-line bg-surface p-2.5 shadow-xs',
        className,
      )}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[12px] font-bold text-brand">
        {initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-ink">{name}</p>
        <p className="truncate text-[11.5px] text-ink-faint">{role}</p>
      </div>
      <span className="hidden shrink-0 rounded-md bg-surface-sunken px-1.5 py-0.5 text-[10.5px] font-semibold text-ink-faint sm:block">
        {workspace.split(' ')[0]}
      </span>
    </div>
  )
}
