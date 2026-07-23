
'use client';

import React from "react";
import Image from "next/image";
import { Download, Apple, Play, QrCode, Smartphone } from "lucide-react";

export function MobileApp() {
  return (
    <section className="bg-[#921c1c] py-32 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-black/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative flex justify-center lg:justify-end gap-8 h-[500px] md:h-[600px]">
             <div className="relative w-72 h-full transform -rotate-12 translate-y-16 animate-in slide-in-from-bottom-24 duration-1000">
                <div className="absolute inset-0 bg-black/40 blur-3xl scale-95 translate-y-12" />
                <Image src="https://picsum.photos/seed/app3/800/1600" alt="App UI Home" fill className="object-cover rounded-[3.5rem] border-[12px] border-black shadow-2xl relative z-10" />
             </div>
             <div className="relative w-72 h-full transform rotate-6 -translate-y-8 hidden md:block animate-in slide-in-from-top-24 duration-1000">
                <div className="absolute inset-0 bg-black/40 blur-3xl scale-95 translate-y-12" />
                <Image src="https://picsum.photos/seed/app4/800/1600" alt="App UI Cart" fill className="object-cover rounded-[3.5rem] border-[12px] border-black shadow-2xl relative z-10" />
             </div>
          </div>

          <div className="space-y-12 text-center lg:text-left text-white">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-2 rounded-full border border-white/10">
                <Smartphone className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Next-Gen Retail</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                SHOP SMARTER.<br />
                <span className="text-white/50">ANYTIME, ANYWHERE.</span>
              </h2>
              <p className="text-white/70 text-[18px] md:text-[22px] max-w-xl mx-auto lg:mx-0 font-bold uppercase tracking-tight leading-tight">
                Get the Steak West Butchery app and enjoy the fastest way to dispatch premium meat to your door.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
               <div className="flex flex-col gap-4 w-full sm:w-auto">
                 <button className="flex items-center gap-5 bg-black text-white px-10 h-20 rounded-3xl hover:bg-zinc-900 transition-all border border-white/10 group active:scale-95 shadow-2xl">
                    <Play className="w-10 h-10 fill-white group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                       <p className="text-[11px] uppercase font-black opacity-40 tracking-widest">GET IT ON</p>
                       <p className="text-[22px] font-black leading-none">Google Play</p>
                    </div>
                 </button>
                 <button className="flex items-center gap-5 bg-black text-white px-10 h-20 rounded-3xl hover:bg-zinc-900 transition-all border border-white/10 group active:scale-95 shadow-2xl">
                    <Apple className="w-10 h-10 fill-white group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                       <p className="text-[11px] uppercase font-black opacity-40 tracking-widest">DOWNLOAD ON THE</p>
                       <p className="text-[22px] font-black leading-none">App Store</p>
                    </div>
                 </button>
               </div>
               
               <div className="p-8 bg-white rounded-[3rem] space-y-4 shadow-[0_30px_60px_rgba(0,0,0,0.3)] hidden md:flex flex-col items-center group hover:scale-105 transition-all duration-700">
                  <div className="w-36 h-36 bg-zinc-50 rounded-2xl flex items-center justify-center relative p-3 border border-zinc-100">
                    <QrCode className="w-full h-full text-black group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-black font-black text-[11px] uppercase tracking-widest">SCAN TO DISPATCH</p>
                    <p className="text-zinc-400 font-bold text-[9px] uppercase tracking-widest">Instant App Launch</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
