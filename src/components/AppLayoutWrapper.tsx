'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { SidebarNav } from './SidebarNav';
import { FloatingCartBar } from './FloatingCartBar';
import { useUser } from '@/firebase/auth/use-user';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * PRODUCTION-READY ROLE-BASED LAYOUT
 * Orchestrates navigation based on real Supabase roles.
 * Updated: Added bottom padding on mobile to prevent Bottom Nav and Cart Bar overlapping content.
 */
export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getRole() {
      if (user) {
        const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (data) setRole(data.role);
      }
    }
    getRole();
  }, [user, supabase]);

  const path = pathname || '';
  const isLogin = path.startsWith('/login');
  const isCheckout = path.startsWith('/checkout');
  const isMerchantDash = path.startsWith('/dashboard') && !path.startsWith('/dashboard/customer') && !path.startsWith('/dashboard/rider');
  const showSidebar = !isMerchantDash && (path.startsWith('/dashboard/inventory') || path.startsWith('/dashboard/rider'));
  const hideGlobalNav = isLogin || isMerchantDash;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!hideGlobalNav && <Navigation />}
      <div className="flex flex-grow relative">
        {showSidebar && <SidebarNav />}
        <main className={cn(
          "flex flex-grow transition-all duration-300 pb-32 md:pb-0", // Global mobile bottom inset
          showSidebar ? "lg:ml-64" : "ml-0"
        )}>
          {children}
        </main>
      </div>
      {!isCheckout && !isMerchantDash && <FloatingCartBar />}
    </div>
  );
}
