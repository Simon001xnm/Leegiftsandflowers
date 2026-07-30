
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
  ShieldCheck,
  MessageCircle
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useUser } from "@/firebase/auth/use-user";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";

export default function GlobalCheckoutPage() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, clearItem, subtotal, taxTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("whatsapp");
  const supabase = createClient();

  const deliveryFee = cart.length > 0 ? 150 : 0;
  const total = subtotal + taxTotal + deliveryFee;

  const handleWhatsAppCheckout = () => {
    const phone = "254722522346";
    const itemsList = cart.map(i => `- ${i.item.name} (${i.quantity}x @ KES ${i.item.price.toLocaleString()})`).join('\n');
    const message = `*STEAK WEST DISPATCH REQUEST*\n\nHello Steak West! I'd like to place the following order:\n\n${itemsList}\n\n*Subtotal:* KES ${subtotal.toLocaleString()}\n*VAT (16%):* KES ${taxTotal.toLocaleString()}\n*Delivery:* KES ${deliveryFee.toLocaleString()}\n\n*TOTAL: KES ${total.toLocaleString()}*\n\n_Please confirm availability and delivery time._`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleStandardCheckout = async () => {
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
      subtotal: subtotal,
      tax: taxTotal,
      total: total,
      status: "pending",
      delivery_address: "Silver Heights, Nairobi, Kenya",
      created_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('orders')
      .insert([orderData]);

    if (error) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      clearCart();
      router.push(`/track/${orderId}`);
    }, 800);
  };

  const handleCheckout = () => {
    if (paymentMethod === 'whatsapp') {
      handleWhatsAppCheckout();
    } else {
      handleStandardCheckout();
    }
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
            <ShieldCheck className="w-4 h-4" /> Secure checkout node
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
                      <h4 className="font-medium text-[16px] tracking-tight line-clamp-1 uppercase">{cartItem.item.name}</h4>
                      <p className="text-[13px] text-muted-foreground font-medium">KES {cartItem.item.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 bg-gray-100 px-3 py-1 border rounded-lg">
                          <button onClick={() => removeFromCart(cartItem.item.id)} className="text-black hover:scale-110"><Minus className="w-3 h-3" /></button>
                          <span className="text-[14px] font-bold min-w-[20px] text-center">{cartItem.quantity}</span>
                          <button onClick={() => addToCart(cartItem.item)} className="text-black hover:scale-110"><Plus className="w-3 h-3" /></button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[14px]">KES {(cartItem.item.price * cartItem.quantity).toLocaleString()}</p>
                          {cartItem.item.hasTax && <p className="text-[8px] font-black text-gray-400">EXCL. TAX</p>}
                        </div>
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
              <h2 className="text-2xl font-medium font-headline text-black tracking-tight">Checkout method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4">
                <Label
                  htmlFor="whatsapp"
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'whatsapp' ? 'border-[#25D366] bg-[#25D366]/5' : 'hover:bg-gray-50 border-gray-100'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black text-[14px] uppercase tracking-tighter">Order via WhatsApp</p>
                      <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest">Instant confirmation with dispatch</p>
                    </div>
                  </div>
                  <RadioGroupItem value="whatsapp" id="whatsapp" />
                </Label>

                <Label
                  htmlFor="card"
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50 border-gray-100'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-primary">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black text-[14px] uppercase tracking-tighter">Card / Mobile Money</p>
                      <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest">Standard digital payment node</p>
                    </div>
                  </div>
                  <RadioGroupItem value="card" id="card" />
                </Label>
              </RadioGroup>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <Card className="rounded-3xl border border-gray-100 shadow-xl bg-white overflow-hidden">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-[14px] font-bold uppercase tracking-widest">Order total</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[14px] font-medium text-muted-foreground">
                      <span>Subtotal</span>
                      <span>KES {subtotal.toLocaleString()}</span>
                    </div>
                    {taxTotal > 0 && (
                      <div className="flex justify-between text-[14px] font-medium text-primary">
                        <span>VAT (16%)</span>
                        <span>KES {taxTotal.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[14px] font-medium text-muted-foreground">
                      <span>Delivery</span>
                      <span>KES {deliveryFee.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-dashed space-y-2">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase">Grand total</p>
                    <p className="text-4xl font-bold text-primary">KES {total.toLocaleString()}</p>
                  </div>
                  <Button 
                    className={`w-full h-16 text-[14px] font-bold rounded-2xl shadow-xl transition-all ${paymentMethod === 'whatsapp' ? 'bg-[#25D366] hover:bg-[#128C7E]' : ''}`}
                    onClick={handleCheckout}
                    disabled={loading || authLoading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {paymentMethod === 'whatsapp' ? <MessageCircle className="w-5 h-5" /> : null}
                        <span>{paymentMethod === 'whatsapp' ? 'Checkout on WhatsApp' : (!user ? 'Sign in to pay' : `Pay KES ${total.toLocaleString()}`)}</span>
                        {paymentMethod !== 'whatsapp' && <ArrowRight className="w-5 h-5 ml-2" />}
                      </div>
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
