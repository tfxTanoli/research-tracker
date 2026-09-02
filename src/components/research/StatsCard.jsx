import { cn } from '../../utils/cn'

const TONES = {
  brand: 'bg-brand-soft text-brand-ink',
  info: 'bg-info-soft text-info',
  caution: 'bg-caution-soft text-caution',
  positive: 'bg-positive-soft text-positive',
  neutral: 'bg-surface-sunken text-ink-soft',
}

export function StatsCard({ icon: Icon, label, value, context, tone = 'neutral' }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-card transition-shadow duration-200 hover:shadow-raised">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12.5px] font-medium text-ink-faint">{label}</p>
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
            TONES[tone],
          )}
        >
          <Icon className="h-[15px] w-[15px]" aria-hidden="true" />
        </span>
      </div>

      <p className="mt-2.5 text-[26px] leading-none font-semibold tracking-tight text-ink tabular-nums">
        {value}
      </p>
      {context && <p className="mt-2 text-[12px] text-ink-faint">{context}</p>}
    </div>
  )
}
