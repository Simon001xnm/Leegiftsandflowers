'use client';

import React from "react";
import { Tag, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function OffersPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <header className="mb-12 space-y-2">
          <h1 className="text-4xl font-medium tracking-tight">Active offers</h1>
          <p className="text-muted-foreground text-lg">Grab the best deals on premium cuts and refreshments.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Hero Offer */}
          <div className="col-span-full bg-red-600 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-12 text-white shadow-2xl relative">
            <div className="absolute top-6 right-8 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">Ends in 4h 20m</span>
            </div>
            <div className="space-y-6 flex-grow">
              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-widest opacity-80">Flash sale</p>
                <h2 className="text-4xl md:text-6xl font-medium leading-none tracking-tighter">Weekend BBQ pack</h2>
                <p className="text-xl opacity-90 font-medium">2kg Beef + 2kg Chicken + Free Marinade</p>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Now only</p>
                  <p className="text-4xl font-medium">KSh 2,499</p>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div>
                  <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">Save</p>
                  <p className="text-4xl font-medium">17%</p>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="h-14 px-10 bg-white text-red-600 hover:bg-gray-100 rounded-2xl font-bold text-base shadow-xl transition-all active:scale-95 mt-4">
                  Claim offer now <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative w-full md:w-[400px] h-[300px] mt-8 md:mt-0">
               <Image 
                 src="/BEEF CHOMA.jpg" 
                 alt="BBQ Pack" 
                 fill 
                 className="object-cover rounded-[2rem] shadow-2xl rotate-3"
               />
            </div>
          </div>

          {/* Secondary Offers */}
          <OfferCard 
            title="Sausage party"
            desc="Buy 5 packets, get 1 free on all beef sausages."
            code="B5G1SAUSAGE"
            bg="bg-black"
          />
          <OfferCard 
            title="Drink sync"
            desc="KSh 100 off on all 2L soda packs with any meat order."
            code="DRINKSYNC"
            bg="bg-gray-100"
            light
          />
        </div>
      </div>
    </div>
  );
}

function OfferCard({ title, desc, code, bg, light = false }: any) {
  return (
    <div className={cn("p-10 rounded-[2.5rem] space-y-6 relative overflow-hidden", bg)}>
      <div className={cn("space-y-2", light ? "text-black" : "text-white")}>
        <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-bold">
          <Tag className="w-3 h-3" /> Offer
        </div>
        <h3 className="text-3xl font-medium tracking-tight">{title}</h3>
        <p className="opacity-70 leading-relaxed font-medium">{desc}</p>
      </div>
      <div className={cn("border-t pt-6 flex items-center justify-between", light ? "border-black/5" : "border-white/10")}>
        <div className="space-y-1">
          <p className={cn("text-[10px] uppercase font-bold opacity-40", light ? "text-black" : "text-white")}>Coupon code</p>
          <p className={cn("font-mono font-medium text-lg", light ? "text-black" : "text-white")}>{code}</p>
        </div>
        <Button variant={light ? "default" : "outline"} className={cn("rounded-xl h-10 px-6 font-bold", light ? "bg-black text-white" : "text-white border-white/20 hover:bg-white/10")}>
          Apply
        </Button>
      </div>
    </div>
  );
}
