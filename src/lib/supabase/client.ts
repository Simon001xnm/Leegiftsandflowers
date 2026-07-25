
import { createBrowserClient } from '@supabase/ssr'

/**
 * PRODUCTION SUPABASE CLIENT
 * Uses publishable keys for public reads and authenticated sessions for admin writes.
 * RLS is enforced at the database level.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  
  // Guard against placeholder or missing keys
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
    console.warn("Supabase Environment Variables Missing or Placeholder. Using fallback shell.");
    return createFallbackShell();
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}

function createFallbackShell() {
  return {
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          order: () => Promise.resolve({ data: [], error: null }),
          single: () => Promise.resolve({ data: null, error: null })
        }),
        order: () => ({
          eq: () => Promise.resolve({ data: [], error: null }),
          select: () => Promise.resolve({ data: [], error: null })
        }),
        single: () => Promise.resolve({ data: null, error: null })
      }),
      insert: () => Promise.resolve({ data: null, error: new Error("Environment Keys Missing. Database writes are disabled.") }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      upsert: () => Promise.resolve({ data: null, error: null }),
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: new Error("Environment Keys Missing. Storage uploads are disabled.") }),
        getPublicUrl: () => ({ data: { publicUrl: "" } })
      })
    },
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
