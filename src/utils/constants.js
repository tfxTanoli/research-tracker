/**
 * Shared vocabulary for the app: statuses, priorities, tags and sort options.
 * Badge classes live here so every surface renders a status the exact same way.
 */

export const STATUSES = [
  {
    value: 'Idea',
    label: 'Idea',
    badge: 'bg-[#fdf3e5] text-[#a4600b] border-[#f2ddbe]',
    dot: 'bg-[#d99a2b]',
  },
  {
    value: 'To Research',
    label: 'To Research',
    badge: 'bg-[#f1f2f5] text-[#4a4f59] border-[#e1e3ea]',
    dot: 'bg-[#8b909d]',
  },
  {
    value: 'In Progress',
    label: 'In Progress',
    badge: 'bg-[#eaf1fe] text-[#1d5fd0] border-[#d2e0fb]',
    dot: 'bg-[#3b7ae4]',
  },
  {
    value: 'Reviewing',
    label: 'Reviewing',
    badge: 'bg-[#f3eefe] text-[#6d28d9] border-[#e2d7fb]',
    dot: 'bg-[#8b5cf6]',
  },
  {
    value: 'Completed',
    label: 'Completed',
    badge: 'bg-[#e8f6f0] text-[#0f7a55] border-[#c9e8db]',
    dot: 'bg-[#12996b]',
  },
  {
    value: 'Archived',
    label: 'Archived',
    badge: 'bg-[#fafbfc] text-[#828895] border-[#e8eaef]',
    dot: 'bg-[#b3b8c2]',
  },
]

export const PRIORITIES = [
  {
    value: 'Low',
    label: 'Low',
    dot: 'bg-[#a9aeb9]',
    text: 'text-ink-faint',
    chip: 'bg-[#f4f5f7] text-[#5c626d] border-[#e4e6ec]',
    weight: 1,
  },
  {
    value: 'Medium',
    label: 'Medium',
    dot: 'bg-[#3b7ae4]',
    text: 'text-ink-soft',
    chip: 'bg-[#eaf1fe] text-[#1d5fd0] border-[#d2e0fb]',
    weight: 2,
  },
  {
    value: 'High',
    label: 'High',
    dot: 'bg-[#e08a1e]',
    text: 'text-ink-soft',
    chip: 'bg-[#fdf3e5] text-[#a4600b] border-[#f2ddbe]',
    weight: 3,
  },
  {
    value: 'Critical',
    label: 'Critical',
    dot: 'bg-[#d92d20]',
    text: 'text-ink-soft',
    chip: 'bg-[#fdeceb] text-[#b42318] border-[#f7d4d1]',
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
