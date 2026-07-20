'use client';

import { useMemo } from 'react';

/**
 * A hook to memoize Firebase queries and document references.
 * This is critical to prevent infinite re-rendering loops when 
 * passing dynamic queries to useCollection or useDoc.
 */
export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}
