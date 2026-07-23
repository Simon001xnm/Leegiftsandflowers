
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, LogIn, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/firebase/auth/use-user";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { itemCount } = useCart();
  const { user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500 h-20 flex items-center justify-between px-6 md:px-12",
      isScrolled 
        ? "bg-black/95 backdrop-blur-xl border-b border-white/5 shadow-2xl" 
        : "bg-transparent"
    )}>
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-12 w-48">
            <Image 
              src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
              alt="Steak West" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {['Home', 'Shop', 'Categories', 'About Us', 'Offers', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className="text-[13px] font-black text-white/70 hover:text-white uppercase tracking-[0.2em] transition-all hover:scale-105"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <Link href="/checkout" className="relative p-2 text-white hover:text-primary transition-colors group">
          <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black animate-in zoom-in">
              {itemCount}
            </span>
          )}
        </Link>

        <Link href={user ? "/profile" : "/login"}>
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 md:px-8 h-10 font-black uppercase text-[11px] tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95">
            {user ? "Account" : "Login / Sign Up"}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
