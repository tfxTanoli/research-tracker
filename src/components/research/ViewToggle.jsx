import { LayoutGrid, Rows3 } from 'lucide-react'
import { cn } from '../../utils/cn'

const OPTIONS = [
  { value: 'grid', label: 'Grid view', icon: LayoutGrid },
  { value: 'table', label: 'Table view', icon: Rows3 },
]

export function ViewToggle({ view, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Layout"
      className="flex shrink-0 items-center rounded-md border border-line bg-surface p-0.5"
    >
      {OPTIONS.map((option) => {
        const Icon = option.icon
        const isActive = view === option.value

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={option.label}
            title={option.label}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-sm transition-colors duration-150',
              isActive
                ? 'bg-surface-sunken text-ink'
                : 'text-ink-faint hover:text-ink-soft',
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
