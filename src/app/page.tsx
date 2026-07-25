'use client';

import React from "react";

/**
 * FRESH START PAGE
 * A clean, non-distorted entry point for Steak West Butchery.
 * Start building your marketplace sections below.
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
      <div className="space-y-6 max-w-3xl">
        <header className="space-y-2">
          <p className="text-primary font-black text-[12px] uppercase tracking-[0.4em]">Ready for dispatch</p>
          <h1 className="text-5xl md:text-8xl font-black text-black uppercase tracking-tighter leading-[0.85]">
            STEAK WEST <br />
            <span className="text-gray-200">WORKSPACE.</span>
          </h1>
        </header>
        
        <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-xl mx-auto">
          The previous layout has been cleared to resolve distortion. You can now start building your premium meat network from a fresh, stable page.
        </p>

        <div className="pt-12">
          <div className="w-full aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] flex flex-col items-center justify-center text-gray-300 gap-4">
             <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-gray-100 border-t-primary rounded-full animate-spin" />
             </div>
             <p className="font-bold uppercase tracking-widest text-[10px]">Start adding your components here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
