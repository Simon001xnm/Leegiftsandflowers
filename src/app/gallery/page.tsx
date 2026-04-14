
"use client";

import { Navigation } from "@/components/Navigation";
import { MOCK_GALLERY } from "@/lib/events-data";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Sparkles } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-none px-4 py-1">
            <Camera className="w-3 h-3 mr-2 inline" />
            Our Visual Story
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold font-headline text-primary mb-6">Floral Gallery</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Step into the world of Lee Decors. From our daily operations at Stall 16A, City Market to the grandest venues in Nairobi, see the passion we put into every arrangement.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_GALLERY.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem]">
              <CardContent className="p-0 relative aspect-square">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-xs font-bold tracking-widest uppercase">Signature Work</span>
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-1">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-24 bg-primary rounded-[3rem] p-12 lg:p-20 text-center text-primary-foreground relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold font-headline mb-6">Visit Our Studio</h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              Experience the fragrance and beauty in person at Stall 16A, City Market. We're open daily to help you pick the perfect blooms for your space.
            </p>
            <div className="flex justify-center gap-4">
               <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none py-2 px-6">Open 8AM - 6PM</Badge>
               <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none py-2 px-6">City Market, Nairobi</Badge>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </section>
      </main>
    </div>
  );
}
