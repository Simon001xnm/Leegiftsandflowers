'use client';

import React from "react";
import { motion } from "framer-motion";
import { 
  Plus,
  MapPin,
  Tag,
  TrendingUp,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const products = [
  // Flash deals (16 items)
  { id: 'p1', name: "Beef chemsha 1kg", price: 1400, oldPrice: 1600, discount: "-14%", image: "/beef chemsha SMB.jpg" },
  { id: 'p2', name: "Beef choma 1kg", price: 1400, oldPrice: 1800, discount: "-12%", image: "/BEEF CHOMA.jpg" },
  { id: 'p3', name: "Beef dry fry 1kg", price: 1400, oldPrice: 1550, discount: "-10%", image: "/BEEF DRY FRY.jpg" },
  { id: 'p4', name: "Beef takeaway", price: 900, oldPrice: 1100, discount: "-18%", image: "/BEEF TAKEAWAY.jpg" },
  { id: 'p5', name: "Chips portion", price: 200, oldPrice: 250, discount: "-20%", image: "/CHIPS.jpg" },
  { id: 'p6', name: "Full chicken choma", price: 1000, oldPrice: 1200, discount: "-16%", image: "/FULL CHICKEN CHOMA.jpg" },
  { id: 'p7', name: "Full chicken", price: 700, oldPrice: 850, discount: "-17%", image: "/FULL CHICKEN.jpg" },
  { id: 'p8', name: "Full kichwa goat", price: 800, oldPrice: 1000, discount: "-20%", image: "/FULL KICHWA YA GOAT.jpg" },
  { id: 'p9', name: "Full mguu cow", price: 400, oldPrice: 500, discount: "-20%", image: "/FULL MGUU COW.jpg" },
  { id: 'p10', name: "Prime beef cubes", price: 533, oldPrice: 650, discount: "-18%", image: "/BEEF TAKEAWAY.jpg" },
  { id: 'p11', name: "Fresh wings bucket", price: 550, oldPrice: 700, discount: "-21%", image: "/FULL CHICKEN.jpg" },
  { id: 'p12', name: "Grilled ribs choma", price: 1400, oldPrice: 1700, discount: "-17%", image: "/BEEF CHOMA.jpg" },
  { id: 'p13', name: "Deluxe boiled cuts", price: 400, oldPrice: 600, discount: "-33%", image: "/FULL MGUU COW.jpg" },
  { id: 'p14', name: "Takeaway family pack", price: 2499, oldPrice: 3000, discount: "-17%", image: "/BEEF TAKEAWAY.jpg" },
  { id: 'p15', name: "Crispy snack chips", price: 200, oldPrice: 300, discount: "-33%", image: "/CHIPS.jpg" },
  { id: 'p16', name: "Signature goat head", price: 800, oldPrice: 1200, discount: "-33%", image: "/FULL KICHWA YA GOAT.jpg" },

  // Elite selection (16 items)
  { id: 'p17', name: "Premium beef chemsha", price: 1400, image: "/beef chemsha SMB.jpg" },
  { id: 'p18', name: "Select beef choma", price: 1400, image: "/BEEF CHOMA.jpg" },
  { id: 'p19', name: "Elite dry fry portion", price: 1400, image: "/BEEF DRY FRY.jpg" },
  { id: 'p20', name: "Butchery fresh takeaway", price: 900, image: "/BEEF TAKEAWAY.jpg" },
  { id: 'p21', name: "Platter of chips", price: 200, image: "/CHIPS.jpg" },
  { id: 'p22', name: "Grand chicken choma", price: 1000, image: "/FULL CHICKEN CHOMA.jpg" },
  { id: 'p23', name: "Farm fresh whole chicken", price: 700, image: "/FULL CHICKEN.jpg" },
  { id: 'p24', name: "Elite kichwa special", price: 800, image: "/FULL KICHWA YA GOAT.jpg" },
  { id: 'p25', name: "Special cow mguu", price: 400, image: "/FULL MGUU COW.jpg" },
  { id: 'p26', name: "Prime cuts selection", price: 1500, image: "/BEEF TAKEAWAY.jpg" },
  { id: 'p27', name: "Whole roast chicken", price: 700, image: "/FULL CHICKEN.jpg" },
  { id: 'p28', name: "Premium choma cuts", price: 1400, image: "/BEEF CHOMA.jpg" },
  { id: 'p29', name: "Dry fry family size", price: 1400, image: "/BEEF DRY FRY.jpg" },
  { id: 'p30', name: "Large chips pack", price: 400, image: "/CHIPS.jpg" },
  { id: 'p31', name: "Goat head elite", price: 800, image: "/FULL KICHWA YA GOAT.jpg" },
  { id: 'p32', name: "Boiled delicacies pack", price: 400, image: "/FULL MGUU COW.jpg" },

  // Drinks refreshment (16 items)
  { id: 'd1', name: "Coca Cola 500ml", price: 80, image: "https://picsum.photos/seed/cola/600/600" },
  { id: 'd2', name: "Fanta Orange 500ml", price: 80, image: "https://picsum.photos/seed/fanta/600/600" },
  { id: 'd3', name: "Sprite 500ml", price: 80, image: "https://picsum.photos/seed/sprite/600/600" },
  { id: 'd4', name: "Minute Maid 400ml", price: 120, image: "https://picsum.photos/seed/maid/600/600" },
  { id: 'd5', name: "Del Monte Mango 1L", price: 220, image: "https://picsum.photos/seed/mango/600/600" },
  { id: 'd6', name: "Afia Juice Mixed", price: 100, image: "https://picsum.photos/seed/afia/600/600" },
  { id: 'd7', name: "Coke Zero 500ml", price: 90, image: "https://picsum.photos/seed/zero/600/600" },
  { id: 'd8', name: "Keringet Water 500ml", price: 50, image: "https://picsum.photos/seed/water1/600/600" },
  { id: 'd9', name: "Pick N Peel 1L", price: 200, image: "https://picsum.photos/seed/pick/600/600" },
  { id: 'd10', name: "Quencher Juice 1L", price: 150, image: "https://picsum.photos/seed/quencher/600/600" },
  { id: 'd11', name: "Soda water 500ml", price: 70, image: "https://picsum.photos/seed/sodawater/600/600" },
  { id: 'd12', name: "Stoney ginger beer", price: 85, image: "https://picsum.photos/seed/stoney/600/600" },
  { id: 'd13', name: "Tonic water 500ml", price: 100, image: "https://picsum.photos/seed/tonic/600/600" },
  { id: 'd14', name: "Fresh passion juice", price: 150, image: "https://picsum.photos/seed/passion/600/600" },
  { id: 'd15', name: "Fresh mango juice", price: 150, image: "https://picsum.photos/seed/mangofresh/600/600" },
  { id: 'd16', name: "Keringet sparkling", price: 110, image: "https://picsum.photos/seed/sparkling/600/600" }
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
      {/* Hero section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-black overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
            alt="Hero meat" 
            fill 
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-12 text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-xl p-2 rounded-[2rem] border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 px-6 py-4 flex-grow w-full">
                <MapPin className="text-red-600 w-6 h-6 shrink-0" />
                <input 
                  placeholder="Set delivery location" 
                  className="w-full bg-transparent outline-none text-white text-[14px] font-medium placeholder:text-white/30"
                />
              </div>
              <Button className="w-full sm:w-auto h-14 px-10 bg-red-600 hover:bg-red-700 text-white rounded-[1.5rem] font-bold text-[13px] shadow-xl transition-all active:scale-95">
                Order now
              </Button>
            </div>

            <div className="flex justify-start gap-8 md:gap-12">
               <Stat node="10K+" label="Customers" isGold />
               <Stat node="50+" label="Products" isGold />
               <Stat node="4.8★" label="Rating" isGold />
            </div>
          </div>

          <div className="relative hidden md:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square w-full max-w-md mx-auto"
            >
              <Image 
                src="/BEEF CHOMA.jpg" 
                alt="Today's special" 
                fill 
                className="rounded-[3rem] object-cover shadow-2xl border-4 border-white/10"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-black p-6 rounded-[2rem] shadow-2xl border border-gray-100 animate-in zoom-in duration-700">
                <p className="text-[10px] font-medium text-red-600 tracking-wider mb-1">Today's special</p>
                <h3 className="font-medium text-lg mb-1">Premium BBQ pack</h3>
                <p className="font-bold text-xl">KSh 2,499</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Retail discovery grid */}
      <main className="container mx-auto px-4">
        
        {/* Flash deals */}
        <section className="py-12">
          <div className="flex items-center justify-between border-b-2 border-black/5 pb-4 mb-0">
            <div className="flex items-center gap-3">
               <Tag className="w-5 h-5 text-red-600" />
               <h2 className="text-2xl font-medium tracking-tight">Flash deals</h2>
            </div>
            <Link href="/offers">
              <Button variant="ghost" className="font-medium text-[12px] hover:text-red-600">View all</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0 border-l border-gray-100">
            {products.slice(0, 16).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* Elite selection */}
        <section className="pb-12">
          <div className="flex items-center justify-between border-b-2 border-black/5 pb-4 mb-0">
            <div className="flex items-center gap-3">
               <TrendingUp className="w-5 h-5 text-red-600" />
               <h2 className="text-2xl font-medium tracking-tight">Elite selection</h2>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="font-medium text-[12px] hover:text-red-600">Explore</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0 border-l border-gray-100">
            {products.slice(16, 32).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* Drinks refreshment */}
        <section className="pb-24">
          <div className="flex items-center justify-between border-b-2 border-black/5 pb-4 mb-0">
            <div className="flex items-center gap-3">
               <Zap className="w-5 h-5 text-red-600" />
               <h2 className="text-2xl font-medium tracking-tight">Drinks refreshment</h2>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="font-medium text-[12px] hover:text-red-600">View drinks</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0 border-l border-gray-100">
            {products.slice(32, 48).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

      </main>

      {/* Footer mini */}
      <footer className="bg-black py-8 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[11px] font-medium text-white/30 tracking-wide">
             © 2026 Steak West Butchery | <span className="italic">Supa ya nyama</span>
           </p>
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
