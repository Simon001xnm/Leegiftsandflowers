'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Heart, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ALL_PRODUCTS = [
  { id: 'p1', name: 'Premium Beef Steak', price: 850, category: 'Beef', rating: 4.9, image: 'https://picsum.photos/seed/steak2/600/800' },
  { id: 'p2', name: 'Goat Meat Choma', price: 750, category: 'Goat', rating: 4.8, image: 'https://picsum.photos/seed/goat2/600/800' },
  { id: 'p3', name: 'Full Chicken Roast', price: 600, category: 'Chicken', rating: 4.7, image: 'https://picsum.photos/seed/chicken2/600/800' },
  { id: 'p4', name: 'Beef Mince Extra', price: 650, category: 'Beef', rating: 4.9, image: 'https://picsum.photos/seed/mince2/600/800' },
  { id: 'p5', name: 'T-Bone Premium', price: 1200, category: 'Beef', rating: 4.9, image: 'https://picsum.photos/seed/tbone/600/800' },
  { id: 'p6', name: 'Mutton Chops', price: 950, category: 'Goat', rating: 4.8, image: 'https://picsum.photos/seed/mutton/600/800' },
  { id: 'p7', name: 'Chicken Wings (1kg)', price: 550, category: 'Chicken', rating: 4.6, image: 'https://picsum.photos/seed/wings/600/800' },
  { id: 'p8', name: 'Beef Sausages', price: 400, category: 'Delicacies', rating: 4.7, image: 'https://picsum.photos/seed/sausage/600/800' },
  { id: 'p9', name: 'Sirloin Cut', price: 1100, category: 'Beef', rating: 4.9, image: 'https://picsum.photos/seed/sirloin/600/800' },
  { id: 'p10', name: 'Pork Chops', price: 800, category: 'Pork', rating: 4.7, image: 'https://picsum.photos/seed/pork/600/800' },
  { id: 'p11', name: 'Full Kichwa Goat', price: 800, category: 'Delicacies', rating: 4.8, image: 'https://picsum.photos/seed/kichwa/600/800' },
  { id: 'p12', name: 'Beef Chemsha', price: 1400, category: 'Cooked', rating: 4.9, image: 'https://picsum.photos/seed/chemsha/600/800' },
  { id: 'p13', name: 'Ribeye Steak', price: 1500, category: 'Beef', rating: 5.0, image: 'https://picsum.photos/seed/ribeye/600/800' },
  { id: 'p14', name: 'Lamb Leg', price: 1300, category: 'Lamb', rating: 4.8, image: 'https://picsum.photos/seed/lamb/600/800' },
  { id: 'p15', name: 'Whole Tilapia', price: 450, category: 'Fish', rating: 4.7, image: 'https://picsum.photos/seed/fish/600/800' },
  { id: 'p16', name: 'Mutura (Signature)', price: 100, category: 'Delicacies', rating: 4.9, image: 'https://picsum.photos/seed/mutura/600/800' },
];

export function Products() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  return (
    <section className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">Premium Selection</h2>
          <Link href="/restaurants" className="text-[10px] font-black text-primary uppercase tracking-[0.3em] hover:opacity-80 flex items-center gap-2">
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
          {ALL_PRODUCTS.map((item) => (
            <div key={item.id} className="group relative flex flex-col space-y-3">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#111] border border-white/5 shadow-2xl transition-all duration-500 hover:border-primary/40">
                <Image src={item.image} alt={item.name} fill className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                
                <div className="absolute top-2 left-2">
                   <Badge className="bg-black/80 backdrop-blur-md text-white border-none font-black text-[7px] md:text-[9px] uppercase px-2 py-0.5 tracking-widest">{item.category}</Badge>
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                   <div className="bg-black/60 backdrop-blur-xl p-1.5 md:p-2 rounded-lg border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                         <Star className="w-2.5 h-2.5 fill-primary text-primary" />
                         <span className="text-[8px] md:text-[10px] font-black text-white">{item.rating}</span>
                      </div>
                      <span className="text-[7px] md:text-[9px] font-black text-white/40 uppercase tracking-widest">Live</span>
                   </div>
                </div>
              </div>
              
              <div className="space-y-1 px-1">
                <h3 className="text-[9px] md:text-[13px] font-black text-white uppercase tracking-tighter truncate group-hover:text-primary transition-colors">{item.name}</h3>
                <p className="text-primary font-black text-[10px] md:text-[16px]">
                   KES {item.price.toLocaleString()}
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
                  toast({ title: "READY", description: `${item.name} added.` });
                }}
                className="w-full h-9 md:h-12 bg-white text-black font-black uppercase text-[8px] md:text-[11px] tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-3 h-3 md:w-4 h-4" /> Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
