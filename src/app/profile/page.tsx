"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Heart
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/firebase/auth/use-user";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Synchronizing Identity...</p>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <Card className="max-w-md w-full border-none shadow-2xl overflow-hidden rounded-[2.5rem]">
          <div className="bg-primary p-12 text-center text-white">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black mb-2">Member Portal</h2>
            <p className="text-white/70 font-medium text-sm">Sign in to track your premium cuts</p>
          </div>
          <CardContent className="p-10 space-y-4">
            <Button 
              className="w-full h-14 rounded-2xl gap-3 text-base font-bold shadow-lg shadow-primary/20" 
              onClick={() => router.push("/login")}
            >
              <LogIn className="w-5 h-5" /> Sign In Securely
            </Button>
            <Button 
              variant="ghost"
              className="w-full h-12 rounded-2xl text-muted-foreground font-bold hover:bg-gray-100" 
              onClick={() => router.push("/")}
            >
              Back to Marketplace
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const role = profile?.role || user.user_metadata?.role || "Customer";

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
            <div className="relative">
              <Avatar className="w-32 h-32 lg:w-40 lg:h-40 ring-4 ring-white shadow-xl">
                <AvatarImage src={user.user_metadata?.avatar_url} className="object-cover" />
                <AvatarFallback className="bg-black text-white text-4xl font-black">
                  {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-2 right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>
            
            <div className="flex-grow space-y-4">
              <div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-2">
                  <h1 className="text-4xl lg:text-5xl font-black tracking-tighter">
                    {user.user_metadata?.full_name || profile?.name || "Member Name"}
                  </h1>
                  <Badge className="bg-black text-white text-[10px] uppercase font-black px-3 py-1 rounded-full">
                    {role}
                  </Badge>
                </div>
                <p className="text-muted-foreground font-medium flex items-center justify-center lg:justify-start gap-2">
                  <Shield className="w-4 h-4 text-primary" /> Verified Identity Node // {user.email}
                </p>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <Button variant="outline" className="rounded-2xl h-10 px-4 font-bold border-2" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
                <Button variant="outline" className="rounded-2xl h-10 px-4 font-bold border-2">
                  <Settings className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Account Overview Cards */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: "Loyalty Points", value: "2,450", icon: Heart, color: "text-red-500" },
                { label: "Active Orders", value: "03", icon: Package, color: "text-blue-500" },
                { label: "Total Saved", value: "KES 1,200", icon: CreditCard, color: "text-emerald-500" },
              ].map((stat) => (
                <Card key={stat.label} className="border-none shadow-sm rounded-[2rem] p-6 text-center">
                  <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black">{stat.value}</p>
                </Card>
              ))}
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-black flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" /> Recent History
              </h2>
              <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                <div className="divide-y">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold">Order #SW-09{i}82</p>
                          <p className="text-xs text-muted-foreground">May {10+i}, 2024 • Delivered</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <p className="font-black text-sm">KES 2,450</p>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-gray-50 text-center">
                  <Button variant="link" className="text-primary font-black uppercase tracking-widest text-[10px]">View All Transactions</Button>
                </div>
              </Card>
            </section>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] p-8 space-y-6">
              <h3 className="font-black text-lg">Identity Details</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Primary Delivery Node</p>
                    <p className="text-sm font-bold mt-1">Silver Heights, Kileleshwa, Nairobi</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-4 items-start">
                  <CreditCard className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Default Transaction Method</p>
                    <p className="text-sm font-bold mt-1">M-Pesa (07xx *** 450)</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-4 items-start">
                  <Bell className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Notifications</p>
                    <p className="text-sm font-bold mt-1">Enabled for Status Updates</p>
                  </div>
                </div>
              </div>
              <Button className="w-full rounded-2xl h-12 font-black uppercase tracking-widest text-[10px]">Update Identity Settings</Button>
            </Card>

            <Card className="bg-black text-white border-none shadow-2xl rounded-[2.5rem] p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-primary/40 transition-all"></div>
              <h3 className="font-black text-xl mb-2 relative z-10">Steak West Prime</h3>
              <p className="text-white/60 text-sm mb-6 relative z-10 leading-relaxed">Unlock unlimited zero-fee delivery and priority fresh-slots on every order.</p>
              <Button className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-2xl h-12 font-black uppercase tracking-widest text-[10px] relative z-10 transition-all">
                Upgrade Account
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
