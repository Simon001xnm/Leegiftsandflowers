"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, User, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/restaurants", label: "Search", icon: Search },
    { href: "/dashboard/customer", label: "Orders", icon: ShoppingBag },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background/95 backdrop-blur-lg border-t md:hidden flex items-center justify-around px-2 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 gap-1 transition-colors duration-200",
              isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <div className={cn(
              "p-1 rounded-xl transition-all duration-300",
              isActive && "bg-primary/10 scale-110"
            )}>
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
