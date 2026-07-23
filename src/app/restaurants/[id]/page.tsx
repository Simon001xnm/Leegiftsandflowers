'use client';

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { Star, Clock, ArrowLeft, ShoppingCart, Utensils, X, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase/client";

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { toast } = useToast();
  const { id } = use(params);
  const { cart, addToCart, removeFromCart, clearItem, subtotal } = useCart();
  const supabase = createClient();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('restaurant_id', id)
        .eq('is_in_stock', true);
      
      if (!error && data) setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, [id, supabase]);

  const deliveryFee = restaurant?.deliveryFee || 100;
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0);
  const categories = Array.from(new Set(products.map(item => item.category || 'Mains')));

  if (!restaurant) return <div className="p-20 text-center font-headline text-2xl uppercase font-black">Vendor not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <div className="relative h-[25vh] lg:h-[35vh] overflow-hidden">
          <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 w-full p-6 lg:p-10">
            <div className="container mx-auto">
              <Link href="/restaurants" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-3 text-[14px] font-black uppercase tracking-widest group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Return to Network
              </Link>
              <div className="max-w-4xl">
                <Badge className="mb-3 bg-primary text-white border-none text-[10px] uppercase font-black tracking-widest rounded-none">{restaurant.category}</Badge>
                <h1 className="text-3xl lg:text-6xl font-black font-headline text-white mb-2 uppercase tracking-tighter">{restaurant.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white/90 text-[14px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2"><Star className="w-4 h-4 text-accent fill-accent" /> {restaurant.rating}</div>
                  <div className="flex items-center gap-2 opacity-60">•</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {restaurant.deliveryTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-8 space-y-16">
              {loading ? (
                <div className="flex items-center justify-center py-20 font-black text-gray-300 uppercase text-[10px]">Syncing Vendor Nodes...</div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center py-20 opacity-20 text-center">
                  <Utensils className="w-12 h-12 mb-4" />
                  <p className="font-black text-[12px] uppercase tracking-widest">No Active Dispatch Items</p>
                </div>
              ) : (
                <Tabs defaultValue={categories[0]} className="w-full">
                  <div className="sticky top-24 md:top-28 z-20 bg-white/95 backdrop-blur-sm py-3 border-b mb-8 flex items-center justify-between no-scrollbar overflow-x-auto">
                    <TabsList className="bg-gray-100 p-1.5 h-11 rounded-none">
                      {categories.map(cat => (
                        <TabsTrigger key={cat} value={cat} className="px-5 font-black text-[14px] uppercase tracking-widest rounded-none data-[state=active]:bg-black data-[state=active]:text-white">
                          {cat}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  
                  {categories.map(cat => (
                    <TabsContent key={cat} value={cat} className="mt-0 outline-none">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-black">
                        {products.filter(item => (item.category || 'Mains') === cat).map((item) => (
                          <Card key={item.id} className="overflow-hidden border-r border-b border-black shadow-none bg-white rounded-none">
                            <div className="flex h-40 md:h-44">
                              <div className="p-4 flex-grow space-y-3 flex flex-col justify-center bg-white">
                                <h3 className="font-black text-[14px] md:text-base text-black uppercase tracking-tighter line-clamp-1">{item.name}</h3>
                                <div className="flex items-center justify-between pt-3 border-t border-dashed gap-2">
                                  <span className="font-black text-[11px] text-black">KES {item.price.toLocaleString()}</span>
                                  <Button 
                                    className="h-10 px-4 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-none hover:bg-primary transition-all shrink-0" 
                                    onClick={() => {
                                      addToCart({
                                        id: item.id,
                                        restaurantId: item.restaurant_id,
                                        name: item.name,
                                        price: item.price,
                                        description: item.description,
                                        imageUrl: item.image_url || '',
                                        category: item.category
                                      });
                                      toast({ title: "READY", description: `${item.name} added.` });
                                    }}
                                  >
                                    ADD
                                  </Button>
                                </div>
                              </div>
                              <div className="relative overflow-hidden bg-gray-100 w-32 md:w-40 h-full shrink-0 border-l border-black">
                                <Image src={item.image_url || `https://picsum.photos/seed/${item.id}/400/400`} alt={item.name} fill className="object-cover" />
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>

            <div className="lg:col-span-4 sticky top-24 lg:top-28 space-y-6">
              <Card className="border-4 border-black shadow-2xl bg-white rounded-none">
                <CardHeader className="bg-gray-50 py-5 px-8 border-b-2 border-black">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[12px] font-black uppercase tracking-widest flex items-center gap-3 text-black">
                      <ShoppingCart className="w-4 h-4" /> Final Selection
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  {cart.length === 0 ? (
                    <div className="py-10 text-center opacity-20">
                      <Utensils className="w-10 h-10 mx-auto mb-3" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Select items to start</p>
                    </div>
                  ) : (
                    <div className="space-y-6 max-h-[40vh] overflow-auto pr-2 no-scrollbar">
                      {cart.map((cartItem) => (
                        <div key={cartItem.item.id} className="flex flex-col gap-2 border-b border-dashed pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start gap-3">
                            <p className="text-[13px] font-black text-black uppercase tracking-tighter truncate flex-grow">{cartItem.item.name}</p>
                            <button onClick={() => clearItem(cartItem.item.id)} className="text-gray-300 hover:text-black">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 bg-gray-100 px-3 py-1.5 border">
                              <button onClick={() => removeFromCart(cartItem.item.id)} className="text-black hover:scale-110"><Minus className="w-3 h-3" /></button>
                              <span className="text-[12px] font-black min-w-[20px] text-center">{cartItem.quantity}</span>
                              <button onClick={() => addToCart(cartItem.item)} className="text-black hover:scale-110"><Plus className="w-3 h-3" /></button>
                            </div>
                            <span className="font-black text-[11px]">KES {(cartItem.item.price * cartItem.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {subtotal > 0 && (
                    <div className="mt-8 space-y-4 pt-6 border-t-2 border-black">
                      <div className="flex justify-between text-[12px] font-bold text-gray-500 uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span>KES {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-end pt-2">
                        <div className="space-y-1">
                          <p className="text-[8px] text-gray-400 uppercase font-black tracking-widest">Gross Total</p>
                          <p className="text-3xl font-black text-black">KES {total.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link href="/checkout" className="w-full">
                    <button className="w-full h-14 bg-black text-white font-black text-[12px] uppercase tracking-widest shadow-xl shadow-primary/10 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50" disabled={cart.length === 0}>
                      CONTINUE TO CHECKOUT
                    </button>
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
