'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { SidebarNav } from './SidebarNav';
import { cn } from '@/lib/utils';

/**
 * Global wrapper that manages the high-density layout.
 * Controls the visibility of Navigation and Sidebar based on route.
 */
export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // High-density checkout and login are distraction-free (no nav/sidebar)
  const isCheckout = pathname?.startsWith('/checkout');
  const isLogin = pathname?.startsWith('/login');
  const isMinimal = isCheckout || isLogin;

  return (
    <div className="flex flex-col min-h-screen">
      {!isMinimal && <Navigation />}
      <div className="flex flex-grow relative">
        {!isMinimal && <SidebarNav />}
        <main className={cn(
          "flex-grow transition-all duration-300",
          !isMinimal && "lg:ml-64"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
