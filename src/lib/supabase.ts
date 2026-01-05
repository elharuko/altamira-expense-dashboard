import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cvvgwcfjhcvylifxpadc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2dmd3Y2ZqaGN2eWxpZnhwYWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2Mjk2MTgsImV4cCI6MjA4MzIwNTYxOH0.lrAg7JynbNoV4eozr4wyDI2RfxQlbMWktcpoYt6DgDk'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)