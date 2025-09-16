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
import { Card, CardContent } from '../ui/card';
import { Bot, Clipboard, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MarkdownContent } from '../markdown-content';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';

const formSchema = z.object({
  clientName: z.string().optional(),
  companyName: z.string().optional(),
  clientNeeds: z.string().min(20, 'Please provide more details on client needs (min 20 characters).'),
  serviceDescription: z.string().min(20, 'Please describe your service in more detail (min 20 characters).'),
  userSkills: z.string().min(5, 'Please list at least one relevant skill.').transform(s => s.split(',').map(skill => skill.trim())),
});

export function ProposalGenerator() {
    const [proposal, setProposal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientName: "",
            companyName: "",
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
            setIsModalOpen(true);
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
        setCopied(true);
        toast({
            title: "Copied to Clipboard!",
            description: "The proposal text has been copied.",
        });
        setTimeout(() => setCopied(false), 2000);
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <FormField
                                            control={form.control}
                                            name="clientName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Client Name (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g., Jane Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="companyName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Name (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g., Acme Inc." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
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
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Bot className="mr-2 h-4 w-4" />
                                                Generate Proposal
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                    
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent className="sm:max-w-2xl">
                             <DialogHeader>
                                <DialogTitle>Generated Proposal</DialogTitle>
                                <DialogDescription>Review and copy the AI-generated text below.</DialogDescription>
                            </DialogHeader>
                            <div className="prose prose-sm dark:prose-invert max-w-none max-h-[60vh] overflow-y-auto pr-4">
                               <MarkdownContent content={proposal} />
                            </div>
                             <DialogFooter className="sm:justify-start gap-2">
                                <Button type="button" onClick={copyToClipboard}>
                                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
                                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                                </Button>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </section>
    );
}
