import { useCallback, useEffect, useState } from 'react'
import { STORAGE_KEYS, readStorage, writeStorage } from '../utils/storage'

const DEFAULTS = {
  view: 'grid',
  sort: 'updated',
  density: 'comfortable',
}

/** Small, persisted UI preferences: default layout, sort order and density. */
export function usePreferences() {
  const [preferences, setPreferences] = useState(() => ({
    ...DEFAULTS,
    ...readStorage(STORAGE_KEYS.preferences, {}),
  }))

  useEffect(() => {
    writeStorage(STORAGE_KEYS.preferences, preferences)
  }, [preferences])

  const setPreference = useCallback((key, value) => {
    setPreferences((current) => ({ ...current, [key]: value }))
  }, [])

  const resetPreferences = useCallback(() => setPreferences(DEFAULTS), [])

  return { preferences, setPreference, resetPreferences }
}
