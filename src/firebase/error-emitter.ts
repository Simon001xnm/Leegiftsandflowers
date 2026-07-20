'use client';

import { EventEmitter } from 'events';

/**
 * A central event emitter for Firebase-related errors.
 * Used to decouple error triggers from the UI handling them.
 */
export const errorEmitter = new EventEmitter();
