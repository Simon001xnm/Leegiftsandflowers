
"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_ORDERS } from "@/lib/food-data";
import { 
  Bike, 
  MapPin, 
  Clock, 
  Phone, 
  ChevronLeft, 
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
  
  const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[1];

  const statuses = [
    { label: "Order Confirmed", time: "12:30 PM", done: true },
    { label: "Preparing Meal", time: "12:45 PM", done: true },
    { label: "Out for Delivery", time: "Arriving in 12 mins", done: true },
    { label: "Delivered", time: "--", done: false }
  ];

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
        <div className="lg:col-span-1 space-y-6">
          <header className="space-y-2">
            <Badge className="bg-primary/10 text-primary border-none px-4 py-1 font-bold text-[14px]">In Transit</Badge>
            <h1 className="text-3xl font-bold font-headline text-primary">Track Order {id}</h1>
          </header>

          <Card className="border-2 border-primary/10 overflow-hidden shadow-xl rounded-[2.5rem] bg-card">
            <CardContent className="p-6 space-y-8">
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
                <Button size="icon" variant="outline" className="rounded-2xl h-11 w-11 text-primary border-primary/20 bg-white">
                  <Phone className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-8 relative px-2">
                <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-muted" />
                {statuses.map((status) => (
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
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full min-h-[550px] border-2 border-primary/10 overflow-hidden shadow-2xl rounded-[3rem] relative">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={mapEmbedUrl}
              className="w-full h-full grayscale-[0.2]"
              title="Order Tracking Map"
            ></iframe>
          </Card>
        </div>
      </div>
    </main>
  );
}
