'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
  Printer,
  LayoutDashboard,
  FileText,
  RotateCcw,
  FileQuestion,
  Wallet,
  ArrowRightLeft,
  Coins,
  Scale,
  Users,
  Truck,
  Package,
  Layers,
  History,
  AlertTriangle,
  ClipboardList,
  BarChart3,
  TrendingUp,
  Ban,
  SunMoon,
  ChevronDown,
  X
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

  const sidebarCategories = [
    {
      title: "Main",
      items: [
        { label: "Dashboard", icon: LayoutDashboard },
        { label: "POS / Sales", icon: ShoppingCart, active: true },
        { label: "Dine-In Checkout", icon: Utensils },
        { label: "Butchery", icon: Beef },
        { label: "Orders", icon: FileText },
        { label: "Returns", icon: RotateCcw },
        { label: "Quotations", icon: FileQuestion },
      ]
    },
    {
      title: "Finance",
      items: [
        { label: "Opening Balance", icon: Wallet },
        { label: "Expense Management", icon: ArrowRightLeft },
        { label: "Cash Flow", icon: Coins },
        { label: "Tax Configuration", icon: Scale },
        { label: "KRA Tax Report", icon: FileText },
        { label: "Filing History", icon: History },
      ]
    },
    {
      title: "Credit",
      items: [
        { label: "Customers", icon: Users },
        { label: "Suppliers", icon: Truck },
        { label: "Supplier Finance", icon: Coins },
      ]
    },
    {
      title: "Products",
      items: [
        { label: "Products", icon: Package },
        { label: "Categories", icon: Layers },
        { label: "Unit of Measures", icon: Scale },
        { label: "Inventory Log", icon: ClipboardList },
        { label: "Stock In", icon: Plus },
        { label: "Price Adjustment", icon: TrendingUp },
        { label: "Price History", icon: History },
        { label: "Expiry Management", icon: AlertTriangle },
        { label: "Products Reconciliation", icon: CheckCircle2 },
      ]
    },
    {
      title: "Reports",
      items: [
        { label: "Cashier Sales", icon: BarChart3 },
        { label: "Cashier Activity", icon: Users },
        { label: "Sales Report", icon: BarChart3 },
        { label: "Stock Movement", icon: Truck },
        { label: "Profit Report", icon: TrendingUp },
        { label: "Inventory Report", icon: ClipboardList },
        { label: "Stock Value Report", icon: Coins },
        { label: "Supplier Payments", icon: ArrowRightLeft },
        { label: "Credit Payments", icon: Coins },
        { label: "Disposed Products", icon: Ban },
        { label: "Reconciliation Report", icon: FileText },
      ]
    },
    {
      title: "Settings",
      items: [
        { label: "Users", icon: Users },
        { label: "Switch Shop", icon: Store },
      ]
    }
  ];

  const categories = [
    "All", "GOAT", "CHICKEN", "FOOD", "BEEF", "SOUP", "MUTURA", 
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
    <div className="h-screen flex overflow-hidden bg-[#f1f5f9]">
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#1e293b] flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 gap-3 border-b border-white/5">
           <Store className="w-6 h-6 text-white" />
           <span className="font-black text-white text-sm tracking-tighter uppercase">Steak West Butchery</span>
        </div>

        <div className="p-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input 
                placeholder="Search menu..." 
                className="w-full h-10 pl-9 pr-3 bg-[#0f172a] border-none rounded-md text-[13px] text-white placeholder:text-gray-600 outline-none"
              />
           </div>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar px-2 space-y-1 pb-10">
           {sidebarCategories.map((group) => (
             <div key={group.title} className="space-y-1 pt-4 first:pt-0">
                <p className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{group.title}</p>
                {group.items.map((item) => (
                  <button 
                    key={item.label}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-[13px] transition-all",
                      item.active 
                        ? "bg-[#3b82f6] text-white" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
             </div>
           ))}
           <div className="pt-8 space-y-1">
              <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-md text-[13px] text-gray-400 hover:text-white hover:bg-white/5">
                <div className="flex items-center gap-3">
                   <SunMoon className="w-4 h-4" />
                   <span>Theme</span>
                </div>
              </button>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Top Header Command Bar */}
        <header className="h-16 bg-[#1e293b] flex items-center justify-between px-4 text-white shrink-0 border-l border-white/5">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-md">
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex items-center gap-1.5 ml-2 font-black text-sm tracking-tight uppercase">
              <Store className="w-4 h-4" />
              STEAK WEST BUTCHERY
            </div>
            <div className="flex items-center gap-2 ml-6">
              <Button size="sm" className="bg-[#22c55e] hover:bg-[#16a34a] h-8 rounded-md px-4 gap-2 font-bold text-[11px] uppercase">
                <ShoppingCart className="w-3.5 h-3.5" /> Restaurant
              </Button>
              <Button size="sm" className="bg-[#ef4444] hover:bg-[#dc2626] h-8 rounded-md px-4 gap-2 font-bold text-[11px] uppercase shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <Beef className="w-3.5 h-3.5" /> Butchery
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
              className="bg-[#ef4444] hover:bg-[#dc2626] h-8 rounded-md px-4 gap-2 font-bold text-[11px] uppercase"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Button>
          </div>
        </header>

        {/* Dynamic Status Bar */}
        <div className="h-14 bg-white border-b px-4 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-md border-gray-200" onClick={() => router.back()}>
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </Button>
            <Button size="sm" className="bg-[#ef4444] hover:bg-[#dc2626] rounded-md px-6 h-10 gap-2 font-black text-[11px] uppercase">
              <Beef className="w-4 h-4" /> Butchery
            </Button>
            <div className="flex items-center gap-1.5 bg-pink-100 text-pink-600 px-4 h-10 rounded-md text-[11px] font-black uppercase">
               <Store className="w-4 h-4" /> Steak West Butchery
            </div>
          </div>

          <div className="flex items-center gap-6 text-gray-500 text-[12px] font-medium">
             <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {currentDate}</div>
             <div className="font-bold text-black flex items-center gap-1.5"><Clock className="w-4 h-4" /> {currentTime}</div>
             <div className="flex items-center gap-1.5 font-bold text-black bg-gray-100 px-3 py-1.5 rounded-md">
                <UserIcon className="w-4 h-4" /> {currentUser?.email?.split('@')[0] || "Operator"}
             </div>
          </div>
        </div>

        {/* POS Shop Floor */}
        <div className="flex-grow flex p-4 gap-4 overflow-hidden">
          {/* Inventory Explorer */}
          <div className="flex-grow flex flex-col gap-4 bg-white rounded-xl border p-6 overflow-hidden shadow-sm">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                placeholder="Search meat products..." 
                className="w-full h-14 pl-12 pr-4 bg-[#f8fafc] border border-gray-100 rounded-xl text-[15px] focus:ring-2 focus:ring-primary/10 outline-none"
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
                    "px-4 h-9 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all",
                    activeCategory === cat 
                      ? "bg-red-600 text-white border-red-600 shadow-md" 
                      : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex-grow overflow-auto no-scrollbar pt-2">
               {loading ? (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                     {[1,2,3,4,5,6,7,8].map(i => (
                       <div key={i} className="aspect-square bg-slate-50 rounded-2xl animate-pulse border" />
                     ))}
                  </div>
               ) : filteredProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-10 py-20">
                     <Beef className="w-16 h-16 mb-4" />
                     <p className="font-bold text-lg uppercase">No items found</p>
                  </div>
               ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
                    {filteredProducts.map(p => (
                      <button 
                        key={p.id}
                        onClick={() => addToPosCart(p)}
                        className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:border-red-100 active:scale-95"
                      >
                        <div className="aspect-square relative bg-gray-50 border-b">
                           <Image src={p.image_url || `https://picsum.photos/seed/${p.id}/400/400`} alt="" fill className="object-cover" />
                        </div>
                        <div className="p-4 text-center space-y-1 bg-white">
                           <h4 className="text-[13px] font-black text-gray-900 leading-tight uppercase line-clamp-1">{p.name}</h4>
                           <p className="text-lg font-black text-red-600">Kes {p.price.toLocaleString()}.00</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">per kg</p>
                        </div>
                      </button>
                    ))}
                  </div>
               )}
            </div>
          </div>

          {/* Transaction Console (Cart) */}
          <div className="w-[450px] flex flex-col bg-white rounded-xl border shadow-2xl overflow-hidden shrink-0">
            <div className="p-6 border-b flex items-center justify-between bg-white">
              <h3 className="font-black text-gray-900 flex items-center gap-3 text-sm uppercase">
                 <ShoppingCart className="w-5 h-5 text-gray-400" /> Cart
              </h3>
              <div className="flex gap-2">
                 <Badge className="bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center p-0 font-black text-[10px]">{posCart.length}</Badge>
                 <button onClick={() => setPosCart([])} className="p-2 hover:bg-red-50 text-red-300 rounded-md border border-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                 </button>
              </div>
            </div>

            <div className="flex-grow overflow-auto px-6 py-6 space-y-4 no-scrollbar">
              {posCart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Empty basket</p>
                </div>
              ) : posCart.map(item => (
                <div key={item.id} className="flex justify-between items-center group animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-[13px] font-black text-gray-400 border">
                        {item.quantity}
                     </div>
                     <div>
                        <p className="text-[13px] font-black text-gray-800 uppercase line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-gray-400 font-bold tracking-widest">Kes {item.price.toLocaleString()}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <p className="text-[14px] font-black text-black">Kes {(item.price * item.quantity).toLocaleString()}</p>
                     <button onClick={() => removeFromCart(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-md">
                        <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white border-t space-y-6">
              <div className="space-y-2">
                 <div className="flex justify-between text-[13px] font-bold text-gray-500 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-black font-black">{subtotal.toLocaleString()}.00</span>
                 </div>
                 <div className="flex justify-between text-[13px] font-bold text-red-400 uppercase tracking-widest">
                    <span>Discount</span>
                    <span className="font-black">-{discount.toLocaleString()}.00</span>
                 </div>
                 <div className="flex justify-between text-[13px] font-bold text-amber-500 uppercase tracking-widest">
                    <span>Tax</span>
                    <span className="font-black">{tax.toLocaleString()}.00</span>
                 </div>
              </div>

              <div className="bg-red-600 text-white p-4 h-16 rounded-xl flex items-center justify-between shadow-xl shadow-red-600/10">
                 <span className="text-sm font-black uppercase tracking-widest">Total</span>
                 <span className="text-2xl font-black">{total.toLocaleString()}.00</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Customer</Label>
                    <div className="relative">
                      <Input placeholder="Search..." className="h-11 rounded-lg bg-[#f8fafc] border-none text-[13px] pl-4" />
                      <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="bg-[#f0f9ff] text-[#0369a1] px-4 h-11 rounded-lg flex items-center justify-between text-[13px] font-black uppercase border border-[#bae6fd]">
                       <span>Walk-in</span>
                       <ChevronDown className="w-4 h-4" />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Discount</Label>
                    <div className="flex h-11">
                      <Input defaultValue="0" className="h-full rounded-l-lg bg-[#f8fafc] border-none text-[13px] border-r border-gray-100 rounded-r-none" />
                      <div className="flex items-center bg-[#f8fafc] rounded-r-lg px-3 text-[13px] font-black uppercase text-gray-500 border-l border-white">
                         Kes <ChevronDown className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                 </div>
              </div>

              <div className="flex items-center justify-between p-1">
                 <div className="flex items-center gap-3">
                    <Switch id="print" defaultChecked className="data-[state=checked]:bg-blue-500" />
                    <Label htmlFor="print" className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Auto-print receipt</Label>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                 <Button 
                  variant="destructive" 
                  className="h-16 rounded-xl font-black uppercase text-[12px] tracking-widest gap-2 bg-[#ef4444] hover:bg-[#dc2626] shadow-xl shadow-red-500/10"
                  onClick={() => setPosCart([])}
                >
                    <X className="w-5 h-5 stroke-[3px]" /> Cancel
                 </Button>
                 <Button 
                  className="h-16 bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-xl font-black uppercase text-[12px] tracking-widest gap-2 shadow-xl"
                  disabled={posCart.length === 0}
                >
                    <Printer className="w-5 h-5" /> Pay {total.toLocaleString()}.00
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
