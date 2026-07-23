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
    <div className="flex flex-col min-h-screen bg-black">
      <Hero />
      <Categories />
      <Products />
      <WhyChooseUs />
      <Offers />
      <div className="bg-primary py-12">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Happy Customers', val: '10K+' },
            { label: 'Products', val: '50+' },
            { label: 'Delivery Riders', val: '20+' },
            { label: 'Customer Rating', val: '4.8★' },
          ].map((stat) => (
            <div key={stat.label} className="text-center text-white space-y-1">
              <p className="text-4xl font-black">{stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <HowItWorks />
      <Testimonials />
      <MobileApp />
      <Footer />
    </div>
  );
}