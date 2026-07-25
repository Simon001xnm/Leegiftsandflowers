
"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { cn } from "@/lib/utils";
import { Star, Plus, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/landing/Footer";

const CATEGORIES = [
  { label: 'All' },
  { label: 'Raw Meat' },
  { label: 'Cooked Meat' },
  { label: 'Grocery' },
  { label: 'Drinks' },
  { label: 'Kitchen Appliances' },
  { label: 'Phone Accessories' },
];

const ALL_PRODUCTS = [
  // RAW MEAT
  { id: 'p4', name: "Premium Beef Takeaway", price: 900, rating: 4.9, category: "Raw Meat", image: "/BEEF TAKEAWAY.jpg" },
  { id: 'p10', name: "Goat Meat 1kg", price: 1350, rating: 4.8, category: "Raw Meat", image: "https://picsum.photos/seed/goat1/600/600" },
  { id: 'p11', name: "Farm Chicken (Local)", price: 800, rating: 4.7, category: "Raw Meat", image: "https://picsum.photos/seed/chickenraw/600/600" },
  { id: 'rm4', name: "Beef Mince 1kg", price: 950, rating: 4.9, category: "Raw Meat", image: "https://picsum.photos/seed/mince/600/600" },
  
  // COOKED MEAT
  { id: 'p2', name: "Beef Choma 1kg", price: 1400, rating: 4.8, category: "Cooked Meat", image: "/BEEF CHOMA.jpg" },
  { id: 'p1', name: "Beef Chemsha 1kg", price: 1400, rating: 4.9, category: "Cooked Meat", image: "/beef chemsha SMB.jpg" },
  { id: 'p3', name: "Beef Dry Fry 1kg", price: 1400, rating: 4.7, category: "Cooked Meat", image: "/BEEF DRY FRY.jpg" },
  { id: 'p6', name: "Full Chicken Choma", price: 1000, rating: 4.8, category: "Cooked Meat", image: "/FULL CHICKEN CHOMA.jpg" },
  { id: 'p24', name: "Mutura Node (Standard)", price: 100, rating: 4.9, category: "Cooked Meat", image: "/BEEF CHOMA.jpg" },
  
  // GROCERY
  { id: 'p5', name: "Crispy Chips Portion", price: 200, rating: 4.5, category: "Grocery", image: "/CHIPS.jpg" },
  { id: 'g1', name: "Fresh Kachumbari", price: 50, rating: 4.9, category: "Grocery", image: "https://picsum.photos/seed/salad/600/600" },
  { id: 'g2', name: "Ugali Extra", price: 100, rating: 4.6, category: "Grocery", image: "https://picsum.photos/seed/ugali/600/600" },
  { id: 'g3', name: "Fresh Managu", price: 150, rating: 4.7, category: "Grocery", image: "https://picsum.photos/seed/greens/600/600" },

  // DRINKS
  { id: 'd1', name: "Coca Cola 500ml", price: 80, rating: 4.9, category: "Drinks", image: "https://picsum.photos/seed/cola1/600/600" },
  { id: 'd2', name: "Fanta Orange 500ml", price: 80, rating: 4.8, category: "Drinks", image: "https://picsum.photos/seed/fanta1/600/600" },
  { id: 'd4', name: "Del Monte Mango 1L", price: 220, rating: 4.9, category: "Drinks", image: "https://picsum.photos/seed/mango1/600/600" },
  { id: 'd5', name: "Keringet Water 500ml", price: 50, rating: 4.9, category: "Drinks", image: "https://picsum.photos/seed/water1/600/600" },

  // KITCHEN APPLIANCES
  { id: 'ka1', name: "Digital Air Fryer", price: 12500, rating: 4.9, category: "Kitchen Appliances", image: "https://picsum.photos/seed/airfryer/600/600" },
  { id: 'ka2', name: "High Power Blender", price: 6500, rating: 4.7, category: "Kitchen Appliances", image: "https://picsum.photos/seed/blender/600/600" },
  { id: 'ka3', name: "Electric Kettle 1.7L", price: 3200, rating: 4.8, category: "Kitchen Appliances", image: "https://picsum.photos/seed/kettle/600/600" },
  { id: 'ka4', name: "4-Slice Toaster", price: 4500, rating: 4.6, category: "Kitchen Appliances", image: "https://picsum.photos/seed/toaster/600/600" },

  // PHONE ACCESSORIES
  { id: 'pa1', name: "20,000mAh Power Bank", price: 4500, rating: 4.9, category: "Phone Accessories", image: "https://picsum.photos/seed/powerbank/600/600" },
  { id: 'pa2', name: "USB-C Fast Cable", price: 850, rating: 4.8, category: "Phone Accessories", image: "https://picsum.photos/seed/cable/600/600" },
  { id: 'pa3', name: "Wireless Earbuds Pro", price: 3500, rating: 4.7, category: "Phone Accessories", image: "https://picsum.photos/seed/earbuds/600/600" },
  { id: 'pa4', name: "Rugged Phone Case", price: 1200, rating: 4.5, category: "Phone Accessories", image: "https://picsum.photos/seed/case/600/600" },
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
    toast({ title: "READY", description: p.name });
  };

  const sections = useMemo(() => {
    if (category !== 'All') return [];
    return CATEGORIES.filter(c => c.label !== 'All').map(c => ({
      title: c.label,
      products: ALL_PRODUCTS.filter(p => p.category === c.label)
    }));
  }, [category]);

  const filteredProducts = useMemo(() => {
    if (category === 'All') return [];
    return ALL_PRODUCTS.filter(p => p.category === category);
  }, [category]);

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

      <div className="max-w-[1400px] mx-auto px-4 md:px-5 space-y-10 py-10 flex-grow w-full">
        {/* Operating nodes */}
        <section className="space-y-4">
          <h2 className="text-[10px] md:text-sm font-black tracking-[0.2em] uppercase text-muted-foreground">Operating nodes near you</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
            {MOCK_RESTAURANTS.map((brand, i) => (
              <Link key={brand.id + i} href={`/restaurants/${brand.id}`} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-gray-100 p-1 overflow-hidden transition-all duration-500 shadow-lg group-hover:border-red-600">
                  <Image src={brand.imageUrl} alt={brand.name} width={80} height={80} className="object-cover w-full h-full rounded-full" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black">{brand.name.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* HIGH DENSITY CONTENT */}
        <div className="space-y-12 md:space-y-20">
          {category === 'All' ? (
            sections.map((section) => (
              <section key={section.title} className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h2 className="text-lg md:text-3xl font-black uppercase tracking-tighter">{section.title}</h2>
                  <button onClick={() => setCategory(section.title)} className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-1 group">
                    Explore All <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                  {section.products.map((p) => (
                    <ProductCard key={p.id} product={p} onAdd={(e) => handleAdd(e, p)} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <section className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-lg md:text-3xl font-black uppercase tracking-tighter">{category}</h2>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-red-600">{filteredProducts.length} items available</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={(e) => handleAdd(e, p)} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: (e: any) => void }) {
  return (
    <Link href={`/products/${product.id}`} className="group relative flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 z-20 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-lg">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <span className="text-[9px] font-black text-white">{product.rating}</span>
        </div>

        {/* Quick Add */}
        <button 
          onClick={onAdd}
          className="absolute bottom-2 right-2 w-7 h-7 md:w-9 md:h-9 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl active:scale-90 z-20 hover:bg-red-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[3px]" />
        </button>
      </div>

      <div className="p-3 md:p-4 space-y-1.5">
        <h3 className="text-[11px] md:text-[13px] font-bold text-gray-800 line-clamp-2 leading-tight uppercase min-h-[2.5em]">
          {product.name}
        </h3>
        <p className="text-[14px] md:text-base font-black text-black">
          KES {product.price.toLocaleString()}
        </p>
      </div>
    </Link>
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
