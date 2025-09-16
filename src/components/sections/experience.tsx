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
        <div className="relative mx-auto max-w-3xl py-12">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {EXPERIENCE_DATA.map((item, index) => (
            <AnimatedItem key={item.role} direction={index % 2 === 0 ? 'right' : 'left'} delay={index * 0.2}>
              <div className="relative mb-8">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
                </div>
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:ml-auto'}`}>
                  <Card className="transition-all hover:shadow-lg hover:border-primary/50">
                    <CardHeader>
                      <CardTitle className="font-headline">{item.role}</CardTitle>
                      <CardDescription>{item.company} | {item.period}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-left">
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
