import { createClient } from '@supabase/supabase-js'

const supabaseUrl = ''
const supabaseAnonKey = ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)