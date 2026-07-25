
'use client';

import { useMemo } from "react";
import { 
  History, 
  Heart, 
  Star, 
  Package, 
  ChevronRight, 
  Clock, 
  Zap, 
  Trophy,
  ArrowRight,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MOCK_ORDERS, MOCK_MENU } from "@/lib/food-data";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function OrdersHub() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const activeOrders = useMemo(() => MOCK_ORDERS.filter(o => o.status !== 'Delivered'), []);
  const pastOrders = useMemo(() => MOCK_ORDERS.filter(o => o.status === 'Delivered'), []);
  const favorites = useMemo(() => MOCK_MENU.slice(0, 4), []);
  
  // Mock Loyalty Data
  const points = 1450;
  const nextTier = 2000;
  const tierProgress = (points / nextTier) * 100;

  const handleReorder = (item: any) => {
    addToCart(item);
    toast({ title: "READY", description: `${item.name} added to basket.` });
  };

  return (
    <div className="min-h-screen bg-white pb-24 pt-24">
      <div className="container mx-auto max-w-5xl px-4 space-y-10">
        
        {/* LOYALTY & STATUS NODE */}
        <section>
          <Card className="rounded-[2.5rem] border-none bg-black text-white overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Trophy className="w-32 h-32" />
            </div>
            <CardContent className="p-8 md:p-12 space-y-8 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-current" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Gold Level Partner</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                    {points.toLocaleString()} <span className="text-primary">POINTS</span>
                  </h1>
                </div>
                <Button className="bg-white text-black hover:bg-gray-100 rounded-xl h-12 px-8 font-black text-[11px] uppercase tracking-widest shadow-xl">
                  Redeem Rewards
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                  <span>Progress to Platinum</span>
                  <span>{nextTier - points} points left</span>
                </div>
                <Progress value={tierProgress} className="h-2 bg-white/10" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ACTIVE DISPATCHES */}
        {activeOrders.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> Live Dispatches
              </h2>
            </div>
            <div className="grid gap-4">
              {activeOrders.map(order => (
                <OrderStrip key={order.id} order={order} isActive />
              ))}
            </div>
          </section>
        )}

        {/* DISH COMBO OF THE DAY */}
        <section className="space-y-4">
          <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground">Today's Special Node</h2>
          <Card className="rounded-[2.5rem] border-2 border-primary/20 bg-primary/5 overflow-hidden group hover:border-primary transition-all">
            <div className="flex flex-col md:flex-row h-full">
              <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto">
                <Image 
                  src="/BEEF CHOMA.jpg" 
                  alt="Platter" 
                  fill 
                  className="object-cover transition-transform group-hover:scale-105 duration-700" 
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 font-black text-[10px] uppercase tracking-widest">Limited Combo</div>
              </div>
              <div className="p-8 flex-grow space-y-6 flex flex-col justify-center">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Nairobi West Choma Platter</h3>
                  <p className="text-muted-foreground text-[14px] font-medium leading-tight">1kg Beef Choma + 2 portions Chips + 1L Coca Cola + Free Kachumbari Node.</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-dashed border-primary/20">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Combo Price</p>
                    <p className="text-2xl font-black text-black">KES 2,150</p>
                  </div>
                  <Button className="rounded-xl h-12 px-6 gap-2 font-black text-[11px] uppercase tracking-widest shadow-xl">
                    <Plus className="w-4 h-4" /> Add Combo
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* FAVORITES / REORDER */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" /> Most Ordered
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
            {favorites.map(item => (
              <Card key={item.id} className="min-w-[200px] w-[200px] shrink-0 rounded-3xl border shadow-sm hover:shadow-xl transition-all group cursor-pointer overflow-hidden">
                <div className="aspect-square relative bg-gray-50">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
                  <button 
                    onClick={() => handleReorder(item)}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all"
                  >
                    <Plus className="w-5 h-5 stroke-[3px]" />
                  </button>
                </div>
                <div className="p-4 space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-tighter truncate">{item.name}</p>
                  <p className="text-[14px] font-black text-primary">KES {item.price.toLocaleString()}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* PAST ORDERS */}
        <section className="space-y-4">
          <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            <History className="w-4 h-4" /> Past Dispatches
          </h2>
          <div className="bg-white border rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="divide-y">
              {pastOrders.map(order => (
                <OrderStrip key={order.id} order={order} />
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function OrderStrip({ order, isActive = false }: { order: any, isActive?: boolean }) {
  return (
    <div className={cn(
      "p-5 flex items-center justify-between group transition-all cursor-pointer",
      isActive ? "bg-white border rounded-[2rem] hover:shadow-xl" : "hover:bg-gray-50"
    )}>
       <div className="flex items-center gap-4">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center text-primary font-black text-xs border",
            isActive ? "bg-primary/5 border-primary/10" : "bg-gray-100 border-transparent"
          )}>
             {order.id.slice(-3)}
          </div>
          <div className="space-y-0.5">
             <p className="text-[14px] font-black uppercase tracking-tighter">{order.id}</p>
             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest line-clamp-1">
               {order.date} • {order.items.join(', ')}
             </p>
             <div className="flex items-center gap-2 pt-1">
                <Badge className={cn(
                  "border-none rounded-md px-1.5 py-0 text-[8px] font-black uppercase tracking-widest",
                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700 animate-pulse'
                )}>
                   {order.status}
                </Badge>
                {isActive && <span className="text-[9px] text-muted-foreground font-bold uppercase">ETA: 12 min</span>}
             </div>
          </div>
       </div>
       <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
             <p className="text-[13px] font-black">KES {order.total.toLocaleString()}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
             <ChevronRight className="w-5 h-5" />
          </div>
       </div>
    </div>
  );
}
