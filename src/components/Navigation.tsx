
'use client';

import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  ShoppingCart, 
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
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-4 md:px-8 h-12 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3 shrink-0">
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

      <div className="hidden md:flex items-center gap-4 flex-grow max-w-3xl px-6">
        <div className="flex items-center bg-gray-100 rounded-full p-0.5 border shrink-0">
          <button onClick={() => setToggle('delivery')} className={cn("px-4 py-1 text-[11px] font-black uppercase transition-all rounded-full h-7 flex items-center", toggle === 'delivery' ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black")}>Delivery</button>
          <button onClick={() => setToggle('pickup')} className={cn("px-4 py-1 text-[11px] font-black uppercase transition-all rounded-full h-7 flex items-center", toggle === 'pickup' ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black")}>Pickup</button>
        </div>

        <div className="flex-grow relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <Input className="w-full bg-gray-100 border-none h-8 pl-9 text-[12px] font-bold rounded-full" placeholder="Search for items..." />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link href={user ? "/profile" : "/login"}>
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 font-black uppercase tracking-widest text-[10px] px-4 h-8 rounded-full bg-white border border-gray-200 hover:border-black transition-all">
            {user ? <User className="w-3.5 h-3.5" /> : <LogIn className="w-3.5 h-3.5" />}
            {user ? "Account" : "Sign In"}
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8 rounded-full">
            {user ? <User className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
          </Button>
        </Link>

        <Link href="/checkout">
          <Button variant="default" size="sm" className="relative bg-black text-white hover:bg-gray-800 h-8 px-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg">
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            <span className="hidden sm:inline">Basket ({itemCount})</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
