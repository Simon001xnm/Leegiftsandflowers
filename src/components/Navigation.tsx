'use client';

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/firebase/auth/use-user";

export function Navigation() {
  const { itemCount } = useCart();
  const { user } = useUser();

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-white/10 h-20 flex items-center justify-between px-6 md:px-12">
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
              className="text-[13px] font-bold text-white/70 hover:text-white uppercase tracking-widest transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/checkout" className="relative text-white hover:text-primary transition-colors">
          <ShoppingCart className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
              {itemCount}
            </span>
          )}
        </Link>

        <Link href={user ? "/profile" : "/login"}>
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-10 font-bold uppercase text-[12px] tracking-widest shadow-lg shadow-primary/20">
            {user ? "Profile" : "Login / Sign Up"}
          </Button>
        </Link>
      </div>
    </nav>
  );
}