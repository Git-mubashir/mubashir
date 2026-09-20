import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import '../styles/globals.css';

// next/font self-hosts and inlines these at build time — no runtime request
// to fonts.googleapis.com, unlike the <link> tag the original single-file
// version used.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono'
});
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: 'MKM — Portfolio',
  description: 'Mubashir Khan Mohammed — Senior Java & Full Stack Developer'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
