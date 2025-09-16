
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SKILLS_DATA } from "@/lib/data";
import { AnimatedItem } from "../animated-item";

export function Skills() {
    const allSkills = SKILLS_DATA.flatMap(category => category.skills.map(skill => ({...skill, category: category.category})));

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
        <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-12">
          {allSkills.map((skill, index) => (
            <AnimatedItem key={skill.name} delay={index * 0.05} direction={index % 2 === 0 ? 'left' : 'right'}>
              <Card className="h-full glow-card flex flex-col items-center justify-center p-4 text-center">
                <CardContent className="p-2 flex flex-col items-center justify-center gap-3">
                    <skill.icon className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
                    <span className="font-bold text-xs sm:text-sm">{skill.name}</span>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
