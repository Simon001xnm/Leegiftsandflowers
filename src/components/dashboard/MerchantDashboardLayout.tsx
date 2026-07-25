
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
  ChevronDown,
  Plus,
  Menu,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/firebase/auth/use-user";
import Image from "next/image";
import Link from "next/link";

export function MerchantDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const { user: currentUser } = useUser();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarCategories = [
    {
      title: "Main",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "POS / Sales", icon: ShoppingCart, href: "/dashboard" },
        { label: "Orders", icon: FileText },
      ]
    },
    {
      title: "Products",
      items: [
        { label: "Inventory", icon: Package, href: "/dashboard/products" },
        { label: "Add Product", icon: PlusCircle, href: "/dashboard/products/add" },
        { label: "Categories", icon: Layers },
      ]
    },
    {
      title: "Finance",
      items: [
        { label: "Cash Flow", icon: Coins },
        { label: "Tax Report", icon: FileText },
      ]
    },
    {
      title: "Settings",
      items: [
        { label: "Users", icon: Users, href: "/dashboard/users" },
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
      <aside className={cn(
        "bg-[#1e293b] flex flex-col shrink-0 transition-all duration-300 ease-in-out overflow-hidden border-r border-white/5",
        isSidebarOpen ? "w-64" : "w-0"
      )}>
        <div className="h-16 flex items-center px-4 bg-white whitespace-nowrap">
           <Link href="/" className="relative h-10 w-full">
              <Image 
                src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
                alt="Steak West" 
                fill 
                className="object-contain object-left" 
              />
           </Link>
        </div>

        <div className="p-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input 
                placeholder="Quick search..." 
                className="w-full h-10 pl-9 pr-3 bg-[#0f172a] border-none rounded-md text-[13px] text-white placeholder:text-gray-600 outline-none"
              />
           </div>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar px-2 space-y-1 pb-10">
           {sidebarCategories.map((group) => (
             <div key={group.title} className="space-y-1 pt-4 first:pt-0">
                <p className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 whitespace-nowrap">{group.title}</p>
                {group.items.map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => item.href && router.push(item.href)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-[13px] transition-all whitespace-nowrap",
                      pathname === item.href 
                        ? "bg-[#3b82f6] text-white shadow-lg shadow-blue-500/20" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
             </div>
           ))}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Top Header Command Bar */}
        <header className="h-16 bg-[#1e293b] flex items-center justify-between px-4 text-white shrink-0 border-l border-white/5">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-md transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5 text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            <div className="hidden lg:flex items-center gap-2 ml-4">
              <Link href="/dashboard/products/add">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 h-8 rounded-md px-4 gap-2 font-bold text-[11px] uppercase">
                  <PlusCircle className="w-3.5 h-3.5" /> Add Product
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-4 border-r border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400">
               <span className="text-white">{currentDate}</span>
               <span className="text-blue-400">{currentTime}</span>
            </div>
            
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
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 font-bold text-black bg-slate-100 px-3 py-1.5 rounded-lg text-[12px]">
                <UserIcon className="w-4 h-4 text-slate-400" /> 
                <span className="uppercase tracking-tighter">{currentUser?.email?.split('@')[0] || "Operator"}</span>
             </div>
             <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <Cpu className="w-3.5 h-3.5 text-emerald-500" /> Cloud Sync Active
             </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href="/dashboard/products">
              <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest border-2">
                Manage Inventory
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-grow overflow-auto no-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
