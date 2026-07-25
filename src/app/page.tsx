'use client';

import React, { useState, useEffect } from "react";
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
  { 
    id: 'p-fillet', 
    name: "Beef Fillet", 
    price: 1100, 
    category: "Raw Meat", 
    image: "/beef fillet raw.jpg", 
    images: ["/beef fillet raw.jpg"],
    hasTax: true 
  },
  { 
    id: 'p-tbone', 
    name: "Beef T-Bone", 
    price: 1000, 
    category: "Raw Meat", 
    image: "/images (28).jpg", 
    images: ["/images (28).jpg"],
    hasTax: true 
  },
  { id: 'p4', name: "Premium Beef Takeaway", price: 900, category: "Raw Meat", image: "/BEEF TAKEAWAY.jpg" },
  { id: 'p10', name: "Goat Meat 1kg", price: 1350, category: "Raw Meat", image: "https://picsum.photos/seed/goat1/600/600" },
  { id: 'p11', name: "Farm Chicken (Local)", price: 800, category: "Raw Meat", image: "https://picsum.photos/seed/chickenraw/600/600" },
  { id: 'rm4', name: "Beef Mince 1kg", price: 950, category: "Raw Meat", image: "https://picsum.photos/seed/mince/600/600" },
  // COOKED MEAT
  { id: 'p2', name: "Beef Choma 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF CHOMA.jpg" },
  { id: 'p1', name: "Beef Chemsha 1kg", price: 1400, category: "Cooked Meat", image: "/beef chemsha SMB.jpg" },
  { id: 'p3', name: "Beef Dry Fry 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF DRY FRY.jpg" },
  { id: 'p6', name: "Full Chicken Choma", price: 1000, category: "Cooked Meat", image: "/FULL CHICKEN CHOMA.jpg" },
  // GROCERY
  { id: 'p5', name: "Crispy Chips Portion", price: 200, category: "Grocery", image: "/CHIPS.jpg" },
  { id: 'g2', name: "Fresh Kachumbari", price: 150, category: "Grocery", image: "https://picsum.photos/seed/salad/600/600" },
  // DRINKS
  { id: 'd1', name: "Coca Cola 500ml", price: 80, category: "Drinks", image: "https://picsum.photos/seed/coke/600/600" },
  { id: 'd14', name: "Fresh Passion Juice", price: 150, category: "Drinks", image: "https://picsum.photos/seed/passion/600/600" },
  // KITCHEN APPLIANCES
  { id: 'ka1', name: "Digital Air Fryer", price: 12500, category: "Kitchen Appliances", image: "https://picsum.photos/seed/airfryer/600/600" },
  // PHONE ACCESSORIES
  { id: 'pa1', name: "20,000mAh Power Bank", price: 4500, category: "Phone Accessories", image: "https://picsum.photos/seed/powerbank/600/600" },
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
      images: p.images,
      category: p.category,
      description: '',
      hasTax: p.hasTax
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
      const offset = 140; 
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white pb-24 pt-24 md:pt-32">
      <div className="sticky top-20 md:top-24 z-30 bg-white/95 backdrop-blur-xl border-b px-4 py-4 md:py-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="relative flex-grow max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  placeholder="Search dispatches..." 
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

      <div className="max-w-[1400px] mx-auto px-2 md:px-6 mt-10 space-y-12">
        {CATEGORIES.map((category) => {
          const categoryProducts = ALL_PRODUCTS.filter(p => 
            p.category === category.id && 
            p.name.toLowerCase().includes(search.toLowerCase())
          );

          if (categoryProducts.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="space-y-6 scroll-mt-40">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] text-black flex items-center gap-2">
                  <category.icon className="w-4 h-4 text-primary" /> {category.id}
                </h2>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{categoryProducts.length} Items</span>
              </div>
              
              <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-4">
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
      </div>
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

function ProductCard({ product, onAdd }: { product: any, onAdd: () => void }) {
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Card className="w-full rounded-xl md:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer overflow-hidden flex flex-col p-1.5 md:p-0">
      <div className="aspect-square relative bg-gray-50 overflow-hidden rounded-lg md:rounded-t-2xl md:rounded-b-none">
        {images.map((img: string, idx: number) => (
          <div 
            key={idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              idx === currentImageIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image 
              src={img} 
              alt={product.name} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
              sizes="(max-width: 768px) 50vw, 25vw"
              quality={100}
              priority={product.id === 'p-fillet' || product.id === 'p-tbone'}
              unoptimized={product.id === 'p-fillet' || product.id === 'p-tbone'}
            />
          </div>
        ))}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-7 h-7 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center text-primary shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all z-20 active:scale-90"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5 stroke-[3px]" />
        </button>
      </div>
      <div className="p-2 md:p-3 space-y-1 flex-grow flex flex-col justify-between">
        <div className="space-y-0.5">
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter line-clamp-1 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </p>
          <p className="text-[7px] md:text-[8px] text-gray-400 font-bold uppercase tracking-widest truncate">
            {product.category}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-[11px] md:text-[13px] font-black text-primary">
            KES {product.price.toLocaleString()}
          </p>
          {product.hasTax && <span className="text-[6px] font-black text-gray-300 uppercase tracking-tighter">+ TAX</span>}
        </div>
      </div>
    </Card>
  );
}
