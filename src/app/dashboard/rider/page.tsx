
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_ORDERS } from "@/lib/food-data";
import { 
  Bike, 
  MapPin, 
  TrendingUp, 
  Star, 
  CircleCheck, 
  Navigation as NavIcon,
  Phone,
  Power
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function RiderDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const activeTask = MOCK_ORDERS.find(o => o.status === 'Out for Delivery');

  const stats = [
    { label: "Today's Earnings", value: "KES 2,450", icon: TrendingUp, color: "text-emerald-500" },
    { label: "Completed", value: "14", icon: CircleCheck, color: "text-primary" },
    { label: "Rating", value: "4.9", icon: Star, color: "text-accent" },
  ];

  const handleOpenNavigation = () => {
    if (!activeTask) return;
    const destination = encodeURIComponent(activeTask.deliveryAddress);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=bicycling`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="container mx-auto px-4 py-12 flex-grow max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold font-headline text-primary mb-2">Courier Center</h1>
            <p className="text-muted-foreground">You are currently {isOnline ? 'Online' : 'Offline'}.</p>
          </div>
          <Card className="p-4 flex items-center gap-4 bg-muted/30 rounded-2xl border-none">
            <div className="flex items-center gap-2">
              <Power className={cn("w-4 h-4", isOnline ? "text-emerald-500" : "text-muted-foreground")} />
              <Label htmlFor="online-status" className="font-bold text-sm">Accepting Orders</Label>
            </div>
            <Switch 
              id="online-status" 
              checked={isOnline} 
              onCheckedChange={setIsOnline} 
            />
          </Card>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm rounded-3xl">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground font-medium mb-2">{stat.label}</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold font-headline text-primary">Active Delivery</h2>
            {activeTask ? (
              <Card className="border-2 border-primary/20 shadow-xl overflow-hidden rounded-[2.5rem]">
                <div className="bg-primary p-6 text-primary-foreground flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Bike className="w-8 h-8" />
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-70">Order ID</p>
                      <h3 className="text-xl font-bold">{activeTask.id}</h3>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-none px-4 py-1">In Transit</Badge>
                </div>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase">Pickup From</p>
                        <p className="font-bold text-lg">{activeTask.restaurantName}</p>
                        <p className="text-sm text-muted-foreground">Koinange St, Nairobi Central</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase">Deliver To</p>
                        <p className="font-bold text-lg">{activeTask.customerName}</p>
                        <p className="text-sm text-muted-foreground">{activeTask.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={handleOpenNavigation}
                      className="flex-grow h-14 rounded-xl gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                    >
                      <NavIcon className="w-5 h-5" /> Open Navigation Map
                    </Button>
                    <Button variant="secondary" size="icon" className="h-14 w-14 rounded-xl">
                      <Phone className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <Button variant="outline" className="w-full h-14 rounded-xl text-emerald-600 hover:bg-emerald-50 border-emerald-200 font-bold">
                    Confirm Delivery Completion
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed border-2 py-20 flex flex-col items-center justify-center text-center rounded-[2.5rem]">
                <Bike className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground font-medium">Waiting for new delivery requests...</p>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-headline text-primary">Daily Log</h2>
            <Card className="rounded-[2rem] overflow-hidden">
              <CardContent className="p-4 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex justify-between items-center py-3 border-b last:border-none">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CircleCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">ORD-09{i}</p>
                        <p className="text-[10px] text-muted-foreground">Completed 12:45 PM</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-primary">+KES 180</p>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:bg-transparent hover:text-primary">
                  View Full History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
