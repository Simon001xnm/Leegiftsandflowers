'use client';

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Store, Bike, Mail, Lock, Loader2, ShieldCheck, ArrowRight } from "lucide-react";
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
    toast({ title: "Entering demo mode", description: `Authorized as ${selectedRole}.` });
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
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name, role } },
        });
        if (error) throw error;
        toast({ title: "Account registered", description: "Identity verified." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Authorized", description: "Sync successful." });
      }
      router.push(redirectPath);
    } catch (error: any) {
      const isNetworkError = error.message === 'Failed to fetch' || error.message.includes('Keys Missing');
      const isInvalidCreds = error.message.includes('Invalid login credentials');
      
      toast({
        variant: "destructive",
        title: isNetworkError ? "Network isolation active" : "Authorization failed",
        description: isInvalidCreds 
          ? "Invalid credentials. If testing, please use the demo bypass buttons below."
          : (isNetworkError ? "Live sync unavailable. Please use demo bypass." : error.message),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative w-52 h-52 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white p-4 transition-transform hover:scale-105 duration-500">
            <Image src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png" alt="Steak West Brand" fill className="object-contain p-2" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">Steak West Butchery</h1>
          </div>
        </div>

        <Card className="w-full border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[3rem] overflow-hidden bg-white">
          <CardContent className="p-10">
            <Tabs defaultValue="login" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-gray-50 p-1.5 h-14 border">
                <TabsTrigger value="login" className="rounded-xl font-bold text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-lg">Login</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-xl font-bold text-[13px] data-[state=active]:bg-white data-[state=active]:shadow-lg">Sign up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <form onSubmit={(e) => handleAuth(e, "login")} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="font-bold text-[12px] px-1 text-muted-foreground">Email address</Label>
                    <Input name="email" type="email" placeholder="alex@steakwest.com" className="h-14 rounded-2xl bg-gray-50 border-none font-medium text-base focus:ring-4 focus:ring-primary/5 transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-[12px] px-1 text-muted-foreground">Access key</Label>
                    <Input name="password" type="password" placeholder="••••••••" className="h-14 rounded-2xl bg-gray-50 border-none font-medium text-base focus:ring-4 focus:ring-primary/5 transition-all" required />
                  </div>
                  <Button type="submit" className="w-full h-14 rounded-2xl font-bold text-base shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all" disabled={loading}>
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize entry"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-8">
                <div className="space-y-3">
                  <Label className="text-[12px] font-bold text-muted-foreground text-center block">Identify your entity role</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "customer", label: "Customer", icon: User },
                      { id: "merchant", label: "Merchant", icon: Store },
                      { id: "rider", label: "Courier", icon: Bike },
                    ].map((r) => (
                      <button key={r.id} type="button" className={cn("flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 group", role === r.id ? "border-primary bg-primary/5 text-primary" : "border-gray-50 hover:bg-gray-50")} onClick={() => setRole(r.id as AppRole)}>
                        <r.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", role === r.id && "animate-pulse")} />
                        <span className="text-[10px] font-bold">{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={(e) => handleAuth(e, "signup")} className="space-y-5">
                  <Input name="name" placeholder="Full identity" className="h-14 rounded-2xl bg-gray-50 border-none font-medium text-base" required />
                  <Input name="email" type="email" placeholder="Email address" className="h-14 rounded-2xl bg-gray-50 border-none font-medium text-base" required />
                  <Input name="password" type="password" placeholder="Create access key" className="h-14 rounded-2xl bg-gray-50 border-none font-medium text-base" required />
                  <Button type="submit" className="w-full h-14 rounded-2xl font-bold bg-black text-white text-base shadow-2xl transition-all hover:bg-zinc-800" disabled={loading}>
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register entity"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="bg-gray-50/80 p-8 flex flex-col gap-6 border-t">
            <div className="w-full space-y-4">
              <p className="text-[11px] font-bold text-center text-muted-foreground">Testing? Use demo bypass</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="rounded-2xl border-dashed border-2 text-[11px] font-bold h-12 hover:bg-white hover:border-solid transition-all" onClick={() => handleDemoBypass('merchant')}>
                   Merchant bypass
                </Button>
                <Button variant="outline" className="rounded-2xl border-dashed border-2 text-[11px] font-bold h-12 hover:bg-white hover:border-solid transition-all" onClick={() => handleDemoBypass('rider')}>
                   Courier bypass
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground font-bold text-[10px] bg-white/50 py-2 px-4 rounded-full border border-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure SSL identity protection active
            </div>
          </CardFooter>
        </Card>

        <div className="text-center pb-10">
          <Link href="/" className="text-muted-foreground font-bold text-[12px] hover:text-primary transition-all flex items-center justify-center gap-3 group">
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Abort and return to marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
