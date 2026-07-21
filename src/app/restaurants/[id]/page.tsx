"use client";

import { use, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS, MOCK_MENU, MenuItem } from "@/lib/food-data";
import { Star, Clock, MapPin, Bike, ArrowLeft, Plus, Minus, ShoppingCart, Utensils, X, Info, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { toast } = useToast();
  const { id } = use(params);
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
  const menuItems = MOCK_MENU.filter(m => m.restaurantId === id || m.restaurantId === 'r1');

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
      title: "Added to cart",
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
  const deliveryFee = restaurant?.deliveryFee || 0;
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0);

  const categories = ["Mains", "Sides", "Drinks"];

  if (!restaurant) return <div className="p-20 text-center font-headline text-2xl">Restaurant not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow">
        {/* Compact Hero */}
        <div className="relative h-[25vh] lg:h-[35vh] overflow-hidden">
          <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 w-full p-6 lg:p-10">
            <div className="container mx-auto">
              <Link href="/restaurants" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white mb-4 text-sm font-bold group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Discovery
              </Link>
              <div className="max-w-4xl">
                <Badge className="mb-2 bg-primary text-white border-none text-[10px] uppercase font-bold">{restaurant.category}</Badge>
                <h1 className="text-3xl lg:text-5xl font-bold font-headline text-white mb-2">{restaurant.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white/80 text-xs font-bold">
                  <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-accent fill-accent" /> {restaurant.rating}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {restaurant.deliveryTime}</div>
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {restaurant.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Menu Sections - High Density */}
            <div className="lg:col-span-8 space-y-8 order-2 lg:order-1">
              <Tabs defaultValue="Mains" className="w-full">
                <div className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm py-2 border-b mb-6 flex items-center justify-between">
                  <TabsList className="bg-muted p-1 h-10 rounded-lg">
                    {categories.map(cat => (
                      <TabsTrigger key={cat} value={cat} className="rounded-md px-4 font-bold text-xs">{cat}</TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {categories.map(cat => (
                  <TabsContent key={cat} value={cat} className="mt-0 outline-none">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {menuItems.filter(item => item.category === cat || (!item.category && cat === 'Mains')).map((item) => (
                        <Card key={item.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow group rounded-xl">
                          <div className="flex h-32">
                            <div className="p-3 flex-grow space-y-1 flex flex-col justify-center">
                              <h3 className="font-bold text-sm text-primary line-clamp-1">{item.name}</h3>
                              <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight h-6">{item.description}</p>
                              <div className="flex items-center justify-between pt-2">
                                <span className="font-bold text-xs text-primary">KES {item.price}</span>
                                <Button size="icon" className="w-8 h-8 rounded-lg bg-primary hover:bg-primary/90" onClick={() => addToCart(item)}>
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="w-28 h-full relative shrink-0 overflow-hidden bg-muted">
                              <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Sticky Cart - Optimized UX */}
            <div className="lg:col-span-4 sticky top-24 space-y-4 order-1 lg:order-2">
              <Card className="border shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-muted/50 py-4 px-6 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2 text-primary">
                      <ShoppingCart className="w-5 h-5" /> Basket
                    </CardTitle>
                    {cart.length > 0 && <Badge className="rounded-full bg-primary text-white text-[10px]">{cart.length}</Badge>}
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  {cart.length === 0 ? (
                    <div className="py-8 text-center space-y-2 opacity-60">
                      <Utensils className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-xs font-bold text-muted-foreground">Select some meat to start</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[35vh] overflow-auto pr-1 no-scrollbar">
                      {cart.map((cartItem) => (
                        <div key={cartItem.item.id} className="flex flex-col gap-1 border-b pb-3 last:border-0 last:pb-0 group">
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-grow">
                              <p className="text-xs font-bold text-primary truncate">{cartItem.item.name}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100" onClick={() => clearCartItem(cartItem.item.id)}>
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 bg-muted rounded-md px-2 py-1">
                              <button onClick={() => removeFromCart(cartItem.item.id)} className="text-primary hover:scale-110"><Minus className="w-3 h-3" /></button>
                              <span className="text-[10px] font-bold min-w-[20px] text-center">{cartItem.quantity}</span>
                              <button onClick={() => addToCart(cartItem.item)} className="text-primary hover:scale-110"><Plus className="w-3 h-3" /></button>
                            </div>
                            <span className="font-bold text-xs">KES {(cartItem.item.price * cartItem.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {subtotal > 0 && (
                    <div className="mt-6 space-y-3 pt-4 border-t border-dashed">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Subtotal</span>
                        <span>KES {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Bike className="w-3 h-3" /> Delivery</span>
                        <span>KES {deliveryFee.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-end pt-1">
                        <div className="space-y-0.5">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total</p>
                          <p className="text-xl font-bold text-primary">KES {total.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link href={`/checkout/${restaurant.id}`} className="w-full">
                    <Button className="w-full h-12 rounded-xl text-sm font-bold shadow-md" disabled={cart.length === 0}>
                      Checkout <ArrowLeft className="w-4 h-4 rotate-180 ml-2" />
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