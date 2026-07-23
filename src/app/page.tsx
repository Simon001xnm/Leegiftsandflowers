
'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { InstallAppButton } from "@/components/InstallAppButton";
import { 
  Search, 
  MapPin, 
  ChevronRight, 
  ShoppingBag, 
  Zap, 
  Beef, 
  Utensils, 
  GlassWater, 
  Store 
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: 'cat1', name: 'Butchery', icon: Beef, color: 'bg-red-50 text-red-600', href: '/restaurants?cat=Raw Meat' },
  { id: 'cat2', name: 'Grills', icon: Utensils, color: 'bg-orange-50 text-orange-600', href: '/restaurants?cat=Nyama Choma' },
  { id: 'cat3', name: 'Cooked', icon: ShoppingBag, color: 'bg-emerald-50 text-emerald-600', href: '/restaurants?cat=Cooked' },
  { id: 'cat4', name: 'Grocery', icon: Store, color: 'bg-blue-50 text-blue-600', href: '/restaurants?cat=Grocery' },
  { id: 'cat5', name: 'Drinks', icon: GlassWater, color: 'bg-purple-50 text-purple-600', href: '/restaurants?cat=Drinks' },
  { id: 'cat6', name: 'Quick', icon: Zap, color: 'bg-yellow-50 text-yellow-600', href: '/restaurants?cat=Delicacies' },
];

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
          .limit(16);
        
        if (!error && data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts([
            { id: 'p1', name: 'Premium T-Bone', price: 1500, image_url: 'https://picsum.photos/seed/steak1/400/400' },
            { id: 'p2', name: 'Goat Choma', price: 1350, image_url: 'https://picsum.photos/seed/choma2/400/400' },
            { id: 'p3', name: 'Nairobi Mutura', price: 100, image_url: 'https://picsum.photos/seed/mutura3/400/400' },
            { id: 'p4', name: 'Fresh Chicken', price: 700, image_url: 'https://picsum.photos/seed/chicken4/400/400' },
            { id: 'p5', name: 'Beef Chemsha', price: 1400, image_url: 'https://picsum.photos/seed/beef5/400/400' },
            { id: 'p6', name: 'Dry Fry Beef', price: 1400, image_url: 'https://picsum.photos/seed/beef6/400/400' },
            { id: 'p7', name: 'Pork Chops', price: 1200, image_url: 'https://picsum.photos/seed/pork7/400/400' },
            { id: 'p8', name: 'Garden Salad', price: 300, image_url: 'https://picsum.photos/seed/salad8/400/400' },
          ]);
        }
      } catch (e) {
        console.warn("Resilience mode active");
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [supabase]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section - Glovo/Uber Style */}
      <section className="relative h-[450px] md:h-[550px] flex items-center justify-center bg-[#f7f7f7] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-10 md:opacity-20"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8 max-w-4xl">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
              Premium Meat <br className="hidden md:block" /> <span className="text-primary">Dispatched.</span>
            </h1>
            <p className="text-[12px] md:text-base font-bold text-gray-500 uppercase tracking-widest">
              Straight from the farm to your doorstep in 30 minutes.
            </p>
          </div>

          {/* Address Bar */}
          <div className="max-w-2xl mx-auto w-full bg-white shadow-2xl rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-center gap-2 border-4 border-black/5">
            <div className="flex items-center gap-3 px-4 py-3 flex-grow w-full border-b md:border-b-0 md:border-r">
              <MapPin className="text-primary w-5 h-5 shrink-0" />
              <span className="text-[13px] font-black uppercase tracking-tight truncate">Silver Heights, Nairobi</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 flex-grow w-full">
              <Search className="text-gray-400 w-5 h-5 shrink-0" />
              <input 
                placeholder="What are you craving?" 
                className="w-full bg-transparent outline-none text-[13px] font-bold uppercase placeholder:text-gray-300"
              />
            </div>
            <Link href="/restaurants" className="w-full md:w-auto">
              <button className="w-full h-12 md:h-14 px-8 bg-black text-white rounded-xl md:rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-primary transition-all active:scale-95">
                Search
              </button>
            </Link>
          </div>

          <div className="flex justify-center pt-4">
            <InstallAppButton />
          </div>
        </div>
      </section>

      {/* Category Scroller - High Density */}
      <section className="sticky top-12 z-40 bg-white/95 backdrop-blur-md border-b py-6 overflow-hidden">
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

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Stores Near You */}
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b-2 border-black pb-3">
             <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Fastest Near You</h2>
             <Link href="/restaurants" className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline flex items-center gap-1">
               View All <ChevronRight className="w-3 h-3" />
             </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <StoreCard 
               name="Steak West Westlands" 
               time="15-25 min" 
               rating="4.9" 
               img="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=1974&auto=format&fit=crop"
               id="r1"
             />
             <StoreCard 
               name="City Market Grill" 
               time="20-35 min" 
               rating="4.7" 
               img="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop"
               id="r2"
             />
             <StoreCard 
               name="The Meat Hub" 
               time="30-45 min" 
               rating="4.8" 
               img="https://images.unsplash.com/photo-1529692236671-61f66cb8a0b5?q=80&w=2070&auto=format&fit=crop"
               id="r3"
             />
          </div>
        </section>

        {/* ULTRA-HIGH DENSITY GRID - 4 PER ROW ON MOBILE */}
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b-2 border-black pb-3">
             <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Daily Dispatch</h2>
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Premium Selection</span>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-6">
            {loading ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="aspect-square bg-gray-50 animate-pulse border" />
              ))
            ) : products.map((item) => (
              <div key={item.id} className="flex flex-col gap-2 group">
                <Link href={`/products/${item.id}`} className="block">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                    <Image 
                      src={item.image_url || `https://picsum.photos/seed/${item.id}/400/400`} 
                      alt={item.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                </Link>
                <div className="space-y-1 px-1">
                  <h3 className="text-[8px] md:text-[12px] font-black truncate uppercase leading-none text-black">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] md:text-[12px] font-bold text-gray-600">KES {item.price}</span>
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
                      className="bg-black text-white px-2 py-0.5 rounded-full text-[6px] md:text-[9px] font-black uppercase tracking-widest hover:bg-primary transition-colors active:scale-90"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-black text-white p-12 pb-32">
        <div className="container mx-auto grid md:grid-cols-4 gap-12 text-center md:text-left">
           <div className="space-y-4">
             <h2 className="text-2xl font-black italic tracking-tighter">STEAK WEST<span className="text-primary">.</span></h2>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-loose">
               Connecting you to the finest meat sources in Nairobi. Fast, fresh, and guaranteed quality.
             </p>
           </div>
           <div>
             <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-primary">Discover</h4>
             <ul className="text-[10px] font-bold text-gray-400 space-y-2 uppercase tracking-widest">
               <li><Link href="/restaurants" className="hover:text-white">All Stores</Link></li>
               <li><Link href="/restaurants?cat=Raw Meat" className="hover:text-white">Butchery</Link></li>
               <li><Link href="/restaurants?cat=Nyama Choma" className="hover:text-white">Grills</Link></li>
             </ul>
           </div>
           <div>
             <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-primary">Support</h4>
             <ul className="text-[10px] font-bold text-gray-400 space-y-2 uppercase tracking-widest">
               <li><Link href="/profile" className="hover:text-white">My Account</Link></li>
               <li><Link href="/track/demo" className="hover:text-white">Track Order</Link></li>
               <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
             </ul>
           </div>
           <div>
             <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-primary">Connect</h4>
             <div className="flex justify-center md:justify-start gap-4">
               <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                 <Zap className="w-4 h-4" />
               </div>
             </div>
           </div>
        </div>
        <div className="container mx-auto pt-12 mt-12 border-t border-gray-900 text-center">
           <p className="text-[9px] text-gray-700 font-bold uppercase tracking-[0.4em]">&copy; 2024 Steak West Network. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function StoreCard({ name, time, rating, img, id }: { name: string, time: string, rating: string, img: string, id: string }) {
  return (
    <Link href={`/restaurants/${id}`} className="group flex flex-col gap-3">
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-sm">
        <Image src={img} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1 rounded-full text-[10px] font-black shadow-lg">
          {time}
        </div>
      </div>
      <div className="flex justify-between items-start px-1">
        <div>
          <h3 className="text-[14px] md:text-lg font-black uppercase tracking-tighter text-black group-hover:text-primary transition-colors">{name}</h3>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <Zap className="w-3 h-3 text-primary" /> Free Delivery
          </div>
        </div>
        <div className="bg-gray-100 px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1">
          <span className="text-black">{rating}</span>
        </div>
      </div>
    </Link>
  );
}
