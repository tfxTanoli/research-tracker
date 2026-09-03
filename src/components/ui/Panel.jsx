import { cn } from '../../utils/cn'

/**
 * Bordered surface with an optional titled header — the building block for the
 * dashboard and settings. The header is a single line: a title and, at most,
 * one action. The descriptive sub-line it used to support is gone.
 */
export function Panel({ title, action, children, className, bodyClassName }) {
  return (
    <section className={cn('rounded-lg border border-line bg-surface', className)}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <h2 className="truncate text-[13px] font-medium text-ink">{title}</h2>
          {action}
        </header>
      )}

      <div className={cn('p-4', bodyClassName)}>{children}</div>
    </section>
  )
}
