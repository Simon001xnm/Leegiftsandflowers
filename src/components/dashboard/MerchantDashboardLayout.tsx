
'use client';

import { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  Search,
  Bell,
  LogOut,
  Utensils,
  Beef,
  Clock,
  User as UserIcon,
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
  X,
  Cpu,
  Zap,
  Usb,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/firebase/auth/use-user";

export function MerchantDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const { user: currentUser } = useUser();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const sidebarCategories = [
    {
      title: "Main",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "POS / Sales", icon: ShoppingCart, href: "/dashboard" },
        { label: "Dine-In Checkout", icon: Utensils },
        { label: "Butchery", icon: Beef },
        { label: "Orders", icon: FileText },
        { label: "Returns", icon: RotateCcw },
        { label: "Quotations", icon: FileQuestion },
      ]
    },
    {
      title: "Hardware",
      items: [
        { label: "Local service link", icon: Usb },
        { label: "Scales & Weighing", icon: Scale },
        { label: "Thermal Printers", icon: Printer },
        { label: "Barcode Scanners", icon: Zap },
        { label: "System Diagnostics", icon: Cpu },
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
        { label: "Products", icon: Package, href: "/dashboard/products" },
        { label: "Categories", icon: Layers },
        { label: "Unit of Measures", icon: Scale },
        { label: "Inventory Log", icon: ClipboardList },
        { label: "Stock In", icon: Plus },
        { label: "Price Adjustment", icon: TrendingUp },
        { label: "Price History", icon: History },
        { label: "Expiry Management", icon: AlertTriangle },
        { label: "Products Reconciliation", icon: FileText },
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
                    onClick={() => item.href && router.push(item.href)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-[13px] transition-all",
                      pathname === item.href 
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
            
            {/* Hardware Status Monitoring Strip */}
            <div className="hidden xl:flex items-center gap-4 ml-8 px-4 border-l border-white/10">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Service: <span className="text-white">Connected</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Printer: <span className="text-white">Online</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Scale: <span className="text-white">Ready</span></span>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto lg:ml-6">
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
          <div className="flex items-center gap-6 text-gray-500 text-[12px] font-medium">
             <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {currentDate}</div>
             <div className="font-bold text-black flex items-center gap-1.5"><Clock className="w-4 h-4" /> {currentTime}</div>
             <div className="flex items-center gap-1.5 font-bold text-black bg-gray-100 px-3 py-1.5 rounded-md">
                <UserIcon className="w-4 h-4" /> {currentUser?.email?.split('@')[0] || "Operator"}
             </div>
          </div>
        </div>

        <div className="flex-grow overflow-auto no-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
