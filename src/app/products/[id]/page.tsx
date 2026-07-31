'use client';

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Store, TrendingUp, RefreshCw, ChevronLeft, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";

// SYNCED NETWORK CATALOG
const STATIC_PRODUCTS = [
  { id: 'p-fillet', name: "Beef Fillet", price: 1100, category: "Raw Meat", image: "/beef fillet raw.jpg", description: "Exclusive Extra HD Beef Fillet. Prime cut with maximum marbling and tenderness.", hasTax: true, isHalal: true },
  { id: 'p-tbone', name: "Beef T-Bone", price: 1000, category: "Raw Meat", image: "/tbone.webp", description: "Exclusive Extra HD Beef T-Bone. Iconic cut featuring both sirloin and fillet with a characteristic T-shaped bone.", hasTax: true, isHalal: true },
  { id: 'p-cubes', name: "Beef Cubes", price: 1000, category: "Raw Meat", image: "/images (34).jpg", description: "Exclusive Extra HD Beef Cubes. Perfectly diced for stews and slow cooking.", hasTax: true, isHalal: true },
  { id: 'p-liver', name: "Liver", price: 1100, category: "Raw Meat", image: "/images (35).jpg", description: "Extra HD Premium Liver. Rich in nutrients and freshly sourced.", hasTax: true, isHalal: true },
  { id: 'p-matumbo', name: "Matumbo", price: 600, category: "Raw Meat", image: "/images (36).jpg", description: "Premium cleaned matumbo (tripe), freshly processed and ready for your favorite stew.", isHalal: true },
  { id: 'p-kidney', name: "Kidney", price: 1000, category: "Raw Meat", image: "/images (38).jpg", description: "Premium Extra HD Kidney. Freshly sourced and prepared for dispatch.", hasTax: true, isHalal: true },
  { id: 'p-osumbuko', name: "Osumbuko", price: 900, category: "Raw Meat", image: "/628cb2abc83cb (1).jpeg", description: "Premium Osso Buco cuts, perfect for slow cooking and rich, marrow-infused stews.", hasTax: true, isHalal: true },
  { id: 'p-beef-on-bone', name: "Beef on Bone", price: 900, category: "Raw Meat", image: "/boneinroundsteaks (1).webp", description: "Select beef cuts on the bone, ideal for traditional stews and soups.", hasTax: true, isHalal: true },
  { id: 'p-goat-takeaway', name: "Goat Takeaway 1kg", price: 1000, category: "Raw Meat", image: "/images (47).jpg", description: "Premium Goat Takeaway. Freshly sourced and prepared for rapid dispatch from the Nairobi West node.", hasTax: true, isHalal: true },
  { id: 'p-short-ribs', name: "Beef Short Ribs", price: 1150, category: "Raw Meat", image: "https://picsum.photos/seed/ribs/600/600", description: "Premium Beef Short Ribs, perfect for slow roasting or braising.", isHalal: true },
  { id: 'p-mince-premium', name: "Premium Beef Mince", price: 950, category: "Raw Meat", image: "https://picsum.photos/seed/mince/600/600", description: "Lean and high-quality ground beef for all your kitchen needs.", isHalal: true },
  { id: 'p-mutton-chops', name: "Mutton Chops", price: 1100, category: "Raw Meat", image: "https://picsum.photos/seed/mutton/600/600", description: "Tender and flavorful mutton chops, freshly sourced from local farms.", isHalal: true },
  
  // COOKED MEAT
  { id: 'c-beef-wet-1kg', name: "Beef Wet Fry 1kg", price: 1400, category: "Cooked Meat", image: "/images (41).jpg", description: "Expertly spiced beef, wet-fried to tender perfection. A Nairobi West signature dish.", isHalal: true },
  { id: 'c-goat-wet-1kg', name: "Goat Wet Fry 1kg", price: 1400, category: "Cooked Meat", image: "/images (43).jpg", description: "Expertly spiced goat meat, wet-fried to tender perfection. A Nairobi West signature dish.", isHalal: true },
  { id: 'c-goat-choma-1kg', name: "Goat Choma 1kg", price: 1400, category: "Cooked Meat", image: "/goatchoma.jpg", description: "Tender flame-grilled goat meat, expertly seasoned for a signature Nairobi West taste.", isHalal: true },
  { id: 'c-ulimi-cow', name: "Full Ulimi Cow", price: 1400, category: "Cooked Meat", image: "/images (46).jpg", description: "Prime cow tongue, expertly prepared and cooked to tender perfection. A unique Nairobi West delicacy.", isHalal: true },
  { id: 'p2', name: "Beef Choma 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF CHOMA.jpg", description: "Legendary Nairobi West grilled beef.", isHalal: true },
  { id: 'p1', name: "BEEF CHEMSHA 1KG", price: 1400, category: "Cooked Meat", image: "/images (44).jpg", description: "Healthy and tender slow-boiled beef.", isHalal: true },
  { id: 'p3', name: "Beef Dry Fry 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF DRY FRY.jpg", description: "Spiced dry-fried beef cuts.", isHalal: true },
  { id: 'p6', name: "Full Chicken Choma", price: 1000, category: "Cooked Meat", image: "/FULL CHICKEN CHOMA.jpg", description: "Flame-grilled whole chicken.", isHalal: true },
  { id: 'p5', name: "Crispy Chips", price: 200, category: "Cooked Meat", image: "/CHIPS.jpg", description: "Perfectly fried golden potato chips.", isHalal: true },
  { id: 'c-matumbo-wet', name: "Matumbo Wet Fry", price: 900, category: "Cooked Meat", image: "https://picsum.photos/seed/matumbo/600/600", description: "Traditional Matumbo wet-fried with fresh spices and herbs.", isHalal: true },
  { id: 'c-sausage-platter', name: "Sausage Platter", price: 800, category: "Cooked Meat", image: "https://picsum.photos/seed/sausage/600/600", description: "A delicious platter of grilled beef and chicken sausages.", isHalal: true },
  { id: 'c-pork-dry-fry', name: "Pork Dry Fry 1kg", price: 1300, category: "Cooked Meat", image: "https://picsum.photos/seed/porkfry/600/600", description: "Spiced dry-fried pork cuts, prepared for rapid dispatch.", isHalal: false },
  
  // GROCERY
  { id: 'g3', name: "Fresh Farm Basket", price: 850, category: "Grocery", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600", description: "A seasonal selection of farm-fresh vegetables, hand-picked for quality.", isHalal: true },
  { id: 'g-onions', name: "Red Onions 1kg", price: 150, category: "Grocery", image: "https://picsum.photos/seed/onions/600/600", description: "Fresh farm red onions, sorted for quality." },
  { id: 'g-tomatoes', name: "Fresh Tomatoes 1kg", price: 200, category: "Grocery", image: "https://picsum.photos/seed/tomatoes/600/600", description: "Grade A tomatoes, picked fresh from the fields." },
  { id: 'g-garlic', name: "Garlic Pack", price: 100, category: "Grocery", image: "https://picsum.photos/seed/garlic/600/600", description: "Pungent and high-quality garlic bulbs." },
  
  // SODAS
  { id: 'd1-coke-150', name: "Coca-Cola Take Away", price: 150, category: "Sodas", image: "/c9f7fbad3126b7db778cc14a426d18a3.jpg", description: "Chilled Coca-Cola take away bottle.", isHalal: true },
  { id: 'd2-fanta-orange', name: "Fanta Orange Take Away", price: 150, category: "Sodas", image: "/fantafgdf.jpg", description: "Chilled Fanta Orange take away bottle.", isHalal: true },
  { id: 'd-water-500', name: "Keringet Water 500ml", price: 70, category: "Sodas", image: "https://picsum.photos/seed/water/600/600", description: "Mineral water, chilled for refreshment." },
  { id: 'd-sprite-takeaway', name: "Sprite Take Away", price: 150, category: "Sodas", image: "https://picsum.photos/seed/sprite/600/600", description: "Chilled Sprite take away bottle." },
  { id: 'd-stoney', name: "Stoney Tangawizi", price: 150, category: "Sodas", image: "https://picsum.photos/seed/stoney/600/600", description: "Strong ginger kick, chilled and ready for dispatch." },
  { id: 'd-krest', name: "Krest Bitter Lemon", price: 150, category: "Sodas", image: "/images (53).jpg", description: "Refreshing bitter lemon soda, perfect for pairing with nyama choma." },
  { id: 'd-coke-zero', name: "Coke Zero 500ml", price: 150, category: "Sodas", image: "/images (54).jpg", description: "Great Coke taste, zero sugar. Chilled for maximum refreshment." },
  { id: 'd-fanta-blackcurrant', name: "Fanta Blackcurrant", price: 150, category: "Sodas", image: "/images (55).jpg", description: "Sweet and tangy blackcurrant fanta.", isHalal: true },

  // FINE WOOD KITCHEN
  { id: 'fw-artisan-node', name: "Fine Wood Artisan Node", price: 2200, category: "Fine Wood Kitchen", image: "/kitchen2.jpg", description: "Handcrafted artisan kitchenware from the Fine Wood collection. Durable, antimicrobial, and elegant." },
  { id: 'fw-gourmet-set', name: "Fine Wood Gourmet Set", price: 3100, category: "Fine Wood Kitchen", image: "/kitchen3.jpg", description: "Elite gourmet kitchen tools, expertly crafted from premium wood nodes. Perfect for precision cooking." },
  { id: 'fw-cutting-board', name: "Artisan Cutting Board", price: 1800, category: "Fine Wood Kitchen", image: "https://picsum.photos/seed/board/600/600", description: "Durable, high-quality wooden cutting board handcrafted for the elite kitchen node." },
  { id: 'fw-salad-bowl', name: "Hand-Carved Salad Bowl", price: 2500, category: "Fine Wood Kitchen", image: "https://picsum.photos/seed/bowl/600/600", description: "Beautiful hand-carved wooden salad bowl, perfect for serving fresh farm baskets." },
  { id: 'fw-utensil-set', name: "5-Piece Utensil Set", price: 1500, category: "Fine Wood Kitchen", image: "https://picsum.photos/seed/utensils/600/600", description: "Set of 5 handcrafted wooden kitchen utensils for precision culinary dispatch." },
  { id: 'fw-spice-rack', name: "Wooden Spice Rack", price: 3500, category: "Fine Wood Kitchen", image: "https://picsum.photos/seed/spicerack/600/600", description: "Handcrafted wooden spice rack to organize your flavor nodes with elite precision." },

  // PHONES & ACCESSORIES
  { id: 'ph-accessory-node', name: "Elite Phone Accessory Node", price: 3500, category: "Phone Accessories", image: "/phoneaccessories.jpg", description: "Premium selection of high-clarity phone accessories, curated for the modern digital workspace." },
  { id: 'ph-powerbank-node', name: "Premium Powerbank Node", price: 5500, category: "Phone Accessories", image: "/powerbank.jpg", description: "High-capacity elite powerbank for sustained mobile node endurance. Rapid dispatch ready." },
  { id: 'ph-cable', name: "Ultra-Sync Data Cable", price: 800, category: "Phone Accessories", image: "https://picsum.photos/seed/cable/600/600", description: "High-speed USB-C data and charging cable. Reinforced fiber for maximum node durability." },
  { id: 'ph-earbuds', name: "Wireless Earbuds HD", price: 4500, category: "Phone Accessories", image: "https://picsum.photos/seed/earbuds/600/600", description: "Premium wireless earbuds with active noise cancellation and elite audio clarity." },
  { id: 'ph-case', name: "Titanium Phone Case", price: 1200, category: "Phone Accessories", image: "https://picsum.photos/seed/case/600/600", description: "Ultra-slim titanium-grade protective case. Shockproof engineering for the elite mobile operator." },
  { id: 'ph-mount', name: "Magnetic Car Mount", price: 1500, category: "Phone Accessories", image: "https://picsum.photos/seed/mount/600/600", description: "Powerful magnetic car mount for secure hands-free navigation during dispatch." },
  { id: 'ph-screen-guard', name: "Universal Screen Guard", price: 500, category: "Phone Accessories", image: "https://picsum.photos/seed/guard/600/600", description: "High-clarity tempered glass screen protector. Oleophobic coating for smudge-free operation." },
  { id: 'ph-charger', name: "Travel Fast Charger", price: 2200, category: "Phone Accessories", image: "https://picsum.photos/seed/charger/600/600", description: "Compact 65W fast charger node. Dual-port support for simultaneous device synchronization." },
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
      const localItem = STATIC_PRODUCTS.find(m => m.id === id);
      
      if (localItem) {
        setProduct({
          id: localItem.id,
          name: localItem.name,
          price: localItem.price,
          description: localItem.description || "Premium quality product from the Steak West network.",
          imageUrl: localItem.image,
          category: localItem.category,
          hasTax: localItem.hasTax,
          isHalal: localItem.isHalal
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

  const handleWhatsAppBuy = () => {
    if (!product) return;
    const phone = "254722522346";
    const message = `*INSTANT DISPATCH REQUEST*\n\nHello Steak West! I'd like to order this item immediately:\n\n- ${product.name} (1x)\n*Price:* KES ${product.price.toLocaleString()}\n\n_Please confirm availability for immediate delivery._`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <RefreshCw className="w-8 h-8 animate-spin text-primary opacity-20" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Retrieving Node...</p>
    </div>
  );

  if (!product) return <div className="p-20 text-center font-black text-2xl uppercase tracking-tighter">Product Node Missing</div>;

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
              <div className="relative aspect-square md:aspect-[4/3] bg-gray-50 border-4 border-black overflow-hidden rounded-none shadow-sm">
                <Image 
                  src={safeImageUrl} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                  priority
                  quality={100}
                  unoptimized={true}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                
                {product.isHalal && (
                  <div className="absolute top-6 left-6 z-10 w-20 h-20 md:w-36 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white animate-in zoom-in-50 duration-500">
                    <Image 
                      src="/images (45).jpg" 
                      alt="Halal Certified" 
                      fill 
                      className="object-contain p-2"
                    />
                  </div>
                )}

                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  <Badge className="bg-primary text-white border-none font-black text-[12px] uppercase tracking-widest px-4 py-1 rounded-none shadow-xl">
                    {product.category}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl lg:text-5xl font-black font-headline text-primary uppercase tracking-tighter leading-none">
                    {product.name}
                  </h1>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-black text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Priority Dispatch</span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5 text-emerald-600"><TrendingUp className="w-4 h-4" /> Artisan Quality</span>
                </div>
              </div>

              <div className="py-6 border-y-2 border-black border-dashed space-y-2">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Price Node</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl md:text-6xl font-black text-black leading-none tracking-tighter">KES {product.price.toLocaleString()}</p>
                  {product.hasTax && <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Excl. VAT</span>}
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-[14px] md:text-[15px] font-bold text-gray-600 leading-relaxed uppercase tracking-tight">
                  {product.description}
                </p>

                <div className="bg-gray-50 p-6 space-y-4 border-2 border-black rounded-none">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-primary rounded-none shadow-sm">
                      <Store className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Sourced From</p>
                      <p className="text-[14px] font-black text-black uppercase tracking-tighter">
                        Steak West Central Node
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Button 
                    className="w-full h-20 text-[14px] font-black uppercase tracking-widest rounded-none shadow-2xl bg-[#25D366] hover:bg-[#128C7E] border-none transition-all active:scale-95 flex items-center justify-center gap-3"
                    onClick={handleWhatsAppBuy}
                  >
                    <MessageCircle className="w-7 h-7" /> Buy on WhatsApp
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full h-14 text-[11px] font-black uppercase tracking-widest rounded-none border-2 border-black text-black hover:bg-black hover:text-white transition-all"
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
