import { useRef } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'

/** Generic confirm step for destructive, non-entry actions (see Settings). */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  tone = 'danger',
}) {
  const cancelRef = useRef(null)

  return (
    <Modal open={open} onClose={onClose} size="sm" title={title} initialFocusRef={cancelRef}>
      <p className="text-[13.5px] leading-relaxed text-ink-soft">{message}</p>

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          ref={cancelRef}
          variant="secondary"
          size="lg"
          onClick={onClose}
          className="sm:h-9.5 sm:px-3.5"
        >
          Cancel
        </Button>
        <Button
          variant={tone === 'danger' ? 'danger' : 'primary'}
          size="lg"
          onClick={onConfirm}
          className="sm:h-9.5 sm:px-4"
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
