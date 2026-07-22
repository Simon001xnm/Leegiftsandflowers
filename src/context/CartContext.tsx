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
 * Stable CartProvider to prevent HMR module factory errors.
 * Uses a bulletproof, simplified export pattern for Turbopack.
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('steak_west_v2');
      if (saved) {
        try {
          setCart(JSON.parse(saved));
        } catch (e) {
          console.error('Basket recovery failed');
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Sync to storage
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('steak_west_v2', JSON.stringify(cart));
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
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
