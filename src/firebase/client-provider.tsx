'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

/**
 * Resilient Provider that handles the transition from server to client.
 * Returns a minimal placeholder to avoid hydration mismatches without blocking the UI.
 */
export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instances, setInstances] = useState<{
    firebaseApp: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
  } | null>(null);

  useEffect(() => {
    // Initialization is synchronous once on the client
    const results = initializeFirebase();
    setInstances(results);
  }, []);

  // Return children even if instances are null initially to prevent a blank screen.
  // The Firebase context will be provided as soon as the effect runs.
  if (!instances) {
    return <div className="min-h-screen bg-white" />; 
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
