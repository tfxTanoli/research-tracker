import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

export function TagBadge({ tag, onRemove, onClick, active, size = 'md', className }) {
  const base = cn(
    'inline-flex max-w-full items-center gap-1 rounded-md border whitespace-nowrap transition-colors',
    size === 'sm' ? 'px-1.5 py-[1px] text-[11px]' : 'px-2 py-[2px] text-[11.5px]',
    active
      ? 'border-line-strong bg-surface-sunken text-ink'
      : 'border-line bg-surface text-ink-soft',
    className,
  )

  if (onRemove) {
    return (
      <span className={base}>
        <span className="truncate">{tag}</span>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove tag ${tag}`}
          className="-mr-0.5 rounded p-0.5 text-ink-faint transition-colors hover:bg-line hover:text-ink"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      </span>
    )
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(base, 'hover:border-line-strong hover:text-ink')}>
        <span className="truncate">{tag}</span>
      </button>
    )
  }

  return (
    <span className={base}>
      <span className="truncate">{tag}</span>
    </span>
  )
}
