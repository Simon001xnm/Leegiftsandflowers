
'use client';

import React from "react";
import { ShieldCheck, Truck, Heart, Star, MapPin } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-20 text-center space-y-4">
          <p className="text-red-600 font-bold text-[13px] uppercase tracking-widest">Our story</p>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-none">The meat network of Nairobi.</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Steak West Butchery is committed to delivering elite quality meat from the farm directly to your kitchen in under 25 minutes.</p>
        </header>

        <section className="relative h-[400px] rounded-[3rem] overflow-hidden mb-20">
          <Image 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80" 
            alt="Butchery operations" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-8">
             <div className="max-w-2xl space-y-4">
                <h2 className="text-3xl md:text-4xl text-white font-medium">Quality you can trust.</h2>
                <p className="text-white/80">Every cut is inspected by our master butchers at Stall 16A, City Market, ensuring you get nothing but the best.</p>
             </div>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-12 mb-20">
           <AboutStat icon={Heart} title="Premium quality" desc="We source the best meat from trusted local suppliers who share our values." />
           <AboutStat icon={ShieldCheck} title="Hygienic & safe" desc="Professionally processed and vacuum packed to maintain absolute freshness." />
           <AboutStat icon={Truck} title="Fast dispatch" desc="Our elite rider network ensures your order arrives within 25 minutes." />
        </div>

        <section className="bg-gray-50 rounded-[3rem] p-10 md:p-20 flex flex-col md:flex-row items-center gap-12">
           <div className="space-y-6 flex-grow">
              <h2 className="text-4xl font-medium tracking-tight">Visit our node.</h2>
              <p className="text-muted-foreground leading-relaxed">Located in the heart of Nairobi, our main distribution center at City Market handles thousands of orders daily. Come experience the freshness first hand.</p>
              <div className="flex items-center gap-3 text-red-600 font-bold">
                 <MapPin className="w-5 h-5" />
                 <span>Stall 16A, City Market, Nairobi</span>
              </div>
           </div>
           <div className="relative w-full md:w-[300px] h-[300px] shrink-0">
              <Image 
                src="https://picsum.photos/seed/market/600/600" 
                alt="City Market Location" 
                fill 
                className="object-cover rounded-full border-8 border-white shadow-2xl"
              />
           </div>
        </section>
      </div>
    </div>
  );
}

function AboutStat({ icon: Icon, title, desc }: any) {
  return (
    <div className="space-y-4">
      <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
