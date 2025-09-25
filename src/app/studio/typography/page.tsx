'use client';
import { useActionState, useEffect } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateTypography } from '@/app/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const typographySchema = z.object({
  fontBody: z.string(),
  fontHeadline: z.string(),
});

const availableFonts = ["Inter", "Space Grotesk", "Roboto", "Lato", "Montserrat", "Oswald", "Raleway"];

export default function TypographyCustomizerPage() {
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
        <Card className="bg-transparent border">
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
