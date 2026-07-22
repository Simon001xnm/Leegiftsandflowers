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
  <div className="relative shrink-0 flex items-center justify-center p-1">
    <Image 
      src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
      alt="Steak West Logo" 
      width={100}
      height={32}
      className="object-contain h-8 w-auto"
      priority
    />
  </div>
);

export function Navigation() {
  const [toggle, setToggle] = useState<'delivery' | 'pickup'>('delivery');
  const { itemCount } = useCart();
  const { user } = useUser();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-3 md:px-6 h-16 md:h-20 flex items-center gap-2 md:gap-4 shadow-sm">
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 hover:bg-gray-50">
          <Menu className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </Button>
        <Link href="/" className="flex items-center gap-1.5 md:gap-2 group">
          <ButcheryLogo />
          <div className="hidden sm:flex flex-col -space-y-0.5 md:-space-y-1 ml-1">
            <span className="font-headline text-[13px] md:text-[14px] font-black tracking-tighter text-black uppercase leading-none whitespace-nowrap">
              Steak West
            </span>
            <span className="text-[8px] md:text-[9px] font-black text-primary uppercase tracking-widest whitespace-nowrap">Super ya Nyama</span>
          </div>
        </Link>
      </div>

      <div className="hidden lg:flex items-center bg-gray-50 rounded-full p-1 shrink-0 ml-2 border">
        <button
          onClick={() => setToggle('delivery')}
          className={cn(
            "px-6 py-1.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-full",
            toggle === 'delivery' ? "bg-black shadow-lg text-white" : "text-gray-400 hover:text-black"
          )}
        >
          Delivery
        </button>
        <button
          onClick={() => setToggle('pickup')}
          className={cn(
            "px-6 py-1.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-full",
            toggle === 'pickup' ? "bg-black shadow-lg text-white" : "text-gray-400 hover:text-black"
          )}
        >
          Pickup
        </button>
      </div>

      <div className="hidden xl:flex items-center gap-1.5 px-4 py-2 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer shrink-0 border transition-all">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        <span className="text-[11px] font-black uppercase tracking-tighter whitespace-nowrap">Utalii St • ASAP</span>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </div>

      <div className="flex-grow relative max-w-xl group mx-2 md:mx-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
        <Input 
          className="w-full bg-gray-50 border-none h-11 pl-12 text-[13px] font-bold placeholder:font-medium focus-visible:ring-2 focus-visible:ring-primary/10 transition-all rounded-2xl"
          placeholder="Search marketplace..."
        />
      </div>

      <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
        <div className="hidden md:block">
          <InstallAppButton />
        </div>
        
        <Link href={user ? "/profile" : "/login"}>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-10 w-10 md:h-12 md:w-12 rounded-2xl transition-all border-2",
              !user ? "bg-white border-gray-100 hover:border-black" : "bg-primary/5 text-primary border-primary/20 hover:bg-primary/10"
            )}
            title={user ? "Identity Node" : "Access Terminal"}
          >
            {user ? <User className="w-5 h-5 md:w-6 md:h-6" /> : <LogIn className="w-5 h-5 md:w-6 md:h-6" />}
          </Button>
        </Link>

        <Link href="/checkout">
          <Button variant="ghost" size="icon" className="relative bg-black text-white hover:bg-black/90 h-10 w-10 md:h-12 md:w-12 shadow-xl shadow-black/10 transition-transform active:scale-95 rounded-2xl">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-5 h-5 flex items-center justify-center font-black border-2 border-white rounded-full">
              {itemCount}
            </span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
