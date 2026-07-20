
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { MapPin, Star, Clock, ArrowRight, Bike, Wallet, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Home() {
  const popularRestaurants = MOCK_RESTAURANTS.slice(0, 9);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-end overflow-hidden pb-20 lg:pb-32">
          {/* Hero Video Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
            >
              <source src="/Klickpin.com- 13933080092165366-pin-id-13933080092165366.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          </div>

          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-6 py-1.5 px-4 text-white font-semibold bg-primary/90 backdrop-blur-sm border-none">
                ABC Delivery - Fastest in Nairobi
              </Badge>
              
              <div className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-3 max-w-2xl border border-white/20 animate-in slide-in-from-bottom-4 duration-700">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                  <Input 
                    placeholder="Enter your delivery address" 
                    className="h-14 pl-12 border-none focus-visible:ring-0 text-lg bg-transparent text-white placeholder:text-white/60"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  className="h-14 px-10 rounded-xl text-lg font-bold text-accent hover:bg-white/10 hover:text-accent"
                >
                  Find Food <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="mt-10 flex items-center justify-between flex-wrap gap-6">
                <div className="flex gap-4 text-sm font-bold text-white/90">
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                    <Bike className="w-5 h-5 text-accent" /> 30 Min Delivery
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                    <Wallet className="w-5 h-5 text-accent" /> Best Prices
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Restaurants */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-bold font-headline text-primary mb-4">Popular Restaurants</h2>
                <p className="text-muted-foreground text-lg">From local favorites to global brands, we bring the best of Nairobi directly to your doorstep.</p>
              </div>
              <Link href="/restaurants" className="text-primary font-bold flex items-center gap-2 group hover:translate-x-1 transition-transform">
                Browse all spots
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {popularRestaurants.map((restaurant) => (
                <Link 
                  key={restaurant.id} 
                  href={`/restaurants/${restaurant.id}`}
                  className="group bg-card rounded-[2.5rem] overflow-hidden border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Badge className="absolute top-6 left-6 bg-white/95 text-primary font-bold border-none shadow-lg px-4 py-1.5">
                      {restaurant.category}
                    </Badge>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold font-headline text-primary group-hover:text-accent transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-1.5 bg-accent/10 px-3 py-1.5 rounded-xl text-accent font-bold text-sm">
                        <Star className="w-4 h-4 fill-accent" /> {restaurant.rating}
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" /> {restaurant.deliveryTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <Bike className="w-4 h-4 text-primary" /> KES {restaurant.deliveryFee} fee
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
           <p>© 2024 ABC. Proudly serving Nairobi, Kenya.</p>
        </div>
      </footer>
    </div>
  );
}
