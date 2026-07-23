'use client';

import React from "react";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[100vh] min-h-[700px] flex items-center bg-black overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
          alt="Premium Steak" 
          fill 
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 space-y-8">
        <div className="max-w-3xl space-y-6">
          <p className="text-primary font-black text-[12px] md:text-[14px] uppercase tracking-[0.3em]">
            Premium Quality, Fresh Everyday
          </p>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] uppercase tracking-tighter">
            Fresh Meat. <br /> <span className="text-white">Fast Delivery.</span>
          </h1>
          <p className="text-[14px] md:text-lg text-white/70 font-medium max-w-xl leading-relaxed">
            Order beef, chicken, goat meat and more from Steak West Butchery. Freshly prepared, professionally packed and delivered to your door.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-0 max-w-xl bg-white/10 backdrop-blur-md rounded-2xl md:rounded-full p-2 border border-white/20">
            <div className="flex items-center gap-3 px-6 py-4 flex-grow w-full">
              <MapPin className="text-primary w-5 h-5 shrink-0" />
              <input 
                placeholder="Enter your delivery location" 
                className="w-full bg-transparent outline-none text-white text-[14px] font-medium placeholder:text-white/40"
              />
            </div>
            <Button className="w-full md:w-auto h-14 md:h-12 px-10 bg-primary hover:bg-primary/90 text-white rounded-xl md:rounded-full font-black uppercase text-[12px] tracking-widest gap-2">
              Order Now <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-8 pt-6">
            {[
              { icon: '🥩', label: 'Fresh Daily Supply' },
              { icon: '🛡️', label: 'Hygienic Processing' },
              { icon: '🚚', label: 'Fast & Reliable Delivery' },
              { icon: '🏆', label: '100% Premium Quality' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-[11px] font-black text-white/60 uppercase tracking-widest">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}