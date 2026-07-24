'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/5 py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          
          {/* Left: WORDS (Information) - STRICT VERTICAL STACK */}
          <div className="md:col-span-4 flex flex-col gap-10 text-[13px] font-bold uppercase tracking-widest">
               <div className="space-y-10">
                  <div className="space-y-4">
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em]">Operating Node</p>
                    <div className="space-y-3">
                       <div className="flex items-center gap-3 text-white">
                          <MapPin className="w-5 h-5 text-primary shrink-0" />
                          <span>Nairobi West, Nairobi, Kenya</span>
                       </div>
                       <div className="flex items-center gap-3 text-white/50">
                          <span className="w-5" />
                          <span>P. O Box 7144- 00200</span>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em]">Direct Dispatch</p>
                    <div className="space-y-3">
                       <Link href="tel:0722522346" className="flex items-center gap-3 text-white hover:text-primary transition-colors">
                          <Phone className="w-5 h-5 text-primary shrink-0" />
                          <span>0722522346</span>
                       </Link>
                       <Link href="mailto:Info@steakwestbutchery.co.ke" className="flex items-center gap-3 text-white hover:text-primary transition-colors lowercase">
                          <Mail className="w-5 h-5 text-primary shrink-0" />
                          <span className="normal-case">Info@steakwestbutchery.co.ke</span>
                       </Link>
                    </div>
                  </div>
               </div>
          </div>

          {/* Right: LOGOS - HIGH DENSITY HORIZONTAL LAYOUT - DISTRIBUTED */}
          <div className="md:col-span-8 flex flex-row items-center justify-between w-full h-full pt-10 px-4 md:px-0">
            {/* Main Brand Logo - Scaled */}
            <div className="relative h-20 w-44 md:h-28 md:w-64 shrink-0">
              <Image 
                src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
                alt="Steak West" 
                fill 
                className="object-contain object-left" 
              />
            </div>

            {/* Horizontal Dispatch Logos strip - Scaled & Distributed */}
            <div className="relative h-20 w-44 md:h-28 md:w-64 shrink-0">
              <Image src="/images.png" alt="Glovo" fill className="object-contain" />
            </div>
            <div className="relative h-20 w-44 md:h-28 md:w-64 shrink-0">
              <Image src="/images (1).png" alt="Uber Eats / Bolt" fill className="object-contain" />
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex flex-col md:flex-row items-center gap-8 text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">
              <p>© 2026 Steak West Butchery | SUPA YA NYAMA</p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <Icon key={i} className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
