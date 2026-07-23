
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
import { 
  Plus, 
  ShoppingCart, 
  RefreshCcw, 
  Loader2, 
  Trash2, 
  Upload, 
  Package, 
  TrendingUp, 
  LayoutGrid, 
  Settings, 
  ArrowRight,
  Search,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";

export default function MerchantDashboard() {
  const { toast } = useToast();
  const supabase = createClient();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingProduct, setAddingProduct] = useState(false);
  const [posCart, setPosCart] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category_id: "",
    description: "",
    image_url: ""
  });

  async function loadData() {
    setLoading(true);
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          categories (name)
        `)
        .order('created_at', { ascending: false });
      
      if (!productsError && productsData) setProducts(productsData);

      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });
      
      if (!categoriesError && categoriesData) {
        setCategories(categoriesData);
        if (categoriesData.length > 0 && !newProduct.category_id) {
          setNewProduct(prev => ({ ...prev, category_id: categoriesData[0].id }));
        }
      }
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
      toast({ variant: "destructive", title: "Missing photo", description: "Please upload a product photo." });
      return;
    }
    setAddingProduct(true);
    
    const productPayload = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      image_url: newProduct.image_url,
      is_in_stock: true,
      category_id: newProduct.category_id,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from('products').insert([productPayload]);

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: "Product added", description: "Item successfully listed in your shop." });
      setNewProduct({ 
        name: "", 
        price: "", 
        category_id: categories.length > 0 ? categories[0].id : "", 
        description: "", 
        image_url: "" 
      });
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
      toast({ title: "Status updated", description: `Item is now ${!currentStatus ? 'in stock' : 'out of stock'}.` });
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

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col pt-24">
      {/* Dynamic Command Bar - Sticky below the global nav */}
      <header className="sticky top-24 z-30 bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Control center</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-[11px] font-medium text-muted-foreground">System live • Stall 16A</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex bg-gray-100 rounded-xl px-4 py-2 items-center gap-3 border transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-white">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              placeholder="Search inventory..." 
              className="bg-transparent border-none outline-none text-sm font-medium w-48"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl border-gray-200 h-10 font-bold px-4"
            onClick={loadData}
          >
            <RefreshCcw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
            Sync
          </Button>
          <Button className="rounded-xl h-10 px-4 font-bold shadow-lg shadow-primary/10">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      <main className="flex-grow p-6 lg:p-10 pb-32 container mx-auto max-w-7xl">
        {/* Quick Analytics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <QuickStat icon={TrendingUp} label="Daily sales" value="KES 42.5K" color="text-emerald-600" bg="bg-emerald-50" />
          <QuickStat icon={Package} label="Active items" value={products.length.toString()} color="text-blue-600" bg="bg-blue-50" />
          <QuickStat icon={ShoppingCart} label="Orders today" value="18" color="text-orange-600" bg="bg-orange-50" />
          <QuickStat icon={CheckCircle2} label="Fill rate" value="98%" color="text-purple-600" bg="bg-purple-50" />
        </div>

        <Tabs defaultValue="pos" className="space-y-8">
          <div className="flex items-center justify-between">
            <TabsList className="bg-gray-100/80 p-1.5 rounded-2xl h-14 border shadow-inner">
              <TabsTrigger value="pos" className="rounded-xl font-bold text-sm px-8 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">Shop floor</TabsTrigger>
              <TabsTrigger value="inventory" className="rounded-xl font-bold text-sm px-8 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">Stock list</TabsTrigger>
              <TabsTrigger value="add" className="rounded-xl font-bold text-sm px-8 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all text-primary">Add item</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="pos" className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-3xl animate-pulse" />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-40 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                  <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900">No items found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or add new stock.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => addToPosCart(p)}
                      className={cn(
                        "group relative flex flex-col bg-white border border-gray-100 rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95",
                        !p.is_in_stock && "opacity-40 grayscale pointer-events-none"
                      )}
                    >
                      <div className="aspect-square relative overflow-hidden bg-gray-50 border-b">
                        <Image 
                          src={p.image_url || `https://picsum.photos/seed/${p.id}/400/400`} 
                          alt={p.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {!p.is_in_stock && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                            <span className="text-[10px] font-bold text-gray-900 px-3 py-1 rounded-full bg-white shadow-xl">Out of stock</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 space-y-1 text-left">
                        <h4 className="text-[13px] font-medium text-gray-800 line-clamp-1">{p.name}</h4>
                        <p className="text-sm font-bold text-gray-900">KES {p.price.toLocaleString()}</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                          <Plus className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <Card className="rounded-[2.5rem] border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] sticky top-[180px] bg-white overflow-hidden">
                <CardHeader className="bg-gray-50/80 border-b px-8 py-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-primary" /> Active order
                    </CardTitle>
                    <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-bold">
                      {posCart.length} items
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6 min-h-[200px] max-h-[350px] overflow-auto pr-2 no-scrollbar">
                    {posCart.length === 0 ? (
                      <div className="text-center py-10 opacity-30 flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Plus className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-gray-400">Cart is empty</p>
                        <p className="text-[10px] text-gray-300 mt-1">Tap items to add to order</p>
                      </div>
                    ) : posCart.map(i => (
                      <div key={i.id} className="flex justify-between items-center group/item animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-xl relative overflow-hidden border">
                             <Image src={i.image_url || `https://picsum.photos/seed/${i.id}/100/100`} alt="" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-[13px] text-gray-800 leading-none mb-1">{i.name}</p>
                            <p className="text-[11px] font-bold text-muted-foreground">{i.quantity}x • KES {i.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-sm">KES {(i.price * i.quantity).toLocaleString()}</span>
                          <button 
                            onClick={() => setPosCart(prev => prev.filter(item => item.id !== i.id))} 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t-2 border-dashed space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total</span>
                      <span className="text-4xl font-bold text-gray-900 tracking-tighter">KES {total.toLocaleString()}</span>
                    </div>
                    <Button 
                      className="w-full h-16 bg-gray-900 text-white font-bold rounded-2xl hover:bg-primary transition-all shadow-2xl shadow-gray-900/10 disabled:opacity-50 group" 
                      disabled={posCart.length === 0} 
                      onClick={() => {setPosCart([]); toast({ title: "Order completed", description: "Payment verified successfully." })}}
                    >
                      Complete sale
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card className="rounded-[3rem] border shadow-sm overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-8 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Product</th>
                      <th className="px-8 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                      <th className="px-8 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Price</th>
                      <th className="px-8 py-5 text-right text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden shrink-0 border relative">
                               <Image src={p.image_url || `https://picsum.photos/seed/${p.id}/200/200`} fill className="object-cover" alt="" />
                            </div>
                            <span className="font-medium text-[14px] text-gray-900">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                           <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none font-bold rounded-lg px-3 py-1 text-[10px]">
                             {p.categories?.name || "Uncategorized"}
                           </Badge>
                        </td>
                        <td className="px-8 py-5 font-bold text-[14px]">KES {p.price.toLocaleString()}</td>
                        <td className="px-8 py-5 text-right">
                           <div className="flex items-center justify-end gap-4">
                              <span className={cn("text-[10px] font-bold uppercase tracking-widest", p.is_in_stock ? "text-emerald-600" : "text-red-500")}>
                                {p.is_in_stock ? "In stock" : "Out of stock"}
                              </span>
                              <Switch 
                                checked={p.is_in_stock} 
                                onCheckedChange={() => toggleStock(p.id, p.is_in_stock)} 
                                className="data-[state=checked]:bg-emerald-500" 
                              />
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                 <h2 className="text-3xl font-bold text-gray-900">New item listing</h2>
                 <p className="text-muted-foreground text-sm">Add a premium product to your marketplace node.</p>
              </div>

              <Card className="rounded-[3rem] border shadow-2xl bg-white overflow-hidden">
                <CardContent className="p-10">
                  <form onSubmit={handleAddProduct} className="grid md:grid-cols-12 gap-10">
                    <div className="md:col-span-5 space-y-4">
                      <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Product photo</Label>
                      <div className="relative group aspect-square">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                        />
                        <div className={cn(
                          "w-full h-full border-4 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center transition-all duration-500 bg-gray-50",
                          imagePreview ? "border-emerald-500/50 bg-emerald-50" : "border-gray-100 group-hover:bg-gray-100 group-hover:border-primary/20"
                        )}>
                          {imagePreview ? (
                            <div className="relative w-full h-full p-4">
                               <img src={imagePreview} className="w-full h-full object-cover rounded-[1.8rem] shadow-xl" alt="Preview" />
                               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-[1.8rem]">
                                  <Upload className="w-10 h-10 text-white" />
                               </div>
                            </div>
                          ) : (
                            <>
                              <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-4">
                                <Upload className="w-6 h-6 text-primary" />
                              </div>
                              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Select image</p>
                              <p className="text-[9px] text-gray-300 mt-2">JPG, PNG up to 5MB</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-7 space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Product name</Label>
                          <Input 
                            required
                            placeholder="e.g. Premium T-bone steak" 
                            className="rounded-2xl border-gray-100 h-14 text-base bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all"
                            value={newProduct.name}
                            onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Price (KES)</Label>
                            <Input 
                              required
                              type="number"
                              placeholder="1500" 
                              className="rounded-2xl border-gray-100 h-14 text-base bg-gray-50 focus:bg-white transition-all"
                              value={newProduct.price}
                              onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Category</Label>
                            <select 
                              className="w-full h-14 rounded-2xl bg-gray-50 border border-gray-100 px-4 text-sm font-medium outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all appearance-none"
                              value={newProduct.category_id}
                              onChange={e => setNewProduct({...newProduct, category_id: e.target.value})}
                              required
                            >
                              <option value="" disabled>Select category</option>
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Item description</Label>
                          <Textarea 
                            className="rounded-2xl border-gray-100 min-h-[120px] bg-gray-50 focus:bg-white p-4 transition-all"
                            placeholder="Briefly describe the cut, origin, or preparation..."
                            value={newProduct.description}
                            onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-16 bg-gray-900 text-white font-bold rounded-2xl hover:bg-primary transition-all shadow-2xl shadow-primary/20 text-base"
                        disabled={addingProduct}
                      >
                        {addingProduct ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Save to marketplace"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function QuickStat({ icon: Icon, label, value, color, bg }: any) {
  return (
    <Card className="rounded-[2rem] border shadow-none bg-white p-6 relative overflow-hidden group">
      <div className={cn("absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500")}>
        <Icon className="w-12 h-12" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
        <h3 className={cn("text-2xl font-bold tracking-tight", color)}>{value}</h3>
      </div>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mt-4", bg)}>
         <Icon className={cn("w-5 h-5", color)} />
      </div>
    </Card>
  );
}
