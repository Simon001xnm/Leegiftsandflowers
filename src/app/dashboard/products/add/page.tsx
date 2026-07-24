'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Save, 
  Package, 
  DollarSign,
  AlertTriangle,
  Calendar,
  Layers,
  Image as ImageIcon,
  Weight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MerchantDashboardLayout } from "@/components/dashboard/MerchantDashboardLayout";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AddProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "BEEF",
    unit_of_measure: "kg",
    cost_price: 0,
    price: 0,
    price_2_name: "Price 2",
    price_2: 0,
    price_3_name: "Price 3",
    price_3: 0,
    stock: 0,
    low_stock_threshold: 10,
    expiry_date: "",
    description: "",
    is_butchery_product: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          ...formData,
          is_in_stock: (formData.stock || 0) > 0,
          restaurant_id: 'r1', // Default node ID
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      toast({ title: "Product added", description: "Identity sync successful." });
      router.push("/dashboard/products");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MerchantDashboardLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="h-10 w-10 rounded-full hover:bg-white shadow-sm border border-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </Button>
            <div className="space-y-0.5">
              <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Add product</h1>
              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">New inventory entry</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => router.back()}
              className="h-11 px-6 rounded-md font-bold text-[13px] border-slate-200"
            >
              Discard
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#3b82f6] hover:bg-[#2563eb] h-11 px-8 rounded-md gap-2 font-bold text-[13px] shadow-lg shadow-blue-500/20"
            >
              {loading ? "Syncing..." : (
                <><Save className="w-4 h-4 stroke-[3px]" /> Save product</>
              )}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
                  <Package className="w-4 h-4 text-slate-400" /> Basic information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Name *</Label>
                    <Input 
                      name="name"
                      placeholder="e.g., Premium Beef Steak" 
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-11 bg-slate-50/50 border-slate-200 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">SKU *</Label>
                    <Input 
                      name="sku"
                      placeholder="SW-BF-001" 
                      required
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="h-11 bg-slate-50/50 border-slate-200 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Category *</Label>
                    <Select value={formData.category} onValueChange={(v) => handleSelectChange('category', v)}>
                      <SelectTrigger className="h-11 bg-slate-50/50 border-slate-200">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BEEF">Beef</SelectItem>
                        <SelectItem value="GOAT">Goat</SelectItem>
                        <SelectItem value="CHICKEN">Chicken</SelectItem>
                        <SelectItem value="MUTURA">Mutura</SelectItem>
                        <SelectItem value="CHOMA">Choma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Unit of measure *</Label>
                    <Select value={formData.unit_of_measure} onValueChange={(v) => handleSelectChange('unit_of_measure', v)}>
                      <SelectTrigger className="h-11 bg-slate-50/50 border-slate-200">
                        <SelectValue placeholder="Select Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="Piece (pc)">Piece (pc)</SelectItem>
                        <SelectItem value="Litre (L)">Litre (L)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Description</Label>
                  <Textarea 
                    name="description"
                    placeholder="Provide details about the product cut, quality, or storage instructions..." 
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-slate-50/50 border-slate-200 focus:bg-white p-4"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-slate-400" /> Pricing architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-6 pb-6 border-b border-dashed border-slate-100">
                  <div className="space-y-2">
                    <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Cost price *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] font-black text-slate-400">KES</span>
                      <Input 
                        name="cost_price"
                        type="number"
                        placeholder="0.00" 
                        required
                        value={formData.cost_price}
                        onChange={handleInputChange}
                        className="h-11 pl-12 bg-slate-50/50 border-slate-200 focus:bg-white font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Selling price *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] font-black text-slate-400">KES</span>
                      <Input 
                        name="price"
                        type="number"
                        placeholder="0.00" 
                        required
                        value={formData.price}
                        onChange={handleInputChange}
                        className="h-11 pl-12 bg-[#3b82f6]/5 border-[#3b82f6]/20 focus:bg-white font-mono font-bold text-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4 p-5 bg-slate-50/50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <Input 
                        name="price_2_name"
                        value={formData.price_2_name}
                        onChange={handleInputChange}
                        className="h-8 w-2/3 bg-transparent border-none font-bold text-[11px] uppercase tracking-widest p-0 text-slate-500"
                      />
                      <Badge variant="outline" className="text-[10px] uppercase">Tier 2</Badge>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] font-black text-slate-400">KES</span>
                      <Input 
                        name="price_2"
                        type="number"
                        placeholder="0.00" 
                        value={formData.price_2}
                        onChange={handleInputChange}
                        className="h-11 pl-12 bg-white border-slate-200 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 p-5 bg-slate-50/50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <Input 
                        name="price_3_name"
                        value={formData.price_3_name}
                        onChange={handleInputChange}
                        className="h-8 w-2/3 bg-transparent border-none font-bold text-[11px] uppercase tracking-widest p-0 text-slate-500"
                      />
                      <Badge variant="outline" className="text-[10px] uppercase">Tier 3</Badge>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] font-black text-slate-400">KES</span>
                      <Input 
                        name="price_3"
                        type="number"
                        placeholder="0.00" 
                        value={formData.price_3}
                        onChange={handleInputChange}
                        className="h-11 pl-12 bg-white border-slate-200 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
                  <Layers className="w-4 h-4 text-slate-400" /> Stock tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Stock quantity *</Label>
                  <Input 
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="h-11 bg-slate-50/50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Low stock threshold *</Label>
                  <div className="relative">
                    <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                    <Input 
                      name="low_stock_threshold"
                      type="number"
                      value={formData.low_stock_threshold}
                      onChange={handleInputChange}
                      className="h-11 pl-10 bg-slate-50/50 border-slate-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400" /> Lifecycle
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Expiry date</Label>
                  <Input 
                    name="expiry_date"
                    type="date"
                    value={formData.expiry_date}
                    onChange={handleInputChange}
                    className="h-11 bg-slate-50/50 border-slate-200"
                  />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-1">Optional: Set for fresh items</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#ef4444]/10 shadow-sm rounded-xl overflow-hidden bg-[#ef4444]/5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#ef4444] border border-[#ef4444]/20 shadow-sm">
                      <Weight className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[12px] font-black text-slate-700 uppercase tracking-tighter">Butchery product</p>
                      <p className="text-[10px] text-slate-500 font-medium">Sold by weight (kg)</p>
                    </div>
                  </div>
                  <Switch 
                    checked={formData.is_butchery_product} 
                    onCheckedChange={(c) => handleSwitchChange('is_butchery_product', c)}
                    className="data-[state=checked]:bg-[#ef4444]"
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed tracking-wider">
                  Enabling this option will trigger the weighing scale logic in the Butchery POS module.
                </p>
              </CardContent>
            </Card>

            <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center space-y-3 group cursor-pointer hover:bg-white transition-all">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-300 border border-slate-100 shadow-sm group-hover:text-blue-500 group-hover:border-blue-200 transition-all">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-slate-600">Product image</p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">No file chosen</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </MerchantDashboardLayout>
  );
}
