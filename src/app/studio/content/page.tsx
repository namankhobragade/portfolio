'use client';
import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Loader2, Save, Check, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MarkdownContent } from '@/components/markdown-content';
import { generateBlogPost, GenerateBlogPostOutput } from '@/ai/flows/generate-blog-post-flow';
import { SKILLS_DATA } from '@/lib/data';
import { saveBlogPost } from '@/app/actions';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

const blogFormSchema = z.object({
  topic: z.string().min(10, 'Please provide a more detailed topic (min 10 characters).'),
});

export default function ContentStudio() {
    const [generatedPost, setGeneratedPost] = useState<GenerateBlogPostOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof blogFormSchema>>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: { topic: "" },
    });

    async function onGenerate(values: z.infer<typeof blogFormSchema>) {
        setIsLoading(true);
        setGeneratedPost(null);
        setIsSaved(false);

        try {
            const userSkills = SKILLS_DATA.flatMap(category => category.skills.map(skill => skill.name));
            const result = await generateBlogPost({ topic: values.topic, userSkills });
            setGeneratedPost(result);
        } catch (error) {
            console.error(error);
            toast({
                description: "Oops! Something went wrong while generating the post. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function onSave() {
        if (!generatedPost) return;

        setIsSaving(true);
        try {
            const result = await saveBlogPost(generatedPost);
            if (result.success) {
                toast({ description: `Blog post "${generatedPost.title}" saved successfully!` });
                setIsSaved(true);
            } else {
                throw new Error(result.message);
            }
        } catch (error: any) {
            console.error(error);
            toast({ description: `Failed to save post: ${error.message}`, variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    }
    
    return (
        <Card className="bg-transparent border">
            <CardHeader>
                <CardTitle>Blog Post Generator</CardTitle>
                <CardDescription>Generate a high-quality, SEO-friendly blog post on any topic using AI, complete with a unique, AI-generated featured image.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onGenerate)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Blog Post Topic</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 'Best practices for API security in Node.js'" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><Bot className="mr-2 h-4 w-4" /> Generate Article</>}
                        </Button>
                    </form>
                </Form>
                
                {generatedPost && (
                    <div className="space-y-8 mt-12">
                        <Separator />
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tighter font-headline">Generated Post</h2>
                        </div>
                        <Card className="bg-transparent border">
                            <CardHeader><CardTitle>Generated Image</CardTitle></CardHeader>
                            <CardContent>
                                <Image src={generatedPost.imageDataUri} alt={generatedPost.title} width={1200} height={675} className="aspect-video w-full object-cover rounded-lg mb-4 border" />
                                <p className="text-sm text-muted-foreground italic"><span className="font-semibold">Image Prompt:</span> "{generatedPost.imagePrompt}"</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-transparent border">
                            <CardHeader>
                                <CardTitle>{generatedPost.title}</CardTitle>
                                <p className="text-sm text-muted-foreground pt-2">{generatedPost.description}</p>
                                <div className="flex flex-wrap gap-2 pt-2"><p className="text-xs text-muted-foreground"><span className="font-semibold">Slug:</span> {generatedPost.slug}</p></div>
                            </CardHeader>
                            <CardContent className="prose prose-lg dark:prose-invert max-w-none"><MarkdownContent content={generatedPost.content} /></CardContent>
                        </Card>
                        <Button onClick={onSave} disabled={isSaving || isSaved} className="w-full">
                            {isSaving && <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>}
                            {isSaved && <><Check className="mr-2 h-4 w-4" /> Saved!</>}
                            {!isSaving && !isSaved && <><Save className="mr-2 h-4 w-4" /> Save Blog Post & Image</>}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
