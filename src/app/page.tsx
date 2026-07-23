'use client';

import React from "react";
import { motion } from "framer-motion";
import { 
  Plus,
  MapPin,
  Tag,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const products = [
  // FLASH DEALS (0-15)
  { id: 'p1', name: "58 Spiced orange gin & tonic", price: 99, oldPrice: 300, discount: "-67%", image: "https://picsum.photos/seed/drink1/300/300" },
  { id: 'p2', name: "Kenyan originals apple cider", price: 99, oldPrice: 250, discount: "-60%", image: "https://picsum.photos/seed/drink2/300/300" },
  { id: 'p3', name: "KO dry cider premium", price: 99, oldPrice: 200, discount: "-50%", image: "https://picsum.photos/seed/drink3/300/300" },
  { id: 'p4', name: "Outlet kings sliced sandwich", price: 62.5, oldPrice: 125, discount: "-50%", image: "https://picsum.photos/seed/bread/300/300" },
  { id: 'p5', name: "KC lemon and ginger 750ml", price: 840, discount: "-15%", image: "https://picsum.photos/seed/sauce/300/300" },
  { id: 'p6', name: "Isinya eggs 20 pack", price: 458, image: "https://picsum.photos/seed/eggs/300/300" },
  { id: 'p7', name: "QMP beef cubes steak 1/2kg", price: 533, image: "https://picsum.photos/seed/beefcubes/300/300" },
  { id: 'p8', name: "Green farm yellow yolk eggs", price: 619, image: "https://picsum.photos/seed/eggs2/300/300" },
  { id: 'p9', name: "Premium T-Bone steak", price: 1200, oldPrice: 1500, discount: "-20%", image: "https://picsum.photos/seed/tbone/300/300" },
  { id: 'p10', name: "Fresh chicken wings 1kg", price: 550, image: "https://picsum.photos/seed/wings/300/300" },
  { id: 'p11', name: "Beef mince extra lean", price: 650, image: "https://picsum.photos/seed/mince/300/300" },
  { id: 'p12', name: "Goat meat choma cut", price: 750, image: "https://picsum.photos/seed/goat/300/300" },
  { id: 'p13', name: "Lamb chops signature", price: 950, oldPrice: 1100, discount: "-13%", image: "https://picsum.photos/seed/lamb/300/300" },
  { id: 'p14', name: "Pork belly ribs 1kg", price: 880, image: "https://picsum.photos/seed/pork/300/300" },
  { id: 'p15', name: "Whole tilapia fish", price: 450, oldPrice: 600, discount: "-25%", image: "https://picsum.photos/seed/fish/300/300" },
  { id: 'p16', name: "Beef sirloin roast", price: 1400, image: "https://picsum.photos/seed/sirloin/300/300" },
  
  // ELITE SELECTION (16-31)
  { id: 'p17', name: "Wagyu style ribeye cut", price: 2500, image: "https://picsum.photos/seed/ribeye/300/300" },
  { id: 'p18', name: "Organic chicken thighs", price: 680, image: "https://picsum.photos/seed/thighs/300/300" },
  { id: 'p19', name: "Mutton shoulder pack", price: 1100, image: "https://picsum.photos/seed/mutton/300/300" },
  { id: 'p20', name: "Smoked beef sausages", price: 400, image: "https://picsum.photos/seed/sausage/300/300" },
  { id: 'p21', name: "Gourmet beef burger patties", price: 850, image: "https://picsum.photos/seed/burger/300/300" },
  { id: 'p22', name: "Pork chops center cut", price: 780, image: "https://picsum.photos/seed/porkchops/300/300" },
  { id: 'p23', name: "Dressed whole duck", price: 1800, image: "https://picsum.photos/seed/duck/300/300" },
  { id: 'p24', name: "Beef liver fresh cut", price: 500, image: "https://picsum.photos/seed/liver/300/300" },
  { id: 'p25', name: "Marinated chicken drumsticks", price: 720, image: "https://picsum.photos/seed/drumstick/300/300" },
  { id: 'p26', name: "Beef fillet mignon", price: 1950, image: "https://picsum.photos/seed/fillet/300/300" },
  { id: 'p27', name: "Goat leg whole", price: 1600, image: "https://picsum.photos/seed/goatleg/300/300" },
  { id: 'p28', name: "Bacon strip premium", price: 650, image: "https://picsum.photos/seed/bacon/300/300" },
  { id: 'p29', name: "Beef short ribs 1kg", price: 1250, image: "https://picsum.photos/seed/shortribs/300/300" },
  { id: 'p30', name: "Assorted meatballs pack", price: 550, image: "https://picsum.photos/seed/meatballs/300/300" },
  { id: 'p31', name: "Pork fillet tenderloin", price: 980, image: "https://picsum.photos/seed/tenderloin/300/300" },
  { id: 'p32', name: "Beef skewers ready-to-grill", price: 850, image: "https://picsum.photos/seed/skewers/300/300" }
];

export default function App() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (p: any) => {
    addToCart({
      id: p.id,
      restaurantId: 'r1',
      name: p.name,
      price: p.price,
      description: '',
      imageUrl: p.image,
      category: 'Selection'
    });
    toast({ title: "Added", description: p.name });
  };

  return (
    <div className="bg-white text-black min-h-screen font-body selection:bg-red-600 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative h-[65vh] min-h-[550px] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
            alt="Hero Meat" 
            fill 
            className="object-cover opacity-60"
            priority
            data-ai-hint="raw steak"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
          {/* Hero text removed as requested */}

          <div className="flex flex-col md:flex-row items-center gap-4 max-w-2xl mx-auto bg-white rounded-3xl p-2 shadow-2xl border-4 border-white/10">
            <div className="flex items-center gap-3 px-6 py-4 flex-grow w-full">
              <MapPin className="text-red-600 w-6 h-6 shrink-0" />
              <input 
                placeholder="Enter delivery location" 
                className="w-full bg-transparent outline-none text-black text-[14px] font-medium placeholder:text-gray-400"
              />
            </div>
            <Button className="w-full md:w-auto h-16 px-12 bg-red-600 hover:bg-red-700 text-white rounded-[1.5rem] font-bold text-[13px] shadow-xl transition-all active:scale-95">
              Order Now
            </Button>
          </div>

          <div className="flex justify-center gap-8 md:gap-16 pt-8">
             <Stat node="10K+" label="Customers" isGold />
             <Stat node="50+" label="Products" isGold />
             <Stat node="4.8★" label="Rating" isGold />
          </div>
        </div>
      </section>

      {/* RETAIL DISCOVERY GRID */}
      <main className="container mx-auto px-4">
        
        {/* PROMOTIONS - 16 PRODUCTS */}
        <section>
          <div className="flex items-center justify-between border-b-2 border-black/5 py-4">
            <div className="flex items-center gap-3">
               <Tag className="w-5 h-5 text-red-600" />
               <h2 className="text-2xl font-bold tracking-tight">Flash Deals</h2>
            </div>
            <Button variant="ghost" className="font-medium text-[12px] hover:text-red-600">View All</Button>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0 border-l border-gray-100">
            {products.slice(0, 16).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* BEST SELLERS - 16 PRODUCTS */}
        <section>
          <div className="flex items-center justify-between border-b-2 border-black/5 py-4">
            <div className="flex items-center gap-3">
               <TrendingUp className="w-5 h-5 text-red-600" />
               <h2 className="text-2xl font-bold tracking-tight">Elite Selection</h2>
            </div>
            <Button variant="ghost" className="font-medium text-[12px] hover:text-red-600">Explore</Button>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0 border-l border-gray-100 pb-12">
            {products.slice(16, 32).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER MINI */}
      <footer className="bg-black py-8 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[11px] font-medium text-white/30 tracking-wide">© 2026 Steak West Network</p>
           <div className="flex gap-8">
             <Link href="/privacy" className="text-[11px] font-medium text-white/50 hover:text-white">Privacy</Link>
             <Link href="/terms" className="text-[11px] font-medium text-white/50 hover:text-white">Terms</Link>
             <span className="text-red-600 font-bold text-[11px]">+254 704 524070</span>
           </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ node, label, isGold }: { node: string, label: string, isGold?: boolean }) {
  return (
    <div className="text-white">
      <h3 className={cn(
        "text-2xl md:text-4xl font-bold leading-none mb-1 transition-all duration-700",
        isGold && "bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)] animate-pulse"
      )}>{node}</h3>
      <p className="text-[11px] font-medium text-white/70">{label}</p>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: (p: any) => void }) {
  return (
    <motion.div 
      className="flex flex-col group border-r border-b border-gray-100 bg-white relative z-0 overflow-hidden"
      whileHover={{ 
        scale: [1, 1.04, 1],
        zIndex: 10,
        transition: { 
          repeat: Infinity, 
          duration: 0.8,
          ease: "easeInOut"
        }
      }}
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden transition-colors duration-500 group-hover:bg-white">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
          data-ai-hint="product image"
        />

        {product.discount && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-lg">
              {product.discount}
            </span>
          </div>
        )}

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
          className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-xl hover:bg-red-600 hover:text-white hover:scale-110 active:scale-90 transition-all z-20 group/btn"
        >
          <Plus className="w-5 h-5 md:w-6 md:h-6 text-red-600 group-hover/btn:text-white stroke-[3px]" />
        </button>
      </div>

      <div className="space-y-1 p-3 md:p-4 bg-white">
        <h3 className="text-[11px] md:text-[13px] font-medium text-gray-700 line-clamp-2 leading-tight min-h-[2.4em]">
          {product.name}
        </h3>
        <div className="flex flex-col">
          <span className="text-[12px] md:text-[14px] font-bold text-black">
            KSh {product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-[10px] md:text-[11px] text-gray-400 line-through font-normal">
              KSh {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
