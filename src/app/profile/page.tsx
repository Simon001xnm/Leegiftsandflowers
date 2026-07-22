"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User as UserIcon, LogOut, Shield, Clock, LogIn, Settings, ShoppingBag, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser, useAuth, useDoc } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { useMemoFirebase } from "@/firebase/use-memo-firebase";

/**
 * High-density Merchant Hub and Profile page.
 * Handles both authenticated and guest (logged-out) states.
 */
export default function ProfilePage() {
  const { user, loading: authLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const [demoRole, setDemoRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDemoRole(localStorage.getItem('abc_demo_role'));
    }
  }, []);

  const userRef = useMemoFirebase(() => {
    if (!db || !user?.uid || user.uid.startsWith('demo-')) return null;
    return doc(db, "users", user.uid);
  }, [db, user?.uid]);

  const { data: profile } = useDoc(userRef);

  const handleSignOut = async () => {
    if (user?.uid?.startsWith('demo-')) {
      localStorage.removeItem('abc_demo_user');
      localStorage.removeItem('abc_demo_role');
      window.location.href = '/';
    } else {
      await signOut(auth);
      router.push("/");
    }
  };

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-primary font-black uppercase tracking-widest">Loading Member Data...</div>
    </div>
  );

  // Professional Guest View
  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full p-10 text-center rounded-none border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="w-20 h-20 bg-gray-50 border-2 border-dashed flex items-center justify-center mx-auto mb-8">
            <UserIcon className="w-10 h-10 text-gray-200" />
          </div>
          <h2 className="text-3xl font-black font-headline mb-4 text-black uppercase tracking-tighter">Private Portal</h2>
          <p className="text-muted-foreground mb-10 text-[14px] font-bold uppercase tracking-widest leading-relaxed">
            Please sign in to access your membership dashboard, track orders, and manage your premium cuts.
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
            <ShieldCheck className="w-4 h-4" /> 100% Encrypted Connection
          </div>
        </Card>
      </div>
    );
  }

  const role = profile?.role || demoRole || "Guest";

  return (
    <main className="container mx-auto px-4 py-12 flex-grow max-w-6xl">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl md:text-5xl font-black font-headline text-black uppercase tracking-tighter leading-none">
          Merchant Hub
        </h1>
        <Badge className="bg-primary text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-none">
          {role} Account
        </Badge>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Card className="border-4 border-black shadow-none overflow-hidden rounded-none bg-white">
            <div className="h-32 bg-gray-50 border-b relative">
              <div className="absolute -bottom-10 left-8">
                <Avatar className="w-24 h-24 border-4 border-black rounded-none">
                  <AvatarImage src={user.photoURL || undefined} className="object-cover" />
                  <AvatarFallback className="bg-black text-white text-3xl font-black rounded-none">
                    {user.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardContent className="pt-16 pb-8 px-8 space-y-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-black font-headline text-black uppercase tracking-tighter">
                  {user.displayName || "Steak West User"}
                </h2>
                <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">{user.email}</p>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-3 rounded-none h-14 border-2 font-black text-[12px] uppercase tracking-widest hover:bg-gray-50">
                  <Settings className="w-4 h-4 text-black" /> Account Settings
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
              <Clock className="w-10 h-10 text-primary mb-6 transition-transform group-hover:scale-110" />
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Member Since</p>
                <p className="font-black text-2xl uppercase tracking-tighter">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "ACTIVE_NOW"}
                </p>
              </div>
            </Card>

            <Card className="p-8 border-2 border-black rounded-none shadow-none bg-white relative overflow-hidden group">
              <ShoppingBag className="w-10 h-10 text-primary mb-6 transition-transform group-hover:scale-110" />
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Loyalty Status</p>
                <p className="font-black text-2xl uppercase tracking-tighter">
                  PLATINUM_CUT
                </p>
              </div>
            </Card>
          </div>
          
          <Card className="border-2 border-black rounded-none bg-gray-50 p-8">
            <h3 className="text-[14px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> System Security
            </h3>
            <p className="text-[12px] font-medium text-muted-foreground leading-relaxed">
              Your account is protected by hardware-level encryption and biometric authentication. All transactions are logged for your safety.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
