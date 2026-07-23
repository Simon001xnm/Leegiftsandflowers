
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

/**
 * CUSTOMER LANDING PAGE - "THE SWEETNESS OF SHOPPING"
 * Modular architecture for professional retail presentation.
 */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Hero />
      <Categories />
      
      <main className="container mx-auto px-4 py-12 space-y-20">
        <Products />
        <WhyChooseUs />
        <Offers />
        <HowItWorks />
        <Testimonials />
        <MobileApp />
      </main>

      <Footer />
    </div>
  );
}
