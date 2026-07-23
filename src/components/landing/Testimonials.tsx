
'use client';

import React from "react";
import Image from "next/image";
import { Star, Quote, Sparkles } from "lucide-react";

export function Testimonials() {
  return (
    <section className="bg-black py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-white/5 px-5 py-2 rounded-full border border-white/10">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-black text-white/60 uppercase tracking-[0.4em]">Community Proof</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">TRUSTED BY<br /><span className="text-primary">THOUSANDS.</span></h2>
            </div>

            <div className="relative p-12 rounded-[4rem] bg-white/5 border border-white/10 shadow-2xl backdrop-blur-3xl group hover:bg-white/10 transition-all duration-700">
              <Quote className="w-16 h-16 text-primary absolute -top-8 -left-8 opacity-20 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-10">
                <p className="text-2xl md:text-3xl text-white/90 font-black italic leading-tight tracking-tight">
                  "The meat quality is unmatched! Always fresh, well packaged and delivered on time. Steak West is truly the best in Nairobi."
                </p>
                <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-primary relative transform -rotate-3 group-hover:rotate-0 transition-all">
                    <Image src="https://picsum.photos/seed/user2/200/200" alt="Customer" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-[20px] font-black text-white uppercase tracking-tighter">James Mwangi</h4>
                    <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-2">Verified Customer</p>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] border-[16px] border-white/5 group">
              <Image src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80" alt="Fresh Delivery" fill className="object-cover opacity-80 group-hover:scale-105 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 text-white space-y-3">
                <div className="flex items-baseline gap-2">
                   <p className="text-7xl font-black leading-none">4.8</p>
                   <Star className="w-8 h-8 fill-primary text-primary" />
                </div>
                <p className="text-[12px] font-black uppercase tracking-[0.4em] opacity-60">AVERAGE CUSTOMER RATING</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
