'use client';

import Link from "next/link";
import { PromotionalPopup } from "@/components/PromotionalPopup";
import { MOCK_MENU, MenuItem } from "@/lib/food-data";
import { 
  Award, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

/**
 * Main Landing Page - High-Conversion Eye-Catching Marketing
 */
export default function Home() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const allMeatProducts = MOCK_MENU;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PromotionalPopup />
      
      <main className="flex-grow p-0 space-y-0 pb-4">
        {/* Eye-Catching Hero Section */}
        <div className="relative min-h-[600px] md:h-[750px] w-full overflow-hidden bg-black flex items-center">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          >
            <source src="/From Klickpin.com- 833517843581501058-pin-id-833517843581501058 (1).mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

          <div className="relative z-10 w-full px-8 md:px-20 py-12">
            <div className="flex flex-col space-y-8 max-w-5xl">
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-6 duration-1000">
                <Badge className="bg-primary text-white border-none px-5 py-2 text-[12px] md:text-sm font-black uppercase tracking-[0.3em] w-fit rounded-none shadow-2xl">
                  SYSTEM ACTIVE // NAIROBI
                </Badge>
                <h1 className="text-5xl sm:text-7xl md:text-9xl font-black font-headline text-white tracking-tighter uppercase leading-[0.85]">
                  NAIROBI'S BEST<br />
                  <span className="text-primary italic">MEAT. FAST.</span>
                </h1>
              </div>

              <div className="max-w-2xl border-l-8 border-primary pl-10 space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                <p className="text-white text-xl md:text-2xl font-bold leading-tight uppercase">
                  Sourced daily. Delivered in 20 minutes. 100% Freshness Guaranteed.
                </p>
                <div className="flex items-center gap-6 text-white/40 font-black text-[10px] uppercase tracking-[0.5em]">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" /> SECURE_NETWORK
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-8 pt-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                <Link href="/restaurants" className="w-full sm:w-auto">
                  <Button className="h-20 md:h-24 px-12 md:px-20 bg-primary text-white hover:bg-white hover:text-black font-black shadow-2xl transition-all active:scale-95 text-[20px] uppercase tracking-[0.2em] w-full rounded-none group">
                    ORDER NOW <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-3 transition-transform" />
                  </Button>
                </Link>
                <Link href="/dashboard/customer" className="w-full sm:w-auto">
                  <Button variant="outline" className="h-20 md:h-24 px-12 md:px-16 border-4 border-white text-white hover:bg-white hover:text-black font-black transition-all text-[15px] uppercase tracking-widest bg-transparent w-full rounded-none backdrop-blur-md">
                    TRACK ORDERS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* High-Volume Market Grid */}
        <section className="bg-white p-8 md:p-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 border-b-8 border-black pb-10">
            <div className="space-y-4">
              <Badge className="bg-black text-white font-black uppercase tracking-[0.4em] text-[11px] px-5 py-2 rounded-none">LIVE INVENTORY</Badge>
              <h2 className="text-5xl md:text-8xl font-black text-black uppercase tracking-tighter leading-none">THE_MARKET</h2>
            </div>
            <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest max-w-sm text-right">
              FRESH CUTS FROM WESTLANDS. AVAILABLE FOR IMMEDIATE DISPATCH.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-l border-t border-black/5">
            {allMeatProducts.map((item, idx) => (
              <ProductCard key={item.id} item={item} idx={idx} addToCart={addToCart} toast={toast} />
            ))}
          </div>
        </section>

        {/* Professional Branding Footer */}
        <footer className="pt-32 border-t-8 border-black bg-black text-white pb-32">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
              <div className="col-span-2 space-y-10">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 bg-white p-2">
                    <Image src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" alt="Logo" fill className="object-contain p-2" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black tracking-tighter uppercase">Steak West</h4>
                    <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Super ya Nyama</p>
                  </div>
                </div>
                <p className="text-xl text-gray-500 font-bold uppercase leading-tight max-w-lg">
                  NAIROBI'S TRUSTED MEAT SOURCE. LOGISTICS-FIRST BUTCHERY.
                </p>
              </div>
              <div className="space-y-8">
                <h5 className="font-black text-[12px] uppercase tracking-[0.4em] text-gray-600">NETWORK</h5>
                <ul className="space-y-4 text-[13px] font-black uppercase tracking-widest">
                  <li><Link href="/restaurants" className="hover:text-primary transition-colors">MARKETPLACE</Link></li>
                  <li><Link href="/profile" className="hover:text-primary transition-colors">MY PROFILE</Link></li>
                  <li><Link href="/checkout" className="hover:text-primary transition-colors">BASKET</Link></li>
                </ul>
              </div>
              <div className="space-y-8">
                <h5 className="font-black text-[12px] uppercase tracking-[0.4em] text-gray-600">SECURITY</h5>
                <ul className="space-y-4 text-[13px] font-black uppercase tracking-widest text-gray-400">
                  <li>SSL PROTECTION</li>
                  <li>PRIVACY NODE</li>
                  <li>TERMS OF SALE</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-16 gap-10">
              <p className="text-[11px] text-gray-600 font-black uppercase tracking-[0.5em]">
                © 2026 STEAK WEST GLOBAL LOGISTICS.
              </p>
              <div className="flex items-center gap-10 opacity-20 filter grayscale">
                 <ShieldCheck className="w-8 h-8" />
                 <Award className="w-8 h-8" />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function ProductCard({ item, idx, addToCart, toast }: { item: MenuItem, idx: number, addToCart: any, toast: any }) {
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
    toast({
      title: "ADDED TO BASKET",
      description: `${item.name} ready for checkout.`,
    });
  };

  return (
    <div className="group flex flex-col space-y-0 border-r border-b border-black/10 bg-white rounded-none hover:z-10 transition-all relative">
      <Link href={`/products/${item.id}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-black text-white border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest rounded-none shadow-2xl">
            {idx % 4 === 0 ? "PRIME CUT" : "FRESH DAILY"}
          </Badge>
        </div>
      </Link>

      <div className="p-6 space-y-5 bg-white flex flex-col flex-grow group-hover:bg-gray-50 transition-colors">
        <Link href={`/products/${item.id}`} className="block space-y-2">
          <h3 className="font-black text-[16px] md:text-[18px] text-black group-hover:text-primary transition-colors uppercase tracking-tighter leading-none truncate">
            {item.name}
          </h3>
          <div className="flex items-center gap-3 text-[10px] text-gray-400 font-black uppercase tracking-widest">
            <span className="flex items-center gap-1 text-emerald-600">LIVE</span>
            <span className="opacity-20">|</span>
            <span className="flex items-center gap-1">20 MIN DELIVERY</span>
          </div>
        </Link>

        <div className="flex items-center justify-between pt-5 border-t border-black/10 gap-3 mt-auto">
          <span className="font-black text-[15px] text-black">KES {item.price.toLocaleString()}</span>
          <Button 
            className="h-12 px-6 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-none hover:bg-primary transition-all shadow-xl active:scale-90"
            onClick={handleAdd}
          >
            ADD +
          </Button>
        </div>
      </div>
    </div>
  );
}
