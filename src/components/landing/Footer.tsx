'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/5 py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left: WORDS (Information) - STRICT VERTICAL STACK WITHOUT HEADERS */}
          <div className="md:col-span-4 flex flex-col">
               <div className="text-[15px] text-white/90 font-medium space-y-1">
                  <p>Nairobi West, Nairobi, Kenya</p>
                  <p className="text-white/40">P. O Box 7144- 00200</p>
                  <div className="pt-3">
                    <p className="text-primary font-bold">0722522346</p>
                    <p className="text-white/40 lowercase">Info@steakwestbutchery.co.ke</p>
                  </div>
               </div>
          </div>

          {/* Right: LOGOS - HIGH DENSITY HORIZONTAL LAYOUT - DISTRIBUTED */}
          <div className="md:col-span-8 flex flex-row items-center justify-between w-full pt-10 md:pt-0">
            {/* Site Logo & Partners Row */}
            <div className="flex flex-row items-center justify-between w-full gap-4">
              <div className="relative h-12 w-28 md:h-20 md:w-48 shrink-0">
                <Image src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" alt="Steak West" fill className="object-contain" />
              </div>
              <div className="relative h-10 w-24 md:h-16 md:w-40 shrink-0">
                <Image src="/images.png" alt="Glovo" fill className="object-contain" />
              </div>
              <div className="relative h-10 w-24 md:h-16 md:w-40 shrink-0">
                <Image src="/images (1).png" alt="Uber Eats / Bolt" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 hidden md:flex flex-col md:flex-row justify-between items-center gap-8">
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
