
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
  <div className={cn("relative shrink-0", className)}>
    <Image 
      src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
      alt="Steak West Logo" 
      fill 
      className="object-contain object-center"
      priority
    />
  </div>
);

export function Navigation() {
  const [toggle, setToggle] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-3 md:px-6 h-20 md:h-24 flex items-center gap-2 md:gap-4 shadow-sm">
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 hover:bg-primary/5 rounded-none">
          <Menu className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </Button>
        <Link href="/" className="flex items-center gap-1.5 md:gap-2 group">
          <ButcheryLogo className="w-7 h-7 md:w-9 md:h-9" />
          <div className="flex flex-col -space-y-0.5 md:-space-y-1">
            <span className="font-headline text-[13px] md:text-[16px] font-black tracking-tighter text-black uppercase leading-none whitespace-nowrap">
              Steak West
            </span>
            <span className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest whitespace-nowrap">Super ya Nyama</span>
          </div>
        </Link>
      </div>

      <div className="hidden lg:flex items-center bg-gray-100 p-0.5 shrink-0 ml-2">
        <button
          onClick={() => setToggle('delivery')}
          className={cn(
            "px-4 py-1.5 text-[14px] font-black uppercase tracking-widest transition-all",
            toggle === 'delivery' ? "bg-black shadow-lg text-white" : "text-gray-500 hover:text-black"
          )}
        >
          Delivery
        </button>
        <button
          onClick={() => setToggle('pickup')}
          className={cn(
            "px-4 py-1.5 text-[14px] font-black uppercase tracking-widest transition-all",
            toggle === 'pickup' ? "bg-black shadow-lg text-white" : "text-gray-500 hover:text-black"
          )}
        >
          Pickup
        </button>
      </div>

      <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-50 cursor-pointer shrink-0 border border-transparent hover:border-gray-100 transition-all">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-[14px] font-black uppercase tracking-tighter whitespace-nowrap">Utalii St • ASAP</span>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </div>

      <div className="flex-grow relative max-w-xl group mx-2 md:mx-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-primary transition-colors" />
        <Input 
          className="w-full bg-gray-100 border-none h-9 md:h-10 pl-9 md:pl-10 text-[14px] font-bold placeholder:font-medium focus-visible:ring-2 focus-visible:ring-primary/20 transition-all rounded-none"
          placeholder="Search items..."
        />
      </div>

      <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
        <div className="hidden md:block">
          <InstallAppButton />
        </div>
        <Button variant="ghost" size="icon" className="relative bg-black text-white hover:bg-black/90 h-9 w-9 md:h-10 md:w-10 shadow-xl shadow-black/10 transition-transform active:scale-95 rounded-none">
          <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-3.5 h-3.5 md:w-4.5 md:h-4.5 flex items-center justify-center font-black border-2 border-white">
            0
          </span>
        </Button>
      </div>
    </nav>
  );
}
