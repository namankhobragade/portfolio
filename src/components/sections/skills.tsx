
import { SKILLS_DATA } from "@/lib/data";
import { AnimatedItem } from "../animated-item";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function Skills() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Technical Skills</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A blend of expertise in modern web development, robust cybersecurity practices, and cutting-edge AI.
            </p>
          </div>
        </div>
        <div className="mx-auto grid justify-center gap-8 py-12 lg:grid-cols-2 xl:grid-cols-3">
          {SKILLS_DATA.map((category, index) => (
            <AnimatedItem key={category.category} delay={index * 0.1}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="font-headline text-center">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center">
                    {category.skills.map((skill, skillIndex) => (
                      <AnimatedItem key={skill.name} delay={skillIndex * 0.05}>
                        <div className="flex flex-col items-center text-center gap-2 p-2 rounded-lg transition-all hover:bg-secondary">
                          <div className="bg-accent/10 text-accent rounded-full p-3">
                            <skill.icon className="h-6 w-6" />
                          </div>
                          <p className="text-sm font-medium">{skill.name}</p>
                        </div>
                      </AnimatedItem>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
