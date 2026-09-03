/**
 * One number and its label. No icon, no tint, no supporting sentence — the
 * figure is the whole point, and four of these sit in a single hairline row.
 */
export function StatsCard({ label, value }) {
  return (
    <div className="border-r border-b border-line px-4 py-3.5 sm:px-5">
      <p className="text-[11.5px] tracking-wide text-ink-faint">{label}</p>
      <p className="mt-1 text-[22px] leading-none font-semibold tracking-tight text-ink tabular-nums">
        {value}
      </p>
    </div>
  )
}
