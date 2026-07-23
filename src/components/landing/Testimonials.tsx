
'use client';

import React from "react";
import { Star } from "lucide-react";

const REVIEWS = [
  { name: "Alex K.", comment: "Best butchery delivery in Nairobi. Meat is always fresh.", rating: 5 },
  { name: "Sarah M.", comment: "Fast and reliable. The Choma was perfectly grilled.", rating: 5 },
  { name: "John D.", comment: "Prime quality. The interface is so easy to use.", rating: 5 },
];

export function Testimonials() {
  return (
    <section className="space-y-10 py-12 bg-gray-50/50 rounded-[3rem] px-8 border-2 border-dashed">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-black">Customer Stories</h2>
        <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">Real feedback</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {REVIEWS.map((review, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <div className="flex gap-1">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-[12px] font-bold text-gray-600 uppercase leading-relaxed italic">"{review.comment}"</p>
            <p className="text-[10px] font-black uppercase tracking-widest">— {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
