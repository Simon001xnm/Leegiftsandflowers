"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { MapPin, Star, Clock, ArrowRight, Bike, Wallet, ChevronRight, Heart, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Home() {
  const popularRestaurants = MOCK_RESTAURANTS;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden py-20 lg:py-32">
          {/* Hero Video Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
            >
              <source src="/From%20Klickpin.com-%2013933080092165366-pin-id-13933080092165366.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
          </div>

          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-6 py-1.5 px-4 text-white font-semibold bg-primary/90 backdrop-blur-sm border-none">
                <Flame className="w-4 h-4 mr-2 inline" /> Steak West - Nairobi's Meat King
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold font-headline text-white mb-6 leading-tight">
                Juicy Nyama Choma & <span className="text-primary">Fresh Cuts</span> Delivered.
              </h1>
              
              <p className="text-white/80 text-lg mb-10 max-w-lg leading-relaxed">
                From raw premium cuts to legendary Mutura, Supu ya Kichwa, and perfectly grilled Choma. Get the best of City Market at your door.
              </p>

              <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-xl animate-in slide-in-from-bottom-4 duration-700">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input 
                    placeholder="Enter delivery address in Nairobi" 
                    className="h-14 pl-12 border-none focus-visible:ring-0 text-lg bg-transparent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Link href="/restaurants">
                  <Button className="h-14 px-8 rounded-xl text-lg font-bold w-full md:w-auto">
                    Order Now <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 text-white font-bold text-sm">
                  <Bike className="w-5 h-5 text-primary" /> Express Delivery
                </div>
                <div className="flex items-center gap-3 bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 text-white font-bold text-sm">
                  <Flame className="w-5 h-5 text-primary" /> Hot & Fresh
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Sections */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-bold font-headline text-primary mb-4">Our Specialty Shops</h2>
                <p className="text-muted-foreground text-lg">Taste the heart of Kenyan meat culture. Premium, fresh, and authentic.</p>
              </div>
              <Link href="/restaurants" className="text-primary font-bold flex items-center gap-2 group">
                See all vendors
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {popularRestaurants.map((restaurant) => (
                <Link 
                  key={restaurant.id} 
                  href={`/restaurants/${restaurant.id}`}
                  className="group bg-card rounded-[2.5rem] overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <Badge className="absolute top-6 left-6 bg-white text-primary font-bold border-none shadow-lg px-4 py-1.5">
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
                        <Bike className="w-4 h-4 text-primary" /> KES {restaurant.deliveryFee}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Banner */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 overflow-hidden">
            <div className="flex items-center gap-8 animate-in slide-in-from-right-8 duration-1000">
               {['Mutura', 'Supu ya Kichwa', 'Nyama Choma', 'Matumbo', 'Raw Beef', 'Goat Meat', 'Ugali', 'Kachumbari'].map(item => (
                 <div key={item} className="whitespace-nowrap font-headline text-3xl font-black text-primary opacity-20 hover:opacity-100 transition-opacity cursor-default">
                    {item}
                 </div>
               ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
           <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <span className="font-headline text-3xl font-bold tracking-tight uppercase">Steak West</span>
           </div>
           
           <p className="mb-10 opacity-80 max-w-md mx-auto">Providing Nairobi with the most authentic and fresh meat experience. From our stall to your kitchen.</p>
           
           <div className="pt-10 border-t border-white/10 flex flex-col items-center gap-4">
              <p className="text-sm font-medium opacity-80 flex items-center gap-2">
                Created with <Heart className="w-4 h-4 fill-white text-white" /> by{" "}
                <Link 
                  href="https://simonstyles.co.ke" 
                  target="_blank" 
                  className="underline hover:text-accent transition-colors decoration-accent underline-offset-4 font-bold"
                >
                  Simon Styles Technologies Limited
                </Link>
              </p>
              <p className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-black">simonstyles.co.ke</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
