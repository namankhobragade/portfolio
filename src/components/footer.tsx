
"use client";

import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { Separator } from './ui/separator';
import { useState, useEffect } from 'react';

export function Footer() {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    // Set the date and time only on the client side after hydration
    setCurrentDateTime(new Date().toLocaleString(undefined, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }));
  }, []);


  return (
    <footer className="relative py-8 overflow-hidden border-t">
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <span className="text-[40vw] md:text-[20vw] font-black font-headline text-foreground/5 leading-none">
          DevSec
        </span>
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center space-x-3">
            <Code2 className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold font-headline">DevSec</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
             &copy; {new Date().getFullYear()} Sunil Khobragade. All rights reserved. 
             Crafting secure and intelligent digital experiences with a passion for code.
          </p>
          <Separator className="w-1/4 my-2" />
          {currentDateTime && (
            <div className="text-xs text-muted-foreground">
                {currentDateTime}
            </div>
          )}
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
