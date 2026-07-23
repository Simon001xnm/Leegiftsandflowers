"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { cn } from "@/lib/utils";
import { Star, Heart, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  { label: 'All' },
  { label: 'Raw Meat' },
  { label: 'Choma' },
  { label: 'Cooked' },
  { label: 'Drinks' },
  { label: 'Grocery' },
];

// Unified product list for discovery
const ALL_PRODUCTS = [
  { id: 'p1', name: "Beef chemsha 1kg", price: 1400, rating: 4.9, category: "Cooked", image: "/beef chemsha SMB.jpg" },
  { id: 'p2', name: "Beef choma 1kg", price: 1400, rating: 4.8, category: "Choma", image: "/BEEF CHOMA.jpg" },
  { id: 'p3', name: "Beef dry fry 1kg", price: 1400, rating: 4.7, category: "Cooked", image: "/BEEF DRY FRY.jpg" },
  { id: 'p4', name: "Beef takeaway", price: 900, rating: 4.9, category: "Raw Meat", image: "/BEEF TAKEAWAY.jpg" },
  { id: 'p5', name: "Chips portion", price: 200, rating: 4.5, category: "Grocery", image: "/CHIPS.jpg" },
  { id: 'p6', name: "Full chicken choma", price: 1000, rating: 4.8, category: "Choma", image: "/FULL CHICKEN CHOMA.jpg" },
  { id: 'p7', name: "Full chicken", price: 700, rating: 4.6, category: "Cooked", image: "/FULL CHICKEN.jpg" },
  { id: 'p8', name: "Full kichwa goat", price: 800, rating: 4.9, category: "Cooked", image: "/FULL KICHWA YA GOAT.jpg" },
  { id: 'd1', name: "Coca Cola 500ml", price: 80, rating: 4.9, category: "Drinks", image: "/From Klickpin.com- 944418984376291262-pin-id-944418984376291262-story-1.jpg" },
  { id: 'd2', name: "Fanta Orange 500ml", price: 80, rating: 4.8, category: "Drinks", image: "/From Klickpin.com- 599330662967424085-pin-id-599330662967424085.jpg" },
  { id: 'd3', name: "Minute Maid 400ml", price: 120, rating: 4.7, category: "Drinks", image: "/From Klickpin.com- 10836855347433280-pin-id-10836855347433280.jpg" },
  { id: 'd4', name: "Del Monte Mango 1L", price: 220, rating: 4.9, category: "Drinks", image: "/From Klickpin.com- 50524827070351339-pin-id-50524827070351339-story-1.jpg" },
  { id: 'd5', name: "Keringet Water 500ml", price: 50, rating: 4.9, category: "Drinks", image: "/From Klickpin.com- 6966574420736490-pin-id-6966574420736490-story-1.jpg" },
  { id: 'd6', name: "Tropical Dispatch", price: 200, rating: 4.8, category: "Drinks", image: "/From Klickpin.com- 141019032077665218-pin-id-141019032077665218.jpg" },
];

function DiscoveryContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | 'All'>('All');
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filteredProducts = ALL_PRODUCTS.filter(p => 
    category === 'All' || p.category === category
  );

  const handleAdd = (p: any) => {
    addToCart({
      id: p.id,
      restaurantId: 'r1',
      name: p.name,
      price: p.price,
      description: '',
      imageUrl: p.image,
      category: p.category
    });
    toast({ title: "Added", description: p.name });
  };

  return (
    <main className="flex-grow bg-white pb-24">
      {/* High Density Category Strip */}
      <div className="sticky top-24 z-40 bg-white border-b overflow-x-auto no-scrollbar py-3 px-4">
        <div className="flex items-center gap-8 min-w-max container mx-auto">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.label}
              onClick={() => setCategory(cat.label)}
              className={cn(
                "group transition-all shrink-0 pb-1 border-b-2",
                category === cat.label 
                  ? "border-red-600 opacity-100" 
                  : "border-transparent opacity-50 hover:opacity-100"
              )}
            >
              <span className="text-[10px] md:text-[12px] font-black text-black tracking-widest uppercase">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-12 py-8">
        {/* Nodes near you */}
        <section className="space-y-4">
          <h2 className="text-[11px] md:text-sm font-black tracking-[0.2em] uppercase px-1 text-muted-foreground">Operating nodes near you</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
            {MOCK_RESTAURANTS.map((brand, i) => (
              <div key={brand.id + i} className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-100 p-1 overflow-hidden group-hover:border-red-600 transition-all duration-500 shadow-xl group-hover:scale-105">
                  <Image src={brand.imageUrl} alt={brand.name} width={80} height={80} className="object-cover w-full h-full rounded-full" />
                </div>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest leading-none">{brand.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ULTRA-HIGH DENSITY PRODUCT GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1 border-b border-gray-100 pb-4">
            <h2 className="text-xl md:text-2xl font-medium tracking-tight">Marketplace discovery</h2>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600">{filteredProducts.length} items found</span>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0 border-l border-t border-gray-100">
            {filteredProducts.map((p) => (
              <div key={p.id} className="group relative flex flex-col border-r border-b border-gray-100 bg-white overflow-hidden transition-all duration-300 hover:z-10 hover:shadow-2xl">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Favorites Heart */}
                  <button className="absolute top-2 right-2 z-20 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-white transition-all shadow-sm">
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Gold Rating Badge */}
                  <div className="absolute bottom-2 left-2 z-20 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1 shadow-lg">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span className="text-[9px] font-black text-white">{p.rating}</span>
                  </div>

                  {/* Quick Add Button */}
                  <button 
                    onClick={() => handleAdd(p)}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 active:scale-90"
                  >
                    <Plus className="w-4 h-4 stroke-[3px]" />
                  </button>
                </div>

                <div className="p-3 md:p-4 space-y-1">
                  <h3 className="text-[10px] md:text-[13px] font-medium text-gray-800 line-clamp-2 leading-tight min-h-[2.4em]">
                    {p.name}
                  </h3>
                  <p className="text-[12px] md:text-[14px] font-bold text-black">
                    KES {p.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function MeatDiscovery() {
  return (
    <div className="min-h-screen flex flex-col bg-white pt-24">
      <Suspense fallback={<div className="flex-grow flex items-center justify-center font-black text-gray-300 uppercase text-[10px] tracking-[0.5em]">SYNCING NODES...</div>}>
        <DiscoveryContent />
      </Suspense>
    </div>
  );
}
