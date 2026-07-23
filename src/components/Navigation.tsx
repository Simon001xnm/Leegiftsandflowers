'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/firebase/auth/use-user";
import { cn } from "@/lib/utils";
import { InstallAppButton } from "./InstallAppButton";

/**
 * Unified sticky navigation
 * Logo positioned at the far left edge with minimal padding.
 */
export function Navigation() {
  const { itemCount } = useCart();
  const { user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500 h-24 flex items-center justify-between pr-4 md:pr-12 pl-1 md:pl-2 border-b",
      isScrolled 
        ? "bg-white/95 backdrop-blur-xl border-gray-100 shadow-lg" 
        : "bg-white border-transparent"
    )}>
      <div className="flex items-center gap-4 md:gap-10">
        <Link href="/" className="flex items-center group">
          <div className="relative h-16 w-52 md:h-18 md:w-80">
            <Image 
              src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
              alt="Steak West" 
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Action button between Logo and links */}
        <InstallAppButton />

        <div className="hidden lg:flex items-center gap-10">
          {['Shop', 'Offers', 'About', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className="text-[13px] font-medium text-gray-500 hover:text-black transition-all hover:translate-y-[-1px]"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <Link href="/checkout" className="relative p-2 text-black hover:text-red-600 transition-colors group">
          <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in">
              {itemCount}
            </span>
          )}
        </Link>

        <Link href={user ? "/profile" : "/login"}>
          <Button variant="default" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 md:px-8 h-10 font-bold text-[12px] shadow-xl shadow-red-600/20 transition-all active:scale-95">
            {user ? (
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Account</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Authorize</span>
              </div>
            )}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
