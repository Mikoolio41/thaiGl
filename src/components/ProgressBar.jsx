/**
 * Thin progress bar showing how far through the quiz the user is.
 * @param {{ current: number, total: number }} props
 */
export default function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="w-full flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-mauve-deep to-rose-dust rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-body text-xs text-zinc-500 tabular-nums shrink-0">
        {current} / {total}
      </span>
    </div>
  )
}
