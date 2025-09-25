
"use client";

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useActionState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from '@/app/actions';

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(1, "Message is required."),
});

export function Contact() {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [state, formAction] = useActionState(submitContactForm, { success: false, message: "" });
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    useEffect(() => {
      if (state.message) {
        if (state.success) {
          toast({
            description: state.message,
          });
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
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('message', data.message);

        startTransition(() => {
            formAction(formData);
        });

        // Also submit to formsubmit.co
        const formSubmitEndpoint = `https://formsubmit.co/${process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL}`;
        const fsFormData = new FormData();
        fsFormData.append('name', data.name);
        fsFormData.append('email', data.email);
        fsFormData.append('message', data.message);
        fsFormData.append('_subject', `New Contact Form Submission from ${data.name}`);
        fsFormData.append('_template', 'table');

        try {
            await fetch(formSubmitEndpoint, {
                method: 'POST',
                body: fsFormData,
                headers: {
                    'Accept': 'application/json'
                }
            });
        } catch (error) {
            console.error("Could not submit to formsubmit.co", error);
        }
    }


    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Contact Me</h2>
                     <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Have a project in mind, want to collaborate, or just want to connect? Drop me a message using the form below.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 text-left"
                        >
                             <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="your@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Let's talk about..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                {isPending ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
}
