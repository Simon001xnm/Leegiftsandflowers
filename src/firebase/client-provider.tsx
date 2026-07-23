'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

/**
 * ULTRA-RESILIENT PROVIDER - NEVER BLOCKS RENDERING.
 * Ensures that the application shell is painted immediately.
 * Background services sync after initial UI paint.
 */
export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instances, setInstances] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const inst = initializeFirebase();
        setInstances(inst);
      } catch (e) {
        console.warn("Firebase initialization deferred for stability");
      }
    }
  }, []);

  // Root shell renders immediately with or without Firebase instances
  // If instances aren't ready, we provide a shell that prevents the white screen.
  if (!instances) {
    return <div id="steak-west-shell" className="min-h-screen bg-white">{children}</div>;
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
