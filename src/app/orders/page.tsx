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
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MOCK_ORDERS, MOCK_MENU } from "@/lib/food-data";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
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
    <div className="min-h-screen bg-white pb-24 pt-24 md:pt-32">
      <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-10 md:space-y-16">
        
        {/* LOYALTY & STATUS NODE */}
        <section>
          <Card className="rounded-[2rem] md:rounded-[3rem] border-none bg-black text-white overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-5 md:opacity-10 pointer-events-none">
              <Trophy className="w-32 h-32 md:w-48 md:h-48" />
            </div>
            <CardContent className="p-6 md:p-12 space-y-6 md:space-y-10 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center">
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-white fill-current" />
                    </div>
                    <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary">Gold Level Partner</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                    {points.toLocaleString()} <span className="text-primary">POINTS</span>
                  </h1>
                </div>
                <Button className="w-full md:w-auto bg-white text-black hover:bg-gray-100 rounded-xl h-12 md:h-14 px-8 font-black text-[10px] md:text-[11px] uppercase tracking-widest shadow-xl transition-transform active:scale-95">
                  Redeem Rewards
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-60">
                  <span>Progress to Platinum</span>
                  <span>{nextTier - points} points left</span>
                </div>
                <Progress value={tierProgress} className="h-2 md:h-3 bg-white/10" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ACTIVE DISPATCHES */}
        {activeOrders.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] text-black flex items-center gap-2">
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
        <section className="space-y-6">
          <h2 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground">Today's Special Node</h2>
          <Card className="rounded-[2rem] md:rounded-[3rem] border-2 border-primary/20 bg-primary/5 overflow-hidden group hover:border-primary transition-all">
            <div className="flex flex-col md:flex-row min-h-[300px]">
              <div className="relative w-full md:w-[40%] aspect-video md:aspect-auto">
                <Image 
                  src="/BEEF CHOMA.jpg" 
                  alt="Platter" 
                  fill 
                  className="object-cover transition-transform group-hover:scale-105 duration-700" 
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 font-black text-[9px] md:text-[10px] uppercase tracking-widest">Limited Combo</div>
              </div>
              <div className="p-6 md:p-10 flex-grow space-y-6 flex flex-col justify-center">
                <div className="space-y-2 md:space-y-4">
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">Nairobi West Choma Platter</h3>
                  <p className="text-muted-foreground text-[13px] md:text-[15px] font-medium leading-tight md:leading-relaxed max-w-xl">1kg Beef Choma + 2 portions Chips + 1L Coca Cola + Free Kachumbari Node. Dispatched in under 30 minutes.</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-dashed border-primary/20 gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">Combo Price</p>
                    <p className="text-2xl md:text-3xl font-black text-black">KES 2,150</p>
                  </div>
                  <Button className="w-full sm:w-auto rounded-xl h-12 md:h-14 px-8 gap-2 font-black text-[10px] md:text-[11px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                    <Plus className="w-4 h-4 md:w-5 md:h-5 stroke-[3px]" /> Add Combo
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* FAVORITES / REORDER */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" /> Most Ordered
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 md:mx-0 md:px-0">
            {favorites.map(item => (
              <Card key={item.id} className="min-w-[180px] md:min-w-[220px] w-[180px] md:w-[220px] shrink-0 rounded-2xl md:rounded-[2rem] border shadow-sm hover:shadow-xl transition-all group cursor-pointer overflow-hidden">
                <div className="aspect-square relative bg-gray-50">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
                  <button 
                    onClick={() => handleReorder(item)}
                    className="absolute bottom-3 right-3 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all z-20 active:scale-90"
                  >
                    <Plus className="w-5 h-5 md:w-6 md:h-6 stroke-[3px]" />
                  </button>
                </div>
                <div className="p-4 md:p-6 space-y-1">
                  <p className="text-[10px] md:text-[11px] font-black uppercase tracking-tighter truncate">{item.name}</p>
                  <p className="text-[14px] md:text-[16px] font-black text-primary">KES {item.price.toLocaleString()}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* PAST ORDERS */}
        <section className="space-y-6 pb-12">
          <h2 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            <History className="w-4 h-4" /> Past Dispatches
          </h2>
          <div className="bg-white border rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
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
      "p-4 md:p-6 flex items-center justify-between group transition-all cursor-pointer",
      isActive ? "bg-white border rounded-[1.5rem] md:rounded-[2rem] hover:shadow-xl" : "hover:bg-gray-50"
    )}>
       <div className="flex items-center gap-3 md:gap-5 flex-grow min-w-0">
          <div className={cn(
            "w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl shrink-0 flex items-center justify-center text-primary font-black text-[10px] md:text-xs border",
            isActive ? "bg-primary/5 border-primary/10" : "bg-gray-100 border-transparent"
          )}>
             {order.id.slice(-3)}
          </div>
          <div className="space-y-1 min-w-0 flex-grow">
             <p className="text-[13px] md:text-[15px] font-black uppercase tracking-tighter truncate">{order.id}</p>
             <p className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest truncate">
               {order.date} • {order.items.join(', ')}
             </p>
             <div className="flex flex-wrap items-center gap-2 pt-1">
                <Badge className={cn(
                  "border-none rounded-md px-1.5 py-0 text-[7px] md:text-[8px] font-black uppercase tracking-widest whitespace-nowrap",
                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700 animate-pulse'
                )}>
                   {order.status}
                </Badge>
                {isActive && <span className="text-[8px] md:text-[9px] text-muted-foreground font-bold uppercase whitespace-nowrap">ETA: 12 min</span>}
             </div>
          </div>
       </div>
       <div className="flex items-center gap-3 md:gap-6 ml-4">
          <div className="text-right hidden sm:block">
             <p className="text-[13px] md:text-[14px] font-black">KES {order.total.toLocaleString()}</p>
          </div>
          <div className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
             <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </div>
       </div>
    </div>
  );
}
