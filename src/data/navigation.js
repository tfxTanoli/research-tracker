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
    subtitle: 'A quick read on what you are researching right now.',
  },
  {
    id: 'all',
    label: 'All Research',
    icon: Library,
    group: 'main',
    countKey: 'total',
    title: 'Research Library',
    subtitle: 'Organize your ideas, sources, notes and research progress in one place.',
  },
  {
    id: 'high-priority',
    label: 'High Priority',
    icon: Flame,
    group: 'views',
    countKey: 'highPriority',
    title: 'High Priority',
    subtitle: 'Everything marked High or Critical — the work that should not wait.',
  },
  {
    id: 'in-progress',
    label: 'In Progress',
    icon: Timer,
    group: 'views',
    countKey: 'inProgress',
    title: 'In Progress',
    subtitle: 'Topics you are actively reading through right now.',
  },
  {
    id: 'completed',
    label: 'Completed',
    icon: CheckCircle2,
    group: 'views',
    countKey: 'completed',
    title: 'Completed',
    subtitle: 'Research you have finished and can reference with confidence.',
  },
  {
    id: 'archived',
    label: 'Archived',
    icon: Archive,
    group: 'views',
    countKey: 'archived',
    title: 'Archived',
    subtitle: 'Parked topics, kept out of the way but never lost.',
  },
  {
    id: 'tags',
    label: 'Tags',
    icon: Tags,
    group: 'organize',
    title: 'Tags',
    subtitle: 'Browse your library by the themes running through it.',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    group: 'organize',
    title: 'Settings',
    subtitle: 'Workspace preferences and local data management.',
  },
]

export const NAV_GROUPS = [
  { id: 'main', label: null },
  { id: 'views', label: 'Views' },
  { id: 'organize', label: 'Organize' },
]

export const getNavItem = (id) => NAV_ITEMS.find((item) => item.id === id) ?? NAV_ITEMS[0]

/** Static workspace profile — there is no auth in this build. */
export const WORKSPACE_PROFILE = {
  name: 'Amelia Hart',
  role: 'Product Researcher',
  initials: 'AH',
  workspace: 'Personal Workspace',
}
