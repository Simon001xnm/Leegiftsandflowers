'use client';

import React from "react";
import Image from "next/image";

/**
 * ELITE TERMINAL NODE (IMAGE FOOTER)
 * Optimized with responsive aspect ratio to ensure the image fits 
 * perfectly within mobile screen edges without looking zoomed in.
 */
export function Footer() {
  return (
    <footer className="relative w-full bg-black overflow-hidden">
      {/* 
        Container with responsive height and object-fit settings.
        On mobile, we use a tighter height and object-cover with top alignment 
        to ensure the most important parts of the footer image are visible 
        and edges fit the screen width correctly.
      */}
      <div className="relative w-full h-[160px] md:h-[600px] lg:h-[700px]">
        <Image 
          src="/footer.jpeg" 
          alt="Steak West Terminal Dispatch" 
          fill 
          className="object-cover object-center md:object-center"
          priority
          unoptimized={true}
        />
        
        {/* Subtle brand signature overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-3 md:gap-6">
            <div className="space-y-0.5">
              <p className="text-white font-black text-[7px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.5em] opacity-80">
                © 2026 STEAK WEST BUTCHERY | ELITE DISPATCH NETWORK
              </p>
              <p className="text-primary font-bold text-[6px] md:text-[10px] uppercase tracking-widest">
                NAIROBI WEST • THE MEAT NETWORK
              </p>
            </div>
            
            <div className="flex gap-3 md:gap-8 text-white/30 font-black text-[7px] md:text-[9px] uppercase tracking-widest">
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
