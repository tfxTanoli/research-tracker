import { Logo } from './Logo'
import { SidebarNav } from './SidebarNav'
import { WorkspaceProfile } from './WorkspaceProfile'

/** Desktop rail. Hidden below lg, where MobileNavigation takes over. */
export function Sidebar({ activeView, onNavigate, counts }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[236px] flex-col border-r border-line bg-canvas lg:flex">
      <div className="flex h-14 shrink-0 items-center px-4">
        <Logo />
      </div>

      <div className="scrollbar-slim flex-1 overflow-y-auto px-2.5 py-2">
        <SidebarNav activeView={activeView} onNavigate={onNavigate} counts={counts} />
      </div>

      <div className="shrink-0 px-2.5 py-3">
        <WorkspaceProfile />
      </div>
    </aside>
  )
}
