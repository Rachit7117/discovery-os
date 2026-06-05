import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DiscoveryOS — AI Product Discovery Coach',
  description:
    'Master Product Discovery through personalized AI-guided learning. Build skills in customer interviews, JTBD, experiment design, and more.',
  keywords: ['product discovery', 'product management', 'AI learning', 'PM skills', 'customer interviews'],
  authors: [{ name: 'DiscoveryOS' }],
  openGraph: {
    title: 'DiscoveryOS — AI Product Discovery Coach',
    description: 'Master Product Discovery through personalized AI-guided learning.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className={`${inter.variable} font-sans antialiased bg-[#060d1b] text-slate-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
