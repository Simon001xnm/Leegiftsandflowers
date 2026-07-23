"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User as UserIcon, 
  LogOut, 
  Shield, 
  Settings, 
  ChevronRight,
  Heart,
  History,
  Camera,
  ArrowLeft,
  Check,
  LayoutDashboard,
  Store,
  Bike
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/firebase/auth/use-user";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

/**
 * HIGH-DENSITY PROFILE WITH ROLE-BASED DASHBOARD ENTRY
 * Owners and Riders see their professional terminals here.
 */
export default function ProfilePage() {
  const { user, loading: authLoading } = useUser();
  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      name,
      updated_at: new Date().toISOString()
    });

    if (error) {
      toast({ variant: "destructive", title: "Update Failed", description: error.message });
    } else {
      setProfile({ ...profile, name });
      setIsEditing(false);
      toast({ title: "Identity Updated" });
    }
    setSaving(false);
  };

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Card className="max-w-[280px] w-full border-none shadow-xl rounded-[2rem] bg-white overflow-hidden">
          <div className="p-6 text-center">
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserIcon className="w-5 h-5 text-gray-300" />
            </div>
            <h2 className="text-base font-bold mb-1">Session Required</h2>
            <p className="text-[10px] text-muted-foreground mb-6">Authorize to access your profile.</p>
            <Button className="w-full h-9 rounded-xl font-bold text-[11px]" onClick={() => router.push("/login")}>
              Sign In
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const userRole = profile?.role || user.user_metadata?.role || "customer";
  const initials = (profile?.name || user.email || "U").charAt(0).toUpperCase();

  const getDashboardPath = () => {
    if (userRole === 'merchant') return '/dashboard';
    if (userRole === 'rider') return '/dashboard/rider';
    return '/dashboard/customer';
  };

  const getDashboardIcon = () => {
    if (userRole === 'merchant') return Store;
    if (userRole === 'rider') return Bike;
    return LayoutDashboard;
  };

  const DashboardIcon = getDashboardIcon();

  if (!isEditing) {
    return (
      <div className="min-h-screen bg-white pb-6">
        <header className="container mx-auto max-w-md px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-1 hover:bg-gray-50 rounded-full transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-[13px] font-bold font-headline uppercase tracking-tight">Identity Hub</h1>
          <button className="p-1 hover:bg-gray-50 rounded-full">
            <Settings className="w-4 h-4" />
          </button>
        </header>

        <main className="container mx-auto max-w-md px-4 space-y-4">
          <section className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10 shadow-sm">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-gray-100 text-gray-400 text-sm font-bold">{initials}</AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-black text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <Camera className="w-2 h-2" />
              </button>
            </div>
            <div className="space-y-0 flex-grow">
              <h2 className="text-[14px] font-bold font-headline leading-none mb-0.5">{profile?.name || "Premium User"}</h2>
              <p className="text-muted-foreground font-medium text-[8px]">@{user.email?.split('@')[0]}</p>
              <Button 
                variant="default" 
                className="mt-1 h-5 px-2 rounded-lg font-bold text-[8px] bg-black hover:bg-primary transition-colors"
                onClick={() => setIsEditing(true)}
              >
                Edit Identity
              </Button>
            </div>
          </section>

          {/* DYNAMIC DASHBOARD GATE */}
          <section className="bg-gray-50 rounded-2xl p-4 border-2 border-black/5">
             <div className="flex items-center justify-between mb-4">
                <div>
                   <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Entity Role</p>
                   <p className="text-[12px] font-black uppercase text-black">{userRole}</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 rounded-none border-none text-[8px] font-black">AUTHORIZED</Badge>
             </div>
             <Button 
               className="w-full h-12 bg-black text-white rounded-xl font-black uppercase text-[10px] tracking-widest gap-3 shadow-xl shadow-black/10"
               onClick={() => router.push(getDashboardPath())}
             >
                <DashboardIcon className="w-4 h-4" />
                Open {userRole === 'customer' ? 'Order Hub' : 'Professional Terminal'}
             </Button>
          </section>

          <section className="space-y-0.5 pt-4">
            <ProfileMenuItem icon={Heart} label="Favourites" />
            <ProfileMenuItem icon={History} label="My Orders" onClick={() => router.push('/dashboard/customer')} />
            <ProfileMenuItem icon={LogOut} label="Log out" onClick={handleSignOut} isDestructive />
          </section>

          <section className="pt-8 border-t">
            <div className="bg-black p-4 rounded-xl space-y-2">
               <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-emerald-500" />
                  <span className="text-[7px] font-black text-white uppercase tracking-widest">Secure Node V4.0</span>
               </div>
               <p className="text-[7px] text-gray-400 font-medium">Your identity is secured via Supabase PostgreSQL Auth. Hardware-level encryption active.</p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto max-w-md px-4 py-3 flex items-center justify-between">
        <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-[13px] font-bold font-headline">Edit Identity</h1>
        <button type="submit" form="edit-profile-form" className="p-1 text-emerald-500 hover:bg-emerald-50 rounded-full">
          <Check className="w-4 h-4" />
        </button>
      </header>

      <main className="container mx-auto max-w-md px-4 pb-12">
        <form id="edit-profile-form" onSubmit={handleUpdateProfile} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-[8px] font-bold ml-1 uppercase tracking-widest text-muted-foreground">Full Name</Label>
            <input 
              name="name" 
              defaultValue={profile?.name || ""} 
              className="w-full h-10 rounded-xl bg-gray-50 border-none px-4 font-bold text-[11px] outline-none focus:ring-2 focus:ring-black/5"
              placeholder="Full Identity"
            />
          </div>
          <Button type="submit" className="w-full h-11 rounded-xl font-black uppercase text-[10px] mt-4 shadow-lg bg-black" disabled={saving}>
            {saving ? "Syncing..." : "Apply Changes"}
          </Button>
        </form>
      </main>
    </div>
  );
}

function ProfileMenuItem({ 
  icon: Icon, 
  label, 
  onClick, 
  isDestructive = false 
}: { 
  icon: any, 
  label: string, 
  onClick?: () => void,
  isDestructive?: boolean
}) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-2 hover:bg-gray-50 transition-colors group rounded-xl"
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isDestructive ? 'bg-red-50 text-primary' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary'}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className={`text-[12px] font-bold ${isDestructive ? 'text-primary' : 'text-gray-700'}`}>{label}</span>
      </div>
      <ChevronRight className={`w-4 h-4 ${isDestructive ? 'text-red-200' : 'text-gray-300'} group-hover:translate-x-1 transition-transform`} />
    </button>
  );
}
