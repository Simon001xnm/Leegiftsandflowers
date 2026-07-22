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
    <nav className="sticky top-0 z-50 w-full bg-white border-b px-4 md:px-8 h-16 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-gray-50 md:hidden">
          <Menu className="w-6 h-6 text-black" />
        </Button>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-8 w-auto">
            <Image 
              src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
              alt="Steak West" 
              width={100}
              height={32}
              className="object-contain h-8 w-auto"
              priority
            />
          </div>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4 flex-grow max-w-2xl mx-12">
        <div className="flex items-center bg-gray-100 rounded-full p-1 border">
          <button
            onClick={() => setToggle('delivery')}
            className={cn(
              "px-6 py-2 text-xs font-bold transition-all rounded-full",
              toggle === 'delivery' ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"
            )}
          >
            Delivery
          </button>
          <button
            onClick={() => setToggle('pickup')}
            className={cn(
              "px-6 py-2 text-xs font-bold transition-all rounded-full",
              toggle === 'pickup' ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"
            )}
          >
            Pickup
          </button>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-full cursor-pointer transition-all border border-transparent hover:border-gray-100">
          <MapPin className="w-4 h-4 text-black" />
          <span className="text-sm font-bold truncate max-w-[150px]">Utalii St • Now</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex-grow relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
          <Input 
            className="w-full bg-gray-100 border-none h-11 pl-12 text-sm font-medium focus-visible:ring-2 focus-visible:ring-black/5 rounded-full transition-all"
            placeholder="Search Steak West..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link href={user ? "/profile" : "/login"}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex items-center gap-2 font-bold px-4 h-10 rounded-full bg-white border border-gray-200 hover:border-black transition-all"
          >
            {user ? <User className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            {user ? "Account" : "Sign In"}
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden h-10 w-10 rounded-full">
            {user ? <User className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
          </Button>
        </Link>

        <Link href="/checkout">
          <Button variant="default" size="sm" className="relative bg-black text-white hover:bg-gray-800 h-10 px-4 rounded-full font-bold transition-all active:scale-95">
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{itemCount}</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white sm:hidden">
                {itemCount}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </nav>
  );
}