
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedItem } from "../animated-item";
import { allIcons } from "@/lib/icons";
import { supabase } from "@/lib/supabase/client";

const iconMap = allIcons.reduce((map, icon) => {
    map[icon.name] = icon.component;
    return map;
}, {} as Record<string, React.FC<any>>);

export async function Certifications() {
  const { data: certificationsData, error } = await supabase
    .from('certifications')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching certifications:', error.message || error);
    return <p>Error loading certifications.</p>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Certifications</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A showcase of my commitment to continuous learning and professional development in the fields of technology and security.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl justify-center gap-6 py-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-8">
          {certificationsData.map((cert, index) => {
            const Icon = iconMap[cert.icon as keyof typeof iconMap] || iconMap['Star'];
            return (
                <AnimatedItem key={cert.name} delay={index * 0.1}>
                <Card className="flex h-full flex-col items-center justify-center text-center p-6 transition-all hover:shadow-lg hover:-translate-y-1 bg-transparent border-2">
                    <CardHeader className="p-0 mb-4">
                    <div className="bg-accent/10 text-accent rounded-full p-3">
                        <Icon className="h-8 w-8" />
                    </div>
                    </CardHeader>
                    <CardContent className="p-0">
                    <CardTitle className="text-lg font-bold font-headline mb-1">{cert.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </CardContent>
                </Card>
                </AnimatedItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
