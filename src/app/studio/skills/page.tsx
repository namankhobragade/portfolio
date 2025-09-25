'use client';
import { useActionState, useEffect } from 'react';
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
import { SKILLS_DATA } from '@/lib/data';
import { updateSkills } from '@/app/actions';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allIcons } from '@/lib/icons';

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
    const [state, formAction] = useActionState(updateSkills, { success: false, message: "" });
    
    const formMethods = useForm<z.infer<typeof skillsFormSchema>>({
        resolver: zodResolver(skillsFormSchema),
        defaultValues: {
            skills: SKILLS_DATA.map(cat => ({
                ...cat,
                skills: cat.skills.map(skill => ({...skill, icon: skill.icon || 'Code' }))
            }))
        }
    });

    const { control, handleSubmit, formState } = formMethods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "skills",
    });

    const onSubmit = (data: z.infer<typeof skillsFormSchema>) => {
        formAction(data.skills);
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful && state.success) {
            toast({ description: state.message });
        } else if (formState.isSubmitSuccessful && !state.success && state.message) {
            toast({ description: state.message, variant: 'destructive' });
        }
    }, [formState.isSubmitSuccessful, state, toast]);

    return (
        <Card className="bg-transparent border">
            <CardHeader>
                <CardTitle>Skills Manager</CardTitle>
                <CardDescription>Add, edit, or remove skill categories and individual skills.</CardDescription>
            </CardHeader>
            <CardContent>
                <FormProvider {...formMethods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-6">
                            {fields.map((field, index) => (
                                <SkillCategoryField key={field.id} categoryIndex={index} removeCategory={remove} />
                            ))}
                        </div>
                        <Button type="button" variant="outline" onClick={() => append({ category: "", description: "", skills: [{ name: "", icon: "Code"}] })}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                        <Separator />
                         <Button type="submit" disabled={formState.isSubmitting} className="w-full">
                           {formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Skills</>}
                        </Button>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}

function SkillCategoryField({ categoryIndex, removeCategory }: { categoryIndex: number, removeCategory: (index: number) => void }) {
    const { control } = useFormContext();
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
