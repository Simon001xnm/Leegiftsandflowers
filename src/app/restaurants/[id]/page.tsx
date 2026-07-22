
"use client";

import { use, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS, MOCK_MENU, MenuItem } from "@/lib/food-data";
import { Star, Clock, MapPin, Bike, ArrowLeft, Plus, Minus, ShoppingCart, Utensils, X, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

// Custom walking icon for native feel
const WalkingIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="13" cy="4" r="1" />
    <path d="m9 20 3-3.5 1-4.5 -2-2.5 -3 1.5" />
    <path d="m13 12 2 1.5 3-1" />
    <path d="m13 12-4-2.5-1-6" />
    <path d="m9 20-2-3" />
  </svg>
);

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { toast } = useToast();
  const { id } = use(params);
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
  
  // High-density menu items for THIS vendor
  const vendorItems = MOCK_MENU.filter(m => m.restaurantId === id);
  
  // Related items from the same category across the entire marketplace
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

  // Group vendor items by category
  const vendorCategories = Array.from(new Set(vendorItems.map(item => item.category || 'Mains')));

  if (!restaurant) return <div className="p-20 text-center font-headline text-2xl">Vendor not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow">
        {/* Marketplace Header */}
        <div className="relative h-[20vh] lg:h-[30vh] overflow-hidden">
          <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 w-full p-4 lg:p-8">
            <div className="container mx-auto">
              <Link href="/" className="inline-flex items-center gap-1.5 text-white/90 hover:text-white mb-2 text-[10px] font-black uppercase tracking-widest group">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Marketplace
              </Link>
              <div className="max-w-4xl">
                <Badge className="mb-2 bg-primary text-white border-none text-[8px] uppercase font-black tracking-widest">{restaurant.category}</Badge>
                <h1 className="text-2xl lg:text-5xl font-black font-headline text-white mb-1 uppercase tracking-tighter">{restaurant.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-white/90 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1"><Star className="w-3 h-3 text-accent fill-accent" /> {restaurant.rating}</div>
                  <div className="flex items-center gap-1 opacity-60">•</div>
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {restaurant.deliveryTime}</div>
                  <div className="flex items-center gap-1 opacity-60">•</div>
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {restaurant.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-2 md:px-4 py-6 md:py-10">
          <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 items-start">
            
            {/* Menu Sections - High Density Marketplace Feed */}
            <div className="lg:col-span-8 space-y-12">
              <Tabs defaultValue={vendorCategories[0]} className="w-full">
                <div className="sticky top-14 md:top-16 z-20 bg-white/95 backdrop-blur-sm py-2 border-b mb-6 flex items-center justify-between no-scrollbar overflow-x-auto">
                  <TabsList className="bg-gray-100 p-1 h-9 rounded-lg">
                    {vendorCategories.map(cat => (
                      <TabsTrigger key={cat} value={cat} className="rounded-md px-3 font-black text-[10px] uppercase tracking-widest">{cat}</TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {vendorCategories.map(cat => (
                  <TabsContent key={cat} value={cat} className="mt-0 outline-none">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-4">
                      {vendorItems.filter(item => (item.category || 'Mains') === cat).map((item) => (
                        <HighDensityProductCard key={item.id} item={item} onAdd={() => addToCart(item)} />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Related Marketplace Products Section */}
              {relatedItems.length > 0 && (
                <section className="pt-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm md:text-2xl font-black text-black uppercase tracking-tighter">You might also like</h2>
                    <Link href="/restaurants" className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Explore All</Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                    {relatedItems.map((item) => (
                      <HighDensityProductCard key={item.id} item={item} onAdd={() => addToCart(item)} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sticky Basket - High Density POS Style */}
            <div className="lg:col-span-4 sticky top-20 lg:top-24 space-y-4">
              <Card className="border shadow-lg rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-gray-50 py-4 px-6 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-black">
                      <ShoppingCart className="w-4 h-4" /> Basket
                    </CardTitle>
                    {cart.length > 0 && <Badge className="rounded-full bg-primary text-white text-[10px] h-5 w-5 flex items-center justify-center p-0">{cart.length}</Badge>}
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 md:p-6">
                  {cart.length === 0 ? (
                    <div className="py-10 text-center space-y-2">
                      <Utensils className="w-8 h-8 mx-auto text-gray-200" />
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select items to start</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[40vh] overflow-auto pr-1 no-scrollbar">
                      {cart.map((cartItem) => (
                        <div key={cartItem.item.id} className="flex flex-col gap-1 border-b pb-3 last:border-0 last:pb-0 group">
                          <div className="flex justify-between items-start gap-2">
                            <p className="text-[11px] font-black text-black uppercase tracking-tighter truncate flex-grow">{cartItem.item.name}</p>
                            <Button variant="ghost" size="icon" className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100" onClick={() => clearCartItem(cartItem.item.id)}>
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                              <button onClick={() => removeFromCart(cartItem.item.id)} className="text-black hover:scale-110"><Minus className="w-3 h-3" /></button>
                              <span className="text-[10px] font-black min-w-[20px] text-center">{cartItem.quantity}</span>
                              <button onClick={() => addToCart(cartItem.item)} className="text-black hover:scale-110"><Plus className="w-3 h-3" /></button>
                            </div>
                            <span className="font-black text-[11px]">KES {(cartItem.item.price * cartItem.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {subtotal > 0 && (
                    <div className="mt-6 space-y-2 pt-4 border-t border-dashed">
                      <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span>KES {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Bike className="w-3 h-3" /> Delivery</span>
                        <span>KES {deliveryFee.toLocaleString()}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between items-end pt-1">
                        <div className="space-y-0.5">
                          <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Total Bill</p>
                          <p className="text-xl font-black text-black">KES {total.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-4 md:p-6 pt-0">
                  <Link href={`/checkout/${restaurant.id}`} className="w-full">
                    <Button className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/10" disabled={cart.length === 0}>
                      Checkout Order <ArrowLeft className="w-3 h-3 rotate-180 ml-2" />
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

// Specialized High-Density Card for Marketplace Scaling
function HighDensityProductCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  return (
    <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all group rounded-xl">
      <div className="flex h-28 md:h-32">
        <div className="p-2 md:p-3 flex-grow space-y-1 flex flex-col justify-center">
          <div className="flex flex-col">
            <h3 className="font-black text-[10px] md:text-xs text-black uppercase tracking-tighter line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h3>
            {item.isPopular && <span className="text-[8px] font-black text-primary uppercase tracking-widest mb-1">Top Pick</span>}
          </div>
          <p className="text-[8px] md:text-[9px] text-gray-400 line-clamp-2 leading-tight h-5 md:h-6">{item.description}</p>
          <div className="flex items-center justify-between pt-1 md:pt-2">
            <span className="font-black text-[10px] md:text-xs text-black">KES {item.price.toLocaleString()}</span>
            <Button size="icon" className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-black hover:bg-black/90 text-white" onClick={onAdd}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="w-24 md:w-28 h-full relative shrink-0 overflow-hidden bg-gray-100">
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" />
          
          {/* Small branding logo in top left corner of the product image */}
          <div className="absolute top-1 left-1 z-30 w-4 h-4 md:w-6 md:h-6 opacity-80 group-hover:opacity-100 transition-opacity">
            <Image 
              src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
              alt="Steak West" 
              width={24} 
              height={24} 
              className="object-contain"
            />
          </div>

          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <div className="bg-white/90 rounded-full p-1.5 shadow-xl">
                <WalkingIcon className="w-3 h-3 text-black" />
             </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
