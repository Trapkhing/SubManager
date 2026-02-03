import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "SubManager | Premium Subscription Tracking",
    template: "%s | SubManager"
  },
  description: "Track and manage your recurring subscriptions with style. The ultimate tool for monitoring meaningful monthly expenses.",
  keywords: ["subscription manager", "finance tracker", "recurring payments", "budget tool"],
  authors: [{ name: "SubManager Team" }],
  creator: "SubManager",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "SubManager | Premium Subscription Tracking",
    description: "Track and manage your recurring subscriptions with style.",
    siteName: "SubManager",
  },
  twitter: {
    card: "summary_large_image",
    title: "SubManager",
    description: "Track and manage your recurring subscriptions with style.",
    creator: "@trappkhing",
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192.png',
    shortcut: '/icon-192.png',
    apple: '/icon-512.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SubManager',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServiceWorkerRegister />
        <PWAInstallPrompt />
        {children}
      </body>
    </html>
  );
}
