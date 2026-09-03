import { useRef } from 'react'
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
           
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="lg"
            onClick={() => onConfirm(entry)}
          >
            Delete
          </Button>
        </div>
      }
    >
      <p className="text-[13.5px] leading-relaxed text-ink-soft">
        <span className="font-medium text-ink">{entry.title}</span> and its notes will be removed.
        You can undo this straight after.
      </p>
    </Modal>
  )
}
