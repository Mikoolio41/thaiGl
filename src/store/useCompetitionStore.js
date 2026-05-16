import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import quizzes from '../data/quizzes.json'

async function fetchWithProfiles(competitionId) {
  const { data: parts } = await supabase
    .from('competition_participants')
    .select('*')
    .eq('competition_id', competitionId)
    .order('joined_at', { ascending: true })

  if (!parts?.length) return []

  const userIds = [...new Set(parts.map((p) => p.user_id))]
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, username, avatar_url')
    .in('id', userIds)

  const pm = Object.fromEntries((profiles ?? []).map((p) => [p.id, p]))
  return parts.map((p) => ({
    ...p,
    username: pm[p.user_id]?.username ?? 'Anonymous',
    avatarUrl: pm[p.user_id]?.avatar_url ?? null,
  }))
}

const useCompetitionStore = create((set, get) => ({
  competition: null,
  participants: [],
  quiz: null,
  loading: false,
  error: null,

  async createRoom(userId, quizId, name) {
    set({ loading: true, error: null })
    const { data: comp, error } = await supabase
      .from('competitions')
      .insert({ created_by: userId, quiz_id: quizId, name })
      .select()
      .single()

    if (error) { set({ loading: false, error: error.message }); throw error }

    await supabase.from('competition_participants').insert({
      competition_id: comp.id,
      user_id: userId,
    })

    const quiz = quizzes.find((q) => q.id === quizId) ?? null
    set({ competition: comp, quiz, loading: false })
    return comp.join_code
  },

  async joinRoom(userId, joinCode) {
    set({ loading: true, error: null })

    const { data: comp, error } = await supabase
      .from('competitions')
      .select('*')
      .eq('join_code', joinCode.toUpperCase())
      .single()

    if (error || !comp) {
      const msg = 'Room not found'
      set({ loading: false, error: msg })
      throw new Error(msg)
    }

    if (comp.status === 'open') {
      const { data: existing } = await supabase
        .from('competition_participants')
        .select('id')
        .eq('competition_id', comp.id)
        .eq('user_id', userId)
        .maybeSingle()

      if (!existing) {
        const { count } = await supabase
          .from('competition_participants')
          .select('id', { count: 'exact', head: true })
          .eq('competition_id', comp.id)

        if ((count ?? 0) >= (comp.max_participants ?? 20)) {
          const msg = 'Room is full'
          set({ loading: false, error: msg })
          throw new Error(msg)
        }

        const { error: insertErr } = await supabase
          .from('competition_participants')
          .insert({ competition_id: comp.id, user_id: userId })

        if (insertErr) { set({ loading: false, error: insertErr.message }); throw insertErr }
      }
    }

    const quiz = quizzes.find((q) => q.id === comp.quiz_id) ?? null
    set({ competition: comp, quiz, loading: false })
    return comp
  },

  // Fetch-only — used by results page (no participant insert)
  async loadRoom(joinCode) {
    const { data: comp } = await supabase
      .from('competitions')
      .select('*')
      .eq('join_code', joinCode.toUpperCase())
      .single()

    if (!comp) return null
    const quiz = quizzes.find((q) => q.id === comp.quiz_id) ?? null
    set({ competition: comp, quiz })
    return comp
  },

  async loadParticipants(competitionId) {
    const participants = await fetchWithProfiles(competitionId)
    set({ participants })
  },

  async startGame() {
    const { competition } = get()
    if (!competition) return
    await supabase
      .from('competitions')
      .update({ status: 'active' })
      .eq('id', competition.id)
    set({ competition: { ...competition, status: 'active' } })
  },

  async submitScore(userId, score) {
    const { competition } = get()
    if (!competition) return
    await supabase
      .from('competition_participants')
      .update({ score, completed_at: new Date().toISOString() })
      .eq('competition_id', competition.id)
      .eq('user_id', userId)
  },

  reset() {
    set({ competition: null, participants: [], quiz: null, loading: false, error: null })
  },
}))

export default useCompetitionStore
