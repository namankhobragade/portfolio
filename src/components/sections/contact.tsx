
"use client";

import { useEffect } from 'react';
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
import { Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from '@/app/actions';

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(1, "Message is required."),
});

export function Contact() {
    const { toast } = useToast();
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
      if (form.formState.isSubmitSuccessful && state.success) {
        toast({
          description: state.message,
        });
        form.reset();
      } else if (form.formState.isSubmitSuccessful && !state.success && state.message) {
        toast({
          description: state.message,
          variant: 'destructive',
        });
      }
    }, [form.formState.isSubmitSuccessful, state, toast, form]);


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
                            onSubmit={form.handleSubmit((data) => {
                                const formData = new FormData();
                                formData.append('name', data.name);
                                formData.append('email', data.email);
                                formData.append('message', data.message);
                                formAction(formData);
                            })}
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
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
}
