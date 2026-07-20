'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * A global listener that surfaces Firebase errors via toasts.
 * This provides a consistent experience for handling permission issues.
 */
export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      console.error('Firebase Permission Denied:', error);
      
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: `You don't have permission to ${error.operation} at ${error.path}. Please check your account role.`,
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
