'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Store, Bike, Mail, Lock, Loader2, UserPlus, LogIn, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type AppRole = 'customer' | 'merchant' | 'rider';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<AppRole>('customer');
  const redirectPath = searchParams.get("redirect") || "/";

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>, mode: 'login' | 'signup') => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              role: role
            }
          }
        });

        if (error) throw error;
        
        // Sync profile table
        if (data.user) {
          await supabase.from('profiles').upsert([
            { id: data.user.id, name, email, role, created_at: new Date().toISOString() }
          ]);
        }

        toast({ title: "Welcome to Steak West!", description: "Account registered successfully." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Authorized", description: "Identity verified." });
      }
      
      router.push(redirectPath);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Auth Failure",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="w-full border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] rounded-none overflow-hidden bg-background">
          <CardHeader className="bg-primary text-primary-foreground text-center pb-8 pt-10 border-b-4 border-black">
            <CardTitle className="text-4xl font-headline font-black uppercase tracking-tighter">Steak West</CardTitle>
            <CardDescription className="text-primary-foreground/70 font-bold uppercase tracking-widest text-[10px]">Secure Access Terminal</CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 rounded-none bg-gray-100 border-2 border-black p-1 h-14">
                <TabsTrigger value="login" className="rounded-none font-black uppercase text-xs data-[state=active]:bg-black data-[state=active]:text-white">
                  <LogIn className="w-4 h-4 mr-2" /> Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="rounded-none font-black uppercase text-xs data-[state=active]:bg-black data-[state=active]:text-white">
                  <UserPlus className="w-4 h-4 mr-2" /> Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={(e) => handleAuth(e, 'login')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-black uppercase text-[10px] tracking-widest">Email Node</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="email" name="email" type="email" placeholder="alex@steakwest.com" className="pl-10 h-12 rounded-none border-2 border-black font-bold" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-black uppercase text-[10px] tracking-widest">Access Key</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-10 h-12 rounded-none border-2 border-black font-bold" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-14 rounded-none font-black uppercase tracking-widest shadow-xl shadow-primary/20" disabled={loading}>
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Entry"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Assign Entity Role</Label>
                    <div className="grid grid-cols-3 gap-0 border-2 border-black">
                      {[
                        { id: 'customer', label: 'Customer', icon: User },
                        { id: 'merchant', label: 'Merchant', icon: Store },
                        { id: 'rider', label: 'Courier', icon: Bike }
                      ].map((r) => (
                        <Button 
                          key={r.id}
                          type="button"
                          variant={role === r.id ? 'default' : 'ghost'} 
                          className={cn(
                            "flex-col h-20 gap-1 rounded-none border-r-2 border-black last:border-none",
                            role === r.id && "bg-black text-white"
                          )}
                          onClick={() => setRole(r.id as AppRole)}
                        >
                          <r.icon className="w-5 h-5" />
                          <span className="text-[9px] uppercase font-black">{r.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={(e) => handleAuth(e, 'signup')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-black uppercase text-[10px] tracking-widest">Full Identity</Label>
                      <Input id="name" name="name" placeholder="Alex Johnson" className="h-12 rounded-none border-2 border-black font-bold" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-signup" className="font-black uppercase text-[10px] tracking-widest">Email Node</Label>
                      <Input id="email-signup" name="email" type="email" placeholder="alex@steakwest.com" className="h-12 rounded-none border-2 border-black font-bold" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup" className="font-black uppercase text-[10px] tracking-widest">Access Key</Label>
                      <Input id="password-signup" name="password" type="password" placeholder="••••••••" className="h-12 rounded-none border-2 border-black font-bold" required />
                    </div>
                    <Button type="submit" className="w-full h-14 rounded-none font-black uppercase tracking-widest bg-black text-white hover:bg-primary transition-colors" disabled={loading}>
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register Entity"}
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="bg-muted/50 p-6 flex flex-col gap-2 text-center border-t-2 border-black">
             <div className="flex items-center justify-center gap-2 text-muted-foreground opacity-70 font-black text-[10px] uppercase tracking-widest">
               <ShieldCheck className="w-4 h-4 text-emerald-600" /> Supabase Data Vault Active
             </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
