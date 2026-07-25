'use client';

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, ChevronRight, ShoppingBag, Truck, ShieldCheck, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { MobileApp } from "@/components/landing/MobileApp";
import { MOCK_RESTAURANTS, MOCK_MENU } from "@/lib/food-data";

function MarketplaceContent() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Categorize mock data
  const meatProducts = MOCK_MENU.filter(p => p.category !== 'Drinks').slice(0, 8);
  const drinkProducts = [
    { id: 'd1', name: "Coca Cola 500ml", price: 80, category: "Drinks", imageUrl: "https://picsum.photos/seed/cola/600/600" },
    { id: 'd2', name: "Fanta Orange 500ml", price: 80, category: "Drinks", imageUrl: "https://picsum.photos/seed/fanta/600/600" },
    { id: 'd3', name: "Minute Maid 400ml", price: 120, category: "Drinks", imageUrl: "https://picsum.photos/seed/juice/600/600" },
    { id: 'd4', name: "Del Monte Mango 1L", price: 220, category: "Drinks", imageUrl: "https://picsum.photos/seed/mango/600/600" },
  ];

  const handleAdd = (e: React.MouseEvent, p: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: p.id,
      restaurantId: p.restaurantId || 'r1',
      name: p.name,
      price: p.price,
      description: p.description || '',
      imageUrl: p.imageUrl,
      category: p.category
    });
    toast({ title: "ADDED TO BASKET", description: p.name });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* BRAND NODES */}
      <section className="max-w-[1400px] mx-auto px-5 w-full py-12 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-[11px] font-black tracking-[0.2em] uppercase text-muted-foreground">Operating nodes</h2>
          <Link href="/restaurants" className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
            VIEW NETWORK <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
          {MOCK_RESTAURANTS.map((brand, i) => (
            <Link key={brand.id + i} href={`/restaurants/${brand.id}`} className="flex flex-col items-center gap-3 shrink-0 group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gray-100 p-1 overflow-hidden transition-all duration-500 shadow-xl group-hover:border-primary group-hover:scale-105">
                <Image src={brand.imageUrl} alt={brand.name} width={100} height={100} className="object-cover w-full h-full rounded-full" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black">{brand.name.split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ELITE SELECTION (MEAT) */}
      <section className="max-w-[1400px] mx-auto px-5 w-full py-10 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Elite selection</h2>
          <Badge variant="outline" className="rounded-none border-primary text-primary font-black text-[10px] tracking-widest px-3 py-1">
            LOCAL DISPATCH READY
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {meatProducts.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image src={p.imageUrl} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="text-[10px] font-black text-black">4.9</span>
                </div>
                <button onClick={(e) => handleAdd(e, p)} className="absolute bottom-3 right-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 z-20 hover:bg-primary transition-all duration-300">
                  <Plus className="w-5 h-5 stroke-[3px]" />
                </button>
              </div>
              <div className="p-4 space-y-2 bg-white flex-grow">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">{p.category}</p>
                <h3 className="text-[13px] md:text-base font-bold text-gray-900 line-clamp-1 leading-tight">{p.name}</h3>
                <p className="text-base md:text-lg font-black text-black">KES {p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TYPOGRAPHIC SIGNATURE MARQUEE */}
      <div className="bg-black py-16 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
           <h2 className="text-[30px] md:text-[80px] font-black text-white/10 uppercase tracking-tighter px-4">
            STEAK WEST BUTCHERY • PREMIUM CUTS • FAST DISPATCH • HYGIENIC PACKAGING • NAIROBI WEST NODE • STEAK WEST BUTCHERY • 
           </h2>
        </div>
      </div>

      <WhyChooseUs />
      <HowItWorks />

      {/* REFRESHMENT NODE (DRINKS) */}
      <section className="max-w-[1400px] mx-auto px-5 w-full py-20 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Refreshment node</h2>
          <Badge variant="outline" className="rounded-none border-black text-black font-black text-[10px] tracking-widest px-3 py-1">
            CHILLED DISPATCH
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {drinkProducts.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image src={p.imageUrl} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <button onClick={(e) => handleAdd(e, p)} className="absolute bottom-3 right-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 z-20 hover:bg-primary transition-all duration-300">
                  <Plus className="w-5 h-5 stroke-[3px]" />
                </button>
              </div>
              <div className="p-4 space-y-2 bg-white flex-grow">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">DRINKS</p>
                <h3 className="text-[13px] md:text-base font-bold text-gray-900 line-clamp-1 leading-tight">{p.name}</h3>
                <p className="text-base md:text-lg font-black text-black">KES {p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Testimonials />
      <MobileApp />
      <Footer />
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <Suspense fallback={null}>
        <MarketplaceContent />
      </Suspense>
    </main>
  );
}