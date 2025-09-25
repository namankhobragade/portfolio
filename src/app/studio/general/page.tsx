
'use client';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SITE_CONFIG } from '@/lib/config';
import { updateGeneralSettings } from '@/app/actions';
import { Separator } from '@/components/ui/separator';

const generalSettingsSchema = z.object({
    name: z.string().min(1, "Name is required."),
    jobTitle: z.string().min(1, "Job title is required."),
    heroDescription1: z.string().min(1, "First paragraph of hero description is required."),
    heroDescription2: z.string().min(1, "Second paragraph of hero description is required."),
    siteTitle: z.string().min(1, "Site title is required."),
    siteDescription: z.string().min(1, "Site description is required."),
    siteKeywords: z.string(),
    githubUrl: z.string().url("Invalid GitHub URL."),
    linkedinUrl: z.string().url("Invalid LinkedIn URL."),
});

export default function GeneralSettingsPage() {
    const { toast } = useToast();
    const [state, formAction, isPending] = useActionState(updateGeneralSettings, { success: false, message: "" });
    
    const form = useForm<z.infer<typeof generalSettingsSchema>>({
        resolver: zodResolver(generalSettingsSchema),
        defaultValues: {
            ...SITE_CONFIG,
            siteKeywords: SITE_CONFIG.keywords.join(', '),
        },
    });
    
    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast({ description: state.message });
            } else {
                toast({ description: state.message, variant: 'destructive' });
            }
        }
    }, [state, toast]);

    return (
        <Card className="bg-transparent border">
            <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Update your personal information, social links, and website SEO settings.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action={formAction} className="space-y-8">
                        <h3 className="text-lg font-semibold">Personal Information</h3>
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="jobTitle" render={({ field }) => (
                            <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="heroDescription1" render={({ field }) => (
                            <FormItem><FormLabel>Hero Introduction</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="heroDescription2" render={({ field }) => (
                            <FormItem><FormLabel>Hero Details</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <Separator />
                        <h3 className="text-lg font-semibold">SEO & Socials</h3>
                        <FormField control={form.control} name="siteTitle" render={({ field }) => (
                            <FormItem><FormLabel>Site Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="siteDescription" render={({ field }) => (
                            <FormItem><FormLabel>Site Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="siteKeywords" render={({ field }) => (
                            <FormItem><FormLabel>Site Keywords</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Comma-separated keywords.</FormDescription><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="githubUrl" render={({ field }) => (
                            <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="linkedinUrl" render={({ field }) => (
                            <FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                        <Button type="submit" disabled={isPending} className="w-full">
                           {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : <><Settings className="mr-2 h-4 w-4" /> Update Settings</>}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
