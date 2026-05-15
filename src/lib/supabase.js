import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '[Emenize Ben Yafit] Supabase env vars not set. ' +
    'Copy .env.example → .env.local and fill in VITE_SUPABASE_URL and VITE_SUPABASE_KEY.'
  )
}

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseKey ?? 'placeholder-key'
)
