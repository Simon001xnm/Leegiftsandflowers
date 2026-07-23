'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

/**
 * Resilient Provider that initializes Firebase on the client.
 * Ensures the app renders immediately even during sync.
 */
export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instances, setInstances] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const inst = initializeFirebase();
        setInstances(inst);
      } catch (e) {
        console.error("Firebase failover:", e);
      }
    }
  }, []);

  // Always render children to prevent white screen
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
