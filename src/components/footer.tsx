
"use client";

import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { Separator } from './ui/separator';
import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '@/lib/data';

interface LocationInfo {
  ip: string;
  city: string;
  region: string;
  country_name: string;
}

export function Footer() {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);

  useEffect(() => {
    // Set the initial time on the client
    setCurrentDateTime(new Date());
    
    // Update the time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Fetch location info
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => setLocationInfo(data))
      .catch(error => console.error('Error fetching location:', error));

    // Clean up the interval on component unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDateTime = currentDateTime?.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
  });

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
             &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved. 
             Crafting secure and intelligent digital experiences with a passion for code.
          </p>
          <Separator className="w-1/4 my-2" />
          <div className="text-xs text-muted-foreground space-y-1">
              <div>
                {formattedDateTime ? formattedDateTime : <span className="h-4 w-48 inline-block bg-muted rounded animate-pulse" />}
              </div>
              <div>
                {locationInfo ? (
                    <span>{`${locationInfo.ip} - ${locationInfo.city}, ${locationInfo.region}, ${locationInfo.country_name}`}</span>
                ) : (
                    <span className="h-4 w-64 inline-block bg-muted rounded animate-pulse" />
                )}
              </div>
          </div>
          <div className="flex space-x-6">
            <Link href={SITE_CONFIG.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-transform hover:text-foreground hover:scale-110">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href={SITE_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-transform hover:text-foreground hover:scale-110">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
