import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { FirebaseClientProvider } from "@/firebase";
import { AppLayoutWrapper } from "@/components/AppLayoutWrapper";
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Steak West | Premium Meat Logistics',
  description: 'Nairobi #1 Premium Meat Dispatch. Secure, Fast, Reliable.',
};

export const viewport: Viewport = {
  themeColor: '#ff0000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
        <FirebaseClientProvider>
          <CartProvider>
            <AppLayoutWrapper>
              {children}
            </AppLayoutWrapper>
            <MobileBottomNav />
            <Toaster />
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
