
'use client';

import { useEffect, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Download, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitResumeRequest } from '@/app/actions';

const resumeRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  purpose: z.enum(['developer', 'fullstack', 'cyber-security', 'lead', 'other'], {
    required_error: "You must select a resume purpose.",
  }),
});

const resumeFiles = {
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
  
  const form = useForm<z.infer<typeof resumeRequestSchema>>({
    resolver: zodResolver(resumeRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      purpose: undefined,
    },
  });

  const selectedPurpose = form.watch('purpose');

  useEffect(() => {
    if (state.message && !state.success) {
        toast({ description: state.message, variant: 'destructive' });
    }
  }, [state, toast]);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };
  
  const handleDownload = () => {
    if (selectedPurpose) {
        const link = document.createElement('a');
        link.href = resumeFiles[selectedPurpose];
        link.download = `Sunil_Khobragade_Resume_${selectedPurpose}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        handleOpenChange(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Resume</DialogTitle>
          <DialogDescription>
            Please provide your information to download a resume tailored for the role you're interested in.
          </DialogDescription>
        </DialogHeader>

        {state?.success ? (
          <div className="space-y-4 text-center">
            <p className="text-green-600">{state.message}</p>
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" /> Download Now
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form action={formAction} className="space-y-4">
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
                  Submit & Get Resume
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
