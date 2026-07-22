
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
  ChefHat,
  TrendingUp,
  Package,
  Youtube,
  Linkedin,
  HelpCircle,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Custom walking icon for Glovo/Uber feel
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

// High-impact Butchery Logo: Bull head with crossed knives below neck
const ButcheryLogo = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shield Frame */}
    <circle cx="50" cy="50" r="48" fill="black" />
    <circle cx="50" cy="50" r="44" fill="white" />
    {/* Bull Head */}
    <path d="M30 35 L40 30 Q50 25 60 30 L70 35 L70 50 Q50 60 30 50 Z" fill="black" />
    <path d="M40 30 Q30 20 20 25 M60 30 Q70 20 80 25" stroke="black" strokeWidth="5" strokeLinecap="round" />
    {/* Crossed Knives Below Neck */}
    <path d="M25 70 L75 55 M25 55 L75 70" stroke="#E30613" strokeWidth="7" strokeLinecap="round" />
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
        
        <main className="flex-grow lg:ml-64 p-1 md:p-3 lg:p-4 space-y-4 md:space-y-6 pb-2">
          
          {/* Hero Section - Video Background */}
          <div className="relative h-[450px] md:h-[550px] w-full rounded-2xl md:rounded-[3rem] overflow-hidden bg-black shadow-2xl border border-white/5 group">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 group-hover:scale-110 transition-transform duration-[20s]"
            >
              <source src="/From Klickpin.com- 833517843581501058-pin-id-833517843581501058 (1).mp4" type="video/mp4" />
            </video>
            
            {/* Cinematic Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-20 space-y-6 md:space-y-10 max-w-3xl">
              <div className="flex items-center gap-4 animate-in slide-in-from-left duration-700">
                <ButcheryLogo className="w-16 h-16 md:w-24 md:h-24 shadow-2xl" />
                <div className="space-y-1">
                  <Badge className="bg-primary text-white border-none px-4 py-1 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] shadow-lg">
                    Super ya Nyama
                  </Badge>
                  <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white drop-shadow-md">Steak West</h2>
                </div>
              </div>

              <div className="space-y-2 md:space-y-4 animate-in slide-in-from-left duration-1000 delay-200">
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black font-headline text-white tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
                  Premium <br />
                  <span className="text-primary italic">Meat Cuts.</span><br />
                  <span className="text-white/60 text-[0.6em] lowercase tracking-normal font-medium">Fast. Fresh. Nairobi.</span>
                </h1>
                <p className="text-white/80 text-sm md:text-2xl font-bold max-w-xl leading-tight drop-shadow-md">
                  Nairobi's ultimate butchery experience. Freshness you can taste, speed you can trust.
                </p>
              </div>

              <div className="flex flex-row gap-3 md:gap-6 pt-4 w-full md:w-fit animate-in slide-in-from-bottom duration-1000 delay-500">
                <Button className="h-12 md:h-20 px-8 md:px-16 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black shadow-2xl transition-all active:scale-95 text-sm md:text-xl uppercase tracking-widest">
                  Order Now
                </Button>
                <Button variant="outline" className="h-12 md:h-20 px-8 md:px-16 rounded-2xl border-4 border-white text-white hover:bg-white hover:text-black font-black transition-all text-sm md:text-xl uppercase tracking-widest bg-transparent">
                  Explore
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Category Scroller */}
          <section className="space-y-2 md:space-y-3">
            <h2 className="text-[10px] md:text-lg font-black text-black uppercase tracking-tighter px-0.5">Shop Categories</h2>
            <div className="flex gap-3 md:gap-6 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-2 group shrink-0">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-gray-50 rounded-2xl border-2 flex items-center justify-center transition-all group-hover:scale-105 group-hover:bg-primary/5 group-hover:border-primary/30 shadow-sm">
                    <cat.icon className="w-6 h-6 md:w-10 md:h-10 text-black group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[7px] md:text-[10px] font-black text-gray-700 uppercase tracking-widest group-hover:text-black">{cat.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Specialty Vendor Scroller */}
          <section className="space-y-2">
            <div className="flex items-center justify-between px-0.5">
              <h2 className="text-[10px] md:text-lg font-black text-black uppercase tracking-tighter">Premium Stores</h2>
              <Link href="/restaurants" className="text-[8px] md:text-[10px] font-black text-primary hover:underline uppercase tracking-widest">View All</Link>
            </div>
            <div className="flex gap-3 md:gap-5 overflow-x-auto no-scrollbar pb-1">
              {MOCK_RESTAURANTS.map((shop) => (
                <Link key={shop.id} href={`/restaurants/${shop.id}`} className="flex flex-col items-center gap-2 shrink-0 group w-20 md:w-32">
                  <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-white bg-white overflow-hidden relative shadow-lg transition-all group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary/20">
                    <Image src={shop.imageUrl} alt={shop.name} fill className="object-cover p-2 md:p-4" />
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black text-black block leading-none truncate w-full text-center uppercase tracking-tighter">{shop.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* High Density Delicacy Section */}
          <section className="space-y-3 md:space-y-6 bg-primary/5 -mx-1 md:-mx-3 p-3 md:p-6 rounded-2xl md:rounded-[2.5rem] border border-primary/10">
            <div className="space-y-0.5">
              <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[7px] md:text-[9px]">Super ya Nyama</Badge>
              <h2 className="text-sm md:text-3xl font-black text-black uppercase tracking-tighter leading-none">Nairobi Originals</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {allDelicacies.slice(0, 10).map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          {/* Main Marketplace Grid */}
          <section className="space-y-3 md:space-y-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-sm md:text-3xl font-black text-black uppercase tracking-tighter leading-none">Marketplace</h2>
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

          {/* Congested Footer - Tightened to Mobile Nav */}
          <footer className="pt-4 md:pt-6 border-t border-primary/10 mt-4 md:mt-6 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="col-span-2 md:col-span-1 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <ButcheryLogo className="w-5 h-5" />
                    <span className="font-headline text-lg font-black tracking-tighter text-black uppercase">Steak West</span>
                  </div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase leading-tight max-w-[150px]">
                    Nairobi's trusted source for quality meat. Super ya Nyama.
                  </p>
                  <div className="flex gap-1.5">
                    {[Facebook, Twitter, Instagram].map((Icon, i) => (
                      <Link key={i} href="#" className="w-5 h-5 bg-primary/5 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                        <Icon className="w-2.5 h-2.5" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[7px] font-black uppercase tracking-widest text-primary">Company</h4>
                  <ul className="space-y-0.5">
                    {['About', 'Careers', 'Locations'].map(l => (
                      <li key={l}><Link href="#" className="text-[9px] font-bold text-gray-500 hover:text-primary uppercase tracking-tighter">{l}</Link></li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[7px] font-black uppercase tracking-widest text-primary">Market</h4>
                  <ul className="space-y-0.5">
                    {['Beef', 'Nyama Choma', 'Mutura'].map(l => (
                      <li key={l}><Link href="#" className="text-[9px] font-bold text-gray-500 hover:text-primary uppercase tracking-tighter">{l}</Link></li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[7px] font-black uppercase tracking-widest text-primary">Support</h4>
                  <ul className="space-y-0.5">
                    {['Help', 'Delivery', 'Refunds'].map(l => (
                      <li key={l}><Link href="#" className="text-[9px] font-bold text-gray-500 hover:text-primary uppercase tracking-tighter">{l}</Link></li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-2 md:col-span-1 space-y-1">
                  <h4 className="text-[7px] font-black uppercase tracking-widest text-primary">Get App</h4>
                  <div className="flex gap-1.5 md:flex-col">
                    <Button variant="outline" className="h-6 flex-1 md:w-full rounded bg-black text-white border-none text-[7px] font-black uppercase tracking-widest">App Store</Button>
                    <Button variant="outline" className="h-6 flex-1 md:w-full rounded bg-black text-white border-none text-[7px] font-black uppercase tracking-widest">Play Store</Button>
                  </div>
                </div>
              </div>

              {/* Last Pad - Hyper Congested */}
              <div className="border-t pt-3 space-y-2">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="text-left">
                      <h4 className="text-[6px] font-black uppercase tracking-[0.2em] text-primary">Banking</h4>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Landmark className="w-2.5 h-2.5 text-black" />
                          <span className="text-[7px] font-black uppercase text-gray-700">Equity Bank</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-2.5 h-2.5 text-black" />
                          <span className="text-[7px] font-black uppercase text-gray-700">1234567890</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left">
                      <h4 className="text-[6px] font-black uppercase tracking-[0.2em] text-primary">Payments</h4>
                      <div className="flex items-center gap-1">
                        {PAYMENT_METHODS.map((payment) => (
                          <div key={payment.name} className="flex items-center gap-0.5 bg-gray-50 px-1 py-0.5 rounded border border-gray-100">
                            {payment.color ? (
                              <div className={cn("w-1 h-1 rounded-full", payment.color)} />
                            ) : (
                              <payment.icon className="w-1.5 h-1.5 text-gray-400" />
                            )}
                            <span className="text-[5px] font-black uppercase text-gray-500">{payment.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center lg:items-end">
                    <span className="text-[6px] font-black text-gray-400 uppercase tracking-widest">Engineering Partner</span>
                    <Link href="https://simonstyles.co.ke" target="_blank" className="group flex flex-col items-center lg:items-end leading-none">
                      <span className="text-[8px] font-black text-black uppercase tracking-tighter group-hover:text-primary">Simon Styles Technologies Limited</span>
                      <span className="text-[6px] font-bold text-primary">www.simonstyles.co.ke</span>
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-dashed">
                  <div className="flex gap-3 text-[6px] font-black text-gray-400 uppercase tracking-widest">
                    <Link href="#">Privacy</Link>
                    <Link href="#">Terms</Link>
                  </div>
                  <p className="text-[6px] text-gray-400 font-black uppercase tracking-[0.3em]">
                    © {new Date().getFullYear()} Steak West Butchery. Super ya Nyama.
                  </p>
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
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm border-2 border-transparent group-hover:border-primary/20 transition-all">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          data-ai-hint="butchery item"
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
            <span className="text-[6px] font-black text-black uppercase tracking-widest">View</span>
          </div>
        </div>

        <div className="absolute bottom-1 left-1 z-10">
           <div className="bg-black/95 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-2xl uppercase tracking-tighter border border-white/5">
              KES {item.price.toLocaleString()}
           </div>
        </div>
      </div>

      <div className="px-0.5">
        <h3 className="font-black text-[9px] text-black group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-1 text-[6px] text-gray-500 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-0.5"><TrendingUp className="w-1 h-1 text-emerald-500" /> Hot</span>
          <span>•</span>
          <span>{((idx + 1) * 0.4).toFixed(1)} km</span>
        </div>
      </div>
    </Link>
  );
}
