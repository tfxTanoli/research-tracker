import { cn } from '../../utils/cn'

export function Logo({ className, showWordmark = true }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-brand text-[15px] font-bold text-white shadow-sm">
        R
      </span>
      {showWordmark && (
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-[14px] font-semibold tracking-tight text-ink">
            Research Tracker
          </span>
          <span className="truncate text-[11.5px] text-ink-faint">Knowledge workspace</span>
        </span>
      )}
    </div>
  )
}
