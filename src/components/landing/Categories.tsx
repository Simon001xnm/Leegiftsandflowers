
'use client';

import React from "react";
import Link from "next/link";
import { Beef, Utensils, ShoppingBag, Store, GlassWater, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: 'cat1', name: 'Butchery', icon: Beef, color: 'bg-red-50 text-red-600', href: '/restaurants?cat=Raw Meat' },
  { id: 'cat2', name: 'Grills', icon: Utensils, color: 'bg-orange-50 text-orange-600', href: '/restaurants?cat=Nyama Choma' },
  { id: 'cat3', name: 'Cooked', icon: ShoppingBag, color: 'bg-emerald-50 text-emerald-600', href: '/restaurants?cat=Cooked' },
  { id: 'cat4', name: 'Grocery', icon: Store, color: 'bg-blue-50 text-blue-600', href: '/restaurants?cat=Grocery' },
  { id: 'cat5', name: 'Drinks', icon: GlassWater, color: 'bg-purple-50 text-purple-600', href: '/restaurants?cat=Drinks' },
  { id: 'cat6', name: 'Quick', icon: Zap, color: 'bg-yellow-50 text-yellow-600', href: '/restaurants?cat=Delicacies' },
];

export function Categories() {
  return (
    <section className="sticky top-20 md:top-24 z-40 bg-white/95 backdrop-blur-md border-b py-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex gap-6 md:gap-12 overflow-x-auto no-scrollbar px-4 pb-2">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={cat.href} className="flex flex-col items-center gap-2 shrink-0 group">
              <div className={cn(
                "w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all group-hover:scale-110 group-active:scale-90 shadow-md",
                cat.color
              )}>
                <cat.icon className="w-6 h-6 md:w-7 h-7" />
              </div>
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-tighter text-black">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
