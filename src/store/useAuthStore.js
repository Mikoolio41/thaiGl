import { create } from 'zustand'
import { supabase } from '../lib/supabase'

const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  modalOpen: false,

  /** Call once in App.jsx. Returns the unsubscribe function. */
  init: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ user: session?.user ?? null, loading: false })
      if (session?.user) get().fetchProfile(session.user.id)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null })
      if (session?.user) get().fetchProfile(session.user.id)
      else set({ profile: null })
    })

    return () => subscription.unsubscribe()
  },

  fetchProfile: async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (data) set({ profile: data })
  },

  signInWithGoogle: () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    }),

  signInWithEmail: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  },

  signUpWithEmail: async (email, password, username) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { preferred_username: username } },
    })
    return { error }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null })
  },

  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
}))

export default useAuthStore
