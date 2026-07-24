'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { 
  ShoppingCart, 
  Trash2, 
  Search,
  Beef,
  X,
  Printer,
  ChevronDown,
  Minus,
  Plus
} from "lucide-react";
import Image from "next/image";

/**
 * POS / SALES DASHBOARD
 * Content remains dynamic while parent layout remains static.
 */
export default function POSDashboard() {
  const supabase = createClient();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [posCart, setPosCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All", "GOAT", "CHICKEN", "FOOD", "BEEF", "SOUP", "MUTURA", 
    "BOILED", "SERVICE", "ULIMI", "CHOMA", "CHEMSHA", "DRY FRY", "LIVER", "WET FRY"
  ];

  useEffect(() => {
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
  const total = subtotal - discount + tax;

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category?.toUpperCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex p-4 gap-4 overflow-hidden">
      {/* Inventory Explorer */}
      <div className="flex-grow flex flex-col gap-4 bg-white rounded-xl border p-6 overflow-hidden shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            placeholder="Search menu items..." 
            className="w-full h-14 pl-12 pr-4 bg-[#f8fafc] border border-slate-100 rounded-xl text-[15px] focus:ring-2 focus:ring-primary/10 outline-none"
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
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
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
                    className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:border-red-100 active:scale-95"
                  >
                    <div className="aspect-square relative bg-slate-50 border-b">
                       <Image src={p.image_url || `https://picsum.photos/seed/${p.id}/400/400`} alt="" fill className="object-cover" />
                    </div>
                    <div className="p-4 text-center space-y-1 bg-white">
                       <h4 className="text-[13px] font-black text-slate-900 leading-tight uppercase line-clamp-1">{p.name}</h4>
                       <p className="text-lg font-black text-red-600">Kes {p.price.toLocaleString()}.00</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">per kg</p>
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
          <h3 className="font-black text-slate-900 flex items-center gap-3 text-sm uppercase">
             <ShoppingCart className="w-5 h-5 text-slate-400" /> Cart
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
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-slate-300" />
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Empty basket</p>
            </div>
          ) : posCart.map(item => (
            <div key={item.id} className="flex justify-between items-center group animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-[13px] font-black text-slate-400 border">
                    {item.quantity}
                 </div>
                 <div>
                    <p className="text-[13px] font-black text-slate-800 uppercase line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-slate-400 font-bold tracking-widest">Kes {item.price.toLocaleString()}</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <p className="text-[14px] font-black text-black">Kes {(item.price * item.quantity).toLocaleString()}</p>
                 <button onClick={() => removeFromCart(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-md">
                    <Trash2 className="w-4 h-4" />
                 </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white border-t space-y-6">
          <div className="space-y-2">
             <div className="flex justify-between text-[13px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-black font-black">{subtotal.toLocaleString()}.00</span>
             </div>
             <div className="flex justify-between text-[13px] font-bold text-red-400 uppercase tracking-widest">
                <span>Discount</span>
                <span className="font-black">-{discount.toLocaleString()}.00</span>
             </div>
          </div>

          <div className="bg-red-600 text-white p-4 h-16 rounded-xl flex items-center justify-between shadow-xl shadow-red-600/10">
             <span className="text-sm font-black uppercase tracking-widest">Total</span>
             <span className="text-2xl font-black">{total.toLocaleString()}.00</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Customer</Label>
                <div className="relative">
                  <Input placeholder="Search..." className="h-11 rounded-lg bg-[#f8fafc] border-none text-[13px] pl-4" />
                  <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
             </div>
             <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Discount</Label>
                <div className="flex h-11">
                  <Input defaultValue="0" className="h-full rounded-l-lg bg-[#f8fafc] border-none text-[13px] border-r border-slate-100 rounded-r-none" />
                  <div className="flex items-center bg-[#f8fafc] rounded-r-lg px-3 text-[13px] font-black uppercase text-slate-500 border-l border-white">
                     Kes <ChevronDown className="w-4 h-4 ml-2" />
                  </div>
                </div>
             </div>
          </div>

          <div className="flex items-center justify-between p-1">
             <div className="flex items-center gap-3">
                <Switch id="print" defaultChecked className="data-[state=checked]:bg-blue-500" />
                <Label htmlFor="print" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Auto-print receipt</Label>
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
  );
}
