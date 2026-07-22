import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { FirebaseClientProvider } from "@/firebase";
import { AppLayoutWrapper } from "@/components/AppLayoutWrapper";
import { CartProvider } from '@/context/CartContext';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Steak West Butchery | Premium Meat & Choma Delivery',
  description: 'Order fresh raw meat, Nyama Choma, Mutura, and local Kenyan delicacies in Nairobi. Fastest delivery from Steak West Butchery.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Steak West',
  },
  icons: {
    icon: [
      { url: '/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png' },
    ],
    apple: '/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png',
  },
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen pb-20 md:pb-0">
        <FirebaseClientProvider>
          <CartProvider>
            <AppLayoutWrapper>
              {children}
            </AppLayoutWrapper>
            <MobileBottomNav />
            <Toaster />
          </CartProvider>
        </FirebaseClientProvider>
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  console.log('SW registration successful');
                }, function(err) {
                  console.log('SW registration failed: ', err);
                });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
