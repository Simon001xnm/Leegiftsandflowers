
'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { SidebarNav } from './SidebarNav';
import { cn } from '@/lib/utils';

/**
 * Global wrapper that manages the high-density layout.
 * Includes SidebarNav on all pages except /checkout.
 */
export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCheckout = pathname?.startsWith('/checkout');
  const isLogin = pathname?.startsWith('/login');

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex flex-grow relative">
        {!isCheckout && !isLogin && <SidebarNav />}
        <main className={cn(
          "flex-grow transition-all duration-300",
          (!isCheckout && !isLogin) && "lg:ml-64"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
