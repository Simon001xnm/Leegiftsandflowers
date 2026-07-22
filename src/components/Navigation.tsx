'use client';

import Link from "next/link";
import Image from "next/image";
import { 
  Menu, 
  Search, 
  MapPin, 
  ShoppingCart, 
  ChevronDown,
  User,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { InstallAppButton } from "./InstallAppButton";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/firebase/auth/use-user";

const ButcheryLogo = () => (
  <div className="relative shrink-0 flex items-center justify-center px-1">
    <Image 
      src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
      alt="Steak West Logo" 
      width={100}
      height={32}
      className="object-contain h-7 w-auto"
      priority
    />
  </div>
);

export function Navigation() {
  const [toggle, setToggle] = useState<'delivery' | 'pickup'>('delivery');
  const { itemCount } = useCart();
  const { user } = useUser();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-4 md:px-6 h-14 flex items-center gap-3 md:gap-4 shadow-sm">
      <div className="flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-gray-50 md:hidden">
          <Menu className="w-5 h-5 text-black" />
        </Button>
        <Link href="/" className="flex items-center gap-1.5 group">
          <ButcheryLogo />
          <div className="hidden lg:flex flex-col -space-y-1 ml-1">
            <span className="font-headline text-[12px] font-black tracking-tighter text-black uppercase leading-none whitespace-nowrap">
              Steak West
            </span>
            <span className="text-[7px] font-black text-primary uppercase tracking-[0.2em] whitespace-nowrap">Super ya Nyama</span>
          </div>
        </Link>
      </div>

      <div className="hidden lg:flex items-center bg-gray-100 rounded-none p-0.5 shrink-0 ml-2 border border-black/5">
        <button
          onClick={() => setToggle('delivery')}
          className={cn(
            "px-6 py-1.5 text-[8px] font-black uppercase tracking-widest transition-all rounded-none",
            toggle === 'delivery' ? "bg-black shadow-lg text-white" : "text-gray-400 hover:text-black"
          )}
        >
          Delivery
        </button>
        <button
          onClick={() => setToggle('pickup')}
          className={cn(
            "px-6 py-1.5 text-[8px] font-black uppercase tracking-widest transition-all rounded-none",
            toggle === 'pickup' ? "bg-black shadow-lg text-white" : "text-gray-400 hover:text-black"
          )}
        >
          Pickup
        </button>
      </div>

      <div className="hidden xl:flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-black/5 rounded-none hover:bg-gray-100 cursor-pointer shrink-0 transition-all">
        <MapPin className="w-3 h-3 text-primary" />
        <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Utalii St • ASAP</span>
        <ChevronDown className="w-2.5 h-2.5 text-gray-400" />
      </div>

      <div className="flex-grow relative max-w-xl group mx-2 hidden sm:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 group-focus-within:text-primary transition-colors" />
        <Input 
          className="w-full bg-gray-50 border-none h-9 pl-10 text-[11px] font-bold placeholder:font-medium focus-visible:ring-1 focus-visible:ring-primary/10 transition-all rounded-none"
          placeholder="Search items..."
        />
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0 ml-auto">
        <div className="hidden md:block scale-[0.85] origin-right">
          <InstallAppButton />
        </div>
        
        <Link href={user ? "/profile" : "/login"}>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-9 w-9 rounded-none transition-all border group",
              !user ? "bg-white border-black hover:bg-black hover:text-white" : "bg-gray-50 text-black border-black/10 hover:border-black"
            )}
          >
            {user ? <User className="w-4 h-4" /> : <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          </Button>
        </Link>

        <Link href="/checkout">
          <Button variant="ghost" size="icon" className="relative bg-black text-white hover:bg-primary h-9 w-9 shadow-xl shadow-black/10 transition-all active:scale-90 rounded-none border-none">
            <ShoppingCart className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] w-4.5 h-4.5 flex items-center justify-center font-black border-2 border-white">
              {itemCount}
            </span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
