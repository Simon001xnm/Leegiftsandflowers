"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS, FoodCategory } from "@/lib/food-data";
import { Search, Star, Clock, Filter, SlidersHorizontal, MapPin, Beef } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CATEGORIES: FoodCategory[] = ['Raw Meat', 'Nyama Choma', 'Delicacies', 'Cooked', 'Sides'];

export default function MeatDiscovery() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FoodCategory | 'All'>('All');

  const filteredRestaurants = MOCK_RESTAURANTS.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                          r.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || r.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 py-1">Nairobi Fresh</Badge>
          <h1 className="text-5xl font-bold font-headline text-primary mb-4 uppercase">The Meat Shop</h1>
          <p className="text-muted-foreground text-lg">Premium raw meat, grilled choma, and authentic Nairobi delicacies.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              className="pl-12 h-14 rounded-2xl border-2 border-muted" 
              placeholder="Search for Nyama Choma, Mutura, or Beef..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Button 
              variant={category === 'All' ? 'default' : 'outline'} 
              className="h-14 rounded-2xl px-6 shrink-0 font-bold"
              onClick={() => setCategory('All')}
            >
              All
            </Button>
            {CATEGORIES.map(cat => (
              <Button 
                key={cat}
                variant={category === cat ? 'default' : 'outline'} 
                className="h-14 rounded-2xl px-6 shrink-0 font-bold"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <span className="text-sm font-medium text-muted-foreground">
            Found <span className="text-primary font-bold">{filteredRestaurants.length}</span> specialty vendors
          </span>
          <Button variant="ghost" size="sm" className="gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Sort by: Nearest
          </Button>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <Link 
                key={restaurant.id} 
                href={`/restaurants/${restaurant.id}`}
                className="group flex flex-col bg-card rounded-[2rem] overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 shadow-sm bg-white text-primary font-bold">
                    {restaurant.category}
                  </Badge>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold font-headline text-primary">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1 text-primary font-bold">
                      <Star className="w-4 h-4 fill-primary" /> {restaurant.rating}
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {restaurant.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {restaurant.deliveryTime}
                      </div>
                      <div className="font-bold text-primary">
                        KES {restaurant.deliveryFee}
                      </div>
                    </div>
                  </div>
                  <Button className="mt-auto w-full group-hover:bg-primary/90 transition-all h-12 rounded-xl font-bold">
                    View Selection
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <Beef className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-bold font-headline text-primary mb-2">No meat found</h3>
            <p className="text-muted-foreground">Try searching for 'Choma' or 'Beef'.</p>
          </div>
        )}
      </main>
    </div>
  );
}
