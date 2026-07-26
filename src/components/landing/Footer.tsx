'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-transparent text-black py-12 md:py-20 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="grid md:grid-cols-12 gap-10 items-start md:items-center">
          
          {/* Left: Operational Information Stack */}
          <div className="md:col-span-5 flex flex-col space-y-4">
               <div className="text-[18px] md:text-[20px] text-black font-bold space-y-2">
                  <p className="uppercase tracking-tighter">Nairobi West, Nairobi, Kenya</p>
                  <p className="text-black/70 font-medium">P. O Box 7144- 00200</p>
                  <div className="pt-2 flex flex-col space-y-1">
                    <p className="text-primary font-black text-3xl">0722522346</p>
                    <p className="text-black font-black lowercase break-all tracking-tight">Info@steakwestbutchery.co.ke</p>
                  </div>
               </div>
          </div>

          {/* Right: Partner Logos - Rounded Containers for Uniformity */}
          <div className="md:col-span-7 w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6 max-w-4xl md:ml-auto">
              <div className="relative h-12 w-28 md:h-16 md:w-40 bg-white p-2 rounded-2xl shadow-sm shrink-0 overflow-hidden border border-black/5">
                <Image src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" alt="Steak West" fill className="object-contain p-1" />
              </div>
              <div className="relative h-12 w-28 md:h-16 md:w-40 bg-white p-2 rounded-2xl shadow-sm shrink-0 overflow-hidden border border-black/5">
                <Image src="/finewood deco merchants 2.png" alt="Finewood Deco" fill className="object-contain p-1" />
              </div>
              <div className="relative h-12 w-24 md:h-16 md:w-32 bg-white p-2 rounded-2xl shadow-sm shrink-0 overflow-hidden border border-black/5">
                <Image src="/images.png" alt="Glovo" fill className="object-contain p-2" />
              </div>
              <div className="relative h-12 w-24 md:h-16 md:w-32 bg-white p-2 rounded-2xl shadow-sm shrink-0 overflow-hidden border border-black/5">
                <Image src="/images (1).png" alt="Uber Eats" fill className="object-contain p-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Global copyright and legal bar */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[11px] md:text-[12px] text-black font-black uppercase tracking-[0.2em] text-center md:text-left">
              <p>© 2026 Steak West Butchery | SUPA YA NYAMA</p>
              <div className="flex gap-6">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <Icon key={i} className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-6 md:gap-8 text-[11px] md:text-[12px] text-black font-black uppercase tracking-[0.2em]">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
