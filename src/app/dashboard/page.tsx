
"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { MOCK_ORDERS, MOCK_MENU } from "@/lib/food-data";
import { 
  Users, 
  TrendingUp, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  Plus,
  ShoppingBag,
  ChefHat,
  Receipt,
  Package,
  CheckCircle2,
  XCircle,
  Search,
  Printer,
  Calculator
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function RestaurantOwnerDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [posCart, setPosCart] = useState<{id: string, name: string, price: number, quantity: number}[]>([]);
  const [inventory, setInventory] = useState(MOCK_MENU.map(item => ({ ...item, inStock: true })));
  const [receipt, setReceipt] = useState<any | null>(null);

  const stats = [
    { label: "Total Revenue", value: "KES 145,280", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Active Orders", value: "12", icon: ChefHat, color: "text-primary", bg: "bg-primary/5" },
    { label: "Orders Today", value: "48", icon: ShoppingBag, color: "text-accent", bg: "bg-accent/5" },
    { label: "Total Customers", value: "890", icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  const addToPosCart = (item: any) => {
    if (!item.inStock) {
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

  const toggleStock = (id: string) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, inStock: !item.inStock } : item));
    const item = inventory.find(i => i.id === id);
    toast({
      title: "Inventory Updated",
      description: `${item?.name} is now ${!item?.inStock ? 'In Stock' : 'Out of Stock'}.`,
    });
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
    toast({ title: "Order Processed", description: "Receipt generated successfully." });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold font-headline text-primary mb-2">Merchant Portal</h1>
            <p className="text-muted-foreground">Manage your kitchen, POS, and inventory from one central hub.</p>
          </div>
          <div className="flex gap-4">
             <Link href="/dashboard/create">
              <Button variant="outline" className="h-12 px-6 rounded-xl gap-2">
                <Plus className="w-5 h-5" /> Add Menu Item
              </Button>
            </Link>
            <Button className="h-12 px-6 rounded-xl gap-2 shadow-lg shadow-primary/20">
              Kitchen View
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 p-1 rounded-2xl h-14 w-full md:w-auto grid grid-cols-2 md:flex md:gap-2">
            <TabsTrigger value="overview" className="rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="pos" className="rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">POS Terminal</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Order Queue</TabsTrigger>
            <TabsTrigger value="inventory" className="rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-12">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.label} className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">+18%</Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-1">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Orders Overview */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-headline text-primary">Recent Activity</h2>
              <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-muted/50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Order ID</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Customer</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {MOCK_ORDERS.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-muted/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                          <td className="px-6 py-4 text-sm font-medium">{order.customerName}</td>
                          <td className="px-6 py-4">
                            <Badge className={cn("border-none", order.status === 'Delivered' ? "bg-emerald-50 text-emerald-700" : "bg-primary/10 text-primary")}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 font-bold">KES {order.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pos" className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search items for manual order entry..." className="pl-10 h-12 rounded-xl" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {inventory.map((item) => (
                  <Card 
                    key={item.id} 
                    className={cn(
                      "cursor-pointer transition-all hover:ring-2 hover:ring-primary/20",
                      !item.inStock && "opacity-50 grayscale"
                    )}
                    onClick={() => addToPosCart(item)}
                  >
                    <CardContent className="p-4 flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-lg relative overflow-hidden bg-muted">
                        <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-sm text-primary">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">KES {item.price}</p>
                      </div>
                      {!item.inStock && <Badge variant="destructive" className="text-[8px] uppercase">Sold Out</Badge>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-primary/10 shadow-xl rounded-2xl">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" /> Current Bill
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {posCart.length === 0 ? (
                    <div className="py-12 text-center space-y-2">
                      <ShoppingBag className="w-8 h-8 text-muted-foreground mx-auto opacity-20" />
                      <p className="text-sm text-muted-foreground">No items added to bill.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {posCart.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <div className="flex gap-2">
                            <span className="font-bold text-primary">{item.quantity}x</span>
                            <span>{item.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold">KES {item.price * item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeFromPosCart(item.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t space-y-2">
                        <div className="flex justify-between text-muted-foreground text-xs uppercase font-bold tracking-widest">
                          <span>Subtotal</span>
                          <span>KES {posCart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-primary">
                          <span>Total</span>
                          <span>KES {posCart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-6 bg-muted/10 border-t">
                  <Button 
                    className="w-full h-12 rounded-xl gap-2 text-lg" 
                    disabled={posCart.length === 0}
                    onClick={handleCheckout}
                  >
                    <Receipt className="w-5 h-5" /> Generate Receipt
                  </Button>
                </CardFooter>
              </Card>

              {receipt && (
                <Card className="border-dashed border-2 bg-accent/5 border-accent animate-in zoom-in-95 duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center border-b pb-4">
                      <h3 className="font-bold text-lg uppercase tracking-tighter">LEE EATS</h3>
                      <p className="text-[10px] text-muted-foreground">OFFICIAL RECEIPT</p>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between"><span>ID:</span> <span>{receipt.orderId}</span></div>
                      <div className="flex justify-between"><span>Date:</span> <span>{receipt.date}</span></div>
                    </div>
                    <div className="space-y-2 py-4 border-y">
                      {receipt.items.map((i: any) => (
                        <div key={i.id} className="flex justify-between text-xs">
                          <span>{i.name} x{i.quantity}</span>
                          <span>KES {i.price * i.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>KES {receipt.total}</span>
                    </div>
                    <Button variant="outline" className="w-full gap-2 text-xs" onClick={() => window.print()}>
                      <Printer className="w-3 h-3" /> Print Receipt
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-headline text-primary">Live Order Queue</h2>
              <Badge className="bg-primary text-white">12 Pending</Badge>
            </div>
            <div className="grid gap-4">
              {MOCK_ORDERS.filter(o => o.status !== 'Delivered').map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <h4 className="font-bold text-primary">{order.id}</h4>
                           <Badge variant="outline" className="text-[10px]">{order.status}</Badge>
                        </div>
                        <p className="text-sm font-medium">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.items.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                      <Button variant="outline" size="sm" className="flex-grow md:flex-grow-0 rounded-full border-primary/20 hover:bg-primary/5">
                        <Receipt className="w-4 h-4 mr-2" /> Print KOT
                      </Button>
                      <Button size="sm" className="flex-grow md:flex-grow-0 rounded-full gap-2">
                        Mark Ready <ChefHat className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-bold font-headline text-primary">Menu Availability</h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Filter menu..." className="pl-10" />
              </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Item Name</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Price</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">Availability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {inventory.map((item) => (
                      <tr key={item.id} className={cn("hover:bg-muted/5 transition-colors", !item.inStock && "bg-muted/20")}>
                        <td className="px-6 py-4 font-bold text-primary flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg relative overflow-hidden shrink-0 border">
                             <img src={item.imageUrl} alt="" className="object-cover w-full h-full" />
                          </div>
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{item.category}</td>
                        <td className="px-6 py-4 text-sm">KES {item.price}</td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "border-none",
                              item.inStock ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                            )}
                          >
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Label htmlFor={`stock-${item.id}`} className="cursor-pointer">
                              {item.inStock ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-400" />}
                            </Label>
                            <Switch 
                              id={`stock-${item.id}`}
                              checked={item.inStock}
                              onCheckedChange={() => toggleStock(item.id)}
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
    </div>
  );
}
