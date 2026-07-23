'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { name: 'Beef', image: 'https://picsum.photos/seed/beef/200/200', href: '/restaurants?cat=Raw Meat' },
  { name: 'Chicken', image: 'https://picsum.photos/seed/chicken/200/200', href: '/restaurants?cat=Cooked' },
  { name: 'Goat Meat', image: 'https://picsum.photos/seed/goat/200/200', href: '/restaurants?cat=Raw Meat' },
  { name: 'Fish', image: 'https://picsum.photos/seed/fish/200/200', href: '/restaurants?cat=Grocery' },
  { name: 'Sausages', image: 'https://picsum.photos/seed/sausage/200/200', href: '/restaurants?cat=Delicacies' },
  { name: 'Ready to Cook', image: 'https://picsum.photos/seed/ready/200/200', href: '/restaurants?cat=Delicacies' },
];

export function Categories() {
  return (
    <section className="bg-brand-dark py-20 border-y border-white/5">
      <div className="container mx-auto px-6 text-center space-y-12">
        <div className="space-y-2">
          <p className="text-primary font-black text-[10px] uppercase tracking-[0.4em]">Shop By Category</p>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">What are you looking for?</h2>
          <p className="text-white/40 text-[13px] font-medium">Choose from our wide range of fresh and quality products.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} href={cat.href} className="group flex flex-col items-center gap-4">
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-all duration-500 shadow-2xl group-hover:scale-110">
                <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <span className="text-[11px] font-black uppercase text-white/60 group-hover:text-white tracking-widest transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}