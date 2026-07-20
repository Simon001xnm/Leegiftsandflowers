"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ORDERS, MOCK_RESTAURANTS } from "@/lib/food-data";
import { 
  Package, 
  MapPin, 
  Clock, 
  Star, 
  Heart, 
  ChevronRight, 
  Wallet,
  ShoppingBag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function CustomerDashboard() {
  const activeOrders = MOCK_ORDERS.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const pastOrders = MOCK_ORDERS.filter(o => o.status === 'Delivered');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column: Profile & Stats */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-none shadow-sm bg-primary text-primary-foreground overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                    AJ
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-headline">Alex Johnson</h2>
                    <p className="text-primary-foreground/70 text-sm">Silver Member</p>
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
                    <Card className="hover:shadow-md transition-shadow group">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg relative overflow-hidden shrink-0">
                          <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-sm line-clamp-1">{restaurant.name}</h4>
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

          {/* Right Column: Orders */}
          <div className="lg:col-span-2 space-y-10">
            {/* Active Orders */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-2">
                  <Clock className="w-6 h-6" /> Track Orders
                </h2>
                <Badge className="bg-accent text-white">{activeOrders.length} Active</Badge>
              </div>
              
              <div className="grid gap-4">
                {activeOrders.map(order => (
                  <Card key={order.id} className="border-2 border-primary/10 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Arriving Soon</p>
                          <h3 className="text-xl font-bold text-primary">{order.restaurantName}</h3>
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none capitalize px-4 py-1">
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-8 mb-6">
                         <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mb-2">
                               <Package className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold text-primary">Prepared</span>
                         </div>
                         <div className="h-0.5 flex-grow bg-primary/20 rounded-full relative">
                            <div className="absolute top-0 left-0 h-full bg-primary rounded-full w-2/3" />
                         </div>
                         <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-2">
                               <MapPin className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold text-muted-foreground">Arrived</span>
                         </div>
                      </div>

                      <div className="pt-4 border-t flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">{order.items.join(', ')}</p>
                        <Button variant="link" className="text-primary font-bold">Track Map</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Past Orders */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold font-headline text-primary">Order History</h2>
              <div className="grid gap-4">
                {pastOrders.map(order => (
                  <Card key={order.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-primary">{order.restaurantName}</p>
                          <p className="text-xs text-muted-foreground">{order.date} • KES {order.total}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full">Reorder</Button>
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
