
"use client";

import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { SidebarNav } from "@/components/SidebarNav";
import { PromotionalPopup } from "@/components/PromotionalPopup";
import { MOCK_MENU, MenuItem } from "@/lib/food-data";
import { 
  Beef, 
  Flame, 
  Zap, 
  Utensils, 
  Award, 
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
  Clock,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
          
          {/* Hero Section - High Density & Cinematic */}
          <div className="relative h-[250px] md:h-[400px] w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-black shadow-xl group">
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

            <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 py-8">
              <div className="flex flex-col space-y-3 max-w-lg">
                <div className="flex items-center gap-2">
                  <ButcheryLogo className="w-10 h-10 md:w-14 md:h-14" />
                  <div className="flex flex-col">
                    <h2 className="text-sm md:text-xl font-black uppercase tracking-tighter text-white">Steak West</h2>
                    <Badge className="bg-primary text-white border-none px-2 py-0.5 text-[6px] md:text-[8px] font-black uppercase tracking-[0.2em] w-fit">
                      Super ya Nyama
                    </Badge>
                  </div>
                </div>

                <h1 className="text-lg md:text-3xl font-black font-headline text-white tracking-tighter uppercase leading-[0.95]">
                  Premium Cuts.<br />
                  <span className="text-primary italic">Fast. Fresh.</span><br />
                  <span className="text-white/80 text-[0.45em] tracking-normal font-medium normal-case block mt-0.5">Nairobi's Best Delivered in 20 Mins.</span>
                </h1>

                <div className="flex gap-2 pt-1">
                  <Button className="h-8 md:h-10 px-3 md:px-6 rounded-lg bg-primary text-white hover:bg-primary/90 font-black shadow-lg transition-all active:scale-95 text-[8px] md:text-xs uppercase tracking-widest">
                    Order Now
                  </Button>
                  <Button variant="outline" className="h-8 md:h-10 px-3 md:px-6 rounded-lg border-2 border-white text-white hover:bg-white hover:text-black font-black transition-all text-[8px] md:text-xs uppercase tracking-widest bg-transparent">
                    Deals
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <section className="space-y-1.5">
            <h2 className="text-[8px] md:text-xs font-black text-black uppercase tracking-tighter px-0.5">Shop Categories</h2>
            <div className="flex gap-2 md:gap-4 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-1 group shrink-0 w-12 md:w-18">
                  <div className="w-12 h-12 md:w-18 md:h-18 bg-gray-50 rounded-xl border flex items-center justify-center transition-all group-hover:bg-primary/5 group-hover:border-primary/20">
                    <cat.icon className="w-4 h-4 md:w-7 md:h-7 text-black group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[5px] md:text-[8px] font-black text-gray-500 uppercase tracking-widest text-center">{cat.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Sections - Marketplace Grid */}
          <section className="space-y-2 bg-primary/5 -mx-2 p-2 md:p-4 rounded-xl border-y border-primary/10">
            <div className="flex justify-between items-end">
              <div className="space-y-0.5">
                <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[5px] md:text-[7px]">Top Sellers</Badge>
                <h2 className="text-[10px] md:text-xl font-black text-black uppercase tracking-tighter leading-none">Nairobi Originals</h2>
              </div>
              <Link href="/restaurants" className="text-[6px] md:text-[9px] font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
              {allDelicacies.slice(0, 10).map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-[10px] md:text-xl font-black text-black uppercase tracking-tighter leading-none px-0.5">Fresh Market</h2>
              <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5">
                {FILTER_PILLS.map((pill) => (
                  <Button key={pill} variant="outline" className="rounded-full bg-gray-50 border-none text-[5px] font-black px-2 h-5 shrink-0 uppercase tracking-widest">
                    {pill}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
              {allMeatProducts.concat(allDelicacies.slice(10)).map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          {/* Congested Footer */}
          <footer className="mt-8 pt-3 border-t border-primary/5 bg-white pb-20 md:pb-4">
            <div className="container mx-auto px-1">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-3">
                <div className="col-span-2 md:col-span-1 space-y-1">
                  <div className="flex items-center gap-1">
                    <ButcheryLogo className="w-5 h-5" />
                    <span className="font-headline text-[10px] font-black tracking-tighter text-black uppercase">Steak West</span>
                  </div>
                  <p className="text-[5px] font-bold text-gray-400 uppercase leading-tight max-w-[100px]">
                    Nairobi's Trusted Meat Source.
                  </p>
                  <div className="flex gap-1 pt-0.5">
                    {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                      <Link key={i} href="#" className="w-3.5 h-3.5 bg-gray-50 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <Icon className="w-1.5 h-1.5" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-[5px] font-black uppercase text-primary">Company</h4>
                  {['About', 'Support'].map(l => (
                    <Link key={l} href="#" className="block text-[6px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                  ))}
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-[5px] font-black uppercase text-primary">Explore</h4>
                  {['Beef', 'Choma'].map(l => (
                    <Link key={l} href="#" className="block text-[6px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                  ))}
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-[5px] font-black uppercase text-primary">Legal</h4>
                  {['Privacy', 'Terms'].map(l => (
                    <Link key={l} href="#" className="block text-[6px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                  ))}
                </div>

                <div className="col-span-2 md:col-span-1 space-y-1 flex md:flex-col items-center md:items-end justify-center gap-1">
                   <Button className="h-4 w-[60px] bg-black text-white text-[4px] font-black uppercase rounded">App Store</Button>
                   <Button className="h-4 w-[60px] bg-black text-white text-[4px] font-black uppercase rounded">Play Store</Button>
                </div>
              </div>

              {/* The Last Pad - Congested & Professional */}
              <div className="border-t border-dashed pt-2 space-y-1">
                <div className="flex flex-col md:flex-row justify-between items-center gap-1.5">
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    <div className="flex items-center gap-1 bg-gray-50 px-1 py-0.5 rounded border border-gray-100">
                      <Landmark className="w-2 h-2 text-black" />
                      <span className="text-[5px] font-black uppercase text-gray-700">Equity Bank: 1234567890</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {PAYMENT_METHODS.map((payment) => (
                        <div key={payment.name} className="flex items-center gap-0.5 bg-gray-50 px-0.5 py-0.5 rounded border border-gray-100">
                          {payment.color ? (
                            <div className={cn("w-1 h-1 rounded-full", payment.color)} />
                          ) : (
                            <payment.icon className="w-1.5 h-1.5 text-gray-400" />
                          )}
                          <span className="text-[4px] font-black uppercase text-gray-500">{payment.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end leading-none">
                    <span className="text-[4px] font-black text-gray-400 uppercase tracking-widest">Powered by</span>
                    <Link href="https://simonstyles.co.ke" target="_blank" className="text-[6px] font-black text-black uppercase group hover:text-primary transition-colors">
                      Simon Styles Technologies Limited
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-between opacity-50 pb-2">
                  <p className="text-[4px] text-gray-400 font-black uppercase tracking-widest">
                    © 2026 Steak West Butchery. Super ya Nyama.
                  </p>
                  <div className="flex gap-2 text-[4px] font-black text-gray-400 uppercase">
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

function ProductCard({ item, idx }: { item: MenuItem, idx: number }) {
  return (
    <Link 
      href={`/restaurants/${item.restaurantId}`}
      className="group flex flex-col space-y-0.5"
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border shadow-sm group-hover:border-primary/20 transition-all">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Small branding logo in top left corner */}
        <div className="absolute top-1 left-1 z-30 w-4 h-4 md:w-6 md:h-6 opacity-80 group-hover:opacity-100 transition-opacity">
          <Image 
            src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
            alt="Steak West" 
            width={24} 
            height={24} 
            className="object-contain"
          />
        </div>

        <div className="absolute top-0.5 right-0.5 z-10 flex flex-col gap-0.5">
          <Badge className="bg-white/95 text-black border-none px-1 py-0 font-black text-[5px] uppercase tracking-widest">
            {idx % 3 === 0 ? "Premium" : "Fresh"}
          </Badge>
          {item.isPopular && (
            <Badge className="bg-primary text-white border-none px-1 py-0 font-black text-[5px] uppercase tracking-widest">
              Hot
            </Badge>
          )}
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 backdrop-blur-[1px]">
          <div className="bg-white rounded-full px-1.5 py-0.5 flex items-center gap-0.5 shadow-xl">
            <WalkingIcon className="w-2 h-2 text-black" />
            <span className="text-[5px] font-black text-black uppercase tracking-widest">View</span>
          </div>
        </div>

        <div className="absolute bottom-0.5 left-0.5 z-10">
           <div className="bg-black/90 text-white text-[7px] font-black px-1 py-0.5 rounded uppercase tracking-tighter">
              KES {item.price.toLocaleString()}
           </div>
        </div>
      </div>

      <div className="px-0.5">
        <h3 className="font-black text-[8px] text-black group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-1 text-[5px] text-gray-400 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-0.5 text-emerald-600"><TrendingUp className="w-1 h-1" /> Hot</span>
          <span>•</span>
          <span className="flex items-center gap-0.5"><Clock className="w-1 h-1" /> 20m</span>
        </div>
      </div>
    </Link>
  );
}
