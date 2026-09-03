import { cn } from '../../utils/cn'

/**
 * Shared label / hint / error scaffolding so every form control in the app
 * lines up and announces itself the same way.
 */
export function Field({ id, label, hint, error, required, children, className }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-medium text-ink">
          {label}
          {required && (
            <span className="ml-0.5 text-danger" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {hint && !error && <span className="text-[12px] text-ink-faint">{hint}</span>}
      </div>

      {children}

      {error && (
        <p id={`${id}-error`} role="alert" className="text-[12px] text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export const controlClasses = (invalid) =>
  cn(
    'w-full rounded-md border bg-surface px-3 text-[13.5px] text-ink transition-colors duration-150',
    'placeholder:text-ink-faint focus:outline-none',
    invalid
      ? 'border-field-invalid focus:border-danger focus:ring-2 focus:ring-ring-danger'
      : 'border-line hover:border-line-strong focus:border-line-strong focus:ring-2 focus:ring-ring-brand',
  )
