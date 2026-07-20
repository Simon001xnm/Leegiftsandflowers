
"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, ArrowRight, Loader2, MapPin, Bike, CreditCard, Smartphone, LogIn, ShoppingBag, Navigation as NavIcon } from "lucide-react";
import Link from "link/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useUser, useFirestore } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: authLoading } = useUser();
  const firestore = useFirestore();
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [lastOrderId, setLastOrderId] = useState<string>("");

  const orderItems = [
    { name: "Classic Cheeseburger", price: 850, quantity: 2 },
    { name: "Truffle Fries", price: 450, quantity: 1 }
  ];
  
  const subtotal = orderItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const deliveryFee = restaurant?.deliveryFee || 150;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!user) {
      router.push(`/login?redirect=/checkout/${id}`);
      return;
    }
    
    setLoading(true);
    const orderId = `LEE-${Math.floor(100000 + Math.random() * 900000)}`;
    setLastOrderId(orderId);

    const orderData = {
      id: orderId,
      customerId: user.uid,
      restaurantId: id,
      items: orderItems,
      total: total,
      status: "pending",
      deliveryAddress: "Apartment 4B, Silver Heights, Kileleshwa, Nairobi",
      createdAt: new Date().toISOString()
    };

    const orderRef = doc(firestore, "orders", orderId);
    setDoc(orderRef, orderData)
      .then(() => {
        setLoading(false);
        setStep('success');
      })
      .catch(async (error) => {
        setLoading(false);
        // Handle potential permission error or if Firebase is missing
        if (user.uid.startsWith('demo-')) {
           setStep('success');
        } else {
          const permissionError = new FirestorePermissionError({
            path: orderRef.path,
            operation: 'create',
            requestResourceData: orderData,
          });
          errorEmitter.emit('permission-error', permissionError);
        }
      });
  };

  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow max-w-4xl">
        {step === 'checkout' ? (
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              {!user && !authLoading && (
                <Card className="border-accent bg-accent/5 border-dashed">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-primary">Signed out</p>
                      <p className="text-sm text-muted-foreground">Log in to track your order and earn points.</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 border-primary text-primary" onClick={() => router.push(`/login?redirect=/checkout/${id}`)}>
                      <LogIn className="w-4 h-4" /> Sign In
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card className="border-2 rounded-[2rem] overflow-hidden">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" /> Delivery Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border">
                    <div className="flex-grow">
                      <p className="font-bold">Home Address</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Apartment 4B, Silver Heights,<br />
                        Kileleshwa, Nairobi, Kenya
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary font-bold">Edit</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 rounded-[2rem] overflow-hidden">
                <CardHeader>
                  <CardTitle className="font-headline">Payment Choice</CardTitle>
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
                          <p className="text-xs text-muted-foreground">Instant mobile checkout</p>
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
                          <p className="font-bold">Card</p>
                          <p className="text-xs text-muted-foreground">Visa / Mastercard</p>
                        </div>
                      </div>
                      <RadioGroupItem value="card" id="card" />
                    </Label>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-2 shadow-xl sticky top-24 overflow-hidden rounded-[2.5rem]">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="font-headline">Order Total</CardTitle>
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
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-bold">KES {deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-primary pt-4 border-t">
                      <span>Total</span>
                      <span>KES {total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full h-14 text-lg rounded-2xl gap-2 shadow-lg shadow-primary/20" 
                    onClick={handleCheckout}
                    disabled={loading || authLoading}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{!user ? 'Sign in to Pay' : 'Confirm Order'} <ArrowRight className="w-5 h-5" /></>}
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
              <h1 className="text-4xl font-bold font-headline text-primary">Payment Received!</h1>
              <p className="text-muted-foreground text-lg">
                Success! Your meal from {restaurant.name} is now being prepared.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                className="h-14 px-10 rounded-2xl gap-2 shadow-lg shadow-primary/20 text-lg"
                onClick={() => router.push(`/track/${lastOrderId}`)}
              >
                View Live Tracking Map <NavIcon className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="h-14 px-10 rounded-2xl text-lg"
                onClick={() => router.push("/dashboard/customer")}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
