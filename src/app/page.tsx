'use client';

import Link from "next/link";
import { PromotionalPopup } from "@/components/PromotionalPopup";
import { MOCK_MENU, MenuItem } from "@/lib/food-data";
import { 
  Beef, 
  Flame, 
  Zap, 
  Utensils, 
  Award, 
  ShoppingBag,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const ButcheryLogo = ({ className }: { className?: string }) => (
  <div className={cn("relative shrink-0 flex items-center justify-center", className)}>
    <Image 
      src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
      alt="Steak West Logo" 
      fill 
      className="object-contain object-center"
      priority
    />
  </div>
);

const CATEGORIES = [
  { label: 'Butchery', icon: Beef, href: '/restaurants?cat=Raw Meat' },
  { label: 'Grills', icon: Flame, href: '/restaurants?cat=Nyama Choma' },
  { label: 'Mutura', icon: Zap, href: '/restaurants?cat=Delicacies' },
  { label: 'Cooked', icon: Utensils, href: '/restaurants?cat=Cooked' },
  { label: 'Groceries', icon: ShoppingBag, href: '/restaurants?cat=Grocery' },
  { label: 'Offers', icon: Award, href: '#' },
];

export default function Home() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const allMeatProducts = MOCK_MENU;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PromotionalPopup />
      
      <main className="flex-grow p-0 space-y-0 pb-4">
        {/* Enhanced Hero Section with Mental Programming */}
        <div className="relative min-h-[500px] md:h-[650px] w-full overflow-hidden bg-black flex items-center">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
          >
            <source src="/From Klickpin.com- 833517843581501058-pin-id-833517843581501058 (1).mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

          <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 py-12">
            <div className="flex flex-col space-y-4 md:space-y-6 max-w-4xl">
              <div className="flex items-center gap-3 md:gap-4 animate-in fade-in slide-in-from-left-4 duration-700">
                <ButcheryLogo className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                <div className="flex flex-col">
                  <h2 className="text-xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">Steak West</h2>
                  <Badge className="bg-primary text-white border-none px-2 py-0.5 md:px-4 md:py-1.5 text-[10px] sm:text-xs md:text-base font-black uppercase tracking-[0.2em] w-fit mt-1 rounded-none shadow-xl shadow-primary/20">
                    SUPER YA NYAMA
                  </Badge>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black font-headline text-white tracking-tighter uppercase leading-[0.9] animate-in fade-in slide-in-from-left-6 duration-1000 delay-100">
                Fresh Cuts.<br />
                <span className="text-primary italic">Fast Logistics.</span><br />
                <span className="text-white/80 text-[14px] md:text-2xl tracking-normal font-bold normal-case block mt-4 md:mt-6 max-w-2xl border-l-4 border-primary pl-6">
                  Nairobi's premium meat node. Sourced daily, delivered in 20 minutes across the central network.
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-6 pt-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <Link href="/restaurants" className="w-full sm:w-auto">
                  <Button className="h-14 md:h-20 px-8 md:px-16 bg-primary text-white hover:bg-white hover:text-black font-black shadow-2xl transition-all active:scale-95 text-[16px] uppercase tracking-widest w-full rounded-none group">
                    Enter Marketplace <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Link href="/dashboard/analytics" className="w-full sm:w-auto">
                  <Button variant="outline" className="h-14 md:h-20 px-8 md:px-12 border-4 border-white text-white hover:bg-white hover:text-black font-black transition-all text-[14px] uppercase tracking-widest bg-transparent w-full rounded-none backdrop-blur-sm">
                    Live Control Node
                  </Button>
                </Link>
              </div>

              <div className="pt-8 flex items-center gap-4 text-white/40 font-black text-[10px] uppercase tracking-[0.3em]">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Supabase Data Node Active
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section - High Density */}
        <section className="space-y-4 p-6 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-black text-black uppercase tracking-tighter border-b-2 border-primary pb-1">Shop Categories</h2>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Select Node</span>
          </div>
          <div className="flex gap-0 overflow-x-auto no-scrollbar pb-4 border-l border-t border-b border-black/5">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-2 group shrink-0 w-28 md:w-36 border-r border-black/5 p-4 md:p-8 bg-white hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 flex items-center justify-center transition-all group-hover:bg-primary/10 rounded-full-important">
                  <cat.icon className="w-6 h-6 md:w-8 md:h-8 text-black group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest text-center group-hover:text-black">{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Sellers - Persuasive UI */}
        <section className="bg-primary/5 p-0 border-y-4 border-black">
          <div className="flex justify-between items-end p-6 bg-white border-b-2 border-black/5">
            <div className="space-y-2">
              <Badge className="bg-black text-white font-black uppercase tracking-widest text-[11px] px-3 py-1 rounded-none">Trending Now</Badge>
              <h2 className="text-xl md:text-4xl font-black text-black uppercase tracking-tighter leading-none">Nairobi Originals</h2>
            </div>
            <Link href="/restaurants" className="text-[12px] font-black text-primary uppercase tracking-[0.2em] hover:underline flex items-center gap-2">
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-l border-black/5">
            {allMeatProducts.slice(0, 10).map((item, idx) => (
              <ProductCard key={item.id} item={item} idx={idx} addToCart={addToCart} toast={toast} />
            ))}
          </div>
        </section>

        {/* Fresh Market - High Volume View */}
        <section className="space-y-0 bg-white">
          <div className="flex flex-col gap-0 p-8">
            <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter leading-none mb-2">The Fresh Market</h2>
            <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Premium Inventory Node // Available for Instant Delivery</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-t border-l border-black/5">
            {allMeatProducts.map((item, idx) => (
              <ProductCard key={item.id} item={item} idx={idx} addToCart={addToCart} toast={toast} />
            ))}
          </div>
        </section>

        {/* Footer - Branded */}
        <footer className="mt-20 pt-20 border-t-8 border-black bg-white pb-32 md:pb-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
              <div className="col-span-2 md:col-span-2 space-y-6">
                <div className="flex items-center gap-4">
                  <ButcheryLogo className="w-14 h-14 md:w-20 md:h-20" />
                  <div className="flex flex-col">
                    <span className="font-headline text-[16px] md:text-[18px] font-black tracking-tighter text-black uppercase leading-none">Steak West</span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Super ya Nyama</span>
                  </div>
                </div>
                <p className="text-[12px] font-bold text-gray-500 uppercase leading-relaxed max-w-[320px]">
                  Nairobi's Trusted Meat Source. Logistics-First Butchery. Super ya Nyama.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-black text-[12px] uppercase tracking-widest text-black">Network</h4>
                <ul className="space-y-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <li><Link href="/restaurants" className="hover:text-primary">Marketplace</Link></li>
                  <li><Link href="/dashboard/analytics" className="hover:text-primary">Control Hub</Link></li>
                  <li><Link href="/profile" className="hover:text-primary">Identity Node</Link></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-black/5 pt-10 gap-6">
              <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.3em] text-center sm:text-left">
                © 2026 STEAK WEST GLOBAL. ALL RIGHTS RESERVED.
              </p>
              <div className="flex items-center gap-6 opacity-30">
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

function ProductCard({ item, idx, addToCart, toast }: { item: MenuItem, idx: number, addToCart: any, toast: any }) {
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
    toast({
      title: "NODE_UPDATE: Item Added",
      description: `${item.name} successfully committed to basket.`,
    });
  };

  return (
    <div className="group flex flex-col space-y-0 border-r border-b border-black/5 bg-white rounded-none hover:bg-gray-50 transition-all hover:shadow-2xl hover:z-10 hover-heartbeat">
      <Link href={`/products/${item.id}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          <Badge className="bg-white/95 text-black border-2 border-black/10 px-2 py-0.5 font-black text-[10px] uppercase tracking-widest rounded-none shadow-sm">
            {idx % 3 === 0 ? "PREMIUM_CUT" : "FRESH_SLOT"}
          </Badge>
        </div>
      </Link>

      <div className="p-4 space-y-3 bg-white flex flex-col flex-grow">
        <Link href={`/products/${item.id}`} className="block">
          <h3 className="font-black text-[14px] md:text-[15px] text-black group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight truncate">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-2">
            <span className="flex items-center gap-1 text-emerald-600 font-black"><TrendingUp className="w-3 h-3" /> HOT</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-black text-black/40"><Clock className="w-3 h-3" /> 20m</span>
          </div>
        </Link>

        <div className="flex items-center justify-between pt-3 border-t border-black/5 gap-2 mt-auto">
          <span className="font-black text-[12px] text-black whitespace-nowrap">KES {item.price.toLocaleString()}</span>
          <Button 
            className="h-10 px-4 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-none hover:bg-primary transition-colors shadow-lg active:scale-90"
            onClick={handleAdd}
          >
            Add +
          </Button>
        </div>
      </div>
    </div>
  );
}
