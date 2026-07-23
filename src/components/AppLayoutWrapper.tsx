'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { SidebarNav } from './SidebarNav';
import { cn } from '@/lib/utils';

/**
 * RESILIENT LAYOUT WRAPPER
 * Simplified to prevent any possible hydration stalls or white screens.
 */
export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const path = pathname || '';
  const isLogin = path.startsWith('/login');
  const isCheckout = path.startsWith('/checkout');
  const isDiscovery = path === '/restaurants';
  
  const isMinimal = isLogin;
  const hideSidebar = isLogin || isCheckout || isDiscovery;

  return (
    <div className="flex flex-col min-h-screen">
      {!isMinimal && <Navigation />}
      <div className="flex flex-grow relative">
        {!hideSidebar && <SidebarNav />}
        <main className={cn(
          "flex-grow transition-all duration-300",
          (!hideSidebar) ? "lg:ml-64" : "ml-0"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
