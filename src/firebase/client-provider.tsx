'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

/**
 * Resilient Provider - Never blocks rendering.
 * Fixes blank white screen issues by ensuring children render immediately.
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

  // We wrap children in the provider only if instances exist,
  // but we ALWAYS return something that renders children.
  if (!instances) {
    return <div id="app-root-fallback">{children}</div>;
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
