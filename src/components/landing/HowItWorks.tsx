
'use client';

import React from "react";
import { ShoppingBag, Utensils, Truck, ChevronRight } from "lucide-react";

const STEPS = [
  { 
    icon: <ShoppingBag className="w-10 h-10 text-primary" />, 
    title: "Choose Products", 
    desc: "Browse and select your favorite products from our nodes." 
  },
  { 
    icon: <Utensils className="w-10 h-10 text-primary" />, 
    title: "Place Your Order", 
    desc: "We prepare your order with elite precision and care." 
  },
  { 
    icon: <Truck className="w-10 h-10 text-primary" />, 
    title: "Fast Delivery", 
    desc: "We deliver fresh to your door within 25 minutes." 
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#0c0c0c] py-32 border-t border-white/5">
      <div className="container mx-auto px-6 text-center space-y-24">
        <div className="space-y-4 max-w-3xl mx-auto">
          <p className="text-primary font-black text-[12px] uppercase tracking-[0.5em]">The Dispatch Process</p>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">FRESH MEAT DELIVERED IN 3 SIMPLE STEPS</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-16 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-white/10 -translate-y-12 z-0" />
          
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center space-y-8 relative z-10 group">
              <div className="w-28 h-28 rounded-[3rem] bg-white/5 border-2 border-white/10 flex items-center justify-center shadow-2xl group-hover:bg-primary group-hover:border-primary transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 relative">
                <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-primary text-white font-black text-lg flex items-center justify-center border-4 border-[#0c0c0c] group-hover:bg-white group-hover:text-primary transition-all">
                  {i + 1}
                </span>
                {React.cloneElement(step.icon as React.ReactElement, {
                  className: "w-10 h-10 text-primary group-hover:text-white transition-colors duration-500"
                })}
              </div>
              <div className="space-y-3">
                <h4 className="text-[22px] font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors">{step.title}</h4>
                <p className="text-[14px] text-white/30 font-bold max-w-[240px] mx-auto uppercase tracking-widest leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
