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
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-4 md:px-8 h-16 md:h-20 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4 md:gap-8 shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-10 md:h-14 w-auto">
            <Image 
              src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
              alt="Steak West" 
              width={160}
              height={56}
              className="object-contain h-full w-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop Address Selector */}
        <button className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors border shadow-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-[12px] font-black uppercase tracking-tight">Silver Heights, Nairobi</span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-4 flex-grow max-w-2xl px-8">
        <div className="flex items-center bg-gray-100 rounded-full p-0.5 border shrink-0">
          <button onClick={() => setToggle('delivery')} className={cn("px-5 py-1 text-[10px] font-black uppercase transition-all rounded-full h-8 flex items-center", toggle === 'delivery' ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black")}>Delivery</button>
          <button onClick={() => setToggle('pickup')} className={cn("px-5 py-1 text-[10px] font-black uppercase transition-all rounded-full h-8 flex items-center", toggle === 'pickup' ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black")}>Pickup</button>
        </div>

        <div className="flex-grow relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input className="w-full bg-gray-50 border-none h-10 pl-10 text-[12px] font-bold rounded-full focus:bg-white focus:ring-2 focus:ring-black/5" placeholder="Sausages, T-Bone, Goat..." />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link href={user ? "/profile" : "/login"}>
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 font-black uppercase tracking-widest text-[10px] px-5 h-9 rounded-full bg-white border border-gray-200 hover:border-black transition-all">
            {user ? <User className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            {user ? "Account" : "Sign In"}
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden h-10 w-10 rounded-full">
            {user ? <User className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
          </Button>
        </Link>

        <Link href="/checkout">
          <Button variant="default" size="sm" className="relative bg-black text-white hover:bg-gray-800 h-9 px-5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg">
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Basket ({itemCount})</span>
            {itemCount > 0 && <span className="absolute -top-1 -right-1 bg-primary text-white w-4 h-4 rounded-full text-[8px] flex items-center justify-center border-2 border-white">{itemCount}</span>}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
