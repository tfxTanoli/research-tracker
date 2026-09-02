import { ResearchCard } from './ResearchCard'

export function ResearchGrid({ entries, onEdit, onDelete, onToggleFavorite, onSelectTag }) {
  return (
    <ul className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
      {entries.map((entry) => (
        <li key={entry.id} className="min-w-0">
          <ResearchCard
            entry={entry}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleFavorite={onToggleFavorite}
            onSelectTag={onSelectTag}
          />
        </li>
      ))}
    </ul>
  )
}
