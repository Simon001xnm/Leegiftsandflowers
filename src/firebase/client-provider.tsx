'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

/**
 * Resilient Provider that initializes Firebase on the client.
 * ENSURES immediate rendering of children to prevent white screens.
 */
export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instances, setInstances] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const inst = initializeFirebase();
        setInstances(inst);
      } catch (e) {
        console.warn("Firebase lazy init deferred");
      }
    }
  }, []);

  // ALWAYS return children to prevent the app from being stuck on a white screen
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