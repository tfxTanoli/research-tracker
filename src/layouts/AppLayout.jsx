import { Header } from '../components/layout/Header'
import { MobileNavigation } from '../components/layout/MobileNavigation'
import { Sidebar } from '../components/layout/Sidebar'

/** Application frame: persistent rail, sticky header, scrolling workspace. */
export function AppLayout({
  activeView,
  onNavigate,
  counts,
  navOpen,
  onOpenNav,
  onCloseNav,
  headerProps,
  children,
}) {
  return (
    <div className="min-h-dvh bg-canvas">
      <Sidebar activeView={activeView} onNavigate={onNavigate} counts={counts} />

      <MobileNavigation
        open={navOpen}
        onClose={onCloseNav}
        activeView={activeView}
        onNavigate={onNavigate}
        counts={counts}
      />

      <div className="flex min-h-dvh flex-col lg:pl-[236px]">
        <Header {...headerProps} onOpenNavigation={onOpenNav} />

        <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pt-6 pb-16 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
