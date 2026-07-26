'use client';

import React from "react";
import Image from "next/image";

/**
 * ELITE TERMINAL NODE (IMAGE FOOTER)
 * Optimized for mobile fitting (100px) and desktop sizing (350px-450px).
 * Standalone asset with absolute visual clarity.
 */
export function Footer() {
  return (
    <footer className="relative w-full bg-black overflow-hidden">
      {/* 
        Responsive height: 
        - 100px for mobile to ensure edges fit perfectly as per 9-hour calibration.
        - 350px-450px for desktop to anchor the page well without enlarging.
      */}
      <div className="relative w-full h-[100px] md:h-[350px] lg:h-[450px]">
        <Image 
          src="/footer.jpeg" 
          alt="Steak West Terminal Dispatch" 
          fill 
          className="object-cover object-center"
          priority
          unoptimized={true}
        />
      </div>
    </footer>
  );
}