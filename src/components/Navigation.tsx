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
      width={120}
      height={40}
      className="object-contain h-10 w-auto"
      priority
    />
  </div>
);

export function Navigation() {
  const [toggle, setToggle] = useState<'delivery' | 'pickup'>('delivery');
  const { itemCount } = useCart();
  const { user } = useUser();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-4 md:px-8 h-20 flex items-center gap-4 md:gap-6 shadow-sm overflow-visible">
      <div className="flex items-center gap-3 shrink-0">
        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-gray-50 md:hidden">
          <Menu className="w-6 h-6 text-black" />
        </Button>
        <Link href="/" className="flex items-center gap-2 group">
          <ButcheryLogo />
          <div className="hidden lg:flex flex-col -space-y-1 ml-2">
            <span className="font-headline text-[15px] font-black tracking-tighter text-black uppercase leading-none whitespace-nowrap">
              Steak West
            </span>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] whitespace-nowrap">Super ya Nyama</span>
          </div>
        </Link>
      </div>

      <div className="hidden lg:flex items-center bg-gray-100 rounded-none p-1 shrink-0 ml-4 border-2 border-black/5">
        <button
          onClick={() => setToggle('delivery')}
          className={cn(
            "px-8 py-2 text-[11px] font-black uppercase tracking-widest transition-all rounded-none",
            toggle === 'delivery' ? "bg-black shadow-xl text-white" : "text-gray-400 hover:text-black"
          )}
        >
          Delivery
        </button>
        <button
          onClick={() => setToggle('pickup')}
          className={cn(
            "px-8 py-2 text-[11px] font-black uppercase tracking-widest transition-all rounded-none",
            toggle === 'pickup' ? "bg-black shadow-xl text-white" : "text-gray-400 hover:text-black"
          )}
        >
          Pickup
        </button>
      </div>

      <div className="hidden xl:flex items-center gap-2 px-5 py-2.5 bg-gray-50 border-2 border-black/5 rounded-none hover:bg-gray-100 cursor-pointer shrink-0 transition-all">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">Utalii St • ASAP</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </div>

      <div className="flex-grow relative max-w-2xl group mx-4 hidden sm:block">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
        <Input 
          className="w-full bg-gray-50 border-none h-12 pl-14 text-[14px] font-bold placeholder:font-medium focus-visible:ring-2 focus-visible:ring-primary/10 transition-all rounded-none"
          placeholder="Search for Beef, Choma, Mutura..."
        />
      </div>

      <div className="flex items-center gap-3 md:gap-5 shrink-0 ml-auto">
        <div className="hidden md:block">
          <InstallAppButton />
        </div>
        
        <Link href={user ? "/profile" : "/login"}>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-12 w-12 rounded-none transition-all border-2 group",
              !user ? "bg-white border-black hover:bg-black hover:text-white" : "bg-gray-50 text-black border-black/10 hover:border-black"
            )}
            title={user ? "Account Dashboard" : "Login Terminal"}
          >
            {user ? <User className="w-6 h-6" /> : <LogIn className="w-6 h-6 transition-transform group-hover:translate-x-1" />}
          </Button>
        </Link>

        <Link href="/checkout">
          <Button variant="ghost" size="icon" className="relative bg-black text-white hover:bg-primary h-12 w-12 shadow-2xl shadow-black/20 transition-all active:scale-90 rounded-none border-none">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-6 h-6 flex items-center justify-center font-black border-2 border-white">
              {itemCount}
            </span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
