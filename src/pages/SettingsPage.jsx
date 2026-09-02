import { useState } from 'react'
import { Database, Download, RotateCcw, Trash2 } from 'lucide-react'
import { Panel } from '../components/ui/Panel'
import { Button } from '../components/ui/Button'
import { Select } from '../components/ui/Select'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { WorkspaceProfile } from '../components/layout/WorkspaceProfile'
import { SORT_OPTIONS } from '../utils/constants'
import { STORAGE_KEYS } from '../utils/storage'
import { pluralize } from '../utils/format'

const VIEW_OPTIONS = [
  { value: 'grid', label: 'Grid — cards' },
  { value: 'table', label: 'Table — dense rows' },
]

function SettingRow({ title, description, children }) {
  return (
    <div className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <p className="text-[13.5px] font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-faint">{description}</p>
      </div>
      <div className="shrink-0 sm:w-56">{children}</div>
    </div>
  )
}

export function SettingsPage({ entries, preferences, onPreferenceChange, onReset, onClearAll, onExport }) {
  const [confirm, setConfirm] = useState(null)

  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <Panel title="Workspace" description="This build runs without accounts or sign-in.">
        <WorkspaceProfile className="border-line-soft bg-surface-muted shadow-none" />
        <p className="mt-3 text-[12.5px] leading-relaxed text-ink-faint">
          Everything you save stays on this device, in this browser. Nothing is sent anywhere.
        </p>
      </Panel>

      <Panel title="Preferences" description="Applied the next time the library opens.">
        <div className="divide-y divide-line-soft">
          <SettingRow
            title="Default layout"
            description="How the research library is laid out when you arrive."
          >
            <Select
              id="pref-view"
              value={preferences.view}
              onChange={(event) => onPreferenceChange('view', event.target.value)}
              options={VIEW_OPTIONS}
            />
          </SettingRow>

          <SettingRow title="Default sort" description="The order entries appear in by default.">
            <Select
              id="pref-sort"
              value={preferences.sort}
              onChange={(event) => onPreferenceChange('sort', event.target.value)}
              options={SORT_OPTIONS}
            />
          </SettingRow>
        </div>
      </Panel>

      <Panel title="Data" description="Local storage — export or reset your library.">
        <div className="flex items-center gap-3 rounded-lg border border-line-soft bg-surface-muted p-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-ink-soft shadow-xs">
            <Database className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-ink">
              {entries.length} {pluralize(entries.length, 'entry', 'entries')} saved
            </p>
            <p className="truncate text-[12px] text-ink-faint">
              Stored under <code className="font-mono">{STORAGE_KEYS.research}</code>
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button variant="secondary" size="lg" onClick={onExport} className="sm:h-9.5 sm:px-3.5">
            <Download className="h-4 w-4" aria-hidden="true" />
            Export as JSON
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => setConfirm('reset')}
            className="sm:h-9.5 sm:px-3.5"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Restore sample library
          </Button>

          <Button
            variant="danger-outline"
            size="lg"
            onClick={() => setConfirm('clear')}
            className="sm:h-9.5 sm:px-3.5"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete all research
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
        message="Your current entries will be replaced with the twelve sample research topics this app ships with. This cannot be undone."
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
