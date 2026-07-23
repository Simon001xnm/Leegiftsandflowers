
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Plus, ShoppingCart, RefreshCcw, Loader2, Trash2, Upload } from "lucide-react";

export default function MerchantDashboard() {
  const { toast } = useToast();
  const supabase = createClient();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingProduct, setAddingProduct] = useState(false);
  const [posCart, setPosCart] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Raw Meat",
    description: "",
    image_url: ""
  });

  async function loadData() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setProducts(data);
    } catch (e) {
      console.warn("Load deferred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [supabase]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setNewProduct({ ...newProduct, image_url: base64String });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.image_url) {
      toast({ variant: "destructive", title: "Missing Photo", description: "Please upload a product photo." });
      return;
    }
    setAddingProduct(true);
    
    // We try to insert into 'category' but fallback if the column is missing
    const productPayload = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      image_url: newProduct.image_url,
      is_in_stock: true,
      created_at: new Date().toISOString(),
      category: newProduct.category // Ensure your Supabase table has this exact column
    };

    const { error } = await supabase.from('products').insert([productPayload]);

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: "Success", description: "Product added to shop." });
      setNewProduct({ name: "", price: "", category: "Raw Meat", description: "", image_url: "" });
      setImagePreview(null);
      loadData();
    }
    setAddingProduct(false);
  };

  const toggleStock = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ is_in_stock: !currentStatus })
      .eq('id', id);

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, is_in_stock: !currentStatus } : p));
      toast({ title: "Updated", description: "Item status changed." });
    }
  };

  const addToPosCart = (item: any) => {
    if (!item.is_in_stock) return;
    setPosCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const total = posCart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Management</h1>
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Business Control Panel</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-none border-2 border-black font-black uppercase text-[10px] h-10 px-6" onClick={loadData}>
            <RefreshCcw className="w-3 h-3 mr-2" /> Refresh
          </Button>
        </div>
      </header>

      <Tabs defaultValue="pos" className="space-y-8">
        <TabsList className="bg-gray-100 p-1 rounded-none h-12 border-2 border-black">
          <TabsTrigger value="pos" className="rounded-none font-black uppercase text-[11px] px-8 data-[state=active]:bg-black data-[state=active]:text-white">Shop Floor</TabsTrigger>
          <TabsTrigger value="inventory" className="rounded-none font-black uppercase text-[11px] px-8 data-[state=active]:bg-black data-[state=active]:text-white">Stock List</TabsTrigger>
          <TabsTrigger value="add" className="rounded-none font-black uppercase text-[11px] px-8 data-[state=active]:bg-black data-[state=active]:text-white">Add Item</TabsTrigger>
        </TabsList>

        <TabsContent value="pos" className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {products.map(p => (
                <button 
                  key={p.id} 
                  className={cn(
                    "flex flex-col border-2 rounded-none transition-all text-left group",
                    p.is_in_stock ? "border-black hover:bg-black hover:text-white" : "opacity-30 border-gray-100 grayscale pointer-events-none"
                  )}
                  onClick={() => addToPosCart(p)}
                >
                  <div className="aspect-square bg-gray-50 border-b-2 border-black overflow-hidden relative">
                    <img src={p.image_url || `https://picsum.photos/seed/${p.id}/200/200`} alt="" className="object-cover w-full h-full" />
                    {!p.is_in_stock && <div className="absolute inset-0 flex items-center justify-center bg-white/80"><span className="text-[8px] font-black uppercase">Out</span></div>}
                  </div>
                  <div className="p-2">
                    <p className="text-[9px] font-black uppercase truncate leading-none mb-1">{p.name}</p>
                    <p className="text-[10px] font-black">KES {p.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <Card className="rounded-none border-4 border-black shadow-2xl sticky top-24">
              <CardHeader className="bg-black text-white py-4">
                <CardTitle className="text-[12px] font-black uppercase flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Cart
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4 min-h-[200px] max-h-[400px] overflow-auto pr-2 no-scrollbar">
                  {posCart.length === 0 ? (
                    <div className="text-center py-20 opacity-20 flex flex-col items-center">
                      <Plus className="w-8 h-8 mb-2" />
                      <p className="text-[10px] font-black uppercase">Cart Empty</p>
                    </div>
                  ) : posCart.map(i => (
                    <div key={i.id} className="flex justify-between items-center border-b border-dashed border-black/20 pb-3">
                      <div>
                        <p className="font-black text-[12px] uppercase leading-none mb-1">{i.name}</p>
                        <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest">{i.quantity}x @ {i.price}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-black text-[12px]">KES {i.price * i.quantity}</span>
                        <button onClick={() => setPosCart(prev => prev.filter(item => item.id !== i.id))} className="text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t-2 border-black">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Total</span>
                    <span className="text-4xl font-black text-black leading-none">KES {total.toLocaleString()}</span>
                  </div>
                  <Button className="w-full h-16 bg-black text-white font-black uppercase text-[14px] rounded-none hover:bg-emerald-600 transition-all shadow-xl shadow-black/10" disabled={posCart.length === 0} onClick={() => {setPosCart([]); toast({ title: "Success" })}}>
                    Complete Sale
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <div className="border-4 border-black overflow-hidden bg-white">
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-b-2 border-black">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 border-2 border-black overflow-hidden shrink-0">
                           <img src={p.image_url || `https://picsum.photos/seed/${p.id}/200/200`} className="object-cover w-full h-full" alt="" />
                        </div>
                        <span className="font-black text-[13px] uppercase tracking-tighter">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-[13px]">KES {p.price}</td>
                    <td className="px-6 py-4">
                       <Badge className="bg-black text-white text-[8px] font-black uppercase rounded-none">{p.category}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-3">
                          <span className={cn("text-[9px] font-black uppercase tracking-widest", p.is_in_stock ? "text-emerald-600" : "text-red-500")}>
                            {p.is_in_stock ? "IN STOCK" : "OUT"}
                          </span>
                          <Switch checked={p.is_in_stock} onCheckedChange={() => toggleStock(p.id, p.is_in_stock)} className="data-[state=checked]:bg-emerald-500" />
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="add">
          <Card className="max-w-2xl mx-auto rounded-none border-4 border-black shadow-2xl">
            <CardHeader className="bg-black text-white">
              <CardTitle className="text-[14px] font-black uppercase tracking-widest">New Item Entry</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest">Photo</Label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                    />
                    <div className={cn(
                      "w-full aspect-video border-4 border-dashed border-black/10 flex flex-col items-center justify-center transition-all bg-gray-50",
                      imagePreview ? "border-solid border-emerald-500 bg-emerald-50" : "group-hover:bg-gray-100 group-hover:border-black/30"
                    )}>
                      {imagePreview ? (
                        <img src={imagePreview} className="w-full h-full object-contain p-4" alt="Preview" />
                      ) : (
                        <>
                          <Upload className="w-10 h-10 mb-4 text-black/20" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Select Image</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Product Name</Label>
                    <Input 
                      required
                      placeholder="e.g. PREMIUM T-BONE" 
                      className="rounded-none border-2 border-black font-bold h-12 uppercase"
                      value={newProduct.name}
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Price (KES)</Label>
                    <Input 
                      required
                      type="number"
                      placeholder="1500" 
                      className="rounded-none border-2 border-black font-bold h-12"
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest">Category</Label>
                  <select 
                    className="w-full h-12 border-2 border-black rounded-none px-4 font-bold text-[12px] uppercase bg-white outline-none focus:bg-gray-50"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    <option value="Raw Meat">Raw Meat</option>
                    <option value="Nyama Choma">Nyama Choma</option>
                    <option value="Cooked">Cooked</option>
                    <option value="Delicacies">Delicacies</option>
                    <option value="Grocery">Grocery</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest">Description</Label>
                  <Textarea 
                    className="rounded-none border-2 border-black font-bold min-h-[100px]"
                    placeholder="Brief description..."
                    value={newProduct.description}
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-16 bg-black text-white font-black uppercase text-[14px] rounded-none hover:bg-primary transition-all"
                  disabled={addingProduct}
                >
                  {addingProduct ? <Loader2 className="w-6 h-6 animate-spin" /> : "Save to Shop"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
