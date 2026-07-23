"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { label: 'Grocery' },
  { label: 'Raw Meat' },
  { label: 'Choma' },
  { label: 'Grills' },
  { label: 'Pizza' },
  { label: 'Drinks' },
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
      {/* High Density Category Strip */}
      <div className="sticky top-12 z-40 bg-white border-b overflow-x-auto no-scrollbar py-2 px-3">
        <div className="flex items-center gap-6 min-w-max container mx-auto">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.label}
              onClick={() => setCategory(cat.label)}
              className={cn(
                "group transition-all shrink-0",
                category === cat.label ? "opacity-100" : "opacity-50 hover:opacity-100"
              )}
            >
              <span className="text-[8px] md:text-[10px] font-black text-black tracking-widest uppercase">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-2 space-y-6 py-6">
        {/* Stores near you */}
        <section className="space-y-3">
          <h2 className="text-[9px] md:text-base font-black tracking-tighter uppercase px-1">STORES NEAR YOU</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            {MOCK_RESTAURANTS.map((brand, i) => (
              <div key={brand.id + i} className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-100 p-0.5 overflow-hidden group-hover:border-primary transition-all">
                  <Image src={brand.imageUrl} alt={brand.name} width={64} height={64} className="object-cover w-full h-full rounded-full" />
                </div>
                <span className="text-[6.5px] md:text-[9px] font-black uppercase leading-none">{brand.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ULTRA-HIGH DENSITY GRID - 4 PER ROW ON MOBILE */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[9px] md:text-base font-black tracking-tighter uppercase">POPULAR FAVORITES</h2>
            <Link href="/restaurants"><span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary">VIEW ALL</span></Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
            {filteredRestaurants.map((r) => (
              <Link key={r.id} href={`/restaurants/${r.id}`} className="group flex flex-col gap-1">
                <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-gray-100 border border-gray-50">
                  <Image src={r.imageUrl} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-0.5 right-0.5">
                    <button className="bg-white/90 p-0.5 rounded-full shadow-sm text-black hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    </button>
                  </div>
                </div>
                <div className="space-y-0.5 px-0.5">
                  <h3 className="text-[7.5px] md:text-[12px] font-black truncate leading-tight tracking-tighter uppercase group-hover:text-primary transition-colors">{r.name}</h3>
                  <div className="flex items-center gap-1 text-[6px] md:text-[10px] font-bold text-gray-500">
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
      <Suspense fallback={<div className="flex-grow flex items-center justify-center font-black text-gray-300 uppercase text-[8px]">SYNCING NODES...</div>}>
        <DiscoveryContent />
      </Suspense>
    </div>
  );
}