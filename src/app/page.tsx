
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
  ArrowRight,
  Star,
  Clock,
  Bike
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { label: 'Butchery', icon: Beef },
  { label: 'Choma', icon: Flame },
  { label: 'Mutura', icon: Zap },
  { label: 'Cooked', icon: Utensils },
  { label: 'Wings', icon: Award },
  { label: 'Burgers', icon: Award },
  { label: 'Sushi', icon: Award },
  { label: 'Chinese', icon: Award },
  { label: 'Indian', icon: Award },
  { label: 'Seafood', icon: Award },
  { label: 'Soup', icon: Award },
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
          {/* Horizontal Category Scroller */}
          <div className="relative group">
            <div className="flex gap-10 overflow-x-auto no-scrollbar pb-4">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href="/restaurants" className="flex flex-col items-center gap-2 group shrink-0">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center transition-all group-hover:scale-110">
                    <cat.icon className="w-8 h-8 text-black" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-600">{cat.label}</span>
                </Link>
              ))}
            </div>
            <Button variant="ghost" size="icon" className="absolute -right-4 top-4 rounded-full bg-white shadow-md border opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {FILTER_PILLS.map((pill) => (
              <Button key={pill} variant="outline" className="rounded-full bg-gray-100 border-none text-xs font-bold px-4 h-9">
                {pill}
              </Button>
            ))}
          </div>

          {/* Hero Text */}
          <div className="py-6">
            <h1 className="text-5xl font-black font-headline text-black mb-2 tracking-tight">Crave it? Get it.</h1>
            <p className="text-gray-500 font-bold">Search for a favorite restaurant, cuisine, or dish.</p>
          </div>

          {/* Promo Banners */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#FFF9E6] rounded-2xl p-8 flex items-center justify-between overflow-hidden relative group cursor-pointer h-52">
              <div className="space-y-4 max-w-[60%] z-10">
                <h3 className="text-2xl font-black leading-tight">Try Steak West Prime free for 4 weeks</h3>
                <Button className="bg-white text-black hover:bg-gray-50 rounded-full font-bold px-6 shadow-sm">Join now</Button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2">
                <Image 
                  src="https://picsum.photos/seed/promo1/400/400" 
                  alt="Promo" 
                  fill 
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
            </div>

            <div className="bg-[#FF912C] rounded-2xl p-8 flex items-center justify-between overflow-hidden relative group cursor-pointer h-52">
              <div className="space-y-4 max-w-[60%] z-10 text-black">
                <h3 className="text-2xl font-black leading-tight">Late night cravings? Snacks and drinks near you</h3>
                <p className="text-sm font-bold">Open until late</p>
                <Button className="bg-white text-black hover:bg-gray-50 rounded-full font-bold px-6 shadow-sm">Order now</Button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2">
                <Image 
                  src="https://picsum.photos/seed/promo2/400/400" 
                  alt="Promo" 
                  fill 
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Circular Store Carousel */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-black">Stores near you</h2>
              <div className="flex items-center gap-2">
                <Link href="/restaurants" className="text-sm font-bold hover:underline">See all</Link>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-full"><ChevronLeft className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-full"><ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {MOCK_RESTAURANTS.map((shop) => (
                <Link key={shop.id} href={`/restaurants/${shop.id}`} className="flex flex-col items-center gap-3 shrink-0 group">
                  <div className="w-28 h-28 rounded-full border bg-white overflow-hidden relative shadow-sm transition-shadow group-hover:shadow-md">
                    <Image src={shop.imageUrl} alt={shop.name} fill className="object-cover p-2" />
                  </div>
                  <span className="text-xs font-bold text-center w-28 line-clamp-1">{shop.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Grid of Stores */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_RESTAURANTS.slice(0, 6).map((restaurant) => (
              <Link 
                key={restaurant.id} 
                href={`/restaurants/${restaurant.id}`}
                className="group space-y-3"
              >
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
                  <Image 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Button variant="ghost" size="icon" className="bg-white/90 rounded-full h-8 w-8"><Star className="w-4 h-4" /></Button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-black group-hover:underline">{restaurant.name}</h3>
                    <Badge className="bg-gray-100 text-black border-none text-[10px] font-bold">4.8</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <span>KES {restaurant.deliveryFee} Delivery Fee</span>
                    <span>•</span>
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
