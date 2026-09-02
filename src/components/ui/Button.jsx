import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const VARIANTS = {
  primary:
    'bg-brand text-white shadow-sm hover:bg-brand-hover active:bg-brand-hover disabled:bg-brand/50',
  secondary:
    'bg-surface text-ink border border-line shadow-xs hover:bg-surface-muted hover:border-line-strong',
  ghost: 'text-ink-soft hover:bg-surface-sunken hover:text-ink',
  subtle: 'bg-surface-sunken text-ink-soft hover:bg-line hover:text-ink',
  danger: 'bg-danger text-white shadow-sm hover:bg-[#9a1d13]',
  'danger-outline':
    'bg-surface text-danger border border-[#f0c9c5] hover:bg-danger-soft hover:border-[#e5aca6]',
}

const SIZES = {
  sm: 'h-8 px-2.5 text-[13px] gap-1.5 rounded-lg',
  md: 'h-10 px-3.5 text-[13px] gap-2 rounded-lg sm:h-9.5',
  lg: 'h-11 px-5 text-sm gap-2 rounded-xl',
  icon: 'h-10 w-10 rounded-lg justify-center sm:h-9 sm:w-9',
  'icon-sm': 'h-8 w-8 rounded-lg justify-center',
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
        'inline-flex shrink-0 select-none items-center font-semibold transition-all duration-150',
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
