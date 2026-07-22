"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User as UserIcon, 
  LogOut, 
  Shield, 
  Clock, 
  LogIn, 
  Settings, 
  ShoppingBag, 
  Package, 
  CreditCard, 
  ChevronRight,
  MapPin,
  Bell,
  Heart,
  ExternalLink
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/firebase/auth/use-user";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

/**
 * Professional Redesigned Profile Page - Wired to Supabase.
 */
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="font-black text-black uppercase tracking-[0.3em] text-[10px]">Synchronizing Node...</p>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <Card className="max-w-md w-full border-none shadow-2xl overflow-hidden rounded-[3rem] bg-white">
          <div className="bg-black p-12 text-center text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Member Node</h2>
            <p className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Secure Authentication Required</p>
          </div>
          <CardContent className="p-10 space-y-4">
            <Button 
              className="w-full h-16 rounded-none gap-3 text-[14px] font-black uppercase tracking-widest shadow-xl shadow-primary/20" 
              onClick={() => router.push("/login")}
            >
              <LogIn className="w-5 h-5" /> Authorize Entry
            </Button>
            <Button 
              variant="ghost"
              className="w-full h-14 rounded-none text-muted-foreground font-black uppercase tracking-widest text-[12px] hover:bg-gray-50" 
              onClick={() => router.push("/")}
            >
              Abort to Marketplace
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const role = profile?.role || user.user_metadata?.role || "Customer";

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 text-center lg:text-left">
            <div className="relative group">
              <Avatar className="w-32 h-32 lg:w-44 lg:h-44 ring-8 ring-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <AvatarImage src={user.user_metadata?.avatar_url} className="object-cover" />
                <AvatarFallback className="bg-black text-white text-4xl font-black">
                  {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-4 right-4 bg-emerald-500 w-8 h-8 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
            </div>
            
            <div className="flex-grow space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-3">
                  <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
                    {user.user_metadata?.full_name || profile?.name || "Premium Member"}
                  </h1>
                  <Badge className="bg-primary text-white text-[11px] uppercase font-black px-4 py-1.5 rounded-none shadow-lg shadow-primary/20">
                    {role}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[12px] flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-500" /> SECURE_ENTITY // {user.email}
                  </p>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[12px] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> NODE_NAIROBI
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Button variant="outline" className="rounded-none h-12 px-6 font-black uppercase tracking-widest text-[11px] border-2 hover:bg-black hover:text-white transition-all" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
                <Button variant="outline" className="rounded-none h-12 px-6 font-black uppercase tracking-widest text-[11px] border-2 hover:bg-gray-100 transition-all">
                  <Settings className="w-4 h-4 mr-2" /> Node Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: "Loyalty Points", value: "2,450", icon: Heart, color: "text-primary" },
                { label: "Live Orders", value: "03", icon: Package, color: "text-black" },
                { label: "Global Spend", value: "KES 14,200", icon: CreditCard, color: "text-emerald-500" },
              ].map((stat) => (
                <Card key={stat.label} className="border-2 border-black/5 shadow-none rounded-none p-8 group hover:bg-black hover:text-white transition-all cursor-default">
                  <div className={`w-12 h-12 bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-white/10 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground group-hover:text-white/40 tracking-[0.2em] mb-1">{stat.label}</p>
                  <p className="text-3xl font-black tracking-tighter leading-none">{stat.value}</p>
                </Card>
              ))}
            </div>

            <section className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-black pb-4">
                <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <Clock className="w-7 h-7 text-primary" /> Transaction Log
                </h2>
                <Badge variant="outline" className="rounded-none border-black/20 font-black uppercase text-[10px]">Archive v2.0</Badge>
              </div>
              <div className="border border-black/5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors border-b last:border-0 cursor-pointer group">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-gray-100 flex items-center justify-center text-black group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-black uppercase tracking-tighter text-[15px]">Order #SW-09{i}82</p>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">May {10+i}, 2024</p>
                          <span className="text-gray-300">•</span>
                          <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">Success</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <p className="font-black text-[16px]">KES 2,450</p>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center pt-4">
                <Button variant="link" className="text-black font-black uppercase tracking-widest text-[12px] hover:text-primary">
                  Decrypt Full Transaction History <ExternalLink className="ml-2 w-3 h-3" />
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="border-4 border-black shadow-none rounded-none p-10 space-y-8">
              <h3 className="font-black text-xl uppercase tracking-tighter border-b border-black/10 pb-4">Entity Details</h3>
              <div className="space-y-8">
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Primary Node</p>
                    <p className="text-[14px] font-black uppercase tracking-tighter">Silver Heights, Kileleshwa</p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Payment Method</p>
                    <p className="text-[14px] font-black uppercase tracking-tighter">M-Pesa (07xx *** 450)</p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Sync Status</p>
                    <p className="text-[14px] font-black uppercase tracking-tighter">Real-time Enabled</p>
                  </div>
                </div>
              </div>
              <Button className="w-full h-14 rounded-none font-black uppercase tracking-widest text-[12px] bg-black text-white hover:bg-primary transition-all shadow-xl">
                Update Identity Metadata
              </Button>
            </Card>

            <Card className="bg-primary text-white border-none shadow-2xl rounded-none p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-1000"></div>
              <h3 className="font-black text-2xl uppercase tracking-tighter mb-4 relative z-10">Steak West Prime</h3>
              <p className="text-white/80 text-[13px] font-bold uppercase tracking-wide mb-8 relative z-10 leading-relaxed">
                Unlock zero-fee delivery and priority fresh-slots on every order in the Nairobi network.
              </p>
              <Button className="w-full bg-white text-black hover:bg-black hover:text-white rounded-none h-14 font-black uppercase tracking-widest text-[12px] relative z-10 transition-all shadow-xl">
                Upgrade My Entity
              </Button>
            </Card>
            
            <div className="flex items-center justify-center gap-4 text-gray-300 font-black text-[9px] uppercase tracking-[0.4em]">
              <Shield className="w-3 h-3" /> Supabase Protected Profile
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
