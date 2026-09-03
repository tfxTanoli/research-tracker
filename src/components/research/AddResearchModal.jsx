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
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" size="lg" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form={FORM_ID} variant="primary" size="lg">
            Save research
          </Button>
        </div>
      }
    >
      <ResearchForm availableTags={availableTags} onSubmit={onSave} />
    </Modal>
  )
}
