
"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Settings, LogOut, Shield, Calendar, Clock } from "lucide-react";
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

  const userRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, "users", user.uid);
  }, [db, user?.uid]);

  const { data: profile, loading: profileLoading } = useDoc(userRef);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full p-8 text-center rounded-[2rem] border-2">
            <User className="w-16 h-16 mx-auto mb-6 text-muted-foreground opacity-20" />
            <h2 className="text-2xl font-bold font-headline mb-2">Private Access</h2>
            <p className="text-muted-foreground mb-8">Please sign in to view your profile and manage orders.</p>
            <Button className="w-full h-12 rounded-xl" onClick={() => router.push("/login")}>
              Go to Login
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-xl overflow-hidden rounded-[2.5rem]">
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
              <CardContent className="pt-16 pb-8 text-center">
                <h2 className="text-xl font-bold font-headline text-primary mb-1">
                  {user.displayName || "Eats User"}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">{user.email}</p>
                
                {profile && (
                  <Badge variant="secondary" className="mb-8 bg-primary/10 text-primary border-none px-4 py-1 flex items-center gap-2 w-fit mx-auto capitalize">
                    <Shield className="w-3 h-3" /> {profile.role}
                  </Badge>
                )}

                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-11">
                    <Settings className="w-4 h-4" /> Account Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 rounded-xl h-11 text-destructive hover:bg-destructive/5 hover:text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Info */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold font-headline text-primary">Member Overview</h1>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 border-2 rounded-[2rem]">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <p className="text-xs font-bold text-muted-foreground uppercase">Member Since</p>
                <p className="font-bold text-lg">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "New Joiner"}
                </p>
              </Card>
              <Card className="p-6 border-2 rounded-[2rem]">
                <Calendar className="w-8 h-8 text-accent mb-2" />
                <p className="text-xs font-bold text-muted-foreground uppercase">Loyalty Status</p>
                <p className="font-bold text-lg">Silver Tier</p>
              </Card>
            </div>

            <Card className="border-2 rounded-[2.5rem] p-8">
              <h3 className="font-bold text-xl mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground text-sm">Full Name</span>
                  <span className="font-bold">{user.displayName}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground text-sm">Email Status</span>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold">
                    {user.emailVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground text-sm">Preferred Role</span>
                  <span className="font-bold capitalize">{profile?.role || "N/A"}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
