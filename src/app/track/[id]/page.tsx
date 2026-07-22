
"use client";

import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ORDERS, MOCK_RESTAURANTS } from "@/lib/food-data";
import { 
  Bike, 
  MapPin, 
  Clock, 
  Phone, 
  ChevronLeft, 
  Navigation as NavIcon,
  CheckCircle2,
  Circle,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [statusIndex, setStatusIndex] = useState(2); // Mock: "Out for Delivery"
  
  // Find order or use a mock one if ID doesn't match
  const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[1];
  const restaurant = MOCK_RESTAURANTS.find(r => r.name === order.restaurantName) || MOCK_RESTAURANTS[0];

  const statuses = [
    { label: "Order Confirmed", time: "12:30 PM", done: true },
    { label: "Preparing Meal", time: "12:45 PM", done: true },
    { label: "Out for Delivery", time: "Arriving in 12 mins", done: true },
    { label: "Delivered", time: "--", done: false }
  ];

  // Map settings - Mocking a route between restaurant and customer in Nairobi
  const mapEmbedUrl = `https://maps.google.com/maps?q=-1.265,36.800&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <main className="container mx-auto px-4 py-8 flex-grow max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary rounded-xl" onClick={() => router.back()}>
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center gap-2 text-primary font-bold text-[14px] uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" /> Secure Tracking
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Tracking Details */}
        <div className="lg:col-span-1 space-y-6">
          <header className="space-y-2">
            <Badge className="bg-primary/10 text-primary border-none px-4 py-1 font-bold text-[14px]">In Transit</Badge>
            <h1 className="text-3xl font-bold font-headline text-primary">Track Order {id}</h1>
            <p className="text-muted-foreground text-[14px]">Your rider is heading to your location.</p>
          </header>

          <Card className="border-2 border-primary/10 overflow-hidden shadow-xl rounded-[2.5rem] bg-card">
            <CardContent className="p-6 space-y-8">
              {/* Rider Info */}
              <div className="flex items-center justify-between p-5 bg-primary/5 rounded-[2rem] border border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full relative overflow-hidden bg-primary/20 border-2 border-white shadow-md">
                    <Image 
                      src="https://picsum.photos/seed/rider1/100/100" 
                      alt="Rider" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg leading-tight">John Kuria</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter flex items-center gap-1">
                      <Bike className="w-3 h-3 text-primary" /> Gold Level Partner
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="rounded-2xl h-11 w-11 text-primary border-primary/20 bg-white hover:bg-primary hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-8 relative px-2">
                <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-muted" />
                {statuses.map((status, i) => (
                  <div key={status.label} className="flex gap-6 relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${status.done ? 'bg-primary text-white scale-110' : 'bg-muted text-muted-foreground'}`}>
                      {status.done ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </div>
                    <div className="flex-grow pt-1">
                      <p className={`font-bold text-[14px] ${status.done ? 'text-primary' : 'text-muted-foreground'}`}>{status.label}</p>
                      <p className="text-[10px] font-medium text-muted-foreground opacity-80">{status.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-dashed space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Delivery Address</p>
                    <p className="text-[14px] font-bold text-primary leading-tight">{order.deliveryAddress}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="lg:col-span-2">
          <Card className="h-full min-h-[550px] border-2 border-primary/10 overflow-hidden shadow-2xl rounded-[3rem] relative">
            <div className="absolute top-8 left-8 z-10 space-y-2">
              <Badge className="bg-white/95 backdrop-blur shadow-2xl text-primary border-none px-6 py-3 rounded-2xl flex items-center gap-3 font-bold text-[14px]">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
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
              className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
              title="Order Tracking Map"
            ></iframe>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[92%]">
              <Card className="bg-white/95 backdrop-blur shadow-2xl border-none p-6 rounded-[2rem] flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Estimated Arrival</p>
                    <p className="text-3xl font-bold font-headline text-primary">12:57 PM</p>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end gap-1">
                   <p className="text-[10px] font-bold text-muted-foreground uppercase">Order Contents</p>
                   <p className="text-[14px] font-bold text-primary">{order.items.join(', ')}</p>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
