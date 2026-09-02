import { cn } from '../../utils/cn'
import { getPriority } from '../../utils/constants'

/**
 * Priority stays deliberately quiet: a coloured dot carries the signal so the
 * library does not turn into a wall of colour.
 */
export function PriorityBadge({ priority, variant = 'plain', className }) {
  const config = getPriority(priority)

  if (variant === 'chip') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border px-2 py-[3px] text-[11.5px] font-semibold whitespace-nowrap',
          config.chip,
          className,
        )}
      >
        <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} aria-hidden="true" />
        {config.label}
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-[12px] font-medium whitespace-nowrap',
        config.text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} aria-hidden="true" />
      {config.label}
    </span>
  )
}
