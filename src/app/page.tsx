'use client';

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { cn } from "@/lib/utils";
import { Star, Plus, ShoppingCart, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
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
  { id: 'd1', name: "Coca Cola 500ml", price: 80, rating: 4.9, category: "Drinks", image: "/From Klickpin.com- 944418984376291262-pin-id-944418984376291262-story-1.jpg" },
  { id: 'd2', name: "Fanta Orange 500ml", price: 80, rating: 4.8, category: "Drinks", image: "/From Klickpin.com- 599330662967424085-pin-id-599330662967424085.jpg" },
  { id: 'd3', name: "Minute Maid 400ml", price: 120, rating: 4.7, category: "Drinks", image: "/From Klickpin.com- 10836855347433280-pin-id-10836855347433280.jpg" },
  { id: 'd4', name: "Del Monte Mango 1L", price: 220, rating: 4.9, category: "Drinks", image: "/From Klickpin.com- 50524827070351339-pin-id-50524827070351339-story-1.jpg" },
  { id: 'd5', name: "Keringet Water 500ml", price: 50, rating: 4.9, category: "Drinks", image: "/From Klickpin.com- 6966574420736490-pin-id-6966574420736490-story-1.jpg" },
  { id: 'd6', name: "Tropical Dispatch", price: 200, rating: 4.8, category: "Drinks", image: "/From Klickpin.com- 141019032077665218-pin-id-141019032077665218.jpg" },
];

function MarketplaceContent() {
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
    toast({ title: "ADDED TO BASKET", description: p.name });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Category Marquee Strip */}
      <div className="sticky top-24 z-40 bg-white border-b overflow-x-auto no-scrollbar py-3 px-4 shadow-sm">
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
              <span className="text-[11px] md:text-[13px] font-black text-black tracking-widest uppercase">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 w-full py-10 space-y-12">
        {/* Operating Nodes (Brands) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-[10px] md:text-[12px] font-black tracking-[0.3em] uppercase text-muted-foreground">Operating nodes near you</h2>
            <Link href="/restaurants" className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
              VIEW NETWORK <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
            {MOCK_RESTAURANTS.map((brand, i) => (
              <Link key={brand.id + i} href={`/restaurants/${brand.id}`} className="flex flex-col items-center gap-3 shrink-0 group">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-gray-100 p-1 overflow-hidden transition-all duration-500 shadow-xl group-hover:border-red-600 group-hover:scale-105">
                  <Image src={brand.imageUrl} alt={brand.name} width={100} height={100} className="object-cover w-full h-full rounded-full" />
                </div>
                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-black">{brand.name.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* MAIN PRODUCT GRID (2 mobile, 3 tablet, 4 desktop) */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Marketplace discovery</h2>
            <Badge variant="outline" className="rounded-none border-red-600 text-red-600 font-black text-[10px] tracking-widest px-3 py-1">
              {filteredProducts.length} ITEMS READY
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Rating Overlay */}
                  <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-[10px] font-black text-black">{p.rating}</span>
                  </div>

                  {/* High Density Quick Add */}
                  <button 
                    onClick={() => handleAdd(p)}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 z-20 hover:bg-primary transition-all duration-300"
                  >
                    <Plus className="w-5 h-5 stroke-[3px]" />
                  </button>
                </div>

                <div className="p-4 space-y-2 bg-white flex-grow">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">{p.category}</p>
                  <h3 className="text-[13px] md:text-base font-bold text-gray-900 line-clamp-1 leading-tight">
                    {p.name}
                  </h3>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-base md:text-lg font-black text-black">
                      KES {p.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Signature Finewood Marquee */}
      <div className="bg-white border-y py-12">
        <h2 className="text-[12px] md:text-[22px] font-black text-black uppercase tracking-tighter text-center px-6">
          your plug for home appliances, phones and accessories.
        </h2>
      </div>

      <Footer />
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <Suspense fallback={
        <div className="flex-grow flex flex-col items-center justify-center py-40 space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black text-[10px] uppercase tracking-[0.4em] text-gray-400">Synchronizing Meat Network...</p>
        </div>
      }>
        <MarketplaceContent />
      </Suspense>
    </main>
  );
}
