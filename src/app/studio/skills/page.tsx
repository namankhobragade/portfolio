'use client';
import { useActionState, useEffect, useState } from 'react';
import { useForm, useFieldArray, FormProvider, useFormContext } from 'react-hook-form';
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Save, Trash2, PlusCircle, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateSkillsAction } from '@/app/actions';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allIcons } from '@/lib/icons';
import { supabase } from '@/lib/supabase/client';

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

export default function SkillsManagerPage() {
    const { toast } = useToast();
    const [state, formAction, isPending] = useActionState(updateSkillsAction, { success: false, message: "" });
    const [initialData, setInitialData] = useState<z.infer<typeof skillsFormSchema>>({ skills: [] });
    const [isLoadingData, setIsLoadingData] = useState(true);

    const formMethods = useForm<z.infer<typeof skillsFormSchema>>({
        resolver: zodResolver(skillsFormSchema),
        defaultValues: initialData,
    });
    
    useEffect(() => {
      const fetchSkills = async () => {
        setIsLoadingData(true);
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('order', { ascending: true });

        if (error) {
            toast({ variant: 'destructive', description: "Failed to load skills data from database." });
        } else {
            const transformedData = {
                skills: data.map(cat => ({
                    category: cat.category,
                    description: cat.description,
                    skills: cat.skills.map((skill: any) => ({ ...skill, icon: skill.icon || 'Code' }))
                }))
            };
            setInitialData(transformedData);
            formMethods.reset(transformedData);
        }
        setIsLoadingData(false);
      };
      fetchSkills();
    }, [toast, formMethods]);

    const { control, handleSubmit, formState } = formMethods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "skills",
    });

    useEffect(() => {
        if (formState.isSubmitSuccessful && state.message) {
            if (state.success) {
                toast({ description: state.message });
            } else {
                toast({ description: state.message, variant: 'destructive' });
            }
        }
    }, [formState.isSubmitSuccessful, state, toast]);
    
    if (isLoadingData) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    return (
        <Card className="bg-transparent border">
            <CardHeader>
                <CardTitle>Skills Manager</CardTitle>
                <CardDescription>Add, edit, or remove skill categories and individual skills. (Note: Saving is simulated and does not persist to the database yet)</CardDescription>
            </CardHeader>
            <CardContent>
                <FormProvider {...formMethods}>
                    <Form {...formMethods}>
                        <form action={formAction} className="space-y-8">
                            <div className="space-y-6">
                                {fields.map((field, index) => (
                                    <SkillCategoryField key={field.id} categoryIndex={index} removeCategory={remove} />
                                ))}
                            </div>
                            <Button type="button" variant="outline" onClick={() => append({ category: "", description: "", skills: [{ name: "", icon: "Code"}] })}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Category
                            </Button>
                            <Separator />
                             <Button type="submit" disabled={isPending} className="w-full">
                               {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Skills</>}
                            </Button>
                        </form>
                    </Form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}

function SkillCategoryField({ categoryIndex, removeCategory }: { categoryIndex: number, removeCategory: (index: number) => void }) {
    const { control, register } = useFormContext();
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
                                    <FormMessage />
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
                                            {allIcons.map(icon => <SelectItem key={icon.name} value={icon.name}><div className="flex items-center gap-2"><icon.component className="h-4 w-4" />{icon.name}</div></SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
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
