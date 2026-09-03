import { cn } from '../../utils/cn'

export function Logo({ className, showWordmark = true }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand text-[13px] font-semibold text-on-brand">
        R
      </span>
      {showWordmark && (
        <span className="min-w-0 truncate text-[14px] font-semibold tracking-tight text-ink">
          Research Tracker
        </span>
      )}
    </div>
  )
}
