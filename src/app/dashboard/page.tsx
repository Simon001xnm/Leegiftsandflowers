"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_ORDERS } from "@/lib/food-data";
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  Plus,
  ShoppingBag,
  ChefHat
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RestaurantOwnerDashboard() {
  const stats = [
    { label: "Total Revenue", value: "KES 145,280", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Active Orders", value: "12", icon: ChefHat, color: "text-primary", bg: "bg-primary/5" },
    { label: "Orders Today", value: "48", icon: ShoppingBag, color: "text-accent", bg: "bg-accent/5" },
    { label: "Total Customers", value: "890", icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold font-headline text-primary mb-2">Merchant Portal</h1>
            <p className="text-muted-foreground">Manage your kitchen, monitor sales, and grow your restaurant.</p>
          </div>
          <div className="flex gap-4">
             <Link href="/dashboard/create">
              <Button variant="outline" className="h-12 px-6 rounded-xl gap-2">
                <Plus className="w-5 h-5" /> Add Menu Item
              </Button>
            </Link>
            <Button className="h-12 px-6 rounded-xl gap-2 shadow-lg shadow-primary/20">
              Kitchen View
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">+18%</Badge>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders Table */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-headline text-primary">Recent Orders</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">New</Button>
              <Button variant="ghost" size="sm">Completed</Button>
            </div>
          </div>

          <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Items</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {MOCK_ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/10 transition-colors group">
                      <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                      <td className="px-6 py-4 text-sm font-medium">{order.customerName}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {order.items.join(', ')}
                      </td>
                      <td className="px-6 py-4 font-bold text-primary">KES {order.total.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "border-none",
                            order.status === 'Delivered' ? "bg-emerald-50 text-emerald-700" : "bg-primary/10 text-primary"
                          )}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-5 h-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="gap-2">
                              <Edit3 className="w-4 h-4" /> Manage Order
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="w-4 h-4" /> Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
