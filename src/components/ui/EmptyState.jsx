import { cn } from '../../utils/cn'

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-line px-6 py-16 text-center',
        className,
      )}
    >
      {Icon && <Icon className="mb-3 h-5 w-5 text-ink-faint" aria-hidden="true" />}

      <h3 className="text-[14px] font-medium text-ink">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-ink-faint">{description}</p>
      )}
      {action && <div className="mt-5 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  )
}
