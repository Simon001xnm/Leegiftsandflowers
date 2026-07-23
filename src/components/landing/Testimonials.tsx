'use client';

import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="bg-brand-dark py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-4">
              <p className="text-primary font-black text-[12px] uppercase tracking-[0.4em]">What Our Customers Say</p>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Trusted by Thousands</h2>
            </div>

            <div className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl">
              <Quote className="w-12 h-12 text-primary absolute -top-6 -left-6" />
              <div className="space-y-8">
                <p className="text-xl md:text-2xl text-white/80 font-medium italic leading-relaxed">
                  "The quality of meat is unmatched! Always fresh, well packaged and delivered on time. Steak West is truly the best in Nairobi."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary relative">
                    <Image src="https://picsum.photos/seed/user1/100/100" alt="Customer" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-black text-white uppercase">James Mwangi</h4>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white/5">
              <Image src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80" alt="Fresh Delivery" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white space-y-2">
                <p className="text-[40px] font-black leading-none">4.8★</p>
                <p className="text-[12px] font-black uppercase tracking-widest opacity-60">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}