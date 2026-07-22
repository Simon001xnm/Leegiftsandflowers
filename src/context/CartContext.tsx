'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { MenuItem } from '@/lib/food-data';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  clearItem: (itemId: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

/**
 * Robust CartProvider refactored to prevent HMR module factory errors.
 * Uses a stable, clean export pattern for Next.js Turbopack.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from storage once
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('steak_west_basket_v1.1') : null;
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Basket recovery failed');
      }
    }
    setIsLoaded(true);
  }, []);

  // Sync back to storage on changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('steak_west_basket_v1.1', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (item: MenuItem) => {
    setCart((curr) => {
      const idx = curr.findIndex((i) => i.item.id === item.id);
      if (idx > -1) {
        const next = [...curr];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...curr, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((curr) => {
      const idx = curr.findIndex((i) => i.item.id === itemId);
      if (idx > -1 && curr[idx].quantity > 1) {
        const next = [...curr];
        next[idx] = { ...next[idx], quantity: next[idx].quantity - 1 };
        return next;
      }
      return curr.filter((i) => i.item.id !== itemId);
    });
  };

  const clearItem = (itemId: string) => {
    setCart((curr) => curr.filter((i) => i.item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const subtotal = useMemo(() => cart.reduce((acc, c) => acc + (c.item.price * c.quantity), 0), [cart]);
  const itemCount = useMemo(() => cart.reduce((acc, c) => acc + c.quantity, 0), [cart]);

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearItem,
    clearCart,
    subtotal,
    itemCount
  }), [cart, subtotal, itemCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
