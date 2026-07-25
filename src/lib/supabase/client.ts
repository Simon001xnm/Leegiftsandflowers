import { createBrowserClient } from '@supabase/ssr'

/**
 * PRODUCTION SUPABASE CLIENT
 * Strictly uses environment variables for real database and storage connectivity.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder')) {
    console.error("CRITICAL: Supabase Environment Variables are missing or contain placeholder values.");
    // We return a client that will fail gracefully with a 401 if used, 
    // but the app logic now checks for these keys before calling.
  }

  return createBrowserClient(
    supabaseUrl || 'https://missing-url.supabase.co', 
    supabaseKey || 'missing-key'
  );
}
