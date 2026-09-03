/**
 * Shared vocabulary for the app: statuses, priorities, tags and sort options.
 * Badge classes live here so every surface renders a status the exact same way.
 *
 * There is one chip style for the whole app — a neutral hairline pill — and the
 * only thing that varies between values is a small dot placed on a grey ramp:
 * `step-*` for the research workflow, `level-*` for priority. That keeps a long
 * list monochrome while still giving each row something to scan by. The ramps
 * are tokens in index.css, so both themes are covered by the palette swap.
 */

const CHIP = 'bg-accent-neutral-soft text-accent-neutral border-accent-neutral-line'

export const STATUSES = [
  {
    value: 'Idea',
    label: 'Idea',
    badge: CHIP,
    dot: 'bg-step-1',
  },
  {
    value: 'To Research',
    label: 'To Research',
    badge: CHIP,
    dot: 'bg-step-2',
  },
  {
    value: 'In Progress',
    label: 'In Progress',
    badge: CHIP,
    dot: 'bg-step-3',
  },
  {
    value: 'Reviewing',
    label: 'Reviewing',
    badge: CHIP,
    dot: 'bg-step-4',
  },
  {
    value: 'Completed',
    label: 'Completed',
    badge: CHIP,
    dot: 'bg-step-5',
  },
  {
    value: 'Archived',
    label: 'Archived',
    badge: CHIP,
    dot: 'bg-step-0',
  },
]

export const PRIORITIES = [
  {
    value: 'Low',
    label: 'Low',
    dot: 'bg-level-1',
    text: 'text-ink-faint',
    chip: CHIP,
    weight: 1,
  },
  {
    value: 'Medium',
    label: 'Medium',
    dot: 'bg-level-2',
    text: 'text-ink-faint',
    chip: CHIP,
    weight: 2,
  },
  {
    value: 'High',
    label: 'High',
    dot: 'bg-level-3',
    text: 'text-ink-soft',
    chip: CHIP,
    weight: 3,
  },
  {
    value: 'Critical',
    label: 'Critical',
    dot: 'bg-level-4',
    text: 'text-ink',
    chip: CHIP,
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
