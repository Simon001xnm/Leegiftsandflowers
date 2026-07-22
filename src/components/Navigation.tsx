
"use client";

import Link from "next/link";
import { 
  Menu, 
  Search, 
  MapPin, 
  ShoppingCart, 
  ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [toggle, setToggle] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-3 md:px-4 h-14 md:h-16 flex items-center gap-2 md:gap-4">
      {/* Brand & Menu */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 md:h-10 md:w-10">
          <Menu className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
        <Link href="/" className="flex items-center gap-1">
          <span className="font-headline text-lg md:text-2xl font-black tracking-tighter text-black uppercase">
            Steak West
          </span>
        </Link>
      </div>

      {/* Desktop Toggle */}
      <div className="hidden lg:flex items-center bg-gray-100 rounded-full p-1 shrink-0">
        <button
          onClick={() => setToggle('delivery')}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-bold transition-all",
            toggle === 'delivery' ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"
          )}
        >
          Delivery
        </button>
        <button
          onClick={() => setToggle('pickup')}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-bold transition-all",
            toggle === 'pickup' ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"
          )}
        >
          Pickup
        </button>
      </div>

      {/* Desktop Address */}
      <div className="hidden xl:flex items-center gap-1 px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer shrink-0">
        <MapPin className="w-4 h-4 text-black" />
        <span className="text-sm font-bold whitespace-nowrap">Utalii St • Now</span>
        <ChevronDown className="w-4 h-4 text-black" />
      </div>

      {/* Search Bar - Responsive width */}
      <div className="flex-grow relative max-w-2xl group">
        <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
        <Input 
          className="w-full bg-gray-100 border-none rounded-full h-9 md:h-11 pl-9 md:pl-12 text-xs md:text-sm focus-visible:ring-1 focus-visible:ring-gray-200 transition-all"
          placeholder="Search items..."
        />
      </div>

      {/* Cart Icon */}
      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        <Button variant="ghost" size="icon" className="relative bg-black text-white hover:bg-black/90 rounded-full h-9 w-9 md:h-11 md:w-11">
          <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] md:text-[10px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
            0
          </span>
        </Button>
      </div>
    </nav>
  );
}
