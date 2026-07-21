"use client";

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
  { label: 'Cooked', icon: Utensils, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Specials', icon: Award, color: 'bg-purple-50 text-purple-600' },
];

export default function Home() {
  const trendingProducts = MOCK_MENU.slice(0, 4);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section - Optimized height */}
        <section className="relative h-[65vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
            >
              <source src="/From%20Klickpin.com-%2013933080092165366-pin-id-13933080092165366.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          </div>

          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-xl">
              <Badge className="mb-4 bg-primary text-white border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3 h-3 mr-2 inline" /> Nairobi's #1 Butchery
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-headline text-white mb-4 leading-tight">
                Premium Cuts & <span className="text-accent">Authentic Choma</span>
              </h1>
              <p className="text-white/80 text-base lg:text-lg mb-8 max-w-md leading-relaxed">
                Order Nairobi's finest raw meat, legendary Mutura, and hot Nyama Choma. From City Market to your door in 25 minutes.
              </p>

              <div className="bg-white p-1.5 rounded-xl shadow-2xl flex flex-col sm:flex-row gap-1.5 max-w-lg">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input 
                    placeholder="Enter delivery address" 
                    className="h-11 pl-9 border-none focus-visible:ring-0 text-sm bg-transparent"
                  />
                </div>
                <Link href="/restaurants">
                  <Button className="h-11 px-6 rounded-lg font-bold w-full sm:w-auto">
                    Search <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* High Density Categories */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex gap-6 overflow-x-auto no-scrollbar justify-start md:justify-center">
              {QUICK_CATEGORIES.map((cat) => (
                <Link key={cat.label} href="/restaurants" className="flex flex-col items-center gap-2 group shrink-0">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-lg",
                    cat.color
                  )}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-center group-hover:text-primary transition-colors">{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Vendors - Compact Grid */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold font-headline text-primary uppercase tracking-tight">Top Rated Shops</h2>
                <p className="text-sm text-muted-foreground">The most trusted butchers and grills in Nairobi.</p>
              </div>
              <Link href="/restaurants" className="hidden sm:flex items-center gap-1 text-sm font-bold text-primary group">
                View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_RESTAURANTS.slice(0, 3).map((restaurant) => (
                <Link 
                  key={restaurant.id} 
                  href={`/restaurants/${restaurant.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[16/9]">
                    <Image 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-white/95 text-primary border-none text-[10px] font-bold">
                      {restaurant.category}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-primary group-hover:text-accent transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-0.5 text-xs font-bold text-accent">
                        <Star className="w-3 h-3 fill-accent" /> {restaurant.rating}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {restaurant.deliveryTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Bike className="w-3 h-3" /> KES {restaurant.deliveryFee}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending - Compact Product Cards */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold font-headline text-primary uppercase tracking-tight">Trending Now</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingProducts.map((item) => (
                <Link key={item.id} href={`/restaurants/${item.restaurantId}`} className="group space-y-3">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-2 right-2">
                       <Badge className="bg-primary text-white text-[10px] font-bold border-none">KES {item.price}</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-primary line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-muted-foreground line-clamp-1">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white pt-16 pb-8 border-t border-white/5">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
             <div className="max-w-xs space-y-4">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Beef className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-headline text-xl font-bold uppercase tracking-tighter">Steak West</span>
               </div>
               <p className="text-xs text-white/50 leading-relaxed">
                 Nairobi's authentic butchery experience. Sourced fresh, grilled to perfection, delivered in record time.
               </p>
             </div>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-bold uppercase tracking-wider text-white/40">
                <div className="space-y-3 flex flex-col">
                  <span className="text-white/60 mb-1">Explore</span>
                  <Link href="/restaurants" className="hover:text-primary transition-colors">Raw Meat</Link>
                  <Link href="/restaurants" className="hover:text-primary transition-colors">Nyama Choma</Link>
                </div>
                <div className="space-y-3 flex flex-col">
                  <span className="text-white/60 mb-1">Company</span>
                  <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
                  <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                </div>
             </div>
           </div>

           <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-col items-center sm:items-start gap-1">
                <p className="text-[10px] font-medium text-white/40">
                  Created with <Flame className="w-3 h-3 inline fill-primary text-primary" /> by{" "}
                  <Link href="https://simonstyles.co.ke" target="_blank" className="text-white hover:text-primary transition-colors font-bold">
                    Simon Styles Technologies Limited
                  </Link>
                </p>
              </div>
              
              <div className="relative">
                <span className="font-headline text-3xl font-bold text-white/5 select-none">ABC</span>
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary opacity-20" viewBox="0 0 40 10" fill="none">
                  <path d="M2 2C10 8 30 8 38 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}