
'use client';

import React, { useState } from "react";
import { Plus, Search, ShoppingBag, Beef, Utensils, Zap, Coffee, Smartphone, ChefHat } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: 'Raw Meat', icon: Beef, label: "Raw Meat" },
  { id: 'Cooked Meat', icon: Utensils, label: "Cooked Meat" },
  { id: 'Grocery', icon: ShoppingBag, label: "Grocery" },
  { id: 'Drinks', icon: Coffee, label: "Drinks" },
  { id: 'Kitchen Appliances', icon: ChefHat, label: "Appliances" },
  { id: 'Phone Accessories', icon: Smartphone, label: "Accessories" },
];

const ALL_PRODUCTS = [
  // RAW MEAT
  { id: 'p4', name: "Premium Beef Takeaway", price: 900, category: "Raw Meat", image: "/BEEF TAKEAWAY.jpg" },
  { id: 'p10', name: "Goat Meat 1kg", price: 1350, category: "Raw Meat", image: "https://picsum.photos/seed/goat1/600/600" },
  { id: 'p11', name: "Farm Chicken (Local)", price: 800, category: "Raw Meat", image: "https://picsum.photos/seed/chickenraw/600/600" },
  { id: 'rm4', name: "Beef Mince 1kg", price: 950, category: "Raw Meat", image: "https://picsum.photos/seed/mince/600/600" },
  // COOKED MEAT
  { id: 'p2', name: "Beef Choma 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF CHOMA.jpg" },
  { id: 'p1', name: "Beef Chemsha 1kg", price: 1400, category: "Cooked Meat", image: "/beef chemsha SMB.jpg" },
  { id: 'p3', name: "Beef Dry Fry 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF DRY FRY.jpg" },
  { id: 'p6', name: "Full Chicken Choma", price: 1000, category: "Cooked Meat", image: "/FULL CHICKEN CHOMA.jpg" },
  { id: 'p24', name: "Mutura Node (Standard)", price: 100, category: "Cooked Meat", image: "/BEEF CHOMA.jpg" },
  // GROCERY
  { id: 'p5', name: "Crispy Chips Portion", price: 200, category: "Grocery", image: "/CHIPS.jpg" },
  { id: 'g2', name: "Fresh Kachumbari", price: 150, category: "Grocery", image: "https://picsum.photos/seed/salad/600/600" },
  { id: 'g3', name: "Local Spinach Bunch", price: 100, category: "Grocery", image: "https://picsum.photos/seed/spinach/600/600" },
  // DRINKS
  { id: 'd1', name: "Coca Cola 500ml", price: 80, category: "Drinks", image: "https://picsum.photos/seed/coke/600/600" },
  { id: 'd14', name: "Fresh Passion Juice", price: 150, category: "Drinks", image: "https://picsum.photos/seed/passion/600/600" },
  { id: 'd8', name: "Keringet Water 500ml", price: 50, category: "Drinks", image: "https://picsum.photos/seed/water1/600/600" },
  // KITCHEN APPLIANCES
  { id: 'ka1', name: "Digital Air Fryer", price: 12500, category: "Kitchen Appliances", image: "https://picsum.photos/seed/airfryer/600/600" },
  { id: 'ka2', name: "Smoothie Blender", price: 8500, category: "Kitchen Appliances", image: "https://picsum.photos/seed/blender/600/600" },
  // PHONE ACCESSORIES
  { id: 'pa1', name: "20,000mAh Power Bank", price: 4500, category: "Phone Accessories", image: "https://picsum.photos/seed/powerbank/600/600" },
  { id: 'pa2', name: "Fast USB-C Charger", price: 2500, category: "Phone Accessories", image: "https://picsum.photos/seed/charger/600/600" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
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
      description: '' 
    });
    toast({ title: "READY", description: `${p.name} added to basket.` });
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    if (id === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 140; // Space for sticky navs
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white pb-24 pt-24 md:pt-32">
      {/* Search & Global Category Bar */}
      <div className="sticky top-20 md:top-24 z-30 bg-white/95 backdrop-blur-xl border-b px-4 py-4 md:py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="relative flex-grow max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  placeholder="Search meat, drinks, or accessories..." 
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 border-none rounded-2xl text-[15px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
             <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 md:mx-0">
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
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 mt-10 space-y-20">
        {CATEGORIES.map((category) => {
          const categoryProducts = ALL_PRODUCTS.filter(p => 
            p.category === category.id && 
            p.name.toLowerCase().includes(search.toLowerCase())
          );

          if (categoryProducts.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="space-y-8 scroll-mt-40">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.3em] text-black flex items-center gap-3">
                  <category.icon className="w-5 h-5 text-primary" /> {category.id} Node
                </h2>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{categoryProducts.length} Items Available</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {categoryProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAdd={() => handleAdd(product)} 
                  />
                ))}
              </div>
            </section>
          );
        })}

        {ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
          <div className="py-40 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-gray-200" />
            </div>
            <p className="text-muted-foreground font-black uppercase text-[11px] tracking-widest">No active nodes found matching your search</p>
            <Button variant="link" onClick={() => setSearch("")} className="text-primary font-black uppercase text-[11px]">Reset Filters</Button>
          </div>
        )}
      </div>
    </main>
  );
}

function CategoryTab({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-6 h-12 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shrink-0 whitespace-nowrap",
        isActive 
          ? "bg-black text-white shadow-xl shadow-black/10" 
          : "bg-gray-50 text-gray-400 hover:text-black"
      )}
    >
      {label}
    </button>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: () => void }) {
  return (
    <Card className="w-full rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer overflow-hidden flex flex-col">
      <div className="aspect-square relative bg-gray-50 overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={product.id === 'p4'}
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="absolute bottom-3 right-3 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all z-20 active:scale-90"
        >
          <Plus className="w-6 h-6 md:w-8 md:h-8 stroke-[3px]" />
        </button>
      </div>
      <div className="p-4 md:p-8 space-y-2 flex-grow flex flex-col justify-between">
        <div className="space-y-1">
          <p className="text-[10px] md:text-[12px] font-black uppercase tracking-tighter line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </p>
          <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase tracking-widest">
            {product.category} Node
          </p>
        </div>
        <p className="text-[15px] md:text-[20px] font-black text-primary pt-2">
          KES {product.price.toLocaleString()}
        </p>
      </div>
    </Card>
  );
}
