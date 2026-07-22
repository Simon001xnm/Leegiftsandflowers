"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS, FoodCategory } from "@/lib/food-data";
import { Search, Star, Clock, SlidersHorizontal, MapPin, Beef, Utensils, Zap, ShoppingBag, ChevronRight, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES: { label: FoodCategory; icon: any }[] = [
  { label: 'Raw Meat', icon: Beef },
  { label: 'Nyama Choma', icon: Utensils },
  { label: 'Cooked', icon: Utensils },
  { label: 'Delicacies', icon: Zap },
  { label: 'Grocery', icon: ShoppingBag },
  { label: 'Sides', icon: ShoppingBag },
];

function DiscoveryContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<FoodCategory | 'All'>('All');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat && (CATEGORIES.some(c => c.label === cat) || cat === 'All')) {
      setCategory(cat as FoodCategory | 'All');
    }
  }, [searchParams]);

  const filteredRestaurants = MOCK_RESTAURANTS.filter(r => {
    return category === 'All' || r.category === category;
  });

  return (
    <main className="flex-grow bg-white pb-20">
      {/* Category Strip */}
      <div className="sticky top-16 z-40 bg-white border-b overflow-x-auto no-scrollbar py-4 px-4 md:px-8">
        <div className="flex items-center gap-8 min-w-max">
          <button 
            onClick={() => setCategory('All')}
            className={cn(
              "flex flex-col items-center gap-2 group transition-all",
              category === 'All' ? "opacity-100 scale-105" : "opacity-60 hover:opacity-100"
            )}
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-50 border-2 transition-all", category === 'All' && "border-black bg-white")}>
              <Beef className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-bold">All</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.label}
              onClick={() => setCategory(cat.label)}
              className={cn(
                "flex flex-col items-center gap-2 group transition-all",
                category === cat.label ? "opacity-100 scale-105" : "opacity-60 hover:opacity-100"
              )}
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-50 border-2 transition-all", category === cat.label && "border-black bg-white")}>
                <cat.icon className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 space-y-12 py-8">
        {/* Featured Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl md:text-2xl font-bold">Featured on Steak West</h2>
            <div className="flex gap-2">
               <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-gray-100"><ChevronRight className="w-4 h-4 rotate-180" /></Button>
               <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-gray-100"><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 mask-fade-right">
            {MOCK_RESTAURANTS.map((r) => (
              <StoreCard key={r.id} restaurant={r} className="min-w-[280px] md:min-w-[320px]" />
            ))}
          </div>
        </section>

        {/* Circular Brand Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl md:text-2xl font-bold">Sections near you</h2>
            <Button variant="link" className="text-sm font-bold text-black p-0">See all</Button>
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
            {['Steak West', 'Choma Grill', 'Butchery', 'Kachumbari', 'Drinks', 'Grocery'].map((brand, i) => (
              <div key={brand} className="flex flex-col items-center gap-2 group cursor-pointer shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gray-100 flex items-center justify-center bg-white shadow-sm overflow-hidden group-hover:scale-105 transition-all">
                  <Image 
                    src={MOCK_RESTAURANTS[i % 2].imageUrl} 
                    alt={brand} 
                    width={100} 
                    height={100} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-[11px] font-bold text-center">{brand}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Main Grid Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl md:text-2xl font-bold">Popular in your area</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-full gap-2 font-bold text-xs">
                <SlidersHorizontal className="w-3 h-3" /> Filters
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredRestaurants.map((r) => (
              <StoreCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StoreCard({ restaurant, className }: { restaurant: any; className?: string }) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className={cn("group flex flex-col gap-3", className)}>
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-sm">
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
        {restaurant.isFeatured && (
          <div className="absolute top-3 left-3">
             <Badge className="bg-primary text-white border-none text-[10px] font-black tracking-widest rounded-md py-1 px-3">
               BEST VALUE
             </Badge>
          </div>
        )}
      </div>
      <div className="space-y-1 px-1">
        <div className="flex justify-between items-start">
          <h3 className="text-base md:text-lg font-bold truncate leading-tight">{restaurant.name}</h3>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
             <span className="text-[11px] font-bold">{restaurant.rating}</span>
             <Star className="w-3 h-3 fill-black text-black" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-[12px] font-medium text-gray-500">
           <span>KES {restaurant.deliveryFee} Delivery Fee</span>
           <span>•</span>
           <span>{restaurant.deliveryTime}</span>
        </div>
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
