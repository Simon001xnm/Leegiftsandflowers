"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS, MOCK_MENU } from "@/lib/food-data";
import { Star, Clock, MapPin, Bike, ArrowLeft, Plus, ShoppingCart, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
  const menuItems = MOCK_MENU.filter(m => m.restaurantId === id || m.restaurantId === 'r1'); // Mixed for mock

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
                            <Button size="icon" className="w-8 h-8 rounded-full">
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
                    
                    <div className="py-10 text-center space-y-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <UtensilsCrossed className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground font-medium">Your cart is empty.</p>
                      <p className="text-xs text-muted-foreground px-8">Add items from the menu to start your order.</p>
                    </div>

                    <div className="pt-6 border-t space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-bold">KES 0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="font-bold">KES {restaurant.deliveryFee}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-primary pt-3 border-t">
                        <span>Total</span>
                        <span>KES {restaurant.deliveryFee}</span>
                      </div>
                    </div>

                    <Button className="w-full h-14 text-lg rounded-2xl gap-3 shadow-lg shadow-primary/20 mt-4" disabled>
                      Checkout
                    </Button>
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

function UtensilsCrossed({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
      <path d="M15 15 2 2" />
      <path d="m9 15 3 3" />
      <path d="M18 17a3 3 0 0 1-3 3H2l8-8" />
    </svg>
  );
}