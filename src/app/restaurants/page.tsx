
"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS, FoodCategory } from "@/lib/food-data";
import { Search, Star, Clock, SlidersHorizontal, MapPin, Beef } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CATEGORIES: FoodCategory[] = ['Raw Meat', 'Nyama Choma', 'Delicacies', 'Cooked', 'Sides', 'Grocery'];

function DiscoveryContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FoodCategory | 'All'>('All');

  // Sync category state with URL query parameter
  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat && (CATEGORIES.includes(cat as FoodCategory) || cat === 'All')) {
      setCategory(cat as FoodCategory | 'All');
    }
  }, [searchParams]);

  const filteredRestaurants = MOCK_RESTAURANTS.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                          r.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || r.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="flex-grow container mx-auto px-4 py-12">
      <div className="max-w-4xl mb-12">
        <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 py-1 text-[14px] font-bold">Nairobi Fresh</Badge>
        <h1 className="text-4xl md:text-5xl font-black font-headline text-primary mb-4 uppercase tracking-tighter">The Meat Shop</h1>
        <p className="text-muted-foreground text-[14px] md:text-base font-medium">Premium raw meat, grilled choma, and authentic Nairobi delicacies.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            className="pl-12 h-14 rounded-2xl border-2 border-muted text-[14px] font-bold focus-visible:ring-primary/20" 
            placeholder="Search for Nyama Choma, Mutura, or Beef..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Button 
            variant={category === 'All' ? 'default' : 'outline'} 
            className="h-14 rounded-2xl px-6 shrink-0 font-black text-[14px] uppercase tracking-widest"
            onClick={() => setCategory('All')}
          >
            All
          </Button>
          {CATEGORIES.map(cat => (
            <Button 
              key={cat}
              variant={category === cat ? 'default' : 'outline'} 
              className="h-14 rounded-2xl px-6 shrink-0 font-black text-[14px] uppercase tracking-widest"
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <span className="text-[14px] font-bold text-muted-foreground uppercase tracking-widest">
          Found <span className="text-primary font-black">{filteredRestaurants.length}</span> specialty vendors
        </span>
        <Button variant="ghost" size="sm" className="gap-2 text-[14px] font-black uppercase tracking-widest text-muted-foreground">
          <SlidersHorizontal className="w-4 h-4" /> Sort by: Nearest
        </Button>
      </div>

      {filteredRestaurants.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant) => (
            <Link 
              key={restaurant.id} 
              href={`/restaurants/${restaurant.id}`}
              className="group flex flex-col bg-card rounded-[2.5rem] overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image 
                  src={restaurant.imageUrl} 
                  alt={restaurant.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-4 left-4 shadow-sm bg-white text-primary font-black text-[14px] uppercase tracking-widest">
                  {restaurant.category}
                </Badge>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl md:text-2xl font-black font-headline text-primary uppercase tracking-tighter">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-1 text-primary font-black text-[14px]">
                    <Star className="w-4 h-4 fill-primary" /> {restaurant.rating}
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-[14px] font-bold text-muted-foreground uppercase tracking-tighter">
                    <MapPin className="w-4 h-4 text-primary" />
                    {restaurant.location}
                  </div>
                  <div className="flex items-center gap-4 text-[14px] font-bold text-muted-foreground uppercase tracking-tighter">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {restaurant.deliveryTime}
                    </div>
                    <div className="font-black text-primary">
                      KES {restaurant.deliveryFee}
                    </div>
                  </div>
                </div>
                <Button className="mt-auto w-full group-hover:bg-primary/90 transition-all h-14 rounded-2xl font-black text-[14px] uppercase tracking-widest">
                  Pick it up
                </Button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-8">
            <Beef className="w-12 h-12 text-muted-foreground/30" />
          </div>
          <h3 className="text-2xl md:text-3xl font-black font-headline text-primary mb-3 uppercase tracking-tighter">No meat found</h3>
          <p className="text-muted-foreground text-[14px] md:text-lg font-medium">Try searching for 'Choma' or 'Beef'.</p>
        </div>
      )}
    </main>
  );
}

export default function MeatDiscovery() {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<div className="flex-grow flex items-center justify-center"><p className="font-black text-primary animate-pulse">LOADING MARKETPLACE...</p></div>}>
        <DiscoveryContent />
      </Suspense>
    </div>
  );
}
