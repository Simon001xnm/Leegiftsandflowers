
"use client";

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
  const allMeatProducts = MOCK_MENU.filter(item => item.category === 'Raw Meat' || item.category === 'Nyama Choma');
  const allDelicacies = MOCK_MENU.filter(item => item.category === 'Delicacies' || item.category === 'Cooked');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PromotionalPopup />
      
      <main className="flex-grow p-0 space-y-0 pb-4">
        
        {/* Responsive Hero Section */}
        <div className="relative min-h-[500px] md:h-[650px] w-full overflow-hidden bg-black flex items-center">
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
            <div className="flex flex-col space-y-6 md:space-y-8 max-w-4xl">
              <div className="flex items-center gap-4 md:gap-6">
                <ButcheryLogo className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32" />
                <div className="flex flex-col">
                  <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">Steak West</h2>
                  <Badge className="bg-primary text-white border-none px-3 py-1 md:px-5 md:py-2 text-[10px] sm:text-sm md:text-lg font-black uppercase tracking-[0.2em] w-fit mt-1">
                    Super ya Nyama
                  </Badge>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black font-headline text-white tracking-tighter uppercase leading-[0.95]">
                Premium Cuts.<br />
                <span className="text-primary italic">Fast. Fresh.</span><br />
                <span className="text-white/90 text-sm sm:text-lg md:text-2xl tracking-normal font-medium normal-case block mt-4 md:mt-6 max-w-xl">
                  Nairobi's Best Butchery & Grills Delivered in 20 Mins.
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-5 pt-4 w-full sm:w-auto">
                <Button className="h-14 md:h-20 px-8 md:px-16 bg-primary text-white hover:bg-primary/90 font-black shadow-2xl transition-all active:scale-95 text-[14px] uppercase tracking-widest w-full sm:w-auto rounded-none">
                  Pick it up
                </Button>
                <Button variant="outline" className="h-14 md:h-20 px-8 md:px-16 border-2 md:border-4 border-white text-white hover:bg-white hover:text-black font-black transition-all text-[14px] uppercase tracking-widest bg-transparent w-full sm:w-auto rounded-none">
                  Browse Deals
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <section className="space-y-6 p-6">
          <h2 className="text-[14px] font-black text-black uppercase tracking-tighter">Shop Categories</h2>
          <div className="flex gap-0 overflow-x-auto no-scrollbar pb-4 border-l border-t border-b">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-4 group shrink-0 w-28 md:w-32 border-r p-4 md:p-6 bg-white hover-heartbeat">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-gray-50 flex items-center justify-center transition-all group-hover:bg-primary/5">
                  <cat.icon className="w-6 h-6 md:w-10 md:h-10 text-black group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[10px] md:text-[12px] font-black text-gray-500 uppercase tracking-widest text-center">{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Sections - Seamless Grid */}
        <section className="bg-primary/5 p-0 border-y border-primary/10">
          <div className="flex justify-between items-end p-6 bg-white border-b">
            <div className="space-y-2">
              <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[12px] md:text-[14px] px-3 py-0.5 md:px-4 md:py-1 rounded-none">Top Sellers</Badge>
              <h2 className="text-xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none">Nairobi Originals</h2>
            </div>
            <Link href="/restaurants" className="text-[12px] md:text-[14px] font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-l">
            {allDelicacies.slice(0, 10).map((item, idx) => (
              <ProductCard key={item.id} item={item} idx={idx} />
            ))}
          </div>
        </section>

        <section className="space-y-0">
          <div className="flex flex-col gap-0 p-6">
            <h2 className="text-xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-6">Fresh Market</h2>
            <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar py-2">
              {FILTER_PILLS.map((pill) => (
                <Button key={pill} variant="outline" className="bg-gray-50 border-none text-[12px] md:text-[14px] font-black px-4 md:px-8 h-10 md:h-12 shrink-0 uppercase tracking-widest rounded-none">
                  {pill}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-t border-l">
            {allMeatProducts.concat(allDelicacies.slice(10)).map((item, idx) => (
              <ProductCard key={item.id} item={item} idx={idx} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-16 border-t border-primary/5 bg-white pb-32 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-16 mb-16">
              <div className="col-span-2 md:col-span-1 space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <ButcheryLogo className="w-24 h-24 md:w-36 md:h-36" />
                  <span className="font-headline text-2xl md:text-4xl font-black tracking-tighter text-black uppercase">Steak West</span>
                </div>
                <p className="text-[12px] md:text-[14px] font-bold text-gray-400 uppercase leading-relaxed max-w-[240px]">
                  Nairobi's Trusted Meat Source. Super ya Nyama.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                    <Link key={i} href="#" className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <h4 className="text-[12px] md:text-[14px] font-black uppercase text-primary tracking-widest">Company</h4>
                {['About', 'Support', 'Carriers'].map(l => (
                  <Link key={l} href="#" className="block text-[12px] md:text-[14px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                ))}
              </div>

              <div className="space-y-3 md:space-y-4">
                <h4 className="text-[12px] md:text-[14px] font-black uppercase text-primary tracking-widest">Explore</h4>
                {['Beef', 'Choma', 'Mutura', 'Supu'].map(l => (
                  <Link key={l} href="#" className="block text-[12px] md:text-[14px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                ))}
              </div>

              <div className="space-y-3 md:space-y-4">
                <h4 className="text-[12px] md:text-[14px] font-black uppercase text-primary tracking-widest">Legal</h4>
                {['Privacy Policy', 'Terms of Use', 'Accessibility'].map(l => (
                  <Link key={l} href="#" className="block text-[12px] md:text-[14px] font-bold text-gray-500 uppercase tracking-tighter hover:text-black">{l}</Link>
                ))}
              </div>

              <div className="col-span-2 md:col-span-1 space-y-3 md:space-y-4 flex md:flex-col items-center md:items-end justify-center gap-3">
                 <Button className="h-12 md:h-14 w-[140px] md:w-[160px] bg-black text-white text-[12px] md:text-[14px] font-black uppercase rounded-none">App Store</Button>
                 <Button className="h-12 md:h-14 w-[140px] md:w-[160px] bg-black text-white text-[12px] md:text-[14px] font-black uppercase rounded-none">Play Store</Button>
              </div>
            </div>

            <div className="border-t border-dashed pt-12 space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                  {PAYMENT_METHODS.map((payment) => (
                    <div key={payment.name} className="flex items-center gap-2 md:gap-3 bg-gray-50 px-3 py-2 md:px-5 md:py-3 border border-gray-100">
                      {payment.color ? (
                        <div className={cn("w-2 h-2 md:w-3 md:h-3 rounded-full", payment.color)} />
                      ) : (
                        <payment.icon className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      )}
                      <span className="text-[12px] md:text-[14px] font-black uppercase text-gray-500">{payment.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between opacity-60 pb-8 gap-4">
                <p className="text-[12px] md:text-[14px] text-gray-400 font-black uppercase tracking-widest text-center sm:text-left">
                  © 2026 Steak West Butchery. Super ya Nyama.
                </p>
                <div className="flex gap-4 md:gap-8 text-[12px] md:text-[14px] font-black text-gray-400 uppercase">
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
  return (
    <Link 
      href={`/restaurants/${item.restaurantId}`}
      className="group flex flex-col space-y-0 border-r border-b hover-heartbeat bg-white rounded-none"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-2 left-2 md:top-4 md:left-4 z-30 w-8 h-8 md:w-14 md:h-14 opacity-90 group-hover:opacity-100 transition-opacity">
          <Image 
            src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
            alt="Steak West" 
            width={56} 
            height={56} 
            className="object-contain"
          />
        </div>

        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 flex flex-col gap-1 md:gap-2">
          <Badge className="bg-white/95 text-black border-none px-2 py-0.5 md:px-4 md:py-1.5 font-black text-[10px] md:text-[14px] uppercase tracking-widest rounded-none">
            {idx % 3 === 0 ? "Premium" : "Fresh"}
          </Badge>
          {item.isPopular && (
            <Badge className="bg-primary text-white border-none px-2 py-0.5 md:px-4 md:py-1.5 font-black text-[10px] md:text-[14px] uppercase tracking-widest rounded-none">
              Hot
            </Badge>
          )}
        </div>
      </div>

      <div className="p-3 md:p-4 space-y-2 md:space-y-3 bg-white">
        <div>
          <h3 className="font-black text-[14px] md:text-xl text-black group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight truncate">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-[14px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            <span className="flex items-center gap-1 text-emerald-600"><TrendingUp className="w-3 h-3 md:w-4 md:h-4" /> Trending</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 md:w-4 md:h-4" /> 20m</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t gap-2">
          <span className="font-black text-[12px] md:text-[14px] text-black whitespace-nowrap">KES {item.price.toLocaleString()}</span>
          <Button className="h-8 md:h-10 px-3 md:px-4 bg-black text-white text-[10px] md:text-[12px] font-black uppercase tracking-widest rounded-none hover:bg-primary transition-colors shrink-0">
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
}
