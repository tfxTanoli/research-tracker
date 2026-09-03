import {
  Archive,
  CheckCircle2,
  Flame,
  LayoutDashboard,
  Library,
  Settings,
  Tags,
  Timer,
} from 'lucide-react'

/**
 * Sidebar destinations. `group` drives the visual separation in the sidebar,
 * `countKey` picks which live number is shown on the right of the row.
 */
export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    group: 'main',
    title: 'Dashboard',
  },
  {
    id: 'all',
    label: 'All Research',
    icon: Library,
    group: 'main',
    countKey: 'total',
    title: 'Research Library',
  },
  {
    id: 'high-priority',
    label: 'High Priority',
    icon: Flame,
    group: 'views',
    countKey: 'highPriority',
    title: 'High Priority',
  },
  {
    id: 'in-progress',
    label: 'In Progress',
    icon: Timer,
    group: 'views',
    countKey: 'inProgress',
    title: 'In Progress',
  },
  {
    id: 'completed',
    label: 'Completed',
    icon: CheckCircle2,
    group: 'views',
    countKey: 'completed',
    title: 'Completed',
  },
  {
    id: 'archived',
    label: 'Archived',
    icon: Archive,
    group: 'views',
    countKey: 'archived',
    title: 'Archived',
  },
  {
    id: 'tags',
    label: 'Tags',
    icon: Tags,
    group: 'organize',
    title: 'Tags',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    group: 'organize',
    title: 'Settings',
  },
]

/** Grouping is spacing only — the uppercase section headings are gone. */
export const NAV_GROUPS = [{ id: 'main' }, { id: 'views' }, { id: 'organize' }]

export const getNavItem = (id) => NAV_ITEMS.find((item) => item.id === id) ?? NAV_ITEMS[0]

/** Static workspace profile — there is no auth in this build. */
export const WORKSPACE_PROFILE = {
  name: 'Amelia Hart',
  initials: 'AH',
}
