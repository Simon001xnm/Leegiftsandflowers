'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/firebase/auth/use-user";
import { 
  Plus, 
  ShoppingCart, 
  Trash2, 
  Search,
  Bell,
  LogOut,
  Utensils,
  Beef,
  Clock,
  User as UserIcon,
  ChevronLeft,
  Store,
  Printer
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function POSDashboard() {
  const { toast } = useToast();
  const { user: currentUser } = useUser();
  const router = useRouter();
  const supabase = createClient();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [posCart, setPosCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const categories = [
    "All", "MUTTON", "GOAT", "CHICKEN", "FOOD", "BEEF", "SOUP", "MUTURA", 
    "BOILED", "SERVICE", "ULIMI", "CHOMA", "CHEMSHA", "DRY FRY", "LIVER", "WET FRY"
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB', { hour12: false }));
      setCurrentDate(now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });
      
      if (productsData) setProducts(productsData);
    } catch (e) {
      console.warn("Load deferred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [supabase]);

  const addToPosCart = (item: any) => {
    setPosCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setPosCart(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = posCart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const discount = 0;
  const tax = 0;
  const deliveryFee = 0;
  const total = subtotal - discount + tax + deliveryFee;

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category?.toUpperCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogout = async () => {
    localStorage.removeItem('steak_west_demo_user');
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col pt-0">
      {/* Primary Header */}
      <header className="h-16 bg-[#1e293b] flex items-center justify-between px-4 text-white">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-black text-lg tracking-tighter uppercase">
            <Store className="w-6 h-6 text-white" />
            STEAK WEST BUTCHERY
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-[#22c55e] hover:bg-[#16a34a] rounded-md px-4 gap-2 font-bold text-xs uppercase">
              <ShoppingCart className="w-4 h-4" /> Restaurant
            </Button>
            <Button size="sm" className="bg-[#ef4444] hover:bg-[#dc2626] rounded-md px-4 gap-2 font-bold text-xs uppercase shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <Beef className="w-4 h-4" /> Butchery
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1e293b]" />
          </button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleLogout}
            className="bg-[#ef4444] hover:bg-[#dc2626] rounded-md px-4 gap-2 font-bold text-xs uppercase"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </header>

      {/* Secondary Sub-header */}
      <div className="h-14 bg-white border-b px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-md border-gray-200">
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </Button>
          <Button size="sm" className="bg-[#22c55e] hover:bg-[#16a34a] rounded-md px-6 gap-2 font-bold text-xs uppercase">
            <ShoppingCart className="w-4 h-4" /> POS
          </Button>
          <Button size="sm" className="bg-[#f97316] hover:bg-[#ea580c] rounded-md px-6 gap-2 font-bold text-xs uppercase">
            <Utensils className="w-4 h-4" /> Dine-In Checkout
          </Button>
        </div>

        <div className="flex items-center gap-6">
          <Button size="sm" className="bg-[#ef4444] hover:bg-[#dc2626] rounded-md px-8 gap-2 font-bold text-xs uppercase">
            <Beef className="w-4 h-4" /> Butchery
          </Button>
          <div className="flex items-center gap-4 text-gray-500 text-[13px] font-medium">
             <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {currentDate}</div>
             <div className="font-bold text-black">{currentTime}</div>
             <div className="flex items-center gap-1.5"><UserIcon className="w-4 h-4" /> {currentUser?.email?.split('@')[0] || "Operator"}</div>
          </div>
        </div>
      </div>

      {/* Main POS Interface */}
      <main className="flex-grow flex p-4 gap-4 overflow-hidden">
        {/* Left: Inventory Explorer */}
        <div className="flex-grow flex flex-col gap-4 bg-white rounded-xl border p-6 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              placeholder="Search menu items..." 
              className="w-full h-14 pl-12 pr-4 bg-[#f8fafc] border-none rounded-xl text-[15px] focus:ring-2 focus:ring-primary/20 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 py-2">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 h-10 rounded-full border text-[11px] font-bold uppercase tracking-wider transition-all",
                  activeCategory === cat 
                    ? "bg-[#7c3aed] text-white border-[#7c3aed] shadow-lg" 
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex-grow overflow-auto no-scrollbar pt-2">
             {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                   {[1,2,3,4,5,6,7,8,9,10].map(i => (
                     <div key={i} className="aspect-square bg-slate-50 rounded-2xl animate-pulse border" />
                   ))}
                </div>
             ) : filteredProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
                   <Beef className="w-16 h-16 mb-4" />
                   <p className="font-bold text-lg uppercase">No items found</p>
                </div>
             ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredProducts.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => addToPosCart(p)}
                      className="group flex flex-col bg-white border rounded-2xl overflow-hidden transition-all hover:shadow-2xl hover:border-primary active:scale-95"
                    >
                      <div className="aspect-square relative bg-gray-50 border-b">
                         <Image src={p.image_url || `https://picsum.photos/seed/${p.id}/300/300`} alt="" fill className="object-cover" />
                      </div>
                      <div className="p-4 text-left space-y-1">
                         <h4 className="text-[13px] font-bold text-gray-900 leading-tight uppercase line-clamp-1">{p.name}</h4>
                         <p className="text-sm font-black text-[#7c3aed]">KES {p.price.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                </div>
             )}
          </div>
        </div>

        {/* Right: Checkout Console */}
        <div className="w-[450px] flex flex-col bg-white rounded-xl border shadow-xl overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="font-black text-gray-900 flex items-center gap-3">
               <ShoppingCart className="w-5 h-5 text-[#7c3aed]" /> Cart
            </h3>
            <div className="flex gap-2">
               <Badge className="bg-[#7c3aed] text-white rounded-md px-3">{posCart.length}</Badge>
               <button onClick={() => setPosCart([])} className="p-1.5 hover:bg-red-50 text-red-400 rounded-md border border-red-100">
                  <Trash2 className="w-4 h-4" />
               </button>
            </div>
          </div>

          <div className="flex-grow overflow-auto px-6 py-4 space-y-4 no-scrollbar">
            {posCart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-10">
                <ShoppingCart className="w-12 h-12 mb-2" />
                <p className="font-bold text-xs uppercase">Empty basket</p>
              </div>
            ) : posCart.map(item => (
              <div key={item.id} className="flex justify-between items-center group animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                      {item.quantity}x
                   </div>
                   <div>
                      <p className="text-[13px] font-bold text-gray-800 uppercase line-clamp-1">{item.name}</p>
                      <p className="text-[11px] text-gray-500 font-medium">KES {item.price.toLocaleString()}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <p className="text-[13px] font-black text-gray-900">KES {(item.price * item.quantity).toLocaleString()}</p>
                   <button onClick={() => removeFromCart(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-300 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#f8fafc] border-t space-y-6">
            <div className="space-y-2">
               <div className="flex justify-between text-[13px] font-bold text-gray-600">
                  <span>Subtotal</span>
                  <span className="text-black font-black">{subtotal.toLocaleString()}.00</span>
               </div>
               <div className="flex justify-between text-[13px] font-bold text-red-500">
                  <span>Discount</span>
                  <span className="font-black">-{discount.toLocaleString()}.00</span>
               </div>
               <div className="flex justify-between text-[13px] font-bold text-amber-500">
                  <span>Tax</span>
                  <span className="font-black">{tax.toLocaleString()}.00</span>
               </div>
               <div className="flex justify-between text-[13px] font-bold text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-black font-black">{deliveryFee.toLocaleString()}.00</span>
               </div>
            </div>

            <div className="bg-[#7c3aed] text-white p-4 rounded-xl flex items-center justify-between shadow-lg shadow-primary/20">
               <span className="text-lg font-bold">Total</span>
               <span className="text-2xl font-black">{total.toLocaleString()}.00</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Customer</Label>
                  <Input placeholder="Search..." className="h-10 rounded-lg bg-white text-xs" />
               </div>
               <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Discount</Label>
                  <div className="flex">
                    <Input defaultValue="0" className="h-10 rounded-l-lg bg-white text-xs border-r-0 rounded-r-none" />
                    <select className="h-10 border border-gray-200 rounded-r-lg bg-white text-xs px-2 outline-none">
                       <option>Kes</option>
                       <option>%</option>
                    </select>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between p-1">
               <div className="flex items-center gap-3">
                  <Switch id="print" defaultChecked />
                  <Label htmlFor="print" className="text-[12px] font-bold text-gray-600">Auto-print receipt</Label>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
               <Button 
                variant="destructive" 
                className="h-14 rounded-xl font-bold uppercase gap-2 shadow-xl shadow-red-500/10"
                onClick={() => setPosCart([])}
              >
                  <Trash2 className="w-5 h-5" /> Cancel
               </Button>
               <Button 
                className="h-14 bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-xl font-bold uppercase gap-2 shadow-xl"
                disabled={posCart.length === 0}
              >
                  <Printer className="w-5 h-5" /> Pay {total.toLocaleString()}.00
               </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
