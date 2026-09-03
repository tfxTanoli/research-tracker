import { useState } from 'react'
import { Download, RotateCcw, Trash2 } from 'lucide-react'
import { Panel } from '../components/ui/Panel'
import { Button } from '../components/ui/Button'
import { Select } from '../components/ui/Select'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { useTheme, THEME_OPTIONS } from '../hooks/useTheme'
import { SORT_OPTIONS } from '../utils/constants'
import { pluralize } from '../utils/format'

const VIEW_OPTIONS = [
  { value: 'grid', label: 'Grid' },
  { value: 'table', label: 'Table' },
]

/** A label and its control, one per row. The explanatory sub-line is gone. */
function SettingRow({ title, children }) {
  return (
    <div className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p className="min-w-0 text-[13.5px] text-ink">{title}</p>
      <div className="shrink-0 sm:w-52">{children}</div>
    </div>
  )
}

export function SettingsPage({ entries, preferences, onPreferenceChange, onReset, onClearAll, onExport }) {
  const [confirm, setConfirm] = useState(null)
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <Panel title="Preferences">
        <div className="divide-y divide-line">
          <SettingRow title="Theme">
            <Select
              id="pref-theme"
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              options={THEME_OPTIONS}
            />
          </SettingRow>

          <SettingRow title="Default layout">
            <Select
              id="pref-view"
              value={preferences.view}
              onChange={(event) => onPreferenceChange('view', event.target.value)}
              options={VIEW_OPTIONS}
            />
          </SettingRow>

          <SettingRow title="Default sort">
            <Select
              id="pref-sort"
              value={preferences.sort}
              onChange={(event) => onPreferenceChange('sort', event.target.value)}
              options={SORT_OPTIONS}
            />
          </SettingRow>
        </div>
      </Panel>

      <Panel title="Data">
        <p className="text-[13px] text-ink-faint">
          {entries.length} {pluralize(entries.length, 'entry', 'entries')} saved in this browser.
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button variant="secondary" onClick={onExport}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Export JSON
          </Button>

          <Button variant="secondary" onClick={() => setConfirm('reset')}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Restore samples
          </Button>

          <Button variant="danger-outline" onClick={() => setConfirm('clear')}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete all
          </Button>
        </div>
      </Panel>

      <ConfirmDialog
        open={confirm === 'reset'}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          onReset()
          setConfirm(null)
        }}
        title="Restore the sample library?"
        message="Your current entries will be replaced with the sample research topics. This cannot be undone."
        confirmLabel="Restore samples"
      />

      <ConfirmDialog
        open={confirm === 'clear'}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          onClearAll()
          setConfirm(null)
        }}
        title="Delete all research?"
        message="Every entry and its notes will be removed from this browser. Export a copy first if you might want it back."
        confirmLabel="Delete everything"
      />
    </div>
  )
}
