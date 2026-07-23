'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { SidebarNav } from './SidebarNav';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

/**
 * Global wrapper - Simplified to fix blank screens.
 */
export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  
  const isLogin = pathname.startsWith('/login');
  const isCheckout = pathname.startsWith('/checkout');
  const isDiscovery = pathname === '/restaurants';
  
  const isMinimal = isLogin;
  const hideSidebar = isLogin || isCheckout || isDiscovery;

  return (
    <div className="flex flex-col min-h-screen">
      {!isMinimal && <Navigation />}
      <div className="flex flex-grow relative">
        <Suspense fallback={null}>
          {!hideSidebar && <SidebarNav />}
        </Suspense>
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
