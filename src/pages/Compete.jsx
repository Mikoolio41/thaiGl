import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCompetitionStore from '../store/useCompetitionStore'
import useAuthStore from '../store/useAuthStore'
import quizzes from '../data/quizzes.json'
import Reveal from '../components/Reveal'

const ACTIVE_QUIZZES = quizzes.filter((q) => !q.comingSoon)

export default function Compete() {
  const navigate = useNavigate()
  const { user, openModal } = useAuthStore()
  const { createRoom, joinRoom, loading } = useCompetitionStore()

  const [quizId, setQuizId] = useState(ACTIVE_QUIZZES[0]?.id ?? '')
  const [roomName, setRoomName] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [createError, setCreateError] = useState('')
  const [joinError, setJoinError] = useState('')

  if (!user) {
    return (
      <div className="pt-32 pb-20 px-5 text-center max-w-md mx-auto">
        <p className="font-display italic text-3xl text-zinc-300 mb-3">Sign in to compete</p>
        <p className="font-body text-sm text-zinc-600 mb-8">
          You need an account to create or join a competition room.
        </p>
        <button onClick={openModal} className="btn-primary">Sign In</button>
      </div>
    )
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!roomName.trim() || !quizId) return
    setCreateError('')
    try {
      const code = await createRoom(user.id, quizId, roomName.trim())
      navigate(`/room/${code}`)
    } catch (err) {
      setCreateError(err.message)
    }
  }

  async function handleJoin(e) {
    e.preventDefault()
    if (joinCode.length !== 6) return
    setJoinError('')
    try {
      const comp = await joinRoom(user.id, joinCode)
      if (comp.status === 'active') {
        navigate(`/room/${comp.join_code}/play`)
      } else if (comp.status === 'finished') {
        navigate(`/room/${comp.join_code}/results`)
      } else {
        navigate(`/room/${comp.join_code}`)
      }
    } catch (err) {
      setJoinError(err.message)
    }
  }

  return (
    <div className="pt-24 pb-20 px-5 sm:px-8 max-w-4xl mx-auto">
      <Reveal>
        <div className="section-header">
          <div
            className="section-accent-bar"
            style={{ background: 'linear-gradient(to bottom, #c98b8b, #7c4d6e)' }}
          />
          <div>
            <span className="section-overline">Multiplayer</span>
            <h1 className="section-title">Compete</h1>
          </div>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Create */}
        <Reveal delay={100}>
          <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 h-full">
            <h2 className="font-display text-2xl italic text-zinc-100 mb-1">Create a Room</h2>
            <p className="font-body text-sm text-zinc-600 mb-6">
              Pick a quiz, name your room, then share the code.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block font-body text-[11px] tracking-widest uppercase text-zinc-600 mb-1.5">
                  Quiz
                </label>
                <select
                  value={quizId}
                  onChange={(e) => setQuizId(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-3 py-2.5 font-body text-sm text-zinc-300 focus:outline-none focus:border-mauve-deep/60 focus:ring-1 focus:ring-mauve-deep/30 transition-colors"
                >
                  {ACTIVE_QUIZZES.map((q) => (
                    <option key={q.id} value={q.id} className="bg-bg-surface">
                      {q.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-body text-[11px] tracking-widest uppercase text-zinc-600 mb-1.5">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="e.g. Friday Night GL Trivia"
                  maxLength={40}
                  className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-3 py-2.5 font-body text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-mauve-deep/60 focus:ring-1 focus:ring-mauve-deep/30 transition-colors"
                />
              </div>

              {createError && (
                <p className="font-body text-xs text-rose-dust">{createError}</p>
              )}

              <button
                type="submit"
                disabled={loading || !roomName.trim()}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-default"
              >
                {loading ? 'Creating…' : 'Create Room'}
              </button>
            </form>
          </div>
        </Reveal>

        {/* Join */}
        <Reveal delay={200}>
          <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 h-full">
            <h2 className="font-display text-2xl italic text-zinc-100 mb-1">Join a Room</h2>
            <p className="font-body text-sm text-zinc-600 mb-6">
              Enter the 6-character code from your host.
            </p>

            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label className="block font-body text-[11px] tracking-widest uppercase text-zinc-600 mb-1.5">
                  Join Code
                </label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))}
                  placeholder="XXXXXX"
                  maxLength={6}
                  className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-3 py-2.5 font-body text-sm text-zinc-200 placeholder-zinc-700 tracking-[0.4em] text-center focus:outline-none focus:border-mauve-deep/60 focus:ring-1 focus:ring-mauve-deep/30 transition-colors"
                />
              </div>

              {joinError && (
                <p className="font-body text-xs text-rose-dust">{joinError}</p>
              )}

              <button
                type="submit"
                disabled={loading || joinCode.length !== 6}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-default"
              >
                {loading ? 'Joining…' : 'Join Room'}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
