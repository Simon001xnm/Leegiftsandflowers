
'use client';

import React from "react";
import { ShieldCheck, Truck, Utensils, Heart } from "lucide-react";

const BENEFITS = [
  { icon: ShieldCheck, title: "Farm Fresh", desc: "Quality guaranteed from source." },
  { icon: Truck, title: "30 Min Delivery", desc: "Fastest dispatch in Nairobi." },
  { icon: Utensils, title: "Chef Approved", desc: "Premium cuts for every meal." },
  { icon: Heart, title: "Community First", desc: "Supporting local vendors." },
];

export function WhyChooseUs() {
  return (
    <section className="py-12 bg-gray-50 border-y">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {BENEFITS.map((benefit, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[12px] font-black uppercase tracking-tighter">{benefit.title}</h4>
                <p className="text-[10px] font-medium text-muted-foreground uppercase leading-tight">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
