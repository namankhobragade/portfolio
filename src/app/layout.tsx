
import type {Metadata} from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from '@/components/smooth-scroll';
import { ScrollToTop } from '@/components/scroll-to-top';
import { ScrollProgress } from '@/components/scroll-progress';
import { GoogleAnalytics } from '@/components/google-analytics';
import { Inter, Space_Grotesk, Source_Code_Pro } from 'next/font/google';
import { QuoteRotator } from '@/components/quote-rotator';
import { ClientInfoWidget } from '@/components/client-info-widget';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Preloader } from '@/components/preloader';
import { SITE_CONFIG } from '@/lib/config';
import { CopyProtection } from '@/components/copy-protection';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devsec-portfolio.vercel.app';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_CONFIG.siteTitle,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.siteDescription,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.linkedinUrl }],
  creator: SITE_CONFIG.name,
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    title: SITE_CONFIG.siteTitle,
    description: SITE_CONFIG.siteDescription,
    url: siteUrl,
    siteName: 'DevSec',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Freelance Portfolio`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.siteTitle,
    description: SITE_CONFIG.siteDescription,
    creator: '@naman-mahi',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": SITE_CONFIG.name,
  "url": siteUrl,
  "jobTitle": SITE_CONFIG.jobTitle,
  "sameAs": [
    SITE_CONFIG.linkedinUrl,
    SITE_CONFIG.githubUrl
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": siteUrl,
  "name": "DevSec",
  "publisher": personSchema,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${sourceCodePro.variable}`}>
      <head>
        {GA_MEASUREMENT_ID && <GoogleAnalytics />}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={cn('bg-background font-body text-foreground antialiased')}>
        <ThemeProvider>
            <Preloader />
            <SmoothScroll />
            <ScrollProgress />
            <QuoteRotator />
            <Header />
            <CopyProtection />
            <div className="relative flex min-h-dvh flex-col">
                <main className="flex-1 pt-32">{children}</main>
                <Footer />
            </div>
            <Toaster />
            <ScrollToTop />
            <ClientInfoWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
