import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin']
});

const description = 'iOS developer building Money Tracker, Rates, TimeFeel and Blood Sugar in Swift & SwiftUI.';

export const metadata: Metadata = {
  title: 'Serhii Surzhykov — iOS Developer',
  description,
  // Absolute, because GitHub Pages serves the site under /personal-website and Next drops the basePath
  // when it resolves metadata URLs.
  openGraph: {
    title: 'Serhii Surzhykov — iOS Developer',
    description,
    type: 'website',
    url: 'https://sandoyaa.github.io/personal-website/',
    images: [{ url: 'https://sandoyaa.github.io/personal-website/og.png', width: 1200, height: 630 }]
  },
  twitter: { card: 'summary_large_image' }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
