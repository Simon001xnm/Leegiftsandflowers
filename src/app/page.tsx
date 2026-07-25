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
    <div className="bg-white text-black min-h-screen font-body selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Hero section - FULLY RESPONSIVE */}
      <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-center justify-center bg-black overflow-hidden pt-24 pb-12">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 md:space-y-12 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                THE MEAT NETWORK <br className="hidden lg:block" /> OF NAIROBI.
              </h1>
              <p className="text-white/60 text-sm md:text-lg font-bold uppercase tracking-widest">
                Elite Dispatch in under 25 minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl bg-white/5 backdrop-blur-xl p-2 rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 px-6 py-4 flex-grow w-full">
                <MapPin className="text-red-600 w-6 h-6 shrink-0" />
                <input 
                  placeholder="Set delivery location" 
                  className="w-full bg-transparent outline-none text-white text-[14px] font-medium placeholder:text-white/30 uppercase tracking-widest"
                />
              </div>
              <Button className="w-full sm:w-auto h-14 px-10 bg-red-600 hover:bg-red-700 text-white rounded-xl md:rounded-[1.8rem] font-bold text-[13px] shadow-xl transition-all active:scale-95 uppercase">
                Order now
              </Button>
            </div>

            <div className="flex justify-center md:justify-start gap-6 md:gap-12 w-full">
               <Stat node="10K+" label="Customers" isGold />
               <Stat node="50+" label="Products" isGold />
               <Stat node="4.8★" label="Rating" isGold />
            </div>
          </div>

          <div className="relative hidden md:block">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square w-full max-w-md mx-auto"
            >
              <Image 
                src="/BEEF CHOMA.jpg" 
                alt="Today's special" 
                fill 
                className="rounded-[3rem] object-cover shadow-2xl border-8 border-white/10"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-black p-6 rounded-[2rem] shadow-2xl border border-gray-100 animate-in zoom-in duration-700">
                <p className="text-[10px] font-black text-red-600 tracking-[0.2em] uppercase mb-1">Today's special</p>
                <h3 className="font-bold text-lg mb-1 uppercase">Premium BBQ pack</h3>
                <p className="font-black text-2xl">KSh 2,499</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Retail discovery grid - STRICT RESPONSIVE 2-3-4 */}
      <main className="w-full">
        
        {/* Flash deals */}
        <section className="py-16 max-w-[1400px] mx-auto w-full px-5">
          <div className="flex items-center justify-between border-b-2 border-black/5 pb-6 mb-10">
            <div className="flex items-center gap-3">
               <Tag className="w-6 h-6 text-red-600" />
               <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Flash deals</h2>
            </div>
            <Link href="/offers">
              <Button variant="ghost" className="font-black text-[12px] uppercase tracking-widest hover:text-red-600">View all</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.slice(0, 16).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* Elite selection */}
        <section className="py-16 max-w-[1400px] mx-auto w-full px-5">
          <div className="flex items-center justify-between border-b-2 border-black/5 pb-6 mb-10">
            <div className="flex items-center gap-3">
               <TrendingUp className="w-6 h-6 text-red-600" />
               <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Elite selection</h2>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="font-black text-[12px] uppercase tracking-widest hover:text-red-600">Explore</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.slice(16, 32).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* Drinks refreshment */}
        <section className="py-16 max-w-[1400px] mx-auto w-full px-5">
          <div className="flex items-center justify-between border-b-2 border-black/5 pb-6 mb-10">
            <div className="flex items-center gap-3">
               <Zap className="w-6 h-6 text-red-600" />
               <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Drinks refreshment</h2>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="font-black text-[12px] uppercase tracking-widest hover:text-red-600">View drinks</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.slice(32, 48).map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* Finewood Marquee Section - FULL WIDTH */}
        <section className="pb-16 pt-6">
          <div className="border-b-2 border-black/5 pb-8 mb-6 text-center px-6">
            <span className="text-[12px] md:text-[22px] font-black text-black uppercase tracking-tight leading-tight block">
              your plug for home appliances, phones and accessories.
            </span>
          </div>
          <ProductMarquee />
        </section>

      </main>

      {/* Footer - SYMMETRIC LOGO SPREAD & VERTICAL INFO STACK */}
      <footer className="bg-black py-20 border-t border-white/5">
        <div className="w-full px-6 max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">
             {/* Left: Information Stack */}
             <div className="md:col-span-5 flex flex-col">
                <div className="text-[15px] text-white font-medium space-y-1">
                    <p className="uppercase tracking-widest font-black text-[11px] text-white/30 mb-2">Main Node</p>
                    <p>Nairobi West, Nairobi, Kenya</p>
                    <p className="text-white/40">P. O Box 7144- 00200</p>
                    <div className="pt-4 flex flex-col space-y-1 border-t border-white/5 mt-4">
                      <p className="text-primary font-black text-xl">0722522346</p>
                      <p className="text-white/40 lowercase font-medium">Info@steakwestbutchery.co.ke</p>
                    </div>
                </div>
             </div>

             {/* Right: Partner Logos - SYMMETRIC SPREAD with margin constraint */}
             <div className="md:col-span-7 w-full pt-12 md:pt-0">
                <div className="flex flex-row items-center justify-between w-full gap-4 md:pr-12 max-w-4xl ml-auto">
                  <div className="relative h-14 w-28 lg:h-20 lg:w-48 shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
                    <Image src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" alt="Steak West Brand" fill className="object-contain" />
                  </div>
                  <div className="relative h-14 w-28 lg:h-20 lg:w-48 shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
                    <Image src="/finewood deco merchants 2.png" alt="Finewood Deco" fill className="object-contain" />
                  </div>
                  <div className="relative h-12 w-24 lg:h-16 lg:w-40 shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
                    <Image src="/images.png" alt="Glovo" fill className="object-contain" />
                  </div>
                  <div className="relative h-12 w-24 lg:h-16 lg:w-40 shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
                    <Image src="/images (1).png" alt="Uber Eats / Bolt" fill className="object-contain" />
                  </div>
                </div>
             </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/5 hidden md:flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex flex-col md:flex-row items-center gap-8">
               <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                 © 2026 Steak West Butchery | SUPA YA NYAMA
               </p>
               <div className="flex gap-10">
                 <Link href="/privacy" className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-[0.2em] transition-colors">Privacy</Link>
                 <Link href="/terms" className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-[0.2em] transition-colors">Terms</Link>
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
    <div className="pt-8 pb-0 overflow-hidden bg-gray-50/50 border-y border-gray-100">
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
              className="w-[200px] md:w-[320px] shrink-0 border-r border-gray-100 last:border-r-0 p-4 lg:p-6"
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
    <div className="text-white text-center md:text-left">
      <h3 className={cn(
        "text-2xl md:text-4xl font-black leading-none mb-1 transition-all duration-700",
        isGold && "bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)] animate-pulse"
      )}>{node}</h3>
      <p className="text-[10px] md:text-[11px] font-black text-white/50 uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: (p: any) => void }) {
  return (
    <div className="flex flex-col group bg-white relative z-0 overflow-hidden border border-gray-100 rounded-2xl w-full shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />

        {product.discount && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-widest">
              {product.discount}
            </span>
          </div>
        )}

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
          className="absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 hover:text-white transition-all z-20 group/btn"
        >
          <Plus className="w-5 h-5 md:w-6 md:h-6 text-red-600 group-hover/btn:text-white stroke-[3px]" />
        </button>
      </div>

      <div className="space-y-1 p-4 md:p-5 bg-white flex-grow flex flex-col justify-between border-t border-gray-50">
        <h3 className="text-[13px] md:text-sm font-bold text-gray-800 line-clamp-2 leading-tight uppercase tracking-tight">
          {product.name}
        </h3>
        <div className="flex flex-col pt-3">
          <span className="text-sm md:text-lg font-black text-black">
            KSh {product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-gray-400 line-through font-medium tracking-widest">
              KSh {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
