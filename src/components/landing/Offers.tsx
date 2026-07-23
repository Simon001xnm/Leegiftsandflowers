
'use client';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tag } from "lucide-react";

export function Offers() {
  return (
    <section className="bg-primary py-24 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 text-white text-center lg:text-left animate-in slide-in-from-left-8 duration-1000">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 mb-2">
                <Tag className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Signature Bundle</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                WEEKEND<br />BBQ PACK
              </h2>
              <div className="space-y-2">
                 <p className="text-[20px] md:text-[24px] font-black opacity-90 uppercase tracking-tighter leading-tight">
                    2kg Beef • 2kg Chicken<br className="md:hidden" /> • Sausages • Free Marinade
                 </p>
                 <p className="text-white/70 text-[14px] font-bold uppercase tracking-widest">Limited availability for local dispatch</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
              <div className="space-y-0.5">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60">Price Node</p>
                <div className="flex items-center gap-4">
                  <span className="text-5xl md:text-7xl font-black">KES 2,499</span>
                  <div className="flex flex-col">
                    <span className="text-xl line-through opacity-40 font-black">KES 3,000</span>
                    <span className="text-[11px] bg-black text-white px-2 py-0.5 rounded font-black">-17%</span>
                  </div>
                </div>
              </div>
              <Button className="h-16 px-12 bg-black text-white hover:bg-zinc-900 rounded-2xl font-black uppercase text-[14px] tracking-widest shadow-2xl active:scale-95 transition-all gap-3">
                Order Now <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="relative aspect-square lg:h-[600px] animate-in zoom-in-95 duration-1000">
             <div className="absolute inset-0 bg-white/20 rounded-[4rem] scale-105 blur-3xl" />
             <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] border-[12px] border-white/10 transform rotate-3 hover:rotate-0 transition-all duration-700">
               <Image 
                 src="https://images.unsplash.com/photo-1529692236671-61f66cb8a0b5?q=80&w=2070&auto=format&fit=crop" 
                 alt="BBQ Signature Pack" 
                 fill 
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
               <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10">
                 <p className="text-[14px] font-black text-white uppercase tracking-[0.3em]">STEAK WEST <span className="text-primary">ELITE DISPATCH</span></p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
