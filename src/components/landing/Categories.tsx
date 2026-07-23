
'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { name: 'Beef', image: 'https://picsum.photos/seed/beef1/400/400', href: '/restaurants?cat=Raw Meat' },
  { name: 'Chicken', image: 'https://picsum.photos/seed/chicken1/400/400', href: '/restaurants?cat=Cooked' },
  { name: 'Goat Meat', image: 'https://picsum.photos/seed/goat1/400/400', href: '/restaurants?cat=Raw Meat' },
  { name: 'Fish', image: 'https://picsum.photos/seed/fish1/400/400', href: '/restaurants?cat=Grocery' },
  { name: 'Sausages', image: 'https://picsum.photos/seed/sausage1/400/400', href: '/restaurants?cat=Delicacies' },
  { name: 'Ready To Cook', image: 'https://picsum.photos/seed/ready1/400/400', href: '/restaurants?cat=Delicacies' },
];

export function Categories() {
  return (
    <section className="bg-[#0c0c0c] py-24 border-y border-white/5">
      <div className="container mx-auto px-6 text-center space-y-16">
        <div className="space-y-4 max-w-2xl mx-auto">
          <p className="text-primary font-black text-[11px] uppercase tracking-[0.4em]">Browse Network Nodes</p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">What are you looking for?</h2>
          <p className="text-white/40 text-[14px] font-bold uppercase tracking-widest">Select a category to discover fresh stock availability</p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} href={cat.href} className="group flex flex-col items-center gap-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/5 group-hover:border-primary transition-all duration-700 shadow-2xl group-hover:scale-110 active:scale-95">
                <Image src={cat.image} alt={cat.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <span className="text-[12px] font-black uppercase text-white/50 group-hover:text-white tracking-[0.2em] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
