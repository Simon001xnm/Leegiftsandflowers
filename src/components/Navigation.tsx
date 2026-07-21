
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
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-4 h-16 flex items-center gap-4">
      <div className="flex items-center gap-4 shrink-0">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Menu className="w-6 h-6" />
        </Button>
        <Link href="/" className="flex items-center gap-1">
          <span className="font-headline text-2xl font-black tracking-tighter text-black uppercase">
            Steak West
          </span>
        </Link>
      </div>

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

      <div className="hidden md:flex items-center gap-1 px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer shrink-0">
        <MapPin className="w-4 h-4 text-black" />
        <span className="text-sm font-bold whitespace-nowrap">44848 Utalii St • Now</span>
        <ChevronDown className="w-4 h-4 text-black" />
      </div>

      <div className="flex-grow relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input 
          className="w-full bg-gray-100 border-none rounded-full h-11 pl-12 text-sm focus-visible:ring-1 focus-visible:ring-gray-200"
          placeholder="Search Steak West"
        />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="icon" className="relative bg-black text-white hover:bg-black/90 rounded-full h-11 w-11">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
            0
          </span>
        </Button>
      </div>
    </nav>
  );
}
