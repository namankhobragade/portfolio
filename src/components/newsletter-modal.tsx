
"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useActionState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Loader2 } from 'lucide-react';
import { subscribeToNewsletter } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Please enter a valid email address."),
});

const LAST_PROMPT_KEY = 'devsec_last_newsletter_prompt';

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, { success: false, message: "" });
  
  useEffect(() => {
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
        if (state.success) {
            toast({
                description: state.message,
            });
            setIsOpen(false);
            form.reset();
        } else {
            toast({
                description: state.message,
                variant: 'destructive',
            });
        }
    }
  }, [state, toast, form]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    formAction(data);

    // Also submit to formsubmit.co
    const formSubmitEndpoint = `https://formsubmit.co/${process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL}`;
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('_subject', `New Newsletter Subscription: ${data.email}`);
    formData.append('_template', 'table');

    try {
        await fetch(formSubmitEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
    } catch (error) {
        console.error("Could not submit to formsubmit.co", error);
    }
  }


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
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
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
               <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                    {isPending ? 'Subscribing...' : 'Subscribe'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
