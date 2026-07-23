
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, User, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Discover", icon: Home },
    { href: "/restaurants", label: "Search", icon: Search },
    { href: "/dashboard/customer", label: "Orders", icon: Utensils },
    { href: "/checkout", label: "Basket", icon: ShoppingBag },
    { href: "/profile", label: "Account", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-20 bg-white/95 backdrop-blur-xl border-t md:hidden flex items-center justify-around px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 gap-1.5 transition-all duration-300 active:scale-75",
              isActive ? "text-primary" : "text-gray-400 hover:text-black"
            )}
          >
            <div className={cn(
              "p-2 rounded-2xl transition-all duration-500",
              isActive && "bg-primary/5 scale-110"
            )}>
              <Icon className={cn("w-6 h-6", isActive ? "stroke-[3px]" : "stroke-[2px]")} />
            </div>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-tighter",
              isActive ? "opacity-100" : "opacity-60"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
