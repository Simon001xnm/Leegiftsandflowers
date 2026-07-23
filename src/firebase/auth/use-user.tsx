'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * Resilient useUser hook.
 * Prevents the application from hanging/blinking white if Supabase is initializing.
 */
export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: any = null;

    const initAuth = async () => {
      try {
        const supabase = createClient();
        
        // Initial session check
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
        }

        // Listen for changes
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
          setUser(session?.user || null);
          setLoading(false);
        });
        
        subscription = data.subscription;
      } catch (error) {
        console.warn('Supabase Auth connection bypassed for local stability');
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
