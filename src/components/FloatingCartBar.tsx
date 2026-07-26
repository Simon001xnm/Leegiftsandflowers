'use client';

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HIGH-DENSITY RETAIL COMPONENT
 * A floating bar that appears when items are in the cart.
 * Positioned for maximum ergonomic reach on mobile.
 */
export function FloatingCartBar() {
  const { itemCount, subtotal } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-10 left-0 right-0 z-40 px-4 pointer-events-none animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-xl mx-auto pointer-events-auto">
        <Link href="/checkout">
          <div className="bg-black text-white h-16 rounded-2xl flex items-center justify-between px-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all border border-white/10 group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-black">
                  {itemCount}
                </span>
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-black text-white/50 uppercase tracking-widest leading-none">View Basket</p>
                <p className="text-lg font-black tracking-tighter leading-none">KES {subtotal.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
               <span className="text-[9px] font-black uppercase tracking-widest group-hover:mr-1 transition-all">Go to Checkout</span>
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <ArrowRight className="w-4 h-4" />
               </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
