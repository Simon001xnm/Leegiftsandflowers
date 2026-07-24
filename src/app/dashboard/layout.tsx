'use client';

import { MerchantDashboardLayout } from "@/components/dashboard/MerchantDashboardLayout";

/**
 * PERSISTENT DASHBOARD LAYOUT
 * Ensures the Enterprise Navigation and Command Bar remain static
 * while navigating between POS, Products, and Team modules.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <MerchantDashboardLayout>{children}</MerchantDashboardLayout>;
}
