
"use client";

import { use, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS, MOCK_MENU, MenuItem } from "@/lib/food-data";
import { Star, Clock, MapPin, Bike, ArrowLeft, Plus, Minus, ShoppingCart, Info, Trash2, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Menu Sections */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold font-headline text-primary">Full Menu</h2>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-primary/5 text-primary border-none">Mains</Badge>
                    <Badge variant="outline">Sides</Badge>
                    <Badge variant="outline">Drinks</Badge>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {menuItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex h-32">
                        <div className="p-4 flex-grow space-y-2">
                          <h3 className="font-bold text-lg text-primary">{item.name}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
                          <div className="flex items-center justify-between pt-1">
                            <span className="font-bold text-primary">KES {item.price}</span>
                            <Button size="icon" className="w-8 h-8 rounded-full" onClick={() => addToCart(item)}>
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="w-32 h-full relative shrink-0">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="bg-secondary/30 rounded-3xl p-8 border border-primary/5">
                <h2 className="text-2xl font-bold font-headline text-primary mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6" /> Restaurant Info
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {restaurant.description} We take pride in sourcing the freshest ingredients from local farmers in Kenya. Our kitchen maintains the highest standards of hygiene and quality.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Bike className="w-5 h-5 text-primary" /> Delivery fee: KES {restaurant.deliveryFee}
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-accent fill-accent" /> Rating: {restaurant.rating} (500+ reviews)
                  </div>
                </div>
              </section>
            </div>

            {/* Sticky Sidebar / Cart Summary */}
            <div className="space-y-6">
              <Card className="sticky top-24 border-2 border-primary/10 shadow-xl overflow-hidden rounded-[2rem]">
                <CardContent className="p-0">
                  <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <ShoppingCart className="w-6 h-6" /> Your Order
                      </h3>
                    </div>
                    
                    {cart.length === 0 ? (
                      <div className="py-10 text-center space-y-4">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                          <Utensils className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground font-medium">Your cart is empty.</p>
                        <p className="text-xs text-muted-foreground px-8">Add items from the menu to start your order.</p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[400px] overflow-auto pr-2 custom-scrollbar">
                        {cart.map((cartItem) => (
                          <div key={cartItem.item.id} className="flex justify-between items-center gap-4">
                            <div className="flex-grow">
                              <p className="text-sm font-bold text-primary">{cartItem.item.name}</p>
                              <p className="text-xs text-muted-foreground">KES {cartItem.item.price}</p>
                            </div>
                            <div className="flex items-center gap-3 bg-muted/50 rounded-full px-2 py-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => removeFromCart(cartItem.item.id)}>
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-bold min-w-[20px] text-center">{cartItem.quantity}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => addToCart(cartItem.item)}>
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => clearCartItem(cartItem.item.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-6 border-t space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-bold">KES {subtotal.toLocaleString()}</span>
                      </div>
                      {subtotal > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Delivery</span>
                          <span className="font-bold">KES {deliveryFee.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xl font-bold text-primary pt-3 border-t">
                        <span>Total</span>
                        <span>KES {total.toLocaleString()}</span>
                      </div>
                    </div>

                    <Link href={`/checkout/${restaurant.id}`} className="block">
                      <Button className="w-full h-14 text-lg rounded-2xl gap-3 shadow-lg shadow-primary/20 mt-4" disabled={cart.length === 0}>
                        Checkout Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
