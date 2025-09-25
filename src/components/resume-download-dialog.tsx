
'use client';

import { useEffect, useActionState, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Download, Loader2, Send, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitResumeRequest } from '@/app/actions';

const resumeRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  purpose: z.enum(['developer', 'fullstack', 'cyber-security', 'lead', 'other'], {
    required_error: "You must select a resume purpose.",
  }),
});

type FormSchema = z.infer<typeof resumeRequestSchema>;

const resumeFiles: Record<FormSchema['purpose'], string> = {
    developer: '/resumes/Sunil_Khobragade_Developer.pdf',
    fullstack: '/resumes/Sunil_Khobragade_FullStack.pdf',
    'cyber-security': '/resumes/Sunil_Khobragade_CyberSecurity.pdf',
    lead: '/resumes/Sunil_Khobragade_Lead.pdf',
    other: '/resumes/Sunil_Khobragade_General.pdf',
}

interface ResumeDownloadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResumeDownloadDialog({ isOpen, onOpenChange }: ResumeDownloadDialogProps) {
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(submitResumeRequest, { success: false, message: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<FormSchema>({
    resolver: zodResolver(resumeRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      purpose: undefined,
    },
  });

  const purposeValue = form.watch('purpose');

  useEffect(() => {
    if (state.message) {
      if (state.success && purposeValue) {
        toast({ description: state.message });
        setIsSuccess(true);
      } else if (!state.success) {
        toast({ description: `Submission failed: ${state.message}`, variant: 'destructive' });
      }
    }
  }, [state, toast, purposeValue]);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      // Reset form and state when closing the dialog
      form.reset();
      setIsSuccess(false);
    }
  };
  
  const handleViewResume = () => {
    if (purposeValue) {
        window.open(resumeFiles[purposeValue], '_blank');
        handleOpenChange(false);
    }
  }
  
  const onSubmit = (data: FormSchema) => {
    formAction(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>View Resume</DialogTitle>
          <DialogDescription>
            Please provide your information to view a resume tailored for the role you're interested in.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="space-y-4 text-center">
            <p className="text-green-600 dark:text-green-400">Thank you! Click the button below to view the resume.</p>
            <Button onClick={handleViewResume} className="w-full">
              <FileText className="mr-2 h-4 w-4" /> View Now
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>What role are you hiring for?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="developer" /></FormControl>
                          <FormLabel className="font-normal">Developer</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="fullstack" /></FormControl>
                          <FormLabel className="font-normal">Full-Stack</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="cyber-security" /></FormControl>
                          <FormLabel className="font-normal">Cyber Security</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="lead" /></FormControl>
                          <FormLabel className="font-normal">Tech Lead</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="other" /></FormControl>
                          <FormLabel className="font-normal">Other / General</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Submit & View Resume
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
