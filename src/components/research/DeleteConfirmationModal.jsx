import { useRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

export function DeleteConfirmationModal({ open, entry, onClose, onConfirm }) {
  const cancelRef = useRef(null)

  if (!entry) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title="Delete this research entry?"
      initialFocusRef={cancelRef}
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
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
            variant="danger"
            size="lg"
            onClick={() => onConfirm(entry)}
            className="sm:h-9.5 sm:px-4"
          >
            Delete
          </Button>
        </div>
      }
    >
      <div className="flex gap-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-danger-soft text-danger">
          <AlertTriangle className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">{entry.title}</span> and its notes will be
            removed from your library.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-faint">
            You can undo this straight after, from the notification.
          </p>
        </div>
      </div>
    </Modal>
  )
}
