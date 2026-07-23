import { createBrowserClient } from '@supabase/ssr'

/**
 * ULTRA-RESILIENT Supabase client.
 * Prevents white-screen crashes if environment variables are not yet fully injected.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  
  // Use non-crashing fallbacks for development/initial-build stability
  if (!supabaseUrl || !supabaseKey) {
    return createBrowserClient(
      'https://placeholder-project.supabase.co', 
      'placeholder-key'
    );
  }
  
  return createBrowserClient(supabaseUrl, supabaseKey);
}
