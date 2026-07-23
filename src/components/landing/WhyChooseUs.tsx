
'use client';

import React from "react";
import { ShieldCheck, Truck, Utensils, Heart, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { 
    icon: <Heart className="w-8 h-8 text-primary" />, 
    title: "Premium Quality", 
    desc: "We source the best meat from trusted suppliers." 
  },
  { 
    icon: <ShieldCheck className="w-8 h-8 text-primary" />, 
    title: "Hygienic & Safe", 
    desc: "Professionally processed and packed." 
  },
  { 
    icon: <Truck className="w-8 h-8 text-primary" />, 
    title: "Fast Delivery", 
    desc: "Delivered fresh to your doorstep." 
  },
  { 
    icon: <Utensils className="w-8 h-8 text-primary" />, 
    title: "Affordable Prices", 
    desc: "Quality meat at competitive prices." 
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-primary/10 px-5 py-2 rounded-full">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.3em]">Quality Assured</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-black leading-[0.95] uppercase tracking-tighter">
                WE DELIVER MORE <br /> <span className="text-primary">THAN JUST MEAT.</span>
              </h2>
              <p className="text-zinc-500 text-[16px] md:text-[18px] leading-relaxed max-w-xl font-medium">
                At Steak West Butchery, we are committed to quality, hygiene and excellent customer service. Our farm-to-table process ensures you get the freshest cuts every single time.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button className="h-16 px-12 rounded-2xl bg-black hover:bg-zinc-900 text-white font-black uppercase text-[12px] tracking-widest gap-3 shadow-2xl transition-all hover:scale-105 active:scale-95">
                Learn More <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="h-16 px-12 rounded-2xl border-2 border-black font-black uppercase text-[12px] tracking-widest hover:bg-zinc-50 transition-all">
                Our Process
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:gap-10">
            {FEATURES.map((feature, i) => (
              <div key={feature.title} className="p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 space-y-6 hover:shadow-2xl hover:bg-white transition-all duration-700 hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-xl group-hover:bg-primary transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                   {React.cloneElement(feature.icon as React.ReactElement, {
                     className: "w-8 h-8 text-primary group-hover:text-white transition-colors"
                   })}
                </div>
                <div className="space-y-2">
                  <h4 className="text-[18px] font-black uppercase tracking-tighter text-black">{feature.title}</h4>
                  <p className="text-[13px] font-bold text-zinc-400 leading-relaxed uppercase tracking-wider">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
