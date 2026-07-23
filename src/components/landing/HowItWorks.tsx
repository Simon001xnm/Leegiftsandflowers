
'use client';

import React from "react";

const STEPS = [
  { step: "01", title: "Select Cuts", desc: "Choose from our premium selection." },
  { step: "02", title: "Secure Pay", desc: "Instant mobile checkout." },
  { step: "03", title: "Enjoy", desc: "Farm fresh meat at your door." },
];

export function HowItWorks() {
  return (
    <section className="space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-black">How It Works</h2>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Pure simplicity</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-12">
        {STEPS.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-4">
            <span className="text-5xl font-black text-gray-100 leading-none">{item.step}</span>
            <div className="space-y-2">
              <h4 className="text-[14px] font-black uppercase tracking-tighter">{item.title}</h4>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest leading-relaxed max-w-[200px]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
