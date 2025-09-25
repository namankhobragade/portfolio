
import { AnimatedItem } from "../animated-item";
import { Badge } from "../ui/badge";
import { supabase } from "@/lib/supabase/client";

export async function Experience() {
  const { data: experienceData, error } = await supabase
    .from('experience')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching experience:', error.message || error);
    return <p>Error loading experience.</p>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="space-y-8">
            <div className="space-y-2 text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Work Experience</h2>
            </div>
            <div className="space-y-12">
                {experienceData.map((item, index) => (
                    <AnimatedItem key={`${item.role}-${item.company}-${index}`} delay={index * 0.2}>
                        <div className="grid gap-4 pb-8 shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between md:items-baseline gap-2">
                                <h3 className="text-xl md:text-2xl font-semibold font-headline">{item.company}</h3>
                                <Badge variant="secondary" className="w-fit">{item.period}</Badge>
                            </div>
                             <p className="text-primary font-semibold">{item.role}</p>
                            <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                                {item.responsibilities.map((resp: string, i: number) => (
                                <li key={i}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    </AnimatedItem>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
