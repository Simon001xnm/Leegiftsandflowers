
"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MOCK_EVENTS } from "@/lib/events-data";
import { Calendar, MapPin, Ticket, User, Share2, Heart, ArrowLeft, Info, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const event = MOCK_EVENTS.find(e => e.id === id);

  if (!event) return <div>Event not found</div>;

  const ticketsLeft = event.ticketsTotal - event.ticketsSold;
  const selloutPercentage = (event.ticketsSold / event.ticketsTotal) * 100;

  // Encode location for Google Maps iframe
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_YOUR_API_KEY&q=${encodeURIComponent(event.location)}`;
  // Note: For prototyping, we can use a direct search link or a placeholder if API key isn't present
  // Here we'll use a standard search embed that often works for public locations
  const searchEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] lg:h-[60vh] overflow-hidden">
          <Image 
            src={event.imageUrl} 
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16">
            <div className="container mx-auto">
              <Link href="/events" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Discovery
              </Link>
              <div className="max-w-4xl">
                <Badge className="mb-4 bg-accent text-white border-none px-4 py-1">{event.category}</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold font-headline text-white mb-6 leading-tight">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    {new Date(event.date).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-accent" />
                    Organized by <span className="font-bold">{event.organizer}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-bold font-headline text-primary mb-6 flex items-center gap-2">
                  <Info className="w-6 h-6 text-accent" /> About This Event
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p>{event.description}</p>
                  <p className="mt-4">Join us for this incredible {event.category.toLowerCase()} event in Nairobi. Whether you're a seasoned enthusiast or just curious, there's something for everyone at {event.title}. Our team has meticulously planned every detail to ensure an unforgettable experience.</p>
                </div>
              </section>

              <section className="bg-secondary/30 rounded-2xl p-8 border border-primary/5">
                <h2 className="text-2xl font-bold font-headline text-primary mb-6">What's Included</h2>
                <ul className="grid md:grid-cols-2 gap-4">
                  {['Full Access Pass', 'Welcome Kit', 'Refreshments Included', 'Networking Session', 'Interactive Workshops', 'Digital Certification'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-headline text-primary mb-6">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="px-4 py-2 rounded-full border-primary/10">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </section>
            </div>

            {/* Sticky Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-24 border-2 border-primary/10 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold">Ticket Price</p>
                        <h3 className="text-3xl font-bold text-primary">
                          {event.price === 0 ? 'Free' : `KES ${event.price.toLocaleString()}`}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Availability</span>
                        <span className="font-medium">{ticketsLeft} tickets remaining</span>
                      </div>
                      <Progress value={selloutPercentage} className="h-2" />
                      {ticketsLeft < 50 && (
                        <p className="text-destructive text-xs font-bold animate-pulse">
                          Selling fast! Almost sold out.
                        </p>
                      )}
                    </div>

                    <Link href={`/booking/${event.id}`}>
                      <Button className="w-full h-14 text-lg rounded-xl gap-3 shadow-lg shadow-primary/20 mt-4">
                        <Ticket className="w-5 h-5" />
                        Secure Your Spot
                      </Button>
                    </Link>

                    <p className="text-xs text-center text-muted-foreground">
                      No hidden fees. Instant digital delivery.
                    </p>
                  </div>
                  
                  <div className="bg-muted p-6 border-t">
                    <h4 className="font-bold text-sm text-primary mb-4">Location</h4>
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-background border mb-4">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={searchEmbedUrl}
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                      ></iframe>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <MapPin className="w-4 h-4 shrink-0 text-accent" />
                      {event.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
