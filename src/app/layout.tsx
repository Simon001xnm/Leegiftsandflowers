import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { FirebaseClientProvider } from "@/firebase";

export const metadata: Metadata = {
  title: 'Steak West Butchery | Premium Meat & Choma Delivery',
  description: 'Order fresh raw meat, Nyama Choma, Mutura, and local Kenyan delicacies in Nairobi. Fastest delivery from Steak West Butchery.',
  manifest: '/manifest.json',
  themeColor: '#ff0000',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Steak West',
  },
  icons: {
    apple: '/WhatsApp_Image_2026-07-22_at_10.09.53-removebg-preview.png',
  },
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff0000" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen pb-20 md:pb-0">
        <FirebaseClientProvider>
          {children}
          <MobileBottomNav />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
