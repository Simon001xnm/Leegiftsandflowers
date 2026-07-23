
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { FirebaseClientProvider } from "@/firebase";
import { CartProvider } from '@/context/CartContext';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Steak West | Logistics',
  description: 'Premium Meat Dispatch.',
};

export const viewport: Viewport = {
  themeColor: '#ff0000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/**
 * BULLETPROOF ROOT LAYOUT
 * Stripped of any blocking logic to ensure instant rendering.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-white text-foreground min-h-screen pb-20 md:pb-0">
        <Suspense fallback={null}>
          <FirebaseClientProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <main className="flex-grow">{children}</main>
                <MobileBottomNav />
                <Toaster />
              </div>
            </CartProvider>
          </FirebaseClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
