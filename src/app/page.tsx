
'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";

/**
 * ULTRA-STABLE HIGH-DENSITY LANDING PAGE
 * Powered by Supabase Live Data.
 * Locked to 4 columns on mobile using inline SVGs for performance.
 */
export default function Home() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const supabase = createClient();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_in_stock', true)
          .order('created_at', { ascending: false });
        
        if (!error && data) setProducts(data);
      } catch (e) {
        console.error("Supabase link deferred");
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [supabase]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="h-12 border-b flex items-center justify-between px-4 sticky top-0 bg-white z-50">
         <Link href="/" className="font-black italic text-lg tracking-tighter">STEAK WEST<span className="text-primary">.</span></Link>
         <div className="flex gap-4">
           <Link href="/login" className="text-[10px] font-black uppercase tracking-widest">Sign In</Link>
           <Link href="/checkout" className="text-[10px] font-black uppercase tracking-widest text-primary">Basket</Link>
         </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[220px] md:h-[400px] bg-black overflow-hidden flex items-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <div className="relative z-20 px-6 container mx-auto text-white">
            <span className="bg-primary px-2 py-0.5 text-[8px] font-black uppercase tracking-widest mb-2 inline-block">SYSTEM_ONLINE</span>
            <h1 className="text-4xl md:text-7xl font-black leading-[0.9] uppercase tracking-tighter mb-4">
              PREMIUM MEAT<br />DISTRIBUTION
            </h1>
            <div className="flex gap-2">
              <Link href="/restaurants"><button className="h-10 px-6 bg-primary font-black text-[10px] uppercase tracking-widest rounded-full">Order Now</button></Link>
              <Link href="/dashboard"><button className="h-10 px-6 bg-white/10 backdrop-blur-md border border-white/20 font-black text-[10px] uppercase tracking-widest rounded-full">Merchant POS</button></Link>
            </div>
          </div>
          <Image src="https://picsum.photos/seed/steak1/1200/800" alt="Hero" fill className="object-cover opacity-50" priority />
        </div>

        {/* 4-COLUMN MOBILE GRID */}
        <section className="py-8 px-3 container mx-auto">
          <div className="flex items-end justify-between mb-4 border-b-2 border-black pb-2 px-1">
             <h2 className="text-[11px] md:text-xl font-black uppercase tracking-tighter">Live Selection</h2>
             <Link href="/restaurants" className="text-[8px] font-black uppercase text-primary">View All</Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="aspect-square bg-gray-50 animate-pulse border" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {products.length === 0 ? (
                <div className="col-span-4 py-20 text-center opacity-30">
                  <p className="text-[10px] font-black uppercase">Syncing Live Nodes...</p>
                </div>
              ) : products.map((item) => (
                <div key={item.id} className="flex flex-col gap-1.5 group">
                  <div className="relative aspect-square rounded-sm overflow-hidden bg-gray-50 border">
                    <Image src={item.image_url || `https://picsum.photos/seed/${item.id}/300/300`} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-[8.5px] font-black truncate uppercase leading-none">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black">KES {item.price}</span>
                      <button 
                        onClick={() => {
                          addToCart({
                            id: item.id,
                            restaurantId: item.restaurant_id || 'r1',
                            name: item.name,
                            price: item.price,
                            description: item.description,
                            imageUrl: item.image_url || '',
                            category: item.category
                          });
                          toast({ title: "READY", description: `${item.name} added.` });
                        }}
                        className="bg-black text-white px-1.5 py-0.5 rounded-full text-[6.5px] font-black uppercase tracking-widest"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Status nodes */}
        <section className="bg-gray-50 py-10 px-6 border-y">
           <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Nodes Active', val: '14/14' },
                { label: 'Avg Dispatch', val: '18 MIN' },
                { label: 'Secure Link', val: 'ESTABLISHED' },
                { label: 'Sync Status', val: 'OPTIMAL' }
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-[12px] font-black text-black">{s.val}</p>
                </div>
              ))}
           </div>
        </section>
      </main>

      <footer className="bg-black text-white p-10 pb-24">
        <div className="container mx-auto text-center space-y-4">
           <h2 className="text-xl font-black italic tracking-tighter">STEAK WEST<span className="text-primary">.</span></h2>
           <p className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.3em]">Premium Logistics Node // 2026</p>
           <div className="flex justify-center gap-4 text-[7px] font-black text-gray-600 uppercase">
             <span>SSL Secure</span>
             <span>PostgreSQL Active</span>
             <span>Terminal V4</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
