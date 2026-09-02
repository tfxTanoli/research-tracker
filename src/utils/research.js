import { getPriority } from './constants'

/** Pure query logic: search, filter, sort and summarise research entries. */

const matchesQuery = (entry, query) => {
  if (!query) return true
  const needle = query.trim().toLowerCase()
  if (!needle) return true

  const haystack = [
    entry.title,
    entry.description,
    entry.notes,
    entry.sourceType,
    ...(entry.tags || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return haystack.includes(needle)
}

const matchesFilters = (entry, filters) => {
  const { statuses = [], priorities = [], tags = [] } = filters || {}

  if (statuses.length && !statuses.includes(entry.status)) return false
  if (priorities.length && !priorities.includes(entry.priority)) return false
  if (tags.length && !tags.some((tag) => (entry.tags || []).includes(tag))) return false

  return true
}

const SORTERS = {
  updated: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  priority: (a, b) =>
    getPriority(b.priority).weight - getPriority(a.priority).weight ||
    new Date(b.updatedAt) - new Date(a.updatedAt),
  alphabetical: (a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }),
}

/**
 * Applies a view scope (from the sidebar), the user's filters, the search
 * query and the active sort — in that order.
 */
export function queryResearch(entries, { search = '', filters, scope, sort = 'updated' } = {}) {
  const scoped = scope ? entries.filter((entry) => matchesFilters(entry, scope)) : entries

  const result = scoped
    .filter((entry) => matchesFilters(entry, filters))
    .filter((entry) => matchesQuery(entry, search))

  return [...result].sort(SORTERS[sort] ?? SORTERS.updated)
}

export function getStats(entries) {
  const total = entries.length
  const byStatus = (status) => entries.filter((e) => e.status === status).length
  const completed = byStatus('Completed')

  return {
    total,
    inProgress: byStatus('In Progress'),
    reviewing: byStatus('Reviewing'),
    idea: byStatus('Idea'),
    toResearch: byStatus('To Research'),
    archived: byStatus('Archived'),
    completed,
    highPriority: entries.filter((e) => e.priority === 'High' || e.priority === 'Critical').length,
    favorites: entries.filter((e) => e.favorite).length,
    completionRate: total ? Math.round((completed / total) * 100) : 0,
    activeCount: entries.filter((e) => e.status !== 'Archived' && e.status !== 'Completed').length,
  }
}

/** Every tag in use, with counts, most-used first. */
export function getTagUsage(entries) {
  const counts = new Map()
  entries.forEach((entry) => {
    ;(entry.tags || []).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1))
  })

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

export function getStatusBreakdown(entries) {
  const counts = new Map()
  entries.forEach((entry) => counts.set(entry.status, (counts.get(entry.status) || 0) + 1))
  return counts
}

/** Sanitises whatever the form produced into a storable entry. */
export function buildEntry(values, existing) {
  const now = new Date().toISOString()

  return {
    id: existing?.id ?? `res-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    title: values.title.trim(),
    description: values.description.trim(),
    notes: values.notes.trim(),
    url: values.url.trim(),
    tags: [...new Set((values.tags || []).map((tag) => tag.trim()).filter(Boolean))],
    priority: values.priority,
    status: values.status,
    sourceType: values.sourceType || 'Article',
    readingTime: Number(values.readingTime) > 0 ? Number(values.readingTime) : null,
    favorite: existing?.favorite ?? false,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  }
}
