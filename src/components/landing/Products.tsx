
'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { ChevronRight } from "lucide-react";

export function Products() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const supabase = createClient();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_in_stock', true)
          .limit(16);
        
        if (!error && data && data.length > 0) {
          setProducts(data);
        } else {
          // Fallback static data
          setProducts([
            { id: 'p1', name: 'Premium T-Bone', price: 1500, image_url: 'https://picsum.photos/seed/steak1/400/400' },
            { id: 'p2', name: 'Goat Choma', price: 1350, image_url: 'https://picsum.photos/seed/choma2/400/400' },
            { id: 'p3', name: 'Nairobi Mutura', price: 100, image_url: 'https://picsum.photos/seed/mutura3/400/400' },
            { id: 'p4', name: 'Fresh Chicken', price: 700, image_url: 'https://picsum.photos/seed/chicken4/400/400' },
            { id: 'p5', name: 'Beef Chemsha', price: 1400, image_url: 'https://picsum.photos/seed/beef5/400/400' },
            { id: 'p6', name: 'Dry Fry Beef', price: 1400, image_url: 'https://picsum.photos/seed/beef6/400/400' },
            { id: 'p7', name: 'Pork Chops', price: 1200, image_url: 'https://picsum.photos/seed/pork7/400/400' },
            { id: 'p8', name: 'Garden Salad', price: 300, image_url: 'https://picsum.photos/seed/salad8/400/400' },
          ]);
        }
      } catch (e) {
        console.warn("Resilience mode active");
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [supabase]);

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between border-b-2 border-black pb-3">
         <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Daily Dispatch</h2>
         <Link href="/restaurants" className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline flex items-center gap-1">
           View All <ChevronRight className="w-3 h-3" />
         </Link>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-6">
        {loading ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="aspect-square bg-gray-50 animate-pulse border rounded-xl" />
          ))
        ) : products.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 group">
            <Link href={`/products/${item.id}`} className="block">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                <Image 
                  src={item.image_url || `https://picsum.photos/seed/${item.id}/400/400`} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
            </Link>
            <div className="space-y-1 px-1">
              <h3 className="text-[8px] md:text-[12px] font-black truncate uppercase leading-none text-black">{item.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[8px] md:text-[12px] font-bold text-gray-600">KES {item.price}</span>
                <button 
                  onClick={() => {
                    addToCart({
                      id: item.id,
                      restaurantId: item.restaurant_id || 'r1',
                      name: item.name,
                      price: item.price,
                      description: item.description || '',
                      imageUrl: item.image_url || '',
                      category: item.category || 'Mains'
                    });
                    toast({ title: "ADDED", description: `${item.name} in basket.` });
                  }}
                  className="bg-black text-white px-2 py-0.5 rounded-full text-[6px] md:text-[9px] font-black uppercase tracking-widest hover:bg-primary transition-colors active:scale-90"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
