
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MOCK_EVENTS, EventCategory } from "@/lib/events-data";
import { Calendar, MapPin, Search, Filter, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CATEGORIES: EventCategory[] = ['Music', 'Tech', 'Workshop', 'Art', 'Food', 'Business'];

export default function EventsDiscovery() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<EventCategory | 'All'>('All');

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                          event.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || event.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold font-headline text-primary mb-4">Discovery</h1>
          <p className="text-muted-foreground text-lg">Browse curated events from top organizers around the world.</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              className="pl-10 h-12 rounded-xl border-2 border-muted" 
              placeholder="Search by name, artist, or location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Button 
              variant={category === 'All' ? 'default' : 'outline'} 
              className="h-12 rounded-xl px-6 shrink-0"
              onClick={() => setCategory('All')}
            >
              All Events
            </Button>
            {CATEGORIES.map(cat => (
              <Button 
                key={cat}
                variant={category === cat ? 'default' : 'outline'} 
                className="h-12 rounded-xl px-6 shrink-0"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <span className="text-sm font-medium text-muted-foreground">
            Showing <span className="text-primary font-bold">{filteredEvents.length}</span> events
          </span>
          <Button variant="ghost" size="sm" className="gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Sort by: Newest
          </Button>
        </div>

        {/* Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
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
                      Details
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-bold font-headline text-primary mb-2">No events found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            <Button variant="link" onClick={() => { setSearch(""); setCategory("All"); }}>
              Clear all filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
