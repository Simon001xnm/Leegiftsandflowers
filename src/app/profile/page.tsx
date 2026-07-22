"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User as UserIcon, LogOut, Shield, Clock, LogIn, Settings, ShoppingBag, ShieldCheck, TrendingUp, Bike, Package } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/firebase/auth/use-user";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading: authLoading } = useUser();
  const supabase = createClient();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (user && !user.id?.startsWith('demo-')) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (data) setProfile(data);
      }
    }
    fetchProfile();
  }, [user, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-primary font-black uppercase tracking-widest">Syncing Identity...</div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full p-10 text-center rounded-none border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="w-20 h-20 bg-gray-50 border-2 border-dashed flex items-center justify-center mx-auto mb-8">
            <UserIcon className="w-10 h-10 text-gray-200" />
          </div>
          <h2 className="text-3xl font-black font-headline mb-4 text-black uppercase tracking-tighter">Private Portal</h2>
          <p className="text-muted-foreground mb-10 text-[14px] font-bold uppercase tracking-widest leading-relaxed">
            Please sign in to access your Steak West membership dashboard.
          </p>
          <div className="space-y-3">
            <Button 
              className="w-full h-16 rounded-none gap-3 text-[14px] font-black uppercase tracking-widest shadow-xl shadow-primary/10" 
              onClick={() => router.push("/login")}
            >
              <LogIn className="w-5 h-5" /> Secure Sign In
            </Button>
            <Button 
              variant="outline"
              className="w-full h-14 rounded-none border-2 font-black text-[12px] uppercase tracking-widest" 
              onClick={() => router.push("/restaurants")}
            >
              Back to Market
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t border-dashed flex items-center justify-center gap-2 text-muted-foreground opacity-50 font-black text-[10px] uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Supabase Protected
          </div>
        </Card>
      </div>
    );
  }

  const role = profile?.role || user.user_metadata?.role || "Guest";

  return (
    <main className="container mx-auto px-4 py-12 flex-grow max-w-6xl">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black font-headline text-black uppercase tracking-tighter leading-none mb-2">
            Identity Terminal
          </h1>
          <Badge className="bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-none">
            {role} // STATUS_ACTIVE
          </Badge>
        </div>
        {role === 'merchant' && (
          <Link href="/dashboard/analytics">
            <Button className="h-14 px-8 rounded-none font-black text-[14px] uppercase tracking-widest shadow-xl shadow-primary/20">
              <TrendingUp className="w-5 h-5 mr-3" /> Merchant Control Center
            </Button>
          </Link>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Card className="border-4 border-black shadow-none overflow-hidden rounded-none bg-white">
            <div className="h-32 bg-gray-50 border-b-4 border-black relative">
              <div className="absolute -bottom-10 left-8">
                <Avatar className="w-24 h-24 border-4 border-black rounded-none">
                  <AvatarImage src={user.user_metadata?.avatar_url} className="object-cover" />
                  <AvatarFallback className="bg-black text-white text-3xl font-black rounded-none">
                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardContent className="pt-16 pb-8 px-8 space-y-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-black font-headline text-black uppercase tracking-tighter">
                  {user.user_metadata?.full_name || profile?.name || "Steak West User"}
                </h2>
                <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">{user.email}</p>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-3 rounded-none h-14 border-2 font-black text-[12px] uppercase tracking-widest hover:bg-gray-50">
                  <Settings className="w-4 h-4 text-black" /> Account Config
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 rounded-none h-14 text-primary hover:bg-primary/5 font-black text-[12px] uppercase tracking-widest"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" /> Terminate Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-8 border-2 border-black rounded-none shadow-none bg-white relative overflow-hidden group">
              {role === 'rider' ? <Bike className="w-10 h-10 text-primary mb-6" /> : <Clock className="w-10 h-10 text-primary mb-6" />}
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Node Synchronization</p>
                <p className="font-black text-2xl uppercase tracking-tighter">
                  {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "SECURE_ESTABLISHED"}
                </p>
              </div>
            </Card>

            <Card className="p-8 border-2 border-black rounded-none shadow-none bg-white relative overflow-hidden group">
              {role === 'customer' ? <Package className="w-10 h-10 text-primary mb-6" /> : <ShoppingBag className="w-10 h-10 text-primary mb-6" />}
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Access Priority</p>
                <p className="font-black text-2xl uppercase tracking-tighter">
                  {role === 'merchant' ? 'TIER_01_ADMIN' : role === 'rider' ? 'COURIER_HUB' : 'ELITE_CUSTOMER'}
                </p>
              </div>
            </Card>
          </div>
          
          <Card className="border-4 border-black rounded-none bg-gray-50 p-8">
            <h3 className="text-[14px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> Supabase Security Protocol
            </h3>
            <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed opacity-60">
              Identity verified via Supabase Auth. Hardware-level encryption active for session tokens. All PostgreSQL transactions within the Steak West node are logged, audited, and strictly role-enforced.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
