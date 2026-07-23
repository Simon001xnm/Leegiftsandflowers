'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand Identity */}
          <div className="space-y-4 text-center md:text-left">
            <div className="relative h-12 w-48 mx-auto md:mx-0">
              <Image 
                src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" 
                alt="Steak West" 
                fill 
                className="object-contain" 
              />
            </div>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">
              Premium Meat Distribution Network
            </p>
          </div>

          {/* Rapid Contact */}
          <div className="flex flex-col items-center md:items-end gap-3 text-[11px] font-bold text-white/50 uppercase tracking-widest">
            <div className="flex items-center gap-4">
              <Link href="tel:+254704524070" className="hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> +254 704 524070
              </Link>
              <span className="opacity-20">|</span>
              <Link href="mailto:dispatch@steakwest.co.ke" className="hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> dispatch@steakwest.co.ke
              </Link>
            </div>
            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <Icon key={i} className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
              ))}
            </div>
          </div>
        </div>

        {/* Legal Minimal */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-white/20 font-black uppercase tracking-[0.4em]">
          <p>© 2026 STEAK WEST NETWORK. ALL NODES SECURED.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
