import { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { Field, controlClasses } from './Field'

export const TextArea = forwardRef(function TextArea(
  { id, label, hint, error, required, rows = 4, className, ...props },
  ref,
) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClasses(error), 'resize-y py-2.5 leading-relaxed', className)}
        {...props}
      />
    </Field>
  )
})
