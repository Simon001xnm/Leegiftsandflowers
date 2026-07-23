"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Users, 
  TrendingUp, 
  Trash2, 
  Plus,
  ShoppingBag,
  ChefHat,
  Receipt,
  Search,
  Printer,
  Calculator,
  CheckCircle2,
  XCircle,
  Loader2,
  Image as ImageIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export default function RestaurantOwnerDashboard() {
  const { toast } = useToast();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [posCart, setPosCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState<any | null>(null);

  // Fetch products from Supabase
  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data) setProducts(data);
      setLoading(false);
    }
    loadData();
  }, [supabase]);

  const stats = [
    { label: "Total Revenue", value: "KES 145,280", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Active Orders", value: "12", icon: ChefHat, color: "text-primary", bg: "bg-primary/5" },
    { label: "Orders Today", value: "48", icon: ShoppingBag, color: "text-accent", bg: "bg-accent/5" },
    { label: "Total Customers", value: "890", icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  const addToPosCart = (item: any) => {
    if (!item.is_in_stock) {
      toast({ variant: "destructive", title: "Out of Stock", description: `${item.name} is currently unavailable.` });
      return;
    }
    setPosCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromPosCart = (id: string) => {
    setPosCart(prev => prev.filter(i => i.id !== id));
  };

  const toggleStock = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ is_in_stock: !currentStatus })
      .eq('id', id);

    if (error) {
      toast({ variant: "destructive", title: "Sync Failed", description: "Could not update availability." });
    } else {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, is_in_stock: !currentStatus } : p));
      toast({ title: "Live Sync Active", description: "Inventory status updated globally." });
    }
  };

  const handleCheckout = () => {
    if (posCart.length === 0) return;
    const total = posCart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const newReceipt = {
      orderId: `POS-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString(),
      items: [...posCart],
      total: total
    };
    setReceipt(newReceipt);
    setPosCart([]);
    toast({ title: "Order Processed", description: "Receipt generated. Syncing with ledger..." });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-20 md:pb-0">
      <main className="container mx-auto px-4 py-8 max-w-7xl no-print">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black font-headline text-black uppercase tracking-tighter">Business Terminal</h1>
            <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Supabase Connected // Secure Node</p>
          </div>
          <div className="flex gap-3">
             <Link href="/dashboard/create">
              <Button variant="outline" className="h-10 px-6 rounded-none border-2 border-black font-black text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                <Plus className="w-4 h-4 mr-2" /> New Product
              </Button>
            </Link>
            <Button className="h-10 px-6 rounded-none bg-black text-white font-black text-[11px] uppercase tracking-widest shadow-xl">
              Kitchen Link
            </Button>
          </div>
        </header>

        <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="bg-gray-100 p-1 rounded-none h-12 w-full md:w-auto flex gap-1">
            <TabsTrigger value="overview" className="rounded-none px-6 font-black text-[11px] uppercase tracking-widest data-[state=active]:bg-black data-[state=active]:text-white transition-all">Overview</TabsTrigger>
            <TabsTrigger value="pos" className="rounded-none px-6 font-black text-[11px] uppercase tracking-widest data-[state=active]:bg-black data-[state=active]:text-white transition-all">POS</TabsTrigger>
            <TabsTrigger value="inventory" className="rounded-none px-6 font-black text-[11px] uppercase tracking-widest data-[state=active]:bg-black data-[state=active]:text-white transition-all">Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="rounded-none border-2 border-black shadow-none bg-white p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <stat.icon className="w-12 h-12" />
                  </div>
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <h3 className="text-2xl font-black text-black leading-none">{stat.value}</h3>
                  <div className="mt-4 flex items-center gap-1.5 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                    <TrendingUp className="w-3 h-3" /> +12% Efficiency
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pos" className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Quick search..." className="pl-10 h-12 rounded-none border-2 border-black font-bold" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {products.map((item) => (
                  <Card 
                    key={item.id} 
                    className={cn(
                      "cursor-pointer rounded-none border shadow-none hover:ring-2 hover:ring-black transition-all group",
                      !item.is_in_stock && "opacity-40 grayscale"
                    )}
                    onClick={() => addToPosCart(item)}
                  >
                    <div className="aspect-square relative overflow-hidden bg-gray-50 border-b">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 space-y-1">
                      <h4 className="font-black text-[11px] uppercase tracking-tighter line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] font-bold text-primary">KES {item.price}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <Card className="rounded-none border-4 border-black shadow-2xl sticky top-24">
                <CardHeader className="bg-black text-white py-4">
                  <CardTitle className="text-[12px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Calculator className="w-4 h-4" /> Current Bill
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {posCart.length === 0 ? (
                    <div className="py-10 text-center opacity-20">
                      <ShoppingBag className="w-10 h-10 mx-auto mb-2" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Register Empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[300px] overflow-auto pr-2">
                      {posCart.map(item => (
                        <div key={item.id} className="flex justify-between items-center group">
                          <div className="space-y-0.5">
                            <p className="font-black text-[12px] uppercase tracking-tighter">{item.name}</p>
                            <p className="text-[10px] font-bold text-muted-foreground">{item.quantity}x @ KES {item.price}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-black text-[12px]">KES {item.price * item.quantity}</span>
                            <button onClick={() => removeFromPosCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-6 border-t border-dashed space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="space-y-0.5">
                        <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Grand Total</p>
                        <p className="text-3xl font-black text-black">KES {posCart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toLocaleString()}</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full h-14 rounded-none bg-black text-white font-black text-[12px] uppercase tracking-widest shadow-xl shadow-primary/10 transition-all hover:scale-[1.02] active:scale-95" 
                      disabled={posCart.length === 0}
                      onClick={handleCheckout}
                    >
                      <Receipt className="w-4 h-4 mr-2" /> Print & Sync
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-black font-headline text-black uppercase tracking-tighter">Menu Availability</h2>
              <Badge className="bg-emerald-100 text-emerald-700 border-none rounded-none font-black px-4 py-1.5 uppercase text-[10px] tracking-widest">
                Real-Time Sync Active
              </Badge>
            </div>

            <div className="border-4 border-black bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 border-b-2 border-black">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Item Node</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Pricing</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Live Status</th>
                      <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest">Network Lock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-black">
                    {products.map((item) => (
                      <tr key={item.id} className={cn("hover:bg-gray-50 transition-colors", !item.is_in_stock && "bg-gray-50/50")}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 border relative overflow-hidden shrink-0">
                               {item.image_url ? <img src={item.image_url} alt="" className="object-cover w-full h-full" /> : <ImageIcon className="w-6 h-6 m-3 text-gray-300" />}
                            </div>
                            <div>
                               <p className="font-black text-[13px] uppercase tracking-tighter">{item.name}</p>
                               <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-black text-[13px]">KES {item.price}</td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "border-none rounded-none px-3 py-1 font-black text-[9px] uppercase tracking-widest",
                              item.is_in_stock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                            )}
                          >
                            {item.is_in_stock ? "In Network" : "Offline"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Label htmlFor={`stock-${item.id}`} className="cursor-pointer">
                              {item.is_in_stock ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-300" />}
                            </Label>
                            <Switch 
                              id={`stock-${item.id}`}
                              checked={item.is_in_stock}
                              onCheckedChange={() => toggleStock(item.id, item.is_in_stock)}
                              className="data-[state=checked]:bg-emerald-500"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {receipt && (
        <div id="thermal-receipt" className="print-only font-mono text-black p-4 space-y-4 text-sm w-[80mm] mx-auto bg-white border border-gray-100">
            <div className="text-center space-y-1">
                <h1 className="text-xl font-bold tracking-tighter">STEAK WEST</h1>
                <p className="text-xs">Nairobi, Kenya // SUPABASE_NODE_01</p>
                <p className="text-xs">Tel: +254 700 000000</p>
            </div>
            
            <div className="border-b border-dashed border-black pt-2" />
            
            <div className="flex justify-between">
                <span>TX_ID:</span>
                <span className="font-bold">{receipt.orderId}</span>
            </div>
            <div className="flex justify-between">
                <span>TIMESTAMP:</span>
                <span>{receipt.date}</span>
            </div>

            <div className="border-b border-dashed border-black" />

            <div className="space-y-2">
                {receipt.items.map((item: any, i: number) => (
                    <div key={i} className="flex flex-col">
                        <div className="flex justify-between">
                            <span className="uppercase font-bold">{item.name}</span>
                            <span>{item.price * item.quantity}</span>
                        </div>
                        <span className="text-[10px]">  {item.quantity} x KES {item.price}</span>
                    </div>
                ))}
            </div>

            <div className="border-b border-dashed border-black pt-2" />

            <div className="flex justify-between text-lg font-bold">
                <span>TOTAL:</span>
                <span>KES {receipt.total}</span>
            </div>

            <div className="border-b border-dashed border-black" />

            <div className="text-center pt-4 space-y-1">
                <p className="font-bold uppercase tracking-tighter">SYNCED TO NETWORK</p>
                <p className="text-[9px]">THANK YOU FOR YOUR BUSINESS</p>
            </div>
        </div>
      )}
    </div>
  );
}
