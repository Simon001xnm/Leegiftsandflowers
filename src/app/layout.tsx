
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase";
import { CartProvider } from '@/context/CartContext';
import { AppLayoutWrapper } from '@/components/AppLayoutWrapper';

/**
 * NEXT.JS 15 METADATA & VIEWPORT LOCK
 * Separating these exports is critical to resolve persistent blank white screen issues.
 */
export const metadata: Metadata = {
  title: 'Steak West | Global Marketplace',
  description: 'Premium Meat Distribution Network.',
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
      <body className="font-body antialiased bg-white text-foreground min-h-screen pb-safe overflow-x-hidden">
        <FirebaseClientProvider>
          <CartProvider>
            <AppLayoutWrapper>
              {children}
            </AppLayoutWrapper>
            <Toaster />
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
