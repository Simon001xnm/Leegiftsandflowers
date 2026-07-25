'use client';

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { Star, Plus, ChevronRight, ShoppingBag, RefreshCw, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/landing/Footer";
import { createClient } from "@/lib/supabase/client";

function MarketplaceContent() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const supabase = createClient();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .eq('is_in_stock', true)
          .order('created_at', { ascending: false });
        
        if (supabaseError) throw supabaseError;
        if (data) setProducts(data);
      } catch (e: any) {
        const msg = e.message || "Failed to synchronize with catalog node";
        console.error("Supabase connection failure:", msg);
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [supabase]);

  // CATEGORY SPLIT LOGIC
  const meatProducts = products.filter(p => p.category?.toUpperCase() !== 'DRINKS');
  const drinkProducts = products.filter(p => p.category?.toUpperCase() === 'DRINKS');

  const handleAdd = (e: React.MouseEvent, p: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: p.id,
      restaurantId: p.restaurant_id || 'r1',
      name: p.name,
      price: p.price,
      description: p.description || '',
      imageUrl: p.image_url || `https://picsum.photos/seed/${p.id}/600/600`,
      category: p.category
    });
    toast({ title: "ADDED TO BASKET", description: p.name });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <RefreshCw className="w-8 h-8 animate-spin text-primary opacity-20" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse">Syncing catalog node...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
           <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
           <h3 className="text-lg font-black uppercase tracking-tighter">Connection Interrupted</h3>
           <p className="text-[12px] font-medium text-muted-foreground max-w-sm uppercase tracking-widest">Unable to reach the production database. Ensure the 'products' table exists and RLS policies are active.</p>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="text-[10px] font-black text-primary border-b-2 border-primary pb-1 uppercase tracking-[0.2em]"
        >
          RETRY SYNC
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* BRAND NODES */}
      <section className="max-w-[1400px] mx-auto px-5 w-full py-10 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-[11px] font-black tracking-[0.2em] uppercase text-muted-foreground">Operating nodes</h2>
          <Link href="/restaurants" className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
            VIEW NETWORK <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
          {MOCK_RESTAURANTS.map((brand, i) => (
            <Link key={brand.id + i} href={`/restaurants/${brand.id}`} className="flex flex-col items-center gap-3 shrink-0 group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gray-100 p-1 overflow-hidden transition-all duration-500 shadow-xl group-hover:border-primary group-hover:scale-105">
                <Image src={brand.imageUrl} alt={brand.name} width={100} height={100} className="object-cover w-full h-full rounded-full" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black">{brand.name.split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ELITE SELECTION (MEAT) */}
      <section className="max-w-[1400px] mx-auto px-5 w-full py-10 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Elite selection</h2>
          <Badge variant="outline" className="rounded-none border-primary text-primary font-black text-[10px] tracking-widest px-3 py-1">
            {meatProducts.length} ITEMS READY
          </Badge>
        </div>
        
        {meatProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {meatProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.slug || p.id}`} className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Image src={p.image_url || `https://picsum.photos/seed/${p.id}/600/600`} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-[10px] font-black text-black">4.9</span>
                  </div>
                  <button onClick={(e) => handleAdd(e, p)} className="absolute bottom-3 right-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 z-20 hover:bg-primary transition-all duration-300">
                    <Plus className="w-5 h-5 stroke-[3px]" />
                  </button>
                </div>
                <div className="p-4 space-y-2 bg-white flex-grow">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">{p.category}</p>
                  <h3 className="text-[13px] md:text-base font-bold text-gray-900 line-clamp-1 leading-tight">{p.name}</h3>
                  <p className="text-base md:text-lg font-black text-black">KES {p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center opacity-20 flex flex-col items-center gap-4">
            <ShoppingBag className="w-12 h-12" />
            <p className="font-black text-[12px] uppercase tracking-widest">No Meat Dispatches Available</p>
          </div>
        )}
      </section>

      {/* TYPOGRAPHIC SIGNATURE MARQUEE */}
      <div className="bg-white border-y py-12">
        <h2 className="text-[12px] md:text-[22px] font-black text-black uppercase tracking-tighter text-center px-6">
          your plug for home appliances, phones and accessories.
        </h2>
      </div>

      {/* REFRESHMENT NODE (DRINKS) */}
      <section className="max-w-[1400px] mx-auto px-5 w-full py-20 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Refreshment node</h2>
          <Badge variant="outline" className="rounded-none border-black text-black font-black text-[10px] tracking-widest px-3 py-1">
            CHILLED DISPATCH
          </Badge>
        </div>
        
        {drinkProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {drinkProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.slug || p.id}`} className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Image src={p.image_url || `https://picsum.photos/seed/${p.id}/600/600`} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <button onClick={(e) => handleAdd(e, p)} className="absolute bottom-3 right-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 z-20 hover:bg-primary transition-all duration-300">
                    <Plus className="w-5 h-5 stroke-[3px]" />
                  </button>
                </div>
                <div className="p-4 space-y-2 bg-white flex-grow">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">DRINKS</p>
                  <h3 className="text-[13px] md:text-base font-bold text-gray-900 line-clamp-1 leading-tight">{p.name}</h3>
                  <p className="text-base md:text-lg font-black text-black">KES {p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center opacity-20 flex flex-col items-center gap-4">
            <ShoppingBag className="w-12 h-12" />
            <p className="font-black text-[12px] uppercase tracking-widest">No Chilled Items Available</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <Suspense fallback={null}>
        <MarketplaceContent />
      </Suspense>
    </main>
  );
}