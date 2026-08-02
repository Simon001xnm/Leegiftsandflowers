'use client';

import React from "react";
import Image from "next/image";

/**
 * ELITE TERMINAL NODE (IMAGE FOOTER)
 * Optimized for mobile fitting (100px) and desktop edge-to-edge sizing (350px).
 * Standalone asset with absolute visual clarity.
 */
export function Footer() {
  return (
    <footer className="relative w-full bg-black overflow-hidden">
      <div className="relative w-full h-[100px] md:h-[250px] lg:h-[350px]">
        <Image 
          src="/footerf.jpeg" 
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
