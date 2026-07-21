"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Search, 
  UserCircle, 
  ShoppingCart, 
  Bike,
  User,
  Store,
  Menu,
  LogIn,
  Beef
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
    { href: "/restaurants", label: "Discovery", icon: Search },
  ];

  const dashLinks = [
    { href: "/dashboard/customer", label: "My Orders", icon: User },
    { href: "/dashboard", label: "Merchant", icon: Store },
    { href: "/dashboard/rider", label: "Courier", icon: Bike },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-md transition-transform group-hover:-rotate-6">
              <Beef className="w-5 h-5" />
            </div>
            <div className="relative">
              <span className="font-headline text-lg font-bold tracking-tighter text-primary uppercase">
                Steak West
              </span>
              <svg className="absolute -bottom-1 left-0 w-full h-1 text-primary opacity-30" viewBox="0 0 40 10" fill="none">
                <path d="M2 2C10 8 30 8 38 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-3 text-xs text-muted-foreground font-bold hover:text-primary">
                  Portals
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 rounded-xl p-1 shadow-xl">
                {dashLinks.map(link => (
                  <DropdownMenuItem key={link.href} asChild className="rounded-lg p-2.5 cursor-pointer">
                    <Link href={link.href} className="flex items-center gap-2">
                      <link.icon className="w-3.5 h-3.5 text-primary" /> 
                      <span className="text-xs font-bold">{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-muted/50 rounded-lg p-0.5 border">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md relative">
              <ShoppingCart className="w-4 h-4 text-primary" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">1</span>
            </Button>
            
            <Separator orientation="vertical" className="h-4 mx-1" />

            {user ? (
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
                  <UserCircle className="w-5 h-5 text-primary" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:flex h-8 px-3 text-xs font-bold text-primary">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 rounded-lg">
                <Menu className="w-5 h-5 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] rounded-l-2xl p-6">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left font-headline text-xl text-primary">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                <Link href="/" className="p-3 text-sm font-bold rounded-lg bg-muted/50">Home</Link>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="p-3 text-sm font-bold border rounded-lg">{link.label}</Link>
                ))}
                {!user && (
                  <Link href="/login" className="p-3 text-sm font-bold bg-primary text-white rounded-lg text-center">Sign In</Link>
                )}
                <div className="mt-4 pt-4 border-t">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-2">Portals</p>
                  {dashLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 text-sm font-bold">
                      <link.icon className="w-4 h-4 text-primary" /> {link.label}
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