
"use client";

import { use, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS, MOCK_MENU, MenuItem } from "@/lib/food-data";
import { Star, Clock, MapPin, Bike, ArrowLeft, ShoppingCart, Utensils, X, Minus, Plus, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { toast } = useToast();
  const { id } = use(params);
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
  
  const vendorItems = MOCK_MENU.filter(m => m.restaurantId === id);
  
  const relatedItems = MOCK_MENU.filter(m => 
    m.restaurantId !== id && 
    (m.category === restaurant?.category || restaurant?.category === 'Raw Meat')
  ).slice(0, 8);

  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
    toast({
      title: "Added to basket",
      description: `${item.name} added.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.item.id !== itemId);
    });
  };

  const clearCartItem = (itemId: string) => {
    setCart(prev => prev.filter(i => i.item.id !== itemId));
  };

  const subtotal = useMemo(() => cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0), [cart]);
  const deliveryFee = restaurant?.deliveryFee || 100;
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0);

  const vendorCategories = Array.from(new Set(vendorItems.map(item => item.category || 'Mains')));

  if (!restaurant) return <div className="p-20 text-center font-headline text-2xl">Vendor not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Header Section */}
        <div className="relative h-[25vh] lg:h-[35vh] overflow-hidden">
          <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 w-full p-6 lg:p-10">
            <div className="container mx-auto">
              <Link href="/restaurants" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-3 text-[14px] font-black uppercase tracking-widest group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Pick it up
              </Link>
              <div className="max-w-4xl">
                <Badge className="mb-3 bg-primary text-white border-none text-[10px] uppercase font-black tracking-widest rounded-none">{restaurant.category}</Badge>
                <h1 className="text-3xl lg:text-6xl font-black font-headline text-white mb-2 uppercase tracking-tighter">{restaurant.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white/90 text-[14px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2"><Star className="w-4 h-4 text-accent fill-accent" /> {restaurant.rating}</div>
                  <div className="flex items-center gap-2 opacity-60">•</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {restaurant.deliveryTime}</div>
                  <div className="flex items-center gap-2 opacity-60">•</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {restaurant.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            
            <div className="lg:col-span-8 space-y-16">
              <Tabs defaultValue={vendorCategories[0]} className="w-full">
                <div className="sticky top-24 md:top-28 z-20 bg-white/95 backdrop-blur-sm py-3 border-b mb-8 flex items-center justify-between no-scrollbar overflow-x-auto">
                  <TabsList className="bg-gray-100 p-1.5 h-11 rounded-none">
                    {vendorCategories.map(cat => (
                      <TabsTrigger key={cat} value={cat} className="px-5 font-black text-[14px] uppercase tracking-widest rounded-none">{cat}</TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {vendorCategories.map(cat => (
                  <TabsContent key={cat} value={cat} className="mt-0 outline-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t">
                      {vendorItems.filter(item => (item.category || 'Mains') === cat).map((item) => (
                        <HighDensityProductCard key={item.id} item={item} onAdd={() => addToCart(item)} />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              {relatedItems.length > 0 && (
                <section className="pt-12 space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg md:text-3xl font-black text-black uppercase tracking-tighter">You might also like</h2>
                    <Link href="/restaurants" className="text-[14px] font-black text-primary hover:underline uppercase tracking-widest">Explore All</Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-l border-t">
                    {relatedItems.map((item) => (
                      <HighDensityProductCard key={item.id} item={item} onAdd={() => addToCart(item)} isSmall />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sticky Basket */}
            <div className="lg:col-span-4 sticky top-24 lg:top-28 space-y-6">
              <Card className="border shadow-2xl bg-white rounded-none">
                <CardHeader className="bg-gray-50 py-5 px-8 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3 text-black">
                      <ShoppingCart className="w-5 h-5" /> Your Basket
                    </CardTitle>
                    {cart.length > 0 && <Badge className="bg-primary text-white text-[14px] h-6 w-6 flex items-center justify-center p-0 rounded-none">{cart.length}</Badge>}
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  {cart.length === 0 ? (
                    <div className="py-14 text-center space-y-3">
                      <Utensils className="w-12 h-12 mx-auto text-gray-200" />
                      <p className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Select items to start</p>
                    </div>
                  ) : (
                    <div className="space-y-6 max-h-[50vh] overflow-auto pr-2 no-scrollbar">
                      {cart.map((cartItem) => (
                        <div key={cartItem.item.id} className="flex flex-col gap-2 border-b pb-4 last:border-0 last:pb-0 group">
                          <div className="flex justify-between items-start gap-3">
                            <p className="text-[14px] font-black text-black uppercase tracking-tighter truncate flex-grow">{cartItem.item.name}</p>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 opacity-0 group-hover:opacity-100 rounded-none" onClick={() => clearCartItem(cartItem.item.id)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 bg-gray-100 px-3 py-1.5">
                              <button onClick={() => removeFromCart(cartItem.item.id)} className="text-black hover:scale-110"><Minus className="w-4 h-4" /></button>
                              <span className="text-[14px] font-black min-w-[24px] text-center">{cartItem.quantity}</span>
                              <button onClick={() => addToCart(cartItem.item)} className="text-black hover:scale-110"><Plus className="w-4 h-4" /></button>
                            </div>
                            <span className="font-black text-[14px]">KES {(cartItem.item.price * cartItem.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {subtotal > 0 && (
                    <div className="mt-8 space-y-3 pt-6 border-t border-dashed">
                      <div className="flex justify-between text-[14px] font-bold text-gray-500 uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span>KES {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[14px] font-bold text-gray-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Bike className="w-4 h-4" /> Delivery</span>
                        <span>KES {deliveryFee.toLocaleString()}</span>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-between items-end pt-2">
                        <div className="space-y-1">
                          <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Total Bill</p>
                          <p className="text-3xl font-black text-black">KES {total.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link href={`/checkout/${restaurant.id}`} className="w-full">
                    <Button className="w-full h-14 text-[14px] font-black uppercase tracking-widest shadow-xl shadow-primary/10 rounded-none" disabled={cart.length === 0}>
                      Checkout Order <ArrowLeft className="w-4 h-4 rotate-180 ml-3" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function HighDensityProductCard({ item, onAdd, isSmall }: { item: MenuItem; onAdd: () => void; isSmall?: boolean }) {
  return (
    <Card className={cn(
      "overflow-hidden border-r border-b shadow-none hover-heartbeat bg-white rounded-none",
      isSmall && "flex-col"
    )}>
      <div className={cn("flex h-full", isSmall ? "flex-col h-auto" : "h-40 md:h-48")}>
        {!isSmall && (
          <div className="p-4 flex-grow space-y-3 flex flex-col justify-center bg-white">
            <Link href={`/products/${item.id}`} className="flex flex-col group">
              <h3 className="font-black text-[14px] md:text-base text-black uppercase tracking-tighter line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h3>
              {item.isPopular && <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Top Pick</span>}
            </Link>
            <p className="text-[12px] text-gray-400 line-clamp-2 leading-tight h-8">{item.description}</p>
            <div className="flex items-center justify-between pt-3 border-t gap-2">
              <span className="font-black text-[12px] text-black whitespace-nowrap">KES {item.price.toLocaleString()}</span>
              <Button 
                className="h-10 px-4 bg-black text-white text-[12px] font-black uppercase tracking-widest rounded-none hover:bg-primary transition-all active:scale-95 shrink-0" 
                onClick={onAdd}
              >
                Add
              </Button>
            </div>
          </div>
        )}
        <Link href={`/products/${item.id}`} className={cn("relative overflow-hidden bg-gray-100 block", isSmall ? "aspect-square w-full" : "w-36 md:w-48 h-full shrink-0")}>
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
          
          <div className="absolute top-2 left-2 z-30 w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity">
            <Image 
              src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
              alt="Steak West" 
              width={32} 
              height={32} 
              className="object-contain"
            />
          </div>
        </Link>
        
        {isSmall && (
          <div className="p-4 space-y-3 bg-white">
            <Link href={`/products/${item.id}`}>
              <h3 className="font-black text-[14px] text-black uppercase tracking-tighter line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
            </Link>
            <div className="flex items-center justify-between gap-2 pt-2 border-t">
              <span className="font-black text-[12px] text-black whitespace-nowrap">KES {item.price.toLocaleString()}</span>
              <Button className="h-10 px-4 bg-black text-white text-[12px] font-black uppercase tracking-widest rounded-none hover:bg-primary transition-colors shrink-0" onClick={onAdd}>
                Add
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
