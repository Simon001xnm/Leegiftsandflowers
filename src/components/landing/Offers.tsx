
'use client';

import React from "react";
import { Badge } from "@/components/ui/badge";

export function Offers() {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="relative h-48 rounded-[2rem] overflow-hidden bg-black group cursor-pointer">
        <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" alt="" />
        <div className="absolute inset-0 p-8 flex flex-col justify-center space-y-2">
          <Badge className="w-fit bg-primary text-white rounded-none font-black text-[10px] uppercase">Flash Sale</Badge>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Prime T-Bone <br /> 20% OFF</h3>
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Valid until midnight</p>
        </div>
      </div>
      
      <div className="relative h-48 rounded-[2rem] overflow-hidden bg-emerald-600 group cursor-pointer">
        <img src="https://images.unsplash.com/photo-1529692236671-61f66cb8a0b5?q=80&w=2070" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" alt="" />
        <div className="absolute inset-0 p-8 flex flex-col justify-center space-y-2">
          <Badge className="w-fit bg-white text-emerald-600 rounded-none font-black text-[10px] uppercase">New Arrival</Badge>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Traditional <br /> Nyama Choma</h3>
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Sourced daily from the market</p>
        </div>
      </div>
    </section>
  );
}
