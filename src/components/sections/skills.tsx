import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedItem } from "../animated-item";
import { allIcons } from "@/lib/icons";
import { supabase } from "@/lib/supabase/client";

const iconMap = allIcons.reduce((map, icon) => {
    map[icon.name] = icon.component;
    return map;
}, {} as Record<string, React.FC<any>>);


export async function Skills() {
  const { data: skillsData, error } = await supabase
    .from('skills')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching skills:', error.message || error);
    return <p>Error loading skills.</p>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Technical Skills</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A blend of expertise in modern web development, robust cybersecurity practices, and cutting-edge AI.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <AnimatedItem key={category.category} delay={index * 0.1}>
              <Card className="flex flex-col h-full bg-transparent border-2 hover:shadow-lg hover:-translate-y-1 transition-all">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{category.category}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {category.skills.map((skill: { name: string, icon: string }) => {
                    const Icon = iconMap[skill.icon as keyof typeof iconMap] || iconMap['Code'];
                    return (
                        <Badge key={skill.name} variant="secondary" className="flex items-center gap-2">
                           <Icon className="h-4 w-4" />
                           {skill.name}
                        </Badge>
                    );
                  })}
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
