import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Field, controlClasses } from './Field'

/** Native select, restyled — keyboard and mobile behaviour stay free. */
export const Select = forwardRef(function Select(
  { id, label, hint, error, required, options = [], className, ...props },
  ref,
) {
  const control = (
    <div className="relative">
      <select
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        className={cn(controlClasses(error), 'h-10 cursor-pointer appearance-none pr-9', className)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-ink-faint"
        aria-hidden="true"
      />
    </div>
  )

  if (!label) return control

  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      {control}
    </Field>
  )
})
