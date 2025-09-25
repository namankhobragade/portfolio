
'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function CopyProtection() {
  const { toast } = useToast();

  useEffect(() => {
    const handleCopy = (event: ClipboardEvent) => {
      const customMessage = "Copied from sunilkhobragade.com 🙏 Thanks for visiting, but you cannot copy content from this page. Sorry! 😊";
      
      // For modern browsers that support the Clipboard API
      if (event.clipboardData) {
        event.preventDefault();
        event.clipboardData.setData('text/plain', customMessage);
        
        toast({
          description: "Content cannot be copied.",
          duration: 3000,
        });
      }
    };

    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, [toast]);

  return null; // This component doesn't render anything
}
