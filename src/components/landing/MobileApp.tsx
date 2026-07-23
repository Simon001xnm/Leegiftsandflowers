
'use client';

import React from "react";
import { InstallAppButton } from "@/components/InstallAppButton";

export function MobileApp() {
  return (
    <section className="relative overflow-hidden bg-black rounded-[3rem] p-12 text-center space-y-8">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
      
      <div className="relative z-10 space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
          Take Steak West <br /> Everywhere.
        </h2>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] max-w-md mx-auto leading-loose">
          Install our professional software directly on your mobile device for the fastest ordering experience.
        </p>
      </div>

      <div className="relative z-10 flex justify-center">
        <InstallAppButton />
      </div>
    </section>
  );
}
