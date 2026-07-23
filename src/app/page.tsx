'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_MENU } from "@/lib/food-data";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Heart, ChevronRight } from "lucide-react";

/**
 * ULTRA-HIGH DENSITY LANDING PAGE
 * Optimized for 4 columns on mobile to match premium retail standards.
 * Simplified architectural pattern to prevent HMR module factory errors.
 */
export default function Home() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow space-y-0">
        {/* Compact Hero Node */}
        <div className="relative h-[250px] md:h-[450px] w-full overflow-hidden bg-black flex items-center">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          >
            <source src="/From Klickpin.com- 833517843581501058-pin-id-833517843581501058 (1).mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="relative z-10 w-full px-4 container mx-auto">
            <div className="flex flex-col space-y-2 max-w-xl">
              <span className="bg-primary text-white w-fit px-1.5 py-0.5 text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                NAIROBI #1
              </span>
              <h1 className="text-3xl md:text-6xl font-black text-white leading-[0.85] uppercase tracking-tighter">
                PREMIUM<br /><span className="text-primary italic">MEAT DISPATCH</span>
              </h1>
              <div className="flex gap-2 pt-2">
                <Link href="/restaurants">
                  <button className="h-8 md:h-12 px-5 bg-primary text-white font-black text-[9px] md:text-[12px] uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all">
                    ORDER NOW
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ULTRA-HIGH DENSITY MARKET GRID - MINIMUM 4 COLUMNS ON MOBILE */}
        <section className="py-6 md:py-12 bg-white px-2 md:px-12 container mx-auto">
          <div className="flex items-end justify-between mb-4 px-1">
            <div className="space-y-0">
              <h2 className="text-[11px] md:text-2xl font-black text-black leading-tight uppercase tracking-tighter">PREMIUM SELECTIONS</h2>
              <p className="text-gray-400 font-bold text-[7px] md:text-[10px] uppercase tracking-[0.1em]">NODE DISPATCH ACTIVE</p>
            </div>
            <Link href="/restaurants" className="flex items-center gap-1 text-[8px] md:text-[12px] font-black uppercase tracking-widest hover:text-primary transition-colors">
              SEE ALL <ChevronRight className="w-2.5 h-2.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-6">
            {MOCK_MENU.map((item) => (
              <div key={item.id} className="group flex flex-col gap-1.5">
                <div className="relative aspect-square rounded-sm overflow-hidden bg-gray-50 border border-gray-100">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 25vw, 15vw"
                  />
                  <div className="absolute top-0.5 right-0.5">
                    <button className="rounded-full bg-white/90 p-1 shadow-sm text-black hover:text-primary transition-colors">
                      <Heart className="w-2.5 h-2.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-[7.5px] md:text-[13px] font-black truncate uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[7.5px] md:text-[14px] font-black">KES {item.price}</span>
                    <button 
                      onClick={() => {
                        addToCart(item);
                        toast({ title: "Added", description: `${item.name} ready.` });
                      }}
                      className="rounded-full bg-black text-white px-2 py-0.5 font-black text-[6px] md:text-[9px] uppercase tracking-widest hover:bg-primary transition-all"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Footer */}
        <footer className="bg-black text-white pt-10 pb-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-white/10 pb-10">
              <div className="space-y-3">
                <div className="relative h-6 w-24">
                  <Image src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" alt="Steak West" fill className="object-contain object-left" />
                </div>
                <p className="text-[8px] md:text-[12px] font-bold text-gray-500 uppercase tracking-tighter max-w-xs">
                  THE GOLD STANDARD IN NAIROBI MEAT LOGISTICS. SECURE, FAST, RELIABLE.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <h4 className="text-[7px] font-black text-gray-400 uppercase tracking-widest">PLATFORM</h4>
                  <ul className="space-y-1 text-[8px] font-bold uppercase tracking-tighter">
                    <li><Link href="/restaurants" className="hover:text-primary">MARKETPLACE</Link></li>
                    <li><Link href="/profile" className="hover:text-primary">ACCOUNT</Link></li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[7px] font-black text-gray-400 uppercase tracking-widest">SECURITY</h4>
                  <ul className="space-y-1 text-[8px] font-bold text-gray-500 uppercase tracking-tighter">
                    <li>SSL PROTECTION</li>
                    <li>SUPABASE NODE</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-6 text-[7px] font-black text-gray-600 uppercase tracking-widest">
              <p>© 2026 STEAK WEST GLOBAL.</p>
              <p>ENCRYPTED TERMINAL</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
