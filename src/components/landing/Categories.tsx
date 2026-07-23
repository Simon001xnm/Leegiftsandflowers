'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { name: 'Beef', image: 'https://picsum.photos/seed/beef1/400/400', href: '/restaurants?cat=Raw Meat' },
  { name: 'Chicken', image: 'https://picsum.photos/seed/chicken1/400/400', href: '/restaurants?cat=Cooked' },
  { name: 'Goat', image: 'https://picsum.photos/seed/goat1/400/400', href: '/restaurants?cat=Raw Meat' },
  { name: 'Fish', image: 'https://picsum.photos/seed/fish1/400/400', href: '/restaurants?cat=Grocery' },
  { name: 'Sausages', image: 'https://picsum.photos/seed/sausage1/400/400', href: '/restaurants?cat=Delicacies' },
  { name: 'Grills', image: 'https://picsum.photos/seed/ready1/400/400', href: '/restaurants?cat=Nyama Choma' },
];

export function Categories() {
  return (
    <section className="bg-black py-16 border-b border-white/5">
      <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-center gap-8 md:gap-16 min-w-max pb-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} href={cat.href} className="group flex flex-col items-center gap-4">
              <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-all duration-500 shadow-2xl group-hover:scale-110 active:scale-95">
                <Image src={cat.image} alt={cat.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <span className="text-[9px] md:text-[11px] font-black uppercase text-white/50 group-hover:text-white tracking-widest transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
