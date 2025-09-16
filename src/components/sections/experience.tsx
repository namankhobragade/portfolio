
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EXPERIENCE_DATA } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";
import { AnimatedItem } from "../animated-item";

export function Experience() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Experience</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A timeline of my professional journey, highlighting key roles and accomplishments.
            </p>
          </div>
        </div>
        <div className="relative mt-12 space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border/70 md:before:mx-auto md:before:ml-0">
          {EXPERIENCE_DATA.map((item, index) => (
             <AnimatedItem key={item.role} direction={index % 2 === 0 ? 'right' : 'left'} delay={index * 0.2}>
              <div className="relative flex items-center md:justify-normal md:odd:flex-row-reverse">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-md ring-4 ring-background z-10">
                   <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                </div>
                <div className="w-full md:w-[calc(50%-2.5rem)]">
                   <Card className={`transition-all hover:shadow-lg hover:border-primary/50 text-left ${index % 2 === 0 ? 'ml-6 md:ml-0 md:mr-auto' : 'ml-6 md:ml-auto'}`}>
                    <CardHeader>
                      <CardTitle className="font-headline">{item.role}</CardTitle>
                      <CardDescription>{item.company} | {item.period}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2">
                        {item.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                            <span className="text-sm text-muted-foreground">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
