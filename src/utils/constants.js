/**
 * Shared vocabulary for the app: statuses, priorities, tags and sort options.
 * Badge classes live here so every surface renders a status the exact same way,
 * and they name accent-family tokens rather than literal colours so both
 * themes are covered by the palette in index.css.
 */

export const STATUSES = [
  {
    value: 'Idea',
    label: 'Idea',
    badge: 'bg-accent-caution-soft text-accent-caution border-accent-caution-line',
    dot: 'bg-accent-caution-dot',
  },
  {
    value: 'To Research',
    label: 'To Research',
    badge: 'bg-accent-neutral-soft text-accent-neutral border-accent-neutral-line',
    dot: 'bg-accent-neutral-dot',
  },
  {
    value: 'In Progress',
    label: 'In Progress',
    badge: 'bg-accent-info-soft text-accent-info border-accent-info-line',
    dot: 'bg-accent-info-dot',
  },
  {
    value: 'Reviewing',
    label: 'Reviewing',
    badge: 'bg-accent-violet-soft text-accent-violet border-accent-violet-line',
    dot: 'bg-accent-violet-dot',
  },
  {
    value: 'Completed',
    label: 'Completed',
    badge: 'bg-accent-positive-soft text-accent-positive border-accent-positive-line',
    dot: 'bg-accent-positive-dot',
  },
  {
    value: 'Archived',
    label: 'Archived',
    badge: 'bg-accent-muted-soft text-accent-muted border-accent-muted-line',
    dot: 'bg-accent-muted-dot',
  },
]

export const PRIORITIES = [
  {
    value: 'Low',
    label: 'Low',
    dot: 'bg-accent-muted-dot',
    text: 'text-ink-faint',
    chip: 'bg-accent-neutral-soft text-accent-neutral border-accent-neutral-line',
    weight: 1,
  },
  {
    value: 'Medium',
    label: 'Medium',
    dot: 'bg-accent-info-dot',
    text: 'text-ink-soft',
    chip: 'bg-accent-info-soft text-accent-info border-accent-info-line',
    weight: 2,
  },
  {
    value: 'High',
    label: 'High',
    dot: 'bg-accent-caution-dot',
    text: 'text-ink-soft',
    chip: 'bg-accent-caution-soft text-accent-caution border-accent-caution-line',
    weight: 3,
  },
  {
    value: 'Critical',
    label: 'Critical',
    dot: 'bg-accent-danger-dot',
    text: 'text-ink-soft',
    chip: 'bg-accent-danger-soft text-accent-danger border-accent-danger-line',
    weight: 4,
  },
]

export const SOURCE_TYPES = [
  'Article',
  'Paper',
  'Documentation',
  'Video',
  'Report',
  'Book',
  'Podcast',
  'Repository',
]

/** Suggested tags — users can still type anything they like. */
export const TAG_LIBRARY = [
  'Artificial Intelligence',
  'React',
  'Productivity',
  'Market Research',
  'SaaS',
  'Design',
  'Psychology',
  'Business',
  'Development',
  'UX',
  'Engineering',
  'Remote Work',
]

export const SORT_OPTIONS = [
  { value: 'updated', label: 'Recently updated' },
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'priority', label: 'Priority: high to low' },
  { value: 'alphabetical', label: 'Alphabetical (A–Z)' },
]

export const STATUS_VALUES = STATUSES.map((s) => s.value)
export const PRIORITY_VALUES = PRIORITIES.map((p) => p.value)

const STATUS_MAP = Object.fromEntries(STATUSES.map((s) => [s.value, s]))
const PRIORITY_MAP = Object.fromEntries(PRIORITIES.map((p) => [p.value, p]))

export const getStatus = (value) => STATUS_MAP[value] ?? STATUS_MAP['To Research']
export const getPriority = (value) => PRIORITY_MAP[value] ?? PRIORITY_MAP.Medium

/** Filters each sidebar destination pins on top of the user's own filters. */
export const VIEW_SCOPES = {
  'high-priority': { priorities: ['High', 'Critical'] },
  'in-progress': { statuses: ['In Progress'] },
  completed: { statuses: ['Completed'] },
  archived: { statuses: ['Archived'] },
}

export const EMPTY_FILTERS = { statuses: [], priorities: [], tags: [] }
