"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, LayoutDashboard, Search, UserCircle, ShoppingCart, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/restaurants", label: "Restaurants", icon: Search },
    { href: "/orders", label: "My Orders", icon: Clock },
    { href: "/dashboard", label: "Partner", icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <span className="font-headline text-2xl font-bold tracking-tight text-primary">
              Lee Eats
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2",
                    isActive 
                      ? "text-primary bg-secondary" 
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-full relative">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </Button>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle className="w-6 h-6 text-primary" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}