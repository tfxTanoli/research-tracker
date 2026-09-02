import { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { Field, controlClasses } from './Field'

export const Input = forwardRef(function Input(
  { id, label, hint, error, required, icon: Icon, className, containerClassName, ...props },
  ref,
) {
  const control = (
    <div className="relative">
      {Icon && (
        <Icon
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint"
          aria-hidden="true"
        />
      )}
      <input
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClasses(error), 'h-10', Icon && 'pl-9', className)}
        {...props}
      />
    </div>
  )

  if (!label) return control

  return (
    <Field
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={containerClassName}
    >
      {control}
    </Field>
  )
})
