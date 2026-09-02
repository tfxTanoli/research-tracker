import { NAV_GROUPS, NAV_ITEMS } from '../../data/navigation'
import { cn } from '../../utils/cn'

/** The navigation list itself — shared by the desktop rail and the mobile drawer. */
export function SidebarNav({ activeView, onNavigate, counts }) {
  return (
    <nav aria-label="Primary" className="flex flex-col gap-5">
      {NAV_GROUPS.map((group) => {
        const items = NAV_ITEMS.filter((item) => item.group === group.id)
        if (!items.length) return null

        return (
          <div key={group.id}>
            {group.label && (
              <p className="mb-1.5 px-3 text-[11px] font-semibold tracking-wider text-ink-faint uppercase">
                {group.label}
              </p>
            )}

            <ul className="flex flex-col gap-0.5">
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
                        'group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-all duration-150',
                        isActive
                          ? 'bg-surface text-ink shadow-xs ring-1 ring-line'
                          : 'text-ink-soft hover:bg-surface/70 hover:text-ink',
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-[17px] w-[17px] shrink-0 transition-colors',
                          isActive ? 'text-brand' : 'text-ink-faint group-hover:text-ink-soft',
                        )}
                        aria-hidden="true"
                      />
                      <span className="flex-1 truncate text-left">{item.label}</span>

                      {count !== undefined && count > 0 && (
                        <span
                          className={cn(
                            'rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums',
                            isActive ? 'bg-brand-soft text-brand' : 'bg-surface-sunken text-ink-faint',
                          )}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}
