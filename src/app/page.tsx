
"use client";

import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { SidebarNav } from "@/components/SidebarNav";
import { PromotionalPopup } from "@/components/PromotionalPopup";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
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
  CreditCard
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
    {/* Bull Head */}
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
    {/* Crossed Knives Below Neck */}
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
  { label: 'Butchery', icon: Beef },
  { label: 'Grocery', icon: ShoppingBag },
  { label: 'Convenience', icon: Zap },
  { label: 'Alcohol', icon: Utensils },
  { label: 'Health', icon: Beef },
  { label: 'Retail', icon: Award },
  { label: 'Pet', icon: Award },
  { label: 'Flowers', icon: Flame },
  { label: 'Baby', icon: Utensils },
  { label: 'Personal Care', icon: Award },
];

const FILTER_PILLS = [
  "Offers", "Delivery fee", "Under 30 min", "Highest rated", "Rating", "Sort"
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
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <PromotionalPopup />
      
      <div className="flex flex-grow">
        <SidebarNav />
        
        <main className="flex-grow lg:ml-64 p-4 lg:p-8 space-y-10">
          {/* New Split Hero Section */}
          <div className="relative min-h-[450px] w-full rounded-3xl overflow-hidden bg-gray-50 border flex flex-col lg:flex-row">
            {/* Left Content */}
            <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center items-start space-y-6 z-10 bg-white">
              <Badge className="bg-primary text-white border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                Premium Butchery
              </Badge>
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-6xl font-black font-headline text-black tracking-tighter uppercase leading-[0.9]">
                  Crave it?<br />
                  <span className="text-primary">Order it.</span>
                </h1>
                <p className="text-gray-500 text-lg font-bold max-w-sm leading-tight">
                  Authentic Nairobi delicacies and farm-fresh meat cuts delivered in minutes.
                </p>
              </div>

              {/* Bull Head Logo with Knives */}
              <div className="flex flex-col items-center pt-4">
                <ButcheryLogo className="w-24 h-24 text-black mb-2" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Superior Quality</span>
              </div>

              <div className="flex gap-4 pt-6">
                <Button className="h-14 px-10 rounded-full bg-black text-white hover:bg-black/90 font-black shadow-2xl transition-transform active:scale-95">
                  Order Now
                </Button>
                <Button variant="outline" className="h-14 px-10 rounded-full border-2 border-black text-black hover:bg-black hover:text-white font-black transition-colors">
                  Browse Menu
                </Button>
              </div>
            </div>

            {/* Right Video Content */}
            <div className="flex-1 relative min-h-[300px] lg:min-h-full bg-black">
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

          {/* Horizontal Category Scroller */}
          <div className="relative group">
            <div className="flex gap-10 overflow-x-auto no-scrollbar pb-4 border-b">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href="/restaurants" className="flex flex-col items-center gap-2 group shrink-0">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary/5">
                    <cat.icon className="w-8 h-8 text-black group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-600 group-hover:text-black">{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {FILTER_PILLS.map((pill) => (
              <Button key={pill} variant="outline" className="rounded-full bg-gray-100 border-none text-xs font-bold px-4 h-9">
                {pill}
              </Button>
            ))}
          </div>

          {/* Promo Banners */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#FFF9E6] rounded-2xl p-6 flex items-center justify-between overflow-hidden relative group cursor-pointer h-44 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-3 max-w-[60%] z-10">
                <h3 className="text-xl font-black leading-tight">Try Steak West Prime free for 4 weeks</h3>
                <Button className="bg-white text-black hover:bg-gray-50 rounded-full font-bold px-5 h-9 text-xs shadow-sm">Join now</Button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2">
                <Image 
                  src="https://picsum.photos/seed/promo1/400/400" 
                  alt="Promo" 
                  fill 
                  className="object-cover transition-transform group-hover:scale-110"
                  data-ai-hint="grocery promo"
                />
              </div>
            </div>

            <div className="bg-[#FF912C] rounded-2xl p-6 flex items-center justify-between overflow-hidden relative group cursor-pointer h-44 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-3 max-w-[60%] z-10 text-black">
                <h3 className="text-xl font-black leading-tight">Late night cravings? Snacks and drinks near you</h3>
                <Button className="bg-white text-black hover:bg-gray-50 rounded-full font-bold px-5 h-9 text-xs shadow-sm">Order now</Button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2">
                <Image 
                  src="https://picsum.photos/seed/promo2/400/400" 
                  alt="Promo" 
                  fill 
                  className="object-cover transition-transform group-hover:scale-110"
                  data-ai-hint="late night food"
                />
              </div>
            </div>
          </div>

          {/* Circular Store Carousel */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-black">Stores near you</h2>
              <div className="flex items-center gap-2">
                <Link href="/restaurants" className="text-xs font-bold hover:underline">See all</Link>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="w-7 h-7 rounded-full"><ChevronLeft className="w-3 h-3" /></Button>
                  <Button variant="outline" size="icon" className="w-7 h-7 rounded-full"><ChevronRight className="w-3 h-3" /></Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {MOCK_RESTAURANTS.map((shop) => (
                <Link key={shop.id} href={`/restaurants/${shop.id}`} className="flex flex-col items-center gap-2 shrink-0 group">
                  <div className="w-24 h-24 rounded-full border bg-white overflow-hidden relative shadow-sm transition-shadow group-hover:shadow-md">
                    <Image src={shop.imageUrl} alt={shop.name} fill className="object-cover p-2" />
                  </div>
                  <span className="text-[10px] font-bold text-center w-24 line-clamp-1">{shop.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* High-Density Uber Eats Style Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
            {MOCK_RESTAURANTS.map((restaurant, idx) => (
              <Link 
                key={restaurant.id} 
                href={`/restaurants/${restaurant.id}`}
                className="group flex flex-col space-y-2"
              >
                {/* Image Container with Overlays */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                  <Image 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Promo Tag */}
                  <div className="absolute top-0 left-0 z-10">
                    <div className="bg-[#D92626] text-white text-[10px] font-bold px-2 py-1 flex items-center h-6">
                      {idx % 2 === 0 ? "KES 200 off KES 2,000+" : "Items on sale"}
                    </div>
                  </div>

                  {/* Pick it up Pill */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                      <WalkingIcon className="w-4 h-4 text-black" />
                      <span className="text-xs font-bold text-black">Pick it up</span>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[15px] text-black group-hover:underline truncate">{restaurant.name}</h3>
                  </div>
                  <p className="text-gray-500 text-[13px] font-medium leading-none">
                    Currently unavailable • {((idx + 1) * 1.2).toFixed(1)} km
                  </p>
                  <div className="flex items-center gap-1 text-[13px] text-gray-500">
                    <span className="font-bold text-black">{restaurant.rating}</span>
                    <Star className="w-3 h-3 fill-black text-black" />
                    <span className="opacity-80">({(idx + 1) * 10}+)</span>
                    <span className="mx-1 opacity-40">•</span>
                    <span className="opacity-80">Currently unavailable</span>
                  </div>
                  {idx === 1 && (
                    <div className="mt-1">
                      <span className="bg-[#E6F3E6] text-[#006E00] text-[11px] font-bold px-2 py-0.5 rounded">Great value</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* High-Density Uber Eats Style Footer */}
          <footer className="pt-16 pb-12 border-t mt-20 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
              {/* Logo & Apps */}
              <div className="space-y-8">
                <Link href="/" className="inline-block">
                  <span className="font-headline text-3xl font-black tracking-tighter text-black uppercase">
                    Steak West
                  </span>
                </Link>
                <div className="flex flex-col gap-3">
                  <Link href="#" className="w-32 h-10 bg-black rounded-lg flex items-center justify-center text-white text-[10px] font-bold border border-gray-800">
                    Download on the<br />App Store
                  </Link>
                  <Link href="#" className="w-32 h-10 bg-black rounded-lg flex items-center justify-center text-white text-[10px] font-bold border border-gray-800">
                    GET IT ON<br />Google Play
                  </Link>
                </div>
              </div>

              {/* Links Column 1 */}
              <div className="space-y-4">
                <Link href="#" className="block text-sm font-medium hover:underline">Get Help</Link>
                <Link href="#" className="block text-sm font-medium hover:underline">Add your restaurant</Link>
                <Link href="#" className="block text-sm font-medium hover:underline">Sign up to deliver</Link>
                <Link href="#" className="block text-sm font-medium hover:underline">Create a business account</Link>
              </div>

              {/* Links Column 2 */}
              <div className="space-y-4">
                <Link href="#" className="block text-sm font-medium hover:underline">Restaurants near me</Link>
                <Link href="#" className="block text-sm font-medium hover:underline">View all cities</Link>
                <Link href="#" className="block text-sm font-medium hover:underline">View all countries</Link>
                <Link href="#" className="block text-sm font-medium hover:underline">Pickup near me</Link>
                <Link href="#" className="block text-sm font-medium hover:underline">About Steak West</Link>
                <Link href="#" className="block text-sm font-medium hover:underline">Shop groceries</Link>
                <div className="flex items-center gap-2 pt-2 cursor-pointer hover:underline">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">English</span>
                </div>
              </div>

              {/* Accepted Payments Section */}
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Accepted Payments</h4>
                <div className="grid grid-cols-2 gap-2">
                  {PAYMENT_METHODS.map((payment) => (
                    <div key={payment.name} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                      {payment.icon ? (
                        <payment.icon className="w-4 h-4 text-primary" />
                      ) : (
                        <div className={cn("w-2 h-2 rounded-full", payment.color)} />
                      )}
                      <span className="text-[10px] font-bold whitespace-nowrap">{payment.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Socials */}
              <div className="flex gap-6">
                <Link href="#"><Facebook className="w-5 h-5 hover:text-primary transition-colors" /></Link>
                <Link href="#"><Twitter className="w-5 h-5 hover:text-primary transition-colors" /></Link>
                <Link href="#"><Instagram className="w-5 h-5 hover:text-primary transition-colors" /></Link>
              </div>

              {/* Attribution */}
              <div className="text-center md:text-left space-y-1">
                <p className="text-sm text-muted-foreground font-medium">
                  Created with love by <Link href="https://simonstyles.co.ke" target="_blank" className="text-black font-extrabold hover:underline">Simon Styles Technologies Limited</Link>
                </p>
                <Link href="https://simonstyles.co.ke" target="_blank" className="block text-[10px] text-primary font-bold hover:underline tracking-widest uppercase">
                  simonstyles.co.ke
                </Link>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium">
                <Link href="#" className="hover:underline">Privacy Policy</Link>
                <Link href="#" className="hover:underline">Terms</Link>
                <Link href="#" className="hover:underline">Pricing</Link>
                <Link href="#" className="hover:underline hidden lg:block">Do not sell or share my personal information</Link>
                <p className="text-gray-400 opacity-80">© {new Date().getFullYear()} Steak West Butchery</p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
