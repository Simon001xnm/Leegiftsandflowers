"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { 
  Search, 
  Star, 
  Clock, 
  Beef, 
  Utensils, 
  Zap, 
  ShoppingBag, 
  Heart,
  Tag,
  Timer,
  Pizza,
  Coffee,
  IceCream
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { label: 'Grocery', icon: ShoppingBag },
  { label: 'Raw Meat', icon: Beef },
  { label: 'Choma', icon: Utensils },
  { label: 'Grills', icon: Zap },
  { label: 'Pizza', icon: Pizza },
  { label: 'Drinks', icon: Coffee },
  { label: 'Dessert', icon: IceCream },
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
      <div className="sticky top-12 z-40 bg-white border-b overflow-x-auto no-scrollbar py-2 px-3">
        <div className="flex items-center gap-3 min-w-max container mx-auto">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.label}
              onClick={() => setCategory(cat.label)}
              className={cn(
                "flex flex-col items-center gap-0.5 group transition-all shrink-0",
                category === cat.label ? "opacity-100 scale-105" : "opacity-60 hover:opacity-100"
              )}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <cat.icon className="w-3.5 h-3.5 text-black" />
              </div>
              <span className="text-[7px] md:text-[9px] font-black text-black tracking-tight uppercase">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-1 md:px-8 space-y-6 py-4">
        {/* Stores near you */}
        <section className="space-y-2 px-1">
          <h2 className="text-[9px] md:text-lg font-black tracking-tighter uppercase">STORES NEAR YOU</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            {['Butchery', 'Choma', 'Grills', 'Kitchen', 'Market'].map((brand, i) => (
              <div key={brand} className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-gray-100 shadow-sm overflow-hidden">
                  <Image src={MOCK_RESTAURANTS[i % 2].imageUrl} alt={brand} width={64} height={64} className="object-cover w-full h-full" />
                </div>
                <div className="text-center">
                   <span className="text-[6px] md:text-[10px] font-black uppercase leading-none block">{brand}</span>
                   <span className="text-[5px] text-gray-400 font-bold">15 MIN</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ULTRA-HIGH DENSITY GRID - 4 PER ROW ON MOBILE */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[9px] md:text-lg font-black tracking-tighter uppercase">POPULAR IN YOUR AREA</h2>
            <Link href="/restaurants"><span className="text-[7px] md:text-[11px] font-black text-black uppercase tracking-widest">SEE ALL</span></Link>
          </div>
          <div className="grid grid-cols-4 gap-1 md:gap-6">
            {filteredRestaurants.map((r) => (
              <StoreCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StoreCard({ restaurant }: { restaurant: any }) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className="group flex flex-col gap-1">
      <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-gray-100 border border-gray-100">
        <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-0.5 right-0.5">
          <Button variant="ghost" size="icon" className="h-3 w-3 md:h-7 md:w-7 rounded-full bg-white/90 backdrop-blur-md shadow-sm text-black p-0">
            <Heart className="w-1.5 h-1.5 md:w-3.5 md:h-3.5" />
          </Button>
        </div>
      </div>
      <div className="space-y-0 px-0.5">
        <h3 className="text-[6px] md:text-[13px] font-black truncate leading-none tracking-tighter uppercase">{restaurant.name}</h3>
        <div className="flex items-center gap-0.5 text-[5px] md:text-[10px] font-bold text-gray-500">
           <Star className="w-1.5 h-1.5 md:w-2 md:h-2 fill-black text-black" />
           <span className="text-black">{restaurant.rating}</span>
           <span className="opacity-30">•</span>
           <span>{restaurant.deliveryTime}</span>
        </div>
      </div>
    </Link>
  );
}

export default function MeatDiscovery() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Suspense fallback={<div className="flex-grow flex items-center justify-center"><p className="font-bold text-gray-400 uppercase text-[8px]">Loading Node...</p></div>}>
        <DiscoveryContent />
      </Suspense>
    </div>
  );
}
