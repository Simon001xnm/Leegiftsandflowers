'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, Mail, MapPin, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white overflow-hidden">
      {/* Trust Bar */}
      <div className="bg-white/5 border-y border-white/10 py-12">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
           {[
             { label: 'Secure Payments', desc: 'M-Pesa, Card, Cash', icon: '🔒' },
             { label: 'Live Order Tracking', desc: 'Track in real-time', icon: '📍' },
             { label: 'Easy Returns', desc: 'Not satisfied? Quick swap', icon: '↩️' },
             { label: '24/7 Support', desc: 'Always here to help', icon: '📞' },
           ].map((item) => (
             <div key={item.label} className="flex items-center gap-4 group">
               <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
               <div>
                 <h4 className="text-[12px] font-black uppercase tracking-widest">{item.label}</h4>
                 <p className="text-[11px] text-white/40 uppercase font-medium">{item.desc}</p>
               </div>
             </div>
           ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-24 grid md:grid-cols-4 gap-16">
        <div className="space-y-8">
          <div className="relative h-12 w-48">
            <Image src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" alt="Steak West" fill className="object-contain" />
          </div>
          <p className="text-[13px] text-white/40 font-medium leading-relaxed uppercase">
            Your trusted online butchery. Quality meat, fast delivery and excellent service.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Phone].map((Icon, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all cursor-pointer border border-white/10 group">
                <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[13px] font-black uppercase tracking-[0.3em] mb-8 text-primary">Shop</h4>
          <ul className="space-y-4 text-[13px] font-medium text-white/40 uppercase">
            {['All Products', 'Beef', 'Chicken', 'Goat Meat', 'Fish', 'Sausages'].map((item) => (
              <li key={item}><Link href="/restaurants" className="hover:text-white transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-black uppercase tracking-[0.3em] mb-8 text-primary">Company</h4>
          <ul className="space-y-4 text-[13px] font-medium text-white/40 uppercase">
            {['About Us', 'Our Process', 'Careers', 'Blog', 'Contact Us'].map((item) => (
              <li key={item}><Link href="/profile" className="hover:text-white transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
           <div>
            <h4 className="text-[13px] font-black uppercase tracking-[0.3em] mb-8 text-primary">Contact</h4>
            <ul className="space-y-4 text-[13px] font-medium text-white/40 uppercase">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> +254 704 524070</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> info@steakwestbutchery.co.ke</li>
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> Nairobi, Kenya</li>
            </ul>
           </div>
           
           <div className="space-y-4">
             <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Stay Updated</h4>
             <div className="flex gap-2">
                <input placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-[12px] flex-grow outline-none focus:border-primary transition-all" />
                <button className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95">
                  <Send className="w-5 h-5 text-white" />
                </button>
             </div>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
         <p className="text-[11px] text-white/20 font-black uppercase tracking-widest">© 2026 Steak West Butchery. All Rights Reserved.</p>
         <div className="flex gap-8 text-[11px] text-white/20 font-black uppercase tracking-widest">
            <Link href="/help" className="hover:text-white">Privacy Policy</Link>
            <Link href="/help" className="hover:text-white">Terms & Conditions</Link>
         </div>
         <p className="text-[11px] text-white/20 font-black uppercase tracking-widest">Made with ❤️ in Kenya</p>
      </div>
    </footer>
  );
}