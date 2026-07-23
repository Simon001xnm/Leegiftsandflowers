'use client';

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  User,
  Store,
  Bike,
  Mail,
  Lock,
  Loader2,
  UserPlus,
  LogIn,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
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

  const redirectPath =
    searchParams.get("redirect") || "/profile";

  const handleAuth = async (
    e: React.FormEvent<HTMLFormElement>,
    mode: "login" | "signup"
  ) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      if (mode === "signup") {
        const { data, error } =
          await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name,
                role,
              },
            },
          });

        if (error) throw error;

        if (data.user) {
          await supabase.from("profiles").upsert([
            {
              id: data.user.id,
              name,
              email,
              role,
              created_at: new Date().toISOString(),
            },
          ]);
        }

        toast({
          title: "Account Registered",
          description:
            "Identity verified. Redirecting to your dashboard.",
        });
      } else {
        const { error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) throw error;

        toast({
          title: "Authorized",
          description:
            "Identity synchronization successful.",
        });
      }

      router.push(redirectPath);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authorization Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center overflow-hidden p-3 border">
            <Image
              src="/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png"
              alt="Logo"
              fill
              className="object-contain p-3"
            />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tighter">
              Steak West Central
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Access your global meat distribution network
            </p>
          </div>
        </div>

        <Card className="w-full border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
          <CardContent className="p-8 lg:p-12">
            <Tabs
              defaultValue="login"
              className="space-y-8"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-gray-100 p-1.5 h-14">
                <TabsTrigger
                  value="login"
                  className="rounded-xl font-bold uppercase text-xs transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </TabsTrigger>

                <TabsTrigger
                  value="signup"
                  className="rounded-xl font-bold uppercase text-xs transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="login"
                className="space-y-6"
              >
                <form
                  onSubmit={(e) =>
                    handleAuth(e, "login")
                  }
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="font-black uppercase text-[10px] tracking-widest px-1"
                    >
                      Email Address
                    </Label>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="alex@steakwest.com"
                        className="pl-12 h-14 rounded-2xl bg-gray-50 border-none font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="font-black uppercase text-[10px] tracking-widest px-1"
                    >
                      Access Key
                    </Label>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-12 h-14 rounded-2xl bg-gray-50 border-none font-bold"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Authorize Entry"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent
                value="signup"
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest px-1 text-center block">
                      Identify Your Entity Role
                    </Label>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          id: "customer",
                          label: "Customer",
                          icon: User,
                        },
                        {
                          id: "merchant",
                          label: "Merchant",
                          icon: Store,
                        },
                        {
                          id: "rider",
                          label: "Courier",
                          icon: Bike,
                        },
                      ].map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2",
                            role === r.id
                              ? "border-primary bg-primary/5 text-primary scale-105"
                              : "border-gray-100 hover:border-gray-200"
                          )}
                          onClick={() =>
                            setRole(r.id as AppRole)
                          }
                        >
                          <r.icon className="w-5 h-5" />
                          <span className="text-[9px] font-black uppercase">
                            {r.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <form
                    onSubmit={(e) =>
                      handleAuth(e, "signup")
                    }
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="font-black uppercase text-[10px] tracking-widest px-1"
                      >
                        Full Identity
                      </Label>

                      <Input
                        id="name"
                        name="name"
                        placeholder="Alex Johnson"
                        className="h-14 rounded-2xl bg-gray-50 border-none font-bold"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email-signup"
                        className="font-black uppercase text-[10px] tracking-widest px-1"
                      >
                        Email Address
                      </Label>

                      <Input
                        id="email-signup"
                        name="email"
                        type="email"
                        placeholder="alex@steakwest.com"
                        className="h-14 rounded-2xl bg-gray-50 border-none font-bold"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="password-signup"
                        className="font-black uppercase text-[10px] tracking-widest px-1"
                      >
                        Create Access Key
                      </Label>

                      <Input
                        id="password-signup"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="h-14 rounded-2xl bg-gray-50 border-none font-bold"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-14 rounded-2xl font-black uppercase tracking-widest bg-black text-white hover:bg-primary transition-all shadow-xl"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        "Register Entity"
                      )}
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="bg-gray-50/50 p-6 flex flex-col gap-4 border-t">
            <div className="flex items-center justify-center gap-2 text-muted-foreground font-bold text-[10px] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              256-Bit SSL Identity Protection Active
            </div>
          </CardFooter>
        </Card>

        <div className="text-center">
          <Link
            href="/"
            className="text-muted-foreground font-bold text-xs hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            Abort and Return to Marketplace
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
