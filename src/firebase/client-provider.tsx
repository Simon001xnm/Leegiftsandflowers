'use client';

import React, { useMemo } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

/**
 * Resilient Provider that initializes Firebase on the client.
 * Uses useMemo for immediate singleton initialization to prevent blank screen renders.
 */
export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const instances = useMemo(() => {
    if (typeof window === 'undefined') return null;
    try {
      return initializeFirebase();
    } catch (e) {
      console.error("Firebase init error:", e);
      return null;
    }
  }, []);

  // Wrap children. If Firebase isn't initialized yet (SSR or error), 
  // we render children raw to ensure the initial HTML is visible.
  if (!instances) {
    return <>{children}</>; 
  }

  return (
    <FirebaseProvider
      firebaseApp={instances.firebaseApp}
      firestore={instances.firestore}
      auth={instances.auth}
    >
      {children}
    </FirebaseProvider>
  );
};
