"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Flower2, LayoutDashboard, Search, UserCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/events", label: "Discovery", icon: Search },
    { href: "/dashboard", label: "Manage", icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Flower2 className="w-5 h-5" />
            </div>
            <span className="font-headline text-xl font-bold tracking-tight text-primary">
              Lee Decors
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
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
          <Link href="/dashboard/create">
            <Button size="sm" className="hidden sm:flex gap-2 bg-accent hover:bg-accent/90">
              <PlusCircle className="w-4 h-4" />
              New Design
            </Button>
          </Link>
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