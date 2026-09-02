import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { cn } from '../../utils/cn'

const VARIANTS = {
  success: { icon: CheckCircle2, tone: 'text-positive' },
  error: { icon: AlertTriangle, tone: 'text-danger' },
  info: { icon: Info, tone: 'text-info' },
}

function Toast({ toast, onDismiss }) {
  const { icon: Icon, tone } = VARIANTS[toast.variant] ?? VARIANTS.info

  return (
    <li
      className={cn(
        'animate-toast-in pointer-events-auto flex w-full items-start gap-3 rounded-xl border',
        'border-line bg-surface p-3.5 shadow-pop sm:w-[360px]',
      )}
    >
      <Icon className={cn('mt-0.5 h-[18px] w-[18px] shrink-0', tone)} aria-hidden="true" />

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-ink">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-[13px] leading-relaxed text-ink-faint">{toast.description}</p>
        )}
        {toast.action && (
          <button
            type="button"
            onClick={() => {
              toast.action.onClick()
              onDismiss(toast.id)
            }}
            className="mt-2 rounded-md text-[13px] font-semibold text-brand transition-colors hover:text-brand-hover"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="-m-1 rounded-md p-1 text-ink-faint transition-colors hover:bg-surface-sunken hover:text-ink"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </li>
  )
}

export function ToastViewport({ toasts, onDismiss }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end sm:px-0"
    >
      <ul className="flex w-full max-w-[400px] flex-col gap-2 sm:w-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </ul>
    </div>
  )
}
