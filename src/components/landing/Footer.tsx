
'use client';

import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white p-12 pb-32">
      <div className="container mx-auto grid md:grid-cols-4 gap-12 text-center md:text-left">
         <div className="space-y-4">
           <h2 className="text-2xl font-black italic tracking-tighter">STEAK WEST<span className="text-primary">.</span></h2>
           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-loose">
             Connecting you to the finest meat sources in Nairobi. Fast, fresh, and guaranteed quality.
           </p>
         </div>
         <div>
           <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-primary">Discover</h4>
           <ul className="text-[10px] font-bold text-gray-400 space-y-2 uppercase tracking-widest">
             <li><Link href="/restaurants" className="hover:text-white">All Stores</Link></li>
             <li><Link href="/restaurants?cat=Raw Meat" className="hover:text-white">Butchery</Link></li>
             <li><Link href="/restaurants?cat=Nyama Choma" className="hover:text-white">Grills</Link></li>
           </ul>
         </div>
         <div>
           <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-primary">Support</h4>
           <ul className="text-[10px] font-bold text-gray-400 space-y-2 uppercase tracking-widest">
             <li><Link href="/profile" className="hover:text-white">My Account</Link></li>
             <li><Link href="/track/demo" className="hover:text-white">Track Order</Link></li>
             <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
           </ul>
         </div>
         <div>
           <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-primary">Connect</h4>
           <div className="flex justify-center md:justify-start gap-4">
             <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
               <Zap className="w-4 h-4" />
             </div>
           </div>
         </div>
      </div>
      <div className="container mx-auto pt-12 mt-12 border-t border-gray-900 text-center">
         <p className="text-[9px] text-gray-700 font-bold uppercase tracking-[0.4em]">&copy; 2024 Steak West Network. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
