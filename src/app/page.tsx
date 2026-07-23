'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_MENU } from "@/lib/food-data";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

/**
 * ULTRA-STABLE HIGH-DENSITY LANDING PAGE
 * Locked to 4 columns on mobile.
 * Uses inline SVGs to permanently resolve Lucide-React HMR module factory errors.
 */
export default function Home() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        {/* Compact Hero */}
        <div className="relative h-[240px] md:h-[450px] w-full overflow-hidden bg-black flex items-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
          <div className="relative z-20 w-full px-6 container mx-auto">
            <div className="flex flex-col space-y-2 max-w-2xl">
              <span className="bg-primary text-white w-fit px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em]">
                DISPATCH_ACTIVE
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] uppercase tracking-tighter">
                PREMIUM<br /><span className="text-primary italic">MEAT SERVICE</span>
              </h1>
              <div className="pt-4 flex gap-3">
                <Link href="/restaurants">
                  <button className="h-10 md:h-14 px-8 bg-primary text-white font-black text-[11px] md:text-[13px] uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-2xl">
                    ORDER NOW
                  </button>
                </Link>
                <Link href="/dashboard/customer">
                  <button className="h-10 md:h-14 px-8 bg-white/10 text-white border border-white/20 font-black text-[11px] md:text-[13px] uppercase tracking-widest rounded-full hover:bg-white/20 transition-all backdrop-blur-md">
                    TRACK FLEET
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <Image 
            src="https://picsum.photos/seed/steak88/1200/800" 
            alt="Hero" 
            fill 
            className="object-cover opacity-70"
            priority
            sizes="100vw"
            data-ai-hint="premium meat"
          />
        </div>

        {/* ULTRA-HIGH DENSITY 4-COLUMN MOBILE GRID */}
        <section className="py-10 bg-white px-3 md:px-12 container mx-auto">
          <div className="flex items-end justify-between mb-6 px-1 border-b-2 border-black pb-2">
            <div className="space-y-0.5">
              <h2 className="text-[14px] md:text-2xl font-black text-black leading-tight uppercase tracking-tighter">PREMIUM SELECTIONS</h2>
              <p className="text-gray-400 font-bold text-[8px] md:text-[11px] uppercase tracking-[0.2em]">GLOBAL DISPATCH READY</p>
            </div>
            <Link href="/restaurants" className="text-[9px] md:text-[12px] font-black uppercase tracking-widest hover:text-primary transition-colors">
              SEE ALL
            </Link>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4">
            {MOCK_MENU.map((item) => (
              <div key={item.id} className="group flex flex-col gap-2">
                <div className="relative aspect-square rounded-sm overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                  <div className="absolute top-1 right-1">
                    <button className="rounded-full bg-white/95 p-1 shadow-md text-black hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    </button>
                  </div>
                </div>
                <div className="space-y-1 px-0.5">
                  <h3 className="text-[9px] md:text-[14px] font-black truncate uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] md:text-[15px] font-black">KES {item.price}</span>
                    <button 
                      onClick={() => {
                        addToCart(item);
                        toast({ title: "READY", description: `${item.name} added.` });
                      }}
                      className="rounded-full bg-black text-white px-2 py-0.5 font-black text-[7px] md:text-[10px] uppercase tracking-widest hover:bg-primary transition-all active:scale-90 shadow-sm"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fleet Status Nodes */}
        <section className="bg-gray-50 py-12 px-6 border-y">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'NODES ACTIVE', val: '14/14' },
              { label: 'AVG DURATION', val: '22 MIN' },
              { label: 'SECURE LINK', val: 'ESTABLISHED' },
              { label: 'FLEET CAPACITY', val: 'OPTIMAL' }
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <p className="text-[8px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">{stat.label}</p>
                <p className="text-[13px] md:text-[20px] font-black text-black uppercase tracking-tighter">{stat.val}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-black text-white pt-16 pb-28 px-8 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-b border-white/10 pb-10 mb-10">
             <h2 className="text-3xl font-black italic tracking-tighter">STEAK WEST<span className="text-primary font-black">.</span></h2>
             <p className="text-[9px] md:text-[12px] font-black text-gray-500 uppercase tracking-[0.4em]">
               PREMIUM MEAT DISTRIBUTION NETWORK // EST. 2026
             </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[8px] md:text-[11px] font-bold text-gray-600 uppercase tracking-widest">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> SECURE_TERMINAL_V3</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> ENCRYPTED_NODE</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> SUPABASE_ACTIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
