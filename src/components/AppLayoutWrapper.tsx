'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Navigation } from './Navigation';
import { SidebarNav } from './SidebarNav';
import { useUser } from '@/firebase/auth/use-user';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * ROLE-BASED LAYOUT ARCHITECTURE
 * Separates Customer, Merchant, and Rider experiences completely.
 */
export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getRole() {
      if (user && !user.id?.startsWith('demo-')) {
        const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (data) setRole(data.role);
      } else if (user?.user_metadata?.role) {
        setRole(user.user_metadata.role);
      }
    }
    getRole();
  }, [user, supabase]);

  const path = pathname || '';
  const isLogin = path.startsWith('/login');
  const isMerchantDash = path === '/dashboard' || path.startsWith('/dashboard/inventory') || path.startsWith('/dashboard/add');
  const isRiderDash = path.startsWith('/dashboard/rider');
  const isCustomerDash = path.startsWith('/dashboard/customer');
  
  // Sidebar only appears for Merchant and Rider work environments
  const showSidebar = isMerchantDash || isRiderDash;
  const hideGlobalNav = isLogin;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!hideGlobalNav && <Navigation />}
      <div className="flex flex-grow relative">
        {showSidebar && <SidebarNav />}
        <main className={cn(
          "flex-grow transition-all duration-300",
          showSidebar ? "lg:ml-64" : "ml-0"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
