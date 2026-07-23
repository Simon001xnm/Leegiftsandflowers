'use client';

import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  ShoppingCart, 
  User,
  LogIn,
  MapPin,
  ChevronDown
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
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-4 md:px-8 h-20 md:h-24 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-6 md:gap-10 shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-14 md:h-20 w-auto transition-transform hover:scale-105 active:scale-95 duration-300">
            <Image 
              src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
              alt="Steak West" 
              width={280}
              height={80}
              className="object-contain h-full w-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop Address Selector */}
        <button className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full hover:bg-gray-50 transition-all border shadow-sm active:scale-95">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-[13px] font-black uppercase tracking-tight">Silver Heights, Nairobi</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-4 flex-grow max-w-2xl px-8">
        <div className="flex items-center bg-gray-100 rounded-full p-1 border shrink-0">
          <button onClick={() => setToggle('delivery')} className={cn("px-6 py-1.5 text-[11px] font-black uppercase transition-all rounded-full h-9 flex items-center", toggle === 'delivery' ? "bg-white shadow-md text-black" : "text-gray-500 hover:text-black")}>Delivery</button>
          <button onClick={() => setToggle('pickup')} className={cn("px-6 py-1.5 text-[11px] font-black uppercase transition-all rounded-full h-9 flex items-center", toggle === 'pickup' ? "bg-white shadow-md text-black" : "text-gray-500 hover:text-black")}>Pickup</button>
        </div>

        <div className="flex-grow relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input className="w-full bg-gray-50 border-none h-12 pl-12 text-[13px] font-bold rounded-full focus:bg-white focus:ring-4 focus:ring-black/5 transition-all" placeholder="Sausages, T-Bone, Goat..." />
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Link href={user ? "/profile" : "/login"}>
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 font-black uppercase tracking-widest text-[11px] px-6 h-10 rounded-full bg-white border-2 border-gray-100 hover:border-black transition-all shadow-sm">
            {user ? <User className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            {user ? "Account" : "Sign In"}
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden h-12 w-12 rounded-full border border-gray-100">
            {user ? <User className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
          </Button>
        </Link>

        <Link href="/checkout">
          <Button variant="default" size="sm" className="relative bg-black text-white hover:bg-gray-800 h-10 px-6 rounded-full font-black uppercase tracking-widest text-[11px] transition-all active:scale-95 shadow-xl shadow-black/10">
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Basket ({itemCount})</span>
            {itemCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-primary text-white w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center border-2 border-white">{itemCount}</span>}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
