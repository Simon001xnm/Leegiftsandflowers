
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      toast({ title: "Account Updated" });
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
            <h2 className="text-base font-bold mb-1">Signed Out</h2>
            <p className="text-[10px] text-muted-foreground mb-6">Sign in to manage your account.</p>
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
          <h1 className="text-[13px] font-bold font-headline uppercase tracking-tight">Account</h1>
          <button className="p-1 hover:bg-gray-50 rounded-full">
            <Settings className="w-4 h-4" />
          </button>
        </header>

        <main className="container mx-auto max-w-md px-4 space-y-4">
          <section className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10 shadow-sm">
                <AvatarFallback className="bg-gray-100 text-gray-400 text-sm font-bold">{initials}</AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-black text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <Camera className="w-2 h-2" />
              </button>
            </div>
            <div className="space-y-0 flex-grow">
              <h2 className="text-[14px] font-bold font-headline leading-none mb-0.5">{profile?.name || "User"}</h2>
              <p className="text-muted-foreground font-medium text-[8px]">{user.email}</p>
              <Button 
                variant="default" 
                className="mt-1 h-5 px-2 rounded-lg font-bold text-[8px] bg-black transition-colors"
                onClick={() => setIsEditing(true)}
              >
                Edit Account
              </Button>
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl p-4 border-2 border-black/5">
             <div className="flex items-center justify-between mb-4">
                <p className="text-[12px] font-black uppercase text-black">{userRole}</p>
             </div>
             <Button 
               className="w-full h-12 bg-black text-white rounded-xl font-black uppercase text-[10px] tracking-widest gap-3 shadow-xl"
               onClick={() => router.push(getDashboardPath())}
             >
                <DashboardIcon className="w-4 h-4" />
                Go to {userRole === 'customer' ? 'My Orders' : 'Dashboard'}
             </Button>
          </section>

          <section className="space-y-0.5 pt-4">
            <ProfileMenuItem icon={Heart} label="Favourites" />
            <ProfileMenuItem icon={History} label="Order History" onClick={() => router.push('/dashboard/customer')} />
            <ProfileMenuItem icon={LogOut} label="Log out" onClick={handleSignOut} isDestructive />
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
        <h1 className="text-[13px] font-bold font-headline">Edit Account</h1>
        <button type="submit" form="edit-profile-form" className="p-1 text-emerald-500 hover:bg-emerald-50 rounded-full">
          <Check className="w-4 h-4" />
        </button>
      </header>

      <main className="container mx-auto max-w-md px-4 pb-12">
        <form id="edit-profile-form" onSubmit={handleUpdateProfile} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-[8px] font-bold ml-1 uppercase tracking-widest text-muted-foreground">Name</Label>
            <input 
              name="name" 
              defaultValue={profile?.name || ""} 
              className="w-full h-10 rounded-xl bg-gray-50 border-none px-4 font-bold text-[11px] outline-none"
              placeholder="Full Name"
            />
          </div>
          <Button type="submit" className="w-full h-11 rounded-xl font-black uppercase text-[10px] mt-4 shadow-lg bg-black" disabled={saving}>
            {saving ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </main>
    </div>
  );
}

function ProfileMenuItem({ icon: Icon, label, onClick, isDestructive = false }: { icon: any, label: string, onClick?: () => void, isDestructive?: boolean }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-2 hover:bg-gray-50 transition-colors group rounded-xl">
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
