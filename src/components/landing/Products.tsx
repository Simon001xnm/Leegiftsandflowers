
'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Heart, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FALLBACK_PRODUCTS = [
  { id: 'p1', name: 'Premium Beef Steak', price: 850, category: 'Beef', rating: 4.9, image: 'https://picsum.photos/seed/steak2/600/800' },
  { id: 'p2', name: 'Goat Meat', price: 750, category: 'Goat', rating: 4.8, image: 'https://picsum.photos/seed/goat2/600/800' },
  { id: 'p3', name: 'Chicken Full', price: 600, category: 'Chicken', rating: 4.7, image: 'https://picsum.photos/seed/chicken2/600/800' },
  { id: 'p4', name: 'Beef Mince', price: 650, category: 'Beef', rating: 4.9, image: 'https://picsum.photos/seed/mince2/600/800' },
];

export function Products() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-16 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <p className="text-primary font-black text-[11px] uppercase tracking-[0.5em]">The Retail Feed</p>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Our Popular Picks</h2>
          </div>
          <Link href="/restaurants" className="flex items-center gap-3 text-[11px] font-black text-white/40 uppercase tracking-[0.3em] hover:text-primary transition-all group">
            Marketplace Nodes <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {FALLBACK_PRODUCTS.map((item) => (
            <div key={item.id} className="group relative flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-[#111] border border-white/5 shadow-2xl transition-all duration-700 hover:border-primary/20">
                <Image src={item.image} alt={item.name} fill className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" />
                
                <div className="absolute top-6 left-6">
                   <Badge className="bg-black/60 backdrop-blur-md text-white border-none font-black text-[9px] uppercase px-3 py-1 tracking-widest">{item.category}</Badge>
                </div>

                <button className="absolute top-6 right-6 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-all shadow-2xl active:scale-90">
                  <Heart className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                   <div className="bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                         <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                         <span className="text-[11px] font-black text-white">{item.rating}</span>
                      </div>
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Available</span>
                   </div>
                </div>
              </div>
              
              <div className="space-y-2 px-2 text-center">
                <h3 className="text-[16px] font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors">{item.name}</h3>
                <p className="text-primary font-black text-[20px] flex items-center justify-center gap-2">
                   KES {item.price.toLocaleString()} 
                   <span className="text-[10px] text-white/20 uppercase tracking-widest">/ kg</span>
                </p>
              </div>

              <button 
                onClick={() => {
                  addToCart({
                    id: item.id,
                    restaurantId: 'r1',
                    name: item.name,
                    price: item.price,
                    description: '',
                    imageUrl: item.image,
                    category: item.category
                  });
                  toast({ title: "ITEM ADDED", description: `${item.name} is in your basket.` });
                }}
                className="w-full h-14 bg-white text-black font-black uppercase text-[12px] tracking-widest rounded-2xl hover:bg-primary hover:text-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 group/btn overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  <ShoppingCart className="w-4 h-4 animate-heartbeat" /> Add To Cart
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
