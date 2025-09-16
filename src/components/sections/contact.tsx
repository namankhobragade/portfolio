"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  honeypot: z.string().optional(), // Honeypot field
});

export function Contact() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            honeypot: "",
        },
    });

    const {formState: {isSubmitting}} = form;
    const formSubmitEmail = process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL;

    function onSubmit(values: z.infer<typeof formSchema>) {
        // This function now programmatically submits the form.
        const formElement = form.control.owner?._formRef.current as HTMLFormElement | undefined;
        if (formElement) {
            formElement.submit();
        }
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <div className="inline-block rounded-lg px-3 py-1 text-sm">Get in Touch</div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Contact Me</h2>
                     <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Have a project in mind, want to collaborate, or just want to connect? Drop me a message using the form below.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                    <Form {...form}>
                        <form 
                            action={`https://formsubmit.co/${formSubmitEmail}`}
                            method="POST"
                            onSubmit={form.handleSubmit(onSubmit)} 
                            className="space-y-4 text-left"
                        >
                             <input type="hidden" name="_subject" value="New Contact Form Submission!" />
                             <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}/?form-submitted=true` : ''} />
                             <input type="hidden" name="_captcha" value="false" />
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
                            {/* Honeypot Field */}
                            <FormField
                                control={form.control}
                                name="honeypot"
                                render={({ field }) => (
                                    <FormItem className="hidden">
                                        <FormControl>
                                            <Input type="text" {...field} tabIndex={-1} autoComplete="off" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                <Send className="mr-2 h-4 w-4" />
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
}
