
"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_EVENTS } from "@/lib/events-data";
import { User, Mail, Calendar, MapPin, Ticket, ChevronRight, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ProfilePage() {
  const userBookings = [MOCK_EVENTS[0], MOCK_EVENTS[2]];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Profile Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-sm overflow-hidden">
              <div className="h-24 bg-primary" />
              <CardContent className="pt-0 relative">
                <div className="flex flex-col items-center -mt-12 mb-6">
                  <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                    <AvatarImage src="https://picsum.photos/seed/user1/200/200" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold mt-4 font-headline text-primary">Alex Johnson</h2>
                  <p className="text-sm text-muted-foreground">alex.j@example.com</p>
                </div>
                
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start gap-3 h-11 text-primary">
                    <User className="w-4 h-4" /> Profile Details
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-11">
                    <Settings className="w-4 h-4" /> Account Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-11 text-destructive hover:bg-destructive/5 hover:text-destructive">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="bg-secondary/40 rounded-xl p-6 border border-primary/5">
              <h3 className="font-bold text-sm text-primary uppercase tracking-wider mb-4">Saved Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-background">Music</Badge>
                <Badge variant="outline" className="bg-background">Tech</Badge>
                <Badge variant="outline" className="bg-background">Art</Badge>
              </div>
            </div>
          </aside>

          {/* Main Profile Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold font-headline text-primary">My Bookings</h1>
              <Badge variant="secondary" className="px-3 py-1">{userBookings.length} Active Tickets</Badge>
            </div>

            <div className="space-y-6">
              {userBookings.map((event) => (
                <Card key={event.id} className="group hover:shadow-md transition-shadow border overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-32 relative shrink-0 overflow-hidden">
                        <img src={event.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-6 flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider py-0 px-2">{event.category}</Badge>
                          </div>
                          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{event.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(event.date).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Link href={`/events/${event.id}`} className="flex-grow sm:flex-grow-0">
                            <Button variant="outline" size="sm" className="w-full gap-2">
                              View Details
                            </Button>
                          </Link>
                          <Button size="sm" className="flex-grow sm:flex-grow-0 gap-2 bg-accent hover:bg-accent/90">
                            <Ticket className="w-4 h-4" /> Digital Ticket
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <section className="pt-10">
              <h2 className="text-xl font-bold font-headline text-primary mb-6">Discovery Recommendations</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                 {MOCK_EVENTS.filter(e => !userBookings.find(b => b.id === e.id)).slice(0, 2).map(event => (
                    <Link key={event.id} href={`/events/${event.id}`} className="flex items-center gap-4 p-4 rounded-xl border hover:border-accent transition-colors">
                       <div className="w-16 h-16 rounded-lg overflow-hidden relative shrink-0">
                          <img src={event.imageUrl} alt="" className="w-full h-full object-cover" />
                       </div>
                       <div className="space-y-1 overflow-hidden">
                          <p className="font-bold text-primary truncate">{event.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(event.date).toLocaleDateString()}</p>
                       </div>
                       <ChevronRight className="ml-auto w-4 h-4 text-muted-foreground shrink-0" />
                    </Link>
                 ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
