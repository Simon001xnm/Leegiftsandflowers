'use client';

import React from "react";
import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { Products } from "@/components/landing/Products";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black scroll-smooth">
      <Hero />
      
      {/* Visual Discovery */}
      <Categories />

      {/* The Main Marketplace - 85% of page space */}
      <div className="pb-24">
        <Products />
      </div>

      <Footer />
    </div>
  );
}
