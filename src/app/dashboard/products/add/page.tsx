
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Save, 
  Package, 
  DollarSign,
  AlertTriangle,
  Image as ImageIcon,
  Loader2,
  X,
  ShieldAlert,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/firebase/auth/use-user";
import Image from "next/image";

export default function AddProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();
  const { user, loading: authLoading } = useUser();
  
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "BEEF",
    unit_of_measure: "kg",
    cost_price: 0,
    price: 0,
    stock: 0,
    low_stock_threshold: 10,
    description: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/dashboard/products/add');
    }
  }, [user, authLoading, router]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile) || "";
      }

      const slug = generateSlug(formData.name);

      const { error } = await supabase
        .from('products')
        .insert([{
          name: formData.name,
          slug,
          sku: formData.sku,
          category: formData.category,
          unit_of_measure: formData.unit_of_measure,
          cost_price: formData.cost_price,
          price: formData.price,
          stock: formData.stock,
          low_stock_threshold: formData.low_stock_threshold,
          description: formData.description,
          image_url: imageUrl,
          is_in_stock: formData.stock > 0,
          created_at: new Date().toISOString()
        }]);

      if (error) {
        if (error.message.includes('permission')) {
          throw new Error("Authorization Error: Admin credentials required.");
        }
        throw error;
      }

      toast({ title: "Node deployed", description: `${formData.name} is now live.` });
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

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-10 w-10 rounded-full border border-slate-200">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </Button>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Add product</h1>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Inventory Entry</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()} className="h-11 px-6 rounded-md font-bold text-[13px] border-slate-200">Discard</Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-black hover:bg-zinc-800 h-11 px-8 rounded-md gap-2 font-bold text-[13px] shadow-lg">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 stroke-[3px]" /> Deploy to catalog</>}
          </Button>
        </div>
      </div>

      {!user?.id?.startsWith('demo-') && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-4 text-amber-800 text-[12px] font-bold uppercase tracking-widest">
           <ShieldAlert className="w-5 h-5 text-amber-500" />
           <span>Secured by Supabase RLS. Admin credentials mandatory.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b">
              <CardTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
                <Package className="w-4 h-4 text-slate-400" /> Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Name *</Label>
                  <Input name="name" placeholder="e.g., Premium Beef Steak" required value={formData.name} onChange={handleInputChange} className="h-11 bg-slate-50/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">SKU *</Label>
                  <Input name="sku" placeholder="SW-BF-001" required value={formData.sku} onChange={handleInputChange} className="h-11 bg-slate-50/50" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Category *</Label>
                  <Select value={formData.category} onValueChange={(v) => handleSelectChange('category', v)}>
                    <SelectTrigger className="h-11 bg-slate-50/50">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEEF">Beef</SelectItem>
                      <SelectItem value="GOAT">Goat</SelectItem>
                      <SelectItem value="CHICKEN">Chicken</SelectItem>
                      <SelectItem value="DRINKS">Drinks</SelectItem>
                      <SelectItem value="GROCERY">Grocery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Unit *</Label>
                  <Select value={formData.unit_of_measure} onValueChange={(v) => handleSelectChange('unit_of_measure', v)}>
                    <SelectTrigger className="h-11 bg-slate-50/50">
                      <SelectValue placeholder="Select Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="pc">Piece (pc)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Description</Label>
                <Textarea name="description" placeholder="Source details, quality metrics..." rows={4} value={formData.description} onChange={handleInputChange} className="bg-slate-50/50 p-4" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b">
              <CardTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-slate-400" /> Financials
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Cost price *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] font-black text-slate-400">KES</span>
                    <Input name="cost_price" type="number" required value={formData.cost_price} onChange={handleInputChange} className="h-11 pl-12 bg-slate-50/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Selling price *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] font-black text-slate-400">KES</span>
                    <Input name="price" type="number" required value={formData.price} onChange={handleInputChange} className="h-11 pl-12 bg-primary/5 border-primary/20" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b">
              <CardTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
                <ImageIcon className="w-4 h-4 text-slate-400" /> Catalog Image
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div 
                className="relative aspect-square bg-slate-50 border border-dashed rounded-xl flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:bg-white transition-all overflow-hidden"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                {imagePreview ? (
                  <>
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    <button onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }} className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-md"><X className="w-4 h-4" /></button>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-300 border shadow-sm group-hover:text-primary transition-all"><ImageIcon className="w-6 h-6" /></div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-600">Select file</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black">PNG / JPG</p>
                    </div>
                  </>
                )}
                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b">
              <CardTitle className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
                <Layers className="w-4 h-4 text-slate-400" /> Stock
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Current Stock *</Label>
                <Input name="stock" type="number" required value={formData.stock} onChange={handleInputChange} className="h-11 bg-slate-50/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Alert Threshold</Label>
                <div className="relative">
                  <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                  <Input name="low_stock_threshold" type="number" value={formData.low_stock_threshold} onChange={handleInputChange} className="h-11 pl-10 bg-slate-50/50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
