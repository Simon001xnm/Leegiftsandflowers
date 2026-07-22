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
  SlidersHorizontal, 
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
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES: { label: string; icon: any }[] = [
  { label: 'Grocery', icon: ShoppingBag },
  { label: 'Raw Meat', icon: Beef },
  { label: 'Choma', icon: Utensils },
  { label: 'Grills', icon: Zap },
  { label: 'Chicken', icon: Utensils },
  { label: 'Cooked', icon: Utensils },
  { label: 'Sides', icon: ShoppingBag },
  { label: 'Drinks', icon: Zap },
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
      {/* Category Strip */}
      <div className="sticky top-16 z-40 bg-white border-b overflow-x-auto no-scrollbar py-6 px-4 md:px-8">
        <div className="flex items-center gap-10 min-w-max container mx-auto">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.label}
              onClick={() => setCategory(cat.label)}
              className={cn(
                "flex flex-col items-center gap-2 group transition-all",
                category === cat.label ? "opacity-100 scale-105" : "opacity-60 hover:opacity-100"
              )}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all">
                <cat.icon className="w-8 h-8 text-black" />
              </div>
              <span className="text-[12px] font-bold text-black">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Pill Strip */}
      <div className="bg-white border-b py-3 px-4 md:px-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 container mx-auto">
          {FILTERS.map((f) => (
            <Button key={f.label} variant="outline" size="sm" className="rounded-full gap-2 font-bold text-xs bg-gray-100 border-none px-4 h-9">
              <f.icon className="w-3 h-3" /> {f.label}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="rounded-full gap-2 font-bold text-xs bg-gray-100 border-none px-4 h-9">
            Sort <ChevronDown className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 space-y-12 py-8">
        {/* Promo Banners */}
        <section className="flex gap-4 overflow-x-auto no-scrollbar mask-fade-right">
          {[1, 2, 3].map((i) => (
            <div key={i} className={cn(
              "min-w-[320px] md:min-w-[450px] h-44 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden",
              i === 1 ? "bg-orange-100" : i === 2 ? "bg-blue-50" : "bg-red-50"
            )}>
              <div className="relative z-10 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Member Special</p>
                <h3 className="text-xl font-black max-w-[200px] leading-tight">Steak West Prime free for 4 weeks</h3>
                <p className="text-xs font-bold text-gray-500">Limited time only</p>
              </div>
              <Button size="sm" className="w-fit rounded-full px-4 h-8 text-xs font-black bg-black text-white">Order Now</Button>
              <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 bg-white/20 rounded-full" />
            </div>
          ))}
        </section>

        {/* Featured Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tighter">Featured on Steak West</h2>
            <div className="flex gap-2">
               <Link href="/restaurants">
                 <span className="text-sm font-bold text-black mr-4">See all</span>
               </Link>
               <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-gray-100"><ChevronRight className="w-4 h-4 rotate-180" /></Button>
               <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-gray-100"><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 mask-fade-right">
            {MOCK_RESTAURANTS.map((r) => (
              <StoreCard key={r.id} restaurant={r} className="min-w-[300px] md:min-w-[350px]" showBadge />
            ))}
          </div>
        </section>

        {/* Today's Offers */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tighter">Today's offers</h2>
            <Link href="/restaurants"><span className="text-sm font-bold text-black">See all</span></Link>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 mask-fade-right">
            {MOCK_RESTAURANTS.map((r) => (
              <StoreCard key={r.id} restaurant={r} className="min-w-[300px] md:min-w-[350px]" isOffer />
            ))}
          </div>
        </section>

        {/* Circular Brand Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tighter">Stores near you</h2>
            <Link href="/restaurants"><span className="text-sm font-bold text-black">See all</span></Link>
          </div>
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-4 justify-between">
            {['Steak West', 'Choma Grill', 'Butchery', 'Kachumbari', 'Drinks', 'Grocery'].map((brand, i) => (
              <div key={brand} className="flex flex-col items-center gap-3 group cursor-pointer shrink-0">
                <div className="w-24 h-24 md:w-28 md:h-24 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm overflow-hidden group-hover:ring-2 ring-black transition-all">
                  <Image 
                    src={MOCK_RESTAURANTS[i % 2].imageUrl} 
                    alt={brand} 
                    width={112} 
                    height={112} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-[13px] font-bold text-center">{brand}</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase">10 min</span>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tighter">Popular in your area</h2>
            <Link href="/restaurants"><span className="text-sm font-bold text-black">See all</span></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
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
    <Link href={`/restaurants/${restaurant.id}`} className={cn("group flex flex-col gap-3", className)}>
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
        <Image 
          src={restaurant.imageUrl} 
          alt={restaurant.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:bg-white text-black">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        
        {isOffer && (
          <div className="absolute top-3 left-3">
             <Badge className="bg-primary text-white border-none text-[10px] font-black tracking-widest rounded-md py-1.5 px-3">
               BUY 1, GET 1 FREE
             </Badge>
          </div>
        )}

        {showBadge && !isOffer && (
          <div className="absolute top-3 left-3">
             <Badge className="bg-emerald-500 text-white border-none text-[10px] font-black tracking-widest rounded-md py-1.5 px-3">
               KES 121 OFF SELECT ITEMS
             </Badge>
          </div>
        )}
      </div>
      <div className="space-y-1 px-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-black truncate leading-tight tracking-tight uppercase">{restaurant.name}</h3>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500">
           <div className="flex items-center gap-1">
             <CirclePercent className="w-3 h-3 text-emerald-600" />
             <span>KES {restaurant.deliveryFee} Delivery Fee</span>
           </div>
           <span>•</span>
           <div className="flex items-center gap-1">
             <span>{restaurant.deliveryTime}</span>
           </div>
           <span>•</span>
           <div className="flex items-center gap-1">
             <Star className="w-3 h-3 fill-black text-black" />
             <span className="text-black">{restaurant.rating} (500+)</span>
           </div>
        </div>
        {restaurant.isFeatured && (
          <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-none text-[10px] font-black uppercase rounded-sm h-6 px-2 mt-2">
            Great value
          </Badge>
        )}
      </div>
    </Link>
  );
}

export default function MeatDiscovery() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Suspense fallback={<div className="flex-grow flex items-center justify-center"><p className="font-bold text-gray-400 animate-pulse uppercase tracking-[0.2em]">Synchronizing Network...</p></div>}>
        <DiscoveryContent />
      </Suspense>
    </div>
  );
}