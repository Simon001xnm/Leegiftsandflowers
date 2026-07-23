'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_MENU } from "@/lib/food-data";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

/**
 * ULTRA-HIGH DENSITY LANDING PAGE
 * Optimized for 4 columns on mobile side-by-side.
 * Dependency-free icons to prevent HMR module factory errors.
 */
export default function Home() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        {/* Compressed Hero Node */}
        <div className="relative h-[200px] md:h-[350px] w-full overflow-hidden bg-black flex items-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <div className="relative z-20 w-full px-4 container mx-auto">
            <div className="flex flex-col space-y-1 max-w-xl">
              <span className="bg-primary text-white w-fit px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest">
                DISPATCH_LIVE
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.8] uppercase tracking-tighter">
                PREMIUM<br /><span className="text-primary italic">MEAT SERVICE</span>
              </h1>
              <div className="pt-3">
                <Link href="/restaurants">
                  <button className="h-9 md:h-12 px-8 bg-primary text-white font-black text-[10px] md:text-[12px] uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl">
                    ORDER NOW
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <Image 
            src="https://picsum.photos/seed/steak/1200/800" 
            alt="Hero" 
            fill 
            className="object-cover opacity-60"
            priority
          />
        </div>

        {/* ULTRA-HIGH DENSITY 4-COLUMN MOBILE GRID */}
        <section className="py-8 bg-white px-2 md:px-12 container mx-auto">
          <div className="flex items-end justify-between mb-5 px-1">
            <div className="space-y-0">
              <h2 className="text-[11px] md:text-xl font-black text-black leading-tight uppercase tracking-tighter">PREMIUM SELECTIONS</h2>
              <p className="text-gray-400 font-bold text-[7px] md:text-[10px] uppercase tracking-widest">AVAILABLE FOR DISPATCH</p>
            </div>
            <Link href="/restaurants" className="text-[8px] md:text-[11px] font-black uppercase tracking-widest hover:text-primary transition-colors border-b-2 border-black pb-0.5">
              SEE ALL
            </Link>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4">
            {MOCK_MENU.map((item) => (
              <div key={item.id} className="group flex flex-col gap-1.5">
                <div className="relative aspect-square rounded-sm overflow-hidden bg-gray-50 border border-gray-100">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 25vw, 15vw"
                  />
                  <div className="absolute top-0.5 right-0.5">
                    <button className="rounded-full bg-white/95 p-1 shadow-md text-black hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    </button>
                  </div>
                </div>
                <div className="space-y-0.5 px-0.5">
                  <h3 className="text-[8px] md:text-[13px] font-black truncate uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[8px] md:text-[14px] font-black">KES {item.price}</span>
                    <button 
                      onClick={() => {
                        addToCart(item);
                        toast({ title: "READY", description: `${item.name} added.` });
                      }}
                      className="rounded-full bg-black text-white px-2 py-0.5 font-black text-[6px] md:text-[9px] uppercase tracking-widest hover:bg-primary transition-all active:scale-90"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Dispatch Status */}
        <section className="bg-gray-50 py-10 px-4 border-y">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'DISPATCH NODES', val: 'ACTIVE' },
              { label: 'AVG DURATION', val: '22 MIN' },
              { label: 'SECURE LINK', val: 'ESTABLISHED' },
              { label: 'FLEET SIZE', val: '450+' }
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <p className="text-[7px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-[12px] md:text-[18px] font-black text-black uppercase tracking-tighter">{stat.val}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-black text-white pt-12 pb-24 px-6 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-8 mb-8">
             <h2 className="text-2xl font-black italic tracking-tighter">STEAK WEST<span className="text-primary font-black">.</span></h2>
             <p className="text-[8px] md:text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">
               PREMIUM MEAT DISTRIBUTION NETWORK // 2026
             </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[7px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            <span>SECURE_TERMINAL_V3</span>
            <span>ENCRYPTED_NODE</span>
            <span>SUPABASE_PROTECTED</span>
            <span>FIREBASE_READY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
