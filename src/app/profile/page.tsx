"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User as UserIcon, 
  LogOut, 
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/firebase/auth/use-user";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
    localStorage.removeItem('steak_west_demo_user');
    await supabase.auth.signOut();
    toast({ title: "Signed out", description: "Your session has ended." });
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
      toast({ variant: "destructive", title: "Update failed", description: error.message });
    } else {
      setProfile({ ...profile, name });
      setIsEditing(false);
      toast({ title: "Account updated" });
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
        <Card className="max-w-[320px] w-full border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
          <CardContent className="p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
              <UserIcon className="w-8 h-8 text-gray-200" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-medium tracking-tight">Signed out</h2>
              <p className="text-[13px] text-muted-foreground font-medium">Sign in to manage your account and track your orders.</p>
            </div>
            <Button className="w-full h-14 rounded-2xl font-bold text-[14px] shadow-xl shadow-primary/10" onClick={() => router.push("/login")}>
              Go to login
            </Button>
          </CardContent>
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
      <div className="min-h-screen bg-white pb-20 pt-20">
        <header className="container mx-auto max-w-lg px-6 py-8 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[14px] font-bold uppercase tracking-widest text-muted-foreground">My account</h1>
          <button className="p-2 hover:bg-gray-50 rounded-full">
            <Settings className="w-5 h-5" />
          </button>
        </header>

        <main className="container mx-auto max-w-lg px-6 space-y-8">
          <section className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-100 rounded-[2rem] flex items-center justify-center text-2xl font-bold text-gray-400">
                {initials}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-1 flex-grow">
              <h2 className="text-2xl font-medium tracking-tight leading-none">{profile?.name || "User"}</h2>
              <p className="text-muted-foreground font-medium text-[13px]">{user.email}</p>
              <button 
                className="text-primary font-bold text-[12px] hover:underline pt-1"
                onClick={() => setIsEditing(true)}
              >
                Edit account
              </button>
            </div>
          </section>

          <section className="bg-gray-50 rounded-[2.5rem] p-8 border">
             <div className="flex items-center justify-between mb-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Authorized role</p>
                <span className="bg-white px-3 py-1 rounded-full border text-[11px] font-bold">{userRole}</span>
             </div>
             <Button 
               className="w-full h-16 bg-black text-white rounded-2xl font-bold text-[14px] gap-3 shadow-2xl"
               onClick={() => router.push(getDashboardPath())}
             >
                <DashboardIcon className="w-5 h-5" />
                Go to {userRole === 'customer' ? 'My orders' : 'Dashboard'}
             </Button>
          </section>

          <section className="space-y-2 pt-4">
            <ProfileMenuItem icon={Heart} label="Favourites" />
            <ProfileMenuItem icon={History} label="Order history" onClick={() => router.push('/dashboard/customer')} />
            <ProfileMenuItem icon={LogOut} label="Log out" onClick={handleSignOut} isDestructive />
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <header className="container mx-auto max-w-lg px-6 py-8 flex items-center justify-between">
        <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-medium">Edit account</h1>
        <button type="submit" form="edit-profile-form" className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-full">
          <Check className="w-5 h-5" />
        </button>
      </header>

      <main className="container mx-auto max-w-lg px-6 pb-12">
        <form id="edit-profile-form" onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[11px] font-bold ml-1 uppercase tracking-widest text-muted-foreground">Full name</Label>
            <input 
              name="name" 
              defaultValue={profile?.name || ""} 
              className="w-full h-14 rounded-2xl bg-gray-50 border-none px-6 font-medium text-base outline-none focus:ring-2 focus:ring-black/5"
              placeholder="Full name"
            />
          </div>
          <Button type="submit" className="w-full h-16 rounded-2xl font-bold text-base mt-4 shadow-xl bg-black" disabled={saving}>
            {saving ? "Updating..." : "Save changes"}
          </Button>
        </form>
      </main>
    </div>
  );
}

function ProfileMenuItem({ icon: Icon, label, onClick, isDestructive = false }: { icon: any, label: string, onClick?: () => void, isDestructive?: boolean }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group rounded-2xl">
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${isDestructive ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-[15px] font-medium ${isDestructive ? 'text-red-600' : 'text-gray-700'}`}>{label}</span>
      </div>
      <ChevronRight className={`w-4 h-4 ${isDestructive ? 'text-red-200' : 'text-gray-300'} group-hover:translate-x-1 transition-transform`} />
    </button>
  );
}
