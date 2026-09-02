import { useMemo, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { TagBadge } from '../ui/TagBadge'
import { Field, controlClasses } from '../ui/Field'
import { useClickOutside } from '../../hooks/useClickOutside'
import { cn } from '../../utils/cn'

const MAX_TAGS = 8

/**
 * Multi-tag entry with suggestions. Enter or comma commits a tag, Backspace on
 * an empty field removes the last one.
 */
export function TagInput({ id, value, onChange, suggestions = [], error }) {
  const [draft, setDraft] = useState('')
  const [focused, setFocused] = useState(false)
  const containerRef = useRef(null)

  useClickOutside(containerRef, () => setFocused(false), focused)

  const matches = useMemo(() => {
    const needle = draft.trim().toLowerCase()
    return suggestions
      .filter((tag) => !value.includes(tag))
      .filter((tag) => !needle || tag.toLowerCase().includes(needle))
      .slice(0, 6)
  }, [draft, suggestions, value])

  const addTag = (tag) => {
    const clean = tag.trim()
    if (!clean || value.includes(clean) || value.length >= MAX_TAGS) return
    onChange([...value, clean])
    setDraft('')
  }

  const removeTag = (tag) => onChange(value.filter((item) => item !== tag))

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTag(draft)
      return
    }
    if (event.key === 'Backspace' && !draft && value.length) {
      removeTag(value[value.length - 1])
    }
  }

  return (
    <Field
      id={id}
      label="Tags"
      hint={`${value.length}/${MAX_TAGS}`}
      error={error}
    >
      <div ref={containerRef} className="relative">
        <div className={cn(controlClasses(error), 'flex flex-wrap items-center gap-1.5 px-2 py-2')}>
          {value.map((tag) => (
            <TagBadge key={tag} tag={tag} onRemove={() => removeTag(tag)} />
          ))}

          <input
            id={id}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            disabled={value.length >= MAX_TAGS}
            placeholder={
              value.length >= MAX_TAGS
                ? 'Tag limit reached'
                : value.length
                  ? 'Add another…'
                  : 'Type a tag and press Enter'
            }
            className="h-6 min-w-[140px] flex-1 border-0 bg-transparent px-1 text-[13.5px] outline-none placeholder:text-ink-faint disabled:cursor-not-allowed"
          />
        </div>

        {focused && (matches.length > 0 || draft.trim()) && (
          <div className="animate-pop-in scrollbar-slim absolute z-20 mt-1.5 max-h-52 w-full overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-pop">
            {draft.trim() && !suggestions.includes(draft.trim()) && !value.includes(draft.trim()) && (
              <button
                type="button"
                onClick={() => addTag(draft)}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium text-ink-soft transition-colors hover:bg-surface-sunken hover:text-ink"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                Create “{draft.trim()}”
              </button>
            )}

            {matches.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => addTag(tag)}
                className="flex w-full items-center rounded-lg px-2.5 py-2 text-left text-[13px] font-medium text-ink-soft transition-colors hover:bg-surface-sunken hover:text-ink"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </Field>
  )
}
