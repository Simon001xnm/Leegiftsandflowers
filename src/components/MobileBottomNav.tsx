
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, User, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

/**
 * HIGH-DENSITY MOBILE NAVIGATION
 * Mirrored from Glovo/Uber Eats design patterns for professional retail feel.
 */
export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/restaurants", label: "Search", icon: Search },
    { href: "/dashboard/customer", label: "Orders", icon: Utensils },
    { href: "/checkout", label: "Basket", icon: ShoppingBag, badge: itemCount },
    { href: "/profile", label: "Account", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white/95 backdrop-blur-xl border-t md:hidden flex items-center justify-around px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 gap-1 transition-all duration-300 active:scale-90 relative",
              isActive ? "text-primary" : "text-gray-400"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-xl transition-all duration-500",
              isActive && "bg-primary/5"
            )}>
              <Icon className={cn("w-5 h-5", isActive ? "stroke-[3px]" : "stroke-[2px]")} />
            </div>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-tighter",
              isActive ? "opacity-100" : "opacity-60"
            )}>
              {item.label}
            </span>
            {item.badge > 0 && (
              <span className="absolute top-1 right-1/4 bg-primary text-white text-[8px] font-black h-3.5 w-3.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
