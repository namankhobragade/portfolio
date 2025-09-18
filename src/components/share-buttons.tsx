
"use client";

import { Twitter, Linkedin, Facebook, Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [isShareSupported, setIsShareSupported] = useState(false);
  const { toast } = useToast();
  const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : '';

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setIsShareSupported(true);
    }
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title,
        text: `Check out this article: ${title}`,
        url,
      });
    } catch (error) {
      // This can happen if the user cancels the share sheet
      console.log('Share was cancelled or failed', error);
    }
  };

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
        name: 'Copy Link',
        icon: null, // No icon needed for this
        action: () => {
            navigator.clipboard.writeText(url);
            toast({
                description: 'Link copied to clipboard!',
            });
        }
    }
  ];

  if (isShareSupported) {
    return (
      <Button variant="outline" onClick={handleShare}>
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {socialLinks.map((social) => (
            <DropdownMenuItem 
                key={social.name} 
                asChild={!social.action}
                onSelect={social.action ? (e) => { e.preventDefault(); social.action?.(); } : undefined}
            >
                {social.url ? (
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      {social.icon && <social.icon className="mr-2 h-4 w-4" />}
                      <span>{social.name}</span>
                    </a>
                ) : (
                    <button className="flex items-center w-full">
                       {social.icon && <social.icon className="mr-2 h-4 w-4" />}
                       <span>{social.name}</span>
                    </button>
                )}

          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
