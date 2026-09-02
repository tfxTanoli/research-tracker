import { cn } from '../../utils/cn'

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface-muted px-6 py-14 text-center sm:py-20',
        className,
      )}
    >
      {Icon && (
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-ink-faint shadow-xs">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      )}

      <h3 className="text-[15px] font-semibold tracking-tight text-ink">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-ink-faint">{description}</p>
      )}
      {action && <div className="mt-5 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  )
}
