
"use client";

import { use, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MOCK_EVENTS } from "@/lib/events-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Loader2, Calendar, MapPin, Ticket } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const event = MOCK_EVENTS.find(e => e.id === id);
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  if (!event) return <div>Event not found</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20 flex-grow max-w-2xl">
        {step === 'checkout' ? (
          <Card className="border-2 shadow-2xl overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-8">
              <CardTitle className="text-2xl font-headline">Order Summary</CardTitle>
              <CardDescription className="text-primary-foreground/70">Finalize your booking for {event.title}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex gap-6 pb-6 border-b">
                <div className="w-24 h-24 rounded-xl overflow-hidden relative shrink-0">
                  <Image src={event.imageUrl} alt="" fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-primary">{event.title}</h3>
                  <div className="text-sm text-muted-foreground flex flex-col gap-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(event.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ticket Type</span>
                  <Badge variant="secondary">Standard Admission</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-bold">1</span>
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">Total Price</span>
                  <span className="text-2xl font-bold text-primary">${event.price}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <Button 
                className="w-full h-14 text-lg rounded-xl gap-2 shadow-lg shadow-primary/20" 
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Confirm Booking</>}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold font-headline text-primary">You're going!</h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                We've sent your tickets and confirmation details to your registered email address.
              </p>
            </div>

            <Card className="max-w-sm mx-auto border-2 border-emerald-100 bg-emerald-50/30">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-emerald-800 font-bold">
                    <Ticket className="w-5 h-5" /> Confirmation #MT-{Math.floor(Math.random() * 900000) + 100000}
                  </div>
                  <p className="text-sm text-muted-foreground text-left">
                    Present your digital QR code at the entrance of {event.location}.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/events">
                <Button variant="outline" className="h-12 px-8 rounded-xl gap-2">
                  Find more events
                </Button>
              </Link>
              <Link href="/profile">
                <Button className="h-12 px-8 rounded-xl gap-2">
                  View My Bookings <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Image({ src, alt, fill, className }: any) {
  return <img src={src} alt={alt} className={className} style={fill ? { width: '100%', height: '100%' } : {}} />;
}
