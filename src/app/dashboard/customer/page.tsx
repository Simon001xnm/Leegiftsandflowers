
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_ORDERS, MOCK_RESTAURANTS } from "@/lib/food-data";
import { 
  Package, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight, 
  ShoppingBag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function CustomerDashboard() {
  const activeOrders = MOCK_ORDERS.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const pastOrders = MOCK_ORDERS.filter(o => o.status === 'Delivered');

  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <main className="container mx-auto px-4 py-12 flex-grow max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-none shadow-sm bg-primary text-primary-foreground overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                    AJ
                  </div>
                  <div>
                    <h2 className="text-xl font-medium font-headline">Alex Johnson</h2>
                    <p className="text-primary-foreground/70 text-sm font-medium">Silver member</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-[10px] uppercase font-bold opacity-70 mb-1">Points</p>
                    <p className="text-xl font-bold">1,240</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-[10px] uppercase font-bold opacity-70 mb-1">Wallet</p>
                    <p className="text-xl font-bold">KES 450</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-primary px-2">Favorites</h3>
              <div className="grid gap-3">
                {MOCK_RESTAURANTS.slice(0, 2).map(restaurant => (
                  <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`}>
                    <Card className="hover:shadow-md transition-shadow group border-none shadow-sm bg-white">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg relative overflow-hidden shrink-0">
                          <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm line-clamp-1">{restaurant.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Star className="w-3 h-3 fill-accent text-accent" /> {restaurant.rating}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-medium font-headline text-primary flex items-center gap-2">
                  <Clock className="w-6 h-6" /> Track orders
                </h2>
                <Badge className="bg-accent text-black font-bold border-none">{activeOrders.length} Active</Badge>
              </div>
              
              <div className="grid gap-4">
                {activeOrders.map(order => (
                  <Card key={order.id} className="border-2 border-primary/10 overflow-hidden shadow-none bg-white">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Arriving soon</p>
                          <h3 className="text-xl font-medium text-primary">{order.restaurantName}</h3>
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none px-4 py-1 font-bold">
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-8 mb-6">
                         <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mb-2">
                               <Package className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold text-primary uppercase">Prepared</span>
                         </div>
                         <div className="h-0.5 flex-grow bg-primary/20 rounded-full relative">
                            <div className="absolute top-0 left-0 h-full bg-primary rounded-full w-2/3" />
                         </div>
                         <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-2">
                               <MapPin className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Arrived</span>
                         </div>
                      </div>

                      <div className="pt-4 border-t flex justify-between items-center">
                        <p className="text-sm text-muted-foreground font-medium">{order.items.join(', ')}</p>
                        <Link href={`/track/${order.id}`}>
                          <Button variant="link" className="text-primary font-bold">Open tracking map</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-medium font-headline text-primary">Order history</h2>
              <div className="grid gap-4">
                {pastOrders.map(order => (
                  <Card key={order.id} className="hover:shadow-sm transition-shadow border-none shadow-sm bg-white">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{order.restaurantName}</p>
                          <p className="text-xs text-muted-foreground font-medium">{order.date} • KES {order.total}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full font-bold text-xs">Reorder</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
