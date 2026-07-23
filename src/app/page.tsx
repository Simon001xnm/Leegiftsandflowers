'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  ChevronRight,
  Plus,
  Star,
  Search,
  MapPin,
  Tag,
  TrendingUp,
  Clock,
  ShieldCheck
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
  const { addToCart } = useCart();
  const { toast } = useToast();

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
    toast({ title: "READY", description: p.name });
  };

  return (
    <div className="bg-white text-black min-h-screen font-body selection:bg-red-600 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative h-[65vh] min-h-[550px] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
            alt="Hero Meat" 
            fill 
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/60" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              FRESH MEAT. <br />
              <span className="text-red-600">DISPATCHED.</span>
            </h1>
            <p className="text-white/70 font-black text-[12px] md:text-[14px] uppercase tracking-[0.4em]">
              Premium Quality • 25 Min Delivery • Farm to Table
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-4 max-w-2xl mx-auto bg-white rounded-3xl p-2 shadow-2xl border-4 border-white/10">
            <div className="flex items-center gap-3 px-6 py-4 flex-grow w-full">
              <MapPin className="text-red-600 w-6 h-6 shrink-0" />
              <input 
                placeholder="ENTER DELIVERY LOCATION" 
                className="w-full bg-transparent outline-none text-black text-[14px] font-black placeholder:text-gray-400 uppercase tracking-widest"
              />
            </div>
            <Button className="w-full md:w-auto h-16 px-12 bg-red-600 hover:bg-red-700 text-white rounded-[1.5rem] font-black uppercase text-[13px] tracking-widest shadow-xl transition-all active:scale-95">
              Order Now
            </Button>
          </div>

          <div className="flex justify-center gap-8 md:gap-16 pt-8">
             <Stat node="10K+" label="Customers" />
             <Stat node="50+" label="Products" />
             <Stat node="4.8★" label="Rating" />
          </div>
        </div>
      </section>

      {/* RETAIL DISCOVERY GRID */}
      <main className="container mx-auto px-4 py-16 space-y-20">
        
        {/* PROMOTIONS */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b-4 border-black pb-4">
            <div className="flex items-center gap-3">
               <Tag className="w-6 h-6 text-red-600" />
               <h2 className="text-3xl font-black tracking-tighter uppercase">Flash Deals</h2>
            </div>
            <Button variant="ghost" className="font-black text-[11px] uppercase tracking-widest hover:text-red-600">View All</Button>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-12">
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* BEST SELLERS */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b-4 border-black pb-4">
            <div className="flex items-center gap-3">
               <TrendingUp className="w-6 h-6 text-red-600" />
               <h2 className="text-3xl font-black tracking-tighter uppercase">Elite Selection</h2>
            </div>
            <Button variant="ghost" className="font-black text-[11px] uppercase tracking-widest hover:text-red-600">Explore</Button>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-12">
            {products.slice(6, 12).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER MINI */}
      <footer className="bg-black py-8 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">© 2026 STEAK WEST NETWORK</p>
           <div className="flex gap-8">
             <Link href="/privacy" className="text-[10px] font-black text-white/50 hover:text-white uppercase tracking-widest">Privacy</Link>
             <Link href="/terms" className="text-[10px] font-black text-white/50 hover:text-white uppercase tracking-widest">Terms</Link>
             <span className="text-red-600 font-black text-[10px] uppercase tracking-widest">+254 704 524070</span>
           </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ node, label }: { node: string, label: string }) {
  return (
    <div className="text-white">
      <h3 className="text-2xl md:text-4xl font-black leading-none mb-1">{node}</h3>
      <p className="text-[9px] md:text-[11px] font-black uppercase text-white/40 tracking-widest">{label}</p>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: (p: any) => void }) {
  return (
    <div className="flex flex-col group gap-3">
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-square bg-gray-50 rounded-[2rem] overflow-hidden border-2 border-gray-100 flex items-center justify-center p-6 transition-all duration-500 hover:border-red-600/20 shadow-sm hover:shadow-2xl">
        <div className="relative w-full h-full">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-contain transition-transform duration-700 group-hover:scale-110" 
          />
        </div>

        {/* DISCOUNT BADGE */}
        {product.discount && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg uppercase tracking-tighter">
              {product.discount}
            </span>
          </div>
        )}

        {/* ADD BUTTON */}
        <button 
          onClick={() => onAdd(product)}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 hover:text-white hover:scale-110 active:scale-90 transition-all z-20 group/btn"
        >
          <Plus className="w-6 h-6 text-red-600 group-hover/btn:text-white stroke-[3px]" />
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="space-y-1 px-1">
        <h3 className="text-[11px] md:text-[13px] font-black text-gray-800 line-clamp-2 leading-tight min-h-[2.4em] uppercase tracking-tighter">
          {product.name}
        </h3>
        <div className="flex flex-col">
          <span className="text-[14px] md:text-[16px] font-black text-black">
            KSh {product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-gray-400 line-through font-bold">
              KSh {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}