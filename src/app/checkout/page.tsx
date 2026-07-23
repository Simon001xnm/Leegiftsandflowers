
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useUser } from "@/firebase/auth/use-user";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";

export default function GlobalCheckoutPage() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, clearItem, subtotal, clearCart } = useCart();
  const { user, loading: authLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const supabase = createClient();

  const deliveryFee = cart.length > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (!user) {
      router.push(`/login?redirect=/checkout`);
      return;
    }
    
    setLoading(true);
    const orderId = `SW-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      id: orderId,
      customer_id: user.id,
      items: cart.map(i => ({ 
        id: i.item.id,
        name: i.item.name, 
        quantity: i.quantity, 
        price: i.item.price 
      })),
      total: total,
      status: "pending",
      delivery_address: "Silver Heights, Nairobi, Kenya",
      created_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('orders')
      .insert([orderData]);

    if (error) {
      // Graceful error handling for demo environments
      if (user.id?.startsWith('demo-')) {
         // Silently bypass in demo
      } else {
        setLoading(false);
        return;
      }
    }

    setTimeout(() => {
      clearCart();
      router.push(`/track/${orderId}`);
    }, 800);
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-50 border-2 border-dashed flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-200" />
          </div>
          <h1 className="text-3xl font-medium font-headline text-black tracking-tight mb-4">Your basket is empty</h1>
          <p className="text-muted-foreground mb-8 max-w-sm font-medium text-[14px]">Looks like you haven't added any premium cuts yet.</p>
          <Link href="/">
            <Button className="h-14 px-10 rounded-xl font-bold text-[14px] shadow-xl shadow-primary/10">
              Start shopping
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pt-20">
      <main className="container mx-auto px-4 py-8 lg:py-12 flex-grow max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" className="gap-2 font-bold text-[14px]" onClick={() => router.back()}>
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <div className="flex items-center gap-2 text-primary font-bold text-[14px]">
            <ShieldCheck className="w-4 h-4" /> Secure payment
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-10">
            <section className="space-y-6">
              <h2 className="text-2xl font-medium font-headline text-black tracking-tight flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" /> My selection ({cart.length})
              </h2>
              <div className="border-t border-l">
                {cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex gap-4 p-4 border-r border-b bg-white hover:bg-gray-50 transition-colors group">
                    <div className="w-20 h-20 relative shrink-0 bg-gray-100 border">
                      <Image src={cartItem.item.imageUrl} alt={cartItem.item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <h4 className="font-medium text-[16px] tracking-tight line-clamp-1">{cartItem.item.name}</h4>
                      <p className="text-[13px] text-muted-foreground font-medium">KES {cartItem.item.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 bg-gray-100 px-3 py-1 border rounded-lg">
                          <button onClick={() => removeFromCart(cartItem.item.id)} className="text-black hover:scale-110"><Minus className="w-3 h-3" /></button>
                          <span className="text-[14px] font-bold min-w-[20px] text-center">{cartItem.quantity}</span>
                          <button onClick={() => addToCart(cartItem.item)} className="text-black hover:scale-110"><Plus className="w-3 h-3" /></button>
                        </div>
                        <p className="font-bold text-[14px]">KES {(cartItem.item.price * cartItem.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                    <button className="h-8 w-8 text-gray-300 hover:text-red-500 self-start" onClick={() => clearItem(cartItem.item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-medium font-headline text-black tracking-tight flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" /> Destination
              </h2>
              <Card className="rounded-2xl border shadow-none bg-gray-50">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-bold text-[14px]">Home address</p>
                    <p className="text-[14px] font-medium text-muted-foreground">Silver Heights, Nairobi, Kenya</p>
                  </div>
                  <Button variant="outline" className="rounded-xl border-2 font-bold text-[12px]">Change</Button>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <Card className="rounded-3xl border shadow-2xl overflow-hidden">
                <CardHeader className="bg-black text-white py-6">
                  <CardTitle className="text-[14px] font-bold">Payment method</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4">
                    <Label
                      htmlFor="mpesa"
                      className={`flex items-center justify-between p-4 border rounded-2xl transition-all cursor-pointer ${paymentMethod === 'mpesa' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-primary" />
                        <div className="space-y-0.5">
                          <p className="font-bold text-[14px]">M-Pesa</p>
                          <p className="text-[10px] font-medium text-muted-foreground">Mobile checkout</p>
                        </div>
                      </div>
                      <RadioGroupItem value="mpesa" id="mpesa" />
                    </Label>

                    <Label
                      htmlFor="card"
                      className={`flex items-center justify-between p-4 border rounded-2xl transition-all cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <div className="space-y-0.5">
                          <p className="font-bold text-[14px]">Debit/Credit card</p>
                          <p className="text-[10px] font-medium text-muted-foreground">Visa / Mastercard</p>
                        </div>
                      </div>
                      <RadioGroupItem value="card" id="card" />
                    </Label>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-gray-100 shadow-xl bg-white">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-[14px] font-bold">Order total</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[14px] font-medium text-muted-foreground">
                      <span>Subtotal</span>
                      <span>KES {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[14px] font-medium text-muted-foreground">
                      <span>Delivery</span>
                      <span>KES {deliveryFee.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-dashed space-y-2">
                    <p className="text-[11px] font-bold text-muted-foreground">Grand total</p>
                    <p className="text-4xl font-bold text-primary">KES {total.toLocaleString()}</p>
                  </div>
                  <Button 
                    className="w-full h-16 text-[14px] font-bold rounded-2xl shadow-xl transition-all"
                    onClick={handleCheckout}
                    disabled={loading || authLoading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                      </div>
                    ) : (
                      <>{!user ? 'Sign in to pay' : `Pay KES ${total.toLocaleString()}`} <ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
