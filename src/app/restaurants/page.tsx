"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { Search, Star, Clock, Beef, Utensils, Zap, ShoppingBag, Heart, Pizza, Coffee, IceCream } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { label: 'Grocery', icon: ShoppingBag },
  { label: 'Raw Meat', icon: Beef },
  { label: 'Choma', icon: Utensils },
  { label: 'Grills', icon: Zap },
  { label: 'Pizza', icon: Pizza },
  { label: 'Drinks', icon: Coffee },
];

function DiscoveryContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | 'All'>('All');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filteredRestaurants = MOCK_RESTAURANTS.filter(r => 
    category === 'All' || r.category === category
  );

  return (
    <main className="flex-grow bg-white pb-20">
      {/* Category Strip */}
      <div className="sticky top-12 z-40 bg-white border-b overflow-x-auto no-scrollbar py-2 px-3 shadow-sm">
        <div className="flex items-center gap-4 min-w-max container mx-auto justify-center md:justify-start">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.label}
              onClick={() => setCategory(cat.label)}
              className={cn(
                "flex flex-col items-center gap-1 group transition-all shrink-0",
                category === cat.label ? "opacity-100" : "opacity-50 hover:opacity-100"
              )}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <cat.icon className="w-4 h-4 text-black" />
              </div>
              <span className="text-[7.5px] font-black text-black tracking-tight uppercase">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-2 space-y-8 py-6">
        {/* Stores near you - Circular Nodes */}
        <section className="space-y-3">
          <h2 className="text-[10px] md:text-lg font-black tracking-tighter uppercase px-1">STORES NEAR YOU</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
            {MOCK_RESTAURANTS.map((brand, i) => (
              <div key={brand.id + i} className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer">
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-gray-100 p-0.5 overflow-hidden group-hover:border-primary transition-all">
                  <Image src={brand.imageUrl} alt={brand.name} width={80} height={80} className="object-cover w-full h-full rounded-full" />
                </div>
                <div className="text-center">
                   <span className="text-[7px] md:text-[11px] font-black uppercase leading-none block">{brand.name.split(' ')[0]}</span>
                   <span className="text-[6px] text-gray-400 font-bold">15 MIN</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ULTRA-HIGH DENSITY GRID - 4 PER ROW ON MOBILE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] md:text-xl font-black tracking-tighter uppercase">POPULAR FAVORITES</h2>
            <Link href="/restaurants"><span className="text-[8px] md:text-[11px] font-black text-black uppercase tracking-widest hover:text-primary transition-colors">ALL NODES</span></Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
            {filteredRestaurants.map((r) => (
              <Link key={r.id} href={`/restaurants/${r.id}`} className="group flex flex-col gap-1.5">
                <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-gray-100 border border-gray-50">
                  <Image src={r.imageUrl} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-1 right-1">
                    <button className="bg-white/90 p-1 rounded-full shadow-sm text-black hover:text-primary transition-colors">
                      <Heart className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="absolute bottom-1 left-1 bg-white/90 px-1 py-0.5 text-[6px] font-black rounded uppercase">
                    PROMO
                  </div>
                </div>
                <div className="space-y-0.5 px-0.5">
                  <h3 className="text-[8px] md:text-[14px] font-black truncate leading-tight tracking-tighter uppercase group-hover:text-primary transition-colors">{r.name}</h3>
                  <div className="flex items-center gap-1 text-[6.5px] md:text-[11px] font-bold text-gray-500">
                     <Star className="w-2 h-2 fill-black text-black" />
                     <span className="text-black">{r.rating}</span>
                     <span className="opacity-30">•</span>
                     <span>{r.deliveryTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function MeatDiscovery() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Suspense fallback={<div className="flex-grow flex items-center justify-center font-black text-gray-400 uppercase text-[10px]">SYNCING NODES...</div>}>
        <DiscoveryContent />
      </Suspense>
    </div>
  );
}
