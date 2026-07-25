"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User as UserIcon, 
  Heart,
  History,
  Camera,
  ArrowLeft,
  Check,
  Store,
  Bike,
  Clock,
  Package,
  Star,
  ShoppingBag,
  ChevronRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/firebase/auth/use-user";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { MOCK_ORDERS, MOCK_MENU } from "@/lib/food-data";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, loading: authLoading } = useUser();
  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Data for customer workspace
  const orders = MOCK_ORDERS;
  const favorites = MOCK_MENU.slice(0, 3);
  
  const pendingOrdersCount = useMemo(() => orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length, [orders]);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
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
    return null;
  };

  const DashboardIcon = userRole === 'merchant' ? Store : Bike;
  const dashboardPath = getDashboardPath();

  if (!isEditing) {
    return (
      <div className="min-h-screen bg-white pb-24 pt-24">
        <div className="container mx-auto max-w-5xl px-4 space-y-10">
          {/* Identity Header */}
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-100 rounded-[2rem] flex items-center justify-center text-2xl font-black text-gray-400 border">
                  {initials}
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-0.5">
                <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">{profile?.name || "Premium User"}</h1>
                <p className="text-muted-foreground font-bold text-[11px] uppercase tracking-widest">{user.email}</p>
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={() => setIsEditing(true)} className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline">Edit profile</button>
                  <span className="text-gray-200">•</span>
                  <button onClick={handleSignOut} className="text-red-500 font-black text-[10px] uppercase tracking-widest hover:underline">Log out</button>
                </div>
              </div>
            </div>

            {dashboardPath && (
               <Button 
                 onClick={() => router.push(dashboardPath)}
                 className="bg-black text-white h-12 px-6 rounded-xl font-black text-[11px] uppercase tracking-widest gap-2 shadow-xl hover:bg-zinc-800"
               >
                  <DashboardIcon className="w-4 h-4" /> Operator Switch
               </Button>
            )}
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <StatCard icon={Clock} label="Pending orders" value={pendingOrdersCount} color="text-amber-500" />
             <StatCard icon={Heart} label="Your favorites" value={favorites.length} color="text-red-500" />
             <StatCard icon={History} label="Lifetime orders" value={orders.length} color="text-black" />
          </div>

          <Tabs defaultValue="activity" className="space-y-8">
            <TabsList className="bg-gray-100 p-1.5 h-12 rounded-2xl w-full md:w-auto border shadow-inner">
              <TabsTrigger value="activity" className="rounded-xl font-black text-[11px] uppercase tracking-widest px-8 data-[state=active]:bg-white data-[state=active]:shadow-lg">My Activity</TabsTrigger>
              <TabsTrigger value="orders" className="rounded-xl font-black text-[11px] uppercase tracking-widest px-8 data-[state=active]:bg-white data-[state=active]:shadow-lg">All Orders</TabsTrigger>
              <TabsTrigger value="favorites" className="rounded-xl font-black text-[11px] uppercase tracking-widest px-8 data-[state=active]:bg-white data-[state=active]:shadow-lg">Favorites</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-8">
               {pendingOrdersCount > 0 ? (
                 <section className="space-y-4">
                    <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                       <Clock className="w-4 h-4" /> Active Dispatches
                    </h3>
                    <div className="grid gap-4">
                       {orders.filter(o => o.status !== 'Delivered').map(order => (
                         <OrderStrip key={order.id} order={order} />
                       ))}
                    </div>
                 </section>
               ) : (
                 <section className="py-20 text-center bg-gray-50 rounded-[2.5rem] border border-dashed flex flex-col items-center gap-4">
                    <ShoppingBag className="w-10 h-10 text-gray-200" />
                    <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">No active dispatches right now</p>
                    <Button onClick={() => router.push('/restaurants')} variant="outline" className="rounded-full font-black text-[10px] uppercase tracking-widest h-10 border-2">Start shopping</Button>
                 </section>
               )}

               <section className="space-y-4">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                     <Star className="w-4 h-4" /> Recommended for you
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {MOCK_MENU.slice(5, 9).map(item => (
                       <div key={item.id} className="group relative bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer" onClick={() => router.push(`/products/${item.id}`)}>
                          <div className="aspect-square relative bg-gray-50">
                             <Image src={item.imageUrl} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
                          </div>
                          <div className="p-4 space-y-1">
                             <p className="text-[11px] font-black uppercase tracking-tighter truncate">{item.name}</p>
                             <p className="text-[14px] font-black text-primary">KES {item.price.toLocaleString()}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </section>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
               <div className="bg-white border rounded-[2.5rem] overflow-hidden shadow-sm">
                  <div className="divide-y">
                     {orders.map(order => (
                       <div key={order.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-primary">
                                <Package className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="font-black text-[13px] uppercase tracking-tighter">{order.id}</p>
                                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{order.date} • {order.items.join(', ')}</p>
                             </div>
                          </div>
                          <div className="text-right space-y-1">
                             <p className="font-black text-[14px]">KES {order.total.toLocaleString()}</p>
                             <Badge className={cn(
                               "border-none rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider",
                               order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                             )}>
                                {order.status}
                             </Badge>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="favorites">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {favorites.map(item => (
                    <div key={item.id} className="flex flex-col group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                       <div className="aspect-square relative bg-gray-50">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
                          <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 shadow-lg">
                             <Heart className="w-4 h-4 fill-current" />
                          </button>
                       </div>
                       <div className="p-5 space-y-2">
                          <h4 className="text-[13px] font-black uppercase tracking-tighter line-clamp-1">{item.name}</h4>
                          <p className="text-lg font-black text-black">KES {item.price.toLocaleString()}</p>
                          <Button className="w-full h-10 rounded-xl font-black text-[10px] uppercase tracking-widest mt-2">Reorder</Button>
                       </div>
                    </div>
                  ))}
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Edit Mode UI
  return (
    <div className="min-h-screen bg-white pt-24">
      <header className="container mx-auto max-w-lg px-6 py-8 flex items-center justify-between">
        <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[14px] font-black uppercase tracking-widest text-muted-foreground">Edit account</h1>
        <button type="submit" form="edit-profile-form" className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-full">
          <Check className="w-5 h-5" />
        </button>
      </header>

      <main className="container mx-auto max-w-lg px-6 pb-12">
        <form id="edit-profile-form" onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black ml-1 uppercase tracking-widest text-muted-foreground">Full identity</Label>
            <input 
              name="name" 
              defaultValue={profile?.name || ""} 
              className="w-full h-14 rounded-2xl bg-gray-50 border-none px-6 font-bold text-base outline-none focus:ring-4 focus:ring-primary/5 transition-all"
              placeholder="Full name"
            />
          </div>
          <Button type="submit" className="w-full h-16 rounded-2xl font-black text-base mt-4 shadow-2xl bg-black hover:bg-zinc-800" disabled={saving}>
            {saving ? "Syncing..." : "Update Identity"}
          </Button>
        </form>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <Card className="rounded-[2.5rem] border-2 border-black/5 shadow-none bg-white p-6 relative overflow-hidden group hover:border-black/10 transition-all">
       <div className="space-y-4">
          <div className={cn("w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-white group-hover:shadow-lg", color.replace('text-', 'bg-').replace('500', '50'))}>
             <Icon className={cn("w-6 h-6", color)} />
          </div>
          <div>
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</p>
             <h2 className="text-4xl font-black tracking-tighter">{value}</h2>
          </div>
       </div>
    </Card>
  );
}

function OrderStrip({ order }: any) {
  return (
    <div className="bg-white border rounded-[2rem] p-5 flex items-center justify-between group hover:shadow-xl transition-all cursor-pointer">
       <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary font-black text-xs border border-primary/10">
             {order.id.slice(-3)}
          </div>
          <div className="space-y-0.5">
             <p className="text-[14px] font-black uppercase tracking-tighter">{order.id}</p>
             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest line-clamp-1">{order.items.join(', ')}</p>
             <div className="flex items-center gap-2 pt-1">
                <Badge className="bg-amber-100 text-amber-700 border-none rounded-sm px-1.5 py-0 text-[8px] font-black uppercase tracking-widest animate-pulse">
                   In Transit
                </Badge>
                <span className="text-[9px] text-muted-foreground font-bold uppercase">Estimated arrival: 12 min</span>
             </div>
          </div>
       </div>
       <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
             <p className="text-[13px] font-black">KES {order.total.toLocaleString()}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
             <ChevronRight className="w-5 h-5" />
          </div>
       </div>
    </div>
  );
}
