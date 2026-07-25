'use client';

import React from "react";
import { MapPin, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[65vh] md:h-[80vh] min-h-[500px] flex items-center justify-center bg-black overflow-hidden">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-frying-meat-in-a-pan-3331-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center space-y-10">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <Badge variant="outline" className="text-primary border-primary font-black px-4 py-1 tracking-[0.4em] uppercase text-[10px] rounded-none">
             Elite Meat Distribution
           </Badge>
           <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
             THE MEAT NETWORK<br />OF NAIROBI.
           </h1>
           <p className="text-white/60 text-lg md:text-2xl font-medium max-w-2xl mx-auto uppercase tracking-wide">
             Premium cuts from the farm to your kitchen in 25 minutes.
           </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto bg-white/5 backdrop-blur-3xl rounded-[2rem] p-2 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <div className="flex items-center gap-3 px-8 py-5 flex-grow w-full group">
            <MapPin className="text-primary w-6 h-6 shrink-0 transition-transform group-hover:scale-110" />
            <input 
              placeholder="Set delivery location in Nairobi..." 
              className="w-full bg-transparent outline-none text-white text-[15px] font-bold placeholder:text-white/20 uppercase tracking-widest"
            />
          </div>
          <Button className="w-full md:w-auto h-16 px-12 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase text-[13px] tracking-widest gap-3 shadow-2xl active:scale-95 transition-all">
            Order Now <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function Badge({ children, variant, className }: any) {
  return (
    <div className={`inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
}
