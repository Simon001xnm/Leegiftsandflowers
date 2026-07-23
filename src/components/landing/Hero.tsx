
'use client';

import React from "react";
import Image from "next/image";
import { MapPin, ArrowRight, ShieldCheck, Zap, Heart, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[100vh] min-h-[700px] flex items-center bg-black overflow-hidden">
      {/* Premium Sliced Steak Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
          alt="Premium Sliced Steak" 
          fill 
          className="object-cover opacity-70 scale-105 animate-pulse-slow"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 space-y-12">
        <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-12 duration-1000">
          <div className="space-y-4">
            <p className="text-primary font-black text-[12px] md:text-[14px] uppercase tracking-[0.5em] animate-in fade-in duration-1000 delay-300">
              The Gold Standard of Butchery
            </p>
            <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] uppercase tracking-tighter">
              FRESH MEAT.<br />
              <span className="text-white/50">FAST DELIVERY.</span>
            </h1>
            <p className="text-[14px] md:text-xl text-white/70 font-medium max-w-2xl leading-relaxed uppercase tracking-wider">
              Order beef, chicken, goat meat and more from Steak West Butchery. <br className="hidden md:block" />
              Freshly prepared, hygienically packed and delivered to your door.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 max-w-2xl bg-white/5 backdrop-blur-2xl rounded-3xl p-3 border border-white/10 shadow-2xl group transition-all hover:bg-white/10">
            <div className="flex items-center gap-3 px-6 py-4 flex-grow w-full">
              <MapPin className="text-primary w-6 h-6 shrink-0" />
              <input 
                placeholder="Enter your delivery location" 
                className="w-full bg-transparent outline-none text-white text-[15px] font-bold placeholder:text-white/30 uppercase tracking-widest"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button className="w-full md:w-auto h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase text-[12px] tracking-widest gap-2 shadow-2xl transition-all hover:scale-105 active:scale-95">
                Order Now <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8">
            {[
              { label: 'Fresh Daily Supply', icon: Zap },
              { label: 'Hygienic Processing', icon: ShieldCheck },
              { label: 'Fast Delivery', icon: Heart },
              { label: 'Premium Quality', icon: Trophy },
            ].map((badge) => (
              <div key={badge.label} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col gap-3 hover:bg-white/10 transition-all hover:-translate-y-1 group">
                <badge.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
