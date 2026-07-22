
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  ArrowRight, 
  Loader2, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus,
  ChevronLeft,
  ShieldCheck
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useUser, useFirestore } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Link from "next/link";
import Image from "next/image";

export default function GlobalCheckoutPage() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, clearItem, subtotal, clearCart } = useCart();
  const { user, loading: authLoading } = useUser();
  const firestore = useFirestore();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const deliveryFee = cart.length > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!user) {
      router.push(`/login?redirect=/checkout`);
      return;
    }
    
    setLoading(true);
    const orderId = `SW-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      id: orderId,
      customerId: user.uid,
      items: cart.map(i => ({ name: i.item.name, quantity: i.quantity, price: i.item.price })),
      total: total,
      status: "pending",
      deliveryAddress: "Silver Heights, Nairobi, Kenya",
      createdAt: new Date().toISOString()
    };

    const orderRef = doc(firestore, "orders", orderId);
    
    setDoc(orderRef, orderData)
      .catch(async (error) => {
        if (!user?.uid?.startsWith('demo-')) {
          const permissionError = new FirestorePermissionError({
            path: orderRef.path,
            operation: 'create',
            requestResourceData: orderData,
          });
          errorEmitter.emit('permission-error', permissionError);
        }
      });

    setTimeout(() => {
      clearCart();
      router.push(`/track/${orderId}`);
    }, 1000);
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-50 flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
          </div>
          <h1 className="text-3xl font-black font-headline text-black uppercase tracking-tighter mb-4">Your Basket is Empty</h1>
          <p className="text-muted-foreground mb-8 max-w-sm">Looks like you haven't added any premium cuts to your basket yet.</p>
          <Link href="/restaurants">
            <Button className="h-14 px-10 rounded-none font-black text-[14px] uppercase tracking-widest shadow-xl shadow-primary/10">
              Start Shopping
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="container mx-auto px-4 py-8 lg:py-12 flex-grow max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" className="gap-2 font-black text-[14px] uppercase tracking-widest" onClick={() => router.back()}>
            <ChevronLeft className="w-4 h-4" /> Back to Market
          </Button>
          <div className="flex items-center gap-2 text-primary font-black text-[14px] uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Secure Checkout
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-10">
            <section className="space-y-6">
              <h2 className="text-2xl font-black font-headline text-black uppercase tracking-tighter flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" /> Review Items ({cart.length})
              </h2>
              <div className="border-t border-l">
                {cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex gap-4 p-4 border-r border-b bg-white hover:bg-gray-50 transition-colors group">
                    <div className="w-20 h-20 relative shrink-0 bg-gray-100 border">
                      <Image src={cartItem.item.imageUrl} alt={cartItem.item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <h4 className="font-black text-[14px] uppercase tracking-tighter line-clamp-1">{cartItem.item.name}</h4>
                      <p className="text-[12px] text-muted-foreground font-bold uppercase tracking-widest">KES {cartItem.item.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 bg-gray-100 px-3 py-1 border">
                          <button onClick={() => removeFromCart(cartItem.item.id)} className="text-black hover:scale-110"><Minus className="w-3 h-3" /></button>
                          <span className="text-[14px] font-black min-w-[20px] text-center">{cartItem.quantity}</span>
                          <button onClick={() => addToCart(cartItem.item)} className="text-black hover:scale-110"><Plus className="w-3 h-3" /></button>
                        </div>
                        <p className="font-black text-[14px]">KES {(cartItem.item.price * cartItem.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-red-500 rounded-none self-start" onClick={() => clearItem(cartItem.item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black font-headline text-black uppercase tracking-tighter flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" /> Delivery Details
              </h2>
              <Card className="rounded-none border shadow-none bg-gray-50">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-black text-[14px] uppercase tracking-widest">Home Address</p>
                    <p className="text-[14px] font-medium text-muted-foreground">Silver Heights, Nairobi, Kenya</p>
                  </div>
                  <Button variant="outline" className="rounded-none border-2 font-black text-[12px] uppercase tracking-widest">Change</Button>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <Card className="rounded-none border shadow-2xl overflow-hidden">
                <CardHeader className="bg-black text-white py-6">
                  <CardTitle className="text-[14px] font-black uppercase tracking-widest">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4">
                    <Label
                      htmlFor="mpesa"
                      className={`flex items-center justify-between p-4 border transition-all cursor-pointer ${paymentMethod === 'mpesa' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-primary" />
                        <div className="space-y-0.5">
                          <p className="font-black text-[14px] uppercase tracking-widest">M-Pesa</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Instant mobile checkout</p>
                        </div>
                      </div>
                      <RadioGroupItem value="mpesa" id="mpesa" className="rounded-none" />
                    </Label>

                    <Label
                      htmlFor="card"
                      className={`flex items-center justify-between p-4 border transition-all cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <div className="space-y-0.5">
                          <p className="font-black text-[14px] uppercase tracking-widest">Debit/Credit Card</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Visa / Mastercard</p>
                        </div>
                      </div>
                      <RadioGroupItem value="card" id="card" className="rounded-none" />
                    </Label>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="rounded-none border-4 border-black shadow-none bg-white">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-[14px] font-black uppercase tracking-widest">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[14px] font-bold text-muted-foreground uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span>KES {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[14px] font-bold text-muted-foreground uppercase tracking-widest">
                      <span>Delivery Fee</span>
                      <span>KES {deliveryFee.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-dashed space-y-2">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Grand Total</p>
                    <p className="text-4xl font-black text-primary">KES {total.toLocaleString()}</p>
                  </div>
                  <Button 
                    className="w-full h-16 text-[14px] font-black uppercase tracking-widest rounded-none shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
                    onClick={handleCheckout}
                    disabled={loading || authLoading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> Processing Payment...
                      </div>
                    ) : (
                      <>{!user ? 'Sign in to Pay' : `Pay KES ${total.toLocaleString()}`} <ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-3 text-muted-foreground opacity-50 font-bold uppercase tracking-widest text-[10px]">
                <ShieldCheck className="w-4 h-4" /> 100% Encrypted & Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
