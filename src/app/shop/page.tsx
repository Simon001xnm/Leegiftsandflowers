
'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ALL_PRODUCTS = [
  // MEAT
  { id: 'p1', name: "Beef chemsha 1kg", price: 1400, category: "Meat", image: "/beef chemsha SMB.jpg" },
  { id: 'p2', name: "Beef choma 1kg", price: 1400, category: "Meat", image: "/BEEF CHOMA.jpg" },
  { id: 'p3', name: "Beef dry fry 1kg", price: 1400, category: "Meat", image: "/BEEF DRY FRY.jpg" },
  { id: 'p4', name: "Beef takeaway", price: 900, category: "Meat", image: "/BEEF TAKEAWAY.jpg" },
  { id: 'p6', name: "Full chicken choma", price: 1000, category: "Meat", image: "/FULL CHICKEN CHOMA.jpg" },
  { id: 'p7', name: "Full chicken", price: 700, category: "Meat", image: "/FULL CHICKEN.jpg" },
  { id: 'p8', name: "Full kichwa goat", price: 800, category: "Meat", image: "/FULL KICHWA YA GOAT.jpg" },
  { id: 'p9', name: "Full mguu cow", price: 400, category: "Meat", image: "/FULL MGUU COW.jpg" },
  
  // DRINKS
  { id: 'd1', name: "Coca Cola 500ml", price: 80, category: "Drinks", image: "https://picsum.photos/seed/cola/600/600" },
  { id: 'd2', name: "Fanta Orange 500ml", price: 80, category: "Drinks", image: "https://picsum.photos/seed/fanta/600/600" },
  { id: 'd4', name: "Minute Maid 400ml", price: 120, category: "Drinks", image: "https://picsum.photos/seed/maid/600/600" },
  { id: 'd5', name: "Del Monte Mango 1L", price: 220, category: "Drinks", image: "https://picsum.photos/seed/mango/600/600" },
  { id: 'd8', name: "Keringet Water 500ml", price: 50, category: "Drinks", image: "https://picsum.photos/seed/water1/600/600" },
  { id: 'd14', name: "Fresh passion juice", price: 150, category: "Drinks", image: "https://picsum.photos/seed/passion/600/600" },
];

export default function ShopPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const { toast } = useToast();

  const filtered = ALL_PRODUCTS.filter(p => 
    (activeCat === "All" || p.category === activeCat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAdd = (p: any) => {
    addToCart({ ...p, restaurantId: 'r1', imageUrl: p.image, description: '' });
    toast({ title: "Added", description: p.name });
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-2">
              <h1 className="text-4xl font-medium tracking-tight">Marketplace</h1>
              <p className="text-muted-foreground">Everything you need for the perfect meal.</p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-grow sm:w-64">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <Input 
                   placeholder="Search products..." 
                   className="pl-11 h-12 rounded-xl bg-gray-50 border-none"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                 />
              </div>
              <div className="flex gap-2 bg-gray-50 p-1 rounded-xl">
                 {["All", "Meat", "Drinks"].map(cat => (
                   <button 
                     key={cat}
                     onClick={() => setActiveCat(cat)}
                     className={cn(
                       "px-6 h-10 rounded-lg text-[13px] font-bold transition-all",
                       activeCat === cat ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-black"
                     )}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
           </div>
        </header>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0 border-l border-t border-gray-100">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={() => handleAdd(p)} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center space-y-4">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 text-gray-200" />
             </div>
             <p className="text-muted-foreground font-medium">No products found matching your criteria.</p>
             <Button variant="link" onClick={() => { setSearch(""); setActiveCat("All"); }} className="text-red-600 font-bold">Clear filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd }: any) {
  return (
    <motion.div 
      className="flex flex-col group border-r border-b border-gray-100 bg-white relative z-0 overflow-hidden"
      whileHover={{ 
        scale: [1, 1.04, 1],
        zIndex: 10,
        transition: { 
          repeat: Infinity, 
          duration: 0.8,
          ease: "easeInOut"
        }
      }}
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <button 
          onClick={onAdd}
          className="absolute bottom-2 right-2 w-10 h-10 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-xl hover:bg-red-600 hover:text-white transition-all z-20 group/btn"
        >
          <Plus className="w-6 h-6 text-red-600 group-hover/btn:text-white stroke-[3px]" />
        </button>
      </div>
      <div className="p-4 space-y-1">
        <p className="text-[13px] font-medium text-gray-700 line-clamp-1">{product.name}</p>
        <p className="text-[14px] font-bold text-black">KSh {product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
}
