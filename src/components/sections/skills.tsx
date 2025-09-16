import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SKILLS_DATA } from "@/lib/data";
import { AnimatedItem } from "../animated-item";

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
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          {SKILLS_DATA.map((category, index) => (
            <AnimatedItem key={category.category} delay={index * 0.1}>
              <Card className="h-full glow-card">
                <CardHeader>
                  <CardTitle className="font-headline">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <skill.icon className="h-5 w-5 text-accent" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <Progress value={skill.level} aria-label={`${skill.name} proficiency`} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
