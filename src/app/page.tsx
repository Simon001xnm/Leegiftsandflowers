"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { MOCK_RESTAURANTS, MOCK_MENU } from "@/lib/food-data";
import { 
  MapPin, 
  Star, 
  Clock, 
  ArrowRight, 
  Bike, 
  ChevronRight, 
  Flame, 
  Beef, 
  Utensils, 
  ChefHat, 
  Zap, 
  Award,
  TrendingUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const QUICK_CATEGORIES = [
  { label: 'Raw Meat', icon: Beef, color: 'bg-red-50 text-red-600' },
  { label: 'Nyama Choma', icon: Flame, color: 'bg-orange-50 text-orange-600' },
  { label: 'Mutura', icon: Zap, color: 'bg-amber-50 text-amber-600' },
  { label: 'Cooked Meals', icon: Utensils, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Local Soups', icon: ChefHat, color: 'bg-blue-50 text-blue-600' },
  { label: 'Specials', icon: Award, color: 'bg-purple-50 text-purple-600' },
];

export default function Home() {
  const trendingProducts = MOCK_MENU.slice(0, 4);
  
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

        {/* Quick Categories - Glovo Style */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {QUICK_CATEGORIES.map((cat) => (
                <Link 
                  key={cat.label} 
                  href="/restaurants" 
                  className="flex flex-col items-center gap-3 min-w-[100px] group"
                >
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110",
                    cat.color
                  )}>
                    <cat.icon className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-bold text-center group-hover:text-primary transition-colors">{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Specialty Shops - The Glovo List */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary mb-2 uppercase">Specialty Vendors</h2>
                <p className="text-muted-foreground">Authentic Nairobi flavor from the most trusted kitchens.</p>
              </div>
              <Link href="/restaurants" className="hidden md:flex items-center gap-2 text-primary font-bold group">
                View all vendors <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_RESTAURANTS.map((restaurant) => (
                <Link 
                  key={restaurant.id} 
                  href={`/restaurants/${restaurant.id}`}
                  className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/95 text-primary border-none shadow-md font-bold px-3 py-1">
                        {restaurant.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold font-headline text-primary group-hover:text-accent transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm font-bold bg-accent/10 px-2 py-1 rounded-lg text-accent">
                        <Star className="w-4 h-4 fill-accent" /> {restaurant.rating}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" /> {restaurant.deliveryTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Bike className="w-4 h-4 text-primary" /> KES {restaurant.deliveryFee}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-10 md:hidden">
              <Link href="/restaurants">
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold">See all vendors</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trending Delicacies - Product Focus */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-12">
               <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <TrendingUp className="w-6 h-6" />
               </div>
               <div>
                  <h2 className="text-3xl font-bold font-headline text-primary uppercase">Trending Delicacies</h2>
                  <p className="text-muted-foreground">What everyone is ordering in Nairobi today.</p>
               </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((item) => (
                <div key={item.id} className="group bg-muted/30 rounded-3xl p-4 border border-transparent hover:border-primary/20 transition-all">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-2 right-2">
                       <Badge className="bg-primary text-white font-bold border-none shadow-lg">KES {item.price}</Badge>
                    </div>
                  </div>
                  <h4 className="font-bold text-primary mb-1">{item.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                  <Link href={`/restaurants/${item.restaurantId}`}>
                    <Button variant="outline" size="sm" className="w-full rounded-xl font-bold border-primary/20 text-primary hover:bg-primary hover:text-white">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meat Categories Marquee */}
        <section className="py-12 bg-primary overflow-hidden">
          <div className="flex items-center gap-8 animate-in slide-in-from-right-8 duration-1000">
             {['Mutura', 'Supu ya Kichwa', 'Nyama Choma', 'Matumbo', 'Raw Beef', 'Goat Meat', 'Ugali', 'Kachumbari'].map(item => (
               <div key={item} className="whitespace-nowrap font-headline text-5xl font-black text-white/20 hover:text-white/100 transition-colors cursor-default select-none">
                  {item}
               </div>
             ))}
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
           <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
             <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Beef className="w-8 h-8 text-white" />
                </div>
                <span className="font-headline text-3xl font-bold tracking-tight uppercase">Steak West</span>
             </div>
             
             <p className="mb-10 text-white/60 leading-relaxed">
               Nairobi's authentic butchery experience, delivered. We source directly from trusted farmers to ensure every cut is fresh, every grill is hot, and every delicacy is traditional.
             </p>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mb-16 text-sm font-bold uppercase tracking-widest text-white/40">
                <Link href="/restaurants" className="hover:text-primary transition-colors">Raw Meat</Link>
                <Link href="/restaurants" className="hover:text-primary transition-colors">Nyama Choma</Link>
                <Link href="/restaurants" className="hover:text-primary transition-colors">Mutura</Link>
                <Link href="/restaurants" className="hover:text-primary transition-colors">Local Supu</Link>
             </div>

             <div className="pt-10 border-t border-white/10 w-full flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm font-medium text-white/80 flex items-center gap-2">
                    Created with <Flame className="w-4 h-4 fill-primary text-primary" /> by{" "}
                    <Link 
                      href="https://simonstyles.co.ke" 
                      target="_blank" 
                      className="underline hover:text-primary transition-colors decoration-primary underline-offset-4 font-bold"
                    >
                      Simon Styles Technologies Limited
                    </Link>
                  </p>
                  <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black">simonstyles.co.ke</p>
                </div>
                
                <div className="relative mt-4">
                  <span className="font-headline text-5xl font-bold text-white/5 select-none">ABC</span>
                  <svg 
                    className="absolute -bottom-2 left-0 w-full h-3 text-primary opacity-20" 
                    viewBox="0 0 40 10" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M2 2C10 8 30 8 38 2" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
}