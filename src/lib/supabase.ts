import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dntkjaoyywbdreuqopda.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudGtqYW95eXdiZHJldXFvcGRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNDc4NjMsImV4cCI6MjA3NzgyMzg2M30.4dx8avzfcU2aNEXesoOuMygmh3Go8KIvqRsepx0s5EY';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)