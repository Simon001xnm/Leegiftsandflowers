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
        
        <main className="flex-grow lg:ml-64 p-1.5 md:p-4 lg:p-6 space-y-4 md:space-y-8">
          {/* Hero Section - Optimized Mobile Density */}
          <div className="relative min-h-[260px] md:min-h-[420px] w-full rounded-xl md:rounded-[2rem] overflow-hidden bg-black flex flex-col lg:flex-row shadow-xl border border-white/5">
            <div className="flex-1 p-3 md:p-8 lg:p-12 flex flex-col justify-center items-start space-y-3 md:space-y-6 z-10 bg-white order-2 lg:order-1 relative">
              <Badge className="bg-primary text-white border-none px-2 md:px-4 py-0.5 md:py-1.5 text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em]">
                Authentic Nairobi
              </Badge>
              <div className="space-y-1 md:space-y-3">
                <h1 className="text-xl md:text-5xl lg:text-6xl font-black font-headline text-black tracking-tighter uppercase leading-[0.85]">
                  Premium Cuts.<br />
                  <span className="text-primary italic">Fast Delivery.</span>
                </h1>
                <p className="text-gray-500 text-[10px] md:text-lg font-bold max-w-md leading-tight">
                  Nairobi's ultimate butchery experience at your doorstep.
                </p>
              </div>

              <div className="hidden md:flex flex-col items-start pt-2">
                <div className="flex items-center gap-3 group">
                  <ButcheryLogo className="w-12 h-12 md:w-16 md:h-16 text-black transform transition-transform group-hover:rotate-12" />
                  <div className="space-y-0.5">
                    <span className="block text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Established 2024</span>
                    <span className="block text-lg md:text-xl font-black uppercase tracking-tighter text-black">Steak West</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-1.5 md:gap-3 pt-1.5 md:pt-4 w-full">
                <Button className="h-9 md:h-14 flex-1 md:flex-none md:px-10 rounded-lg md:rounded-xl bg-black text-white hover:bg-black/90 font-black shadow-lg transition-all active:scale-95 text-[9px] md:text-base">
                  Order Now
                </Button>
                <Button variant="outline" className="h-9 md:h-14 flex-1 md:flex-none md:px-10 rounded-lg md:rounded-xl border-2 md:border-3 border-black text-black hover:bg-black hover:text-white font-black transition-all text-[9px] md:text-base">
                  Explore
                </Button>
              </div>
            </div>

            <div className="flex-1 relative min-h-[120px] md:min-h-full bg-black order-1 lg:order-2 overflow-hidden">
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

          <section className="space-y-1.5 md:space-y-4">
            <h2 className="text-xs md:text-xl font-black text-black uppercase tracking-tighter px-0.5">Categories</h2>
            <div className="flex gap-3 md:gap-6 overflow-x-auto no-scrollbar pb-1 px-0.5">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-1 md:gap-2 group shrink-0">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-50 rounded-xl md:rounded-[1.5rem] border flex items-center justify-center transition-all group-hover:scale-105 group-hover:bg-primary/5 group-hover:border-primary/20 shadow-sm">
                    <cat.icon className="w-4 h-4 md:w-8 md:h-8 text-black group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[7px] md:text-[10px] font-black text-gray-700 uppercase tracking-widest group-hover:text-black">{cat.label}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-1.5 md:space-y-4">
            <div className="flex items-center justify-between px-0.5">
              <h2 className="text-xs md:text-xl font-black text-black uppercase tracking-tighter">Specialty Vendors</h2>
              <Link href="/restaurants" className="text-[7px] md:text-[10px] font-black text-primary hover:underline uppercase tracking-widest">See All</Link>
            </div>
            <div className="flex gap-3 md:gap-5 overflow-x-auto no-scrollbar pb-1 px-0.5">
              {MOCK_RESTAURANTS.map((shop) => (
                <Link key={shop.id} href={`/restaurants/${shop.id}`} className="flex flex-col items-center gap-1 md:gap-2 shrink-0 group w-14 md:w-28">
                  <div className="w-14 h-14 md:w-28 md:h-28 rounded-full border border-white bg-white overflow-hidden relative shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md">
                    <Image src={shop.imageUrl} alt={shop.name} fill className="object-cover p-1 md:p-2" />
                  </div>
                  <span className="text-[7px] md:text-[10px] font-black text-black block leading-none truncate w-full text-center">{shop.name}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-3 md:space-y-6 bg-gray-50 -mx-1.5 md:-mx-4 p-2 md:p-8 rounded-xl md:rounded-[2rem]">
            <div className="space-y-0.5">
              <Badge className="bg-accent text-black font-black uppercase tracking-widest text-[7px] md:text-[9px]">Hot Now</Badge>
              <h2 className="text-sm md:text-3xl font-black text-black uppercase tracking-tighter leading-none">Nairobi's Best</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {allDelicacies.slice(0, 10).map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          <section className="space-y-3 md:space-y-6">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-sm md:text-3xl font-black text-black uppercase tracking-tighter leading-none">Marketplace</h2>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                {FILTER_PILLS.map((pill) => (
                  <Button key={pill} variant="outline" className="rounded-full bg-gray-50 border-none text-[7px] font-black px-2.5 h-6 shrink-0 uppercase tracking-widest">
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

          {/* Compact Premium Footer */}
          <footer className="pt-6 md:pt-10 border-t mt-8 md:mt-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 mb-8 md:mb-12">
                <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
                  <div className="flex items-center gap-1.5">
                    <ButcheryLogo className="w-6 h-6 text-black" />
                    <span className="font-headline text-xl font-black tracking-tighter text-black uppercase">Steak West</span>
                  </div>
                  <div className="flex gap-3">
                    <Link href="#" className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Facebook className="w-3.5 h-3.5 text-gray-600" />
                    </Link>
                    <Link href="#" className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Twitter className="w-3.5 h-3.5 text-gray-600" />
                    </Link>
                    <Link href="#" className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Instagram className="w-3.5 h-3.5 text-gray-600" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Company</h4>
                  <ul className="space-y-1.5">
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-black transition-colors">About Us</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-black transition-colors">Careers</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-black transition-colors">Press</Link></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Marketplace</h4>
                  <ul className="space-y-1.5">
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-black transition-colors">Premium Beef</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-black transition-colors">Nyama Choma</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-black transition-colors">Mutura Special</Link></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Help</h4>
                  <ul className="space-y-1.5">
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-black transition-colors flex items-center gap-1.5"><HelpCircle className="w-3 h-3" /> FAQ</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-black transition-colors flex items-center gap-1.5"><FileText className="w-3 h-3" /> Privacy Policy</Link></li>
                    <li><Link href="#" className="text-[11px] font-bold text-gray-600 hover:text-black transition-colors flex items-center gap-1.5"><FileText className="w-3 h-3" /> Terms of Service</Link></li>
                  </ul>
                </div>

                <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Download App</h4>
                  <div className="flex flex-col gap-1.5">
                    <Button variant="outline" className="h-8 w-28 rounded-md bg-black text-white border-none hover:bg-black/90 text-[9px] font-bold p-0 flex items-center justify-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> App Store
                    </Button>
                    <Button variant="outline" className="h-8 w-28 rounded-md bg-black text-white border-none hover:bg-black/90 text-[9px] font-bold p-0 flex items-center justify-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" /> Google Play
                    </Button>
                  </div>
                </div>
              </div>

              {/* Congested Final Pad */}
              <div className="border-t pt-6 pb-20 md:pb-8 space-y-6">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                  <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-10">
                    <div className="text-left space-y-1">
                      <h4 className="text-[7px] font-black uppercase tracking-[0.2em] text-gray-400">Official Banking Partners</h4>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <Landmark className="w-3.5 h-3.5 text-black" />
                          <div className="text-[9px] font-black uppercase">
                            <span className="text-gray-400">Bank:</span> Equity Bank Kenya
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-black" />
                          <div className="text-[9px] font-black uppercase">
                            <span className="text-gray-400">Acc:</span> 1234567890123
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-left space-y-1.5">
                      <h4 className="text-[7px] font-black uppercase tracking-[0.2em] text-gray-400 text-center md:text-left">Accepted Payments</h4>
                      <div className="grid grid-cols-4 md:flex items-center gap-1 md:gap-2">
                        {PAYMENT_METHODS.map((payment) => (
                          <div key={payment.name} className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 hover:border-primary/20 transition-colors group cursor-default">
                            {payment.color ? (
                              <div className={cn("w-1 h-1 rounded-full shrink-0", payment.color)} />
                            ) : (
                              <payment.icon className="w-1.5 h-1.5 text-gray-400 group-hover:text-black" />
                            )}
                            <span className="text-[6.5px] md:text-[7.5px] font-black uppercase truncate text-gray-500 group-hover:text-black">{payment.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-1">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">
                      Engineered by
                    </p>
                    <Link href="https://simonstyles.co.ke" target="_blank" className="group flex flex-col items-center lg:items-end">
                      <span className="text-[11px] md:text-xs font-black text-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                        Simon Styles Technologies Limited
                      </span>
                      <span className="text-[7.5px] font-bold text-primary group-hover:underline">www.simonstyles.co.ke</span>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-dashed">
                  <div className="flex items-center gap-4 text-[7px] font-black text-gray-400 uppercase tracking-widest">
                    <Link href="#" className="hover:text-black transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-black transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-black transition-colors">Cookies</Link>
                  </div>
                  <p className="text-[7px] text-gray-400 font-black uppercase tracking-[0.3em]">
                    © {new Date().getFullYear()} Steak West Butchery.
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
      className="group flex flex-col space-y-1"
    >
      <div className="relative aspect-square md:aspect-[3/4] rounded-lg md:rounded-[1.5rem] overflow-hidden bg-gray-100 shadow-sm border border-black/5">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint="butchery item"
        />
        
        <div className="absolute top-1.5 left-1.5 z-10 flex flex-col gap-0.5">
          <Badge className="bg-white/95 backdrop-blur shadow-sm text-black border-none px-1.5 py-0.5 font-black text-[6px] md:text-[8px] uppercase tracking-widest">
            {idx % 2 === 0 ? "Premium" : "Hot"}
          </Badge>
          {item.isPopular && (
            <Badge className="bg-primary text-white border-none px-1.5 py-0.5 font-black text-[6px] md:text-[8px] uppercase tracking-widest">
              Bestseller
            </Badge>
          )}
        </div>

        <div className="absolute inset-0 z-20 hidden md:flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 backdrop-blur-[2px]">
          <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-xl">
            <WalkingIcon className="w-2.5 h-2.5 text-black" />
            <span className="text-[7px] font-black text-black uppercase tracking-widest">Order Delivery</span>
          </div>
        </div>

        <div className="absolute bottom-1.5 left-1.5 z-10">
           <div className="bg-black/90 text-white text-[7px] md:text-[9px] font-black px-1.5 md:px-3 py-0.5 md:py-1.5 rounded shadow-lg uppercase tracking-tighter backdrop-blur-sm">
              KES {item.price.toLocaleString()}
           </div>
        </div>
      </div>

      <div className="space-y-0.5 px-0.5">
        <h3 className="font-black text-[9px] md:text-xs lg:text-sm text-black group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-1 md:gap-1.5 text-[6.5px] md:text-[8px] text-gray-500 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-0.5"><TrendingUp className="w-1.5 h-1.5 text-emerald-500" /> Fast</span>
          <span>•</span>
          <span>{((idx + 1) * 0.8).toFixed(1)} km</span>
        </div>
      </div>
    </Link>
  );
}
