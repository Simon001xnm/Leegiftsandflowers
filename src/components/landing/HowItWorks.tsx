'use client';

import React from "react";
import { ShoppingBag, Utensils, Truck } from "lucide-react";

const STEPS = [
  { 
    icon: <ShoppingBag className="w-8 h-8 text-primary" />, 
    title: "Choose Products", 
    desc: "Browse and select your favorite products." 
  },
  { 
    icon: <Utensils className="w-8 h-8 text-primary" />, 
    title: "Place Your Order", 
    desc: "We prepare your order with care." 
  },
  { 
    icon: <Truck className="w-8 h-8 text-primary" />, 
    title: "Fast Delivery", 
    desc: "We deliver fresh to your door." 
  },
];

export function HowItWorks() {
  return (
    <section className="bg-brand-dark py-24 border-t border-white/5">
      <div className="container mx-auto px-6 text-center space-y-16">
        <div className="space-y-4">
          <p className="text-primary font-black text-[12px] uppercase tracking-[0.4em]">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Fresh Meat Delivered in 3 Simple Steps</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-px border-t border-dashed border-white/10 -translate-y-8" />
          
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center space-y-6 relative z-10">
              <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl group hover:bg-primary transition-all duration-500">
                {step.icon}
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white font-black text-sm flex items-center justify-center border-2 border-brand-dark">
                  {i + 1}
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-[18px] font-black text-white uppercase tracking-tighter">{step.title}</h4>
                <p className="text-[14px] text-white/40 font-medium max-w-[200px] mx-auto uppercase">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}