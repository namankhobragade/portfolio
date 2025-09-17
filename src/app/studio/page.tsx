
'use client';
import { useState, useActionState, useEffect } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
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
import { Bot, Loader2, Save, Check, Image as ImageIcon, Palette, Settings, Trash2, PlusCircle, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MarkdownContent } from '@/components/markdown-content';
import { generateBlogPost, GenerateBlogPostOutput } from '@/ai/flows/generate-blog-post-flow';
import { SKILLS_DATA, SITE_CONFIG } from '@/lib/data';
import { saveBlogPost, updateThemeColors, updateGeneralSettings, updateSkills, updateTypography } from '@/app/actions';
import { Header } from '@/components/header';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allIcons } from '@/lib/icons';

// ========= Form Schemas =========

const blogFormSchema = z.object({
  topic: z.string().min(10, 'Please provide a more detailed topic (min 10 characters).'),
});

const themeFormSchema = z.object({
    primary: z.string().min(1, 'Primary color is required.'),
    background: z.string().min(1, 'Background color is required.'),
    accent: z.string().min(1, 'Accent color is required.'),
    primaryDark: z.string().min(1, 'Dark Primary color is required.'),
    backgroundDark: z.string().min(1, 'Dark Background color is required.'),
    accentDark: z.string().min(1, 'Dark Accent color is required.'),
});

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

const skillSchema = z.object({
    name: z.string().min(1, "Skill name cannot be empty."),
    icon: z.string().min(1, "An icon must be selected."),
});

const skillCategorySchema = z.object({
    category: z.string().min(1, "Category name cannot be empty."),
    description: z.string().min(1, "Description cannot be empty."),
    skills: z.array(skillSchema),
});

const skillsFormSchema = z.object({
    skills: z.array(skillCategorySchema),
});

const typographySchema = z.object({
  fontBody: z.string(),
  fontHeadline: z.string(),
});

const availableFonts = ["Inter", "Space Grotesk", "Roboto", "Lato", "Montserrat", "Oswald", "Raleway"];


// ========= Main Studio Page =========

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
            
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="content" className="md:col-span-4">Content</TabsTrigger>
              </TabsList>
              <TabsContent value="general"><GeneralSettings /></TabsContent>
              <TabsContent value="skills"><SkillsManager /></TabsContent>
              <TabsContent value="theme"><ThemeCustomizer /></TabsContent>
              <TabsContent value="typography"><TypographyCustomizer /></TabsContent>
              <TabsContent value="content"><ContentStudio /></TabsContent>
            </Tabs>
        </main>
        </>
    );
}

// ========= Studio Components =========

function GeneralSettings() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(updateGeneralSettings, { success: false, message: "" });
    
    const form = useForm<z.infer<typeof generalSettingsSchema>>({
        resolver: zodResolver(generalSettingsSchema),
        defaultValues: {
            ...SITE_CONFIG,
            siteKeywords: SITE_CONFIG.keywords.join(', '),
        },
    });
    
    useEffect(() => {
        if (form.formState.isSubmitSuccessful && state.success) {
            toast({ description: state.message });
        } else if (form.formState.isSubmitSuccessful && !state.success && state.message) {
            toast({ description: state.message, variant: 'destructive' });
        }
    }, [form.formState.isSubmitSuccessful, state, toast]);

    return (
        <Card className="mt-6 bg-transparent border">
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

                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                           {form.formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : <><Settings className="mr-2 h-4 w-4" /> Update Settings</>}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

function SkillsManager() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(updateSkills, { success: false, message: "" });
    const formMethods = useForm<z.infer<typeof skillsFormSchema>>({
        resolver: zodResolver(skillsFormSchema),
        defaultValues: {
            skills: SKILLS_DATA.map(cat => ({
                ...cat,
                skills: cat.skills.map(skill => ({...skill, icon: skill.icon as any }))
            }))
        }
    });

    const { control, handleSubmit, formState: { isSubmitting } } = formMethods;

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "skills",
    });

    const onSubmit = (data: z.infer<typeof skillsFormSchema>) => {
        formAction(data.skills);
    };

    useEffect(() => {
        if (isSubmitting) return; // Prevent toast on initial load
        if (state.success) {
            toast({ description: state.message });
        } else if (!state.success && state.message) {
            toast({ description: state.message, variant: 'destructive' });
        }
    }, [state, isSubmitting, toast]);

    return (
         <Card className="mt-6 bg-transparent border">
            <CardHeader>
                <CardTitle>Skills Manager</CardTitle>
                <CardDescription>Add, edit, or remove skill categories and individual skills.</CardDescription>
            </CardHeader>
            <CardContent>
                <FormProvider {...formMethods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-6">
                            {fields.map((field, index) => (
                                <SkillCategoryField key={field.id} categoryIndex={index} control={control} removeCategory={remove} />
                            ))}
                        </div>
                        <Button type="button" variant="outline" onClick={() => append({ category: "", description: "", skills: [{ name: "", icon: "Code"}] })}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                        <Separator />
                         <Button type="submit" disabled={isSubmitting} className="w-full">
                           {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Skills</>}
                        </Button>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}

function SkillCategoryField({ categoryIndex, control, removeCategory }: { categoryIndex: number, control: any, removeCategory: (index: number) => void }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `skills.${categoryIndex}.skills`,
    });

    return (
        <Card className="p-4 border-dashed">
            <div className="flex justify-between items-start">
                <div className="flex-grow space-y-4">
                    <FormField
                        control={control}
                        name={`skills.${categoryIndex}.category`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl><Input placeholder="e.g., Backend Development" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`skills.${categoryIndex}.description`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Description</FormLabel>
                                <FormControl><Textarea placeholder="A brief description of the category." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeCategory(categoryIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
             <Separator className="my-4" />
             <h4 className="text-sm font-semibold mb-2">Skills in this category</h4>
            <div className="space-y-2">
                {fields.map((skillField, skillIndex) => (
                    <div key={skillField.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <FormField
                            control={control}
                            name={`skills.${categoryIndex}.skills.${skillIndex}.name`}
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl><Input placeholder="e.g., Laravel" {...field} /></FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`skills.${categoryIndex}.skills.${skillIndex}.icon`}
                             render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Icon" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {allIcons.map(icon => <SelectItem key={icon.name} value={icon.name}><icon.component className="h-4 w-4 mr-2" />{icon.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                         <Button variant="ghost" size="icon" onClick={() => remove(skillIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
            </div>
            <Button type="button" variant="link" size="sm" onClick={() => append({ name: "", icon: "Code" })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
            </Button>
        </Card>
    );
}

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
            backgroundDark: "0 0% 0%",
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

    return (
        <Card className="mt-6 bg-transparent border">
            <CardHeader>
                <CardTitle>Theme Customizer</CardTitle>
                <CardDescription>Adjust the color scheme of your website. Enter HSL values to change the theme colors.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action={formAction} className="space-y-8">
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

function TypographyCustomizer() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(updateTypography, { success: false, message: "" });
    
    const form = useForm<z.infer<typeof typographySchema>>({
        resolver: zodResolver(typographySchema),
        defaultValues: {
            fontBody: 'Inter',
            fontHeadline: 'Space Grotesk',
        },
    });

    useEffect(() => {
        if (form.formState.isSubmitSuccessful && state.success) {
            toast({ description: state.message });
        } else if (form.formState.isSubmitSuccessful && !state.success && state.message) {
            toast({ description: state.message, variant: 'destructive' });
        }
    }, [form.formState.isSubmitSuccessful, state, toast]);

    return (
        <Card className="mt-6 bg-transparent border">
            <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Change the fonts used for headlines and body text across your website.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action={formAction} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="fontHeadline"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Headline Font</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select a font" /></SelectTrigger></FormControl>
                                            <SelectContent>{availableFonts.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="fontBody"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Body Font</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select a font" /></SelectTrigger></FormControl>
                                            <SelectContent>{availableFonts.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                           {form.formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : <><Palette className="mr-2 h-4 w-4" /> Update Fonts</>}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

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

    