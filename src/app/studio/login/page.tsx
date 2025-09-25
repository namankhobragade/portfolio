
// src/app/studio/login/page.tsx
'use client';

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogIn, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { authenticateStudio } from '@/app/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  password: z.string().min(1, "Password is required."),
});

export default function StudioLoginPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [state, formAction] = useActionState(authenticateStudio, { success: false, message: "" });
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { password: "" },
    });

    useEffect(() => {
      if (form.formState.isSubmitSuccessful) {
        if (state.success) {
          toast({ description: "Login successful! Redirecting..." });
          router.push('/studio');
        } else if (state.message) {
          toast({ description: state.message, variant: 'destructive' });
        }
      }
    }, [form.formState.isSubmitSuccessful, state, toast, router]);
    
    const onSubmit = (data: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      formData.append('password', data.password);
      formAction(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
             <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Studio Access</CardTitle>
                    <CardDescription>Enter the password to access the admin dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authenticating...</>
                                ) : (
                                    <><LogIn className="mr-2 h-4 w-4" /> Sign In</>
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
