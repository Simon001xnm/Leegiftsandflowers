'use client';

import { useMemo } from "react";
import { 
  History, 
  Heart, 
  Package, 
  ChevronRight, 
  Clock, 
  Zap, 
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  
  const handleReorder = (item: any) => {
    addToCart(item);
    toast({ title: "READY", description: `${item.name} added to basket.` });
  };

  return (
    <div className="min-h-screen bg-white pb-24 pt-24 md:pt-32">
      <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-10 md:space-y-16">
        
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

        {/* FAVORITES / REORDER */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" /> Most Ordered
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 md:mx-0 md:px-0">
            {favorites.map(item => (
              <Card key={item.id} className="min-w-[160px] md:min-w-[220px] w-[160px] md:w-[220px] shrink-0 rounded-2xl md:rounded-[2rem] border shadow-sm hover:shadow-xl transition-all group cursor-pointer overflow-hidden">
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
            <History className="w-4 h-4" /> Orders
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
       <div className="flex items-center gap-3 md:gap-6 ml-4 shrink-0">
          <div className="text-right hidden xs:block">
             <p className="text-[13px] md:text-[14px] font-black">KES {order.total.toLocaleString()}</p>
          </div>
          <div className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
             <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </div>
       </div>
    </div>
  );
}