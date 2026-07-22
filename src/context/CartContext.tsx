'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
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
 * Robust Singleton Provider for Cart State.
 * Resolves HMR "Module factory not available" issues.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('steak_west_basket_v5');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Basket restore failed');
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem('steak_west_basket_v5', JSON.stringify(cart));
    }
  }, [cart, isReady]);

  const addToCart = useCallback((item: MenuItem) => {
    setCart((curr) => {
      const idx = curr.findIndex((i) => i.item.id === item.id);
      if (idx > -1) {
        const next = [...curr];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...curr, { item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((curr) => {
      const idx = curr.findIndex((i) => i.item.id === itemId);
      if (idx > -1 && curr[idx].quantity > 1) {
        const next = [...curr];
        next[idx] = { ...next[idx], quantity: next[idx].quantity - 1 };
        return next;
      }
      return curr.filter((i) => i.item.id !== itemId);
    });
  }, []);

  const clearItem = useCallback((itemId: string) => {
    setCart((curr) => curr.filter((i) => i.item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

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
  }), [cart, addToCart, removeFromCart, clearItem, clearCart, subtotal, itemCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    // Return a dummy state to prevent crashes before provider loads
    return {
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
      clearItem: () => {},
      clearCart: () => {},
      subtotal: 0,
      itemCount: 0
    };
  }
  return context;
}
