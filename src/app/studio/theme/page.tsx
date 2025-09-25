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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateThemeColors } from '@/app/actions';
import { Separator } from '@/components/ui/separator';

const themeFormSchema = z.object({
    primary: z.string().min(1, 'Primary color is required.'),
    background: z.string().min(1, 'Background color is required.'),
    accent: z.string().min(1, 'Accent color is required.'),
    primaryDark: z.string().min(1, 'Dark Primary color is required.'),
    backgroundDark: z.string().min(1, 'Dark Background color is required.'),
    accentDark: z.string().min(1, 'Dark Accent color is required.'),
});

export default function ThemeCustomizerPage() {
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
        <Card className="bg-transparent border">
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
