import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import quizzes from '../data/quizzes.json'
import Reveal from '../components/Reveal'

const ACTIVE_QUIZZES = quizzes.filter((q) => !q.comingSoon)
const QUIZ_MAP = Object.fromEntries(quizzes.map((q) => [q.id, q.title]))

const RANK_STYLES = {
  0: 'text-gold-warm font-semibold',
  1: 'text-zinc-400 font-semibold',
  2: 'text-mauve-mid font-semibold',
}

function timeAgo(dateStr) {
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedQuiz, setSelectedQuiz] = useState('all')

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)

      let query = supabase
        .from('quiz_attempts')
        .select('user_id, quiz_id, score, total_questions, created_at')

      if (selectedQuiz !== 'all') {
        query = query.eq('quiz_id', selectedQuiz)
      }

      const { data: attempts, error } = await query.limit(200)

      if (error || !attempts?.length) {
        if (!cancelled) { setEntries([]); setLoading(false) }
        return
      }

      // Best attempt per user per quiz
      const best = new Map()
      for (const a of attempts) {
        const key = `${a.user_id}__${a.quiz_id}`
        const pct = a.score / a.total_questions
        if (!best.has(key) || pct > best.get(key).pct) {
          best.set(key, { ...a, pct })
        }
      }

      const deduped = [...best.values()].sort(
        (a, b) => b.pct - a.pct || new Date(a.created_at) - new Date(b.created_at)
      ).slice(0, 50)

      const userIds = [...new Set(deduped.map((a) => a.user_id))]
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', userIds)

      const profileMap = Object.fromEntries((profiles ?? []).map((p) => [p.id, p]))

      if (!cancelled) {
        setEntries(
          deduped.map((a) => ({
            ...a,
            username: profileMap[a.user_id]?.username ?? 'Anonymous',
            avatarUrl: profileMap[a.user_id]?.avatar_url ?? null,
            quizTitle: QUIZ_MAP[a.quiz_id] ?? a.quiz_id,
          }))
        )
        setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [selectedQuiz])

  return (
    <div className="pt-24 pb-20 px-5 sm:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <Reveal>
        <div className="section-header">
          <div className="section-accent-bar" style={{ background: 'linear-gradient(to bottom, #c9a84c, #c98b8b)' }} />
          <div>
            <span className="section-overline">Hall of fame</span>
            <h1 className="section-title">Leaderboard</h1>
          </div>
        </div>
      </Reveal>

      {/* Quiz filter */}
      <Reveal delay={100}>
        <div className="flex flex-wrap gap-2 mb-8">
          <FilterPill value="all" active={selectedQuiz === 'all'} onClick={() => setSelectedQuiz('all')}>
            All Quizzes
          </FilterPill>
          {ACTIVE_QUIZZES.map((q) => (
            <FilterPill key={q.id} value={q.id} active={selectedQuiz === q.id} onClick={() => setSelectedQuiz(q.id)}>
              {q.title}
            </FilterPill>
          ))}
        </div>
      </Reveal>

      {/* Table */}
      <Reveal delay={200}>
        {loading ? (
          <div className="py-20 text-center">
            <p className="font-display italic text-2xl text-zinc-600 animate-pulse">Loading…</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display italic text-3xl text-zinc-500 mb-3">No scores yet</p>
            <p className="font-body text-sm text-zinc-600 mb-8">Be the first on the board.</p>
            <Link to="/quizzes" className="btn-primary text-sm">Take a Quiz</Link>
          </div>
        ) : (
          <div className="space-y-px">
            {entries.map((entry, i) => (
              <div
                key={`${entry.user_id}-${entry.quiz_id}`}
                className="flex items-center gap-4 bg-bg-surface border border-border-subtle rounded-xl px-5 py-4 hover:border-border-strong transition-colors duration-150"
              >
                {/* Rank */}
                <span className={`font-body text-sm tabular-nums w-7 shrink-0 text-center ${RANK_STYLES[i] ?? 'text-zinc-600'}`}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                </span>

                {/* Avatar */}
                <div className="shrink-0">
                  {entry.avatarUrl ? (
                    <img src={entry.avatarUrl} alt={entry.username} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-mauve-deep flex items-center justify-center text-xs font-medium text-white">
                      {entry.username[0].toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Name + quiz */}
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-zinc-200 truncate">{entry.username}</p>
                  <p className="font-body text-xs text-zinc-600 truncate">{entry.quizTitle}</p>
                </div>

                {/* Score */}
                <div className="shrink-0 text-right">
                  <p className="font-display italic text-lg text-zinc-100">
                    {Math.round(entry.pct * 100)}%
                  </p>
                  <p className="font-body text-xs text-zinc-600">
                    {entry.score}/{entry.total_questions}
                  </p>
                </div>

                {/* Date */}
                <span className="font-body text-xs text-zinc-700 shrink-0 hidden sm:block w-16 text-right">
                  {timeAgo(entry.created_at)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </div>
  )
}

function FilterPill({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-body text-xs px-4 py-1.5 rounded-full border transition-all duration-150 ${
        active
          ? 'bg-rose-dust/15 border-rose-dust/50 text-rose-pale'
          : 'bg-transparent border-border-subtle text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
      }`}
    >
      {children}
    </button>
  )
}
