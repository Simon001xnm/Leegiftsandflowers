import { createBrowserClient } from '@supabase/ssr'

/**
 * Resilient Supabase client.
 * Prevents app crashes if environment variables are not yet injected.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  
  // If keys are missing, we use a placeholder to avoid total initialization failure
  // which results in a white screen.
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase keys missing. Using local-only mode.");
    return createBrowserClient(
      'https://placeholder-project.supabase.co', 
      'placeholder-key'
    );
  }
  
  return createBrowserClient(supabaseUrl, supabaseKey);
}
