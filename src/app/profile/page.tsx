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
  Download,
  Globe,
  MapPin,
  CreditCard,
  Trash2,
  History,
  Camera,
  ArrowLeft,
  Check,
  Eye,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/firebase/auth/use-user";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

/**
 * High-density compact Profile Page.
 * Proportionally reduced typography for optimal mobile viewing.
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
      toast({ title: "Success", description: "Identity metadata synchronized." });
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
            <h2 className="text-base font-bold mb-1">Member Node</h2>
            <p className="text-[10px] text-muted-foreground mb-6">Access restricted. Please authorize session.</p>
            <Button className="w-full h-9 rounded-xl font-bold text-[11px]" onClick={() => router.push("/login")}>
              Authorize Entry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const userRole = profile?.role || user.user_metadata?.role || "Customer";
  const initials = (profile?.name || user.email || "U").charAt(0).toUpperCase();

  // VIEW MODE
  if (!isEditing) {
    return (
      <div className="min-h-screen bg-white pb-6">
        <header className="container mx-auto max-w-md px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-1 hover:bg-gray-50 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-sm font-bold font-headline uppercase tracking-tight">My Profile</h1>
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
              <h2 className="text-[15px] font-bold font-headline leading-none mb-0.5">{profile?.name || "Steak West User"}</h2>
              <p className="text-muted-foreground font-medium text-[9px]">@{user.email?.split('@')[0]}</p>
              <Button 
                variant="default" 
                className="mt-1 h-6 px-2.5 rounded-lg font-bold text-[9px] bg-primary hover:bg-primary/90"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          </section>

          <section className="space-y-0.5">
            <ProfileMenuItem icon={Heart} label="Favourites" />
            <ProfileMenuItem icon={Download} label="Downloads" />
            <ProfileMenuItem icon={Globe} label="Language" />
            <ProfileMenuItem icon={MapPin} label="Location" />
            <ProfileMenuItem icon={CreditCard} label="Subscription" />
            <ProfileMenuItem icon={Trash2} label="Clear cache" />
            <ProfileMenuItem icon={History} label="Clear history" />
            <ProfileMenuItem icon={LogOut} label="Log out" onClick={handleSignOut} isDestructive />
          </section>

          <section className="pt-3 border-t space-y-2">
            <div className="flex items-center justify-between text-[7px] font-black uppercase tracking-[0.2em] text-gray-400">
               <span>Identity Terminal</span>
               <span className="text-emerald-500">Guest // STATUS_ACTIVE</span>
            </div>
            
            <div className="bg-gray-50 p-2.5 rounded-xl space-y-2 border">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <p className="text-[6px] font-black text-gray-400 uppercase tracking-widest">Node Sync</p>
                  <p className="text-[8px] font-bold text-emerald-600">SECURE_ESTABLISHED</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[6px] font-black text-gray-400 uppercase tracking-widest">Access Priority</p>
                  <p className="text-[8px] font-bold text-primary">ELITE_{userRole.toUpperCase()}</p>
                </div>
              </div>
              <div className="pt-1.5 border-t border-dashed">
                <p className="text-[7px] font-bold flex items-center gap-1 mb-0.5">
                   <Shield className="w-2 h-2 text-emerald-500" /> Supabase Security Protocol
                </p>
                <p className="text-[7px] text-muted-foreground leading-tight">
                  Identity verified via Supabase. Hardware-level encryption active. PostgreSQL transactions are strictly role-enforced.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // EDIT MODE
  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto max-w-md px-4 py-3 flex items-center justify-between">
        <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-gray-50 rounded-full">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-sm font-bold font-headline">Edit Profile</h1>
        <button type="submit" form="edit-profile-form" className="p-1 text-emerald-500 hover:bg-emerald-50 rounded-full">
          <Check className="w-4 h-4" />
        </button>
      </header>

      <main className="container mx-auto max-w-md px-4 pb-12">
        <div className="flex flex-col items-center mb-4 mt-2">
          <div className="relative">
            <Avatar className="w-16 h-16 shadow-lg">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-gray-100 text-gray-400 text-base font-bold">{initials}</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center border-2 border-white">
              <Camera className="w-3 h-3" />
            </button>
          </div>
        </div>

        <form id="edit-profile-form" onSubmit={handleUpdateProfile} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-[9px] font-bold ml-1 uppercase tracking-widest text-muted-foreground">Full Identity</Label>
            <Input 
              name="name" 
              defaultValue={profile?.name || ""} 
              className="h-9 rounded-xl bg-gray-50 border-none px-4 font-bold text-[11px]"
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-[9px] font-bold ml-1 uppercase tracking-widest text-muted-foreground">E-Mail Address</Label>
            <div className="relative">
              <Input 
                value={user.email || ""} 
                disabled 
                className="h-9 rounded-xl bg-gray-50 border-none px-4 font-bold text-[11px] opacity-60 cursor-not-allowed"
              />
              <Badge variant="outline" className="absolute right-2 top-1/2 -translate-y-1/2 border-emerald-200 text-emerald-600 bg-emerald-50 text-[6px] rounded-full px-1.5 h-3.5">VERIFIED</Badge>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-[9px] font-bold ml-1 uppercase tracking-widest text-muted-foreground">Terminal Password</Label>
            <div className="relative">
              <Input 
                type="password" 
                value="••••••••••••" 
                disabled 
                className="h-9 rounded-xl bg-gray-50 border-none px-4 font-bold text-[11px] opacity-60"
              />
              <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-[9px] font-bold ml-1 uppercase tracking-widest text-muted-foreground">Secure Phone</Label>
            <div className="flex gap-2">
              <div className="w-14 h-9 bg-gray-50 rounded-xl flex items-center justify-center gap-1 px-2">
                 <img src="https://flagcdn.com/w20/ke.png" width="12" alt="Kenya" />
                 <span className="text-[9px] font-bold">+254</span>
              </div>
              <Input 
                placeholder="700 000 000" 
                className="h-9 rounded-xl bg-gray-50 border-none px-4 font-bold text-[11px] flex-grow"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-10 rounded-xl font-bold text-[11px] mt-2 shadow-lg" disabled={saving}>
            {saving ? "Synchronizing..." : "Save Identity Changes"}
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
      className="w-full flex items-center justify-between p-2 hover:bg-gray-50 transition-colors group rounded-lg"
    >
      <div className="flex items-center gap-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isDestructive ? 'bg-red-50 text-primary' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary'}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span className={`text-[12px] font-bold ${isDestructive ? 'text-primary' : 'text-gray-600'}`}>{label}</span>
      </div>
      <ChevronRight className={`w-3 h-3 ${isDestructive ? 'text-red-200' : 'text-gray-300'} group-hover:translate-x-1 transition-transform`} />
    </button>
  );
}
