const LEVELS = { easy: 1, medium: 2, hard: 3 }

export default function DifficultyMeter({ level = 'easy', color = '#d27a92' }) {
  const n = LEVELS[level] ?? 1
  return (
    <span className="inline-flex items-center gap-[3px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 14,
            height: 2,
            background: i < n ? color : 'rgba(255,255,255,0.12)',
            display: 'inline-block',
          }}
        />
      ))}
    </span>
  )
}
