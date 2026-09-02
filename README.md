# Research Tracker

A personal research management workspace built with React + Vite. Organise research
topics, keep the sources and notes that go with them, tag and prioritise everything,
and find it again instantly.

This build is **frontend-only**. There is no backend, database, or authentication —
data lives in the browser via `localStorage`, seeded with twelve realistic sample
entries the first time it runs.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

Requires Node 20.19+ / 22.12+ (Vite 8).

## Deployment

The app is a static SPA with no server-side routing, so any static host works with
zero configuration.

| Host    | Build command   | Output directory |
| ------- | --------------- | ---------------- |
| Vercel  | `npm run build` | `dist`           |
| Netlify | `npm run build` | `dist`           |
| Any CDN | `npm run build` | upload `dist/`   |

Navigation is state-driven rather than URL-driven, so no SPA rewrite rule or
`_redirects` file is needed — a refresh on any screen resolves correctly.

## Features

- **Library** — grid (card) and table layouts with a persisted toggle
- **Create / edit / delete** — validated modal forms, with a confirmation step and
  an undo action on delete
- **Search** — instant, across titles, descriptions, notes, tags and source type
- **Filters** — status, priority and tag, combinable, with visible active-filter
  chips and one-click clearing
- **Sorting** — recently updated, newest, oldest, priority, alphabetical
- **Dashboard** — statistics, recently updated, an attention queue, status
  breakdown and top tags
- **Tags** — browse the library by theme
- **Settings** — default layout and sort, JSON export, restore samples, clear data
- **Responsive** — designed at 320, 375, 430, 768, 1024 and 1440px+
- **Accessible** — semantic markup, labelled controls, visible focus, ARIA on
  dialogs and menus, focus trapping, `prefers-reduced-motion` support

## Project structure

```
src/
├─ components/
│  ├─ layout/      Sidebar, MobileNavigation, Header, Logo, WorkspaceProfile
│  ├─ research/    Cards, table, filters, forms, modals, stats, search
│  └─ ui/          Button, Input, TextArea, Select, Modal, Dropdown, badges, Toast
├─ data/           Sample research entries, navigation definitions
├─ hooks/          useResearch, usePreferences, useToast, useClickOutside
├─ layouts/        AppLayout
├─ pages/          Dashboard, ResearchLibrary, TagsPage, SettingsPage
├─ utils/          constants, research (query/sort/stats), format, storage, cn
├─ App.jsx         Providers
└─ ResearchWorkspace.jsx   Application state and page routing
```

See [Context.md](./Context.md) for the design decisions behind this structure.

## Tech

React 19 · Vite 8 · Tailwind CSS 4 · lucide-react · oxlint
