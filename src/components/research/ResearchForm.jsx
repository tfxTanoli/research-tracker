import { useState } from 'react'
import { Link2 } from 'lucide-react'
import { Input } from '../ui/Input'
import { TextArea } from '../ui/TextArea'
import { Select } from '../ui/Select'
import { TagInput } from './TagInput'
import {
  PRIORITY_VALUES,
  SOURCE_TYPES,
  STATUS_VALUES,
  TAG_LIBRARY,
} from '../../utils/constants'
import { isValidUrl, normalizeUrl } from '../../utils/format'

export const FORM_ID = 'research-form'

const EMPTY_VALUES = {
  title: '',
  description: '',
  url: '',
  notes: '',
  tags: [],
  priority: 'Medium',
  status: 'Idea',
  sourceType: 'Article',
  readingTime: '',
}

const toFormValues = (entry) =>
  entry
    ? {
        title: entry.title ?? '',
        description: entry.description ?? '',
        url: entry.url ?? '',
        notes: entry.notes ?? '',
        tags: entry.tags ?? [],
        priority: entry.priority ?? 'Medium',
        status: entry.status ?? 'Idea',
        sourceType: entry.sourceType ?? 'Article',
        readingTime: entry.readingTime ? String(entry.readingTime) : '',
      }
    : { ...EMPTY_VALUES }

function validate(values) {
  const errors = {}

  const title = values.title.trim()
  if (!title) errors.title = 'A research topic is required.'
  else if (title.length < 3) errors.title = 'Give this topic at least 3 characters.'
  else if (title.length > 120) errors.title = 'Keep the topic under 120 characters.'

  if (values.description.length > 240) {
    errors.description = 'Descriptions read best under 240 characters.'
  }

  if (values.url.trim() && !isValidUrl(values.url)) {
    errors.url = 'Enter a valid link, for example research.dev/article.'
  }

  if (values.readingTime && (Number(values.readingTime) < 0 || Number(values.readingTime) > 999)) {
    errors.readingTime = 'Enter a realistic number of minutes.'
  }

  return errors
}

/**
 * Shared add/edit form. Validation runs on submit, then live per-field once a
 * field has already been flagged, so the form never nags while typing.
 */
export function ResearchForm({ initialEntry, availableTags = [], onSubmit }) {
  const [values, setValues] = useState(() => toFormValues(initialEntry))
  const [errors, setErrors] = useState({})

  const suggestions = [...new Set([...availableTags, ...TAG_LIBRARY])].sort((a, b) =>
    a.localeCompare(b),
  )

  const setField = (field) => (event) => {
    const next = event?.target ? event.target.value : event
    setValues((current) => ({ ...current, [field]: next }))

    if (errors[field]) {
      setErrors((current) => {
        const { [field]: _removed, ...rest } = current
        return rest
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      const firstField = Object.keys(nextErrors)[0]
      document.getElementById(`field-${firstField}`)?.focus()
      return
    }

    onSubmit({ ...values, url: normalizeUrl(values.url) })
  }

  return (
    <form id={FORM_ID} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Input
        id="field-title"
        label="Research topic"
        required
        placeholder="e.g. Retrieval strategies for product search"
        value={values.title}
        onChange={setField('title')}
        error={errors.title}
        autoComplete="off"
      />

      <Input
        id="field-description"
        label="Description"
        hint="Optional"
        placeholder="One line on why this matters"
        value={values.description}
        onChange={setField('description')}
        error={errors.description}
        autoComplete="off"
      />

      <Input
        id="field-url"
        label="Source URL"
        hint="Optional"
        icon={Link2}
        type="url"
        inputMode="url"
        placeholder="https://example.com/article"
        value={values.url}
        onChange={setField('url')}
        error={errors.url}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          id="field-status"
          label="Status"
          value={values.status}
          onChange={setField('status')}
          options={STATUS_VALUES}
        />
        <Select
          id="field-priority"
          label="Priority"
          value={values.priority}
          onChange={setField('priority')}
          options={PRIORITY_VALUES}
        />
        <Select
          id="field-sourceType"
          label="Source type"
          value={values.sourceType}
          onChange={setField('sourceType')}
          options={SOURCE_TYPES}
        />
        <Input
          id="field-readingTime"
          label="Reading time"
          hint="Minutes"
          type="number"
          min="0"
          max="999"
          inputMode="numeric"
          placeholder="15"
          value={values.readingTime}
          onChange={setField('readingTime')}
          error={errors.readingTime}
        />
      </div>

      <TagInput
        id="field-tags"
        value={values.tags}
        onChange={setField('tags')}
        suggestions={suggestions}
      />

      <TextArea
        id="field-notes"
        label="Notes"
        hint="Optional"
        rows={6}
        placeholder="Findings, quotes, open questions, next steps…"
        value={values.notes}
        onChange={setField('notes')}
      />
    </form>
  )
}
