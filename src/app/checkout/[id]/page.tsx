
"use client";

import { use, useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, ArrowRight, Loader2, MapPin, Bike, CreditCard, Wallet, Smartphone } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [orderId] = useState(`LEE-${Math.floor(100000 + Math.random() * 900000)}`);

  const orderItems = [
    { name: "Classic Cheeseburger", price: 850, quantity: 2 },
    { name: "Truffle Fries", price: 450, quantity: 1 }
  ];
  
  const subtotal = orderItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const deliveryFee = restaurant?.deliveryFee || 150;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 2000);
  };

  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow max-w-4xl">
        {step === 'checkout' ? (
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-headline">Delivery Address</CardTitle>
                  <CardDescription>Where should we bring your food?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div className="flex-grow">
                      <p className="font-bold">Home</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Apartment 4B, Silver Heights,<br />
                        Kileleshwa, Nairobi, Kenya
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary font-bold">Change</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-headline">Payment Method</CardTitle>
                  <CardDescription>Select your preferred way to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4">
                    <Label
                      htmlFor="mpesa"
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'mpesa' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-primary" />
                        <div className="space-y-0.5">
                          <p className="font-bold">M-Pesa</p>
                          <p className="text-xs text-muted-foreground">Secure mobile payment</p>
                        </div>
                      </div>
                      <RadioGroupItem value="mpesa" id="mpesa" />
                    </Label>

                    <Label
                      htmlFor="card"
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <div className="space-y-0.5">
                          <p className="font-bold">Credit/Debit Card</p>
                          <p className="text-xs text-muted-foreground">Visa, Mastercard</p>
                        </div>
                      </div>
                      <RadioGroupItem value="card" id="card" />
                    </Label>

                    <Label
                      htmlFor="cash"
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-primary" />
                        <div className="space-y-0.5">
                          <p className="font-bold">Cash on Delivery</p>
                          <p className="text-xs text-muted-foreground">Pay when you receive</p>
                        </div>
                      </div>
                      <RadioGroupItem value="cash" id="cash" />
                    </Label>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-2 shadow-xl sticky top-24 overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="font-headline">Order Summary</CardTitle>
                  <p className="text-sm opacity-80">{restaurant.name}</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    {orderItems.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <div className="flex gap-2">
                          <span className="font-bold text-primary">{item.quantity}x</span>
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                        <span className="font-bold">KES {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-bold">KES {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-bold">KES {deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-primary pt-4 border-t">
                      <span>Total Price</span>
                      <span>KES {total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full h-14 text-lg rounded-2xl gap-2 shadow-lg shadow-primary/20" 
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Place Order <ArrowRight className="w-5 h-5" /></>}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl mx-auto py-20">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
              <CircleCheck className="w-12 h-12" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold font-headline text-primary">Your order is placed!</h1>
              <p className="text-muted-foreground text-lg">
                Your food from {restaurant.name} is being prepared and will be delivered within {restaurant.deliveryTime}.
              </p>
            </div>

            <Card className="border-2 border-emerald-100 bg-emerald-50/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <p className="text-xs font-bold text-emerald-700 uppercase">Order Tracking ID</p>
                    <p className="text-xl font-bold text-primary">{orderId}</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">Preparing</Badge>
                </div>
                <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-1/4 animate-pulse rounded-full" />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/restaurants">
                <Button variant="outline" className="h-12 px-8 rounded-xl gap-2">
                  Order more
                </Button>
              </Link>
              <Link href={`/track/${orderId}`}>
                <Button className="h-12 px-8 rounded-xl gap-2">
                  Track in Real-time <Bike className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
