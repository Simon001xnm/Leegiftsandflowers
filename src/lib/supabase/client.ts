import { createBrowserClient } from '@supabase/ssr'

/**
 * PRODUCTION SUPABASE CLIENT
 * Strictly uses environment variables for real database and storage connectivity.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  
  // Validation for production mode
  const isMissing = !supabaseUrl || !supabaseKey || 
                    supabaseUrl.includes('placeholder') || 
                    supabaseKey.includes('placeholder');

  if (isMissing) {
    console.error("CRITICAL ERROR: Supabase production credentials are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your environment.");
  }

  return createBrowserClient(
    supabaseUrl || 'https://missing.supabase.co', 
    supabaseKey || 'missing-key'
  );
}