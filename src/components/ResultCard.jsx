import { Link } from 'react-router-dom'

function getGrade(score, total) {
  const pct = total > 0 ? (score / total) * 100 : 0
  if (pct === 100) return { label: 'Ultimate GL Scholar', emoji: '🌸', color: 'text-gold-warm', glow: 'shadow-glow-gold' }
  if (pct >= 80)  return { label: 'Certified GL Enthusiast', emoji: '💕', color: 'text-rose-pale', glow: 'shadow-glow-rose' }
  if (pct >= 60)  return { label: 'Casual Watcher', emoji: '📺', color: 'text-mauve-pale', glow: 'shadow-glow-mauve' }
  return { label: 'Needs a Rewatch Session', emoji: '🫶', color: 'text-zinc-400', glow: '' }
}

/**
 * Full-screen result display after quiz completion.
 * @param {{ score: number, total: number, quizTitle: string, quizId: string, answers: object[] }} props
 */
export default function ResultCard({ score, total, quizTitle, quizId, answers }) {
  const grade = getGrade(score, total)
  const pct = total > 0 ? Math.round((score / total) * 100) : 0

  const shareText = encodeURIComponent(
    `I scored ${score}/${total} on "${quizTitle}" and earned "${grade.label} ${grade.emoji}" on Enemize Ben Yafit — the Thai GL quiz site! How well do you know your Thai GL? #ThaiGL #EnemizeBenYafit`
  )
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}`

  return (
    <div className="animate-fade-up max-w-lg mx-auto text-center space-y-8">
      {/* Grade */}
      <div className="space-y-4">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-bg-elevated border-2 border-border-strong ${grade.glow} text-5xl`}>
          {grade.emoji}
        </div>
        <div>
          <p className="font-body text-xs tracking-widest uppercase text-zinc-500 mb-2">Your title</p>
          <h2 className={`font-display text-display-md italic ${grade.color}`}>
            {grade.label}
          </h2>
        </div>
      </div>

      {/* Score ring */}
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1e1c1c" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="url(#scoreGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - pct / 100)}`}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c4d6e" />
              <stop offset="100%" stopColor="#c98b8b" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl italic text-zinc-100">{score}</span>
          <span className="font-body text-xs text-zinc-500">out of {total}</span>
        </div>
      </div>

      {/* Question breakdown */}
      {answers.length > 0 && (
        <div className="bg-bg-surface border border-border-subtle rounded-xl p-4 text-left space-y-2">
          <p className="font-body text-xs tracking-widest uppercase text-zinc-500 mb-3">Breakdown</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-emerald-900/20 border border-emerald-800/30 rounded-lg px-4 py-3 text-center">
              <span className="font-display text-2xl italic text-emerald-400">
                {answers.filter((a) => a.isCorrect).length}
              </span>
              <p className="font-body text-xs text-zinc-500 mt-0.5">Correct</p>
            </div>
            <div className="bg-rose-dust/10 border border-rose-muted/30 rounded-lg px-4 py-3 text-center">
              <span className="font-display text-2xl italic text-rose-dust">
                {answers.filter((a) => !a.isCorrect).length}
              </span>
              <p className="font-body text-xs text-zinc-500 mt-0.5">Incorrect</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-auto justify-center"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Share on X
        </a>
        <Link to="/quizzes" className="btn-ghost w-full sm:w-auto justify-center">
          Try another quiz
        </Link>
      </div>
    </div>
  )
}
