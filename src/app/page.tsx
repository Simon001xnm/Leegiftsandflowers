
"use client";

import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { SidebarNav } from "@/components/SidebarNav";
import { PromotionalPopup } from "@/components/PromotionalPopup";
import { MOCK_RESTAURANTS, MOCK_MENU, MenuItem } from "@/lib/food-data";
import { 
  Beef, 
  Flame, 
  Zap, 
  Utensils, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Star,
  ShoppingBag,
  Facebook,
  Twitter,
  Instagram,
  Globe,
  Landmark,
  CreditCard,
  TrendingUp,
  Package,
  Youtube,
  Linkedin,
  HelpCircle,
  FileText,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ButcheryLogo = ({ className }: { className?: string }) => (
  <div className={cn("relative overflow-hidden shrink-0", className)}>
    <Image 
      src="/WhatsApp Image 2026-07-22 at 10.09.53.jpeg" 
      alt="Steak West Logo" 
      fill 
      className="object-contain"
      priority
    />
  </div>
);

const WalkingIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="13" cy="4" r="1" />
    <path d="m9 20 3-3.5 1-4.5 -2-2.5 -3 1.5" />
    <path d="m13 12 2 1.5 3-1" />
    <path d="m13 12-4-2.5-1-6" />
    <path d="m9 20-2-3" />
  </svg>
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
  const allMeatProducts = MOCK_MENU.filter(item => item.category === 'Raw Meat' || item.category === 'Nyama Choma');
  const allDelicacies = MOCK_MENU.filter(item => item.category === 'Delicacies' || item.category === 'Cooked');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <PromotionalPopup />
      
      <div className="flex flex-grow relative">
        <SidebarNav />
        
        <main className="flex-grow lg:ml-64 p-2 md:p-3 lg:p-4 space-y-4 md:space-y-6 pb-4">
          
          {/* Hero Section - Redesigned with Video Background */}
          <div className="relative h-[350px] md:h-[450px] w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-black shadow-xl group">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 animate-slow-zoom"
            >
              <source src="/From Klickpin.com- 833517843581501058-pin-id-833517843581501058 (1).mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

            <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-8">
              <div className="flex flex-col space-y-4 md:space-y-6 max-w-lg">
                <div className="flex items-center gap-3">
                  <ButcheryLogo className="w-14 h-14 md:w-20 md:h-20" />
                  <div className="flex flex-col">
                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white">Steak West</h2>
                    <Badge className="bg-primary text-white border-none px-2 py-0.5 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                      Super ya Nyama
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-black font-headline text-white tracking-tighter uppercase leading-[0.95]">
                    Premium Cuts.<br />
                    <span className="text-primary italic">Fast. Fresh.</span><br />
                    <span className="text-white/80 text-[0.6em] tracking-normal font-medium normal-case">Delivered in under 20 mins across Nairobi.</span>
                  </h1>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button className="h-10 md:h-12 px-6 md:px-8 rounded-xl bg-primary text-white hover:bg-primary/90 font-black shadow-lg transition-all active:scale-95 text-[10px] md:text-sm uppercase tracking-widest">
                    Get it Delivered
                  </Button>
                  <Button variant="outline" className="h-10 md:h-12 px-6 md:px-8 rounded-xl border-2 border-white text-white hover:bg-white hover:text-black font-black transition-all text-[10px] md:text-sm uppercase tracking-widest bg-transparent">
                    Browse Deals
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Category Scroller */}
          <section className="space-y-2">
            <h2 className="text-[10px] md:text-sm font-black text-black uppercase tracking-tighter px-0.5">Shop Categories</h2>
            <div className="flex gap-2 md:gap-4 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-1.5 group shrink-0 w-16 md:w-20">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-2xl border flex items-center justify-center transition-all group-hover:bg-primary/5 group-hover:border-primary/20">
                    <cat.icon className="w-6 h-6 md:w-8 md:h-8 text-black group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[7px] md:text-[9px] font-black text-gray-500 uppercase tracking-widest text-center">{cat.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Marketplace Grid */}
          <section className="space-y-3 md:space-y-4 bg-primary/5 -mx-2 p-3 md:p-6 rounded-2xl border-y border-primary/10">
            <div className="flex justify-between items-end">
              <div className="space-y-0.5">
                <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[7px] md:text-[8px]">Hottest Picks</Badge>
                <h2 className="text-sm md:text-2xl font-black text-black uppercase tracking-tighter leading-none">Nairobi Originals</h2>
              </div>
              <Link href="/restaurants" className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {allDelicacies.slice(0, 10).map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          {/* Main Marketplace Grid */}
          <section className="space-y-3 md:space-y-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-sm md:text-2xl font-black text-black uppercase tracking-tighter leading-none px-0.5">Marketplace</h2>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
                {FILTER_PILLS.map((pill) => (
                  <Button key={pill} variant="outline" className="rounded-full bg-gray-50 border-none text-[7px] font-black px-3 h-7 shrink-0 uppercase tracking-widest">
                    {pill}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {allMeatProducts.concat(allDelicacies.slice(10)).map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          {/* Ultra-Congested App-Like Footer */}
          <footer className="pt-6 border-t border-primary/10 bg-white">
            <div className="container mx-auto px-2">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="col-span-2 md:col-span-1 space-y-1">
                  <div className="flex items-center gap-1">
                    <ButcheryLogo className="w-6 h-6" />
                    <span className="font-headline text-sm font-black tracking-tighter text-black uppercase">Steak West</span>
                  </div>
                  <p className="text-[7px] font-bold text-gray-400 uppercase leading-tight max-w-[120px]">
                    Nairobi's trusted meat source. Super ya Nyama.
                  </p>
                  <div className="flex gap-1.5 pt-1">
                    {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                      <Link key={i} href="#" className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <Icon className="w-2 h-2" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-[7px] font-black uppercase text-primary">Company</h4>
                  {['About', 'Careers', 'Blog', 'Support'].map(l => (
                    <Link key={l} href="#" className="block text-[8px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                  ))}
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-[7px] font-black uppercase text-primary">Explore</h4>
                  {['Beef', 'Nyama Choma', 'Mutura Special', 'Grocery'].map(l => (
                    <Link key={l} href="#" className="block text-[8px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                  ))}
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-[7px] font-black uppercase text-primary">Legal</h4>
                  {['Privacy Policy', 'Terms of Use', 'Safety Info'].map(l => (
                    <Link key={l} href="#" className="block text-[8px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                  ))}
                </div>

                <div className="col-span-2 md:col-span-1 space-y-1 flex flex-col md:items-end">
                   <Button className="h-6 w-full max-w-[100px] bg-black text-white text-[6px] font-black uppercase rounded">App Store</Button>
                   <Button className="h-6 w-full max-w-[100px] bg-black text-white text-[6px] font-black uppercase rounded">Play Store</Button>
                </div>
              </div>

              {/* The Last Pad - Ultra Compact */}
              <div className="border-t pt-3 pb-2 space-y-3">
                <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded border">
                      <Landmark className="w-3 h-3 text-black" />
                      <span className="text-[7px] font-black uppercase text-gray-700">Equity Bank: 1234567890</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-1">
                      {PAYMENT_METHODS.map((payment) => (
                        <div key={payment.name} className="flex items-center gap-0.5 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                          {payment.color ? (
                            <div className={cn("w-1.5 h-1.5 rounded-full", payment.color)} />
                          ) : (
                            <payment.icon className="w-2 h-2 text-gray-400" />
                          )}
                          <span className="text-[5px] font-black uppercase text-gray-500">{payment.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end leading-none">
                    <span className="text-[5px] font-black text-gray-400 uppercase tracking-widest">Developed by</span>
                    <Link href="https://simonstyles.co.ke" target="_blank" className="text-[8px] font-black text-black uppercase group hover:text-primary transition-colors">
                      Simon Styles Technologies Limited
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-4">
                  <p className="text-[6px] text-gray-400 font-black uppercase tracking-widest">
                    © {new Date().getFullYear()} Steak West Butchery. Super ya Nyama.
                  </p>
                  <div className="flex gap-2 text-[6px] font-black text-gray-400 uppercase">
                    <Link href="#">Privacy</Link>
                    <Link href="#">Terms</Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

// Ultra-Compact Product Card
function ProductCard({ item, idx }: { item: MenuItem, idx: number }) {
  return (
    <Link 
      href={`/restaurants/${item.restaurantId}`}
      className="group flex flex-col space-y-1"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border shadow-sm group-hover:border-primary/20 transition-all">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-1 left-1 z-10 flex flex-col gap-0.5">
          <Badge className="bg-white/95 text-black border-none px-1 py-0 font-black text-[6px] uppercase tracking-widest">
            {idx % 3 === 0 ? "Premium" : "Fresh"}
          </Badge>
          {item.isPopular && (
            <Badge className="bg-primary text-white border-none px-1 py-0 font-black text-[6px] uppercase tracking-widest">
              Best
            </Badge>
          )}
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 backdrop-blur-[1px]">
          <div className="bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-xl">
            <WalkingIcon className="w-2 h-2 text-black" />
            <span className="text-[6px] font-black text-black uppercase tracking-widest">Order</span>
          </div>
        </div>

        <div className="absolute bottom-1 left-1 z-10">
           <div className="bg-black/90 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-2xl uppercase tracking-tighter">
              KES {item.price.toLocaleString()}
           </div>
        </div>
      </div>

      <div className="px-0.5">
        <h3 className="font-black text-[9px] text-black group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-1 text-[6px] text-gray-500 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-0.5 text-emerald-600"><TrendingUp className="w-1 h-1" /> Trending</span>
          <span>•</span>
          <span className="flex items-center gap-0.5"><Clock className="w-1 h-1" /> 20m</span>
        </div>
      </div>
    </Link>
  );
}
