import { CheckCircle2, Flame, Layers, Timer } from 'lucide-react'
import { StatsCard } from './StatsCard'
import { pluralize } from '../../utils/format'

/** The four numbers worth seeing before anything else. */
export function StatsGrid({ stats }) {
  const cards = [
    {
      label: 'Total Research',
      value: stats.total,
      icon: Layers,
      tone: 'brand',
      context: `${stats.activeCount} still ${pluralize(stats.activeCount, 'needs', 'need')} attention`,
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: Timer,
      tone: 'info',
      context: `${stats.reviewing} more in review`,
    },
    {
      label: 'High Priority',
      value: stats.highPriority,
      icon: Flame,
      tone: 'caution',
      context: stats.highPriority ? 'High and Critical combined' : 'Nothing urgent right now',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      tone: 'positive',
      context: `${stats.completionRate}% of your library`,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatsCard key={card.label} {...card} />
      ))}
    </div>
  )
}
