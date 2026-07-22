
"use client";

import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { SidebarNav } from "@/components/SidebarNav";
import { PromotionalPopup } from "@/components/PromotionalPopup";
import { MOCK_RESTAURANTS, MOCK_MENU } from "@/lib/food-data";
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
  const popularItems = MOCK_MENU.filter(item => item.isPopular);
  const featuredStores = MOCK_RESTAURANTS.filter(r => r.isFeatured);
  const allMeatProducts = MOCK_MENU.filter(item => item.category === 'Raw Meat' || item.category === 'Nyama Choma');
  const allDelicacies = MOCK_MENU.filter(item => item.category === 'Delicacies' || item.category === 'Cooked');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <PromotionalPopup />
      
      <div className="flex flex-grow relative">
        <SidebarNav />
        
        <main className="flex-grow lg:ml-64 p-4 md:p-6 lg:p-8 space-y-12">
          {/* Hero Section */}
          <div className="relative min-h-[500px] lg:min-h-[480px] w-full rounded-[2.5rem] overflow-hidden bg-black flex flex-col lg:flex-row shadow-2xl border border-white/5">
            {/* Content Side */}
            <div className="flex-1 p-8 md:p-12 lg:p-20 flex flex-col justify-center items-start space-y-8 z-10 bg-white order-2 lg:order-1 relative">
              <Badge className="bg-primary text-white border-none px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                Authentic Nairobi
              </Badge>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-headline text-black tracking-tighter uppercase leading-[0.85]">
                  Premium Cuts.<br />
                  <span className="text-primary italic">Fast Delivery.</span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl font-bold max-w-md leading-tight">
                  From fresh farm raw meat to legendary Nyama Choma. The ultimate butchery experience at your doorstep.
                </p>
              </div>

              {/* Branding Section */}
              <div className="flex flex-col items-start pt-4">
                <div className="flex items-center gap-4 group">
                  <ButcheryLogo className="w-20 h-20 text-black transform transition-transform group-hover:rotate-12" />
                  <div className="space-y-1">
                    <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Established 2024</span>
                    <span className="block text-2xl font-black uppercase tracking-tighter text-black">Steak West</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full">
                <Button className="h-16 px-12 rounded-2xl bg-black text-white hover:bg-black/90 font-black shadow-2xl transition-all active:scale-95 text-lg">
                  Order Meat Now
                </Button>
                <Button variant="outline" className="h-16 px-12 rounded-2xl border-4 border-black text-black hover:bg-black hover:text-white font-black transition-all text-lg">
                  Explore Menu
                </Button>
              </div>
            </div>

            {/* Video Side */}
            <div className="flex-1 relative min-h-[300px] lg:min-h-full bg-black order-1 lg:order-2 overflow-hidden">
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
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-black uppercase tracking-tighter">Categories</h2>
            </div>
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-6 px-2">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href={cat.href} className="flex flex-col items-center gap-3 group shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-[2rem] border-2 border-transparent flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary/5 group-hover:border-primary/20 shadow-sm">
                    <cat.icon className="w-8 h-8 md:w-10 md:h-10 text-black group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[11px] md:text-xs font-black text-gray-700 uppercase tracking-widest group-hover:text-black">{cat.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Marketplace Vendors */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-black uppercase tracking-tighter">Top Specialty Vendors</h2>
              <Link href="/restaurants" className="text-xs font-black text-primary hover:underline uppercase tracking-widest">See All</Link>
            </div>
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 px-2">
              {MOCK_RESTAURANTS.map((shop) => (
                <Link key={shop.id} href={`/restaurants/${shop.id}`} className="flex flex-col items-center gap-3 shrink-0 group w-32">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white bg-white overflow-hidden relative shadow-xl transition-all group-hover:scale-105 group-hover:shadow-2xl">
                    <Image src={shop.imageUrl} alt={shop.name} fill className="object-cover p-3" />
                  </div>
                  <div className="text-center space-y-0.5">
                    <span className="text-[10px] md:text-xs font-black text-black block leading-none truncate w-full">{shop.name}</span>
                    <div className="flex items-center justify-center gap-1 text-[9px] text-gray-500 font-bold">
                      <Star className="w-2.5 h-2.5 fill-primary text-primary" /> {shop.rating}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* High Density: Trending Delicacies (Mutura, Supu, etc.) */}
          <section className="space-y-8 bg-gray-50 -mx-4 md:-mx-8 p-8 md:p-12 rounded-[3rem]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <Badge className="bg-accent text-black font-black uppercase tracking-widest text-[10px]">Hot Now</Badge>
                <h2 className="text-4xl font-black text-black uppercase tracking-tighter leading-none">Nairobi's Best Delicacies</h2>
                <p className="text-gray-500 font-bold text-sm">Legendary Mutura, Supu ya Kichwa, and Wet Fry delights.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {allDelicacies.slice(0, 5).map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          {/* Marketplace Layout: Premium Raw Meat & Butchery Essentials */}
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-black uppercase tracking-tighter leading-none">Butchery Marketplace</h2>
                <p className="text-gray-500 font-bold text-sm">Farm-fresh raw meat and premium cuts from verified shops.</p>
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {FILTER_PILLS.map((pill) => (
                  <Button key={pill} variant="outline" className="rounded-full bg-gray-50 border-none text-[10px] font-black px-4 h-9 shrink-0 uppercase tracking-widest hover:bg-gray-100">
                    {pill}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {allMeatProducts.map((item, idx) => (
                <ProductCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </section>

          {/* Essentials & Pantry Marketplace */}
          <section className="space-y-8 pb-20">
             <div className="flex items-center gap-4">
                <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">Pantry & Groceries</h2>
                <div className="h-0.5 flex-grow bg-gray-100" />
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {MOCK_MENU.filter(i => i.category === 'Grocery').map((item, idx) => (
                   <Link key={item.id} href="/restaurants" className="group space-y-3">
                      <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border group-hover:shadow-lg transition-all">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover p-4 transition-transform group-hover:scale-105" />
                        <Button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black text-white p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-black uppercase tracking-tighter truncate">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-500 italic">KES {item.price}</p>
                      </div>
                   </Link>
                ))}
             </div>
          </section>

          {/* High-Density Footer */}
          <footer className="pt-20 border-t mt-20 space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
              {/* Logo & Apps */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                   <ButcheryLogo className="w-12 h-12 text-black" />
                   <span className="font-headline text-3xl font-black tracking-tighter text-black uppercase">Steak West</span>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                    Nairobi's #1 digital marketplace for premium meat and delicacies. Supporting local butchers since 2024.
                  </p>
                  <div className="flex flex-row gap-2">
                    <div className="w-32 h-10 bg-black rounded-xl flex items-center justify-center text-white text-[9px] font-bold border border-white/10 px-2 cursor-pointer hover:bg-gray-900 transition-colors">
                      Download on the<br />App Store
                    </div>
                    <div className="w-32 h-10 bg-black rounded-xl flex items-center justify-center text-white text-[9px] font-bold border border-white/10 px-2 cursor-pointer hover:bg-gray-900 transition-colors">
                      GET IT ON<br />Google Play
                    </div>
                  </div>
                </div>
              </div>

              {/* Links Column 1 */}
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Company</h4>
                <div className="flex flex-col gap-4 text-xs font-bold text-gray-600">
                  <Link href="#" className="hover:text-primary transition-colors">Get Help</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Add Butchery</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Sign up to deliver</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Become a Partner</Link>
                </div>
              </div>

              {/* Links Column 2 */}
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Discover</h4>
                <div className="flex flex-col gap-4 text-xs font-bold text-gray-600">
                  <Link href="#" className="hover:text-primary transition-colors">Choma Near Me</Link>
                  <Link href="#" className="hover:text-primary transition-colors">View all cities</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Raw Meat Pickup</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Bulk Orders</Link>
                </div>
              </div>

              {/* Payments */}
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Accepted Payments</h4>
                <div className="grid grid-cols-2 gap-2">
                  {PAYMENT_METHODS.map((payment) => (
                    <div key={payment.name} className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100 group hover:border-primary/20 transition-all cursor-default">
                      {payment.icon ? (
                        <payment.icon className="w-4 h-4 text-primary" />
                      ) : (
                        <div className={cn("w-2 h-2 rounded-full", payment.color)} />
                      )}
                      <span className="text-[9px] font-black uppercase tracking-tighter text-gray-600">{payment.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-12 border-t flex flex-col items-center gap-8 pb-20 lg:pb-12">
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                  Created with love by <Link href="https://simonstyles.co.ke" target="_blank" className="text-black font-extrabold hover:underline">Simon Styles Technologies Limited</Link>
                </p>
                <div className="flex items-center justify-center gap-6">
                  <Link href="#"><Facebook className="w-6 h-6 hover:text-primary transition-colors" /></Link>
                  <Link href="#"><Twitter className="w-6 h-6 hover:text-primary transition-colors" /></Link>
                  <Link href="#"><Instagram className="w-6 h-6 hover:text-primary transition-colors" /></Link>
                  <Link href="#"><Globe className="w-6 h-6 hover:text-primary transition-colors" /></Link>
                </div>
                <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   <Link href="#" className="hover:underline">Privacy</Link>
                   <Link href="#" className="hover:underline">Terms</Link>
                   <p>© {new Date().getFullYear()} Steak West Butchery</p>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

// Reusable High-Density Product Card
function ProductCard({ item, idx }: { item: MenuItem, idx: number }) {
  return (
    <Link 
      href={`/restaurants/${item.restaurantId}`}
      className="group flex flex-col space-y-3"
    >
      {/* Image Container with Overlays */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-100 shadow-xl border border-black/5">
        <Image 
          src={item.imageUrl} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Market Overlay (Future marketplace shop name) */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-white/95 backdrop-blur shadow-sm text-black border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest">
            {idx % 3 === 0 ? "Steak West" : idx % 2 === 0 ? "City Grill" : "Mutura Hub"}
          </Badge>
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 backdrop-blur-[2px]">
          <div className="bg-white rounded-full px-6 py-3 flex items-center gap-3 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <WalkingIcon className="w-5 h-5 text-black" />
            <span className="text-xs font-black text-black uppercase tracking-widest">Quick Order</span>
          </div>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 left-4 z-10">
           <div className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-lg border border-white/20 uppercase tracking-tighter">
              KES {item.price}
           </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-1.5 px-2">
        <div className="flex justify-between items-start">
          <h3 className="font-black text-lg text-black group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight truncate w-full">
            {item.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest">
          <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-emerald-500" /> Top Choice</span>
          <span>•</span>
          <span>{((idx + 1) * 0.8).toFixed(1)} km</span>
        </div>
        <p className="text-[10px] font-bold text-gray-400 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

// Add missing icon
function Plus({ className }: { className?: string }) {
   return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
         <line x1="12" y1="5" x2="12" y2="19" />
         <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
   );
}
