'use client';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Offers() {
  return (
    <section className="bg-brand-red py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <Image src="https://images.unsplash.com/photo-1529692236671-61f66cb8a0b5?q=80" alt="" fill className="object-cover" />
      </div>
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-grow space-y-6 text-white text-center md:text-left z-10">
          <p className="text-white/70 font-black text-[12px] uppercase tracking-[0.4em]">Special Offers</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Weekend BBQ Pack</h2>
          <p className="text-[18px] font-medium opacity-80">2kg Beef, 2kg Chicken, Sausages + Free Marinade</p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <span className="text-4xl font-black">KSh 2,499</span>
            <span className="text-xl line-through opacity-40">KSh 3,000</span>
          </div>
          <Button className="h-14 px-12 bg-white text-primary hover:bg-gray-100 rounded-full font-black uppercase text-[14px] tracking-widest shadow-2xl active:scale-95 transition-all">
            Order Now
          </Button>
        </div>

        <div className="relative w-full md:w-[500px] aspect-square z-10">
           <div className="absolute inset-0 bg-white/10 rounded-full scale-110 blur-3xl" />
           <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10 transform md:rotate-3">
             <Image 
               src="https://images.unsplash.com/photo-1529692236671-61f66cb8a0b5?q=80&w=2070&auto=format&fit=crop" 
               alt="BBQ Pack" 
               fill 
               className="object-cover"
             />
             <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
               <p className="text-[12px] font-black text-white uppercase tracking-widest">STEAK WEST <span className="text-primary">SPECIAL</span></p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}