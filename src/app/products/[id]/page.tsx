
"use client";

import { use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MOCK_MENU, MOCK_RESTAURANTS, MenuItem } from "@/lib/food-data";
import { ArrowLeft, Clock, ShoppingBag, Store, TrendingUp, Info, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = MOCK_MENU.find(m => m.id === id);
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === item?.restaurantId);
  
  const relatedItems = useMemo(() => {
    if (!item) return [];
    return MOCK_MENU.filter(m => m.category === item.category && m.id !== item.id).slice(0, 4);
  }, [item]);

  if (!item) return <div className="p-20 text-center font-headline text-2xl">Product not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          {/* Breadcrumbs */}
          <div className="mb-8 flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/restaurants" className="hover:text-primary">Marketplace</Link>
            <span>/</span>
            <span className="text-black">{item.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Image Gallery */}
            <div className="lg:col-span-7">
              <div className="relative aspect-square md:aspect-[4/3] bg-gray-50 border overflow-hidden">
                <Image 
                  src={item.imageUrl} 
                  alt={item.name} 
                  fill 
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <Badge className="bg-primary text-white border-none font-black text-[12px] uppercase tracking-widest px-4 py-1 rounded-none">
                    {item.category}
                  </Badge>
                  {item.isPopular && (
                    <Badge className="bg-black text-white border-none font-black text-[12px] uppercase tracking-widest px-4 py-1 rounded-none">
                      Top Seller
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-black font-headline text-primary uppercase tracking-tighter leading-none">
                  {item.name}
                </h1>
                <div className="flex items-center gap-4 text-[14px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 20 Min Delivery</span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5 text-emerald-600"><TrendingUp className="w-4 h-4" /> Freshly Sourced</span>
                </div>
              </div>

              <div className="py-6 border-y border-dashed space-y-2">
                <p className="text-[12px] font-black text-muted-foreground uppercase tracking-[0.2em]">Price per Unit</p>
                <p className="text-4xl font-black text-black">KES {item.price.toLocaleString()}</p>
              </div>

              <div className="space-y-6">
                <p className="text-[14px] font-medium text-gray-600 leading-relaxed">
                  {item.description || "Premium quality meat sourced directly from our verified local farms in Nairobi. Guaranteed freshness and hygiene at every step of the process."}
                </p>

                <div className="bg-gray-50 p-6 space-y-4 border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border flex items-center justify-center text-primary">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Sourced From</p>
                      <Link href={`/restaurants/${restaurant?.id}`} className="text-[14px] font-black text-black hover:text-primary uppercase tracking-tighter transition-colors">
                        {restaurant?.name || "Steak West Butchery"}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link href={`/restaurants/${restaurant?.id}`} className="flex-grow">
                    <Button className="w-full h-14 text-[14px] font-black uppercase tracking-widest rounded-none shadow-xl shadow-primary/10">
                      View full Menu <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <h4 className="text-[12px] font-black text-black uppercase tracking-widest">Standard Guarantees</h4>
                <div className="grid grid-cols-2 gap-3">
                  {["Vacuum Packed", "Farm to Table", "Quick Chilled", "Halal Certified"].map(g => (
                    <div key={g} className="flex items-center gap-2 text-[12px] font-bold text-gray-500 uppercase tracking-tighter">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <section className="mt-24 space-y-8">
              <div className="flex items-center justify-between border-b pb-6">
                <h2 className="text-2xl lg:text-3xl font-black font-headline text-black uppercase tracking-tighter">You might also like</h2>
                <Link href="/restaurants" className="text-[14px] font-black text-primary hover:underline uppercase tracking-widest">Explore Marketplace</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-l border-t">
                {relatedItems.map((related, idx) => (
                  <Link 
                    key={related.id} 
                    href={`/products/${related.id}`}
                    className="group flex flex-col bg-white border-r border-b hover-heartbeat"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <Image src={related.imageUrl} alt={related.name} fill className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-black text-[14px] text-black uppercase tracking-tighter truncate group-hover:text-primary transition-colors">{related.name}</h3>
                      <p className="font-black text-[14px] text-black">KES {related.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
