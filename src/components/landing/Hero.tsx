
'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-[#f7f7f7] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
          alt="Hero Background" 
          fill 
          className="object-cover opacity-10 md:opacity-20"
          priority
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center space-y-8 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
            Premium Meat <br className="hidden md:block" /> <span className="text-primary">Dispatched.</span>
          </h1>
          <p className="text-[12px] md:text-base font-bold text-gray-500 uppercase tracking-widest">
            Straight from the farm to your doorstep in 30 minutes.
          </p>
        </div>

        <div className="max-w-2xl mx-auto w-full bg-white shadow-2xl rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-center gap-2 border-4 border-black/5">
          <div className="flex items-center gap-3 px-4 py-3 flex-grow w-full border-b md:border-b-0 md:border-r">
            <MapPin className="text-primary w-5 h-5 shrink-0" />
            <span className="text-[13px] font-black uppercase tracking-tight truncate text-left">Silver Heights, Nairobi</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 flex-grow w-full">
            <Search className="text-gray-400 w-5 h-5 shrink-0" />
            <input 
              placeholder="What are you craving?" 
              className="w-full bg-transparent outline-none text-[13px] font-bold uppercase placeholder:text-gray-300"
            />
          </div>
          <Link href="/restaurants" className="w-full md:w-auto">
            <button className="w-full h-12 md:h-14 px-8 bg-black text-white rounded-xl md:rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-primary transition-all active:scale-95">
              Search
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
