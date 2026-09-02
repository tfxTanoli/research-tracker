import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { FORM_ID, ResearchForm } from './ResearchForm'
import { formatDate } from '../../utils/format'

export function EditResearchModal({ open, entry, onClose, onSave, availableTags }) {
  if (!entry) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title="Edit research"
      description={`Created ${formatDate(entry.createdAt)} · Last updated ${formatDate(entry.updatedAt)}`}
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
            Save changes
          </Button>
        </div>
      }
    >
      <ResearchForm
        key={entry.id}
        initialEntry={entry}
        availableTags={availableTags}
        onSubmit={onSave}
      />
    </Modal>
  )
}
