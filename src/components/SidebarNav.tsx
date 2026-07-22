
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { 
  Home, 
  Zap, 
  Wine, 
  Heart, 
  Beef, 
  Utensils, 
  Baby, 
  Stethoscope, 
  Cpu,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/restaurants?cat=Raw Meat", label: "Butchery", icon: Beef, cat: "Raw Meat" },
  { href: "/restaurants?cat=Nyama Choma", label: "Grills", icon: Utensils, cat: "Nyama Choma" },
  { href: "/restaurants?cat=Delicacies", label: "Convenience", icon: Zap, cat: "Delicacies" },
  { href: "/restaurants?cat=Cooked", label: "Cooked", icon: Utensils, cat: "Cooked" },
  { href: "/restaurants?cat=Grocery", label: "Grocery", icon: ShoppingBag, cat: "Grocery" },
  { href: "/restaurants?cat=Alcohol", label: "Alcohol", icon: Wine, cat: "Alcohol" },
  { href: "/restaurants?cat=Health", label: "Health", icon: Heart, cat: "Health" },
  { href: "/restaurants?cat=Baby", label: "Baby", icon: Baby, cat: "Baby" },
  { href: "/profile", label: "Personal Care", icon: Stethoscope },
  { href: "/dashboard", label: "Electronics", icon: Cpu },
];

export function SidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCat = searchParams.get('cat');

  return (
    <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-16 bottom-0 bg-white border-r overflow-y-auto pt-6 px-4 space-y-2 no-scrollbar">
      {SIDEBAR_ITEMS.map((item) => {
        const Icon = item.icon;
        const isPathActive = pathname === item.href.split('?')[0];
        const isCatActive = item.cat ? currentCat === item.cat : !currentCat && isPathActive;
        const isActive = item.cat ? (isPathActive && isCatActive) : isPathActive;
        
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-black text-sm uppercase tracking-tighter",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-gray-500 hover:bg-gray-50 hover:text-black"
            )}
          >
            <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-400")} />
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
