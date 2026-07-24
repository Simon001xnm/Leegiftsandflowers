'use client';

import React from "react";
import { motion } from "framer-motion";
import { 
  Plus,
  MapPin,
  Tag,
  TrendingUp,
  Zap,
  ShoppingBag
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
  { id: 'd1', name: "Premium refreshment one", price: 150, image: "/From Klickpin.com- 944418984376291262-pin-id-944418984376291262-story-1.jpg" },
  { id: 'd2', name: "Elite juice blend", price: 220, image: "/From Klickpin.com- 599330662967424085-pin-id-599330662967424085.jpg" },
  { id: 'd3', name: "Sparkling hydration", price: 100, image: "/From Klickpin.com- 10836855347433280-pin-id-10836855347433280.jpg" },
  { id: 'd4', name: "Fresh node nectar", price: 180, image: "/From Klickpin.com- 6966574420736490-pin-id-6966574420736490-story-1.jpg" },
  { id: 'd5', name: "Signature berry sync", price: 250, image: "/From Klickpin.com- 50524827070351339-pin-id-50524827070351339-story-1.jpg" },
  { id: 'd6', name: "Tropical dispatch", price: 200, image: "/From Klickpin.com- 141019032077665218-pin-id-141019032077665218.jpg" },
  { id: 'd7', name: "Classic cola 500ml", price: 80, image: "/From Klickpin.com- 944418984376291262-pin-id-944418984376291262-story-1.jpg" },
  { id: 'd8', name: "Fanta orange twist", price: 80, image: "/From Klickpin.com- 599330662967424085-pin-id-599330662967424085.jpg" },
  { id: 'd9', name: "Minute maid fruit", price: 120, image: "/From Klickpin.com- 10836855347433280-pin-id-10836855347433280.jpg" },
  { id: 'd10', name: "Keringet mineral 500ml", price: 50, image: "/From Klickpin.com- 6966574420736490-pin-id-6966574420736490-story-1.jpg" },
  { id: 'd11', name: "Del monte mango 1l", price: 220, image: "/From Klickpin.com- 50524827070351339-pin-id-50524827070351339-story-1.jpg" },
  { id: 'd12', name: "Soda water mixer", price: 90, image: "/From Klickpin.com- 141019032077665218-pin-id-141019032077665218.jpg" },
  { id: 'd13', name: "Stoney ginger 500ml", price: 85, image: "/From Klickpin.com- 944418984376291262-pin-id-944418984376291262-story-1.jpg" },
  { id: 'd14', name: "Fresh passion quart", price: 150, image: "/From Klickpin.com- 599330662967424085-pin-id-599330662967424085.jpg" },
  { id: 'd15', name: "Sprite lemon lime", price: 80, image: "/From Klickpin.com- 10836855347433280-pin-id-10836855347433280.jpg" },
  { id: 'd16', name: "Coke zero sugar", price: 90, image: "/From Klickpin.com- 141019032077665218-pin-id-141019032077665218.jpg" }
];

const FINEWOOD_PRODUCTS = [
  { id: 'f1', name: "Premium Decor Piece", price: 2500, image: "/wddf.jpg" },
  { id: 'f2', name: "Modern Home Utility", price: 4200, image: "/wdff.jpg" },
  { id: 'f3', name: "Elegant Accessory", price: 1500, image: "/wdffc.jpg" },
  { id: 'f4', name: "Bespoke Finishing", price: 3800, image: "/wfhfjj.jpg" },
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
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-black overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src="/From%20Klickpin.com-%20833517843581501058-pin-id-833517843581501058%20(1).mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-12 text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl bg-white/5 backdrop-blur-xl p-2 rounded-[2rem] border border-white/10 shadow-2xl">
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

            <div className="flex justify-start gap-4 md:gap-12">
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
        <section className="py-2">
          <div className="flex items-center justify-between border-b-2 border-black/5 pb-2 mb-0">
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
        <section className="py-2">
          <div className="flex items-center justify-between border-b-2 border-black/5 pb-2 mb-0">
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
        <section className="py-2">
          <div className="flex items-center justify-between border-b-2 border-black/5 pb-2 mb-0">
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

        {/* Finewood Marquee Section - CLEAN TYPOGRAPHIC SIGNATURE */}
        <section className="pb-4 pt-2">
          <div className="border-b-2 border-black/5 pb-2 mb-2 text-center">
            <span className="text-[10px] md:text-[22px] font-black text-black uppercase tracking-tight leading-tight block">
              your plug for home appliances, phones and accessories.
            </span>
          </div>
          <ProductMarquee />
        </section>

      </main>

      {/* Footer - SYMMETRIC LOGO SPREAD & VERTICAL INFO STACK */}
      <footer className="bg-black py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 items-center">
             {/* Left: WORDS (Information) - STRICT VERTICAL STACK */}
             <div className="md:col-span-5 flex flex-col">
                <div className="text-[15px] text-white font-medium space-y-1">
                    <p>Nairobi West, Nairobi, Kenya</p>
                    <p className="text-white/40">P. O Box 7144- 00200</p>
                    <div className="pt-2 flex flex-col space-y-1">
                      <p className="text-primary font-bold">0722522346</p>
                      <p className="text-white/40 lowercase">Info@steakwestbutchery.co.ke</p>
                    </div>
                </div>
             </div>

             {/* Right: LOGOS - SYMMETRIC HORIZONTAL SPREAD */}
             <div className="md:col-span-7 w-full pt-10 md:pt-0">
                <div className="flex flex-row items-center justify-between w-full gap-4">
                  <div className="relative h-20 w-36 md:h-24 md:w-56 shrink-0">
                    <Image src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" alt="Steak West Brand" fill className="object-contain" />
                  </div>
                  <div className="relative h-20 w-36 md:h-24 md:w-56 shrink-0">
                    <Image src="/finewood deco merchants 2.png" alt="Finewood Deco" fill className="object-contain" />
                  </div>
                  <div className="relative h-16 w-28 md:h-20 md:w-44 shrink-0">
                    <Image src="/images.png" alt="Glovo" fill className="object-contain" />
                  </div>
                  <div className="relative h-16 w-28 md:h-20 md:w-44 shrink-0">
                    <Image src="/images (1).png" alt="Uber Eats / Bolt" fill className="object-contain" />
                  </div>
                </div>
             </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/5 hidden md:flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex flex-col md:flex-row items-center gap-6">
               <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest">
                 © 2026 Steak West Butchery | SUPA YA NYAMA
               </p>
               <div className="flex gap-8">
                 <Link href="/privacy" className="text-[10px] font-medium text-white/30 hover:text-white uppercase tracking-widest">Privacy</Link>
                 <Link href="/terms" className="text-[10px] font-medium text-white/30 hover:text-white uppercase tracking-widest">Terms</Link>
               </div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductMarquee() {
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
    <div className="pt-8 pb-0 overflow-hidden bg-gray-50/50 border border-gray-100">
      <div className="flex">
        <motion.div 
          className="flex"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...FINEWOOD_PRODUCTS, ...FINEWOOD_PRODUCTS, ...FINEWOOD_PRODUCTS, ...FINEWOOD_PRODUCTS, ...FINEWOOD_PRODUCTS, ...FINEWOOD_PRODUCTS].map((p, i) => (
            <div 
              key={`${p.id}-${i}`} 
              className="w-[180px] md:w-[220px] shrink-0 border-r border-gray-100 last:border-r-0"
            >
              <ProductCard product={p} onAdd={handleAddToCart} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Stat({ node, label, isGold }: { node: string, label: string, isGold?: boolean }) {
  return (
    <div className="text-white text-center sm:text-left">
      <h3 className={cn(
        "text-xl md:text-4xl font-bold leading-none mb-1 transition-all duration-700",
        isGold && "bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)] animate-pulse"
      )}>{node}</h3>
      <p className="text-[9px] md:text-[11px] font-medium text-white/70 uppercase tracking-widest">{label}</p>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: (p: any) => void }) {
  return (
    <motion.div 
      className="flex flex-col group bg-white relative z-0 overflow-hidden"
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
