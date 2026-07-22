'use client';

import Link from "next/link";
import { PromotionalPopup } from "@/components/PromotionalPopup";
import { MOCK_MENU, MenuItem } from "@/lib/food-data";
import { 
  Award, 
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  Heart,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function Home() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PromotionalPopup />
      
      <main className="flex-grow space-y-0">
        {/* Eye-Catching Hero */}
        <div className="relative h-[500px] md:h-[650px] w-full overflow-hidden bg-black flex items-center">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          >
            <source src="/From Klickpin.com- 833517843581501058-pin-id-833517843581501058 (1).mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="relative z-10 w-full px-6 md:px-12 py-12 container mx-auto">
            <div className="flex flex-col space-y-6 max-w-4xl">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <Badge className="bg-primary text-white border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  NAIROBI'S #1 BUTCHERY
                </Badge>
                <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-6 uppercase">
                  NAIROBI'S BEST<br />
                  <span className="text-primary italic">MEAT. FAST.</span>
                </h1>
                <p className="text-base md:text-lg text-white/90 font-medium max-w-lg mb-8">
                  Sourced daily. Prepared expertly. Delivered in under 30 minutes.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/restaurants">
                    <Button size="lg" className="h-16 px-10 bg-primary text-white hover:bg-white hover:text-black font-black text-[14px] uppercase tracking-widest rounded-full transition-all shadow-xl shadow-primary/20">
                      ORDER NOW <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/dashboard/customer">
                    <Button variant="outline" size="lg" className="h-16 px-10 border-2 border-white text-white hover:bg-white hover:text-black font-black text-[14px] uppercase tracking-widest rounded-full transition-all backdrop-blur-md bg-transparent">
                      TRACK ORDERS
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Market Strip - High Density 4 Columns */}
        <section className="py-12 md:py-16 bg-white px-4 md:px-12 container mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-4xl font-black text-black leading-tight uppercase tracking-tighter">PREMIUM SELECTIONS</h2>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Available for immediate dispatch</p>
            </div>
            <Link href="/restaurants">
               <Button variant="link" className="font-black text-black p-0 gap-2 text-[12px] uppercase tracking-widest">SEE ALL <ChevronRight className="w-3 h-3" /></Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {MOCK_MENU.slice(0, 4).map((item) => (
              <ProductCard key={item.id} item={item} onAdd={() => {
                addToCart(item);
                toast({ title: "Added to basket", description: `${item.name} ready.` });
              }} />
            ))}
          </div>
        </section>

        {/* High-Impact Brand Footer */}
        <footer className="bg-black text-white pt-16 pb-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
              <div className="col-span-2 space-y-4">
                <Image src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" alt="Steak West" width={100} height={35} className="h-10 w-auto mb-4" />
                <p className="text-lg md:text-xl font-bold text-gray-500 max-w-md uppercase tracking-tighter">
                  THE GOLD STANDARD IN NAIROBI MEAT LOGISTICS.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PLATFORM</h4>
                <ul className="space-y-2 text-[12px] font-bold uppercase tracking-tighter">
                  <li><Link href="/restaurants" className="hover:text-primary transition-colors">MARKETPLACE</Link></li>
                  <li><Link href="/profile" className="hover:text-primary transition-colors">ACCOUNT</Link></li>
                  <li><Link href="/checkout" className="hover:text-primary transition-colors">CART</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SECURITY</h4>
                <ul className="space-y-2 text-[12px] font-bold text-gray-500 uppercase tracking-tighter">
                  <li>SSL PROTECTION</li>
                  <li>PRIVACY NODE</li>
                  <li>TERMS OF SALE</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-gray-600 font-black text-[9px] uppercase tracking-widest">
              <p>© 2026 STEAK WEST GLOBAL LOGISTICS.</p>
              <div className="flex gap-8 opacity-40">
                <ShieldCheck className="w-5 h-5" />
                <Award className="w-5 h-5" />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function ProductCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  return (
    <div className="group flex flex-col gap-3">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3">
          <Button size="icon" variant="ghost" className="rounded-full bg-white/90 backdrop-blur-md h-8 w-8 shadow-sm text-black">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-1.5 px-1">
        <div className="flex justify-between items-start">
          <h3 className="text-[13px] font-black truncate group-hover:text-primary transition-colors leading-tight uppercase tracking-tight">{item.name}</h3>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[14px] font-black">KES {item.price.toLocaleString()}</span>
          <Button 
            onClick={(e) => { e.preventDefault(); onAdd(); }}
            className="rounded-full bg-black text-white hover:bg-primary transition-all px-4 h-8 font-black text-[9px] uppercase tracking-widest"
          >
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
}
