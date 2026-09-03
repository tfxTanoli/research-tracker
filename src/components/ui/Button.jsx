import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const VARIANTS = {
  primary:
    'bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-hover disabled:bg-brand-muted',
  secondary:
    'bg-surface text-ink border border-line hover:bg-surface-muted hover:border-line-strong',
  ghost: 'text-ink-soft hover:text-ink',
  subtle: 'bg-surface-sunken text-ink-soft hover:text-ink',
  danger: 'bg-danger text-white hover:bg-danger-hover',
  'danger-outline':
    'bg-surface text-danger border border-danger-line hover:bg-danger-soft hover:border-danger',
}

const SIZES = {
  sm: 'h-7 px-2 text-[12.5px] gap-1.5 rounded-md',
  md: 'h-9 px-3 text-[13px] gap-2 rounded-md',
  lg: 'h-10 px-4 text-[13.5px] gap-2 rounded-md',
  icon: 'h-9 w-9 rounded-md justify-center',
  'icon-sm': 'h-7 w-7 rounded-md justify-center',
}

/** The single button primitive — every clickable action in the app uses it. */
export const Button = forwardRef(function Button(
  { variant = 'secondary', size = 'md', className, type = 'button', fullWidth, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex shrink-0 select-none items-center font-medium transition-colors duration-150',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full justify-center',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})
