'use client';

import React from "react";
import Image from "next/image";

/**
 * ELITE TERMINAL NODE (IMAGE FOOTER)
 * Optimized for mobile fitting (100px) and desktop edge-to-edge sizing (450px).
 * Standalone asset with absolute visual clarity.
 */
export function Footer() {
  return (
    <footer className="relative w-full bg-black overflow-hidden">
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
