import { Logo } from './Logo'
import { SidebarNav } from './SidebarNav'
import { WorkspaceProfile } from './WorkspaceProfile'

/** Desktop rail. Hidden below lg, where MobileNavigation takes over. */
export function Sidebar({ activeView, onNavigate, counts }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col border-r border-line bg-surface-muted lg:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-line-soft px-5">
        <Logo />
      </div>

      <div className="scrollbar-slim flex-1 overflow-y-auto px-3 py-5">
        <SidebarNav activeView={activeView} onNavigate={onNavigate} counts={counts} />
      </div>

      <div className="shrink-0 border-t border-line-soft p-3">
        <WorkspaceProfile />
      </div>
    </aside>
  )
}
