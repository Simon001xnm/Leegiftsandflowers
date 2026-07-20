"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS, FoodCategory } from "@/lib/food-data";
import { Search, Star, Clock, Filter, SlidersHorizontal, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CATEGORIES: FoodCategory[] = ['Burger', 'Pizza', 'Sushi', 'Coffee', 'Healthy', 'Dessert'];

export default function RestaurantsDiscovery() {
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
          <h1 className="text-4xl lg:text-5xl font-bold font-headline text-primary mb-4">Restaurants in Nairobi</h1>
          <p className="text-muted-foreground text-lg">Find the best food in your neighborhood.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              className="pl-12 h-14 rounded-2xl border-2 border-muted" 
              placeholder="Search for restaurants or dishes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Button 
              variant={category === 'All' ? 'default' : 'outline'} 
              className="h-14 rounded-2xl px-6 shrink-0"
              onClick={() => setCategory('All')}
            >
              All
            </Button>
            {CATEGORIES.map(cat => (
              <Button 
                key={cat}
                variant={category === cat ? 'default' : 'outline'} 
                className="h-14 rounded-2xl px-6 shrink-0"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <span className="text-sm font-medium text-muted-foreground">
            Found <span className="text-primary font-bold">{filteredRestaurants.length}</span> restaurants
          </span>
          <Button variant="ghost" size="sm" className="gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Sort by: Rating
          </Button>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <Link 
                key={restaurant.id} 
                href={`/restaurants/${restaurant.id}`}
                className="group flex flex-col bg-card rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 shadow-sm bg-white/95 text-primary">
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
                        KES {restaurant.deliveryFee} fee
                      </div>
                    </div>
                  </div>
                  <Button className="mt-auto w-full group-hover:bg-primary/90 transition-colors">
                    Order Now
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-bold font-headline text-primary mb-2">No restaurants found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
          </div>
        )}
      </main>
    </div>
  );
}