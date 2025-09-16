
"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

const NEWSLETTER_SUBSCRIBED_KEY = 'devsec_newsletter_subscribed';
const LAST_PROMPT_KEY = 'devsec_last_newsletter_prompt';

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://devsec-portfolio.vercel.app';
  
  useEffect(() => {
    const isSubscribed = localStorage.getItem(NEWSLETTER_SUBSCRIBED_KEY) === 'true';
    if (isSubscribed) {
      return;
    }

    const lastPromptTime = localStorage.getItem(LAST_PROMPT_KEY);
    const oneDay = 24 * 60 * 60 * 1000;

    if (!lastPromptTime || (Date.now() - Number(lastPromptTime)) > oneDay) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      localStorage.setItem(LAST_PROMPT_KEY, String(Date.now()));
    }
    setIsOpen(open);
  };

  const onSubmit = () => {
    localStorage.setItem(NEWSLETTER_SUBSCRIBED_KEY, 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscribe to My Newsletter</DialogTitle>
          <DialogDescription>
            Get the latest articles on cybersecurity, development, and AI delivered straight to your inbox. No spam, ever.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form 
            action="https://formsubmit.co/572490408448a3aca5b3e65283573777"
            method="POST"
            onSubmit={() => onSubmit()}
            className="space-y-4"
          >
            <input type="hidden" name="_next" value={`${siteUrl}/#`}/>
            <input type="hidden" name="_subject" value="New Newsletter Subscription!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" style={{display: 'none'}} />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
               <Button type="submit" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Subscribe
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
