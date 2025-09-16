
"use client";

import { useEffect, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { subscribeToNewsletter } from '@/app/actions';
import { Loader2, Mail } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

const NEWSLETTER_SUBSCRIBED_KEY = 'devsec_newsletter_subscribed';
const LAST_PROMPT_KEY = 'devsec_last_newsletter_prompt';


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                </>
            ) : (
                <>
                    <Mail className="mr-2 h-4 w-4" />
                    Subscribe
                </>
            )}
        </Button>
    );
}

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [state, formAction] = useActionState(subscribeToNewsletter, { success: false, message: "" });
  
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

  useEffect(() => {
    if (state.message) {
        toast({
            title: state.success ? "Subscribed! 🎉" : "Error",
            description: state.message,
            variant: state.success ? "default" : "destructive",
        });
        if (state.success) {
            localStorage.setItem(NEWSLETTER_SUBSCRIBED_KEY, 'true');
            setIsOpen(false);
            form.reset();
        }
    }
  }, [state, toast, form]);


  const handleOpenChange = (open: boolean) => {
    if (!open) {
      localStorage.setItem(LAST_PROMPT_KEY, String(Date.now()));
    }
    setIsOpen(open);
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
            action={formAction}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <SubmitButton />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
