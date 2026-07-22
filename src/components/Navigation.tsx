
"use client";

import Link from "next/link";
import Image from "next/image";
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
import { InstallAppButton } from "./InstallAppButton";

const ButcheryLogo = ({ className }: { className?: string }) => (
  <div className={cn("relative overflow-hidden shrink-0", className)}>
    <Image 
      src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
      alt="Steak West Logo" 
      fill 
      className="object-contain"
      priority
    />
  </div>
);

export function Navigation() {
  const [toggle, setToggle] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-4 md:px-8 h-16 md:h-20 flex items-center gap-4 md:gap-8 shadow-sm">
      <div className="flex items-center gap-4 md:gap-6 shrink-0">
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 md:h-12 md:w-12 hover:bg-primary/5">
          <Menu className="w-6 h-6 md:w-7 md:h-7 text-black" />
        </Button>
        <Link href="/" className="flex items-center gap-3 group">
          <ButcheryLogo className="w-14 h-14 md:w-20 md:h-20 transition-transform group-hover:scale-110" />
          <div className="flex flex-col -space-y-1">
            <span className="font-headline text-xl md:text-3xl font-black tracking-tighter text-black uppercase leading-none">
              Steak West
            </span>
            <span className="text-sm font-black text-primary uppercase tracking-[0.2em]">Super ya Nyama</span>
          </div>
        </Link>
      </div>

      <div className="hidden lg:flex items-center bg-gray-100 rounded-full p-1 shrink-0 ml-4">
        <button
          onClick={() => setToggle('delivery')}
          className={cn(
            "px-8 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all",
            toggle === 'delivery' ? "bg-black shadow-lg text-white" : "text-gray-500 hover:text-black"
          )}
        >
          Delivery
        </button>
        <button
          onClick={() => setToggle('pickup')}
          className={cn(
            "px-8 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all",
            toggle === 'pickup' ? "bg-black shadow-lg text-white" : "text-gray-500 hover:text-black"
          )}
        >
          Pickup
        </button>
      </div>

      <div className="hidden xl:flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 rounded-full cursor-pointer shrink-0 border border-transparent hover:border-gray-100 transition-all">
        <MapPin className="w-5 h-5 text-primary" />
        <span className="text-sm font-black uppercase tracking-tighter whitespace-nowrap">Utalii St • ASAP</span>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>

      <div className="flex-grow relative max-w-2xl group mx-4">
        <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
        <Input 
          className="w-full bg-gray-100 border-none rounded-full h-11 md:h-13 pl-12 md:pl-14 text-sm md:text-base font-bold placeholder:font-medium focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
          placeholder="Search for choma, mutura, or raw meat..."
        />
      </div>

      <div className="flex items-center gap-4 md:gap-6 shrink-0">
        <InstallAppButton />
        <Button variant="ghost" size="icon" className="relative bg-black text-white hover:bg-black/90 rounded-full h-11 w-11 md:h-14 md:w-14 shadow-xl shadow-black/10 transition-transform active:scale-95">
          <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] md:text-xs w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center font-black border-2 border-white">
            0
          </span>
        </Button>
      </div>
    </nav>
  );
}
