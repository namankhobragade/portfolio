
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/animated-section';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <AnimatedSection className="flex h-[calc(100vh-10rem)] items-center justify-center">
      <div className="container flex flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold tracking-tighter sm:text-9xl font-headline text-primary">404</h1>
          <p className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Page Not Found</p>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
          </p>
        </div>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back Home
          </Link>
        </Button>
      </div>
    </AnimatedSection>
  );
}
