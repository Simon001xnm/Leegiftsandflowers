'use client';

import React from "react";
import Image from "next/image";

/**
 * ELITE TERMINAL NODE (IMAGE FOOTER)
 * Optimized for mobile fitting (100px) and desktop sizing (350px-450px).
 */
export function Footer() {
  return (
    <footer className="relative w-full bg-black overflow-hidden">
      {/* 
        Responsive height: 100px for mobile to ensure edges fit perfectly,
        up to 450px for desktop to anchor the page well.
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
