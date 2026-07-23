'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";

/**
 * PURE RETAIL LANDING PAGE
 * 100% focused on the "sweetness of shopping".
 * All admin/owner links removed.
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
        console.error("Supabase fail-safe active");
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [supabase]);

  const BasketIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="h-14 border-b flex items-center justify-between px-6 sticky top-0 bg-white/95 backdrop-blur-md z-50">
         <Link href="/" className="font-black italic text-xl tracking-tighter">STEAK WEST<span className="text-primary">.</span></Link>
         <div className="flex items-center gap-6">
           <Link href="/login" className="text-[11px] font-black uppercase tracking-widest hover:text-primary transition-colors">Sign In</Link>
           <Link href="/checkout" className="flex items-center gap-2 bg-black text-white px-5 h-9 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-black/10">
             <BasketIcon />
             <span>Basket</span>
           </Link>
         </div>
      </header>

      <main className="flex-grow">
        <div className="relative h-[250px] md:h-[450px] bg-black overflow-hidden flex items-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
          <div className="relative z-20 px-8 container mx-auto text-white">
            <span className="bg-primary px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] mb-4 inline-block tracking-widest">ESTABLISHED 2026</span>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.85] uppercase tracking-tighter mb-8">
              PREMIUM MEAT<br />DELIVERED FAST
            </h1>
            <div className="flex gap-3">
              <Link href="/restaurants"><button className="h-12 px-10 bg-primary font-black text-[11px] uppercase tracking-[0.1em] rounded-full hover:scale-105 transition-transform active:scale-95 shadow-xl">SHOP THE MARKET</button></Link>
            </div>
          </div>
          <Image src="https://picsum.photos/seed/steak8/1200/800" alt="Hero" fill className="object-cover opacity-60" priority />
        </div>

        <section className="py-10 px-4 container mx-auto">
          <div className="flex items-end justify-between mb-6 border-b-4 border-black pb-3">
             <h2 className="text-[14px] md:text-2xl font-black uppercase tracking-tighter">Live Selection</h2>
             <Link href="/restaurants" className="text-[9px] font-black uppercase text-primary tracking-widest hover:underline">View All Locations</Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="aspect-square bg-gray-50 animate-pulse border-2 border-black/5" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {products.length === 0 ? (
                <div className="col-span-4 py-24 text-center opacity-30">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em]">Refreshing Supply...</p>
                </div>
              ) : products.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 group">
                  <Link href={`/products/${item.id}`} className="block">
                    <div className="relative aspect-square rounded-none overflow-hidden bg-gray-50 border-2 border-black transition-all group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Image src={item.image_url || `https://picsum.photos/seed/${item.id}/400/400`} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </Link>
                  <div className="space-y-1">
                    <h3 className="text-[9px] font-black truncate uppercase leading-none">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold">KES {item.price}</span>
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
                          toast({ title: "ADDED", description: `${item.name} in basket.` });
                        }}
                        className="bg-black text-white px-2 py-1 rounded-full text-[7px] font-black uppercase tracking-widest hover:bg-primary transition-colors active:scale-90"
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
      </main>

      <footer className="bg-black text-white p-12 pb-28">
        <div className="container mx-auto text-center space-y-6">
           <h2 className="text-2xl font-black italic tracking-tighter">STEAK WEST<span className="text-primary">.</span></h2>
           <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.4em]">Premium Distribution Hub // Nairobi, Kenya</p>
           <div className="flex justify-center gap-6 text-[8px] font-black text-gray-600 uppercase tracking-widest">
             <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> SSL SECURE</span>
             <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> SUPABASE SYNC</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
