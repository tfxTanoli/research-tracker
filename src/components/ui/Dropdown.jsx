import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'

const GAP = 6

/**
 * Popover menu used for sorting, filters and row actions.
 *
 * The panel is portalled and positioned with fixed coordinates so it is never
 * clipped by a scrolling ancestor — the research table in particular scrolls
 * horizontally, which would otherwise cut its own row menus off.
 */
export function Dropdown({ trigger, children, align = 'right', className, label = 'Menu' }) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  const place = useCallback(() => {
    const anchor = triggerRef.current
    if (!anchor) return

    const rect = anchor.getBoundingClientRect()
    const menuHeight = menuRef.current?.offsetHeight ?? 240
    const openUpward = rect.bottom + menuHeight + GAP > window.innerHeight && rect.top > menuHeight

    setPosition({
      top: openUpward ? undefined : rect.bottom + GAP,
      bottom: openUpward ? window.innerHeight - rect.top + GAP : undefined,
      left: align === 'left' ? rect.left : undefined,
      right: align === 'right' ? window.innerWidth - rect.right : undefined,
      maxHeight: openUpward ? rect.top - GAP * 2 : window.innerHeight - rect.bottom - GAP * 2,
    })
  }, [align])

  useLayoutEffect(() => {
    if (open) place()
  }, [open, place])

  useEffect(() => {
    if (!open) return undefined

    const close = () => setOpen(false)
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.querySelector('button')?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (triggerRef.current?.contains(event.target)) return
      if (menuRef.current?.contains(event.target)) return
      setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    window.addEventListener('resize', close)
    window.addEventListener('scroll', close, true)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      window.removeEventListener('resize', close)
      window.removeEventListener('scroll', close, true)
    }
  }, [open])

  return (
    <>
      <div ref={triggerRef} className="inline-flex" onClick={() => setOpen((value) => !value)}>
        {typeof trigger === 'function' ? trigger({ open }) : trigger}
      </div>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-label={label}
            style={{ ...position, position: 'fixed' }}
            onClick={(event) => {
              // Items opt out of auto-close with data-keep-open (e.g. checkboxes).
              if (event.target.closest('[data-keep-open]')) return
              setOpen(false)
            }}
            className={cn(
              'animate-pop-in scrollbar-slim z-[65] min-w-[196px] overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-pop',
              className,
            )}
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  )
}

export function DropdownItem({ icon: Icon, children, selected, tone = 'default', ...props }) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors',
        tone === 'danger'
          ? 'text-danger hover:bg-danger-soft'
          : 'text-ink-soft hover:bg-surface-sunken hover:text-ink',
        selected && tone !== 'danger' && 'bg-brand-soft text-brand hover:bg-brand-soft',
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span className="flex-1 truncate">{children}</span>
    </button>
  )
}

export function DropdownLabel({ children }) {
  return (
    <p className="px-2.5 pt-1.5 pb-1 text-[11px] font-semibold tracking-wider text-ink-faint uppercase">
      {children}
    </p>
  )
}

export function DropdownSeparator() {
  return <div className="my-1.5 h-px bg-line-soft" />
}
