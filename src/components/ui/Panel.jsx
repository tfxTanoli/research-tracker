import { cn } from '../../utils/cn'

/** Bordered surface with an optional titled header — the dashboard's building block. */
export function Panel({ title, description, action, children, className, bodyClassName }) {
  return (
    <section
      className={cn('rounded-xl border border-line bg-surface shadow-card', className)}
    >
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 border-b border-line-soft px-4 py-3">
          <div className="min-w-0">
            <h2 className="truncate text-[13.5px] font-semibold tracking-tight text-ink">
              {title}
            </h2>
            {description && (
              <p className="mt-0.5 truncate text-[12px] text-ink-faint">{description}</p>
            )}
          </div>
          {action}
        </header>
      )}

      <div className={cn('p-4', bodyClassName)}>{children}</div>
    </section>
  )
}
