import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { supabase } from '../lib/supabase'
import quizzes from '../data/quizzes.json'

const quizMap = Object.fromEntries(quizzes.map((q) => [q.id, q]))

function getGrade(score, total) {
  const pct = total > 0 ? (score / total) * 100 : 0
  if (pct === 100) return { label: 'Ultimate GL Scholar', emoji: '🌸', color: 'text-gold-warm' }
  if (pct >= 80)   return { label: 'Certified GL Enthusiast', emoji: '💕', color: 'text-rose-pale' }
  if (pct >= 60)   return { label: 'Casual Watcher', emoji: '📺', color: 'text-mauve-pale' }
  return { label: 'Needs a Rewatch Session', emoji: '🫶', color: 'text-zinc-400' }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function MiniRing({ score, total }) {
  const pct = total > 0 ? score / total : 0
  const r = 20
  const circumference = 2 * Math.PI * r
  return (
    <svg className="w-14 h-14 -rotate-90 shrink-0" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r={r} fill="none" stroke="#1e1c1c" strokeWidth="5" />
      <circle
        cx="25" cy="25" r={r}
        fill="none"
        stroke="url(#miniGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - pct)}
        style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
      />
      <defs>
        <linearGradient id="miniGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c4d6e" />
          <stop offset="100%" stopColor="#c98b8b" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Profile() {
  const { user, profile } = useAuthStore()
  const navigate = useNavigate()
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { navigate('/'); return }
    supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('[quiz_attempts select]', error)
        setAttempts(data ?? [])
        setLoading(false)
      })
  }, [user, navigate])

  if (!user) return null

  const displayName = profile?.username ?? user.email?.split('@')[0] ?? 'You'
  const avatarUrl = profile?.avatar_url

  const totalTaken = attempts.length
  const avgPct = totalTaken > 0
    ? Math.round(attempts.reduce((sum, a) => sum + (a.score / a.total_questions) * 100, 0) / totalTaken)
    : null
  const bestPct = totalTaken > 0
    ? Math.round(Math.max(...attempts.map((a) => (a.score / a.total_questions) * 100)))
    : null

  return (
    <div className="min-h-dvh pt-24 pb-20 px-5 sm:px-8">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center gap-5">
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className="w-16 h-16 rounded-full object-cover ring-2 ring-border-strong" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-mauve-deep flex items-center justify-center text-2xl font-medium text-white ring-2 ring-border-strong">
              {displayName[0].toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-display text-display-sm italic text-zinc-100">{displayName}</h1>
            <p className="font-body text-sm text-zinc-500 mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Quizzes taken', value: totalTaken },
            { label: 'Average score', value: avgPct != null ? `${avgPct}%` : '—' },
            { label: 'Best score', value: bestPct != null ? `${bestPct}%` : '—' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-bg-surface border border-border-subtle rounded-xl px-4 py-4 text-center">
              <p className="font-display text-3xl italic text-zinc-100">{value}</p>
              <p className="font-body text-xs text-zinc-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Attempts */}
        <div>
          <p className="font-body text-xs tracking-widest uppercase text-zinc-500 mb-4">Quiz history</p>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-bg-surface border border-border-subtle rounded-xl animate-pulse" />
              ))}
            </div>
          ) : attempts.length === 0 ? (
            <div className="bg-bg-surface border border-border-subtle rounded-xl px-6 py-10 text-center">
              <p className="font-display text-display-sm italic text-zinc-600 mb-4">No quizzes taken yet</p>
              <Link to="/quizzes" className="btn-primary">Browse quizzes</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {attempts.map((attempt) => {
                const quiz = quizMap[attempt.quiz_id]
                const pct = Math.round((attempt.score / attempt.total_questions) * 100)
                const grade = getGrade(attempt.score, attempt.total_questions)
                return (
                  <div
                    key={attempt.id}
                    className="bg-bg-surface border border-border-subtle rounded-xl px-5 py-4 flex items-center gap-4 hover:border-border-strong transition-colors duration-200"
                  >
                    <div className="relative shrink-0">
                      <MiniRing score={attempt.score} total={attempt.total_questions} />
                      <span className="absolute inset-0 flex items-center justify-center font-display text-sm italic text-zinc-200 rotate-90">
                        {pct}%
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-zinc-100 truncate">
                        {quiz?.title ?? attempt.quiz_id}
                      </p>
                      <p className={`font-body text-xs mt-0.5 ${grade.color}`}>
                        {grade.emoji} {grade.label}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-body text-xs text-zinc-100">{attempt.score}/{attempt.total_questions}</p>
                      {attempt.created_at && (
                        <p className="font-body text-[11px] text-zinc-600 mt-0.5">{formatDate(attempt.created_at)}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
