/**
 * The only place that talks to localStorage.
 * Every read is defensive: private-mode browsers and corrupted values must not
 * take the app down, so a failure simply falls back to the provided default.
 */

export const STORAGE_KEYS = {
  research: 'research-tracker:entries:v1',
  preferences: 'research-tracker:preferences:v1',
}

export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeStorage(key) {
  try {
    window.localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}
