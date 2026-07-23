'use client';

import React from "react";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-black overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
          alt="Premium Sliced Steak" 
          fill 
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            FRESH MEAT. <span className="text-primary">DISPATCHED.</span>
          </h1>
          <p className="text-[12px] md:text-[14px] font-black text-white/50 uppercase tracking-[0.4em]">
            Elite Quality • 25 Min Delivery
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 max-w-2xl mx-auto bg-white/5 backdrop-blur-2xl rounded-2xl p-2 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 px-6 py-4 flex-grow w-full">
            <MapPin className="text-primary w-5 h-5 shrink-0" />
            <input 
              placeholder="Set delivery location" 
              className="w-full bg-transparent outline-none text-white text-[14px] font-bold placeholder:text-white/20 uppercase tracking-widest"
            />
          </div>
          <Button className="w-full md:w-auto h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-xl font-black uppercase text-[12px] tracking-widest gap-2 shadow-2xl">
            Order Now
          </Button>
        </div>
      </div>
    </section>
  );
}
