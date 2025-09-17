
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
    default: 'Sunil Khobragade | Freelance Full-Stack Developer & Cybersecurity Specialist',
    template: '%s | Sunil Khobragade',
  },
  description: 'The professional portfolio of Sunil Khobragade, a freelance Full-Stack Developer and Cybersecurity expert specializing in secure, AI-powered web applications.',
  keywords: ['Sunil Khobragade', 'Freelance Developer', 'Full-Stack Developer', 'Cybersecurity Specialist', 'AI Developer', 'Laravel', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Sunil Khobragade', url: 'https://www.linkedin.com/in/sunilkhobragade' }],
  creator: 'Sunil Khobragade',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    title: 'Sunil Khobragade | Freelance Full-Stack Developer & Cybersecurity Specialist',
    description: 'Expert freelance developer building secure, scalable, and intelligent web applications with a focus on cybersecurity and AI.',
    url: siteUrl,
    siteName: 'DevSec',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sunil Khobragade Freelance Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunil Khobragade | Freelance Full-Stack Developer & Cybersecurity Specialist',
    description: 'Expert freelance developer building secure, scalable, and intelligent web applications with a focus on cybersecurity and AI.',
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
  "name": "Sunil Khobragade",
  "url": siteUrl,
  "jobTitle": "Freelance Full-Stack Developer & Cybersecurity Specialist",
  "sameAs": [
    "https://www.linkedin.com/in/sunilkhobragade",
    "https://github.com/naman-mahi"
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
            <SmoothScroll />
            <ScrollProgress />
            <QuoteRotator />
            <Header />
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
