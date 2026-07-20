
"use client";

import { use, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS, MOCK_MENU, MenuItem } from "@/lib/food-data";
import { Star, Clock, MapPin, Bike, ArrowLeft, Plus, Minus, ShoppingCart, Info, Trash2, Utensils, X, CreditCard } from "lucide-react";
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
      description: `${item.name} has been added.`,
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
        {/* Hero Section */}
        <div className="relative h-[30vh] lg:h-[40vh] overflow-hidden">
          <Image 
            src={restaurant.imageUrl} 
            alt={restaurant.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
            <div className="container mx-auto">
              <Link href="/restaurants" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Discovery
              </Link>
              <div className="max-w-4xl">
                <Badge className="mb-4 bg-primary text-white border-none px-4 py-1">{restaurant.category}</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold font-headline text-white mb-4">
                  {restaurant.name}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-white text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent fill-accent" />
                    <span className="font-bold">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-white/80" />
                    {restaurant.deliveryTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-white/80" />
                    {restaurant.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Main Grid: Swapped to put Checkout/Cart FIRST */}
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Sidebar / Checkout Summary - NOW ON TOP/LEFT */}
            <div className="space-y-6 lg:order-1 order-1">
              <Card className="border-2 border-primary/10 shadow-xl overflow-hidden rounded-[2.5rem] bg-card">
                <CardHeader className="bg-primary/5 pb-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                      <ShoppingCart className="w-6 h-6" /> Order Summary
                    </CardTitle>
                    {cart.length > 0 && (
                      <Badge variant="secondary" className="rounded-full bg-primary text-white">
                        {cart.reduce((acc, curr) => acc + curr.quantity, 0)} items
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-8 pt-6">
                  {cart.length === 0 ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Utensils className="w-10 h-10 text-muted-foreground/40" />
                      </div>
                      <p className="text-muted-foreground font-bold font-headline text-lg">Your basket is empty</p>
                      <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">Discover delicious items from our menu below to start your order.</p>
                    </div>
                  ) : (
                    <div className="space-y-6 max-h-[40vh] overflow-auto pr-2 no-scrollbar">
                      {cart.map((cartItem) => (
                        <div key={cartItem.item.id} className="flex flex-col gap-2 group animate-in fade-in slide-in-from-right-4 duration-300">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-grow">
                              <p className="text-sm font-bold text-primary leading-none mb-1">{cartItem.item.name}</p>
                              <p className="text-[10px] text-muted-foreground">KES {cartItem.item.price} each</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => clearCartItem(cartItem.item.id)}>
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 bg-muted rounded-full p-1 border">
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-white shadow-sm" onClick={() => removeFromCart(cartItem.item.id)}>
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-xs font-bold min-w-[30px] text-center">{cartItem.quantity}</span>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-white shadow-sm" onClick={() => addToCart(cartItem.item)}>
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="font-bold text-sm">KES {(cartItem.item.price * cartItem.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-bold">KES {subtotal.toLocaleString()}</span>
                    </div>
                    {subtotal > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Bike className="w-4 h-4 text-primary" /> Delivery Fee
                        </span>
                        <span className="font-bold">KES {deliveryFee.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between items-end">
                      <div className="space-y-0.5">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total Amount</p>
                        <p className="text-2xl font-bold text-primary">KES {total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-8 pt-0">
                  <Link href={`/checkout/${restaurant.id}`} className="w-full">
                    <Button 
                      className="w-full h-14 text-lg rounded-2xl gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all" 
                      disabled={cart.length === 0}
                    >
                      Continue to Checkout <ArrowLeft className="w-5 h-5 rotate-180" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Promo / Info Badge */}
              <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-primary text-sm">Safe & Secure Payments</p>
                  <p className="text-xs text-muted-foreground">M-Pesa, Visa, and Mastercard accepted.</p>
                </div>
              </div>
            </div>

            {/* Menu Items / Products - NOW BELOW CHECKOUT ON MOBILE */}
            <div className="lg:col-span-2 space-y-12 lg:order-2 order-2">
              <Tabs defaultValue="Mains" className="w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                  <h2 className="text-3xl font-bold font-headline text-primary">Select Products</h2>
                  <TabsList className="bg-muted p-1 h-12 rounded-xl flex-wrap">
                    {categories.map(cat => (
                      <TabsTrigger key={cat} value={cat} className="rounded-lg px-6 font-bold flex-grow md:flex-grow-0">{cat}</TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {categories.map(cat => (
                  <TabsContent key={cat} value={cat} className="mt-0 outline-none">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {menuItems.filter(item => item.category === cat).map((item) => (
                        <Card key={item.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group rounded-2xl">
                          <div className="flex h-36">
                            <div className="p-4 flex-grow space-y-2 flex flex-col justify-center">
                              <h3 className="font-bold text-lg text-primary line-clamp-1">{item.name}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed h-8">{item.description}</p>
                              <div className="flex items-center justify-between pt-2">
                                <span className="font-bold text-primary">KES {item.price}</span>
                                <Button size="icon" className="w-10 h-10 rounded-xl shadow-lg hover:scale-110 transition-all bg-primary hover:bg-primary/90" onClick={() => addToCart(item)}>
                                  <Plus className="w-5 h-5" />
                                </Button>
                              </div>
                            </div>
                            <div className="w-36 h-full relative shrink-0 overflow-hidden bg-muted">
                              <Image 
                                src={item.imageUrl} 
                                alt={item.name} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-500" 
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                      {menuItems.filter(item => item.category === cat).length === 0 && (
                        <div className="col-span-2 py-16 text-center text-muted-foreground bg-muted/20 rounded-[2rem] border-2 border-dashed">
                          <Utensils className="w-8 h-8 mx-auto mb-2 opacity-20" />
                          <p>No products found in this category.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <section className="bg-secondary/30 rounded-[2.5rem] p-10 border border-primary/5">
                <h2 className="text-2xl font-bold font-headline text-primary mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-primary" /> About {restaurant.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                  {restaurant.description} We take pride in sourcing the freshest ingredients from local farmers in Kenya. Our kitchen maintains the highest standards of hygiene and quality.
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <Bike className="w-6 h-6 text-primary" /> 
                    <div>
                      <p className="font-bold text-primary">Standard Delivery</p>
                      <p className="text-muted-foreground">KES {restaurant.deliveryFee} • {restaurant.deliveryTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
                    <Star className="w-6 h-6 text-accent fill-accent" /> 
                    <div>
                      <p className="font-bold text-primary">Highest Rated</p>
                      <p className="text-muted-foreground">{restaurant.rating} (500+ Local Reviews)</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
