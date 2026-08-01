
'use client';

import React, { useState, useRef, useEffect } from "react";
import { 
  Plus, 
  Search, 
  ShoppingBag, 
  Beef, 
  Utensils, 
  Zap, 
  Coffee, 
  Smartphone, 
  ChefHat, 
  Tag, 
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Play
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/landing/Footer";

const CATEGORIES = [
  { id: 'Raw Meat', icon: Beef, label: "Raw Meat" },
  { id: 'Cooked Meat', icon: Utensils, label: "Cooked Meat" },
  { id: 'Grocery', icon: ShoppingBag, label: "Grocery" },
  { id: 'Sodas', icon: Coffee, label: "Sodas" },
  { id: 'Fine Wood Kitchen', icon: ChefHat, label: "Fine Wood" },
  { id: 'Phone Accessories', icon: Smartphone, label: "Phones" },
];

const ALL_PRODUCTS = [
  // RAW MEAT (16 Items)
  { id: 'p-fillet', name: "Beef Fillet", price: 1100, category: "Raw Meat", image: "/beef fillet raw.jpg", hasTax: true, isHalal: true },
  { id: 'p-tbone', name: "Beef T-Bone", price: 1000, category: "Raw Meat", image: "/tbone.webp", hasTax: true, isHalal: true },
  { id: 'p-cubes', name: "Beef Cubes", price: 1000, category: "Raw Meat", image: "/images (34).jpg", hasTax: true, isHalal: true },
  { id: 'p-liver', name: "Liver", price: 1100, category: "Raw Meat", image: "/images (35).jpg", hasTax: true, isHalal: true },
  { id: 'p-matumbo', name: "Matumbo", price: 600, category: "Raw Meat", image: "/images (36).jpg", isHalal: true },
  { id: 'p-kidney', name: "Kidney", price: 1000, category: "Raw Meat", image: "/images (38).jpg", hasTax: true, isHalal: true },
  { id: 'p-osumbuko', name: "Osumbuko", price: 900, category: "Raw Meat", image: "/628cb2abc83cb (1).jpeg", hasTax: true, isHalal: true },
  { id: 'p-beef-on-bone', name: "Beef on Bone", price: 900, category: "Raw Meat", image: "/boneinroundsteaks (1).webp", hasTax: true, isHalal: true },
  { id: 'p-goat-takeaway', name: "Goat Takeaway 1kg", price: 1000, category: "Raw Meat", image: "/images (47).jpg", hasTax: true, isHalal: true },
  { id: 'p-short-ribs', name: "Beef Short Ribs", price: 1150, category: "Raw Meat", image: "/shortribsraw.jpg", isHalal: true },
  { id: 'p-mince-premium', name: "Premium Beef Mince", price: 950, category: "Raw Meat", image: "/mincedmeatraw.jpg", isHalal: true },
  { id: 'p-mutton-chops', name: "Mutton Chops", price: 1100, category: "Raw Meat", image: "/muttonchopsraw.jpg", isHalal: true },
  { id: 'p-mutton-ribs', name: "Mutton Ribs", price: 1050, category: "Raw Meat", image: "/muttonribsraw.jpg", isHalal: true },
  { id: 'p-beef-tongue-raw', name: "Beef Tongue Raw", price: 850, category: "Raw Meat", image: "/beefmuttonraw.jpg", isHalal: true },
  { id: 'p-lamb-chops', name: "Prime Lamb Chops", price: 1300, category: "Raw Meat", image: "/primelambchopsraw.jpg", isHalal: true },
  { id: 'p-steak-v2', name: "Select Beef Slice", price: 1050, category: "Raw Meat", image: "/shortribsraw.jpg", hasTax: true, isHalal: true },
  
  // COOKED MEAT (16 Items)
  { id: 'c-beef-wet-1kg', name: "Beef Wet Fry 1kg", price: 1400, category: "Cooked Meat", image: "/images (41).jpg", isHalal: true },
  { id: 'c-goat-wet-1kg', name: "Goat Wet Fry 1kg", price: 1400, category: "Cooked Meat", image: "/images (43).jpg", isHalal: true },
  { id: 'c-goat-choma-1kg', name: "Goat Choma 1kg", price: 1400, category: "Cooked Meat", image: "/goatchoma.jpg", isHalal: true },
  { id: 'c-ulimi-cow', name: "Full Ulimi Cow", price: 1400, category: "Cooked Meat", image: "/images (46).jpg", isHalal: true },
  { id: 'p2', name: "Beef Choma 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF CHOMA.jpg", isHalal: true },
  { id: 'p1', name: "BEEF CHEMSHA 1KG", price: 1400, category: "Cooked Meat", image: "/images (44).jpg", isHalal: true },
  { id: 'p3', name: "Beef dry fry 1kg", price: 1400, category: "Cooked Meat", image: "/BEEF DRY FRY.jpg", isHalal: true },
  { id: 'p6', name: "Full chicken choma", price: 1000, category: "Cooked Meat", image: "/FULL CHICKEN CHOMA.jpg", isHalal: true },
  { id: 'p5', name: "Crispy Chips", price: 200, category: "Cooked Meat", image: "/CHIPS.jpg", isHalal: true },
  { id: 'c-matumbo-wet', name: "Matumbo Wet Fry", price: 900, category: "Cooked Meat", image: "/matumbofry.jpg", isHalal: true },
  { id: 'c-sausage-platter', name: "Sausage Platter", price: 800, category: "Cooked Meat", image: "/sausageplatter.jpg", isHalal: true },
  { id: 'c-kuku-14', name: "Kuku Choma 1/4", price: 350, category: "Cooked Meat", image: "/kukucoma1-4.jpg", isHalal: true },
  { id: 'c-beef-stew', name: "Beef Stew Node", price: 1200, category: "Cooked Meat", image: "/beefsoup.jpg", isHalal: true },
  { id: 'c-matumbo-dry', name: "Matumbo Dry Fry", price: 900, category: "Cooked Meat", image: "/matumbofry.jpg", isHalal: true },
  { id: 'c-mguu-cow', name: "Full Mguu Cow", price: 400, category: "Cooked Meat", image: "/images (46).jpg", isHalal: true },
  { id: 'c-kichwa-goat', name: "Full Kichwa Goat", price: 800, category: "Cooked Meat", image: "/goatchoma.jpg", isHalal: true },
  
  // GROCERY (16 Items)
  { id: 'g-onions', name: "Red Onions 1kg", price: 150, category: "Grocery", image: "/redonion.jpg" },
  { id: 'g-tomatoes', name: "Fresh Tomatoes 1kg", price: 200, category: "Grocery", image: "/freshtomatoes.jpg" },
  { id: 'g-garlic', name: "Garlic Pack", price: 100, category: "Grocery", image: "/freshgarlic.jpg" },
  { id: 'g-cabbage', name: "Green Cabbage", price: 80, category: "Grocery", image: "/greencabbage.jpg" },
  { id: 'g-sukuma', name: "Sukuma Wiki", price: 50, category: "Grocery", image: "https://picsum.photos/seed/sukuma/600/600" },
  { id: 'g-spinach', name: "Fresh Spinach", price: 60, category: "Grocery", image: "https://picsum.photos/seed/spinach/600/600" },
  { id: 'g-carrots', name: "Carrots 1kg", price: 120, category: "Grocery", image: "/carrots1kg.jpg" },
  { id: 'g-potatoes', name: "Potatoes 5kg Bag", price: 650, category: "Grocery", image: "/potatoesraw.jpg" },
  { id: 'g-ginger', name: "Ginger Pack", price: 100, category: "Grocery", image: "/gingerpack.jpg" },
  { id: 'g-avocado', name: "Ripe Avocado", price: 50, category: "Grocery", image: "/ripeavocado.jpg" },
  { id: 'g-lemons', name: "Lemons Pack", price: 100, category: "Grocery", image: "/lemonspack.jpg" },
  { id: 'g-eggs', name: "Farm Fresh Eggs 15pk", price: 350, category: "Grocery", image: "/farmfresheggs.jpg" },
  { id: 'g-milk', name: "Fresh Milk 1L", price: 100, category: "Grocery", image: "/freshmilk1l.jpg" },
  { id: 'g-sugar', name: "Local Sugar 1kg", price: 180, category: "Grocery", image: "/localsugar.jpg" },
  { id: 'g-bread', name: "Whole Grain Bread", price: 85, category: "Grocery", image: "/wholegrainbread.jpg" },
  { id: 'g-veg-v2', name: "Soup Mix Box", price: 450, category: "Grocery", image: "/greencabbage.jpg" },

  // SODAS (16 Items)
  { id: 'd1-coke-150', name: "Coca-Cola Take Away", price: 150, category: "Sodas", image: "/images (54).jpg", isHalal: true },
  { id: 'd2-fanta-orange', name: "Fanta Orange Take Away", price: 150, category: "Sodas", image: "/fantafgdf.jpg", isHalal: true },
  { id: 'd-water-500', name: "Keringet Water 500ml", price: 70, category: "Sodas", image: "/keringetwater.jpg" },
  { id: 'd-sprite-takeaway', name: "Sprite Take Away", price: 150, category: "Sodas", image: "/spritetakeaway.jpg" },
  { id: 'd-stoney', name: "Stoney Tangawizi", price: 150, category: "Sodas", image: "https://picsum.photos/seed/stoney/600/600" },
  { id: 'd-krest', name: "Krest Bitter Lemon", price: 150, category: "Sodas", image: "/images (53).jpg" },
  { id: 'd-coke-zero', name: "Coke Zero 500ml", price: 150, category: "Sodas", image: "/images (54).jpg" },
  { id: 'd-fanta-blackcurrant', name: "Fanta Blackcurrant", price: 150, category: "Sodas", image: "/images (55).jpg", isHalal: true },
  { id: 'd-stoney-500', name: "Stoney 500ml", price: 80, category: "Sodas", image: "/stoney500ml.jpg" },
  { id: 'd-sprite-zero', name: "Sprite Zero 500ml", price: 150, category: "Sodas", image: "https://picsum.photos/seed/spritezero/600/600" },
  { id: 'd-schweppes', name: "Schweppes Tonic", price: 150, category: "Sodas", image: "/schweppestonic.jpg" },
  { id: 'd-mountain-dew', name: "Mountain Dew", price: 150, category: "Sodas", image: "/mountaindew.jpg" },
  { id: 'd-7up', name: "7UP Lemon Lime", price: 150, category: "Sodas", image: "/7uplemonlime.jpg" },
  { id: 'd-mirinda', name: "Mirinda Fruity", price: 150, category: "Sodas", image: "/mirindafruity.jpg" },
  { id: 'd-pepsi', name: "Pepsi Classic", price: 150, category: "Sodas", image: "/pepsiclassic.jpg" },
  { id: 'd-diet-coke', name: "Diet Coke 500ml", price: 150, category: "Sodas", image: "/dietcoke.jpg" },

  // FINE WOOD KITCHEN (16 Items)
  { id: 'fw-cutting-board', name: "Artisan Cutting Board", price: 1800, category: "Fine Wood Kitchen", image: "/artisancutting.jpg" },
  { id: 'fw-salad-bowl', name: "Hand-Carved Salad Bowl", price: 2500, category: "Fine Wood Kitchen", image: "/handcraftedbowl.jpg" },
  { id: 'fw-utensil-set', name: "5-Piece Utensil Set", price: 1500, category: "Fine Wood Kitchen", image: "/5-pieces utensil set.jpg" },
  { id: 'fw-spice-rack', name: "Wooden Spice Rack", price: 3500, category: "Fine Wood Kitchen", image: "/35c4c70c970c97afed957e00386b6dc0.jpg" },
  { id: 'fw-napkin', name: "Artisan Napkin Holder", price: 950, category: "Fine Wood Kitchen", image: "/artisannapkins.jpg" },
  { id: 'fw-fruit-stand', name: "Handcrafted Fruit Stand", price: 2800, category: "Fine Wood Kitchen", image: "/handcraftedfruitsatnd.jpg" },
  { id: 'fw-bread-box', name: "Artisan Bread Box", price: 3200, category: "Fine Wood Kitchen", image: "/artisanbreadbox.jpg" },
  { id: 'fw-knife-block', name: "Elite Knife Block", price: 4500, category: "Fine Wood Kitchen", image: "/artisankniveblock.jpg" },
  { id: 'fw-wall-shelf', name: "Kitchen Wall Shelf", price: 5500, category: "Fine Wood Kitchen", image: "/kitchenwallshelf.jpg" },
  { id: 'fw-wood-spoons', name: "Carved Wood Spoons", price: 800, category: "Fine Wood Kitchen", image: "/curvedwoodspoon.jpg" },
  { id: 'fw-tray-v2', name: "Serving Tray XL", price: 2100, category: "Fine Wood Kitchen", image: "/gourmentserving.jpg" },
  { id: 'fw-mortar-v2', name: "Artisan Mortar", price: 1600, category: "Fine Wood Kitchen", image: "/woodenmortaland pestele.jpg" },
  { id: 'fw-pin-v2', name: "Elite Rolling Pin", price: 1100, category: "Fine Wood Kitchen", image: "https://picsum.photos/seed/rollingpin/600/600" },
  { id: 'fw-coasters-v2', name: "Artisan Coasters", price: 1200, category: "Fine Wood Kitchen", image: "/woodencoaster.jpg" },
  { id: 'fw-set-v2', name: "Kitchen Node Set", price: 3100, category: "Fine Wood Kitchen", image: "/kitchen3.jpg" },
  { id: 'fw-block-v2', name: "Magnetic Knife Node", price: 3800, category: "Fine Wood Kitchen", image: "/artisankniveblock.jpg" },

  // PHONE ACCESSORIES (16 Items)
  { id: 'ph-cable', name: "Ultra-Sync Data Cable", price: 800, category: "Phone Accessories", image: "https://picsum.photos/seed/cable/600/600" },
  { id: 'ph-earbuds', name: "Wireless Earbuds HD", price: 4500, category: "Phone Accessories", image: "https://picsum.photos/seed/earbuds/600/600" },
  { id: 'ph-case', name: "Titanium Phone Case", price: 1200, category: "Phone Accessories", image: "https://picsum.photos/seed/case/600/600" },
  { id: 'ph-mount', name: "Magnetic Car Mount", price: 1500, category: "Phone Accessories", image: "https://picsum.photos/seed/mount/600/600" },
  { id: 'ph-screen-guard', name: "Universal Screen Guard", price: 500, category: "Phone Accessories", image: "https://picsum.photos/seed/guard/600/600" },
  { id: 'ph-charger', name: "Travel Fast Charger", price: 2200, category: "Phone Accessories", image: "https://picsum.photos/seed/charger/600/600" },
  { id: 'ph-node-v2', name: "Elite Docking Node", price: 3500, category: "Phone Accessories", image: "/phoneaccessories.jpg" },
  { id: 'ph-power-v2', name: "Titan Powerbank 20k", price: 5500, category: "Phone Accessories", image: "/powerbank.jpg" },
  { id: 'ph-privacy-v2', name: "Privacy Guard XL", price: 1100, category: "Phone Accessories", image: "https://picsum.photos/seed/privacy/600/600" },
  { id: 'ph-stick-v2', name: "Pro Selfie Node", price: 1800, category: "Phone Accessories", image: "https://picsum.photos/seed/selfie/600/600" },
  { id: 'ph-stand-v2', name: "Desktop Node Stand", price: 1400, category: "Phone Accessories", image: "https://picsum.photos/seed/deskstand/600/600" },
  { id: 'ph-vr-v2', name: "HD Mobile VR Node", price: 6500, category: "Phone Accessories", image: "https://picsum.photos/seed/vr/600/600" },
  { id: 'ph-strap-v2', name: "Sport Watch Node", price: 900, category: "Phone Accessories", image: "https://picsum.photos/seed/watchstrap/600/600" },
  { id: 'ph-tablet-v2', name: "Rugged Tablet Node", price: 2500, category: "Phone Accessories", image: "https://picsum.photos/seed/tabletcase/600/600" },
  { id: 'ph-kb-v2', name: "Wireless Data Node", price: 4200, category: "Phone Accessories", image: "https://picsum.photos/seed/keyboard/600/600" },
  { id: 'ph-pad-v2', name: "Precision Surface Node", price: 1200, category: "Phone Accessories", image: "https://picsum.photos/seed/mousepad/600/600" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Autoplay was prevented", error);
      });
    }
  }, [isMounted]);

  const handleAdd = (p: any) => {
    addToCart({ 
      id: p.id, 
      restaurantId: 'r1', 
      name: p.name, 
      price: p.price, 
      imageUrl: p.image, 
      category: p.category,
      description: '',
      hasTax: p.hasTax
    });
    toast({ title: "READY", description: `${p.name} added to basket.` });
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    if (id === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 140; 
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white">
      {/* Promotional Banner Node */}
      <div className="w-full px-0 mb-4 mt-20 md:mt-24">
        <div className="relative w-full h-[180px] md:h-[320px] lg:h-[400px] rounded-none overflow-hidden bg-black shadow-2xl group cursor-pointer">
          <Image 
            src="https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=2000" 
            alt="Promotional Banner" 
            fill 
            className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
            priority
            data-ai-hint="grilling meat"
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-16 z-20 w-24 h-24 md:w-48 md:h-48 rounded-full overflow-hidden border-2 md:border-8 border-white shadow-2xl bg-white flex items-center justify-center animate-in zoom-in duration-700 delay-500">
            <Image 
              src="/images (45).jpg" 
              alt="100% Halal Certified" 
              fill 
              className="object-contain p-2 md:p-6"
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-16 text-left">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[11px] font-black uppercase tracking-widest mb-4">
              <Tag className="w-3 h-3 md:w-4 h-4" /> Special Offer
            </div>
            <h2 className="text-xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-3">
              STEAK WEST BUTCHERY
            </h2>
            <p className="text-[10px] md:text-lg font-bold text-white/70 uppercase tracking-widest flex items-center gap-3">
              Save up to 20% on raw cuts <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Header Node */}
      <div className="sticky top-20 md:top-24 z-30 bg-white/95 backdrop-blur-xl border-b px-0 py-3 md:py-6">
        <div className="w-full mx-auto space-y-4 md:space-y-6 px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
             <div className="relative flex-grow max-w-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input 
                  placeholder="Search network..." 
                  className="w-full h-10 md:h-14 pl-11 pr-4 bg-gray-50 border-none rounded-xl md:rounded-2xl text-[13px] md:text-[15px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
             
             <div className="relative group overflow-hidden">
                <div 
                  ref={scrollRef}
                  className="flex gap-2 overflow-x-auto no-scrollbar pb-1 scroll-smooth"
                >
                  <CategoryTab label="All Dispatches" isActive={activeTab === 'All'} onClick={() => scrollToSection('All')} />
                  {CATEGORIES.map(cat => (
                    <CategoryTab key={cat.id} label={cat.label} isActive={activeTab === cat.id} onClick={() => scrollToSection(cat.id)} />
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Marketplace Grid - Edge to Edge Mobile 4 Column */}
      <div className="w-full mx-auto px-0 mt-2 space-y-8 md:space-y-12 pb-24 overflow-hidden">
        {CATEGORIES.map((category) => {
          const categoryProducts = ALL_PRODUCTS.filter(p => p.category === category.id && p.name.toLowerCase().includes(search.toLowerCase()));
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="scroll-mt-40">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 px-4 md:px-6 mb-1">
                <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] text-black flex items-center gap-2">
                  <category.icon className="w-3 h-3 md:w-4 md:h-4 text-primary" /> {category.id}
                </h2>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{categoryProducts.length} Items</span>
              </div>
              
              {/* HIGH DENSITY FLEX GRID: 25% width on mobile (4 per row), 16% on tablet, 12.5% on laptop */}
              <div className="flex flex-wrap w-full border-t border-l border-gray-100 overflow-hidden">
                {categoryProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="w-1/4 flex-[0_0_25%] md:w-1/6 md:flex-none lg:w-[12.5%] min-w-0 border-b border-r border-gray-100" 
                    onClick={() => window.location.href = `/products/${product.id}`}
                  >
                    <ProductCard product={product} onAdd={(e) => { e.stopPropagation(); handleAdd(product); }} />
                  </div>
                ))}
                
                {category.id === 'Grocery' && (
                  <div className="w-1/4 flex-[0_0_25%] md:w-1/6 md:flex-none lg:w-[12.5%] relative aspect-square rounded-none overflow-hidden bg-black border-b border-r border-gray-100">
                     <video ref={videoRef} autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-80">
                        <source src="/video.mp4" type="video/mp4" />
                     </video>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                     <div className="absolute bottom-2 left-2 flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-primary flex items-center justify-center animate-pulse">
                           <Play className="w-1.5 h-1.5 text-white fill-current ml-0.5" />
                        </div>
                        <div>
                           <p className="text-[6px] font-black text-white uppercase tracking-tighter leading-none">Fresh Market</p>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

function CategoryTab({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("px-4 h-9 md:h-10 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all shrink-0 whitespace-nowrap", isActive ? "bg-black text-white shadow-lg" : "bg-gray-50 text-gray-400 hover:text-black")}>
      {label}
    </button>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: (e: React.MouseEvent) => void }) {
  const getSafeUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return url.split('/').map(segment => encodeURIComponent(segment)).join('/');
  };

  return (
    <div className="w-full h-full flex flex-col group cursor-pointer overflow-hidden transition-all duration-300 bg-white hover:bg-gray-50">
      <div className="aspect-square relative bg-gray-50 overflow-hidden shrink-0">
        <Image 
          src={getSafeUrl(product.image)} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
          sizes="(max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw" 
          quality={100} 
          unoptimized={true} 
        />
        {product.isHalal && (
          <div className="absolute top-1 left-1 z-10 w-5 h-5 md:w-8 md:h-8 rounded-full overflow-hidden border border-white shadow-lg bg-white">
            <Image src="/images (45).jpg" alt="Halal Certified" fill className="object-contain p-0.5" />
          </div>
        )}
        <button 
          onClick={onAdd} 
          className="absolute bottom-1 right-1 w-6 h-6 md:w-9 md:h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-primary shadow-lg transition-all z-20 active:scale-90 border border-gray-100"
        >
          <Plus className="w-3 h-3 md:w-5 md:h-5 stroke-[3px]" />
        </button>
      </div>
      <div className="p-2 md:p-4 flex-grow flex flex-col justify-between space-y-1 min-w-0">
        <div className="space-y-0.5 min-w-0">
          <p className="text-[11px] md:text-[13px] font-black uppercase tracking-tighter truncate leading-tight group-hover:text-primary transition-colors">{product.name}</p>
          <p className="text-[7px] md:text-[9px] text-gray-400 font-bold uppercase tracking-widest truncate">{product.category}</p>
        </div>
        <div className="flex items-center gap-1 min-w-0 overflow-hidden">
          <p className="text-[12px] md:text-[16px] font-black text-black whitespace-nowrap">KES {product.price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
