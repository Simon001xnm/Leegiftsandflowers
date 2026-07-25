import { createBrowserClient } from '@supabase/ssr'

/**
 * PRODUCTION SUPABASE CLIENT
 * Strictly uses environment variables for real database and storage connectivity.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("CRITICAL: Supabase Environment Variables are missing. Production operations are unavailable.");
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
