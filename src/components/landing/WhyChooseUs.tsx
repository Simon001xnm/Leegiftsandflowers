'use client';

import React from "react";
import { ShieldCheck, Truck, Utensils, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { 
    icon: <Heart className="w-6 h-6 text-primary" />, 
    title: "Premium Quality", 
    desc: "We source the best meat from trusted suppliers." 
  },
  { 
    icon: <ShieldCheck className="w-6 h-6 text-primary" />, 
    title: "Hygienic & Safe", 
    desc: "All our meat is hygienically processed and packed." 
  },
  { 
    icon: <Truck className="w-6 h-6 text-primary" />, 
    title: "Fast Delivery", 
    desc: "We deliver to your doorstep on time, every time." 
  },
  { 
    icon: <Utensils className="w-6 h-6 text-primary" />, 
    title: "Affordable Prices", 
    desc: "Top quality meat at the best market prices." 
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-black text-[12px] uppercase tracking-[0.4em]">Why Choose Us</p>
              <h2 className="text-4xl md:text-6xl font-black text-black leading-tight uppercase tracking-tighter">
                We deliver more <br /> than just meat.
              </h2>
              <p className="text-muted-foreground text-[16px] leading-relaxed max-w-lg">
                At Steak West Butchery, we are committed to quality, hygiene and excellent customer service. Our farm-to-table process ensures you get the freshest cuts every single time.
              </p>
            </div>
            <Button className="h-14 px-10 rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase text-[12px] tracking-widest gap-3 shadow-xl shadow-primary/20">
              Learn More <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 space-y-4 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-[16px] font-black uppercase tracking-tighter">{feature.title}</h4>
                  <p className="text-[12px] font-medium text-muted-foreground leading-relaxed uppercase">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}