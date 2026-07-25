'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * PRODUCTION-ONLY useUser hook.
 * Exclusively supports real Supabase Auth sessions.
 */
export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: any = null;
    const supabase = createClient();

    const initAuth = async () => {
      try {
        // Initial session check
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
        }

        // Listen for changes
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_OUT') {
            setUser(null);
          } else if (session?.user) {
            setUser(session.user);
          }
          setLoading(false);
        });
        
        subscription = data.subscription;
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
