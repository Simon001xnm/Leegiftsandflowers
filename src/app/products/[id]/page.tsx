'use client';

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOCK_MENU } from "@/lib/food-data";
import { Clock, Store, TrendingUp, RefreshCw, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";

// SYNCED NETWORK CATALOG
const STATIC_PRODUCTS = [
  { id: 'p-fillet', name: "Beef Fillet", price: 1100, category: "Raw Meat", image: "/beef fillet raw.jpg", description: "Exclusive Extra HD Beef Fillet. Prime cut with maximum marbling and tenderness.", hasTax: true },
  { id: 'p-tbone', name: "Beef T-Bone", price: 1000, category: "Raw Meat", image: "/tbone.webp", description: "Exclusive Extra HD Beef T-Bone. Iconic cut featuring both sirloin and fillet with a characteristic T-shaped bone.", hasTax: true },
  { id: 'p-cubes', name: "Beef Cubes", price: 1000, category: "Raw Meat", image: "/images (34).jpg", description: "Exclusive Extra HD Beef Cubes. Perfectly diced for stews and slow cooking.", hasTax: true },
  { id: 'p-liver', name: "Liver", price: 1100, category: "Raw Meat", image: "/images (35).jpg", description: "Extra HD Premium Liver. Rich in nutrients and freshly sourced.", hasTax: true },
  { id: 'p-matumbo', name: "Matumbo", price: 600, category: "Raw Meat", image: "/images (36).jpg", description: "Premium cleaned matumbo (tripe), freshly processed and ready for your favorite stew." },
  { id: 'p-pork', name: "Pork Steak", price: 1000, category: "Raw Meat", image: "/PORK STEAK.webp", description: "Elite Extra HD Pork Steak. Tender and succulent cuts for gourmet cooking." },
  
  // FINE WOOD KITCHEN
  { id: 'fw-chopping', name: "Fine Wood Chopping Board", price: 1500, category: "Fine Wood Kitchen", image: "/chopping board.jpg", description: "Handcrafted from solid acacia wood. Durable, antimicrobial, and beautiful." },
  { id: 'fw-knife', name: "Fine Wood Knife Block", price: 2500, category: "Fine Wood Kitchen", image: "/knife block.jpg", description: "Elite wooden storage for your premium cutlery set. Magnetic holding system." },
  { id: 'fw-bowl', name: "Fine Wood Salad Bowl", price: 1800, category: "Fine Wood Kitchen", image: "/salad bowl.jpg", description: "Deep walnut salad bowl. Perfect for serving fresh kachumbari in style." },
  { id: 'fw-status', name: "Fine Wood Spatula Set", price: 1200, category: "Fine Wood Kitchen", image: "/spatula set.jpg", description: "4-piece handcrafted cooking tool set. Gentle on non-stick surfaces." },

  // PHONES & ACCESSORIES
  { id: 'ph-iphone', name: "iPhone 15 Pro", price: 155000, category: "Phone Accessories", image: "/iphone.jpg", description: "The ultimate iPhone with Titanium design, A17 Pro chip, and advanced Pro camera system." },
  { id: 'ph-samsung', name: "Samsung S24", price: 145000, category: "Phone Accessories", image: "/samsung.jpg", description: "Next-gen Galaxy with Galaxy AI, elite zoom capabilities, and stunning LTPO display." },
  { id: 'ph-charger', name: "Fast Charger 20W", price: 2500, category: "Phone Accessories", image: "/charger.jpg", description: "Universal 20W PD Fast Charger. Reliable power dispatch for all your mobile nodes." },
  { id: 'ph-earbuds', name: "Pro Earbuds", price: 12000, category: "Phone Accessories", image: "/earbuds.jpg", description: "Immersive sound with Active Noise Cancellation and 24-hour battery endurance." },

  { id: 'p4', name: "Beef Takeaway", price: 900, category: "Raw Meat", image: "/BEEF TAKEAWAY.jpg", description: "Elite quality beef, fresh from our main node." },
  { id: 'p2', name: "Beef Choma 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF CHOMA.jpg", description: "Legendary Nairobi West grilled beef." },
  { id: 'p1', name: "Beef Chemsha 1kg", price: 1400, category: "Cooked Meat", image: "/beef chemsha SMB.jpg", description: "Healthy and tender slow-boiled beef." },
  { id: 'p3', name: "Beef Dry Fry 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF DRY FRY.jpg", description: "Spiced dry-fried beef cuts." },
  { id: 'p6', name: "Full Chicken Choma", price: 1000, category: "Cooked Meat", image: "/FULL CHICKEN CHOMA.jpg", description: "Flame-grilled whole chicken." },
  { id: 'p5', name: "Crispy Chips", price: 200, category: "Grocery", image: "/CHIPS.jpg", description: "Perfectly fried golden potato chips." },
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const supabase = createClient();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getSafeUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return url.split('/').map(segment => encodeURIComponent(segment)).join('/');
  };

  useEffect(() => {
    async function loadData() {
      const localItem = [...STATIC_PRODUCTS, ...MOCK_MENU].find(m => m.id === id);
      
      if (localItem) {
        setProduct({
          id: localItem.id,
          name: localItem.name,
          price: localItem.price,
          description: localItem.description || "Premium quality product from the Steak West network.",
          imageUrl: (localItem as any).image || localItem.imageUrl,
          category: localItem.category,
          hasTax: localItem.hasTax
        });
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase.from('products').select('*').eq('id', id).single();
        if (data) {
          setProduct({
            id: data.id,
            name: data.name,
            price: data.price,
            description: data.description,
            imageUrl: data.image_url,
            category: data.category
          });
        }
      } catch (e) {
        console.warn("Supabase node sync skipped");
      }
      setLoading(false);
    }
    loadData();
  }, [id, supabase]);

  const handleAdd = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      restaurantId: 'r1',
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      category: product.category,
      hasTax: product.hasTax
    });
    toast({
      title: "Added to basket",
      description: `${product.name} added to your selection.`,
    });
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <RefreshCw className="w-8 h-8 animate-spin text-primary opacity-20" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Retrieving Node...</p>
    </div>
  );

  if (!product) return <div className="p-20 text-center font-headline text-2xl uppercase font-black">Product not found</div>;

  const isLocal = !product.imageUrl.startsWith('http');
  const safeImageUrl = getSafeUrl(product.imageUrl);

  return (
    <div className="min-h-screen flex flex-col bg-white pt-24 pb-20">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4 lg:py-8">
          <div className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-primary flex items-center gap-1">
               <ChevronLeft className="w-3 h-3" /> Shop
            </Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="relative aspect-square md:aspect-[4/3] bg-gray-50 border overflow-hidden rounded-xl md:rounded-[2rem] shadow-sm">
                <Image 
                  src={safeImageUrl} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                  priority
                  quality={100}
                  unoptimized={isLocal}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <Badge className="bg-primary text-white border-none font-black text-[12px] uppercase tracking-widest px-4 py-1 rounded-none shadow-xl">
                    {product.category}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-black font-headline text-primary uppercase tracking-tighter leading-none">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 text-[12px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Priority Dispatch</span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5 text-emerald-600"><TrendingUp className="w-4 h-4" /> Artisan Quality</span>
                </div>
              </div>

              <div className="py-6 border-y border-dashed space-y-2">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Price Node</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl md:text-5xl font-black text-black leading-none">KES {product.price.toLocaleString()}</p>
                  {product.hasTax && <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Exclusive of VAT</span>}
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-[14px] md:text-[15px] font-medium text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="bg-gray-50 p-6 space-y-4 border rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border flex items-center justify-center text-primary rounded-xl">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Sourced From</p>
                      <p className="text-[14px] font-black text-black uppercase tracking-tighter">
                        Steak West Merchant Node
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full h-16 text-[14px] font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  onClick={handleAdd}
                >
                  Add to Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
