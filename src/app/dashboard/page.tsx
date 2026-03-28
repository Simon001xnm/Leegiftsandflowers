
"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_EVENTS } from "@/lib/events-data";
import { 
  Users, 
  Ticket, 
  TrendingUp, 
  Calendar, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OrganizerDashboard() {
  const stats = [
    { label: "Total Revenue", value: "$45,280", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Active Events", value: "8", icon: Calendar, color: "text-primary", bg: "bg-primary/5" },
    { label: "Total Tickets Sold", value: "1,240", icon: Ticket, color: "text-accent", bg: "bg-accent/5" },
    { label: "Total Attendees", value: "3,890", icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold font-headline text-primary mb-2">Organizer Dashboard</h1>
            <p className="text-muted-foreground">Manage your events, track sales, and connect with attendees.</p>
          </div>
          <Link href="/dashboard/create">
            <Button className="h-12 px-6 rounded-xl gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-5 h-5" /> New Event
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">+12%</Badge>
                </div>
                <h3 className="text-3xl font-bold text-primary mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Events Table/List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-headline text-primary">Your Events</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Active</Button>
              <Button variant="ghost" size="sm">Past</Button>
            </div>
          </div>

          <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Details</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Sales</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Revenue</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {MOCK_EVENTS.map((event) => {
                    const progress = (event.ticketsSold / event.ticketsTotal) * 100;
                    return (
                      <tr key={event.id} className="hover:bg-muted/20 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-muted relative overflow-hidden shrink-0">
                              <Image src={event.imageUrl} alt="" fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-primary line-clamp-1 group-hover:text-accent transition-colors">{event.title}</p>
                              <p className="text-xs text-muted-foreground">{event.category} • {event.location.split(',')[0]}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-32 space-y-1">
                            <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                              <span>{event.ticketsSold} SOLD</span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-accent rounded-full" style={{ width: `${progress}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-primary">
                          ${(event.ticketsSold * event.price).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none capitalize">
                            Live
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-5 h-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem className="gap-2">
                                <Edit3 className="w-4 h-4" /> Edit Event
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Users className="w-4 h-4" /> View Attendees
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2" asChild>
                                <Link href={`/events/${event.id}`}>
                                  <ExternalLink className="w-4 h-4" /> View Live Page
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-destructive">
                                <Trash2 className="w-4 h-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
