"use client";

import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { SidebarNav } from "@/components/SidebarNav";
import { PromotionalPopup } from "@/components/PromotionalPopup";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { 
  Beef, 
  Flame, 
  Zap, 
  Utensils, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Star,
  ShoppingBag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Custom walking icon to replace hallucinated 'Walk' icon
const WalkingIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="13" cy="4" r="1" />
    <path d="m9 20 3-3.5 1-4.5 -2-2.5 -3 1.5" />
    <path d="m13 12 2 1.5 3-1" />
    <path d="m13 12-4-2.5-1-6" />
    <path d="m9 20-2-3" />
  </svg>
);

const CATEGORIES = [
  { label: 'Butchery', icon: Beef },
  { label: 'Grocery', icon: ShoppingBag },
  { label: 'Convenience', icon: Zap },
  { label: 'Alcohol', icon: Utensils },
  { label: 'Health', icon: Beef },
  { label: 'Retail', icon: Award },
  { label: 'Pet', icon: Award },
  { label: 'Flowers', icon: Flame },
  { label: 'Baby', icon: Utensils },
  { label: 'Personal Care', icon: Award },
];

const FILTER_PILLS = [
  "Offers", "Delivery fee", "Under 30 min", "Highest rated", "Rating", "Sort"
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <PromotionalPopup />
      
      <div className="flex flex-grow">
        <SidebarNav />
        
        <main className="flex-grow lg:ml-64 p-4 lg:p-8 space-y-10">
          {/* Hero Video Section with Forever Motion */}
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-black group">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80 animate-slow-zoom"
            >
              <source src="/From Klickpin.com- 13933080092165366-pin-id-13933080092165366.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-12 space-y-4">
              <Badge className="w-fit bg-primary text-white border-none px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                Premium Selection
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-black font-headline text-white mb-1 tracking-tighter uppercase leading-none">
                Crave it?<br />
                Get it.
              </h1>
              <p className="text-white/80 text-lg font-bold max-w-md leading-tight">
                Premium raw meat, grilled choma, and authentic Nairobi delicacies delivered to your doorstep.
              </p>
              <div className="flex gap-4 pt-4">
                <Button className="h-12 px-8 rounded-full bg-white text-black hover:bg-white/90 font-bold shadow-xl">
                  Order Now
                </Button>
                <Button variant="outline" className="h-12 px-8 rounded-full border-white text-white hover:bg-white hover:text-black font-bold">
                  View Menu
                </Button>
              </div>
            </div>
          </div>

          {/* Horizontal Category Scroller */}
          <div className="relative group">
            <div className="flex gap-10 overflow-x-auto no-scrollbar pb-4 border-b">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href="/restaurants" className="flex flex-col items-center gap-2 group shrink-0">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary/5">
                    <cat.icon className="w-8 h-8 text-black group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-600 group-hover:text-black">{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {FILTER_PILLS.map((pill) => (
              <Button key={pill} variant="outline" className="rounded-full bg-gray-100 border-none text-xs font-bold px-4 h-9">
                {pill}
              </Button>
            ))}
          </div>

          {/* Promo Banners */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#FFF9E6] rounded-2xl p-6 flex items-center justify-between overflow-hidden relative group cursor-pointer h-44 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-3 max-w-[60%] z-10">
                <h3 className="text-xl font-black leading-tight">Try Steak West Prime free for 4 weeks</h3>
                <Button className="bg-white text-black hover:bg-gray-50 rounded-full font-bold px-5 h-9 text-xs shadow-sm">Join now</Button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2">
                <Image 
                  src="https://picsum.photos/seed/promo1/400/400" 
                  alt="Promo" 
                  fill 
                  className="object-cover transition-transform group-hover:scale-110"
                  data-ai-hint="grocery promo"
                />
              </div>
            </div>

            <div className="bg-[#FF912C] rounded-2xl p-6 flex items-center justify-between overflow-hidden relative group cursor-pointer h-44 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-3 max-w-[60%] z-10 text-black">
                <h3 className="text-xl font-black leading-tight">Late night cravings? Snacks and drinks near you</h3>
                <Button className="bg-white text-black hover:bg-gray-50 rounded-full font-bold px-5 h-9 text-xs shadow-sm">Order now</Button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2">
                <Image 
                  src="https://picsum.photos/seed/promo2/400/400" 
                  alt="Promo" 
                  fill 
                  className="object-cover transition-transform group-hover:scale-110"
                  data-ai-hint="late night food"
                />
              </div>
            </div>
          </div>

          {/* Circular Store Carousel */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-black">Stores near you</h2>
              <div className="flex items-center gap-2">
                <Link href="/restaurants" className="text-xs font-bold hover:underline">See all</Link>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="w-7 h-7 rounded-full"><ChevronLeft className="w-3 h-3" /></Button>
                  <Button variant="outline" size="icon" className="w-7 h-7 rounded-full"><ChevronRight className="w-3 h-3" /></Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {MOCK_RESTAURANTS.map((shop) => (
                <Link key={shop.id} href={`/restaurants/${shop.id}`} className="flex flex-col items-center gap-2 shrink-0 group">
                  <div className="w-24 h-24 rounded-full border bg-white overflow-hidden relative shadow-sm transition-shadow group-hover:shadow-md">
                    <Image src={shop.imageUrl} alt={shop.name} fill className="object-cover p-2" />
                  </div>
                  <span className="text-[10px] font-bold text-center w-24 line-clamp-1">{shop.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* High-Density Uber Eats Style Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
            {MOCK_RESTAURANTS.map((restaurant, idx) => (
              <Link 
                key={restaurant.id} 
                href={`/restaurants/${restaurant.id}`}
                className="group flex flex-col space-y-2"
              >
                {/* Image Container with Overlays */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                  <Image 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Promo Tag */}
                  <div className="absolute top-0 left-0 z-10">
                    <div className="bg-[#D92626] text-white text-[10px] font-bold px-2 py-1 flex items-center h-6">
                      {idx % 2 === 0 ? "KES 200 off KES 2,000+" : "Items on sale"}
                    </div>
                  </div>

                  {/* Pick it up Pill */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                      <WalkingIcon className="w-4 h-4 text-black" />
                      <span className="text-xs font-bold text-black">Pick it up</span>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[15px] text-black group-hover:underline truncate">{restaurant.name}</h3>
                  </div>
                  <p className="text-gray-500 text-[13px] font-medium leading-none">
                    Currently unavailable • {((idx + 1) * 1.2).toFixed(1)} km
                  </p>
                  <div className="flex items-center gap-1 text-[13px] text-gray-500">
                    <span className="font-bold text-black">{restaurant.rating}</span>
                    <Star className="w-3 h-3 fill-black text-black" />
                    <span className="opacity-80">({(idx + 1) * 10}+)</span>
                    <span className="mx-1 opacity-40">•</span>
                    <span className="opacity-80">Currently unavailable</span>
                  </div>
                  {idx === 1 && (
                    <div className="mt-1">
                      <span className="bg-[#E6F3E6] text-[#006E00] text-[11px] font-bold px-2 py-0.5 rounded">Great value</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* High-Density Footer */}
          <footer className="pt-20 pb-10 border-t mt-20 text-center space-y-6">
             <div className="flex items-center justify-center gap-3 mb-4">
                <span className="font-headline text-3xl font-black tracking-tighter text-black uppercase">
                  Steak West
                </span>
                <div className="w-12 h-1.5 bg-primary rounded-full" />
             </div>
             
             <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground font-medium">
                  Created with love by <Link href="https://simonstyles.co.ke" target="_blank" className="text-black font-extrabold hover:underline">Simon Styles Technologies Limited</Link>
                </p>
                <Link href="https://simonstyles.co.ke" target="_blank" className="text-[10px] text-primary font-bold hover:underline tracking-widest uppercase">
                  simonstyles.co.ke
                </Link>
             </div>

             <div className="w-16 h-px bg-muted mx-auto" />

             <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-60">
                © {new Date().getFullYear()} Steak West Butchery. All rights reserved.
             </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
