
"use client";

import { use, useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ORDERS, MOCK_RESTAURANTS } from "@/lib/food-data";
import { 
  Bike, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  ChevronLeft, 
  Navigation as NavIcon,
  CheckCircle2,
  Circle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [statusIndex, setStatusIndex] = useState(2); // Mock: "Out for Delivery"
  
  // Find order or use a mock one if ID doesn't match
  const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[1];
  const restaurant = MOCK_RESTAURANTS.find(r => r.name === order.restaurantName) || MOCK_RESTAURANTS[0];

  const statuses = [
    { label: "Confirmed", time: "12:30 PM", done: true },
    { label: "Preparing", time: "12:45 PM", done: true },
    { label: "On the way", time: "Arriving in 12 mins", done: true },
    { label: "Delivered", time: "--", done: false }
  ];

  // Map settings - Mocking a route between restaurant and customer in Nairobi
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(order.deliveryAddress)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 flex-grow max-w-6xl">
        <div className="mb-6">
          <Link href="/dashboard/customer">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
              <ChevronLeft className="w-4 h-4" /> Back to Orders
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tracking Details */}
          <div className="lg:col-span-1 space-y-6">
            <header className="space-y-2">
              <Badge className="bg-emerald-100 text-emerald-700 border-none px-4">Active Delivery</Badge>
              <h1 className="text-3xl font-bold font-headline text-primary">Track Order {order.id}</h1>
              <p className="text-muted-foreground text-sm">Arriving from {order.restaurantName}</p>
            </header>

            <Card className="border-2 border-primary/10 overflow-hidden shadow-lg">
              <CardContent className="p-6 space-y-8">
                {/* Rider Info */}
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full relative overflow-hidden bg-primary/20">
                      <Image 
                        src="https://picsum.photos/seed/rider/100/100" 
                        alt="Rider" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-primary">John Kuria</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Bike className="w-3 h-3" /> Gold Partner
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="rounded-full h-10 w-10 text-primary border-primary/20">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="rounded-full h-10 w-10 text-primary border-primary/20">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="space-y-6 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-muted" />
                  {statuses.map((status, i) => (
                    <div key={status.label} className="flex gap-4 relative z-10">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${status.done ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        {status.done ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                      </div>
                      <div className="flex-grow">
                        <p className={`font-bold text-sm ${status.done ? 'text-primary' : 'text-muted-foreground'}`}>{status.label}</p>
                        <p className="text-[10px] text-muted-foreground">{status.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase">Delivery Address</p>
                      <p className="text-sm font-medium">{order.deliveryAddress}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-full min-h-[500px] border-2 border-primary/10 overflow-hidden shadow-xl rounded-[2.5rem] relative">
              <div className="absolute top-6 left-6 z-10 space-y-2">
                <Badge className="bg-white shadow-xl text-primary border-none px-4 py-2 flex items-center gap-2">
                  <NavIcon className="w-3 h-3 text-primary animate-pulse" />
                  Rider is 1.2km away
                </Badge>
              </div>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={mapEmbedUrl}
                className="w-full h-full grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                title="Order Tracking Map"
              ></iframe>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto">
                <Card className="bg-white/95 backdrop-blur shadow-2xl border-none p-4 rounded-2xl flex items-center gap-6">
                  <div className="flex items-center gap-3 pr-6 border-r">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Estimated Arrival</p>
                      <p className="font-bold text-primary">12:57 PM</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-3">
                     <p className="text-sm font-medium text-muted-foreground">Order: <span className="text-primary font-bold">{order.items.join(', ')}</span></p>
                  </div>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
