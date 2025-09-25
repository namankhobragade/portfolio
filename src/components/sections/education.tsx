import { AnimatedItem } from "../animated-item";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { allIcons } from "@/lib/icons";
import { supabase } from "@/lib/supabase/client";

const iconMap = allIcons.reduce((map, icon) => {
    map[icon.name] = icon.component;
    return map;
}, {} as Record<string, React.FC<any>>);

interface EducationData {
    degree: string;
    institution: string;
    status: string;
    icon: string;
}

export async function Education() {
  const { data: educationData, error } = await supabase
    .from('education')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching education:', error.message || error);
    return <p>Error loading education data.</p>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Studies</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and commitment to lifelong learning in the field of information security.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationData.map((edu, index) => {
            const Icon = iconMap[edu.icon as keyof typeof iconMap] || iconMap['GraduationCap'];
            return (
             <AnimatedItem key={edu.degree} delay={index * 0.1}>
                <Card className="flex h-full flex-col p-6 transition-all hover:shadow-lg hover:-translate-y-1 bg-transparent border-2">
                    <CardHeader className="p-0 mb-4">
                        <div className="bg-accent/10 text-accent rounded-lg p-3 w-fit">
                            <Icon className="h-8 w-8" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col flex-grow">
                        <CardTitle className="text-xl font-bold font-headline mb-2">{edu.degree}</CardTitle>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground mt-auto pt-2">{edu.status}</p>
                    </CardContent>
                </Card>
            </AnimatedItem>
            )
          })}
        </div>
      </div>
    </section>
  );
}
