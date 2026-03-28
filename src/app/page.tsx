import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { MOCK_EVENTS } from "@/lib/events-data";
import { Calendar, MapPin, ArrowRight, Sparkles, CheckCircle2, LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const featuredEvents = MOCK_EVENTS.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 py-1 px-4 text-primary font-semibold flex items-center gap-2 w-fit">
                <Sparkles className="w-4 h-4" />
                AI-Powered Event Management
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-primary mb-6 leading-tight font-headline">
                Extraordinary Events, <br />
                <span className="text-accent">Effortlessly Organized.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
                The modern platform for event discovery and management. Powered by AI to help you craft compelling experiences and reach the right audience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/events">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-xl">
                    Discover Events
                  </Button>
                </Link>
                <Link href="/dashboard/create">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl bg-background shadow-sm hover:shadow-md transition-shadow">
                    Start Organizing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Visual Elements */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full hidden lg:block opacity-20 pointer-events-none">
             <div className="w-full h-full bg-gradient-to-l from-accent/40 to-transparent rounded-l-[100px]" />
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-20 container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold font-headline text-primary mb-2">Featured Experiences</h2>
              <p className="text-muted-foreground">Handpicked events you shouldn't miss this month.</p>
            </div>
            <Link href="/events" className="text-primary font-semibold flex items-center gap-2 group hover:underline">
              View all events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Link 
                key={event.id} 
                href={`/events/${event.id}`}
                className="group flex flex-col bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image 
                    src={event.imageUrl} 
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint="event photo"
                  />
                  <Badge className="absolute top-4 left-4 shadow-sm bg-white/90 text-primary hover:bg-white">
                    {event.category}
                  </Badge>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 font-headline line-clamp-1 group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-accent" />
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-accent" />
                      {event.location}
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t flex items-center justify-between">
                    <span className="font-bold text-primary">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </span>
                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                      Book Now
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-primary text-primary-foreground overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold font-headline mb-4">Why Choose Momentus?</h2>
              <p className="text-primary-foreground/70 text-lg">We provide everything you need to create, manage, and scale your events with modern tools and AI assistance.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-headline">AI Copywriting</h3>
                <p className="text-primary-foreground/60 leading-relaxed">
                  Generate professional event descriptions and catchy titles in seconds. Let our AI handle the marketing copy.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-headline">Seamless Booking</h3>
                <p className="text-primary-foreground/60 leading-relaxed">
                  Fast, secure checkout flow optimized for conversions. Your attendees will love the friction-less experience.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-headline">Advanced Analytics</h3>
                <p className="text-primary-foreground/60 leading-relaxed">
                  Track sales, attendee demographics, and growth in real-time with our beautiful organizer dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-headline text-xl font-bold tracking-tight text-primary">
                Momentus
              </span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-muted-foreground">
              <Link href="/events" className="hover:text-primary">Explore</Link>
              <Link href="/dashboard" className="hover:text-primary">Organizer Dashboard</Link>
              <Link href="/terms" className="hover:text-primary">Terms</Link>
              <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2024 Momentus Events. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
