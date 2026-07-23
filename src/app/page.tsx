'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  ChevronRight,
  Plus,
  Star,
  Search,
  MapPin
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const products = [
  { id: 'p1', name: "58 Spiced Orange Gin & Tonic", price: 99, oldPrice: 300, discount: "-67%", image: "https://picsum.photos/seed/drink1/300/300" },
  { id: 'p2', name: "Kenyan Originals Apple Cider", price: 99, oldPrice: 250, discount: "-60%", image: "https://picsum.photos/seed/drink2/300/300" },
  { id: 'p3', name: "KO Dry Cider Premium", price: 99, oldPrice: 200, discount: "-50%", image: "https://picsum.photos/seed/drink3/300/300" },
  { id: 'p4', name: "Outlet Kings Sliced Sandwich", price: 62.5, oldPrice: 125, discount: "-50%", image: "https://picsum.photos/seed/bread/300/300" },
  { id: 'p5', name: "KC Lemon and Ginger 750ml", price: 840, discount: "-15%", image: "https://picsum.photos/seed/sauce/300/300" },
  { id: 'p6', name: "Isinya Eggs 20 Pack", price: 458, image: "https://picsum.photos/seed/eggs/300/300" },
  { id: 'p7', name: "QMP Beef Cubes Steak 1/2Kg", price: 533, image: "https://picsum.photos/seed/beefcubes/300/300" },
  { id: 'p8', name: "Green Farm Yellow Yolk Eggs", price: 619, image: "https://picsum.photos/seed/eggs2/300/300" },
  { id: 'p9', name: "Premium T-Bone Steak", price: 1200, oldPrice: 1500, discount: "-20%", image: "https://picsum.photos/seed/tbone/300/300" },
  { id: 'p10', name: "Fresh Chicken Wings 1Kg", price: 550, image: "https://picsum.photos/seed/wings/300/300" },
  { id: 'p11', name: "Beef Mince Extra Lean", price: 650, image: "https://picsum.photos/seed/mince/300/300" },
  { id: 'p12', name: "Goat Meat Choma Cut", price: 750, image: "https://picsum.photos/seed/goat/300/300" }
];

export default function App() {
  const { addToCart, itemCount } = useCart();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = (p: any) => {
    addToCart({
      id: p.id,
      restaurantId: 'r1',
      name: p.name,
      price: p.price,
      description: '',
      imageUrl: p.image,
      category: 'Selection'
    });
    toast({ title: "ADDED", description: p.name });
  };

  return (
    <div className="bg-white text-black min-h-screen font-body selection:bg-red-600 selection:text-white">
      {/* NAVBAR */}
      <nav className={`flex justify-between items-center px-4 md:px-12 py-4 fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white border-b shadow-sm' : 'bg-transparent'}`}>
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-center gap-2">
            <h1 className={`text-xl md:text-2xl font-black tracking-tighter uppercase transition-colors ${isScrolled ? 'text-red-600' : 'text-white'}`}>
              🥩 STEAK WEST
            </h1>
          </Link>
          {isScrolled && (
            <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full border">
              <MapPin className="w-4 h-4 text-red-600" />
              <span className="text-[12px] font-bold">Nairobi</span>
            </div>
          )}
        </div>

        <div className="space-x-8 hidden lg:flex">
          {['Home', 'Shop', 'Offers', 'Contact'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className={`text-[12px] font-black uppercase tracking-widest transition-colors ${isScrolled ? 'text-black/60 hover:text-red-600' : 'text-white/60 hover:text-white'}`}>
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className={`font-black text-[12px] uppercase ${isScrolled ? 'text-black' : 'text-white'}`}>Login</Button>
          </Link>
          <Link href="/checkout">
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full flex items-center gap-2 transition-all active:scale-95 shadow-lg relative">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-widest hidden sm:inline">Basket</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-red-600 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-red-600">
                  {itemCount}
                </span>
              )}
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
            alt="Hero" 
            fill 
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/40" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none"
          >
            FRESH MEAT. <span className="text-red-600">DISPATCHED.</span>
          </motion.h1>

          <div className="flex flex-col md:flex-row items-center gap-4 max-w-xl mx-auto bg-white rounded-2xl p-2 shadow-2xl border">
            <div className="flex items-center gap-3 px-4 py-3 flex-grow w-full">
              <MapPin className="text-red-600 w-5 h-5 shrink-0" />
              <input 
                placeholder="Enter delivery location" 
                className="w-full bg-transparent outline-none text-black text-[14px] font-bold placeholder:text-gray-400 uppercase tracking-widest"
              />
            </div>
            <Button className="w-full md:w-auto h-12 px-8 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black uppercase text-[12px] tracking-widest">
              Explore
            </Button>
          </div>
        </div>
      </section>

      {/* RETAIL GRID - GLOVO STYLE */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        
        {/* PROMOTIONS SECTION */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tighter uppercase">Promotions</h2>
            <Button variant="secondary" className="rounded-full bg-gray-100 hover:bg-gray-200 text-black font-black text-[12px] px-6">Show all</Button>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-10">
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* TOP SELLERS SECTION */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tighter uppercase">Top Sellers</h2>
            <Button variant="secondary" className="rounded-full bg-gray-100 hover:bg-gray-200 text-black font-black text-[12px] px-6">Show all</Button>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-10">
            {products.slice(6, 12).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

      </main>

      {/* MINI FOOTER */}
      <footer className="px-6 md:px-12 py-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-50">
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">© 2026 STEAK WEST NETWORK.</span>
        </div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
           <Link href="/privacy" className="hover:text-red-600 transition-colors">Privacy</Link>
           <Link href="/terms" className="hover:text-red-600 transition-colors">Terms</Link>
           <span className="text-red-600 font-bold">+254 704 524070</span>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: (p: any) => void }) {
  return (
    <div className="flex flex-col group gap-2">
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-4">
        <div className="relative w-full h-full">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-contain transition-transform duration-500 group-hover:scale-110" 
          />
        </div>

        {/* DISCOUNT BADGE */}
        {product.discount && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
              {product.discount}
            </span>
          </div>
        )}

        {/* ADD BUTTON */}
        <button 
          onClick={() => onAdd(product)}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 hover:scale-110 active:scale-90 transition-all z-20"
        >
          <Plus className="w-5 h-5 text-red-600 stroke-[3px]" />
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="space-y-0.5 px-0.5">
        <h3 className="text-[11px] md:text-[13px] font-bold text-gray-800 line-clamp-2 leading-tight min-h-[2.4em]">
          {product.name}
        </h3>
        <div className="flex flex-col">
          <span className="text-[12px] md:text-[14px] font-black text-black">
            KSh{product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-[10px] md:text-[11px] text-gray-400 line-through font-bold">
              KSh{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

