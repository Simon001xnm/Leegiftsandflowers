
import { createBrowserClient } from '@supabase/ssr'

/**
 * ULTRA-RESILIENT Supabase client.
 * Provides a robust fallback shell to prevent app crashes when keys are missing.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder';
  
  try {
    // If it's a placeholder URL, return the fallback shell immediately to avoid fetch errors
    if (supabaseUrl.includes('placeholder')) {
      return createFallbackShell();
    }
    return createBrowserClient(supabaseUrl, supabaseKey);
  } catch (e) {
    return createFallbackShell();
  }
}

function createFallbackShell() {
  return {
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          order: () => Promise.resolve({ data: [], error: null }),
          single: () => Promise.resolve({ data: null, error: null })
        }),
        order: () => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null })
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      upsert: () => Promise.resolve({ data: null, error: null }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.reject(new Error("Supabase Keys Missing")),
      signUp: () => Promise.reject(new Error("Supabase Keys Missing")),
      signOut: () => Promise.resolve({ error: null }),
    }
  } as any;
}
