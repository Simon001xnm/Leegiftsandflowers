"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS, FoodCategory } from "@/lib/food-data";
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
  CirclePercent,
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
  { label: 'Delivery fee', icon: ChevronDown },
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
      {/* 1. Category Strip - Ultra High Density */}
      <div className="sticky top-12 z-40 bg-white border-b overflow-x-auto no-scrollbar py-2 px-4 md:px-8">
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

      {/* 2. Filter Pill Strip - More Compact */}
      <div className="bg-white border-b py-1 px-4 md:px-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 container mx-auto">
          {FILTERS.map((f) => (
            <Button key={f.label} variant="outline" size="sm" className="rounded-full gap-1 font-black text-[8px] md:text-[10px] bg-gray-100 border-none px-2 h-6 md:h-7 uppercase tracking-tight">
              <f.icon className="w-2.5 h-2.5" /> {f.label}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="rounded-full gap-1 font-black text-[8px] md:text-[10px] bg-gray-100 border-none px-2 h-6 md:h-7 uppercase tracking-tight">
            Sort <ChevronDown className="w-2.5 h-2.5" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-2 md:px-8 space-y-8 py-4">
        {/* 3. Promo Banners - Reduced height */}
        <section className="flex gap-3 overflow-x-auto no-scrollbar mask-fade-right">
          {[1, 2, 3].map((i) => (
            <div key={i} className={cn(
              "min-w-[220px] md:min-w-[340px] h-24 md:h-32 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden",
              i === 1 ? "bg-orange-100" : i === 2 ? "bg-blue-50" : "bg-red-50"
            )}>
              <div className="relative z-10 space-y-0">
                <p className="text-[7px] font-black uppercase tracking-widest text-primary">Member Special</p>
                <h3 className="text-[11px] md:text-base font-black max-w-[140px] md:max-w-[180px] leading-tight uppercase tracking-tighter">Steak West Prime free for 4 weeks</h3>
              </div>
              <Button size="sm" className="w-fit rounded-full px-3 h-6 text-[7px] font-black bg-black text-white uppercase tracking-widest">Order Now</Button>
              <div className="absolute right-[-10px] bottom-[-10px] w-20 h-20 bg-white/20 rounded-full" />
            </div>
          ))}
        </section>

        {/* 4. Featured Section - Tighter Spacing */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-lg font-black tracking-tighter uppercase">Featured</h2>
            <div className="flex gap-1">
               <Button variant="ghost" size="icon" className="rounded-full h-6 w-6 bg-gray-100"><ChevronRight className="w-3 h-3 rotate-180" /></Button>
               <Button variant="ghost" size="icon" className="rounded-full h-6 w-6 bg-gray-100"><ChevronRight className="w-3 h-3" /></Button>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {MOCK_RESTAURANTS.map((r) => (
              <StoreCard key={r.id} restaurant={r} className="min-w-[160px] md:min-w-[280px]" showBadge />
            ))}
          </div>
        </section>

        {/* 5. Circular Brand Section - High Density Circles */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-lg font-black tracking-tighter uppercase">Stores near you</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-1 justify-start">
            {['Steak West', 'Choma Grill', 'Butchery', 'Kachumbari', 'Drinks', 'Grocery', 'Bakery'].map((brand, i) => (
              <div key={brand} className="flex flex-col items-center gap-1 group cursor-pointer shrink-0">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm overflow-hidden group-hover:ring-2 ring-black transition-all">
                  <Image 
                    src={MOCK_RESTAURANTS[i % 2].imageUrl} 
                    alt={brand} 
                    width={64} 
                    height={64} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center space-y-0">
                   <span className="text-[8px] md:text-[10px] font-black tracking-tight block uppercase">{brand}</span>
                   <span className="text-[6px] md:text-[8px] text-gray-400 font-bold uppercase">10 min</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Popular Section - High Density 4 Column Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-lg font-black tracking-tighter uppercase">Popular in your area</h2>
            <Link href="/restaurants"><span className="text-[9px] md:text-[11px] font-black text-black hover:underline uppercase tracking-widest">See all</span></Link>
          </div>
          <div className="grid grid-cols-4 gap-2 md:gap-6">
            {filteredRestaurants.map((r) => (
              <StoreCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StoreCard({ restaurant, className, showBadge, isOffer }: { restaurant: any; className?: string; showBadge?: boolean; isOffer?: boolean }) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className={cn("group flex flex-col gap-1.5", className)}>
      <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-gray-100 border border-gray-100">
        <Image 
          src={restaurant.imageUrl} 
          alt={restaurant.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-1 right-1">
          <Button variant="ghost" size="icon" className="h-5 w-5 md:h-7 md:w-7 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:bg-white text-black">
            <Heart className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
          </Button>
        </div>
        
        {isOffer && (
          <div className="absolute top-1 left-1">
             <Badge className="bg-primary text-white border-none text-[6px] md:text-[8px] font-black tracking-widest rounded-sm py-0.5 px-1 uppercase shadow-lg">
               BUY 1 GET 1
             </Badge>
          </div>
        )}

        {showBadge && !isOffer && (
          <div className="absolute top-1 left-1">
             <Badge className="bg-emerald-500 text-white border-none text-[6px] md:text-[8px] font-black tracking-widest rounded-sm py-0.5 px-1 uppercase shadow-lg">
               OFFER
             </Badge>
          </div>
        )}
      </div>
      <div className="space-y-0 px-0.5">
        <h3 className="text-[9px] md:text-[13px] font-black truncate leading-tight tracking-tight uppercase">{restaurant.name}</h3>
        <div className="flex items-center gap-1 text-[7px] md:text-[10px] font-bold text-gray-500">
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
      <Suspense fallback={<div className="flex-grow flex items-center justify-center"><p className="font-bold text-gray-400 animate-pulse uppercase tracking-[0.2em] text-[10px]">Synchronizing Network...</p></div>}>
        <DiscoveryContent />
      </Suspense>
    </div>
  );
}
