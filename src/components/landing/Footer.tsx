'use client';

import React from "react";
import Image from "next/image";

/**
 * ELITE TERMINAL NODE (IMAGE FOOTER)
 * Adjusted height and typography for mobile to prevent "enlarged" appearance.
 */
export function Footer() {
  return (
    <footer className="relative w-full h-[250px] md:h-[700px] overflow-hidden bg-black">
      <Image 
        src="/footer.jpeg" 
        alt="Steak West Terminal Dispatch" 
        fill 
        className="object-cover"
        priority
        unoptimized={true}
      />
      
      {/* Subtle brand signature overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6">
          <div className="space-y-1">
            <p className="text-white font-black text-[8px] md:text-[12px] uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-80">
              © 2026 STEAK WEST BUTCHERY | ELITE DISPATCH NETWORK
            </p>
            <p className="text-primary font-bold text-[7px] md:text-[10px] uppercase tracking-widest">
              NAIROBI WEST • THE MEAT NETWORK
            </p>
          </div>
          
          <div className="flex gap-4 md:gap-8 text-white/30 font-black text-[8px] md:text-[9px] uppercase tracking-widest">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
