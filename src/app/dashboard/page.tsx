
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

/**
 * MERCHANT POS & INVENTORY DASHBOARD
 * Direct link to Supabase 'products' table.
 */
export default function MerchantDashboard() {
  const { toast } = useToast();
  const supabase = createClient();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [posCart, setPosCart] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setProducts(data);
      } catch (e) {
        console.warn("Supabase POS link deferred");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [supabase]);

  const toggleStock = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ is_in_stock: !currentStatus })
      .eq('id', id);

    if (error) {
      toast({ variant: "destructive", title: "Sync Error", description: error.message });
    } else {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, is_in_stock: !currentStatus } : p));
      toast({ title: "Node Updated", description: "Product availability synced globally." });
    }
  };

  const addToPosCart = (item: any) => {
    if (!item.is_in_stock) return;
    setPosCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const total = posCart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Business Terminal</h1>
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Supabase Connected // Secure Node</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-emerald-100 text-emerald-700 border-none rounded-none px-4 py-2 font-black uppercase tracking-widest text-[9px]">Network Active</Badge>
          <Button variant="outline" className="rounded-none border-2 border-black font-black uppercase text-[10px]" onClick={() => window.location.reload()}>Refresh Feed</Button>
        </div>
      </header>

      <Tabs defaultValue="pos" className="space-y-8">
        <TabsList className="bg-gray-100 p-1 rounded-none h-12">
          <TabsTrigger value="pos" className="rounded-none font-black uppercase text-[11px] px-8 data-[state=active]:bg-black data-[state=active]:text-white">POS Terminal</TabsTrigger>
          <TabsTrigger value="inventory" className="rounded-none font-black uppercase text-[11px] px-8 data-[state=active]:bg-black data-[state=active]:text-white">Inventory Suite</TabsTrigger>
        </TabsList>

        <TabsContent value="pos" className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {products.map(p => (
                <Card 
                  key={p.id} 
                  className={cn(
                    "rounded-none border-2 cursor-pointer hover:border-primary transition-all",
                    !p.is_in_stock && "opacity-40 grayscale pointer-events-none"
                  )}
                  onClick={() => addToPosCart(p)}
                >
                  <div className="aspect-square relative bg-gray-50 border-b-2">
                    {p.image_url ? <img src={p.image_url} alt="" className="object-cover w-full h-full" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><span className="font-black">IMG</span></div>}
                  </div>
                  <div className="p-3">
                    <p className="font-black text-[10px] uppercase truncate">{p.name}</p>
                    <p className="font-black text-primary text-[11px]">KES {p.price}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <Card className="rounded-none border-4 border-black shadow-2xl sticky top-24">
              <CardHeader className="bg-black text-white py-4">
                <CardTitle className="text-[12px] font-black uppercase">Current Bill</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4 max-h-[300px] overflow-auto">
                  {posCart.length === 0 ? <p className="text-center py-10 text-[10px] font-black opacity-20 uppercase">Register Empty</p> : posCart.map(i => (
                    <div key={i.id} className="flex justify-between items-center border-b border-dashed pb-2">
                      <div>
                        <p className="font-black text-[11px] uppercase">{i.name}</p>
                        <p className="text-[9px] font-bold opacity-50">{i.quantity}x @ {i.price}</p>
                      </div>
                      <span className="font-black text-[11px]">KES {i.price * i.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t-2 border-black">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-[8px] font-black text-muted-foreground uppercase">Grand Total</span>
                    <span className="text-3xl font-black text-black">KES {total.toLocaleString()}</span>
                  </div>
                  <Button className="w-full h-14 bg-black text-white font-black uppercase text-[12px] rounded-none" disabled={posCart.length === 0} onClick={() => {setPosCart([]); toast({ title: "Order Processed" })}}>
                    Print & Sync Transaction
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <div className="border-4 border-black overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-b-2 border-black">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase">Item Node</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase">Pricing</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase">Live Status</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase">Lock</th>
                </tr>
              </thead>
              <tbody className="divide-y border-black">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 border" />
                        <span className="font-black text-[12px] uppercase">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-[12px]">KES {p.price}</td>
                    <td className="px-6 py-4">
                       <Badge className={cn("rounded-none text-[8px] font-black uppercase", p.is_in_stock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")}>
                         {p.is_in_stock ? "Online" : "Offline"}
                       </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <Switch checked={p.is_in_stock} onCheckedChange={() => toggleStock(p.id, p.is_in_stock)} className="data-[state=checked]:bg-emerald-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
