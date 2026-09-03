import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Logo } from './Logo'
import { SidebarNav } from './SidebarNav'
import { WorkspaceProfile } from './WorkspaceProfile'

/**
 * Slide-out navigation for tablet and phone. Locks the page behind it,
 * closes on Escape, and dismisses itself as soon as a destination is picked.
 */
export function MobileNavigation({ open, onClose, activeView, onNavigate, counts }) {
  useEffect(() => {
    if (!open) return undefined

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        tabIndex={-1}
        onClick={onClose}
        className="animate-overlay-in absolute inset-0 cursor-default bg-scrim backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        className="animate-sheet-in relative flex h-full w-[264px] max-w-[85vw] flex-col border-r border-line bg-canvas shadow-overlay"
      >
        <div className="flex h-14 shrink-0 items-center justify-between gap-3 px-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="-mr-1 rounded-md p-2 text-ink-faint transition-colors hover:text-ink"
          >
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>

        <div className="scrollbar-slim flex-1 overflow-y-auto px-2.5 py-2">
          <SidebarNav
            activeView={activeView}
            counts={counts}
            onNavigate={(view) => {
              onNavigate(view)
              onClose()
            }}
          />
        </div>

        <div className="shrink-0 px-2.5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <WorkspaceProfile />
        </div>
      </div>
    </div>,
    document.body,
  )
}
