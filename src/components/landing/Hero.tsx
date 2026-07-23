'use client';

import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-black overflow-hidden">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/From%20Klickpin.com-%2013933080092165366-pin-id-13933080092165366.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
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
