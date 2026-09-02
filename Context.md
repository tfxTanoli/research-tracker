# Context

Working context for the **Research Tracker** project — what it is, how it is put
together, why it is built this way, and what state it is in. Update this file as
the project evolves.

_Last updated: 2 September 2026._

---

## 1. Project summary

A personal research management web application. Users collect research topics,
attach a source link and notes, tag them, set a priority and a status, and then
search, filter and sort their way back to anything they saved.

The product target is a calm, premium productivity tool — the reference points are
Notion, Linear, Raycast and Airtable in *feel*, not in copied visuals: neutral
canvas, white cards, soft borders, restrained colour, strong typographic hierarchy.

## 2. Scope and constraints

**In scope (this build)**

- Full CRUD over research entries, entirely on the frontend
- Search, filtering, sorting, two layouts, dashboard, tags, settings
- `localStorage` persistence, seeded with sample data
- Responsive design from 320px through desktop
- Accessibility: semantics, labels, focus management, ARIA, reduced motion

**Explicitly out of scope**

- No backend, REST/GraphQL API, or serverless functions
- No Firebase, Supabase, MongoDB, PostgreSQL, or any external database
- No authentication — the profile in the sidebar is a static placeholder
- No client-side router; navigation is component state (see §6)

## 3. Tech stack

| Concern    | Choice                                    |
| ---------- | ----------------------------------------- |
| Framework  | React 19                                  |
| Build tool | Vite 8 (`@vitejs/plugin-react`)           |
| Language   | JavaScript (JSX) — no TypeScript          |
| Styling    | Tailwind CSS 4 via `@tailwindcss/vite`    |
| Icons      | `lucide-react`                            |
| Linting    | `oxlint` (from the Vite scaffold)         |
| State      | React hooks + `localStorage`              |

Tailwind 4 is configured entirely in CSS — there is **no `tailwind.config.js`**.
Design tokens are declared in the `@theme` block of `src/index.css` and become
utilities automatically (`--color-brand` → `bg-brand`, `text-brand`, …).

## 4. Design system

Tokens live in `src/index.css`:

- **Surfaces** — `canvas` (page), `surface` (cards), `surface-muted`,
  `surface-sunken`
- **Lines** — `line`, `line-soft`, `line-strong`
- **Text** — `ink`, `ink-soft`, `ink-faint`
- **Brand** — indigo `brand`, `brand-hover`, `brand-soft`, `brand-line`
- **Semantic** — `positive`, `caution`, `danger`, `info`, each with a `-soft` pair
- **Elevation** — `shadow-card`, `shadow-raised`, `shadow-pop`, `shadow-overlay`
- **Motion** — six short keyframes (`animate-dialog-in`, `animate-sheet-in`,
  `animate-toast-in`, …), all suppressed under `prefers-reduced-motion`

Status and priority colours are **not** ad-hoc per component. They are declared once
in `src/utils/constants.js` alongside each value, so a status renders identically in
a card, a table row, a filter chip and the dashboard breakdown.

Priority is deliberately quiet — a small coloured dot plus a neutral label — so the
library does not become a wall of colour. Only filter chips use the tinted variant.

## 5. Architecture

```
main.jsx
└── App.jsx                    providers only (ToastProvider)
    └── ResearchWorkspace.jsx  all application state + page selection
        └── layouts/AppLayout  sidebar · mobile drawer · header · main
            └── pages/*        Dashboard · ResearchLibrary · TagsPage · SettingsPage
```

**Layering rule:** components render, hooks own state, utils are pure, and only
`utils/storage.js` touches `localStorage`. No component reads or writes storage
directly.

- `hooks/useResearch.js` — the research collection and every CRUD action
  (`addEntry`, `updateEntry`, `deleteEntry`, `restoreEntry`, `toggleFavorite`,
  `resetToSample`, `clearAll`), mirrored to storage by a single effect
- `hooks/usePreferences.js` — persisted layout and sort defaults
- `hooks/useToast.jsx` — toast context and provider
- `utils/research.js` — pure `queryResearch`, `getStats`, `getTagUsage`,
  `buildEntry`; all searching, filtering, sorting and summarising lives here and is
  independently testable

## 6. Key decisions

**No router.** Eight destinations, no deep linking requirement, and a static host
target. State-driven navigation means no `_redirects` / rewrite configuration and no
404 on refresh. If deep links or shareable filter URLs are ever needed, swap
`activeView` for React Router — the page components already take plain props.

**Sidebar views are filter scopes.** "High Priority", "In Progress", "Completed" and
"Archived" are not separate pages; they are preset filters (`VIEW_SCOPES`) applied
underneath the user's own filters by the same `queryResearch` call. Switching
destinations resets search and filters so a scope can never contradict a filter and
strand the user on an empty screen.

**One dialog primitive.** `ui/Modal.jsx` handles the portal, scroll lock, Escape,
focus restore and Tab trapping. Add, edit, delete and the settings confirmations all
build on it, so dialog behaviour cannot drift between them.

**Dropdowns are portalled and fixed-positioned.** The research table scrolls
horizontally on narrow screens; a normally-positioned menu inside it would be
clipped by that scroll container. `ui/Dropdown.jsx` measures its trigger, portals to
`document.body`, and flips upward when there is not enough room below.

**Delete is reversible.** The confirmation dialog is the guard, and the toast that
follows offers Undo for seven seconds via `restoreEntry` — safer than a confirm
step alone, without adding a trash-bin concept.

**Layout preference is a preference, not session state.** Toggling grid/table in the
library writes straight to `usePreferences`, which is what Settings displays and
edits. One source of truth, and it survives a refresh.

## 7. Data model

```js
{
  id: 'res-001',
  title: 'Future of Generative AI in Software Development',
  description: 'Short summary line',
  notes: 'Long-form findings…',
  url: 'https://…',
  tags: ['Artificial Intelligence', 'Development'],
  priority: 'Low' | 'Medium' | 'High' | 'Critical',
  status: 'Idea' | 'To Research' | 'In Progress' | 'Reviewing' | 'Completed' | 'Archived',
  sourceType: 'Article' | 'Paper' | 'Documentation' | 'Video' | 'Report' | 'Book' | 'Podcast' | 'Repository',
  readingTime: 22,      // minutes, nullable
  favorite: false,
  createdAt: '2026-06-14T09:20:00.000Z',
  updatedAt: '2026-08-28T16:45:00.000Z',
}
```

`buildEntry()` in `utils/research.js` is the only place entries are constructed — it
trims strings, de-duplicates tags, preserves `id`/`createdAt`/`favorite` on edit, and
stamps `updatedAt`.

## 8. Persistence

| Key                              | Contents                     |
| -------------------------------- | ---------------------------- |
| `research-tracker:entries:v1`    | The research collection      |
| `research-tracker:preferences:v1`| Default layout and sort      |

Seeding happens only when no saved collection exists. Every read is wrapped in
`try/catch` so private-mode browsers and corrupted values degrade to defaults rather
than crashing the app. The `:v1` suffix leaves room for a future migration.

## 9. Responsive behaviour

| Width      | Behaviour                                                           |
| ---------- | ------------------------------------------------------------------- |
| 320–639px  | Single-column cards, stacked stats (2-up from 420px), search on its own row, filters in an expandable panel, full-width dialogs anchored to the bottom edge, drawer navigation |
| 640–1023px | Two-column cards, inline filter menus, table reveals priority and updated columns |
| 1024px+    | Persistent 264px sidebar, search in the header, table reveals source |
| 1280px+    | Three-column cards, table reveals tags                              |

Touch targets are at least 40px on phones and tighten on pointer devices. The table
scrolls inside its own container; the page body never scrolls horizontally.

## 10. Current status

Complete and verified:

- ✅ Add, edit and delete (with confirmation and undo)
- ✅ Search across title, description, notes, tags and source type
- ✅ Status, priority and tag filters, combinable with search, clearable
- ✅ All five sort orders
- ✅ Grid and table layouts with a persisted toggle
- ✅ Dashboard, tags and settings screens
- ✅ Twelve sample entries, localStorage persistence, JSON export
- ✅ Mobile drawer, filter panel, responsive dialogs
- ✅ `npm run build` succeeds; `npm run lint` reports no errors
- ✅ Query logic covered by assertions (search, filters, scopes, sorts, stats,
  entry construction); app verified to render without runtime errors

## 11. Possible next steps

Not built, deliberately — each would be a scope increase:

- Deep links and shareable filtered URLs (needs a router)
- A read-only detail view for long notes, separate from the edit form
- Bulk selection and bulk status changes
- Dark theme (tokens are already centralised, so this is mostly palette work)
- JSON import to complement export
- A real backend, which would replace `hooks/useResearch.js` only
