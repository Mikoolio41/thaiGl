import { useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useCompetitionStore from '../store/useCompetitionStore'
import useAuthStore from '../store/useAuthStore'
import { supabase } from '../lib/supabase'
import Reveal from '../components/Reveal'

export default function WaitingRoom() {
  const { joinCode } = useParams()
  const navigate = useNavigate()
  const { user, openModal } = useAuthStore()
  const { competition, participants, quiz, loading, joinRoom, loadParticipants, startGame } =
    useCompetitionStore()
  const channelRef = useRef(null)

  useEffect(() => {
    if (!user) return

    joinRoom(user.id, joinCode)
      .then((comp) => {
        if (!comp) return
        if (comp.status === 'active') { navigate(`/room/${joinCode}/play`, { replace: true }); return }
        if (comp.status === 'finished') { navigate(`/room/${joinCode}/results`, { replace: true }); return }

        loadParticipants(comp.id)

        channelRef.current = supabase
          .channel(`room-${comp.id}`)
          .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'competition_participants',
            filter: `competition_id=eq.${comp.id}`,
          }, () => loadParticipants(comp.id))
          .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'competitions',
            filter: `id=eq.${comp.id}`,
          }, ({ new: updated }) => {
            if (updated.status === 'active') navigate(`/room/${joinCode}/play`)
          })
          .subscribe()
      })
      .catch(() => {})

    return () => { channelRef.current?.unsubscribe() }
  }, [user?.id, joinCode]) // eslint-disable-line

  if (!user) {
    return (
      <div className="pt-32 pb-20 px-5 text-center">
        <p className="font-display italic text-2xl text-zinc-400 mb-6">Sign in to join this room</p>
        <button onClick={openModal} className="btn-primary">Sign In</button>
      </div>
    )
  }

  if (loading && !competition) {
    return (
      <div className="pt-32 text-center">
        <p className="font-display italic text-2xl text-zinc-600 animate-pulse">Joining room…</p>
      </div>
    )
  }

  if (!competition) {
    return (
      <div className="pt-32 pb-20 px-5 text-center">
        <p className="font-display italic text-2xl text-zinc-400 mb-4">Room not found</p>
        <Link to="/compete" className="btn-ghost text-sm">← Back to Compete</Link>
      </div>
    )
  }

  const isCreator = competition.created_by === user.id
  const canStart = participants.length >= 1

  return (
    <div className="pt-24 pb-20 px-5 sm:px-8 max-w-xl mx-auto">
      {/* Header */}
      <Reveal>
        <div className="text-center mb-8">
          <span className="section-overline">Waiting room</span>
          <h1 className="font-display text-4xl italic text-zinc-100 mt-1 mb-2">
            {competition.name}
          </h1>
          <p className="font-body text-sm text-zinc-500">
            {quiz?.title} · {quiz?.questionCount ?? '?'} questions
          </p>
        </div>
      </Reveal>

      {/* Join code */}
      <Reveal delay={100}>
        <div className="bg-bg-surface border border-border-strong rounded-2xl p-6 text-center mb-8">
          <p className="font-body text-[10px] tracking-widest uppercase text-zinc-600 mb-3">
            Share this code
          </p>
          <p className="font-display text-5xl italic tracking-[0.35em] text-white">
            {competition.join_code}
          </p>
        </div>
      </Reveal>

      {/* Players */}
      <Reveal delay={200}>
        <div className="mb-8">
          <p className="font-body text-[10px] tracking-widest uppercase text-zinc-600 mb-3">
            Players · {participants.length} / {competition.max_participants ?? 20}
          </p>
          <div className="space-y-2">
            {participants.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 bg-bg-surface border border-border-subtle rounded-xl px-4 py-3"
              >
                {p.avatarUrl ? (
                  <img src={p.avatarUrl} alt={p.username} className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-mauve-deep flex items-center justify-center text-xs font-medium text-white shrink-0">
                    {p.username[0].toUpperCase()}
                  </div>
                )}
                <span className="flex-1 font-body text-sm text-zinc-300">{p.username}</span>
                {p.user_id === competition.created_by && (
                  <span className="font-body text-[10px] tracking-widest uppercase text-gold-warm">
                    Host
                  </span>
                )}
              </div>
            ))}

            {participants.length === 0 && (
              <p className="font-body text-sm text-zinc-700 text-center py-4">
                Waiting for players…
              </p>
            )}
          </div>
        </div>
      </Reveal>

      {/* Action */}
      <Reveal delay={300}>
        {isCreator ? (
          <button
            onClick={async () => {
              await startGame()
              navigate(`/room/${joinCode}/play`)
            }}
            disabled={!canStart}
            className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-default"
          >
            Start Game · {participants.length} player{participants.length !== 1 ? 's' : ''}
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 py-4 font-body text-sm text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-warm animate-pulse shrink-0" />
            Waiting for the host to start…
          </div>
        )}
      </Reveal>
    </div>
  )
}
