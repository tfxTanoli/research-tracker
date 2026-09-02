/** Presentation helpers — dates, URLs and small text formatting. */

const DAY = 1000 * 60 * 60 * 24

export function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatShortDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** "Today", "3 days ago", "Mar 9, 2026" — whichever reads best at that distance. */
export function formatRelative(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'

  const days = Math.floor((Date.now() - date.getTime()) / DAY)
  if (days < 0) return formatDate(value)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) {
    const weeks = Math.floor(days / 7)
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
  }
  if (days < 365) {
    const months = Math.floor(days / 30)
    return months === 1 ? '1 month ago' : `${months} months ago`
  }
  return formatDate(value)
}

/** Strips protocol and "www." so a source reads as a clean domain. */
export function getDomain(url) {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
  }
}

/** Accepts "react.dev" and stores it as a usable link. */
export function normalizeUrl(url) {
  const trimmed = (url || '').trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export function isValidUrl(url) {
  if (!url) return true // optional field
  try {
    const parsed = new URL(normalizeUrl(url))
    return Boolean(parsed.hostname) && parsed.hostname.includes('.')
  } catch {
    return false
  }
}

export function pluralize(count, singular, plural) {
  return count === 1 ? singular : (plural ?? `${singular}s`)
}

export function initialsOf(text = '') {
  return text
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}
