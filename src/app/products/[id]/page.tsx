
'use client';

import { use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOCK_MENU, MOCK_RESTAURANTS } from "@/lib/food-data";
import { Clock, Store, TrendingUp, CheckCircle2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const item = MOCK_MENU.find(m => m.id === id);
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === item?.restaurantId);
  
  const relatedItems = useMemo(() => {
    if (!item) return [];
    return MOCK_MENU.filter(m => m.category === item.category && m.id !== item.id).slice(0, 4);
  }, [item]);

  if (!item) return <div className="p-20 text-center font-headline text-2xl">Product not found</div>;

  const handleAdd = () => {
    addToCart(item);
    toast({
      title: "Added to basket",
      description: `${item.name} added to your global basket.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="mb-8 flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/restaurants" className="hover:text-primary">Marketplace</Link>
            <span>/</span>
            <span className="text-black">{item.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
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
                </div>
              </div>
            </div>

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
                  {item.description}
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
                  <Button 
                    className="flex-grow h-14 text-[14px] font-black uppercase tracking-widest rounded-none shadow-xl shadow-primary/10"
                    onClick={handleAdd}
                  >
                    Add to Basket
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
