import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { AppProviders } from '@/components/providers/AppProviders';

import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Health Node | Track and improve wellbeing',
  description: 'A modern health-tracking starter built with Next.js, MongoDB, and NextAuth.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'Health Node',
    description: 'Monitor weight, heart rate, sleep, and activity in one dashboard.'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
