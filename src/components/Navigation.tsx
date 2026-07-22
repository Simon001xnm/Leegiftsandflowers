
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

// Butchery Logo matching brand guidelines
const ButcheryLogo = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M50 5 C30 5 15 15 10 35 C10 60 30 85 50 95 C70 85 90 60 90 35 C85 15 70 5 50 5Z" fill="#E30613" />
    <path d="M50 15 L55 35 L75 35 L60 45 L65 65 L50 55 L35 65 L40 45 L25 35 L45 35 Z" fill="white" />
  </svg>
);

export function Navigation() {
  const [toggle, setToggle] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-3 md:px-6 h-14 md:h-16 flex items-center gap-3 md:gap-6 shadow-sm">
      {/* Brand & Menu */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 md:h-10 md:w-10 hover:bg-primary/5">
          <Menu className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </Button>
        <Link href="/" className="flex items-center gap-2 group">
          <ButcheryLogo className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:scale-110" />
          <div className="flex flex-col -space-y-1">
            <span className="font-headline text-lg md:text-2xl font-black tracking-tighter text-black uppercase leading-none">
              Steak West
            </span>
            <span className="text-[6px] md:text-[8px] font-black text-primary uppercase tracking-[0.2em]">Super ya Nyama</span>
          </div>
        </Link>
      </div>

      {/* Desktop Toggle */}
      <div className="hidden lg:flex items-center bg-gray-100 rounded-full p-1 shrink-0 ml-4">
        <button
          onClick={() => setToggle('delivery')}
          className={cn(
            "px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all",
            toggle === 'delivery' ? "bg-black shadow-lg text-white" : "text-gray-500 hover:text-black"
          )}
        >
          Delivery
        </button>
        <button
          onClick={() => setToggle('pickup')}
          className={cn(
            "px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all",
            toggle === 'pickup' ? "bg-black shadow-lg text-white" : "text-gray-500 hover:text-black"
          )}
        >
          Pickup
        </button>
      </div>

      {/* Desktop Address */}
      <div className="hidden xl:flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-full cursor-pointer shrink-0 border border-transparent hover:border-gray-100 transition-all">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-xs font-black uppercase tracking-tighter whitespace-nowrap">Utalii St • ASAP</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>

      {/* Search Bar */}
      <div className="flex-grow relative max-w-2xl group">
        <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
        <Input 
          className="w-full bg-gray-100 border-none rounded-full h-9 md:h-11 pl-9 md:pl-12 text-xs md:text-sm font-bold placeholder:font-medium focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
          placeholder="Search for choma, mutura, or raw meat..."
        />
      </div>

      {/* Cart Icon */}
      <div className="flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="icon" className="relative bg-black text-white hover:bg-black/90 rounded-full h-9 w-9 md:h-11 md:w-11 shadow-lg shadow-black/10 transition-transform active:scale-95">
          <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] md:text-[10px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-black border-2 border-white">
            0
          </span>
        </Button>
      </div>
    </nav>
  );
}
