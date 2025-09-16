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

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  title: {
    default: 'Sunil Khobragade | Technical Lead & Full-Stack Developer',
    template: '%s | Sunil Khobragade',
  },
  description: 'The professional portfolio of Sunil Khobragade, a Technical Lead and Full-stack Developer with a passion for cybersecurity and AI.',
  keywords: ['Sunil Khobragade', 'Technical Lead', 'Full-Stack Developer', 'Cybersecurity', 'AI', 'Laravel', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Sunil Khobragade', url: 'https://www.linkedin.com/in/sunilkhobragade' }],
  creator: 'Sunil Khobragade',
  openGraph: {
    title: 'Sunil Khobragade | Technical Lead & Full-Stack Developer',
    description: 'A seasoned Full-stack Developer and Technical Lead specializing in secure, scalable web applications.',
    url: 'https://your-domain.com', // Replace with your actual domain
    siteName: 'Securefolio',
    images: [
      {
        url: '/og-image.png', // You need to add this image to your /public folder
        width: 1200,
        height: 630,
        alt: 'Sunil Khobragade Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunil Khobragade | Technical Lead & Full-Stack Developer',
    description: 'A seasoned Full-stack Developer and Technical Lead specializing in secure, scalable web applications.',
    creator: '@yourtwitterhandle', // Replace with your Twitter handle if you have one
    images: ['/og-image.png'], // You need to add this image to your /public folder
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Source+Code+Pro:wght@400;500&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('bg-background font-body text-foreground antialiased')}>
        <ThemeProvider>
            <SmoothScroll />
            <ScrollProgress />
            <div className="relative flex min-h-dvh flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
            <Toaster />
            <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
