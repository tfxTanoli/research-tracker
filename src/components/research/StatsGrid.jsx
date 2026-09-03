import { StatsCard } from './StatsCard'

/** The four numbers worth seeing before anything else, and nothing besides. */
export function StatsGrid({ stats }) {
  const cards = [
    { label: 'Total', value: stats.total },
    { label: 'In progress', value: stats.inProgress },
    { label: 'High priority', value: stats.highPriority },
    { label: 'Completed', value: stats.completed },
  ]

  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-lg border-t border-l border-line sm:grid-cols-4">
      {cards.map((card) => (
        <StatsCard key={card.label} {...card} />
      ))}
    </div>
  )
}
