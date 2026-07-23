
'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, Mail, MapPin, Send, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white overflow-hidden pt-32 pb-16">
      {/* High-Impact Trust Ribbon */}
      <div className="bg-white/5 border-y border-white/5 py-16 mb-24">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
           {[
             { label: 'Secure Payments', desc: 'M-Pesa, Card, Cash', icon: '🔒' },
             { label: 'Live Tracking', desc: 'Real-time dispatch', icon: '📍' },
             { label: 'Quality Guarantee', desc: 'Certified fresh stock', icon: '🛡️' },
             { label: '24/7 Support', desc: 'Ready for dispatch', icon: '📞' },
           ].map((item) => (
             <div key={item.label} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 group">
               <span className="text-5xl grayscale group-hover:grayscale-0 transition-all group-hover:scale-110 duration-500">{item.icon}</span>
               <div className="space-y-1">
                 <h4 className="text-[13px] font-black uppercase tracking-[0.3em] text-white">{item.label}</h4>
                 <p className="text-[11px] text-white/30 uppercase font-bold tracking-widest">{item.desc}</p>
               </div>
             </div>
           ))}
        </div>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-20">
        <div className="lg:col-span-4 space-y-10">
          <div className="relative h-16 w-64">
            <Image src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" alt="Steak West" fill className="object-contain" />
          </div>
          <p className="text-[15px] text-white/40 font-bold leading-relaxed uppercase tracking-wider">
            Your trusted online butchery network. Providing premium quality meat, elite dispatch times and legendary kachumbari service since 2026.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all cursor-pointer border border-white/5 group active:scale-90">
                <Icon className="w-5 h-5 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-10">
          <h4 className="text-[14px] font-black uppercase tracking-[0.4em] text-primary">Shop</h4>
          <ul className="space-y-5 text-[12px] font-bold text-white/40 uppercase tracking-widest">
            {['All Products', 'Beef Cuts', 'Chicken Feed', 'Goat Nodes', 'Fish Dispatch', 'Sausage Tech'].map((item) => (
              <li key={item}><Link href="/restaurants" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-4 h-px bg-primary transition-all" />{item}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-10">
          <h4 className="text-[14px] font-black uppercase tracking-[0.4em] text-primary">Company</h4>
          <ul className="space-y-5 text-[12px] font-bold text-white/40 uppercase tracking-widest">
            {['About Nodes', 'Our Process', 'Dispatch Careers', 'Retail Blog', 'Contact Center'].map((item) => (
              <li key={item}><Link href="/profile" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-4 h-px bg-primary transition-all" />{item}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <div className="space-y-6">
            <h4 className="text-[14px] font-black uppercase tracking-[0.4em] text-primary">Contact Dispatch</h4>
            <ul className="space-y-5 text-[13px] font-bold text-white/40 uppercase tracking-widest">
              <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-primary transition-all">
                  <Phone className="w-4 h-4" />
                </div> 
                +254 704 524070
              </li>
              <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-primary transition-all">
                  <Mail className="w-4 h-4" />
                </div> 
                dispatch@steakwest.co.ke
              </li>
              <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-primary transition-all">
                  <MapPin className="w-4 h-4" />
                </div> 
                Nairobi Central, Kenya
              </li>
            </ul>
           </div>
           
           <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-6">
             <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">DISPATCH UPDATES</h4>
             <div className="flex gap-3">
                <input placeholder="ACCESS KEY / EMAIL" className="bg-black/50 border border-white/10 rounded-xl px-5 h-14 text-[12px] font-black flex-grow outline-none focus:border-primary transition-all placeholder:text-white/20 uppercase tracking-widest" />
                <button className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20">
                  <Send className="w-5 h-5 text-white" />
                </button>
             </div>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-24 mt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
         <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.5em]">© 2026 STEAK WEST NETWORK. ALL NODES SECURED.</p>
         <div className="flex gap-10 text-[10px] text-white/20 font-black uppercase tracking-[0.5em]">
            <Link href="/help" className="hover:text-white transition-colors">PRIVACY</Link>
            <Link href="/help" className="hover:text-white transition-colors">TERMS</Link>
            <Link href="/help" className="hover:text-white transition-colors">DISPATCH RULES</Link>
         </div>
         <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.5em]">CRAFTED IN NAIROBI</p>
      </div>
    </footer>
  );
}
