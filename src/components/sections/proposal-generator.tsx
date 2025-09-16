"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateProposal } from '@/ai/flows/ai-service-proposal-tool';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Bot, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  clientNeeds: z.string().min(20, 'Please provide more details on client needs (min 20 characters).'),
  serviceDescription: z.string().min(20, 'Please describe your service in more detail (min 20 characters).'),
  userSkills: z.string().min(5, 'Please list at least one relevant skill.').transform(s => s.split(',').map(skill => skill.trim())),
});

export function ProposalGenerator() {
    const [proposal, setProposal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientNeeds: "",
            serviceDescription: "",
            userSkills: "Secure Web Development, AI Integration, Cloud Security",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setProposal('');
        try {
            const result = await generateProposal(values);
            setProposal(result.proposalText);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to generate proposal. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(proposal);
        toast({
            title: "Copied to Clipboard!",
            description: "The proposal text has been copied.",
        });
    };

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Freelance Services & AI Proposal Tool</h2>
                    <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        I offer services in secure web development, AI integration, and cybersecurity consulting. Fill out the form below to generate a personalized sales proposal for your project in seconds.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-2xl">
                    <Card>
                        <CardContent className="p-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                                    <FormField
                                        control={form.control}
                                        name="clientNeeds"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Client Needs</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="e.g., 'A small e-commerce site needs a security audit and performance optimization.'" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="serviceDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Service Offering</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="e.g., 'Comprehensive security audit including penetration testing, code review, and performance tuning.'" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="userSkills"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Key Skills to Highlight</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Next.js, Penetration Testing, AWS" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Enter comma-separated skills.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={isLoading} className="w-full">
                                        <Bot className="mr-2 h-4 w-4" />
                                        {isLoading ? 'Generating...' : 'Generate Proposal'}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                    
                    {(isLoading || proposal) && (
                         <Card className="mt-8 text-left">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Generated Proposal
                                    {proposal && !isLoading && (
                                        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                                            <Clipboard className="h-4 w-4" />
                                            <span className="sr-only">Copy to clipboard</span>
                                        </Button>
                                    )}
                                </CardTitle>
                                <CardDescription>Review and copy the AI-generated text below.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                     <div className="space-y-4">
                                        <div className="animate-pulse bg-muted h-4 w-full rounded"></div>
                                        <div className="animate-pulse bg-muted h-4 w-5/6 rounded"></div>
                                        <div className="animate-pulse bg-muted h-4 w-full rounded"></div>
                                        <div className="animate-pulse bg-muted h-4 w-4/6 rounded"></div>
                                        <div className="animate-pulse bg-muted h-4 w-full rounded mt-4"></div>
                                        <div className="animate-pulse bg-muted h-4 w-full rounded"></div>
                                     </div>
                                ) : (
                                    <p className="whitespace-pre-wrap text-sm text-muted-foreground">{proposal}</p>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    );
}
