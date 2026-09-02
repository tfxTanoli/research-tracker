import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEYS, readStorage, writeStorage } from '../utils/storage'

/**
 * Theme state.
 *
 * `theme` is what the user chose — 'light', 'dark' or 'system'. `resolvedTheme`
 * is the concrete palette actually painted, which is the same thing unless the
 * choice is 'system'. Only the resolved value ever reaches the DOM:
 * `<html data-theme="light|dark">` is the single switch the CSS reads, so
 * index.css needs one dark palette block rather than a second copy behind a
 * `prefers-color-scheme` query.
 *
 * The attribute is set for the first time by the boot script in index.html, so
 * the right palette is on the page before React mounts and there is no flash.
 */

export const THEME_OPTIONS = [
  { value: 'system', label: 'Match system' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const THEME_VALUES = THEME_OPTIONS.map((option) => option.value)
const DEFAULT_THEME = 'system'

/** The colour behind the browser chrome on mobile, per resolved theme. */
const THEME_COLORS = { light: '#f6f7f9', dark: '#0e0f13' }

const DARK_QUERY = '(prefers-color-scheme: dark)'

const ThemeContext = createContext(null)

/** Defensive like utils/storage — a browser without matchMedia falls to light. */
function prefersDark() {
  try {
    return window.matchMedia(DARK_QUERY).matches
  } catch {
    return false
  }
}

function readTheme() {
  const stored = readStorage(STORAGE_KEYS.theme, DEFAULT_THEME)
  return THEME_VALUES.includes(stored) ? stored : DEFAULT_THEME
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readTheme)
  const [systemDark, setSystemDark] = useState(prefersDark)

  // Derived, not stored: one source of truth and no cascading render.
  const resolvedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme

  // Track the OS at all times so switching back to 'system' is already correct.
  useEffect(() => {
    let query
    try {
      query = window.matchMedia(DARK_QUERY)
    } catch {
      return undefined
    }

    const onChange = (event) => setSystemDark(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[resolvedTheme])
  }, [resolvedTheme])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.theme, theme)
  }, [theme])

  const setTheme = useCallback((value) => {
    setThemeState(THEME_VALUES.includes(value) ? value : DEFAULT_THEME)
  }, [])

  /** The header switch: always lands on the opposite of what is on screen. */
  const toggleTheme = useCallback(() => {
    setThemeState(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside a ThemeProvider')
  return context
}
