'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

/**
 * Resilient Provider that initializes Firebase on the client.
 * Ensures the app renders children immediately even during initialization
 * to prevent the "blank white screen" issue.
 */
export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instances, setInstances] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const inst = initializeFirebase();
        setInstances(inst);
      } catch (e) {
        console.error("Firebase failover initialization:", e);
      }
    }
  }, []);

  // Return children even if Firebase isn't ready to prevent a blank screen.
  // The Firebase context hooks should handle null instances gracefully.
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
