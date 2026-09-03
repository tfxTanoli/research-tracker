import { NAV_GROUPS, NAV_ITEMS } from '../../data/navigation'
import { cn } from '../../utils/cn'

/**
 * The navigation list itself — shared by the desktop rail and the mobile
 * drawer. Groups are separated by space alone; the uppercase section headings
 * they used to carry said nothing the icons and labels did not.
 */
export function SidebarNav({ activeView, onNavigate, counts }) {
  return (
    <nav aria-label="Primary" className="flex flex-col gap-4">
      {NAV_GROUPS.map((group) => {
        const items = NAV_ITEMS.filter((item) => item.group === group.id)
        if (!items.length) return null

        return (
          <ul key={group.id} className="flex flex-col gap-0.5">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.id
              const count = item.countKey ? counts?.[item.countKey] : undefined

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'group flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13.5px] transition-colors duration-150',
                      isActive
                        ? 'bg-surface-sunken font-medium text-ink'
                        : 'text-ink-soft hover:text-ink',
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0 transition-colors',
                        isActive ? 'text-ink' : 'text-ink-faint group-hover:text-ink-soft',
                      )}
                      aria-hidden="true"
                    />
                    <span className="flex-1 truncate text-left">{item.label}</span>

                    {count !== undefined && count > 0 && (
                      <span className="text-[11.5px] text-ink-faint tabular-nums">{count}</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        )
      })}
    </nav>
  )
}
