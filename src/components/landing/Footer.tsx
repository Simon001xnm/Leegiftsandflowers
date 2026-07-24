'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/5 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Brand Identity */}
          <div className="md:col-span-5 space-y-6 text-center md:text-left">
            <div className="relative h-20 w-80 mx-auto md:mx-0">
              <Image 
                src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
                alt="Steak West" 
                fill 
                className="object-contain" 
              />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">
                Premium meat distribution network
              </p>
              <p className="text-[13px] text-white/60 font-medium italic">"Supa Ya Nyama"</p>
            </div>
          </div>

          {/* Rapid Contact Grid */}
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-8 text-[11px] font-bold uppercase tracking-widest">
            <div className="space-y-4">
              <p className="text-white/30 text-[9px] font-black">Dispatch Nodes</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>Nairobi West, Nairobi</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <span className="w-4" />
                  <span>P. O Box 7144- 00200</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-white/30 text-[9px] font-black">Direct Line</p>
              <div className="space-y-3">
                <Link href="tel:0722522346" className="flex items-center gap-3 text-white hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>0722522346</span>
                </Link>
                <Link href="mailto:Info@steakwestbutchery.co.ke" className="flex items-center gap-3 text-white hover:text-primary transition-colors lowercase">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span className="normal-case">Info@steakwestbutchery.co.ke</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex items-center gap-8 grayscale opacity-30 hover:opacity-100 transition-all duration-500">
               <div className="relative h-8 w-24">
                 <Image src="/images.png" alt="Glovo" fill className="object-contain" />
               </div>
               <div className="relative h-8 w-24">
                 <Image src="/images (1).png" alt="Uber Eats / Bolt" fill className="object-contain" />
               </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">
              <p>© 2026 Steak West Butchery</p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <Icon key={i} className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-8 text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
