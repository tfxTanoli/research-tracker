import { cn } from '../../utils/cn'
import { getStatus } from '../../utils/constants'

export function StatusBadge({ status, className }) {
  const config = getStatus(status)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-[3px] text-[11.5px] font-semibold whitespace-nowrap',
        config.badge,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} aria-hidden="true" />
      {config.label}
    </span>
  )
}
