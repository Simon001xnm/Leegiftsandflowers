'use client';

import { use, useMemo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOCK_MENU, MOCK_RESTAURANTS } from "@/lib/food-data";
import { Clock, Store, TrendingUp, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";

// COMBINED LIST TO SUPPORT ALL PRODUCTS IN LANDING
const STATIC_PRODUCTS = [
  { id: 'p-fillet', name: "Beef Fillet", price: 1100, rating: 5.0, category: "Raw Meat", image: "/beef fillet raw.jpg", description: "Exclusive Extra HD Beef Fillet. Prime cut with maximum marbling and tenderness.", hasTax: true },
  { id: 'p-tbone', name: "Beef T-Bone", price: 1000, rating: 5.0, category: "Raw Meat", image: "/images (28).jpg", description: "Exclusive Extra HD Beef T-Bone. Iconic cut featuring both sirloin and fillet with a characteristic T-shaped bone.", hasTax: true },
  { id: 'p-cubes', name: "Beef Cubes", price: 1000, rating: 5.0, category: "Raw Meat", image: "/images (29).jpg", description: "Exclusive Extra HD Beef Cubes. Perfectly diced for stews and slow cooking.", hasTax: true },
  { id: 'p4', name: "Premium Beef Takeaway", price: 900, rating: 4.9, category: "Raw Meat", image: "/BEEF TAKEAWAY.jpg", description: "Elite quality beef, fresh from our main node." },
  { id: 'p10', name: "Goat Meat 1kg", price: 1350, rating: 4.8, category: "Raw Meat", image: "https://picsum.photos/seed/goat1/600/600", description: "Tender goat meat sourced from local suppliers." },
  { id: 'p11', name: "Farm Chicken (Local)", price: 800, rating: 4.7, category: "Raw Meat", image: "https://picsum.photos/seed/chickenraw/600/600", description: "Authentic local farm-raised chicken." },
  { id: 'rm4', name: "Beef Mince 1kg", price: 950, rating: 4.9, category: "Raw Meat", image: "https://picsum.photos/seed/mince/600/600", description: "Premium beef mince, low fat content." },
  { id: 'p2', name: "Beef Choma 1kg", price: 1400, rating: 4.8, category: "Cooked Meat", image: "/BEEF CHOMA.jpg", description: "Legendary Nairobi West grilled beef." },
  { id: 'p1', name: "Beef Chemsha 1kg", price: 1400, rating: 4.9, category: "Cooked Meat", image: "/beef chemsha SMB.jpg", description: "Healthy and tender slow-boiled beef." },
  { id: 'p3', name: "Beef Dry Fry 1kg", price: 1400, rating: 4.7, category: "Cooked Meat", image: "/BEEF DRY FRY.jpg", description: "Spiced dry-fried beef cuts." },
  { id: 'p6', name: "Full Chicken Choma", price: 1000, rating: 4.8, category: "Cooked Meat", image: "/FULL CHICKEN CHOMA.jpg", description: "Flame-grilled whole chicken." },
  { id: 'p24', name: "Mutura Node (Standard)", price: 100, rating: 4.9, category: "Cooked Meat", image: "/BEEF CHOMA.jpg", description: "The authentic Nairobi sausage experience." },
  { id: 'p5', name: "Crispy Chips Portion", price: 200, rating: 4.5, category: "Grocery", image: "/CHIPS.jpg", description: "Perfectly fried golden potato chips." },
  { id: 'ka1', name: "Digital Air Fryer", price: 12500, rating: 4.9, category: "Kitchen Appliances", image: "https://picsum.photos/seed/airfryer/600/600", description: "Healthy cooking for your premium meat cuts." },
  { id: 'pa1', name: "20,000mAh Power Bank", price: 4500, rating: 4.9, category: "Phone Accessories", image: "https://picsum.photos/seed/powerbank/600/600", description: "Reliable power for your mobile devices." },
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const supabase = createClient();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // 1. Check local static/mock data first
      const localItem = [...STATIC_PRODUCTS, ...MOCK_MENU].find(m => m.id === id);
      
      if (localItem) {
        setProduct({
          id: localItem.id,
          name: localItem.name,
          price: localItem.price,
          description: localItem.description || "Premium quality product from the Steak West network.",
          imageUrl: localItem.image || localItem.imageUrl,
          category: localItem.category,
          hasTax: localItem.hasTax
        });
        setLoading(false);
        return;
      }

      // 2. Fallback to Supabase if ID looks like a real database entry
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

  const isExtraHD = product.id === 'p-fillet' || product.id === 'p-tbone' || product.id === 'p-cubes';

  return (
    <div className="min-h-screen flex flex-col bg-white pt-24">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="mb-8 flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="relative aspect-square md:aspect-[4/3] bg-gray-50 border overflow-hidden">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                  priority
                  quality={100}
                  unoptimized={isExtraHD}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <Badge className="bg-primary text-white border-none font-black text-[12px] uppercase tracking-widest px-4 py-1 rounded-none">
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
                <div className="flex items-center gap-4 text-[14px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 20 Min Delivery</span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5 text-emerald-600"><TrendingUp className="w-4 h-4" /> Freshly Sourced</span>
                </div>
              </div>

              <div className="py-6 border-y border-dashed space-y-2">
                <p className="text-[12px] font-black text-muted-foreground uppercase tracking-[0.2em]">Price per Unit</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black text-black">KES {product.price.toLocaleString()}</p>
                  {product.hasTax && <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Exclusive of VAT</span>}
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-[14px] font-medium text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="bg-gray-50 p-6 space-y-4 border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border flex items-center justify-center text-primary">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Sourced From</p>
                      <p className="text-[14px] font-black text-black uppercase tracking-tighter">
                        Steak West Butchery
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    className="flex-grow h-14 text-[14px] font-black uppercase tracking-widest rounded-none shadow-xl shadow-primary/10"
                    onClick={handleAdd}
                  >
                    Add to Basket
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
