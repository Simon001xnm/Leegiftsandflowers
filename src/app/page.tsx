
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

// Custom Bull Head with Knives Logo matching the provided branding
const ButcheryLogo = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shield Frame */}
    <path d="M50 5 C30 5 15 15 10 35 C10 60 30 85 50 95 C70 85 90 60 90 35 C85 15 70 5 50 5Z" fill="#1a1a1a" />
    <path d="M50 10 C35 10 20 18 15 35 C15 55 35 75 50 85 C65 75 85 55 85 35 C80 18 65 10 50 10Z" fill="white" />
    {/* Bull Head */}
    <path d="M35 35 L40 30 Q50 25 60 30 L65 35 L65 50 Q50 60 35 50 Z" fill="#1a1a1a" />
    <path d="M40 30 Q30 20 25 25 M60 30 Q70 20 75 25" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
    {/* Crossed Knives */}
    <path d="M35 65 L65 45 M35 45 L65 65" stroke="#E30613" strokeWidth="5" strokeLinecap="round" />
    {/* Banner Detail */}
    <path d="M20 75 Q50 85 80 75" stroke="#E30613" strokeWidth="3" fill="none" />
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
        
        <main className="flex-grow lg:ml-64 p-1.5 md:p-4 lg:p-6 space-y-4 md:space-y-8 pb-20 md:pb-8">
          
          {/* Hero Section - Red/Black/White Theme */}
          <div className="relative min-h-[300px] md:min-h-[450px] w-full rounded-xl md:rounded-[2.5rem] overflow-hidden bg-black flex flex-col lg:flex-row shadow-2xl border border-white/5">
            <div className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col justify-center items-start space-y-4 md:space-y-8 z-10 bg-white order-2 lg:order-1 relative">
              <div className="flex items-center gap-3">
                <ButcheryLogo className="w-12 h-12 md:w-20 md:h-20" />
                <div className="space-y-0.5">
                  <Badge className="bg-primary text-white border-none px-3 py-1 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]">
                    Super ya Nyama
                  </Badge>
                  <span className="block text-xl md:text-3xl font-black uppercase tracking-tighter text-black">Authentic Quality</span>
                </div>
              </div>

              <div className="space-y-1 md:space-y-3">
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-black font-headline text-black tracking-tighter uppercase leading-[0.85]">
                  Premium <span className="text-primary shadow-red-500/10">Cuts.</span><br />
                  <span className="text-gray-400 italic">Fast Delivery.</span>
                </h1>
                <p className="text-gray-500 text-xs md:text-xl font-bold max-w-md leading-tight">
                  Nairobi's ultimate butchery experience. Freshness you can taste, speed you can trust.
                </p>
              </div>

              <div className="flex flex-row gap-2 md:gap-4 pt-2 md:pt-6 w-full">
                <Button className="h-10 md:h-16 flex-1 md:flex-none md:px-12 rounded-xl bg-primary text-white hover:bg-primary/90 font-black shadow-xl transition-all active:scale-95 text-[10px] md:text-lg">
                  Order Now
                </Button>
                <Button variant="outline" className="h-10 md:h-16 flex-1 md:flex-none md:px-12 rounded-xl border-3 border-black text-black hover:bg-black hover:text-white font-black transition-all text-[10px] md:text-lg">
                  Explore Menu
                </Button>
              </div>
            </div>

            <div className="flex-1 relative min-h-[150px] md:min-h-full bg-black order-1 lg:order-2 overflow-hidden">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-90 animate-slow-zoom"
              >
                <source src="/From Klickpin.com- 833517843581501058-pin-id-833517843581501058 (1).mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden lg:block" />
            </div>
          </div>

          {/* Quick Category Scroller */}
          <section className="space-y-2 md:space-y-4">
            <h2 className="text-[11px] md:text-xl font-black text-black uppercase tracking-tighter px-0.5">Shop Categories</h2>
            <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-2 px-0.5">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-2 md:gap-3 group shrink-0">
                  <div className="w-12 h-12 md:w-20 md:h-20 bg-gray-50 rounded-2xl md:rounded-[2rem] border-2 flex items-center justify-center transition-all group-hover:scale-105 group-hover:bg-primary/5 group-hover:border-primary/30 shadow-sm">
                    <cat.icon className="w-5 h-5 md:w-10 md:h-10 text-black group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[8px] md:text-[11px] font-black text-gray-700 uppercase tracking-widest group-hover:text-black">{cat.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Specialty Vendor Scroller */}
          <section className="space-y-2 md:space-y-4">
            <div className="flex items-center justify-between px-0.5">
              <h2 className="text-[11px] md:text-xl font-black text-black uppercase tracking-tighter">Premium Stores</h2>
              <Link href="/restaurants" className="text-[9px] md:text-[11px] font-black text-primary hover:underline uppercase tracking-widest">View All</Link>
            </div>
            <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-2 px-0.5">
              {MOCK_RESTAURANTS.map((shop) => (
                <Link key={shop.id} href={`/restaurants/${shop.id}`} className="flex flex-col items-center gap-2 shrink-0 group w-16 md:w-32">
                  <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border-4 border-white bg-white overflow-hidden relative shadow-lg transition-all group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary/20">
                    <Image src={shop.imageUrl} alt={shop.name} fill className="object-cover p-1.5 md:p-3" />
                  </div>
                  <span className="text-[8px] md:text-[11px] font-black text-black block leading-none truncate w-full text-center uppercase tracking-tighter">{shop.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* High Density Delicacy Section */}
          <section className="space-y-4 md:space-y-8 bg-primary/5 -mx-1.5 md:-mx-4 p-4 md:p-12 rounded-2xl md:rounded-[3rem] border border-primary/10">
            <div className="space-y-1">
              <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[8px] md:text-[10px]">Super ya Nyama</Badge>
              <h2 className="text-lg md:text-4xl font-black text-black uppercase tracking-tighter leading-none">Nairobi Originals</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {allDelicacies.slice(0, 10).map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          {/* Main Marketplace Grid */}
          <section className="space-y-4 md:space-y-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-4xl font-black text-black uppercase tracking-tighter leading-none">Marketplace</h2>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {FILTER_PILLS.map((pill) => (
                  <Button key={pill} variant="outline" className="rounded-full bg-gray-50 border-none text-[8px] font-black px-4 h-8 shrink-0 uppercase tracking-widest">
                    {pill}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {allMeatProducts.concat(allDelicacies.slice(10)).map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          {/* Ultra-Congested High-Density Footer */}
          <footer className="pt-10 md:pt-16 border-t-4 border-primary/20 mt-12 md:mt-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10 mb-10">
                <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <ButcheryLogo className="w-8 h-8" />
                    <span className="font-headline text-2xl font-black tracking-tighter text-black uppercase">Steak West</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">
                    Premium butchery marketplace. Nairobi's trusted source for quality meat since 2024.
                  </p>
                  <div className="flex gap-3">
                    <Link href="#" className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                      <Facebook className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                      <Twitter className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                      <Instagram className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Company</h4>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-primary uppercase tracking-tighter">About Us</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-primary uppercase tracking-tighter">Careers</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-primary uppercase tracking-tighter">Store Locations</Link></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Marketplace</h4>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-primary uppercase tracking-tighter">Beef Cuts</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-primary uppercase tracking-tighter">Nyama Choma</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-primary uppercase tracking-tighter">Special Mutura</Link></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Support</h4>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-primary uppercase tracking-tighter">Help Center</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-primary uppercase tracking-tighter">Delivery Info</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-primary uppercase tracking-tighter">Refund Policy</Link></li>
                  </ul>
                </div>

                <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-4">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Mobile App</h4>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="h-10 w-full rounded-xl bg-black text-white border-none hover:bg-black/90 text-[10px] font-black p-0 uppercase tracking-widest">
                      App Store
                    </Button>
                    <Button variant="outline" className="h-10 w-full rounded-xl bg-black text-white border-none hover:bg-black/90 text-[10px] font-black p-0 uppercase tracking-widest">
                      Play Store
                    </Button>
                  </div>
                </div>
              </div>

              {/* Congested "Last Pad" */}
              <div className="border-t pt-6 space-y-6">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                  <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-12">
                    <div className="text-left space-y-1">
                      <h4 className="text-[8px] font-black uppercase tracking-[0.3em] text-primary">Banking Partner</h4>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-black" />
                          <div className="text-[9px] font-black uppercase">
                            <span className="text-gray-400">Bank:</span> Equity Bank Kenya
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-black" />
                          <div className="text-[9px] font-black uppercase">
                            <span className="text-gray-400">Acc:</span> 1234567890123
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-left space-y-1">
                      <h4 className="text-[8px] font-black uppercase tracking-[0.3em] text-primary">Accepted Payments</h4>
                      <div className="grid grid-cols-4 md:flex items-center gap-2">
                        {PAYMENT_METHODS.map((payment) => (
                          <div key={payment.name} className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 cursor-default">
                            {payment.color ? (
                              <div className={cn("w-2 h-2 rounded-full", payment.color)} />
                            ) : (
                              <payment.icon className="w-2.5 h-2.5 text-gray-400" />
                            )}
                            <span className="text-[7px] font-black uppercase text-gray-500 tracking-tighter">{payment.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                      Engineered for scale by
                    </p>
                    <Link href="https://simonstyles.co.ke" target="_blank" className="group flex flex-col items-center lg:items-end">
                      <span className="text-[11px] font-black text-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                        Simon Styles Technologies Limited
                      </span>
                      <span className="text-[8px] font-bold text-primary group-hover:underline uppercase tracking-widest">www.simonstyles.co.ke</span>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-dashed">
                  <div className="flex items-center gap-6 text-[8px] font-black text-gray-400 uppercase tracking-widest">
                    <Link href="#" className="hover:text-black">Privacy Policy</Link>
                    <Link href="#" className="hover:text-black">Terms of Service</Link>
                  </div>
                  <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.4em]">
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

// Ultra-Compact High-Density Product Card
function ProductCard({ item, idx }: { item: MenuItem, idx: number }) {
  return (
    <Link 
      href={`/restaurants/${item.restaurantId}`}
      className="group flex flex-col space-y-1.5"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-md border-2 border-transparent group-hover:border-primary/20 transition-all">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint="butchery item"
        />
        
        {/* Dynamic Overlays */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          <Badge className="bg-white/95 backdrop-blur shadow-sm text-black border-none px-2 py-0.5 font-black text-[7px] md:text-[8px] uppercase tracking-widest">
            {idx % 3 === 0 ? "Premium" : "Fresh"}
          </Badge>
          {item.isPopular && (
            <Badge className="bg-primary text-white border-none px-2 py-0.5 font-black text-[7px] md:text-[8px] uppercase tracking-widest">
              Best Seller
            </Badge>
          )}
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-[1px]">
          <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-2xl scale-90 group-hover:scale-100 transition-transform">
            <WalkingIcon className="w-3 h-3 text-black" />
            <span className="text-[8px] font-black text-black uppercase tracking-widest">Quick Look</span>
          </div>
        </div>

        <div className="absolute bottom-2 left-2 z-10">
           <div className="bg-black/95 text-white text-[9px] md:text-[11px] font-black px-2.5 py-1 rounded-lg shadow-2xl uppercase tracking-tighter backdrop-blur-sm border border-white/10">
              KES {item.price.toLocaleString()}
           </div>
        </div>
      </div>

      <div className="space-y-0.5 px-1">
        <h3 className="font-black text-[10px] md:text-[13px] text-black group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-1.5 text-[7px] md:text-[9px] text-gray-500 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-0.5"><TrendingUp className="w-2 h-2 text-emerald-500" /> High Demand</span>
          <span>•</span>
          <span>{((idx + 1) * 0.5).toFixed(1)} km</span>
        </div>
      </div>
    </Link>
  );
}
