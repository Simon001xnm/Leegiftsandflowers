'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { MenuItem } from '@/lib/food-data';

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

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('steak_west_basket_final');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Cart sync paused');
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('steak_west_basket_final', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = useCallback((item: MenuItem) => {
    setCart((current) => {
      const idx = current.findIndex((i) => i.item.id === item.id);
      if (idx > -1) {
        const next = [...current];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...current, { item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((current) => {
      const idx = current.findIndex((i) => i.item.id === itemId);
      if (idx > -1 && current[idx].quantity > 1) {
        const next = [...current];
        next[idx] = { ...next[idx], quantity: next[idx].quantity - 1 };
        return next;
      }
      return current.filter((i) => i.item.id !== itemId);
    });
  }, []);

  const clearItem = useCallback((itemId: string) => {
    setCart((current) => current.filter((i) => i.item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const subtotal = useMemo(() => cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0), [cart]);
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

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
