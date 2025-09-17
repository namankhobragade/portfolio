
'use client';
import { useState, useActionState, useEffect } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Loader2, Save, Check, Image as ImageIcon, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MarkdownContent } from '@/components/markdown-content';
import { generateBlogPost, GenerateBlogPostOutput } from '@/ai/flows/generate-blog-post-flow';
import { SKILLS_DATA } from '@/lib/data';
import { saveBlogPost, updateThemeColors } from '@/app/actions';
import { Header } from '@/components/header';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Blog Post Form Schema
const blogFormSchema = z.object({
  topic: z.string().min(10, 'Please provide a more detailed topic (min 10 characters).'),
});

// Theme Customizer Form Schema
const themeFormSchema = z.object({
    primary: z.string().min(1, 'Primary color is required.'),
    background: z.string().min(1, 'Background color is required.'),
    accent: z.string().min(1, 'Accent color is required.'),
    primaryDark: z.string().min(1, 'Dark Primary color is required.'),
    backgroundDark: z.string().min(1, 'Dark Background color is required.'),
    accentDark: z.string().min(1, 'Dark Accent color is required.'),
});


export default function StudioPage() {
    return (
        <>
        <Header />
        <main className="container max-w-4xl py-24 md:py-32">
            <div className="space-y-3 text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tighter md:text-5xl/tight font-headline">Studio</h1>
                <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                   Your creative and administrative command center. Generate AI content or customize your website's appearance.
                </p>
            </div>
            
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content Studio</TabsTrigger>
                <TabsTrigger value="theme">Theme Customizer</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <ContentStudio />
              </TabsContent>
              <TabsContent value="theme">
                <ThemeCustomizer />
              </TabsContent>
            </Tabs>
        </main>
        </>
    );
}


// Content Studio Component
function ContentStudio() {
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
        <Card className="mt-6 bg-transparent border">
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

// Theme Customizer Component
function ThemeCustomizer() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(updateThemeColors, { success: false, message: "" });

    const form = useForm<z.infer<typeof themeFormSchema>>({
        resolver: zodResolver(themeFormSchema),
        defaultValues: {
            primary: "240 5.9% 10%",
            background: "0 0% 100%",
            accent: "240 5.9% 10%",
            primaryDark: "0 0% 98%",
            backgroundDark: "240 10% 3.9%",
            accentDark: "0 0% 98%",
        },
    });
    
     useEffect(() => {
      if (form.formState.isSubmitSuccessful && state.success) {
        toast({ description: state.message });
      } else if (form.formState.isSubmitSuccessful && !state.success && state.message) {
        toast({ description: state.message, variant: 'destructive' });
      }
    }, [form.formState.isSubmitSuccessful, state, toast]);

    const handleFormSubmit = (data: z.infer<typeof themeFormSchema>) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formAction(formData);
    };

    return (
        <Card className="mt-6 bg-transparent border">
            <CardHeader>
                <CardTitle>Theme Customizer</CardTitle>
                <CardDescription>Adjust the color scheme of your website. Enter HSL values to change the theme colors.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Light Theme</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                     <FormField control={form.control} name="background" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Background</FormLabel>
                                            <FormControl><Input placeholder="0 0% 100%" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="primary" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Primary</FormLabel>
                                            <FormControl><Input placeholder="240 5.9% 10%" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="accent" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Accent</FormLabel>
                                            <FormControl><Input placeholder="240 5.9% 10%" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Dark Theme</h3>
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                     <FormField control={form.control} name="backgroundDark" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Background</FormLabel>
                                            <FormControl><Input placeholder="240 10% 3.9%" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="primaryDark" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Primary</FormLabel>
                                            <FormControl><Input placeholder="0 0% 98%" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="accentDark" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Accent</FormLabel>
                                            <FormControl><Input placeholder="0 0% 98%" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </div>
                        </div>
                        <FormDescription>
                            Enter colors as HSL values without the `hsl()` function (e.g., `240 5.9% 10%`).
                        </FormDescription>
                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                           {form.formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : <><Palette className="mr-2 h-4 w-4" /> Update Theme</>}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

