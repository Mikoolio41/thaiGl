import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import useCompetitionStore from '../store/useCompetitionStore'
import useAuthStore from '../store/useAuthStore'
import { supabase } from '../lib/supabase'
import Reveal from '../components/Reveal'

const MEDALS = ['🥇', '🥈', '🥉']

export default function CompetitionResults() {
  const { joinCode } = useParams()
  const { user } = useAuthStore()
  const { competition, participants, quiz, loadRoom, loadParticipants } = useCompetitionStore()
  const channelRef = useRef(null)

  useEffect(() => {
    if (!user) return

    const getComp = competition
      ? Promise.resolve(competition)
      : loadRoom(joinCode)

    getComp.then((comp) => {
      if (!comp) return
      loadParticipants(comp.id)

      channelRef.current = supabase
        .channel(`results-${comp.id}`)
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'competition_participants',
          filter: `competition_id=eq.${comp.id}`,
        }, () => loadParticipants(comp.id))
        .subscribe()
    })

    return () => { channelRef.current?.unsubscribe() }
  }, [user?.id, joinCode]) // eslint-disable-line

  const totalQ = quiz?.questionCount ?? 1
  const finished = participants.filter((p) => p.score !== null)
  const pending = participants.filter((p) => p.score === null)

  const ranked = [
    ...finished.sort(
      (a, b) => b.score - a.score || new Date(a.completed_at) - new Date(b.completed_at)
    ),
    ...pending,
  ]

  const myEntry = ranked.find((p) => p.user_id === user?.id)
  const myRank = myEntry && myEntry.score !== null ? ranked.indexOf(myEntry) : null

  return (
    <div className="pt-24 pb-20 px-5 sm:px-8 max-w-xl mx-auto">
      {/* Header */}
      <Reveal>
        <div className="text-center mb-8">
          <span className="section-overline">Results</span>
          <h1 className="font-display text-4xl italic text-zinc-100 mt-1 mb-2">
            {competition?.name ?? 'Competition'}
          </h1>
          <p className="font-body text-sm text-zinc-500">
            {finished.length} of {participants.length} finished
            {pending.length > 0 && (
              <span className="ml-1.5 inline-flex items-center gap-1">
                · <span className="w-1.5 h-1.5 rounded-full bg-gold-warm animate-pulse inline-block" /> live
              </span>
            )}
          </p>
        </div>
      </Reveal>

      {/* My score highlight */}
      {myEntry?.score !== null && myRank !== null && (
        <Reveal delay={100}>
          <div className="bg-rose-dust/10 border border-rose-dust/30 rounded-2xl p-5 text-center mb-8">
            <p className="font-body text-[10px] tracking-widest uppercase text-rose-dust/70 mb-2">
              Your score
            </p>
            <p className="font-display text-5xl italic text-rose-pale mb-1">
              {myEntry.score}/{totalQ}
            </p>
            <p className="font-body text-sm text-zinc-500">
              {Math.round((myEntry.score / totalQ) * 100)}%
              {myRank < 3 && <span className="ml-2">{MEDALS[myRank]}</span>}
            </p>
          </div>
        </Reveal>
      )}

      {/* Rankings */}
      <Reveal delay={200}>
        <div className="space-y-2">
          {ranked.map((p, i) => {
            const isDone = p.score !== null
            const isMe = p.user_id === user?.id
            return (
              <div
                key={p.id}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 border transition-colors ${
                  isMe
                    ? 'bg-rose-dust/8 border-rose-dust/25'
                    : 'bg-bg-surface border-border-subtle'
                }`}
              >
                {/* Rank */}
                <span className="font-body text-sm w-7 text-center shrink-0 text-zinc-600">
                  {isDone ? (i < 3 ? MEDALS[i] : `#${i + 1}`) : '—'}
                </span>

                {/* Avatar */}
                {p.avatarUrl ? (
                  <img src={p.avatarUrl} alt={p.username} className="w-8 h-8 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-mauve-deep flex items-center justify-center text-xs font-medium text-white shrink-0">
                    {p.username[0].toUpperCase()}
                  </div>
                )}

                {/* Name */}
                <span className="flex-1 font-body text-sm text-zinc-300 truncate">{p.username}</span>

                {/* Score */}
                {isDone ? (
                  <div className="text-right shrink-0">
                    <p className="font-display italic text-lg text-zinc-100">
                      {p.score}/{totalQ}
                    </p>
                    <p className="font-body text-xs text-zinc-600">
                      {Math.round((p.score / totalQ) * 100)}%
                    </p>
                  </div>
                ) : (
                  <span className="font-body text-xs text-zinc-600 animate-pulse shrink-0">
                    Playing…
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </Reveal>

      <Reveal delay={350}>
        <div className="mt-10 flex gap-3 justify-center">
          <Link to="/compete" className="btn-ghost text-sm">Play Again</Link>
          <Link to="/" className="btn-ghost text-sm">Home</Link>
        </div>
      </Reveal>
    </div>
  )
}
