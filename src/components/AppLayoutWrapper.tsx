'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { SidebarNav } from './SidebarNav';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

/**
 * RESILIENT LAYOUT WRAPPER
 * Optimized to prevent hydration stalls and white screens.
 */
export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Minimal checks to prevent crashing if pathname is null
  const isLogin = pathname?.startsWith('/login') || false;
  const isCheckout = pathname?.startsWith('/checkout') || false;
  const isDiscovery = pathname === '/restaurants';
  
  const isMinimal = isLogin;
  const hideSidebar = isLogin || isCheckout || isDiscovery;

  return (
    <div className="flex flex-col min-h-screen">
      {!isMinimal && <Navigation />}
      <div className="flex flex-grow relative">
        <Suspense fallback={<div className="w-64 hidden lg:block border-r bg-white" />}>
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
