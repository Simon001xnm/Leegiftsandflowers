
'use client';

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Store, Bike, Mail, Lock, Loader2, UserPlus, LogIn, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";

type AppRole = "customer" | "merchant" | "rider";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<AppRole>("customer");

  const redirectPath = searchParams.get("redirect") || "/profile";

  const handleDemoBypass = (selectedRole: AppRole) => {
    localStorage.setItem('steak_west_demo_user', JSON.stringify({
      id: `demo-${Date.now()}`,
      email: 'demo@steakwest.com',
      user_metadata: { role: selectedRole, full_name: `Demo ${selectedRole}` }
    }));
    toast({ title: "Entering Demo Mode", description: `Authorized as ${selectedRole}.` });
    router.push(redirectPath);
  };

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>, mode: "login" | "signup") => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name, role } },
        });
        if (error) throw error;
        if (data.user) {
          await supabase.from("profiles").upsert([{
            id: data.user.id,
            name,
            email,
            role,
            created_at: new Date().toISOString(),
          }]);
        }
        toast({ title: "Account Registered", description: "Identity verified." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Authorized", description: "Sync successful." });
      }
      router.push(redirectPath);
    } catch (error: any) {
      console.error(error);
      const isNetworkError = error.message === 'Failed to fetch' || error.message.includes('Keys Missing');
      
      toast({
        variant: "destructive",
        title: isNetworkError ? "Network Isolation Active" : "Authorization Failed",
        description: isNetworkError ? "Live sync unavailable. Please use Demo Bypass to test the software." : error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative w-16 h-16 bg-white rounded-2xl shadow-lg overflow-hidden border p-2">
            <Image src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" alt="Logo" fill className="object-contain p-2" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter">Steak West Central</h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Global Meat Distribution Network</p>
          </div>
        </div>

        <Card className="w-full border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
          <CardContent className="p-8">
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1 h-12">
                <TabsTrigger value="login" className="rounded-lg font-bold uppercase text-[10px] data-[state=active]:bg-white">Login</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-lg font-bold uppercase text-[10px] data-[state=active]:bg-white">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={(e) => handleAuth(e, "login")} className="space-y-4">
                  <div className="space-y-1">
                    <Label className="font-black uppercase text-[9px] tracking-widest px-1">Email Address</Label>
                    <Input name="email" type="email" placeholder="alex@steakwest.com" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-sm" required />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-black uppercase text-[9px] tracking-widest px-1">Access Key</Label>
                    <Input name="password" type="password" placeholder="••••••••" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-sm" required />
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 transition-all" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authorize Entry"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[9px] uppercase font-black text-muted-foreground tracking-widest text-center block">Identify Your Entity Role</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "customer", label: "Customer", icon: User },
                      { id: "merchant", label: "Merchant", icon: Store },
                      { id: "rider", label: "Courier", icon: Bike },
                    ].map((r) => (
                      <button key={r.id} type="button" className={cn("flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-1", role === r.id ? "border-primary bg-primary/5 text-primary" : "border-gray-50")} onClick={() => setRole(r.id as AppRole)}>
                        <r.icon className="w-4 h-4" />
                        <span className="text-[8px] font-black uppercase">{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={(e) => handleAuth(e, "signup")} className="space-y-4">
                  <Input name="name" placeholder="Full Identity" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-sm" required />
                  <Input name="email" type="email" placeholder="Email Address" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-sm" required />
                  <Input name="password" type="password" placeholder="Create Access Key" className="h-12 rounded-xl bg-gray-50 border-none font-bold text-sm" required />
                  <Button type="submit" className="w-full h-12 rounded-xl font-black uppercase tracking-widest bg-black text-white text-xs shadow-xl" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Register Entity"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="bg-gray-50/50 p-6 flex flex-col gap-4 border-t">
            <div className="w-full space-y-3">
              <p className="text-[9px] font-black uppercase text-center text-muted-foreground tracking-widest">Testing? Use Demo Bypass</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="rounded-xl border-dashed border-2 text-[9px] font-black uppercase h-10" onClick={() => handleDemoBypass('merchant')}>
                   Merchant Bypass
                </Button>
                <Button variant="outline" className="rounded-xl border-dashed border-2 text-[9px] font-black uppercase h-10" onClick={() => handleDemoBypass('rider')}>
                   Courier Bypass
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground font-bold text-[8px] uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> Secure SSL Identity Protection Active
            </div>
          </CardFooter>
        </Card>

        <div className="text-center">
          <Link href="/" className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-center gap-2">
            Abort and Return to Marketplace <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
