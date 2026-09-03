import { useCallback, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

const SIZES = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-xl',
  lg: 'sm:max-w-2xl',
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Accessible dialog: portalled, scroll-locked, Escape-closable, focus-trapped,
 * and full-height on phones so long forms stay usable with one hand.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  initialFocusRef,
}) {
  const panelRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter(
        (node) => node.offsetParent !== null,
      )
      if (!nodes.length) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return undefined

    const previouslyFocused = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      const target =
        initialFocusRef?.current ?? panelRef.current?.querySelector(FOCUSABLE) ?? panelRef.current
      target?.focus?.()
    }, 40)

    return () => {
      document.body.style.overflow = overflow
      window.clearTimeout(focusTimer)
      previouslyFocused?.focus?.()
    }
  }, [open, initialFocusRef])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-60 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        tabIndex={-1}
        onClick={onClose}
        className="animate-overlay-in absolute inset-0 cursor-default bg-scrim backdrop-blur-[2px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        onKeyDown={onKeyDown}
        className={cn(
          'animate-dialog-in relative flex max-h-[92dvh] w-full flex-col overflow-hidden bg-surface shadow-overlay',
          'rounded-t-xl sm:rounded-xl',
          SIZES[size],
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-3.5 sm:px-6">
          <div className="min-w-0">
            <h2 id={titleId} className="text-[14.5px] font-medium tracking-tight text-ink">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-1 text-[13px] leading-relaxed text-ink-faint">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-1.5 shrink-0 rounded-md p-1.5 text-ink-faint transition-colors hover:text-ink"
          >
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </header>

        <div className="scrollbar-slim flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>

        {footer && (
          <footer className="border-t border-line px-5 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-3.5">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body,
  )
}
