import { useCallback, useEffect, useMemo, useState } from 'react'
import { SAMPLE_RESEARCH } from '../data/sampleResearch'
import { STORAGE_KEYS, readStorage, removeStorage, writeStorage } from '../utils/storage'
import { buildEntry } from '../utils/research'

/**
 * Owns the research collection and keeps it mirrored into localStorage.
 * UI components never touch persistence directly — they call these actions.
 */
export function useResearch() {
  const [entries, setEntries] = useState(() => {
    const saved = readStorage(STORAGE_KEYS.research, null)
    return Array.isArray(saved) ? saved : SAMPLE_RESEARCH
  })

  useEffect(() => {
    writeStorage(STORAGE_KEYS.research, entries)
  }, [entries])

  const addEntry = useCallback((values) => {
    const entry = buildEntry(values)
    setEntries((current) => [entry, ...current])
    return entry
  }, [])

  const updateEntry = useCallback((id, values) => {
    setEntries((current) =>
      current.map((entry) => (entry.id === id ? buildEntry(values, entry) : entry)),
    )
  }, [])

  const deleteEntry = useCallback((id) => {
    setEntries((current) => current.filter((entry) => entry.id !== id))
  }, [])

  /** Puts a deleted entry back exactly as it was (used by the undo toast). */
  const restoreEntry = useCallback((entry) => {
    if (!entry) return
    setEntries((current) =>
      current.some((item) => item.id === entry.id) ? current : [entry, ...current],
    )
  }, [])

  const toggleFavorite = useCallback((id) => {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, favorite: !entry.favorite } : entry,
      ),
    )
  }, [])

  const resetToSample = useCallback(() => {
    setEntries(SAMPLE_RESEARCH)
  }, [])

  const clearAll = useCallback(() => {
    setEntries([])
    removeStorage(STORAGE_KEYS.research)
  }, [])

  return useMemo(
    () => ({
      entries,
      addEntry,
      updateEntry,
      deleteEntry,
      restoreEntry,
      toggleFavorite,
      resetToSample,
      clearAll,
    }),
    [
      entries,
      addEntry,
      updateEntry,
      deleteEntry,
      restoreEntry,
      toggleFavorite,
      resetToSample,
      clearAll,
    ],
  )
}
