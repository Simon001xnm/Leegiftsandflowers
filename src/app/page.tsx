
'use client';

import React from "react";
import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { Products } from "@/components/landing/Products";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { Offers } from "@/components/landing/Offers";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { MobileApp } from "@/components/landing/MobileApp";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black scroll-smooth">
      <Hero />
      
      {/* Global Statistics Strip */}
      <div className="bg-[#921c1c] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 50%, white 50%, white 75%, transparent 75%, transparent)', backgroundSize: '20px 20px' }} />
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          {[
            { label: 'Happy Customers', val: '10K+' },
            { label: 'Products Ready', val: '50+' },
            { label: 'Active Riders', val: '20+' },
            { label: 'Average Rating', val: '4.8★' },
          ].map((stat) => (
            <div key={stat.label} className="text-center text-white space-y-2 group transition-all hover:scale-110">
              <p className="text-5xl md:text-6xl font-black tracking-tighter leading-none group-hover:text-white transition-colors">{stat.val}</p>
              <div className="h-1 w-12 bg-white/20 mx-auto rounded-full group-hover:w-20 transition-all group-hover:bg-white" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Categories />
      <Products />
      <WhyChooseUs />
      <Offers />
      <HowItWorks />
      <Testimonials />
      <MobileApp />
      <Footer />
    </div>
  );
}
