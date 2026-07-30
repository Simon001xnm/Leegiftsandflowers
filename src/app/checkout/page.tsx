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
import Link from "next/link";
import Image from "next/image";

/**
 * WHATSAPP-DIRECT CHECKOUT NODE
 * Prioritizes instant dispatch via WhatsApp for elite retail synchronization.
 */
export default function GlobalCheckoutPage() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, clearItem, subtotal, taxTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("whatsapp");

  const deliveryFee = cart.length > 0 ? 150 : 0;
  const total = subtotal + taxTotal + deliveryFee;

  const handleWhatsAppCheckout = () => {
    setLoading(true);
    const phone = "254722522346";
    const itemsList = cart.map(i => `- ${i.item.name} (${i.quantity}x @ KES ${i.item.price.toLocaleString()})`).join('\n');
    const message = `*STEAK WEST DISPATCH REQUEST*\n\nHello Steak West! I'd like to place the following order:\n\n${itemsList}\n\n*Subtotal:* KES ${subtotal.toLocaleString()}\n*VAT (16%):* KES ${taxTotal.toLocaleString()}\n*Delivery:* KES ${deliveryFee.toLocaleString()}\n\n*TOTAL: KES ${total.toLocaleString()}*\n\n_Please confirm availability and delivery time._`;
    
    // Direct redirect to WhatsApp
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleCheckout = () => {
    handleWhatsAppCheckout();
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-50 border-2 border-dashed flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-200" />
          </div>
          <h1 className="text-3xl font-black font-headline text-black tracking-tight mb-4 uppercase">Basket Empty</h1>
          <p className="text-muted-foreground mb-8 max-w-sm font-bold text-[11px] uppercase tracking-widest">Your selection node is currently inactive.</p>
          <Link href="/">
            <Button className="h-14 px-10 rounded-xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-primary/10">
              Start Shopping
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
          <Button variant="ghost" className="gap-2 font-black text-[11px] uppercase tracking-widest" onClick={() => router.back()}>
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <div className="flex items-center gap-2 text-primary font-black text-[11px] uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Secure Dispatch Node
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-10">
            <section className="space-y-6">
              <h2 className="text-2xl font-black font-headline text-black tracking-tighter uppercase flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" /> Selection ({cart.length})
              </h2>
              <div className="border-t border-l border-black">
                {cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex gap-4 p-4 border-r border-b border-black bg-white hover:bg-gray-50 transition-colors group">
                    <div className="w-20 h-20 relative shrink-0 bg-gray-100 border border-black">
                      <Image src={cartItem.item.imageUrl} alt={cartItem.item.name} fill className="object-cover" unoptimized={true} />
                    </div>
                    <div className="flex-grow space-y-1">
                      <h4 className="font-black text-[14px] tracking-tighter line-clamp-1 uppercase">{cartItem.item.name}</h4>
                      <p className="text-[11px] text-muted-foreground font-black uppercase tracking-widest">KES {cartItem.item.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 bg-gray-100 px-3 py-1 border border-black">
                          <button onClick={() => removeFromCart(cartItem.item.id)} className="text-black hover:scale-110"><Minus className="w-3 h-3" /></button>
                          <span className="text-[14px] font-black min-w-[20px] text-center">{cartItem.quantity}</span>
                          <button onClick={() => addToCart(cartItem.item)} className="text-black hover:scale-110"><Plus className="w-3 h-3" /></button>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-[14px]">KES {(cartItem.item.price * cartItem.quantity).toLocaleString()}</p>
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
              <h2 className="text-2xl font-black font-headline text-black tracking-tighter uppercase">Direct Dispatch</h2>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-6 rounded-none border-2 border-[#25D366] bg-[#25D366]/5 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-lg">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black text-[14px] uppercase tracking-tighter">Order via WhatsApp</p>
                      <p className="text-[10px] text-[#25D366] uppercase font-black tracking-widest">Instant merchant confirmation</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-4 border-[#25D366] bg-[#25D366]" />
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <Card className="rounded-none border-4 border-black shadow-2xl bg-white overflow-hidden">
                <CardHeader className="bg-gray-50 border-b-2 border-black py-4">
                  <CardTitle className="text-[12px] font-black uppercase tracking-widest text-black">Order Manifest</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[13px] font-black uppercase tracking-widest text-muted-foreground">
                      <span>Subtotal</span>
                      <span>KES {subtotal.toLocaleString()}</span>
                    </div>
                    {taxTotal > 0 && (
                      <div className="flex justify-between text-[13px] font-black uppercase tracking-widest text-primary">
                        <span>VAT (16%)</span>
                        <span>KES {taxTotal.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[13px] font-black uppercase tracking-widest text-muted-foreground">
                      <span>Delivery</span>
                      <span>KES {deliveryFee.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="pt-6 border-t-2 border-black border-dashed space-y-2">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Grand Total</p>
                    <p className="text-5xl font-black text-black tracking-tighter">KES {total.toLocaleString()}</p>
                  </div>
                  <Button 
                    className="w-full h-20 text-[14px] font-black uppercase tracking-widest rounded-none shadow-xl transition-all bg-[#25D366] hover:bg-[#128C7E] border-none"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin" /> Synchronizing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-6 h-6" />
                        <span>Order on WhatsApp</span>
                      </div>
                    )}
                  </Button>
                  <p className="text-[9px] font-black text-center text-gray-400 uppercase tracking-widest">
                    Your order will be itemized and sent to our dispatch team instantly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
