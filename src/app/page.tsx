'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Truck, 
  ShieldCheck, 
  Star, 
  ChevronRight,
  MapPin,
  Flame
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const products = [
  { id: 'p1', name: "Premium Beef Steak", price: "Ksh 850/kg", image: "https://picsum.photos/seed/steak1/600/800" },
  { id: 'p2', name: "BBQ Family Pack", price: "Ksh 2499", image: "https://picsum.photos/seed/bbq1/600/800" },
  { id: 'p3', name: "Fresh Chicken", price: "Ksh 600", image: "https://picsum.photos/seed/chicken1/600/800" },
  { id: 'p4', name: "Goat Meat Choma", price: "Ksh 750/kg", image: "https://picsum.photos/seed/goat1/600/800" },
  { id: 'p5', name: "Beef Mince Extra", price: "Ksh 650/kg", image: "https://picsum.photos/seed/mince1/600/800" },
  { id: 'p6', name: "Mutton Chops", price: "Ksh 950/kg", image: "https://picsum.photos/seed/mutton1/600/800" }
];

export default function App() {
  const { addToCart, itemCount } = useCart();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = (p: any) => {
    addToCart({
      id: p.id,
      restaurantId: 'r1',
      name: p.name,
      price: parseInt(p.price.replace(/[^0-9]/g, '')),
      description: '',
      imageUrl: p.image,
      category: 'Selection'
    });
    toast({ title: "READY", description: `${p.name} added to basket.` });
  };

  return (
    <div className="bg-black text-white min-h-screen font-body selection:bg-red-600 selection:text-white">
      {/* NAVBAR */}
      <nav className={`flex justify-between items-center px-6 md:px-12 py-5 fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <Link href="/" className="group flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase">
            <span className="text-red-600">🥩 STEAK WEST</span>
            <span className="text-white"> BUTCHERY</span>
          </h1>
        </Link>

        <div className="space-x-8 hidden md:flex">
          {['Home', 'Shop', 'Offers', 'Contact'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
              {item}
            </Link>
          ))}
        </div>

        <Link href="/checkout">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-red-600/20 relative">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest hidden sm:inline">Basket</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-red-600 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-red-600">
                {itemCount}
              </span>
            )}
          </button>
        </Link>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 md:px-12 grid lg:grid-cols-2 items-center gap-12 lg:gap-20 min-h-[85vh]">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
              FRESH MEAT.<br />
              <span className="text-red-600">FAST DELIVERY.</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-white/50 text-base md:text-xl max-w-xl font-medium leading-relaxed"
          >
            Premium beef, chicken and goat meat prepared with elite precision, 
            hygienically packed and dispatched fresh to your doorstep within 25 minutes.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Button className="bg-red-600 hover:bg-red-700 text-white h-16 px-10 rounded-full font-black uppercase text-[12px] tracking-[0.2em] shadow-2xl shadow-red-600/20 group">
              Order Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-2 border-white/10 bg-transparent text-white h-16 px-10 rounded-full font-black uppercase text-[12px] tracking-[0.2em] hover:bg-white hover:text-black transition-all">
              View Products
            </Button>
          </div>

          <div className="flex gap-12 pt-4">
            {[
              { val: "10K+", label: "Customers" },
              { val: "50+", label: "Products" },
              { val: "4.8★", label: "Rating" }
            ].map((stat) => (
              <div key={stat.label}>
                <h2 className="text-3xl font-black tracking-tighter">{stat.val}</h2>
                <p className="text-[10px] uppercase font-black tracking-widest text-white/30">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE AREA */}
        <div className="relative group">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(255,0,0,0.15)] border border-white/5"
          >
            <Image 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
              alt="Premium Steak" 
              fill 
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 -left-6 md:left-10 bg-white text-black p-6 md:p-8 rounded-[2rem] shadow-2xl space-y-3 border-4 border-black group-hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-2 text-red-600">
              <Flame className="w-5 h-5 fill-current" />
              <h3 className="font-black uppercase text-[10px] tracking-[0.2em]">Today's Special</h3>
            </div>
            <div className="space-y-0.5">
              <p className="font-black text-2xl uppercase tracking-tighter">Premium BBQ Pack</p>
              <p className="text-3xl font-black text-red-600">Ksh 2499</p>
            </div>
            <Button size="sm" className="w-full rounded-xl bg-black text-white font-black uppercase text-[9px] tracking-widest h-10">Dispatch Now</Button>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-8 px-6 md:px-12 py-24 bg-zinc-950/50">
        <Feature 
          icon={<ShieldCheck className="w-8 h-8" />} 
          title="Premium Quality" 
          text="Elite selections sourced directly from local high-grade farms." 
        />
        <Feature 
          icon={<Truck className="w-8 h-8" />} 
          title="Fast Delivery" 
          text="Average dispatch time of 25 minutes to your kitchen node." 
        />
        <Feature 
          icon={<Star className="w-8 h-8" />} 
          title="Trusted" 
          text="Over 10,000 satisfied households trust our hygiene standards." 
        />
      </section>

      {/* PRODUCTS */}
      <section className="px-6 md:px-12 py-24">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <p className="text-red-600 font-black text-[10px] uppercase tracking-[0.4em]">The Marketplace</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Popular Picks</h2>
          </div>
          <Link href="/shop" className="text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-red-600 transition-colors flex items-center gap-2 group">
            View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -10 }}
              className="bg-zinc-900/40 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-red-600/30 transition-all group"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4">
                  <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Star className="w-3 h-3 fill-red-600 text-red-600" />
                    <span className="text-[10px] font-black">4.9</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-tight">{p.name}</h3>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-red-600 font-black text-xl">{p.price}</p>
                  <button 
                    onClick={() => handleAddToCart(p)}
                    className="bg-white text-black hover:bg-red-600 hover:text-white p-3 rounded-2xl transition-all active:scale-90"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MINI FOOTER */}
      <footer className="px-6 md:px-12 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 bg-black">
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">© 2026 STEAK WEST NETWORK.</span>
        </div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/40">
           <Link href="/terms" className="hover:text-white transition-colors">Privacy</Link>
           <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
           <Link href="/contact" className="hover:text-white transition-colors">+254 704 524070</Link>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5 space-y-6 hover:bg-zinc-900 transition-colors"
    >
      <div className="text-red-600 bg-red-600/10 w-16 h-16 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">{title}</h3>
        <p className="text-white/40 text-[14px] font-medium leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}
