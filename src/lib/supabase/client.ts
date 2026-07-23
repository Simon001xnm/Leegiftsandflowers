import { createBrowserClient } from '@supabase/ssr'

/**
 * Resilient Supabase client creation.
 * Uses fallbacks to prevent the application from crashing if environment variables are missing.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder-key';
  
  return createBrowserClient(supabaseUrl, supabaseKey);
}
