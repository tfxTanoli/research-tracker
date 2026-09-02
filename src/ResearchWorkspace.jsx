import { useCallback, useMemo, useState } from 'react'
import { AppLayout } from './layouts/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { ResearchLibrary } from './pages/ResearchLibrary'
import { SettingsPage } from './pages/SettingsPage'
import { TagsPage } from './pages/TagsPage'
import { AddResearchModal } from './components/research/AddResearchModal'
import { EditResearchModal } from './components/research/EditResearchModal'
import { DeleteConfirmationModal } from './components/research/DeleteConfirmationModal'
import { useResearch } from './hooks/useResearch'
import { usePreferences } from './hooks/usePreferences'
import { useToast } from './hooks/useToast'
import { getNavItem } from './data/navigation'
import { EMPTY_FILTERS, VIEW_SCOPES } from './utils/constants'
import { getStats, getTagUsage, queryResearch } from './utils/research'

/** Copy for the empty library state, per sidebar destination. */
const EMPTY_COPY = {
  all: {
    title: 'No research added yet',
    description: 'Save your first topic — the link, the notes and where you got to.',
  },
  'high-priority': {
    title: 'Nothing is high priority',
    description: 'Mark an entry High or Critical and it will surface here.',
  },
  'in-progress': {
    title: 'Nothing in progress',
    description: 'Move a topic to In Progress once you start reading through it.',
  },
  completed: {
    title: 'Nothing completed yet',
    description: 'Finished entries collect here so you can reference them later.',
  },
  archived: {
    title: 'Nothing archived',
    description: 'Archive a topic to park it without losing it.',
  },
}

export function ResearchWorkspace() {
  const {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    restoreEntry,
    toggleFavorite,
    resetToSample,
    clearAll,
  } = useResearch()
  const { preferences, setPreference } = usePreferences()
  const { toast } = useToast()

  const [activeView, setActiveView] = useState('dashboard')
  const [navOpen, setNavOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [dialog, setDialog] = useState({ mode: null, entry: null })

  const navItem = getNavItem(activeView)
  const scope = VIEW_SCOPES[activeView] ?? null

  const stats = useMemo(() => getStats(entries), [entries])
  const tagUsage = useMemo(() => getTagUsage(entries), [entries])
  const availableTags = useMemo(() => tagUsage.map((item) => item.tag), [tagUsage])

  const scopedEntries = useMemo(
    () => (scope ? queryResearch(entries, { scope }) : entries),
    [entries, scope],
  )

  const visibleEntries = useMemo(
    () => queryResearch(entries, { search, filters, scope, sort: preferences.sort }),
    [entries, search, filters, scope, preferences.sort],
  )

  /* ----------------------------- navigation ----------------------------- */

  const navigate = useCallback((view) => {
    setActiveView(view)
    setSearch('')
    setFilters(EMPTY_FILTERS)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const openFiltered = useCallback((key, value) => {
    setActiveView('all')
    setSearch('')
    setFilters({ ...EMPTY_FILTERS, [key]: [value] })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const toggleFilter = useCallback((key, value) => {
    setFilters((current) => {
      const selected = current[key]
      return {
        ...current,
        [key]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value],
      }
    })
  }, [])

  const clearFilters = useCallback(() => setFilters(EMPTY_FILTERS), [])

  /* ------------------------------- actions ------------------------------ */

  const closeDialog = useCallback(() => setDialog({ mode: null, entry: null }), [])

  const handleCreate = (values) => {
    const entry = addEntry(values)
    closeDialog()
    toast({
      variant: 'success',
      title: 'Research added',
      description: `“${entry.title}” is now in your library.`,
    })
  }

  const handleUpdate = (values) => {
    updateEntry(dialog.entry.id, values)
    closeDialog()
    toast({
      variant: 'success',
      title: 'Changes saved',
      description: `“${values.title.trim()}” has been updated.`,
    })
  }

  const handleDelete = (entry) => {
    deleteEntry(entry.id)
    closeDialog()
    toast({
      variant: 'info',
      title: 'Research deleted',
      description: `“${entry.title}” was removed.`,
      duration: 7000,
      action: {
        label: 'Undo',
        onClick: () => {
          restoreEntry(entry)
          toast({ variant: 'success', title: 'Entry restored' })
        },
      },
    })
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `research-tracker-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)

    toast({ variant: 'success', title: 'Export ready', description: 'Your library was downloaded as JSON.' })
  }

  /* -------------------------------- render ------------------------------ */

  const libraryProps = {
    entries: visibleEntries,
    scopedTotal: scopedEntries.length,
    stats,
    search,
    filters,
    onToggleFilter: toggleFilter,
    onClearFilters: clearFilters,
    onClearSearch: () => setSearch(''),
    availableTags,
    sort: preferences.sort,
    onSortChange: (value) => setPreference('sort', value),
    view: preferences.view,
    onViewChange: (value) => setPreference('view', value),
    onAdd: () => setDialog({ mode: 'add', entry: null }),
    onEdit: (entry) => setDialog({ mode: 'edit', entry }),
    onDelete: (entry) => setDialog({ mode: 'delete', entry }),
    onToggleFavorite: toggleFavorite,
    onSelectTag: (tag) => openFiltered('tags', tag),
  }

  const renderPage = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard
            entries={entries}
            stats={stats}
            tagUsage={tagUsage}
            onNavigate={navigate}
            onEdit={libraryProps.onEdit}
            onAdd={libraryProps.onAdd}
            onSelectTag={(tag) => openFiltered('tags', tag)}
            onSelectStatus={(status) => openFiltered('statuses', status)}
          />
        )

      case 'tags':
        return (
          <TagsPage
            tagUsage={tagUsage}
            entries={entries}
            search={search}
            onSelectTag={(tag) => openFiltered('tags', tag)}
          />
        )

      case 'settings':
        return (
          <SettingsPage
            entries={entries}
            preferences={preferences}
            onPreferenceChange={setPreference}
            onExport={handleExport}
            onReset={() => {
              resetToSample()
              toast({
                variant: 'success',
                title: 'Sample library restored',
                description: 'Twelve example research topics are back.',
              })
            }}
            onClearAll={() => {
              clearAll()
              toast({
                variant: 'info',
                title: 'Library cleared',
                description: 'All research entries were deleted from this browser.',
              })
            }}
          />
        )

      default:
        return (
          <ResearchLibrary
            {...libraryProps}
            showStats={activeView === 'all'}
            emptyTitle={EMPTY_COPY[activeView]?.title}
            emptyDescription={EMPTY_COPY[activeView]?.description}
          />
        )
    }
  }

  return (
    <>
      <AppLayout
        activeView={activeView}
        onNavigate={navigate}
        counts={stats}
        navOpen={navOpen}
        onOpenNav={() => setNavOpen(true)}
        onCloseNav={() => setNavOpen(false)}
        headerProps={{
          title: navItem.title,
          subtitle: navItem.subtitle,
          search,
          onSearchChange: setSearch,
          onAddResearch: libraryProps.onAdd,
          showSearch: activeView !== 'settings' && activeView !== 'dashboard',
        }}
      >
        <div key={activeView} className="animate-content-in">
          {renderPage()}
        </div>
      </AppLayout>

      <AddResearchModal
        open={dialog.mode === 'add'}
        onClose={closeDialog}
        onSave={handleCreate}
        availableTags={availableTags}
      />

      <EditResearchModal
        open={dialog.mode === 'edit'}
        entry={dialog.entry}
        onClose={closeDialog}
        onSave={handleUpdate}
        availableTags={availableTags}
      />

      <DeleteConfirmationModal
        open={dialog.mode === 'delete'}
        entry={dialog.entry}
        onClose={closeDialog}
        onConfirm={handleDelete}
      />
    </>
  )
}
