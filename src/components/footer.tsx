
"use client";

import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { Separator } from './ui/separator';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center space-x-3">
            <Code2 className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold font-headline">DevSec</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
             &copy; {new Date().getFullYear()} Sunil Khobragade. All rights reserved. 
             Built with Next.js and a passion for secure, intelligent code.
          </p>
          <Separator className="w-1/4 my-4" />
          <div className="flex space-x-6">
            <Link href="https://github.com/naman-mahi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-transform hover:text-foreground hover:scale-110">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/sunilkhobragade" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-transform hover:text-foreground hover:scale-110">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
