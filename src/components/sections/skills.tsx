
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
        <div className="mx-auto grid max-w-6xl gap-12 py-12">
          {SKILLS_DATA.map((category, index) => (
            <AnimatedItem key={category.category} delay={index * 0.2}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-headline text-center">{category.category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <AnimatedItem key={skill.name} delay={skillIndex * 0.05}>
                      <Card className="flex flex-col items-center justify-center text-center p-4 transition-all hover:shadow-lg hover:-translate-y-1 h-full">
                        <CardHeader className="p-0 mb-3">
                          <div className="bg-accent/10 text-accent rounded-full p-3">
                            <skill.icon className="h-6 w-6" />
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <CardTitle className="text-sm font-medium">{skill.name}</CardTitle>
                        </CardContent>
                      </Card>
                    </AnimatedItem>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
