'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Heart, ChevronRight } from "lucide-react";

const FALLBACK_PRODUCTS = [
  { id: 'p1', name: 'Premium Beef Steak', price: 850, image: 'https://picsum.photos/seed/steak1/400/400' },
  { id: 'p2', name: 'Goat Meat', price: 750, image: 'https://picsum.photos/seed/goat2/400/400' },
  { id: 'p3', name: 'Chicken (Full)', price: 600, image: 'https://picsum.photos/seed/chicken3/400/400' },
  { id: 'p4', name: 'Beef Mince', price: 650, image: 'https://picsum.photos/seed/mince4/400/400' },
];

export function Products() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  return (
    <section className="bg-brand-dark py-24">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <p className="text-primary font-black text-[10px] uppercase tracking-[0.4em]">Best Sellers</p>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">Our Popular Picks</h2>
          </div>
          <Link href="/restaurants" className="flex items-center gap-2 text-[10px] font-black text-white/50 uppercase tracking-[0.2em] hover:text-white transition-all">
            View All Products <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {FALLBACK_PRODUCTS.map((item) => (
            <div key={item.id} className="group relative flex flex-col space-y-4">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 border border-white/5 shadow-2xl transition-all duration-700 hover:border-white/20">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-all shadow-xl">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-1 text-center">
                <h3 className="text-[14px] font-black text-white uppercase tracking-tighter">{item.name}</h3>
                <p className="text-primary font-black text-[16px]">KSh {item.price.toLocaleString()} <span className="text-[10px] text-white/40">/ kg</span></p>
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
                    category: 'Mains'
                  });
                  toast({ title: "READY", description: `${item.name} added to cart.` });
                }}
                className="w-full h-12 bg-white text-black font-black uppercase text-[11px] tracking-widest rounded-full hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}