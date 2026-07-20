"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon, Mail, Settings, LogOut, Shield, Calendar, Clock, LogIn } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser, useAuth, useDoc } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { useMemoFirebase } from "@/firebase/use-memo-firebase";

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

  const { data: profile, loading: profileLoading } = useDoc(userRef);

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
      <div className="animate-spin text-primary"><Clock className="w-10 h-10" /></div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 text-center rounded-[2.5rem] border-2 shadow-xl">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="w-10 h-10 text-muted-foreground opacity-20" />
            </div>
            <h2 className="text-2xl font-bold font-headline mb-2 text-primary">Private Access</h2>
            <p className="text-muted-foreground mb-8">Please sign in to view your profile and manage orders.</p>
            <Button className="w-full h-14 rounded-2xl gap-2 text-lg shadow-lg shadow-primary/20" onClick={() => router.push("/login")}>
              <LogIn className="w-5 h-5" /> Go to Login
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  const role = profile?.role || demoRole || "Guest";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-2xl overflow-hidden rounded-[2.5rem] bg-card">
              <div className="h-32 bg-primary relative">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <Avatar className="w-24 h-24 border-4 border-background shadow-2xl">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="bg-accent text-primary text-2xl font-bold">
                      {user.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <CardContent className="pt-16 pb-8 text-center px-8">
                <h2 className="text-2xl font-bold font-headline text-primary mb-1">
                  {user.displayName || "ABC User"}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">{user.email}</p>
                
                <Badge variant="secondary" className="mb-8 bg-primary/10 text-primary border-none px-6 py-2 flex items-center gap-2 w-fit mx-auto capitalize rounded-full font-bold">
                  <Shield className="w-4 h-4" /> {role}
                </Badge>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-3 rounded-xl h-12 border-primary/10 hover:bg-primary/5">
                    <Settings className="w-4 h-4 text-primary" /> Account Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 rounded-xl h-12 text-destructive hover:bg-destructive/5 hover:text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-4xl font-bold font-headline text-primary">Member Overview</h1>
              {user.uid.startsWith('demo-') && (
                <Badge className="bg-amber-100 text-amber-700 border-none px-4 py-1">Demo Account</Badge>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-8 border-2 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
                <Clock className="w-10 h-10 text-primary mb-4" />
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Member Since</p>
                <p className="font-bold text-xl">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Active Now"}
                </p>
              </Card>
              <Card className="p-8 border-2 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
                <Calendar className="w-10 h-10 text-accent mb-4" />
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Loyalty Status</p>
                <p className="font-bold text-xl">Silver Tier</p>
              </Card>
            </div>

            <Card className="border-2 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="font-bold text-2xl mb-6 text-primary">Account Information</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-2 border-b border-dashed">
                  <span className="text-muted-foreground font-medium">Full Name</span>
                  <span className="font-bold text-primary">{user.displayName || "Guest User"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed">
                  <span className="text-muted-foreground font-medium">Email Status</span>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold px-3 py-1 rounded-full border-primary/20 text-primary">
                    {user.emailVerified || user.uid.startsWith('demo-') ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed">
                  <span className="text-muted-foreground font-medium">Active Role</span>
                  <span className="font-bold capitalize text-primary">{role}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
