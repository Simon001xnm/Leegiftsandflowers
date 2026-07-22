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
import { useCart } from "@/context/CartContext";
import { useUser } from "@/firebase/auth/use-user";

export function Navigation() {
  const [toggle, setToggle] = useState<'delivery' | 'pickup'>('delivery');
  const { itemCount } = useCart();
  const { user } = useUser();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-4 md:px-8 h-14 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-gray-50 md:hidden">
          <Menu className="w-5 h-5 text-black" />
        </Button>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-6 md:h-7 w-auto">
            <Image 
              src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
              alt="Steak West" 
              width={80}
              height={28}
              className="object-contain h-full w-auto"
              priority
            />
          </div>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-3 flex-grow max-w-2xl mx-8">
        <div className="flex items-center bg-gray-100 rounded-full p-0.5 border">
          <button
            onClick={() => setToggle('delivery')}
            className={cn(
              "px-5 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all rounded-full",
              toggle === 'delivery' ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"
            )}
          >
            Delivery
          </button>
          <button
            onClick={() => setToggle('pickup')}
            className={cn(
              "px-5 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all rounded-full",
              toggle === 'pickup' ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"
            )}
          >
            Pickup
          </button>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-50 rounded-full cursor-pointer transition-all border border-transparent hover:border-gray-100">
          <MapPin className="w-3.5 h-3.5 text-black" />
          <span className="text-[12px] font-bold truncate max-w-[120px]">Utalii St • Now</span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>

        <div className="flex-grow relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-black transition-colors" />
          <Input 
            className="w-full bg-gray-100 border-none h-9 pl-10 text-[12px] font-medium focus-visible:ring-2 focus-visible:ring-black/5 rounded-full transition-all"
            placeholder="Search Steak West..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link href={user ? "/profile" : "/login"}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex items-center gap-2 font-black uppercase tracking-widest text-[10px] px-4 h-9 rounded-full bg-white border border-gray-200 hover:border-black transition-all"
          >
            {user ? <User className="w-3.5 h-3.5" /> : <LogIn className="w-3.5 h-3.5" />}
            {user ? "Account" : "Sign In"}
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden h-9 w-9 rounded-full">
            {user ? <User className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
          </Button>
        </Link>

        <Link href="/checkout">
          <Button variant="default" size="sm" className="relative bg-black text-white hover:bg-gray-800 h-9 px-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-all active:scale-95">
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            <span className="hidden sm:inline">{itemCount}</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white sm:hidden">
                {itemCount}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </nav>
  );
}