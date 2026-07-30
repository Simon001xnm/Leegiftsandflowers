"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MOCK_RESTAURANTS } from "@/lib/food-data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2, MapPin, MessageCircle, LogIn, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/firebase";

/**
 * RESTAURANT-SPECIFIC WHATSAPP DISPATCH
 * Direct synchronization for vendor nodes.
 */
export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: authLoading } = useUser();
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
  const [loading, setLoading] = useState(false);

  const orderItems = [
    { name: "Classic Cheeseburger", price: 850, quantity: 2 },
    { name: "Truffle Fries", price: 450, quantity: 1 }
  ];
  
  const subtotal = orderItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const deliveryFee = restaurant?.deliveryFee || 150;
  const total = subtotal + deliveryFee;

  const handleWhatsAppCheckout = () => {
    setLoading(true);
    const phone = "254722522346";
    const itemsList = orderItems.map(i => `- ${i.name} (${i.quantity}x)`).join('\n');
    const message = `*STEAK WEST VENDOR ORDER*\n\nVendor: ${restaurant?.name}\n\nItems:\n${itemsList}\n\n*Total: KES ${total.toLocaleString()}*\n\n_Please confirm my order for dispatch._`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (!restaurant) return <div className="p-20 text-center font-black text-2xl uppercase tracking-tighter">Vendor Node Missing</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col pt-20">
      <main className="container mx-auto px-4 py-12 flex-grow max-w-4xl">
        <div className="mb-8">
           <Button variant="ghost" className="gap-2 font-black text-[11px] uppercase tracking-widest" onClick={() => router.back()}>
             <ChevronLeft className="w-4 h-4" /> Return
           </Button>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-4 border-black rounded-none shadow-sm">
              <CardHeader className="bg-gray-50 border-b-2 border-black">
                <CardTitle className="font-black text-[12px] uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Delivery Node
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="p-4 bg-gray-50 border border-black">
                  <p className="font-black text-[13px] uppercase tracking-tighter">Current Address</p>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed mt-1">
                    Nairobi West Distribution Range
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="p-8 border-4 border-[#25D366] bg-[#25D366]/5 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <MessageCircle className="w-8 h-8 text-[#25D366]" />
                  <div>
                     <p className="font-black text-[14px] uppercase tracking-tighter">Direct WhatsApp Order</p>
                     <p className="text-[10px] font-black uppercase text-[#25D366] tracking-widest">Active Dispatch Protocol</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-4 border-black shadow-2xl overflow-hidden rounded-none">
              <CardHeader className="bg-primary text-white border-b-2 border-black py-4">
                <CardTitle className="text-[12px] font-black uppercase tracking-widest">Order Total</CardTitle>
                <p className="text-[10px] font-black opacity-80 uppercase tracking-widest">{restaurant.name}</p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  {orderItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[13px] font-black uppercase tracking-tighter">
                      <div className="flex gap-2">
                        <span className="text-primary">{item.quantity}x</span>
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t-2 border-black border-dashed space-y-3">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                    <span>Delivery</span>
                    <span>KES {deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-black pt-4 border-t-2 border-black">
                    <span className="tracking-tighter uppercase">Total</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full h-16 text-[12px] font-black uppercase tracking-widest rounded-none gap-2 bg-[#25D366] hover:bg-[#128C7E] border-none shadow-xl" 
                  onClick={handleWhatsAppCheckout}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Order on WhatsApp
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
