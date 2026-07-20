"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Store, Bike, Mail, Lock, Loader2, UserPlus, LogIn, Info } from "lucide-react";
import { useAuth, useFirestore } from "@/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'customer' | 'merchant' | 'rider'>('customer');
  const redirectPath = searchParams.get("redirect") || "/";

  const handleDemoLogin = (email: string, name: string) => {
    const mockUser = {
      uid: `demo-${Math.random().toString(36).substr(2, 9)}`,
      email,
      displayName: name || "Demo User",
      photoURL: null,
      emailVerified: true,
    };
    
    localStorage.setItem('abc_demo_user', JSON.stringify(mockUser));
    // Also save role for UI testing
    localStorage.setItem('abc_demo_role', role);
    
    toast({ 
      title: "Demo Mode Active", 
      description: "Firebase not configured. Logged in as guest for testing." 
    });
    
    router.push(redirectPath);
  };

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>, mode: 'login' | 'signup') => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      if (mode === 'signup') {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: name });
        
        const userProfile = {
          uid: userCred.user.uid,
          name,
          email,
          role,
          createdAt: new Date().toISOString(),
        };

        const userDocRef = doc(firestore, "users", userCred.user.uid);
        setDoc(userDocRef, userProfile)
          .catch(async (error) => {
            const permissionError = new FirestorePermissionError({
              path: userDocRef.path,
              operation: 'create',
              requestResourceData: userProfile,
            });
            errorEmitter.emit('permission-error', permissionError);
          });

        toast({ title: "Account created!", description: `Welcome to ABC, ${name}.` });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Welcome back!", description: "Logged in successfully." });
      }
      router.push(redirectPath);
    } catch (error: any) {
      console.warn("Auth failed, checking for testing mode bypass...", error);
      
      // If Firebase is not configured (invalid API key), allow demo login
      if (error.code === 'auth/api-key-not-valid' || error.message?.includes('api-key-not-valid')) {
        handleDemoLogin(email, name);
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Alert className="bg-amber-50 border-amber-200 text-amber-800 rounded-2xl">
            <Info className="h-4 w-4 text-amber-600" />
            <AlertTitle className="font-bold">Testing Mode Enabled</AlertTitle>
            <AlertDescription className="text-xs">
              Firebase configuration is missing. You can log in with any credentials to explore the app.
            </AlertDescription>
          </Alert>

          <Card className="w-full border-2 shadow-2xl rounded-[2.5rem] overflow-hidden bg-background">
            <CardHeader className="bg-primary text-primary-foreground text-center pb-8 pt-10">
              <div className="relative mx-auto w-fit mb-2">
                <CardTitle className="text-4xl font-headline font-bold">ABC</CardTitle>
                <svg 
                  className="absolute -bottom-2 left-0 w-full h-3 text-white" 
                  viewBox="0 0 40 10" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 2C10 8 30 8 38 2" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <CardDescription className="text-primary-foreground/70 font-medium">Secure access to Nairobi's best food</CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <Tabs defaultValue="login" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 rounded-xl h-12">
                  <TabsTrigger value="login" className="rounded-lg font-bold flex items-center gap-2">
                    <LogIn className="w-4 h-4" /> Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-lg font-bold flex items-center gap-2">
                    <UserPlus className="w-4 h-4" /> Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={(e) => handleAuth(e, 'login')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="email" name="email" type="email" placeholder="alex@example.com" className="pl-10 h-12" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-10 h-12" required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20" disabled={loading}>
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Choose Your Account Type</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          type="button"
                          variant={role === 'customer' ? 'default' : 'outline'} 
                          className="flex-col h-20 gap-1 rounded-xl"
                          onClick={() => setRole('customer')}
                        >
                          <User className="w-5 h-5" />
                          <span className="text-[10px]">Customer</span>
                        </Button>
                        <Button 
                          type="button"
                          variant={role === 'merchant' ? 'default' : 'outline'} 
                          className="flex-col h-20 gap-1 rounded-xl"
                          onClick={() => setRole('merchant')}
                        >
                          <Store className="w-5 h-5" />
                          <span className="text-[10px]">Merchant</span>
                        </Button>
                        <Button 
                          type="button"
                          variant={role === 'rider' ? 'default' : 'outline'} 
                          className="flex-col h-20 gap-1 rounded-xl"
                          onClick={() => setRole('rider')}
                        >
                          <Bike className="w-5 h-5" />
                          <span className="text-[10px]">Rider</span>
                        </Button>
                      </div>
                    </div>

                    <form onSubmit={(e) => handleAuth(e, 'signup')} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" placeholder="Alex Johnson" className="h-12" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-signup">Email Address</Label>
                        <Input id="email-signup" name="email" type="email" placeholder="alex@example.com" className="h-12" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-signup">Password</Label>
                        <Input id="password-signup" name="password" type="password" placeholder="••••••••" className="h-12" required />
                      </div>
                      <Button type="submit" className="w-full h-12 rounded-xl font-bold bg-accent hover:bg-accent/90 text-primary-foreground shadow-lg shadow-accent/20" disabled={loading}>
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-muted/50 p-6 flex flex-col gap-4 text-center">
               <p className="text-xs text-muted-foreground leading-relaxed">By continuing, you agree to ABC Terms of Service and Privacy Policy.</p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
