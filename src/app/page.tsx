'use client';

import Link from "next/link";
import Image from "next/image";
import { PromotionalPopup } from "@/components/PromotionalPopup";
import { MOCK_MENU, MenuItem } from "@/lib/food-data";
import { 
  Beef, 
  Flame, 
  Zap, 
  Utensils, 
  Award, 
  ShoppingBag,
  Facebook,
  Twitter,
  Instagram,
  TrendingUp,
  Clock,
  Youtube,
  Linkedin,
  CreditCard,
  Landmark
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const ButcheryLogo = ({ className }: { className?: string }) => (
  <div className={cn("relative overflow-hidden shrink-0", className)}>
    <Image 
      src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
      alt="Steak West Logo" 
      fill 
      className="object-contain"
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

const FILTER_PILLS = [
  "Top Rated", "Under 30 min", "Offers", "Nyama Choma", "Raw Cuts", "Mutura Special"
];

const PAYMENT_METHODS = [
  { name: 'M-Pesa', color: 'bg-[#4fb948]' },
  { name: 'Airtel Money', color: 'bg-[#e40000]' },
  { name: 'T-Kash', color: 'bg-[#003366]' },
  { name: 'PayPal', icon: CreditCard },
  { name: 'Bank Transfer', icon: Landmark },
  { name: 'Visa', icon: CreditCard },
  { name: 'Mastercard', icon: CreditCard },
];

export default function Home() {
  const allMeatProducts = MOCK_MENU;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PromotionalPopup />
      
      <main className="flex-grow p-0 space-y-0 pb-4">
        
        {/* Responsive Hero Section */}
        <div className="relative min-h-[450px] md:h-[600px] w-full overflow-hidden bg-black flex items-center">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          >
            <source src="/From Klickpin.com- 833517843581501058-pin-id-833517843581501058 (1).mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 py-12">
            <div className="flex flex-col space-y-4 md:space-y-6 max-w-4xl">
              <div className="flex items-center gap-3 md:gap-4">
                <ButcheryLogo className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                <div className="flex flex-col">
                  <h2 className="text-xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">Steak West</h2>
                  <Badge className="bg-primary text-white border-none px-2 py-0.5 md:px-4 md:py-1.5 text-[10px] sm:text-xs md:text-base font-black uppercase tracking-[0.2em] w-fit mt-1 rounded-none">
                    Super ya Nyama
                  </Badge>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-headline text-white tracking-tighter uppercase leading-[0.95]">
                Premium Cuts.<br />
                <span className="text-primary italic">Fast. Fresh.</span><br />
                <span className="text-white/90 text-sm md:text-xl tracking-normal font-medium normal-case block mt-3 md:mt-4 max-w-xl">
                  Nairobi's Best Butchery & Grills Delivered in 20 Mins.
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 pt-4 w-full sm:w-auto">
                <Link href="/restaurants" className="w-full sm:w-auto">
                  <Button className="h-12 md:h-16 px-8 md:px-12 bg-primary text-white hover:bg-primary/90 font-black shadow-2xl transition-all active:scale-95 text-[14px] uppercase tracking-widest w-full rounded-none">
                    Pick it up
                  </Button>
                </Link>
                <Button variant="outline" className="h-12 md:h-16 px-8 md:px-12 border-2 border-white text-white hover:bg-white hover:text-black font-black transition-all text-[14px] uppercase tracking-widest bg-transparent w-full sm:w-auto rounded-none">
                  Browse Deals
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <section className="space-y-4 p-6">
          <h2 className="text-[14px] font-black text-black uppercase tracking-tighter">Shop Categories</h2>
          <div className="flex gap-0 overflow-x-auto no-scrollbar pb-4 border-l border-t border-b">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-2 group shrink-0 w-24 md:w-32 border-r p-3 md:p-6 bg-white hover-heartbeat">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 flex items-center justify-center transition-all group-hover:bg-primary/5">
                  <cat.icon className="w-5 h-5 md:w-8 md:h-8 text-black group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[12px] font-black text-gray-500 uppercase tracking-widest text-center">{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Sections - Seamless Grid */}
        <section className="bg-primary/5 p-0 border-y border-primary/10">
          <div className="flex justify-between items-end p-6 bg-white border-b">
            <div className="space-y-2">
              <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[12px] px-3 py-1 rounded-none">Top Sellers</Badge>
              <h2 className="text-lg md:text-3xl font-black text-black uppercase tracking-tighter leading-none">Nairobi Originals</h2>
            </div>
            <Link href="/restaurants" className="text-[14px] font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-l">
            {allMeatProducts.slice(0, 10).map((item, idx) => (
              <ProductCard key={item.id} item={item} idx={idx} />
            ))}
          </div>
        </section>

        <section className="space-y-0">
          <div className="flex flex-col gap-0 p-6">
            <h2 className="text-lg md:text-3xl font-black text-black uppercase tracking-tighter leading-none mb-4">Fresh Market</h2>
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
              {FILTER_PILLS.map((pill) => (
                <Button key={pill} variant="outline" className="bg-gray-50 border-none text-[14px] font-black px-4 md:px-6 h-8 md:h-10 shrink-0 uppercase tracking-widest rounded-none">
                  {pill}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-t border-l">
            {allMeatProducts.map((item, idx) => (
              <ProductCard key={item.id} item={item} idx={idx} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-16 border-t border-primary/5 bg-white pb-32 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12">
              <div className="col-span-2 md:col-span-2 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <ButcheryLogo className="w-12 h-12 md:w-16 md:h-16" />
                  <span className="font-headline text-[13px] md:text-[16px] font-black tracking-tighter text-black uppercase leading-tight">Steak West</span>
                </div>
                <p className="text-[12px] md:text-[14px] font-bold text-gray-400 uppercase leading-relaxed max-w-[280px]">
                  Nairobi's Trusted Meat Source. Super ya Nyama.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                    <Link key={i} href="#" className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[12px] font-black uppercase text-primary tracking-widest">Company</h4>
                {['About', 'Support', 'Carriers'].map(l => (
                  <Link key={l} href="#" className="block text-[12px] md:text-[14px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-[12px] font-black uppercase text-primary tracking-widest">Explore</h4>
                {['Beef', 'Choma', 'Mutura', 'Supu'].map(l => (
                  <Link key={l} href="#" className="block text-[12px] md:text-[14px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-[12px] font-black uppercase text-primary tracking-widest">Legal</h4>
                {['Privacy Policy', 'Terms', 'Access'].map(l => (
                  <Link key={l} href="#" className="block text-[12px] md:text-[14px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                ))}
              </div>
            </div>

            <div className="border-t border-dashed pt-8 space-y-6">
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                {PAYMENT_METHODS.map((payment) => (
                  <div key={payment.name} className="flex items-center gap-2 bg-gray-50 px-2 py-1.5 md:px-3 md:py-2 border border-gray-100">
                    {payment.color ? (
                      <div className={cn("w-2 h-2 rounded-full", payment.color)} />
                    ) : (
                      <payment.icon className="w-3 h-3 text-gray-400" />
                    )}
                    <span className="text-[12px] font-black uppercase text-gray-500">{payment.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between opacity-60 pb-8 gap-4 border-t pt-6">
                <p className="text-[12px] text-gray-400 font-black uppercase tracking-widest text-center sm:text-left">
                  © 2026 Steak West. Super ya Nyama.
                </p>
                <div className="flex gap-4 text-[12px] font-black text-gray-400 uppercase">
                  <Link href="#">Privacy</Link>
                  <Link href="#">Terms</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function ProductCard({ item, idx }: { item: MenuItem, idx: number }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
    toast({
      title: "Added to basket",
      description: `${item.name} added to your global basket.`,
    });
  };

  return (
    <div 
      className="group flex flex-col space-y-0 border-r border-b hover-heartbeat bg-white rounded-none"
    >
      <Link href={`/products/${item.id}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-2 left-2 z-30 w-8 h-8 md:w-10 md:h-10 opacity-90 group-hover:opacity-100 transition-opacity">
          <Image 
            src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
            alt="Steak West" 
            width={40} 
            height={40} 
            className="object-contain"
          />
        </div>

        <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 flex flex-col gap-1">
          <Badge className="bg-white/95 text-black border-none px-2 py-0.5 font-black text-[12px] uppercase tracking-widest rounded-none">
            {idx % 3 === 0 ? "Premium" : "Fresh"}
          </Badge>
          {item.isPopular && (
            <Badge className="bg-primary text-white border-none px-2 py-0.5 font-black text-[12px] uppercase tracking-widest rounded-none">
              Hot
            </Badge>
          )}
        </div>
      </Link>

      <div className="p-3 md:p-4 space-y-2 bg-white flex flex-col flex-grow">
        <Link href={`/products/${item.id}`} className="block">
          <h3 className="font-black text-[14px] text-black group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight truncate">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 text-[12px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            <span className="flex items-center gap-1 text-emerald-600"><TrendingUp className="w-3 h-3" /> Trending</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 20m</span>
          </div>
        </Link>

        <div className="flex items-center justify-between pt-2 border-t gap-2 mt-auto">
          <span className="font-black text-[11px] text-black whitespace-nowrap">KES {item.price.toLocaleString()}</span>
          <Button 
            className="h-8 px-3 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-none hover:bg-primary transition-colors shrink-0"
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
