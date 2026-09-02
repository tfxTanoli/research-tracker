import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { FORM_ID, ResearchForm } from './ResearchForm'

export function AddResearchModal({ open, onClose, onSave, availableTags }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title="Add research"
      description="Capture a topic now and fill in the details as you go."
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" size="lg" onClick={onClose} className="sm:h-9.5 sm:px-3.5">
            Cancel
          </Button>
          <Button
            type="submit"
            form={FORM_ID}
            variant="primary"
            size="lg"
            className="sm:h-9.5 sm:px-4"
          >
            Save research
          </Button>
        </div>
      }
    >
      <ResearchForm availableTags={availableTags} onSubmit={onSave} />
    </Modal>
  )
}
