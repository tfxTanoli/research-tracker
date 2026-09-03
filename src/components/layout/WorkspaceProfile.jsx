import { WORKSPACE_PROFILE } from '../../data/navigation'
import { cn } from '../../utils/cn'

/** Static profile block — this build has no authentication. */
export function WorkspaceProfile({ className }) {
  const { name, initials } = WORKSPACE_PROFILE

  return (
    <div className={cn('flex items-center gap-2.5 px-1 py-1', className)}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-[11px] font-semibold text-ink-soft">
        {initials}
      </span>
      <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink-soft">{name}</p>
    </div>
  )
}
