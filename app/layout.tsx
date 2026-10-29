import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, Caveat } from 'next/font/google';
import {
  buildSiteMetadata,
  buildAgencyJsonLd,
  serializeJsonLdSafe,
} from '@/lib/seo';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = buildSiteMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#050C08' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildAgencyJsonLd();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${caveat.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className={`${inter.className} overflow-x-hidden bg-[#F6F8FC] text-[#0A0D14] antialiased transition-colors duration-300 dark:bg-[#050C08] dark:text-[#F4F9F5]`}
      >
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-[#08482D] focus:px-5 focus:py-2.5 focus:text-xs focus:font-semibold focus:tracking-wider focus:text-white focus:uppercase focus:shadow-lg focus:outline-none dark:focus:bg-[#10B981] dark:focus:text-[#050C08]"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLdSafe(jsonLd),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

