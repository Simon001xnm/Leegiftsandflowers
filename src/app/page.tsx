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
  Package
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Custom walking icon
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

// Custom Bull Head with Knives Logo
const ButcheryLogo = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M30 20C25 20 20 25 20 35C20 45 30 55 50 65C70 55 80 45 80 35C80 25 75 20 70 20C65 20 60 25 55 30C52 33 48 33 45 30C40 25 35 20 30 20Z" 
      fill="currentColor"
    />
    <path 
      d="M20 35C10 30 5 20 5 15C15 15 20 25 20 35Z" 
      fill="currentColor"
    />
    <path 
      d="M80 35C90 30 95 20 95 15C85 15 80 25 80 35Z" 
      fill="currentColor"
    />
    <path 
      d="M20 80L80 60M80 80L20 60" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round"
    />
    <rect x="15" y="75" width="10" height="15" rx="2" fill="currentColor" transform="rotate(-20 15 75)" />
    <rect x="75" y="75" width="10" height="15" rx="2" fill="currentColor" transform="rotate(20 75 75)" />
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
  { name: 'Bank', icon: Landmark },
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
        
        <main className="flex-grow lg:ml-64 p-2 md:p-6 lg:p-8 space-y-6 md:space-y-12">
          {/* Hero Section - Reduced Mobile Height */}
          <div className="relative min-h-[300px] md:min-h-[480px] w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-black flex flex-col lg:flex-row shadow-2xl border border-white/5">
            {/* Content Side */}
            <div className="flex-1 p-4 md:p-12 lg:p-20 flex flex-col justify-center items-start space-y-4 md:space-y-8 z-10 bg-white order-2 lg:order-1 relative">
              <Badge className="bg-primary text-white border-none px-3 md:px-6 py-1 md:py-2 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                Authentic Nairobi
              </Badge>
              <div className="space-y-2 md:space-y-4">
                <h1 className="text-2xl md:text-6xl lg:text-7xl font-black font-headline text-black tracking-tighter uppercase leading-[0.85]">
                  Premium Cuts.<br />
                  <span className="text-primary italic">Fast Delivery.</span>
                </h1>
                <p className="text-gray-500 text-xs md:text-xl font-bold max-w-md leading-tight">
                  Nairobi's ultimate butchery experience at your doorstep.
                </p>
              </div>

              {/* Branding Section */}
              <div className="hidden md:flex flex-col items-start pt-4">
                <div className="flex items-center gap-4 group">
                  <ButcheryLogo className="w-16 h-16 md:w-20 md:h-20 text-black transform transition-transform group-hover:rotate-12" />
                  <div className="space-y-1">
                    <span className="block text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Established 2024</span>
                    <span className="block text-xl md:text-2xl font-black uppercase tracking-tighter text-black">Steak West</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-2 md:gap-4 pt-2 md:pt-6 w-full">
                <Button className="h-10 md:h-16 flex-1 md:flex-none md:px-12 rounded-xl md:rounded-2xl bg-black text-white hover:bg-black/90 font-black shadow-xl transition-all active:scale-95 text-[10px] md:text-lg">
                  Order Now
                </Button>
                <Button variant="outline" className="h-10 md:h-16 flex-1 md:flex-none md:px-12 rounded-xl md:rounded-2xl border-2 md:border-4 border-black text-black hover:bg-black hover:text-white font-black transition-all text-[10px] md:text-lg">
                  Explore
                </Button>
              </div>
            </div>

            {/* Video Side */}
            <div className="flex-1 relative min-h-[150px] md:min-h-full bg-black order-1 lg:order-2 overflow-hidden">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80 animate-slow-zoom"
              >
                <source src="/From Klickpin.com- 833517843581501058-pin-id-833517843581501058 (1).mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden lg:block" />
            </div>
          </div>

          {/* Quick Category Scroller */}
          <section className="space-y-2 md:space-y-6">
            <h2 className="text-sm md:text-2xl font-black text-black uppercase tracking-tighter px-1">Categories</h2>
            <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-2 px-1">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-1 md:gap-3 group shrink-0">
                  <div className="w-12 h-12 md:w-20 md:h-20 bg-gray-50 rounded-2xl md:rounded-[2rem] border-2 border-transparent flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary/5 group-hover:border-primary/20 shadow-sm">
                    <cat.icon className="w-5 h-5 md:w-10 md:h-10 text-black group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[8px] md:text-xs font-black text-gray-700 uppercase tracking-widest group-hover:text-black">{cat.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Specialty Vendors - Circular Compact */}
          <section className="space-y-2 md:space-y-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm md:text-2xl font-black text-black uppercase tracking-tighter">Specialty Vendors</h2>
              <Link href="/restaurants" className="text-[8px] md:text-xs font-black text-primary hover:underline uppercase tracking-widest">See All</Link>
            </div>
            <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-2 px-1">
              {MOCK_RESTAURANTS.map((shop) => (
                <Link key={shop.id} href={`/restaurants/${shop.id}`} className="flex flex-col items-center gap-1 md:gap-3 shrink-0 group w-16 md:w-32">
                  <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border-2 md:border-4 border-white bg-white overflow-hidden relative shadow-md transition-all group-hover:scale-105 group-hover:shadow-lg">
                    <Image src={shop.imageUrl} alt={shop.name} fill className="object-cover p-1 md:p-3" />
                  </div>
                  <span className="text-[8px] md:text-xs font-black text-black block leading-none truncate w-full text-center">{shop.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* High Density: Trending Delicacies - 2 Column Grid on Mobile */}
          <section className="space-y-4 md:space-y-8 bg-gray-50 -mx-2 md:-mx-8 p-3 md:p-12 rounded-3xl md:rounded-[3rem]">
            <div className="space-y-1">
              <Badge className="bg-accent text-black font-black uppercase tracking-widest text-[8px] md:text-[10px]">Hot Now</Badge>
              <h2 className="text-lg md:text-4xl font-black text-black uppercase tracking-tighter leading-none">Nairobi's Best</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {allDelicacies.slice(0, 6).map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          {/* Marketplace Layout - 2 Column Grid on Mobile */}
          <section className="space-y-4 md:space-y-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-4xl font-black text-black uppercase tracking-tighter leading-none">Marketplace</h2>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {FILTER_PILLS.map((pill) => (
                  <Button key={pill} variant="outline" className="rounded-full bg-gray-50 border-none text-[8px] font-black px-3 h-7 shrink-0 uppercase tracking-widest">
                    {pill}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {allMeatProducts.map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          {/* High-Density Footer - Compact Mobile */}
          <footer className="pt-10 md:pt-20 border-t mt-10 md:mt-20 space-y-8 md:space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left px-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                   <ButcheryLogo className="w-8 h-8 md:w-12 md:h-12 text-black" />
                   <span className="font-headline text-xl md:text-3xl font-black tracking-tighter text-black uppercase">Steak West</span>
                </div>
                <p className="text-[10px] font-bold text-gray-500 leading-tight">
                  Nairobi's #1 digital marketplace for premium meat and delicacies.
                </p>
              </div>

              {/* Payments - Stacked on Mobile */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Payments</h4>
                <div className="grid grid-cols-3 gap-1">
                  {PAYMENT_METHODS.slice(0, 6).map((payment) => (
                    <div key={payment.name} className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
                      <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", payment.color || "bg-primary")} />
                      <span className="text-[7px] font-black uppercase truncate">{payment.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-12 border-t flex flex-col items-center gap-4 pb-24 md:pb-12 text-center">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  by <Link href="https://simonstyles.co.ke" target="_blank" className="text-black font-extrabold">Simon Styles Technologies</Link>
                </p>
                <div className="flex items-center gap-6 text-[8px] font-black text-gray-400 uppercase tracking-widest">
                   <Link href="#" className="hover:underline">Privacy</Link>
                   <Link href="#" className="hover:underline">Terms</Link>
                   <p>© {new Date().getFullYear()} Steak West</p>
                </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

// Ultra-Compact High-Density Product Card
function ProductCard({ item, idx }: { item: MenuItem, idx: number }) {
  return (
    <Link 
      href={`/restaurants/${item.restaurantId}`}
      className="group flex flex-col space-y-2"
    >
      <div className="relative aspect-square md:aspect-[3/4] rounded-xl md:rounded-[2rem] overflow-hidden bg-gray-100 shadow-lg border border-black/5">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Market Overlay */}
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-white/95 backdrop-blur shadow-sm text-black border-none px-2 py-0.5 font-black text-[7px] md:text-[9px] uppercase tracking-widest">
            {idx % 2 === 0 ? "Steak West" : "City Grill"}
          </Badge>
        </div>

        {/* Action Overlay - Hidden on touch for faster browsing */}
        <div className="absolute inset-0 z-20 hidden md:flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 backdrop-blur-[2px]">
          <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-2xl">
            <WalkingIcon className="w-3 h-3 text-black" />
            <span className="text-[8px] font-black text-black uppercase tracking-widest">Quick Order</span>
          </div>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-2 left-2 z-10">
           <div className="bg-primary text-white text-[8px] md:text-[10px] font-black px-2 md:px-4 py-1 md:py-2 rounded-lg shadow-lg uppercase tracking-tighter">
              KES {item.price}
           </div>
        </div>
      </div>

      <div className="space-y-0.5 px-1">
        <h3 className="font-black text-xs md:text-lg text-black group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-1 md:gap-2 text-[7px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest">
          <span className="flex items-center gap-0.5"><TrendingUp className="w-2 h-2 text-emerald-500" /> Top</span>
          <span>•</span>
          <span>{((idx + 1) * 0.8).toFixed(1)} km</span>
        </div>
      </div>
    </Link>
  );
}

function Plus({ className }: { className?: string }) {
   return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
         <line x1="12" y1="5" x2="12" y2="19" />
         <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
   );
}
