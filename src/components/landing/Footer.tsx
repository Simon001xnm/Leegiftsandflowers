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
      </div>
    </footer>
  );
}
