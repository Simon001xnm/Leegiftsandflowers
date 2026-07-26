'use client';

import React, { useState, useRef } from "react";
import { 
  Plus, 
  Search, 
  ShoppingBag, 
  Beef, 
  Utensils, 
  Zap, 
  Coffee, 
  Smartphone, 
  ChefHat, 
  Tag, 
  ArrowRight,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/landing/Footer";

const CATEGORIES = [
  { id: 'Raw Meat', icon: Beef, label: "Raw Meat" },
  { id: 'Cooked Meat', icon: Utensils, label: "Cooked Meat" },
  { id: 'Grocery', icon: ShoppingBag, label: "Grocery" },
  { id: 'Drinks', icon: Coffee, label: "Drinks" },
  { id: 'Fine Wood Kitchen', icon: ChefHat, label: "Fine Wood" },
  { id: 'Phone Accessories', icon: Smartphone, label: "Phones" },
];

const ALL_PRODUCTS = [
  // RAW MEAT (Premium HD Nodes)
  { 
    id: 'p-fillet', 
    name: "Beef Fillet", 
    price: 1100, 
    category: "Raw Meat", 
    image: "/beef fillet raw.jpg", 
    hasTax: true 
  },
  { 
    id: 'p-tbone', 
    name: "Beef T-Bone", 
    price: 1000, 
    category: "Raw Meat", 
    image: "/tbone.webp", 
    hasTax: true 
  },
  { 
    id: 'p-cubes', 
    name: "Beef Cubes", 
    price: 1000, 
    category: "Raw Meat", 
    image: "/images (34).jpg", 
    hasTax: true 
  },
  { 
    id: 'p-liver', 
    name: "Liver", 
    price: 1100, 
    category: "Raw Meat", 
    image: "/images (35).jpg", 
    hasTax: true 
  },
  { 
    id: 'p-matumbo', 
    name: "Matumbo", 
    price: 600, 
    category: "Raw Meat", 
    image: "/images (36).jpg"
  },
  { 
    id: 'p-pork', 
    name: "Pork Steak", 
    price: 1000, 
    category: "Raw Meat", 
    image: "/images (37).jpg"
  },
  { 
    id: 'p-kidney', 
    name: "Kidney", 
    price: 1000, 
    category: "Raw Meat", 
    image: "/images (38).jpg",
    hasTax: true
  },
  { 
    id: 'p-osumbuko', 
    name: "Osumbuko", 
    price: 900, 
    category: "Raw Meat", 
    image: "/628cb2abc83cb (1).jpeg",
    hasTax: true
  },
  { 
    id: 'p-beef-on-bone', 
    name: "Beef on Bone", 
    price: 900, 
    category: "Raw Meat", 
    image: "/boneinroundsteaks (1).webp", 
    hasTax: true 
  },
  
  // COOKED MEAT
  { id: 'c-beef-wet-1kg', name: "Beef Wet Fry 1kg", price: 1400, category: "Cooked Meat", image: "/images (41).jpg" },
  { id: 'c-goat-wet-1kg', name: "Goat Wet Fry 1kg", price: 1400, category: "Cooked Meat", image: "/images (43).jpg" },
  { id: 'p2', name: "Beef Choma 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF CHOMA.jpg" },
  { id: 'p1', name: "Beef Chemsha 1kg", price: 750, category: "Cooked Meat", image: "/images (44).jpg" },
  { id: 'p3', name: "Beef dry fry 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF DRY FRY.jpg" },
  { id: 'p6', name: "Full chicken choma", price: 1000, category: "Cooked Meat", image: "/FULL CHICKEN CHOMA.jpg" },
  
  // GROCERY
  { id: 'p5', name: "Crispy Chips", price: 200, category: "Grocery", image: "/CHIPS.jpg" },
  { id: 'g2', name: "Fresh Kachumbari", price: 150, category: "Grocery", image: "https://picsum.photos/seed/salad/600/600" },
  
  // DRINKS
  { id: 'd1', name: "Coca Cola 500ml", price: 80, category: "Drinks", image: "https://picsum.photos/seed/coke/600/600" },
  { id: 'd14', name: "Fresh Passion Juice", price: 150, category: "Drinks", image: "https://picsum.photos/seed/passion/600/600" },

  // FINE WOOD KITCHEN
  { id: 'fw-chopping', name: "Fine Wood Chopping Board", price: 1500, category: "Fine Wood Kitchen", image: "/chopping board.jpg" },
  { id: 'fw-knife', name: "Fine Wood Knife Block", price: 2500, category: "Fine Wood Kitchen", image: "/knife block.jpg" },
  { id: 'fw-bowl', name: "Fine Wood Salad Bowl", price: 1800, category: "Fine Wood Kitchen", image: "/salad bowl.jpg" },
  { id: 'fw-spatula', name: "Fine Wood Spatula Set", price: 1200, category: "Fine Wood Kitchen", image: "/spatula set.jpg" },

  // PHONES & ACCESSORIES
  { id: 'ph-iphone', name: "iPhone 15 Pro", price: 155000, category: "Phone Accessories", image: "/iphone.jpg" },
  { id: 'ph-samsung', name: "Samsung S24", price: 145000, category: "Phone Accessories", image: "/samsung.jpg" },
  { id: 'ph-charger', name: "Fast Charger 20W", price: 2500, category: "Phone Accessories", image: "/charger.jpg" },
  { id: 'ph-earbuds', name: "Pro Earbuds", price: 12000, category: "Phone Accessories", image: "/earbuds.jpg" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAdd = (p: any) => {
    addToCart({ 
      id: p.id, 
      restaurantId: 'r1', 
      name: p.name, 
      price: p.price, 
      imageUrl: p.image, 
      category: p.category,
      description: '',
      hasTax: p.hasTax
    });
    toast({ title: "READY", description: `${p.name} added to basket.` });
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 150 : scrollLeft + 150;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    if (id === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 140; 
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white w-full max-w-[100vw] overflow-x-hidden">
      {/* Promotional Banner Node */}
      <div className="w-full px-2 md:px-6 mb-6 mt-24 md:mt-32">
        <div className="relative w-full h-[140px] md:h-[240px] rounded-[2rem] overflow-hidden bg-black shadow-2xl group cursor-pointer">
          <Image 
            src="https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=2000" 
            alt="Promotional Banner" 
            fill 
            className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
            priority
            data-ai-hint="grilling meat"
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-12 text-left">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-3">
              <Tag className="w-3 h-3" /> Special Offer
            </div>
            <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-2">
              STEAK N BITE
            </h2>
            <p className="text-[10px] md:sm font-bold text-white/70 uppercase tracking-widest flex items-center gap-2">
              Save up to 20% on select raw cuts <ArrowRight className="w-4 h-4 text-primary" />
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Header Node */}
      <div className="sticky top-20 md:top-24 z-30 bg-white/95 backdrop-blur-xl border-b px-4 py-4 md:py-6">
        <div className="w-full max-w-[1600px] lg:max-w-[1400px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="relative flex-grow max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  placeholder="Search network..." 
                  className="w-full h-12 md:h-14 pl-12 pr-4 bg-gray-50 border-none rounded-2xl text-[14px] md:text-[15px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
             
             {/* Category Tab Scroll Node */}
             <div className="relative group">
                <div 
                  ref={scrollRef}
                  className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 md:mx-0 scroll-smooth"
                >
                  <CategoryTab 
                    label="All Dispatches" 
                    isActive={activeTab === 'All'} 
                    onClick={() => scrollToSection('All')} 
                  />
                  {CATEGORIES.map(cat => (
                    <CategoryTab 
                      key={cat.id}
                      label={cat.label} 
                      isActive={activeTab === cat.id} 
                      onClick={() => scrollToSection(cat.id)} 
                    />
                  ))}
                </div>

                {/* Scroll Discover Buttons (Mobile Only) */}
                <button 
                  onClick={() => scrollTabs('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full border shadow-lg md:hidden -ml-2"
                >
                  <ChevronLeft className="w-4 h-4 text-primary" />
                </button>
                <button 
                  onClick={() => scrollTabs('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full border shadow-lg md:hidden -mr-2"
                >
                  <ChevronRight className="w-4 h-4 text-primary" />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Main Marketplace Grid */}
      <div className="w-full max-w-[1600px] lg:max-w-[1400px] mx-auto px-2 md:px-6 mt-6 space-y-10 md:space-y-12 pb-20">
        {CATEGORIES.map((category) => {
          const categoryProducts = ALL_PRODUCTS.filter(p => 
            p.category === category.id && 
            p.name.toLowerCase().includes(search.toLowerCase())
          );

          if (categoryProducts.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="space-y-3 md:space-y-4 scroll-mt-40">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 px-1">
                <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] text-black flex items-center gap-2">
                  <category.icon className="w-3 h-3 md:w-4 md:h-4 text-primary" /> {category.id}
                </h2>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{categoryProducts.length} Items</span>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1.5 md:gap-4 w-full">
                {categoryProducts.map((product) => (
                  <div key={product.id} className="min-w-0" onClick={() => window.location.href = `/products/${product.id}`}>
                    <ProductCard 
                      product={product} 
                      onAdd={(e) => {
                        e.stopPropagation();
                        handleAdd(product);
                      }} 
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Terminal Delivery Node & Footer */}
      <section className="relative min-h-[700px] flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/4eb2df709a9485b9045e3b464e1caef0.jpg" 
            alt="Elite Delivery Dispatch" 
            fill 
            className="object-cover"
            priority
            unoptimized={true}
          />
        </div>
        
        <div className="relative z-10 w-full">
           <Footer />
        </div>
      </section>
    </main>
  );
}

function CategoryTab({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-4 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 whitespace-nowrap",
        isActive 
          ? "bg-black text-white shadow-lg" 
          : "bg-gray-50 text-gray-400 hover:text-black"
      )}
    >
      {label}
    </button>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: (e: React.MouseEvent) => void }) {
  const getSafeUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return url.split('/').map(segment => encodeURIComponent(segment)).join('/');
  };

  const isLocal = !product.image.startsWith('http');
  
  return (
    <Card className="w-full h-full flex flex-col group cursor-pointer overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-lg md:rounded-xl bg-white">
      <div className="aspect-square relative bg-gray-50 overflow-hidden shrink-0">
        <Image 
          src={getSafeUrl(product.image)} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
          sizes="(max-width: 480px) 33vw, (max-width: 1024px) 25vw, 15vw"
          quality={100}
          unoptimized={true}
          priority={isLocal}
        />
        
        <button 
          onClick={onAdd}
          className="absolute bottom-1 right-1 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center text-primary shadow-lg transition-all z-20 active:scale-90"
        >
          <Plus className="w-3.5 h-3.5 md:w-5 md:h-5 stroke-[3px]" />
        </button>
      </div>

      <div className="p-1.5 md:p-2 flex-grow flex flex-col justify-between space-y-1">
        <div className="space-y-0.5">
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-tighter line-clamp-1 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </p>
          <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest truncate">
            {product.category}
          </p>
        </div>
        
        <div className="flex items-center gap-1">
          <p className="text-[11px] md:text-[14px] font-black text-primary">
            {product.price.toLocaleString()}
          </p>
          {product.hasTax && <span className="text-[6px] md:text-[8px] font-black text-gray-300 uppercase tracking-tighter">+ TAX</span>}
        </div>
      </div>
    </Card>
  );
}
