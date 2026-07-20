'use client';

import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../provider';

/**
 * Enhanced useUser hook that supports "Demo Mode" for testing.
 * If no real Firebase user is found, it checks for a mock user in localStorage.
 */
export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Listen for real Firebase Auth changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setLoading(false);
      } else {
        // 2. Fallback to Demo Mode check if no real user
        const mockUserData = localStorage.getItem('abc_demo_user');
        if (mockUserData) {
          try {
            setUser(JSON.parse(mockUserData));
          } catch (e) {
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading };
}
