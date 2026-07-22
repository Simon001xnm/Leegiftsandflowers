'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * Migration: useUser hook now powered by Supabase.
 * Supports "Demo Mode" for testing if Supabase isn't configured or during dev.
 */
export function useUser() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    const getInitialUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        // Fallback to Demo Mode check
        const mockUserData = localStorage.getItem('abc_demo_user');
        if (mockUserData) {
          try {
            setUser(JSON.parse(mockUserData));
          } catch (e) {
            setUser(null);
          }
        }
      }
      setLoading(false);
    };

    getInitialUser();

    // 2. Listen for Auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        const mockUserData = localStorage.getItem('abc_demo_user');
        if (mockUserData) {
          setUser(JSON.parse(mockUserData));
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return { user, loading };
}
