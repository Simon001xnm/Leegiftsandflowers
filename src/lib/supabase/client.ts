import { createBrowserClient } from '@supabase/ssr'

/**
 * Resilient Supabase client creation.
 * Provides fallbacks to ensure the app doesn't crash if keys are missing.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder-key';
  
  return createBrowserClient(supabaseUrl, supabaseKey);
}