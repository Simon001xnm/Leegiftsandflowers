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
  MapPin, 
  Beef, 
  Utensils, 
  Zap, 
  ShoppingBag, 
  ChevronRight, 
  Heart,
  Tag,
  Timer,
  Pizza,
  Coffee,
  IceCream
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES: { label: string; icon: any }[] = [
  { label: 'Grocery', icon: ShoppingBag },
  { label: 'Raw Meat', icon: Beef },
  { label: 'Choma', icon: Utensils },
  { label: 'Grills', icon: Zap },
  { label: 'Pizza', icon: Pizza },
  { label: 'Chicken', icon: Utensils },
  { label: 'Cooked', icon: Utensils },
  { label: 'Drinks', icon: Coffee },
  { label: 'Dessert', icon: IceCream },
  { label: 'Sides', icon: ShoppingBag },
];

const FILTERS = [
  { label: 'Offers', icon: Tag },
  { label: 'Under 30 min', icon: Timer },
  { label: 'Highest rated', icon: Star },
];

function ChevronDown(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

function DiscoveryContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | 'All'>('All');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      setCategory(cat);
    }
  }, [searchParams]);

  const filteredRestaurants = MOCK_RESTAURANTS.filter(r => {
    return category === 'All' || r.category === category;
  });

  return (
    <main className="flex-grow bg-white pb-20">
      {/* Category Strip - High Density */}
      <div className="sticky top-12 z-40 bg-white border-b overflow-x-auto no-scrollbar py-2 px-4">
        <div className="flex items-center gap-4 min-w-max container mx-auto">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.label}
              onClick={() => setCategory(cat.label)}
              className={cn(
                "flex flex-col items-center gap-0.5 group transition-all shrink-0",
                category === cat.label ? "opacity-100 scale-105" : "opacity-60 hover:opacity-100"
              )}
            >
              <div className="w-6 h-6 flex items-center justify-center transition-all">
                <cat.icon className="w-4 h-4 text-black" />
              </div>
              <span className="text-[7px] md:text-[9px] font-black text-black tracking-tight uppercase">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Pill Strip */}
      <div className="bg-white border-b py-1 px-4">
        <div className="flex items-center gap-1.5 container mx-auto">
          {FILTERS.map((f) => (
            <Button key={f.label} variant="outline" size="sm" className="rounded-full gap-1 font-black text-[8px] md:text-[10px] bg-gray-100 border-none px-2 h-6 uppercase tracking-tight">
              <f.icon className="w-2.5 h-2.5" /> {f.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-2 md:px-8 space-y-8 py-4">
        {/* Promo Banners */}
        <section className="flex gap-3 overflow-x-auto no-scrollbar">
          {[1, 2].map((i) => (
            <div key={i} className={cn(
              "min-w-[200px] md:min-w-[340px] h-24 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden",
              i === 1 ? "bg-orange-100" : "bg-blue-50"
            )}>
              <div className="relative z-10">
                <p className="text-[7px] font-black uppercase tracking-widest text-primary">Member Special</p>
                <h3 className="text-[10px] md:text-base font-black max-w-[140px] leading-tight uppercase tracking-tighter">Steak West Prime free for 4 weeks</h3>
              </div>
              <Button size="sm" className="w-fit rounded-full px-3 h-5 text-[6px] font-black bg-black text-white uppercase tracking-widest">Order Now</Button>
            </div>
          ))}
        </section>

        {/* Circular Brand Section */}
        <section className="space-y-3">
          <h2 className="text-[10px] md:text-lg font-black tracking-tighter uppercase">Stores near you</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
            {['Steak West', 'Choma Grill', 'Butchery', 'Grocery', 'Bakery'].map((brand, i) => (
              <div key={brand} className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm overflow-hidden">
                  <Image 
                    src={MOCK_RESTAURANTS[i % 2].imageUrl} 
                    alt={brand} 
                    width={64} 
                    height={64} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center">
                   <span className="text-[6px] md:text-[10px] font-black tracking-tight block uppercase">{brand}</span>
                   <span className="text-[5px] md:text-[8px] text-gray-400 font-bold uppercase">10 min</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Section - STRICT 4 COLUMN GRID ON MOBILE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] md:text-lg font-black tracking-tighter uppercase">Popular in your area</h2>
            <Link href="/restaurants"><span className="text-[8px] md:text-[11px] font-black text-black hover:underline uppercase tracking-widest">See all</span></Link>
          </div>
          <div className="grid grid-cols-4 gap-1.5 md:gap-6">
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
        <Image 
          src={restaurant.imageUrl} 
          alt={restaurant.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          data-ai-hint="butchery shop"
        />
        <div className="absolute top-0.5 right-0.5">
          <Button variant="ghost" size="icon" className="h-4 w-4 md:h-7 md:w-7 rounded-full bg-white/90 backdrop-blur-md shadow-sm text-black">
            <Heart className="w-2 h-2 md:w-3.5 md:h-3.5" />
          </Button>
        </div>
      </div>
      <div className="space-y-0 px-0.5">
        <h3 className="text-[7px] md:text-[13px] font-black truncate leading-tight tracking-tight uppercase">{restaurant.name}</h3>
        <div className="flex items-center gap-1 text-[6px] md:text-[10px] font-bold text-gray-500">
           <div className="flex items-center gap-0.5">
             <Star className="w-2 h-2 fill-black text-black" />
             <span className="text-black">{restaurant.rating}</span>
           </div>
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
      <Suspense fallback={<div className="flex-grow flex items-center justify-center"><p className="font-bold text-gray-400 animate-pulse uppercase tracking-[0.2em] text-[8px]">Synchronizing...</p></div>}>
        <DiscoveryContent />
      </Suspense>
    </div>
  );
}