
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  ShoppingBag, 
  Zap, 
  Wine, 
  Heart, 
  Beef, 
  Utensils, 
  Baby, 
  Stethoscope, 
  Cpu 
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/restaurants?cat=Raw Meat", label: "Butchery", icon: Beef },
  { href: "/restaurants?cat=Delicacies", label: "Convenience", icon: Zap },
  { href: "/restaurants?cat=Alcohol", label: "Alcohol", icon: Wine },
  { href: "/restaurants?cat=Health", label: "Health", icon: Heart },
  { href: "/restaurants?cat=Cooked", label: "Cooked", icon: Utensils },
  { href: "/restaurants?cat=Baby", label: "Baby", icon: Baby },
  { href: "/profile", label: "Personal Care", icon: Stethoscope },
  { href: "/dashboard", label: "Electronics", icon: Cpu },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-16 bottom-0 bg-white border-r overflow-y-auto pt-6 px-4 space-y-2">
      {SIDEBAR_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm",
              isActive 
                ? "bg-gray-100 text-black" 
                : "text-gray-500 hover:bg-gray-50 hover:text-black"
            )}
          >
            <Icon className={cn("w-6 h-6", isActive ? "text-black" : "text-gray-400")} />
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
