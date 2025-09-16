
'use client';

import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/animated-section';
import { WifiOff, RefreshCw } from 'lucide-react';
import { QUOTES } from '@/lib/quotes';
import { useState, useEffect } from 'react';

export default function OfflinePage() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Pick a random quote on component mount
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <AnimatedSection className="flex h-[calc(100vh-10rem)] items-center justify-center">
      <div className="container flex flex-col items-center justify-center space-y-8 text-center">
        <WifiOff className="h-24 w-24 text-destructive" />
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Connection Lost</h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            It seems you're offline. Please check your internet connection and try again.
          </p>
          {quote && (
            <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
              "{quote}"
            </blockquote>
          )}
        </div>
        <Button onClick={handleReload}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reload Page
        </Button>
      </div>
    </AnimatedSection>
  );
}
