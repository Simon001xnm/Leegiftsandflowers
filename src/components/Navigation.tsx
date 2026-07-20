
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  UtensilsCrossed, 
  LayoutDashboard, 
  Search, 
  UserCircle, 
  ShoppingCart, 
  Bike,
  User,
  Store,
  Menu,
  LogIn
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navigation() {
  const pathname = usePathname();
  const { user } = useUser();

  const navLinks = [
    { href: "/restaurants", label: "Explore", icon: Search },
  ];

  const dashLinks = [
    { href: "/dashboard/customer", label: "My Orders", icon: User },
    { href: "/dashboard", label: "Restaurant", icon: Store },
    { href: "/dashboard/rider", label: "Courier", icon: Bike },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div className="relative hidden sm:block">
              <span className="font-headline text-2xl font-bold tracking-tight text-primary">
                ABC
              </span>
              <svg 
                className="absolute -bottom-1.5 left-0 w-full h-2 text-primary" 
                viewBox="0 0 40 10" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M2 2C10 8 30 8 38 2" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
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
                    "px-4 py-2 text-sm font-bold rounded-xl transition-all flex items-center gap-2",
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground font-bold hover:text-primary">
                  <LayoutDashboard className="w-4 h-4" /> Management
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 rounded-2xl p-2">
                {dashLinks.map(link => (
                  <DropdownMenuItem key={link.href} asChild className="rounded-xl p-3 cursor-pointer">
                    <Link href={link.href} className="flex items-center gap-3">
                      <link.icon className="w-4 h-4 text-primary" /> 
                      <span className="font-bold">{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted/50 rounded-full p-1 border">
            <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-background h-10 w-10">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <span className="absolute top-1 right-1 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ring-2 ring-background">2</span>
            </Button>
            
            {user ? (
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-background h-10 w-10">
                  <UserCircle className="w-6 h-6 text-primary" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 font-bold text-primary">
                  <LogIn className="w-4 h-4" /> Sign In
                </Button>
              </Link>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-xl">
                <Menu className="w-6 h-6 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="rounded-l-[2rem] p-6">
              <SheetHeader className="mb-8">
                <SheetTitle className="text-left font-headline text-2xl text-primary">Main Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                <Link href="/" className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 font-bold">
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="flex items-center gap-4 p-4 rounded-2xl border font-bold">
                    {link.label}
                  </Link>
                ))}
                {!user && (
                  <Link href="/login" className="flex items-center gap-4 p-4 rounded-2xl bg-primary text-white font-bold">
                    <LogIn className="w-5 h-5" /> Sign In
                  </Link>
                )}
                <div className="pt-4 border-t mt-4">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 ml-4">Portals</p>
                  {dashLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-colors mb-2">
                      <link.icon className="w-5 h-5 text-primary" />
                      <span className="font-bold">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
