
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
        <div className="relative mt-12 pl-6 before:absolute before:top-0 before:left-6 before:h-full before:w-px before:bg-border md:pl-0 md:before:left-1/2 md:before:-translate-x-1/2">
          {EXPERIENCE_DATA.map((item, index) => (
            <AnimatedItem key={item.role} direction={index % 2 === 0 ? "right" : "left"} delay={index * 0.2}>
              <div className="relative md:grid md:grid-cols-2 md:gap-12">
                <div className={`flex items-center md:justify-end ${index % 2 === 0 ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right'}`}>
                  <div className="absolute top-1 -left-[34px] flex h-8 w-8 items-center justify-center rounded-full bg-background ring-8 ring-background md:static md:h-0 md:w-0 md:ring-0">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  </div>
                </div>

                <div className={`pb-12 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <Card className="transition-all hover:shadow-lg hover:border-primary/50 text-left">
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
