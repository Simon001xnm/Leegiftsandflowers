
'use client';

import { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  Eye, 
  Edit2, 
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MerchantDashboardLayout } from "@/components/dashboard/MerchantDashboardLayout";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const supabase = createClient();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [lowStockOnly, setLowStockOnly] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });
      
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [supabase]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || p.category?.toUpperCase() === activeCategory.toUpperCase();
    const matchesStock = !lowStockOnly || (p.stock || 0) <= (p.low_stock_threshold || 5);
    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <MerchantDashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Products</h1>
            <p className="text-[13px] font-bold text-slate-400">Total: {products.length} products</p>
          </div>
          <Link href="/dashboard/products/add">
            <Button className="bg-[#3b82f6] hover:bg-[#2563eb] h-11 px-6 rounded-md gap-2 font-bold text-[13px]">
              <Plus className="w-4 h-4 stroke-[3px]" /> Add product
            </Button>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#e2e8f0]/30 p-4 rounded-lg flex flex-wrap items-center gap-4 border border-slate-200">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search products..." 
              className="pl-9 h-10 bg-white border-slate-200 text-[13px] rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger className="w-48 h-10 bg-white border-slate-200 text-[13px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="BEEF">Beef</SelectItem>
              <SelectItem value="GOAT">Goat</SelectItem>
              <SelectItem value="CHICKEN">Chicken</SelectItem>
              <SelectItem value="MUTURA">Mutura</SelectItem>
              <SelectItem value="CHOMA">Choma</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 px-2">
            <Checkbox 
              id="low-stock" 
              checked={lowStockOnly} 
              onCheckedChange={(checked) => setLowStockOnly(!!checked)}
              className="border-slate-300" 
            />
            <label htmlFor="low-stock" className="text-[13px] font-bold text-slate-600 cursor-pointer">Low Stock</label>
          </div>

          <div className="flex gap-2 ml-auto">
            <Button className="bg-[#3b82f6] hover:bg-[#2563eb] h-10 px-6 font-bold text-[13px]">Filter</Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
                setLowStockOnly(false);
              }}
              className="bg-[#64748b] hover:bg-[#475569] text-white border-none h-10 px-6 font-bold text-[13px]"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-transparent border-b border-slate-200">
                  <TableHead className="w-[40px] px-4"><Checkbox className="border-slate-300" /></TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Image</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Name</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Category</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Unit</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Cost</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Price</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Price 2</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Price 3</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Stock</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Expiry</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={12} className="h-32 text-center text-slate-400 font-bold uppercase text-[11px] tracking-widest">
                      Synchronizing Inventory Node...
                    </TableCell>
                  </TableRow>
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} className="h-32 text-center text-slate-400 font-bold uppercase text-[11px] tracking-widest">
                      No products matching your criteria
                    </TableCell>
                  </TableRow>
                ) : filteredProducts.map((p) => (
                  <TableRow key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="px-4"><Checkbox className="border-slate-300" /></TableCell>
                    <TableCell>
                      <div className="w-10 h-10 bg-slate-100 rounded border border-slate-200 relative overflow-hidden">
                        <Image 
                          src={p.image_url || `https://picsum.photos/seed/${p.id}/100/100`} 
                          alt="" 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-[12px] text-slate-700 max-w-[150px] truncate">{p.name}</TableCell>
                    <TableCell className="text-[11px] font-bold text-slate-500 uppercase">{p.category || "CHEMSHA"}</TableCell>
                    <TableCell className="text-[12px] text-slate-500">{p.unit_of_measure || "kg"}</TableCell>
                    <TableCell className="text-[12px] text-slate-500">{p.cost_price?.toLocaleString() || "0.00"}</TableCell>
                    <TableCell className="text-[12px] font-bold text-slate-700">{p.price?.toLocaleString()}.00</TableCell>
                    <TableCell className="text-[10px] text-slate-400 font-medium">
                      {p.price_2_name || 'Price 2'}:<br/><span className="text-slate-600 font-bold">{p.price_2?.toLocaleString() || "0.00"}</span>
                    </TableCell>
                    <TableCell className="text-[10px] text-slate-400 font-medium">
                      {p.price_3_name || 'Price 3'}:<br/><span className="text-slate-600 font-bold">{p.price_3?.toLocaleString() || "0.00"}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "text-white border-none rounded-full px-2 py-0.5 font-bold text-[10px]",
                        (p.stock || 0) <= (p.low_stock_threshold || 10) ? "bg-[#ef4444]" : "bg-emerald-500"
                      )}>
                        {(p.stock || 0).toFixed(2)} {p.unit_of_measure || "kg"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[11px] text-slate-400 font-medium">{p.expiry_date ? new Date(p.expiry_date).toLocaleDateString() : "-"}</TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="icon" variant="ghost" className="w-7 h-7 bg-cyan-400 hover:bg-cyan-500 text-white rounded">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded">
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MerchantDashboardLayout>
  );
}
