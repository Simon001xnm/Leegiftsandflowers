'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

/**
 * Resilient Provider that handles the transition from server to client.
 * Returns children immediately to prevent blank screens while instances initialize.
 */
export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instances, setInstances] = useState<{
    firebaseApp: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
  } | null>(null);

  useEffect(() => {
    try {
      const results = initializeFirebase();
      setInstances(results);
    } catch (e) {
      console.error("Firebase initialization error:", e);
    }
  }, []);

  // Render children immediately to avoid the blank white screen.
  // The provider will wrap them once Firebase is ready.
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
