
"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { cn } from "@/lib/utils";
import { Star, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/landing/Footer";

const CATEGORIES = [
  { label: 'All' },
  { label: 'Raw Meat' },
  { label: 'Choma' },
  { label: 'Cooked' },
  { label: 'Drinks' },
  { label: 'Grocery' },
];

const ALL_PRODUCTS = [
  { id: 'p1', name: "Beef chemsha 1kg", price: 1400, rating: 4.9, category: "Cooked", image: "/beef chemsha SMB.jpg" },
  { id: 'p2', name: "Beef choma 1kg", price: 1400, rating: 4.8, category: "Choma", image: "/BEEF CHOMA.jpg" },
  { id: 'p3', name: "Beef dry fry 1kg", price: 1400, rating: 4.7, category: "Cooked", image: "/BEEF DRY FRY.jpg" },
  { id: 'p4', name: "Beef takeaway", price: 900, rating: 4.9, category: "Raw Meat", image: "/BEEF TAKEAWAY.jpg" },
  { id: 'p5', name: "Chips portion", price: 200, rating: 4.5, category: "Grocery", image: "/CHIPS.jpg" },
  { id: 'p6', name: "Full chicken choma", price: 1000, rating: 4.8, category: "Choma", image: "/FULL CHICKEN CHOMA.jpg" },
  { id: 'p7', name: "Full chicken", price: 700, rating: 4.6, category: "Cooked", image: "/FULL CHICKEN.jpg" },
  { id: 'p8', name: "Full kichwa goat", price: 800, rating: 4.9, category: "Cooked", image: "/FULL KICHWA YA GOAT.jpg" },
  { id: 'd1', name: "Coca Cola 500ml", price: 80, rating: 4.9, category: "Drinks", image: "https://picsum.photos/seed/cola1/600/600" },
  { id: 'd2', name: "Fanta Orange 500ml", price: 80, rating: 4.8, category: "Drinks", image: "https://picsum.photos/seed/fanta1/600/600" },
  { id: 'd3', name: "Minute Maid 400ml", price: 120, rating: 4.7, category: "Drinks", image: "https://picsum.photos/seed/juice1/600/600" },
  { id: 'd4', name: "Del Monte Mango 1L", price: 220, rating: 4.9, category: "Drinks", image: "https://picsum.photos/seed/mango1/600/600" },
  { id: 'd5', name: "Keringet Water 500ml", price: 50, rating: 4.9, category: "Drinks", image: "https://picsum.photos/seed/water1/600/600" },
  { id: 'd6', name: "Tropical Dispatch", price: 200, rating: 4.8, category: "Drinks", image: "https://picsum.photos/seed/tropical1/600/600" },
];

function DiscoveryContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | 'All'>('All');
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const cat = searchParams?.get('cat');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filteredProducts = ALL_PRODUCTS.filter(p => 
    category === 'All' || p.category === category
  );

  const handleAdd = (e: React.MouseEvent, p: any) => {
    e.preventDefault();
    e.stopPropagation();
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
    <div className="flex flex-col min-h-screen pt-24 bg-white">
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

      <div className="max-w-[1400px] mx-auto px-5 space-y-12 py-12 flex-grow w-full">
        {/* Operating nodes */}
        <section className="space-y-6">
          <h2 className="text-[10px] md:text-sm font-black tracking-[0.2em] uppercase text-muted-foreground">Operating nodes near you</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
            {MOCK_RESTAURANTS.map((brand, i) => (
              <Link key={brand.id + i} href={`/restaurants/${brand.id}`} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-100 p-1 overflow-hidden transition-all duration-500 shadow-lg group-hover:border-red-600">
                  <Image src={brand.imageUrl} alt={brand.name} width={80} height={80} className="object-cover w-full h-full rounded-full" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black">{brand.name.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* HIGH DENSITY GRID */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Marketplace discovery</h2>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600">{filteredProducts.length} items available</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group relative flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-2 left-2 z-20 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-black text-white">{p.rating}</span>
                  </div>

                  {/* Quick Add */}
                  <button 
                    onClick={(e) => handleAdd(e, p)}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl active:scale-90 z-20 hover:bg-red-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 stroke-[3px]" />
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-[13px] font-bold text-gray-800 line-clamp-1 leading-tight uppercase">
                    {p.name}
                  </h3>
                  <p className="text-base font-black text-black">
                    KES {p.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black text-gray-300 uppercase text-[10px] tracking-[0.5em]">SYNCING NODES...</div>}>
        <DiscoveryContent />
      </Suspense>
    </main>
  );
}
