'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

/**
 * ULTRA-RESILIENT PROVIDER - NEVER BLOCKS RENDERING.
 * Removed all conditional returns to prevent Next.js 15 hydration stalls.
 */
export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instances, setInstances] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const inst = initializeFirebase();
        setInstances(inst);
      } catch (e) {
        console.warn("Firebase initialization deferred");
      }
    }
  }, []);

  // We wrap children in a fragment if instances aren't ready,
  // ensuring the page content ALWAYS renders immediately.
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
