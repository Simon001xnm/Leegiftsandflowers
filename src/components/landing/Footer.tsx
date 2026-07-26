'use client';

import React from "react";
import Image from "next/image";

/**
 * ELITE TERMINAL NODE (IMAGE FOOTER)
 * Optimized with ultra-tight responsive height for mobile view.
 * Ensures the image fits perfectly within mobile screen edges.
 */
export function Footer() {
  return (
    <footer className="relative w-full bg-black overflow-hidden">
      {/* 
        Container with ultra-reduced mobile height (100px).
        Uses object-cover centered to maintain visual balance 
        without zooming into the asset excessively.
      */}
      <div className="relative w-full h-[100px] md:h-[600px] lg:h-[700px]">
        <Image 
          src="/footer.jpeg" 
          alt="Steak West Terminal Dispatch" 
          fill 
          className="object-cover object-center"
          priority
          unoptimized={true}
        />
        
        {/* Minimal high-clarity brand signature overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-3 md:p-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-2 md:gap-6">
            <div className="space-y-0">
              <p className="text-white font-black text-[6px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.5em] opacity-80">
                © 2026 STEAK WEST BUTCHERY | ELITE DISPATCH NETWORK
              </p>
              <p className="text-primary font-bold text-[5px] md:text-[10px] uppercase tracking-widest">
                NAIROBI WEST • THE MEAT NETWORK
              </p>
            </div>
            
            <div className="flex gap-2 md:gap-8 text-white/30 font-black text-[6px] md:text-[9px] uppercase tracking-widest">
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
