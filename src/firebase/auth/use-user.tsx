'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * Resilient useUser hook.
 * Supports real Supabase Auth with a transparent Demo Mode fallback.
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
        
        // Check for Demo User
        const demoUser = localStorage.getItem('steak_west_demo_user');
        
        if (demoUser) {
          setUser(JSON.parse(demoUser));
        } else if (session?.user) {
          setUser(session.user);
        }

        // Listen for changes
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_OUT') {
            localStorage.removeItem('steak_west_demo_user');
            setUser(null);
          } else if (session?.user) {
            setUser(session.user);
          }
          setLoading(false);
        });
        
        subscription = data.subscription;
      } catch (error) {
        console.warn('Auth resilience triggered');
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
