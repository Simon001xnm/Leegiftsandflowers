'use client';

import React from "react";
import Image from "next/image";
import { Download, Apple, Play } from "lucide-react";

export function MobileApp() {
  return (
    <section className="bg-brand-red py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative flex justify-center lg:justify-end gap-6 h-[400px] md:h-[500px]">
             <div className="relative w-64 h-full transform -rotate-6 translate-y-12">
                <Image src="https://picsum.photos/seed/app1/600/1200" alt="App UI" fill className="object-cover rounded-[3rem] border-[8px] border-black shadow-2xl" />
             </div>
             <div className="relative w-64 h-full transform rotate-3 -translate-y-8 hidden md:block">
                <Image src="https://picsum.photos/seed/app2/600/1200" alt="App UI" fill className="object-cover rounded-[3rem] border-[8px] border-black shadow-2xl" />
             </div>
          </div>

          <div className="space-y-10 text-center lg:text-left text-white">
            <div className="space-y-4">
              <p className="text-white/70 font-black text-[12px] uppercase tracking-[0.4em]">Download Our App</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Shop Smarter. Anytime, <br /> Anywhere.
              </h2>
              <p className="text-white/70 text-[18px] max-w-lg mx-auto lg:mx-0">
                Get the Steak West Butchery app and enjoy a faster, easier way to shop.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
               <div className="flex flex-col gap-3">
                 <button className="flex items-center gap-4 bg-black text-white px-8 h-16 rounded-2xl hover:bg-gray-900 transition-all border border-white/10 group active:scale-95">
                    <Play className="w-8 h-8 fill-white group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                       <p className="text-[10px] uppercase font-bold opacity-60">Get it on</p>
                       <p className="text-[18px] font-black leading-none">Google Play</p>
                    </div>
                 </button>
                 <button className="flex items-center gap-4 bg-black text-white px-8 h-16 rounded-2xl hover:bg-gray-900 transition-all border border-white/10 group active:scale-95">
                    <Apple className="w-8 h-8 fill-white group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                       <p className="text-[10px] uppercase font-bold opacity-60">Download on the</p>
                       <p className="text-[18px] font-black leading-none">App Store</p>
                    </div>
                 </button>
               </div>
               
               <div className="p-6 bg-white rounded-3xl space-y-3 shadow-2xl hidden md:block">
                  <div className="w-32 h-32 bg-gray-50 flex items-center justify-center relative">
                    <div className="w-full h-full p-2">
                       <Image src="https://picsum.photos/seed/qr/200/200" alt="QR Code" fill className="object-contain" />
                    </div>
                  </div>
                  <p className="text-black font-black text-[10px] uppercase text-center tracking-widest">Scan to Download</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}